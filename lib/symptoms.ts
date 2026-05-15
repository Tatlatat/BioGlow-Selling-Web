import { type Product } from "@/data/products";

/**
 * 6 symptom buckets — group sản phẩm theo nỗi đau khách thường tìm.
 * Mục tiêu: khách 35-65 tuổi gõ "mất ngủ" hay "đau khớp" tìm SP nhanh hơn
 * thay vì duyệt theo category trừu tượng (TPCN/Mỹ phẩm).
 */
export type SymptomSlug =
  | "mat-ngu-stress"
  | "tim-mach-duong-huyet"
  | "dep-da-lao-hoa"
  | "nang-luong-met-moi"
  | "xuong-khop"
  | "de-khang-tieu-hoa";

export type Symptom = {
  slug: SymptomSlug;
  label: string;
  /** Emoji/icon hint hiển thị trong chip. */
  hint: string;
  /** Mô tả ngắn hiển thị khi hover hoặc dưới chip active. */
  description: string;
  /** Tag/keyword (lowercase) match → SP thuộc nhóm này. */
  matchTags: ReadonlyArray<string>;
  /** Substring trong product.subtitle/shortDesc/benefits cũng coi là match. */
  matchKeywords: ReadonlyArray<string>;
};

export const SYMPTOMS: ReadonlyArray<Symptom> = [
  {
    slug: "mat-ngu-stress",
    label: "Mất ngủ & Trí nhớ",
    hint: "🌙",
    description: "Hỗ trợ giấc ngủ, giảm căng thẳng, tăng cường trí nhớ",
    matchTags: ["mất ngủ", "ngủ", "trí nhớ", "não bộ", "stress", "căng thẳng"],
    matchKeywords: ["mất ngủ", "ngủ ngon", "não", "trí nhớ", "tập trung", "DHA"],
  },
  {
    slug: "tim-mach-duong-huyet",
    label: "Tim mạch & Đường huyết",
    hint: "❤️",
    description: "Hỗ trợ tim mạch, mỡ máu, đường huyết, huyết áp",
    matchTags: ["tim mạch", "mỡ máu", "đường huyết", "huyết áp", "tiểu đường"],
    matchKeywords: ["tim mạch", "mỡ máu", "huyết áp", "tiểu đường", "đường huyết"],
  },
  {
    slug: "dep-da-lao-hoa",
    label: "Đẹp da & Chống lão hoá",
    hint: "✨",
    description: "Chăm sóc da, chống lão hoá, làm trắng, dưỡng ẩm",
    matchTags: ["da", "lão hoá", "chống oxy hoá", "collagen", "skincare"],
    matchKeywords: ["da", "lão hoá", "trẻ hoá", "collagen", "chống nắng", "dưỡng ẩm", "kem"],
  },
  {
    slug: "nang-luong-met-moi",
    label: "Năng lượng & Mệt mỏi",
    hint: "⚡",
    description: "Tăng năng lượng, giảm mệt mỏi, hỗ trợ vận động và phục hồi",
    matchTags: ["năng lượng", "mệt", "vận động", "phục hồi", "thể lực", "BCAA"],
    matchKeywords: ["mệt mỏi", "năng lượng", "tập luyện", "thể thao", "phục hồi"],
  },
  {
    slug: "xuong-khop",
    label: "Xương khớp",
    hint: "🦴",
    description: "Hỗ trợ xương khớp, giảm đau mỏi, thoái hoá",
    matchTags: ["xương khớp", "khớp", "xương", "thoái hoá"],
    matchKeywords: ["xương", "khớp", "đau lưng", "thoái hoá", "loãng xương"],
  },
  {
    slug: "de-khang-tieu-hoa",
    label: "Đề kháng & Tiêu hoá",
    hint: "🛡️",
    description: "Tăng đề kháng, hỗ trợ tiêu hoá, cho cả gia đình và trẻ em",
    matchTags: ["đề kháng", "miễn dịch", "tiêu hoá", "đại tràng", "trẻ em", "fucoidan"],
    matchKeywords: ["đề kháng", "miễn dịch", "tiêu hoá", "đường ruột", "trẻ em"],
  },
];

const SYMPTOM_BY_SLUG: Map<string, Symptom> = new Map(
  SYMPTOMS.map((s) => [s.slug, s]),
);

export function isSymptomSlug(value: string): value is SymptomSlug {
  return SYMPTOM_BY_SLUG.has(value);
}

export function getSymptom(slug: SymptomSlug): Symptom {
  const s = SYMPTOM_BY_SLUG.get(slug);
  if (!s) throw new Error(`Unknown symptom slug: ${slug}`);
  return s;
}

function lower(strs: ReadonlyArray<string> | undefined): string[] {
  return (strs ?? []).map((s) => s.toLowerCase());
}

function productHaystack(p: Product): string[] {
  const tags = lower(p.tags);
  const benefits = lower(p.benefits);
  const subtitle = (p.subtitle ?? "").toLowerCase();
  const shortDesc = (p.shortDesc ?? "").toLowerCase();
  return [...tags, ...benefits, subtitle, shortDesc];
}

export function productMatchesSymptom(p: Product, symptom: Symptom): boolean {
  const haystack = productHaystack(p);
  const tagSet = new Set(lower(p.tags));
  // Tag match: exact contain trong tag
  for (const t of symptom.matchTags) {
    if (tagSet.has(t.toLowerCase())) return true;
  }
  // Keyword match: substring trong tag/benefit/desc
  for (const k of symptom.matchKeywords) {
    const kl = k.toLowerCase();
    if (haystack.some((s) => s.includes(kl))) return true;
  }
  return false;
}

export function filterProductsBySymptom<T extends Product>(
  products: ReadonlyArray<T>,
  slug: SymptomSlug,
): T[] {
  const s = getSymptom(slug);
  return products.filter((p) => productMatchesSymptom(p, s));
}

/** Đếm số SP thuộc mỗi symptom — dùng để hiển thị badge số bên cạnh chip. */
export function countProductsBySymptom(
  products: ReadonlyArray<Product>,
): Record<SymptomSlug, number> {
  const counts = {} as Record<SymptomSlug, number>;
  for (const s of SYMPTOMS) {
    counts[s.slug] = products.filter((p) => productMatchesSymptom(p, s)).length;
  }
  return counts;
}
