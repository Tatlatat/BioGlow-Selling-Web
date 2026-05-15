#!/usr/bin/env bash
# Flip status:published, move _drafts/<slug>.md → content/blog/<slug>.md,
# commit (md + images) và push lên main.
#
# Usage:
#   bash scripts/blog/publish.sh <slug>

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <slug>" >&2
  echo "" >&2
  echo "Drafts hiện có:" >&2
  ls content/blog/_drafts/ 2>/dev/null | sed 's/\.md$//' | sed 's/^/  - /' >&2
  exit 2
fi

SLUG="$1"
DRAFT="content/blog/_drafts/$SLUG.md"
PUBLISHED="content/blog/$SLUG.md"
IMAGES_DIR="public/blog/$SLUG"

if [ ! -f "$DRAFT" ]; then
  echo "✗ Không tìm thấy draft $DRAFT" >&2
  exit 3
fi

if [ -f "$PUBLISHED" ]; then
  echo "⚠ $PUBLISHED đã tồn tại — sẽ ghi đè." >&2
fi

echo "→ Flip status: draft → published"
# In-place replace: status: draft  →  status: published
sed -i.bak -E 's/^status:[[:space:]]*draft[[:space:]]*$/status: published/' "$DRAFT"
rm -f "$DRAFT.bak"

# Nếu file chưa có status: line, thêm vào sau dòng status (paranoid check)
if ! grep -q '^status:' "$DRAFT"; then
  echo "⚠ Draft không có dòng 'status:' — thêm 'status: published'." >&2
  # Insert after the first --- (frontmatter start)
  awk 'NR==1{print; next} /^---$/ && !done {print "status: published"; print; done=1; next} {print}' "$DRAFT" > "$DRAFT.tmp" && mv "$DRAFT.tmp" "$DRAFT"
fi

echo "→ Move $DRAFT → $PUBLISHED"
mv "$DRAFT" "$PUBLISHED"

echo "→ Git add: $PUBLISHED + $IMAGES_DIR"
git add "$PUBLISHED"
if [ -d "$IMAGES_DIR" ]; then
  git add "$IMAGES_DIR"
fi

TITLE=$(grep -E '^title:' "$PUBLISHED" | head -1 | sed -E 's/^title:[[:space:]]*"?([^"]*)"?$/\1/')

echo "→ Commit..."
git commit -m "$(cat <<EOF
Publish blog post: $SLUG

$TITLE

🤖 Generated locally via bioglow pipeline (Gemma 3 12B 4-bit + Flux.2 Klein 4B)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"

echo "→ Push..."
git push origin main

echo ""
echo "✓ Published: https://bioglow.io.vn/blog/$SLUG"
echo "  Vercel sẽ deploy trong ~1-2 phút."
