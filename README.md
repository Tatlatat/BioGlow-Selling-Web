# BioGlowVN

Website giới thiệu và bán sản phẩm thiên nhiên — Next.js 15 + TypeScript + Tailwind + shadcn/ui.

## Yêu cầu

- **Node.js ≥ 20** (đã test trên v24)
- npm (đi kèm Node)

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Các lệnh

| Lệnh | Tác dụng |
|---|---|
| `npm run dev` | Chạy server phát triển (hot-reload) |
| `npm run build` | Build production |
| `npm run start` | Chạy server production (cần build trước) |
| `npm run typecheck` | Kiểm tra TypeScript không lỗi |
| `npm run lint` | Lint code |

## Cấu trúc thư mục (tóm tắt)

```
app/                Routes Next.js (App Router)
  ├ page.tsx        Trang chủ
  ├ san-pham/       Trang sản phẩm + chi tiết
  ├ nhom/[nhom]/    Trang nhóm sản phẩm
  ├ blog/           Trang cẩm nang
  ├ cau-hoi-thuong-gap/
  ├ ve-bioglowvn/
  ├ lien-he/
  ├ sitemap.ts      Tự sinh sitemap.xml
  └ robots.ts       Tự sinh robots.txt
components/         Components tái sử dụng
  ├ ui/             shadcn-style components (Button, Card, Tabs...)
  ├ header.tsx      Header có Zalo/SDT
  ├ footer.tsx
  ├ product-card.tsx
  └ ...
data/               TOÀN BỘ DỮ LIỆU SHOP — sửa ở đây
  ├ site-config.ts  Tên shop, SDT, Zalo, email
  ├ products.ts     Danh sách sản phẩm
  ├ categories.ts   4 nhóm sản phẩm
  ├ faq.ts          Câu hỏi thường gặp
  └ blog.ts         Bài blog
lib/utils.ts        Hàm tiện ích chung
public/             Ảnh tĩnh (logo, favicon, ảnh sản phẩm)
  └ products/<slug>/1.jpg, 2.jpg...
```

## Sửa nội dung

### Đổi SDT, Zalo, tên shop, giờ làm việc

Mở `data/site-config.ts` — chỉnh các trường:

```ts
export const siteConfig = {
  name: "BioGlowVN",
  contact: {
    phone: "0373478587",
    phoneDisplay: "0373 478 587",
    zalo: "0373478587",
    email: "",                     // điền email nếu có
    workingHours: "8:00 - 22:00 hằng ngày",
  },
  ...
};
```

### Thêm/sửa/xoá sản phẩm

Mở `data/products.ts` và thêm vào mảng `products`. Mỗi sản phẩm cần:

```ts
{
  slug: "ten-san-pham",       // URL: /san-pham/ten-san-pham (không dấu, không khoảng trắng)
  name: "Tên sản phẩm",
  subtitle: "Mô tả 1 dòng",
  category: "suc-khoe",        // dinh-duong | thiet-yeu | suc-khoe | my-pham
  shortDesc: "Mô tả ngắn 1-2 câu",
  longDesc: "Mô tả dài...",
  price: 500000,               // VND, hoặc null nếu liên hệ
  images: ["/products/ten-san-pham/1.jpg"],
  featured: true,              // true để hiện trên trang chủ
}
```

### Thêm ảnh sản phẩm

1. Lưu ảnh vào `public/products/<slug>/1.jpg`, `2.jpg`...
2. Thêm đường dẫn vào trường `images` của sản phẩm

Nếu chưa có ảnh, để mảng `images: []` — site sẽ tự hiện placeholder.

### Thêm bài blog

Mở `data/blog.ts`, thêm vào mảng `blogPosts`. Nội dung viết bằng markdown đơn giản (`##`, `###`, `- ` cho bullet, `**text**` cho in đậm).

### Sửa câu hỏi FAQ

Mở `data/faq.ts`.

### Đổi palette màu / font

- Màu: `tailwind.config.ts`, mục `colors`
- Font: `app/layout.tsx`, đổi `Be_Vietnam_Pro` / `Lora` theo font Google Fonts khác

## Deploy lên Vercel (miễn phí)

1. Tạo tài khoản tại https://vercel.com/signup
2. Cài đặt Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Trong thư mục dự án, chạy:
   ```bash
   vercel
   ```
4. Đăng nhập, chọn "link to existing project" → "no" để tạo mới
5. Vercel tự build và cấp URL dạng `bioglowvn.vercel.app`

### Gắn domain riêng

1. Mua domain (ví dụ Mắt Bão, PA Việt Nam, Namecheap)
2. Trong dashboard Vercel → project → Settings → Domains → Add
3. Làm theo hướng dẫn cấu hình DNS của Vercel

## Cập nhật site sau khi deploy

Sửa nội dung trong các file ở `data/` rồi:

```bash
git add .
git commit -m "Cập nhật sản phẩm"
git push
```

Vercel tự động build và deploy mỗi lần push.

## Cấu trúc nội dung

Site hiện có **12 sản phẩm mẫu** thuộc 4 nhóm:
- Dinh dưỡng (Green Quantum, Caphelink, Vhealth Chocolate, Vhealth Trà Xanh)
- Sức khoẻ (TOPAPRO, VSPORTGEL)
- Thiết yếu (VSMILE)
- Mỹ phẩm (Orico Cleanser, Toner, Micellar, Moisturizer, Sun Screen)

Có thể thêm các sản phẩm khác bằng cách sửa `data/products.ts` — code không cần thay đổi gì.

## Ghi chú

- Form liên hệ hiện gọi mailto: (cần điền email vào `site-config.ts`). Nếu email trống, form sẽ chuyển hướng sang Zalo.
- Mặc định cỡ chữ body 17px — dễ đọc cho khách lớn tuổi.
- Mọi trang đều có metadata SEO + Open Graph; trang sản phẩm có JSON-LD `Product`; trang FAQ có JSON-LD `FAQPage`.

## Disclaimer

Site hiển thị disclaimer "Thực phẩm bảo vệ sức khoẻ không phải là thuốc..." ở footer và trên trang sản phẩm có ô "Lưu ý". Đây là yêu cầu khi quảng cáo TPCN tại Việt Nam.
