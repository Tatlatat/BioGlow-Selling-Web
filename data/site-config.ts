/**
 * Cấu hình toàn site. Sửa file này để đổi tên shop, SDT, liên hệ, slogan...
 * Mọi page và component đều đọc từ đây — KHÔNG hardcode text ở chỗ khác.
 */
export const siteConfig = {
  name: "BioGlowVN",
  tagline: "Sản phẩm thiên nhiên tuyển chọn cho sức khoẻ và sắc đẹp",
  description:
    "BioGlowVN — Shop online chuyên sản phẩm thiên nhiên cho sức khoẻ và sắc đẹp. Sản xuất tại Việt Nam, đạt chuẩn GMP/ISO. Giao hàng toàn quốc, thanh toán khi nhận (COD).",
  url: "https://bioglowvn.example.com",

  contact: {
    phone: "0373478587",
    phoneDisplay: "0373 478 587",
    zalo: "0373478587",
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
} as const;

export type SiteConfig = typeof siteConfig;
