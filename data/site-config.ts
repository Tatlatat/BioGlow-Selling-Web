/**
 * Cấu hình toàn site. Sửa file này để đổi tên shop, SDT, liên hệ, slogan...
 * Mọi page và component đều đọc từ đây — KHÔNG hardcode text ở chỗ khác.
 */
export const siteConfig = {
  name: "BioGlowVN",
  tagline: "Sản phẩm thiên nhiên tuyển chọn cho sức khoẻ và sắc đẹp",
  description:
    "BioGlowVN — Shop online chuyên sản phẩm thiên nhiên cho sức khoẻ và sắc đẹp. Sản xuất tại Việt Nam, đạt chuẩn GMP/ISO. Giao hàng toàn quốc, thanh toán khi nhận (COD).",
  url: "https://bioglow.io.vn",
  /**
   * Năm thành lập — dùng cho `foundingDate` trong Organization JSON-LD.
   * Đổi khi có thông tin chính thức.
   */
  foundingYear: 2026,

  contact: {
    /**
     * Danh sách sđt — vừa làm hotline (gọi qua `tel:`), vừa làm Zalo.
     * `phones[0]` là sđt chính, hiển thị ở header & nút Zalo trang sản phẩm.
     * Toàn bộ sđt được hiển thị ở footer và trang /lien-he.
     */
    phones: [
      { tel: "0373478587", display: "0373 478 587" },
      { tel: "0346009569", display: "0346 009 569" },
    ],
    email: "",
    facebook: "",
    workingHours: "8:00 - 22:00 hằng ngày",
  },

  shipping: {
    nationwide: true,
    cod: true,
    estimatedDays: "2-5 ngày",
  },

  social: {
    facebook: "",
    youtube: "",
    tiktok: "",
  },

  /**
   * Mặc định chia sẻ Zalo/Facebook. Cần tạo file `/public/og-default.jpg`
   * kích thước 1200×630 để hiển thị preview khi share. Khi chưa có,
   * Zalo/FB sẽ fallback ảnh đầu tiên gặp trên trang.
   */
  defaultOgImage: "/og-default.jpg",
} as const;

export type SiteConfig = typeof siteConfig;
