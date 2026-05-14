# Blog content pipeline — operator guide

Pipeline AI local sinh bài cẩm nang (1500-2000 từ + 3 ảnh) cho `/blog` của BioGlowVN.
Code chạy ở `~/Documents/bioglow/`, ghi output cross-repo về đây.

## Quick start

```bash
# 1. (Một lần) Bật mlx-vlm server với Gemma 4 31B — chạy trong terminal khác
cd ~/Documents/bioglow
uv tool run mlx-lm.server \
  --model mlx-community/gemma-4-31b-it-4bit \
  --port 8080

# 2. Gen bài mới
cd ~/Documents/website\ selling
npm run blog:gen -- tang-de-khang-cho-tre-tieu-hoc

# → Pipeline gọi Gemma, audit E-E-A-T, gen 3 ảnh Flux, ghi draft, push Telegram
# → Anh duyệt trên điện thoại

# 3. Publish (sau khi anh OK trên Telegram)
npm run blog:publish -- tang-de-khang-cho-tre-tieu-hoc
# → flip status → commit → push → Vercel deploy
```

## Các lệnh

| Command | Tác dụng |
|---|---|
| `npm run blog:topics` | List topic backlog hiện có |
| `npm run blog:drafts` | List draft chưa publish |
| `npm run blog:gen -- <slug>` | Full pipeline: LLM → audit → 3 ảnh → Telegram |
| `npm run blog:gen -- <slug> --skip-image` | Chỉ gen text, bỏ qua ảnh (test nhanh) |
| `npm run blog:gen -- <slug> --no-audit` | Bỏ qua E-E-A-T audit |
| `npm run blog:gen -- <slug> --no-telegram` | Gen nhưng không push Telegram |
| `npm run blog:publish -- <slug>` | Flip status + commit + push |

## Cấu trúc

```
scripts/blog/
├── README.md              ← file này
├── gen.sh                 ← wrapper gọi bioglow pipeline
├── publish.sh             ← move draft → published + commit + push
└── topics/
    ├── tang-de-khang-cho-tre-tieu-hoc.yaml
    ├── dau-khop-o-nguoi-trung-nien.yaml
    ├── cham-soc-da-tuoi-40.yaml
    ├── hoi-mieng-nguyen-nhan-va-cach-xu-ly.yaml
    └── met-moi-keo-dai-sau-40.yaml

content/blog/
├── _drafts/<slug>.md      ← AI gen tạm vào đây (status: draft)
└── <slug>.md              ← sau khi publish (status: published, lên live)

public/blog/<slug>/
├── hero.jpg               ← 1216×640
├── 1.jpg                  ← 1024×1024
└── 2.jpg                  ← 1024×1024
```

## Thêm topic mới

Tạo file mới ở `scripts/blog/topics/<slug>.yaml`:

```yaml
slug: my-new-topic
title: "Tiêu đề bài (gợi ý, LLM có thể tinh chỉnh)"
keyword: "từ khoá chính cần SEO"
audience: "Đối tượng độc giả cụ thể"
angle: "Hướng tiếp cận biên tập"
tags: [tag1, tag2]
word_count: 1800
linked_products:
  - kidsmune-max          # ít nhất 1 SP, slug khớp với data/products.ts
hero_style: "English description for hero image scene"
priority: 1               # 1 = high
status: pending
```

Sau đó: `npm run blog:gen -- my-new-topic`.

## Prerequisites một lần

```bash
# Cài uv (Python package manager)
brew install uv

# Cài mflux qua uv tool
uv tool install mflux

# Verify
mflux-generate-flux2 --help
which mlx-lm.server  # qua `uv tool run` không cần install global
```

## Debug

| Triệu chứng | Cách xử lý |
|---|---|
| `mlx-vlm server không chạy ở :8080` | Mở terminal khác, chạy lệnh ở Quick start #1 |
| `Không tìm thấy topic <slug>` | Check `npm run blog:topics`, hoặc tạo file YAML |
| `mflux failed (exit 1)` | First run sẽ pull ~8GB model — chờ. Lần sau nhanh hơn |
| Audit fail liên tục | Sửa prompt `~/Documents/bioglow/prompts/blog_post.md` hoặc rerun với `--no-audit` |
| RAM thrashing khi gen ảnh | Tắt mlx-vlm server trước khi gen ảnh (Gemma + Flux không chung 16GB được) |

## RAM management cho Mac 16GB

Gemma 4 31B 4-bit chiếm ~17GB. Flux.2 klein 4B chiếm ~6GB. Không cùng 1 lúc.

Pipeline hiện tại chạy tuần tự: LLM xong → gen ảnh. Nhưng mlx-vlm server **giữ model
trong RAM** ngay cả khi không gọi. Có 2 cách:

1. **Thủ công**: trước khi gen ảnh, tắt mlx-vlm server (Ctrl-C). Sau gen ảnh, bật lại.
2. **Chấp nhận swap**: máy sẽ swap nhẹ trong lúc Flux chạy, chậm hơn ~10-20%.

Pipeline KHÔNG tự động unload Gemma vì mlx-vlm chưa có flag đó. Workaround:
chạy server với `KEEP_ALIVE=0` hoặc kill process sau LLM call (TBD).
