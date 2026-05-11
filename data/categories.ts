export const CATEGORY_SLUGS = ["dinh-duong", "thiet-yeu", "suc-khoe", "my-pham"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  audience: string;
  iconName: "Leaf" | "Sparkles" | "HeartPulse" | "Droplets";
  gradient: string;
};

export const categories: readonly Category[] = [
  {
    slug: "dinh-duong",
    name: "Dinh dưỡng hằng ngày",
    shortName: "Dinh dưỡng",
    description:
      "Thức uống và thực phẩm bổ sung dùng hằng ngày, giúp duy trì năng lượng và sức khoẻ tổng thể.",
    audience: "Phù hợp mọi đối tượng",
    iconName: "Leaf",
    gradient: "from-leaf-50 to-white",
  },
  {
    slug: "thiet-yeu",
    name: "Sản phẩm thiết yếu",
    shortName: "Thiết yếu",
    description:
      "Vật phẩm chăm sóc cá nhân thiết yếu mỗi ngày, ưu tiên thành phần thiên nhiên, an toàn cho cả gia đình.",
    audience: "Cho cả gia đình",
    iconName: "Droplets",
    gradient: "from-brand-50 to-white",
  },
  {
    slug: "suc-khoe",
    name: "Hỗ trợ sức khoẻ",
    shortName: "Sức khoẻ",
    description:
      "Thực phẩm bảo vệ sức khoẻ hỗ trợ xương khớp, tim mạch, hệ miễn dịch và phục hồi cho người vận động.",
    audience: "Người lớn tuổi · Người tập luyện",
    iconName: "HeartPulse",
    gradient: "from-warm-red/10 to-white",
  },
  {
    slug: "my-pham",
    name: "Mỹ phẩm làm đẹp",
    shortName: "Mỹ phẩm",
    description:
      "Dòng chăm sóc da với thành phần thiên nhiên, làm sạch dịu nhẹ, cấp ẩm và dưỡng sáng phù hợp da Á.",
    audience: "Phụ nữ 25-45",
    iconName: "Sparkles",
    gradient: "from-gold/10 to-white",
  },
] as const;

export function getCategory(slug: CategorySlug): Category {
  const found = categories.find((c) => c.slug === slug);
  if (!found) {
    throw new Error(`Unknown category slug: ${slug}`);
  }
  return found;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return (CATEGORY_SLUGS as readonly string[]).includes(value);
}
