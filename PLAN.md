# PLAN — Website BioGlowVN

Tài liệu này là kế hoạch chi tiết. **Cần bạn duyệt trước khi tôi bắt đầu code.**

> **Định vị:** Shop online bán sản phẩm thiên nhiên tuyển chọn cho sức khỏe và sắc đẹp. **Trang web không nhắc tên nhà sản xuất, không nói về mô hình kinh doanh phân phối, không có nội dung tuyển dụng/hợp tác bán hàng.** 100% tập trung vào bán hàng.

---

## 1. Tổng quan dự án

| Mục | Giá trị |
|---|---|
| Tên shop | **BioGlowVN** |
| Tagline | "Sản phẩm thiên nhiên tuyển chọn cho sức khỏe và sắc đẹp" |
| Mục tiêu | (1) Xây uy tín shop, (2) Catalog gửi link cho khách, (3) Thu lead qua Zalo/điện thoại |
| Tệp khách | Người lớn tuổi 40-65+, Phụ nữ 25-45, Người tập gym |
| Khu vực | Toàn quốc — COD |
| SDT | 0373478587 (dùng cho call + zalo.me/0373478587) |
| Tech | Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui |
| Deploy | Vercel (free tier), domain mua sau |

---

## 2. Design system

### Palette (ấm áp, thiên nhiên, tin cậy)
```
Primary brown    #6B4226   (header, footer, heading)
Brown 50         #FAF6F1   (background section)
Cream            #F5EFE6   (card background)
Forest green     #3F6B43   (secondary, badge "thiên nhiên")
Gold accent      #C9A227   (highlight, đường viền)
Warm red         #B5483A   (CTA mua/Zalo, alert)
Text dark        #2A1F17
Text muted       #6B5B4F
```
Mỗi section dùng background khác nhau (white → cream → brown-50 → white) tạo nhịp thị giác, tránh "một màu".

### Typography
- **Heading:** `Lora` hoặc `Playfair Display` (serif, ấm)
- **Body:** `Be Vietnam Pro` hoặc `Inter` (sans, dễ đọc tiếng Việt)
- Cỡ chữ body **mặc định 17px** — để khách lớn tuổi dễ đọc.

### Component library
- **shadcn/ui** (`Button`, `Card`, `Sheet`, `Dialog`, `Accordion`, `Badge`, `Input`, `Textarea`)
- **lucide-react** — icon
- **next/image** — tối ưu ảnh

---

## 3. Cấu trúc trang

```
/                          Trang chủ
/san-pham                  Toàn bộ sản phẩm (filter 4 nhóm)
/san-pham/[slug]           Chi tiết sản phẩm
/nhom/[nhom]               Trang nhóm (dinh-duong / thiet-yeu / suc-khoe / my-pham)
/blog                      Danh sách bài blog (sức khỏe, làm đẹp chung)
/blog/[slug]               Chi tiết blog
/cau-hoi-thuong-gap        FAQ
/ve-bioglowvn              Về shop BioGlowVN
/lien-he                   Liên hệ — Zalo, call, form
```

### Trang chủ (`/`) — các section
1. **Hero** — tagline "Sản phẩm thiên nhiên tuyển chọn", CTA "Xem sản phẩm" + "Tư vấn Zalo".
2. **3 đối tượng** — 3 card lớn dẫn về SP phù hợp:
   - "Cho người lớn tuổi" → SP hỗ trợ sức khỏe (xương khớp, tim mạch...)
   - "Cho phụ nữ hiện đại" → Mỹ phẩm Orico, dưỡng da
   - "Cho người vận động" → Sản phẩm tăng sức bền, hỗ trợ phục hồi
3. **4 nhóm sản phẩm** — grid 4 ô với icon + tên + số SP.
4. **Sản phẩm nổi bật** — 6-8 SP top, có nút "Xem tất cả".
5. **Cam kết của BioGlowVN** — 4 điểm:
   - Sản phẩm chính hãng, có nguồn gốc rõ ràng
   - Sản xuất tại Việt Nam, đạt chuẩn GMP, ISO
   - Giao hàng toàn quốc, thanh toán khi nhận (COD)
   - Tư vấn miễn phí qua Zalo
6. **Cam kết chất lượng** — text + icon badges: "Sản xuất tại VN", "Đạt chuẩn GMP", "Tiêu chuẩn ISO", "Bộ Y tế cấp phép" (text only, không lấy logo nào).
7. **CTA cuối** — Zalo + gọi.

### Trang sản phẩm (`/san-pham/[slug]`)
- Ảnh lớn + gallery
- Tên gốc (TOPAPRO, Orico, Green Quantum...), giá, mô tả ngắn, nhóm
- Tabs: Mô tả chi tiết / Thành phần / Cách dùng / Lưu ý
- 2 nút lớn:
  - **Đặt qua Zalo** → `zalo.me/0373478587` với pre-fill "Tôi muốn đặt [tên SP]"
  - **Gọi 0373478587**
- "Sản phẩm cùng nhóm" cuối trang

### Trang Về BioGlowVN
Nội dung mẫu (bạn duyệt/sửa):
> "BioGlowVN là shop online chuyên các sản phẩm thiên nhiên cho sức khỏe và sắc đẹp. Chúng tôi tuyển chọn những sản phẩm uy tín, sản xuất tại Việt Nam, đạt các tiêu chuẩn GMP/ISO của Bộ Y tế. Sứ mệnh của BioGlowVN: mang đến cho khách hàng các giải pháp chăm sóc sức khỏe an toàn, hiệu quả, có nguồn gốc rõ ràng — với chính sách giao hàng toàn quốc và tư vấn miễn phí."

Có thể bổ sung sau:
- Cam kết của shop (4 gạch đầu dòng)
- Thông tin liên hệ
- KHÔNG có: tên nhà sản xuất, mô hình bán hàng, lịch sử cá nhân, tuyển CTV.

### Trang liên hệ
- Card với: SDT (`tel:`), Zalo (`zalo.me/`), email (nếu có), giờ làm việc
- Form đơn giản (tên + SDT + nội dung) → gửi qua **mailto:** (phase 1).

---

## 4. Dữ liệu sản phẩm

### Nguồn
- Thông tin (tên, mô tả, giá, ảnh) từ các trang sản phẩm công khai trên web.
- Lưu thành **`data/products.ts`** (TypeScript).
- Phân 4 nhóm:
  - `dinh-duong` — Dinh dưỡng hằng ngày (Green Quantum, Caphelink, Vhealth...)
  - `thiet-yeu` — Nhu cầu thiết yếu (VSMILE, kem đánh răng...)
  - `suc-khoe` — Hỗ trợ sức khỏe (TOPAPRO, VSPORTGEL, Man-Link Max...)
  - `my-pham` — Mỹ phẩm làm đẹp (dòng Orico)

### Schema
```ts
type Product = {
  slug: string;            // "topapro"
  name: string;            // "TOPAPRO" (giữ tên gốc)
  subtitle?: string;       // "Viên uống hỗ trợ xương khớp"
  category: "dinh-duong" | "thiet-yeu" | "suc-khoe" | "my-pham";
  shortDesc: string;
  longDesc: string;        // markdown
  ingredients?: string;
  usage?: string;
  warning?: string;
  price?: number;          // VND
  images: string[];        // ["/products/topapro/1.jpg", ...]
  featured?: boolean;
  tags?: string[];
};
```

### Ảnh sản phẩm
- Tải về `public/products/<slug>/1.jpg…` từ các trang sản phẩm công khai.
- Đây là ảnh shop sẽ bán → không cần ghi nguồn riêng.

---

## 5. Blog (giữ — viết về sức khỏe/làm đẹp chung)

- Định dạng MDX trong `content/blog/`.
- 2-3 bài mẫu tôi sẽ viết:
  - "5 thói quen tốt cho làn da tuổi 30"
  - "Cách bổ sung canxi tự nhiên cho người lớn tuổi"
  - "Phục hồi cơ bắp sau tập luyện: 3 sản phẩm hữu ích"
- **Tuyệt đối không** nhắc tên Vinalink, không nói "NPP", không kể câu chuyện cá nhân.
- Có thể nhắc sản phẩm của shop trong bài (link nội bộ).

---

## 6. SEO + Performance

- `metadata` per page với title/description tiếng Việt.
- Open Graph image cho social share.
- `sitemap.xml` + `robots.txt` tự động qua Next.js.
- Structured data `Product` (JSON-LD) cho trang chi tiết SP.
- Ảnh dùng `next/image` (auto WebP + lazy load).
- Mục tiêu Lighthouse ≥ 90 cho cả 4 chỉ số.

---

## 7. Cấu trúc thư mục

```
website-selling/
├── JOURNAL.md
├── PLAN.md
├── README.md
├── package.json, tsconfig.json, next.config.ts, tailwind.config.ts
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── san-pham/page.tsx, [slug]/page.tsx
│   ├── nhom/[nhom]/page.tsx
│   ├── blog/page.tsx, [slug]/page.tsx
│   ├── cau-hoi-thuong-gap/page.tsx
│   ├── ve-bioglowvn/page.tsx
│   ├── lien-he/page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ui/ (shadcn)
│   ├── header.tsx, footer.tsx
│   ├── product-card.tsx, audience-card.tsx
│   ├── category-grid.tsx, contact-cta.tsx
│   └── zalo-call-buttons.tsx
├── data/
│   ├── products.ts
│   ├── categories.ts
│   ├── faq.ts
│   └── site-config.ts
├── content/blog/             ← MDX bài blog
├── lib/utils.ts
└── public/
    ├── products/<slug>/*.jpg
    ├── og-image.jpg
    └── favicon.ico
```

**`data/site-config.ts`**:
```ts
export const site = {
  name: "BioGlowVN",
  tagline: "Sản phẩm thiên nhiên tuyển chọn",
  phone: "0373478587",
  zalo: "https://zalo.me/0373478587",
  email: "",
  facebook: "",
};
```

---

## 8. Các bước thực hiện (sau khi bạn duyệt)

1. **[Setup]** `create-next-app` + cài shadcn/ui, tailwind, fonts.
2. **[Data]** Thu thập 31 SP + ảnh từ các trang công khai → `data/products.ts` + `public/products/`.
3. **[Layout]** Header/Footer/fonts/palette.
4. **[Trang chủ]** 7 section.
5. **[Trang SP]** List + filter + chi tiết + JSON-LD.
6. **[Trang phụ]** Về / Liên hệ / FAQ / Blog.
7. **[SEO]** sitemap, robots, OG image.
8. **[README]** Hướng dẫn chạy + edit + deploy Vercel.
9. **[Test]** `npm run dev`, kiểm tra 5+ trang trên desktop + mobile.

---

## 9. Những điều SẼ KHÔNG xuất hiện trên website

- ❌ Tên "Vinalink" / "Vinalink Group" / "Tập đoàn Liên kết Việt Nam"
- ❌ Cụm "NPP", "Nhà phân phối", "Cộng tác viên", "Đại lý"
- ❌ Nội dung tuyển dụng / mời hợp tác / "cơ hội kinh doanh"
- ❌ Câu chuyện cá nhân về việc tham gia mô hình bán hàng
- ❌ Logo / hình ảnh thương hiệu Vinalink Group
- ❌ Giấy phép số 009/QLCT-GCN (giấy phép bán hàng đa cấp)
- ❌ Giỏ hàng / thanh toán online (ngoài scope — chỉ có Zalo/call)

---

## 10. Rủi ro & lưu ý

| Rủi ro | Xử lý |
|---|---|
| Giá SP thay đổi | Để giá vào `data/products.ts` — bạn tự cập nhật. README hướng dẫn. |
| Bạn không quen code | README chi tiết + mọi config trong `site-config.ts` để bạn chỉ edit text. |
| Quy định quảng cáo TPCN/mỹ phẩm | Không claim "chữa bệnh"; dùng "hỗ trợ". Disclaimer "Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh." trên trang SP TPCN. |
| Bản quyền ảnh | Sử dụng ảnh SP sẽ bán — đây là practice phổ biến với shop bán lẻ. |

---

## 11. Câu hỏi cuối cần bạn trả lời (hoặc bỏ qua = dùng placeholder)

1. **Email liên hệ?** (để hiển thị + nhận form mailto. Bỏ qua = không hiển thị)
2. **Facebook/Fanpage?** (nếu có)
3. **Giờ làm việc?** (vd: "8:00 - 22:00 hằng ngày"; bỏ qua = "Mọi lúc — phản hồi sớm nhất")
4. **Bạn có muốn tự viết đoạn About 3-5 câu, hay dùng đoạn placeholder ở mục 3 trên?**

---

## ✅ Bạn duyệt plan này?

Nếu **OK toàn bộ** → tôi bắt đầu Bước 1 (Setup Next.js).
Nếu **cần sửa** → nói cụ thể phần nào.
