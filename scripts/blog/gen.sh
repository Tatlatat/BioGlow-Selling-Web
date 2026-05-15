#!/usr/bin/env bash
# Wrapper gọi bioglow pipeline để gen 1 bài blog từ topic backlog.
# Sau khi gen xong, tự động push preview lên Telegram để anh duyệt trên điện thoại.
#
# Usage:
#   bash scripts/blog/gen.sh <topic-slug>            # full pipeline (LLM + audit + 3 ảnh + telegram)
#   bash scripts/blog/gen.sh <topic-slug> --skip-image    # text only
#   bash scripts/blog/gen.sh <topic-slug> --no-audit      # skip E-E-A-T audit
#   bash scripts/blog/gen.sh <topic-slug> --no-telegram   # gen nhưng không push

set -euo pipefail

BIOGLOW_DIR="${BIOGLOW_DIR:-$HOME/Documents/bioglow}"

if [ ! -d "$BIOGLOW_DIR" ]; then
  echo "✗ Không tìm thấy bioglow project ở $BIOGLOW_DIR" >&2
  echo "  Set BIOGLOW_DIR env var nếu đường dẫn khác." >&2
  exit 1
fi

if [ $# -lt 1 ]; then
  echo "Usage: $0 <topic-slug> [--skip-image] [--no-audit] [--no-telegram]" >&2
  echo "" >&2
  echo "Available topics:" >&2
  ls "$(dirname "$0")/topics/" 2>/dev/null | sed 's/\.yaml$//' | sed 's/^/  - /' >&2
  exit 2
fi

SLUG="$1"
shift

PUSH_TG=1
PASSTHROUGH=()
for arg in "$@"; do
  case "$arg" in
    --no-telegram) PUSH_TG=0 ;;
    *) PASSTHROUGH+=("$arg") ;;
  esac
done

echo "→ Gen blog '$SLUG' qua bioglow pipeline..."
echo "  bioglow: $BIOGLOW_DIR"
echo ""

# Preflight: nếu config dùng "http://..." endpoint thì check server đang chạy.
# Mặc định "mlx-direct" — không cần server, model nạp trực tiếp trong Python process.
ENDPOINT=$(grep -E "^\s*endpoint:" "$BIOGLOW_DIR/config.yaml" | head -1 | awk -F': ' '{print $2}' | tr -d '" ')
if [[ "$ENDPOINT" == http* ]]; then
  if ! { nc -z -G 2 127.0.0.1 8080 >/dev/null 2>&1 || lsof -nP -i:8080 -sTCP:LISTEN >/dev/null 2>&1; }; then
    echo "✗ Config dùng HTTP endpoint nhưng không có server ở $ENDPOINT" >&2
    echo "  Bật server (terminal khác): uv tool run --from mlx-lm mlx_lm.server --model <name> --port 8080" >&2
    echo "  Hoặc đổi endpoint trong $BIOGLOW_DIR/config.yaml thành 'mlx-direct' (nhanh hơn 40x)." >&2
    exit 3
  fi
fi

# Gọi vào bioglow project
cd "$BIOGLOW_DIR"
# Safe-expand mảng có thể rỗng dưới `set -u` (nếu rỗng thì không tạo arg "")
DRAFT_PATH=$(uv run python -m scripts.generate_blog "$SLUG" ${PASSTHROUGH[@]+"${PASSTHROUGH[@]}"} | tail -1)

if [ -z "$DRAFT_PATH" ] || [ ! -f "$DRAFT_PATH" ]; then
  echo "" >&2
  echo "✗ generate_blog không trả về đường dẫn draft hợp lệ." >&2
  exit 4
fi

echo ""
echo "✓ Draft: $DRAFT_PATH"
echo ""

if [ "$PUSH_TG" -eq 1 ]; then
  echo "→ Push preview lên Telegram..."
  uv run python -m scripts.push_blog_telegram "$DRAFT_PATH"
  echo ""
  echo "✓ Preview đã gửi Telegram. Anh duyệt xong gõ:"
  echo "    npm run blog:publish -- $SLUG"
else
  echo "→ Bỏ qua Telegram (--no-telegram). Anh duyệt trực tiếp:"
  echo "    open $DRAFT_PATH"
fi
