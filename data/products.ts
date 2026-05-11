import { type CategorySlug } from "./categories";

export type Product = {
  /** URL-friendly id, dùng làm route `/san-pham/[slug]`. */
  slug: string;
  /** Tên sản phẩm hiển thị (giữ tên gốc nhà sản xuất). */
  name: string;
  /** Mô tả phụ ngắn dưới tên — vd "Bột dinh dưỡng vị socola". */
  subtitle: string;
  category: CategorySlug;
  /** Mô tả ngắn dùng trên card / list. */
  shortDesc: string;
  /** Mô tả dài, có thể chứa xuống dòng. Sẽ render thành paragraph. */
  longDesc: string;
  ingredients?: string;
  usage?: string;
  warning?: string;
  /** Giá VND. `null` = liên hệ. */
  price: number | null;
  /** Đường dẫn ảnh trong /public. Ảnh đầu tiên là ảnh chính. */
  images: string[];
  /** Hiển thị trên trang chủ. */
  featured?: boolean;
  tags?: string[];
};

const STANDARD_FOOD_WARNING =
  "Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Tham khảo ý kiến bác sĩ với phụ nữ có thai, cho con bú và người đang điều trị bệnh.";

/**
 * Danh sách sản phẩm. Thêm/sửa/xoá ở đây — không cần đụng vào code khác.
 *
 * Quy ước:
 * - `slug` viết thường, dấu gạch ngang, không trùng nhau.
 * - Ảnh để tại `/public/products/<slug>/1.jpg`, `2.jpg`...
 *   Nếu chưa có ảnh, để mảng rỗng — site sẽ hiển thị placeholder.
 * - Đánh dấu `featured: true` cho các SP muốn nổi lên trang chủ (giới hạn 8).
 *
 * Nguồn dữ liệu: vnl.com.vn (tên, giá, công dụng, thành phần — đã kiểm chứng).
 */
export const products: readonly Product[] = [
  // ============ DINH DƯỠNG ============
  {
    slug: "green-quantum",
    name: "Green Quantum Nước uống cô đặc",
    subtitle: "Nước uống cô đặc bổ sung tảo Nannochloropsis",
    category: "dinh-duong",
    shortDesc:
      "Nước cô đặc với tảo Nannochloropsis và diệp lục, bổ sung dưỡng chất thực vật và chất chống oxy hoá cho cả gia đình.",
    longDesc:
      "Green Quantum là nước uống cô đặc được nghiên cứu kỹ lưỡng, kết hợp tảo Nannochloropsis sp. với chiết xuất cỏ Linh Lăng, arginin và diệp lục tự nhiên. Sản phẩm bổ sung dưỡng chất thực vật giàu chống oxy hoá, hỗ trợ sức khoẻ tổng thể cho người lớn và trẻ em trên 3 tuổi.",
    ingredients:
      "Nước tinh khiết, chất làm dày (glycerol, gôm xanthan), tảo Nannochloropsis sp., arginin, chất chống oxy hoá, diệp lục, chiết xuất cỏ Linh Lăng.",
    usage:
      "Pha 3-5ml với 200ml nước lọc hoặc nước trái cây, dùng 1-3 lần/ngày. Bảo quản trong ngăn mát tủ lạnh và dùng trong 1 tháng sau khi mở.",
    warning: STANDARD_FOOD_WARNING,
    price: 220909,
    images: ["/products/green-quantum/1.jpg"],
    featured: true,
    tags: ["tảo biển", "chống oxy hoá", "gia đình"],
  },
  {
    slug: "caphelink-new",
    name: "Thực phẩm bổ sung Caphelink New",
    subtitle: "Cà phê hoà tan kết hợp thảo dược quý",
    category: "dinh-duong",
    shortDesc:
      "Cà phê hoà tan tinh khiết kết hợp Lá chay, Hoàng kỳ và Deltaimmune — tiện lợi mỗi ngày, hỗ trợ tăng cường sức khoẻ.",
    longDesc:
      "Caphelink New là sự kết hợp giữa cà phê hoà tan nguyên chất với các loại thảo dược quý như Lá chay, Hoàng kỳ và Deltaimmune 150mg. Sản phẩm bổ sung selen cùng các dưỡng chất, mang đến tách cà phê thơm ngon và có giá trị hỗ trợ sức khoẻ.",
    ingredients:
      "Chất tạo ngọt tự nhiên (đường tinh luyện, lactose, dextrose, manitol), bột kem không sữa, cà phê hoà tan nguyên chất, Lá chay, Hoàng kỳ, Deltaimmune 150mg, hương liệu thực phẩm, natri clorid, selen 15mcg.",
    usage:
      "Ngày dùng 1-2 gói hoặc nhiều hơn theo nhu cầu. Pha 1 gói với khoảng 50ml nước nóng, khuấy đều. Có thể uống nóng hoặc thêm đá.",
    warning: STANDARD_FOOD_WARNING,
    price: 407455,
    images: ["/products/caphelink-new/1.jpg"],
    featured: true,
    tags: ["cà phê", "thảo dược", "tiện lợi"],
  },
  {
    slug: "vhealth-chocolate",
    name: "Thực phẩm bổ sung Vhealth (hương Socola)",
    subtitle: "Bột dinh dưỡng vị socola dạng gói",
    category: "dinh-duong",
    shortDesc:
      "Bột dinh dưỡng vị socola tiện lợi, bổ sung vitamin và khoáng chất, phù hợp người lớn và trẻ em trên 6 tuổi.",
    longDesc:
      "Vhealth hương Socola là sản phẩm dinh dưỡng dạng gói 25g tiện dụng, kết hợp các thành phần thảo dược, vitamin, khoáng chất với hương socola đậm đà dễ uống. Phù hợp cho người bận rộn cần bổ sung dinh dưỡng nhanh và cho trẻ em trên 6 tuổi.",
    usage:
      "Pha 1 gói (25g) với khoảng 150ml nước lọc, sữa hoặc nước hoa quả. Người lớn và trẻ em > 6 tuổi: 1-3 gói/ngày hoặc nhiều hơn theo nhu cầu. Ngon hơn khi pha với nước ấm.",
    warning: STANDARD_FOOD_WARNING,
    price: 652909,
    images: ["/products/vhealth-chocolate/1.jpg"],
    tags: ["socola", "bữa phụ", "gói tiện lợi"],
  },
  {
    slug: "vhealth-tra-xanh",
    name: "Thực phẩm bổ sung VHEALTH (hương trà xanh)",
    subtitle: "Bột dinh dưỡng vị trà xanh dạng gói",
    category: "dinh-duong",
    shortDesc:
      "Bột dinh dưỡng vị trà xanh thanh mát kết hợp matcha và sữa — bổ sung vitamin từ nhiều loại hạt dinh dưỡng.",
    longDesc:
      "Vhealth hương trà xanh là phiên bản với hương vị matcha và sữa thanh mát, dễ uống. Thành phần kết hợp gạo, đậu nành, đậu Hà Lan, hạnh nhân, yến mạch cùng các vitamin và khoáng chất thiết yếu, mang đến lựa chọn dinh dưỡng thay thế bữa phụ.",
    usage:
      "Pha 1 gói (25g) với khoảng 150ml nước. Người lớn và trẻ em > 6 tuổi sử dụng theo nhu cầu.",
    warning: STANDARD_FOOD_WARNING,
    price: 652909,
    images: ["/products/vhealth-tra-xanh/1.jpg"],
    tags: ["trà xanh", "matcha", "ngũ cốc"],
  },
  {
    slug: "topapro",
    name: "Thực phẩm bổ sung TOPAPRO",
    subtitle: "Protein thực vật & amino acid thiết yếu",
    category: "dinh-duong",
    shortDesc:
      "Bột dinh dưỡng giàu PROTEOSMART® và 9 amino acid thiết yếu, cung cấp protein thực vật chất lượng cao cho cả gia đình.",
    longDesc:
      "TOPAPRO là thực phẩm bổ sung kết hợp PROTEOSMART® (bột cô đặc từ hạt với hàm lượng protein ≥57%) và Bio-She, cung cấp protein thực vật và các acid amin thiết yếu cùng khoáng chất. Phù hợp cho cả trẻ em từ 3 tuổi, người lớn và người tập luyện cần bổ sung protein chất lượng.",
    ingredients:
      "Đạm đậu Hà Lan (non-GMO), PROTEOSMART® (≥57% protein), Bio-She, tảo chlorella, bột cacao, 9 amino acid thiết yếu (lysine, threonine, histidine, leucine, valine, phenylalanine, isoleucine, methionine, tryptophan).",
    usage:
      "Trẻ 3-5 tuổi: 1-2 gói/ngày. Trẻ 6-11 tuổi: 1 gói x 1-3 lần/ngày. Từ 12 tuổi và người lớn: 1-2 gói/lần, 1-2 lần/ngày. Pha 25g với 150-250ml nước ấm, có thể kết hợp sữa, nước trái cây hoặc mật ong.",
    warning: STANDARD_FOOD_WARNING,
    price: 682364,
    images: ["/products/topapro/1.jpg"],
    featured: true,
    tags: ["protein thực vật", "amino acid", "gia đình"],
  },
  // ============ HỖ TRỢ SỨC KHOẺ ============
  {
    slug: "vsportgel",
    name: "Thực phẩm bảo vệ sức khoẻ VSPORTGEL",
    subtitle: "Gel năng lượng dạng gói cho người vận động",
    category: "suc-khoe",
    shortDesc:
      "Gel năng lượng dạng gói uống với L-Carnitine, Taurine và BCAA — bổ sung dưỡng chất, hỗ trợ phục hồi cho người tập luyện.",
    longDesc:
      "VSPORTGEL là thực phẩm bảo vệ sức khoẻ dạng gel uống tiện lợi (đóng gói 15g/gói, hộp 750g — 50 gói), được nghiên cứu dành riêng cho người vận động viên và người tập luyện thường xuyên. Công thức kết hợp L-Carnitine, Taurine và các amino acid chuỗi nhánh BCAA cùng vitamin nhóm B và khoáng chất, hỗ trợ bổ sung năng lượng và giảm mệt mỏi.",
    ingredients:
      "L-Carnitine 150mg/gói, Taurine 150mg, BCAA (Leucine, Isoleucine, Valine), Vitamin nhóm B (B1, B5, B6), Magnesium, Kẽm, D-Ribose, L-Arginine.",
    usage:
      "Uống 1-2 gói/lần x 1-2 lần/ngày. Trong giai đoạn cần tăng cường (trước/sau tập luyện cường độ cao): 2-4 gói/lần. Có thể uống trực tiếp hoặc pha với nước.",
    warning:
      STANDARD_FOOD_WARNING +
      " Lưu ý: Đây là sản phẩm dạng GEL UỐNG — không phải gel xoa bóp ngoài da.",
    price: 1914545,
    images: ["/products/vsportgel/1.jpg"],
    featured: true,
    tags: ["BCAA", "vận động", "phục hồi"],
  },
  // ============ THIẾT YẾU ============
  {
    slug: "vsmile-kem-danh-rang",
    name: "KEM ĐÁNH RĂNG VSMILE (150g/hộp)",
    subtitle: "Kem đánh răng nano canxi và chiết xuất neem",
    category: "thiet-yeu",
    shortDesc:
      "Kem đánh răng với nano canxi và tinh dầu neem, làm sạch răng, ngừa sâu răng và viêm nướu, mang lại hơi thở thơm mát.",
    longDesc:
      "VSMILE là kem đánh răng dạng hộp 150g, kết hợp nano canxi (Calcium Hydroxyapatite) với chiết xuất neem truyền thống, sorbitol và xylitol. Sản phẩm giúp làm sạch răng, loại bỏ mảng bám và vi khuẩn gây hại, phòng ngừa sâu răng, viêm và chảy máu chân răng, đồng thời bảo vệ men răng và mang lại hơi thở thơm mát.",
    ingredients:
      "Nước tinh khiết, sorbitol, hydrated silica, xylitol, glycerin, nano canxi (Calcium Hydroxyapatite), chiết xuất neem, menthol, sodium lauryl sulfate, methylparaben/propylparaben.",
    usage:
      "Phủ một lượng kem đánh răng vừa đủ lên bàn chải, đánh toàn bộ răng trong khoảng 2 phút. Dùng tối thiểu 2 lần/ngày — sau khi thức dậy, sau bữa ăn và trước khi đi ngủ.",
    price: 176727,
    images: ["/products/vsmile-kem-danh-rang/1.jpg"],
    featured: true,
    tags: ["nano canxi", "neem", "răng miệng"],
  },
  // ============ MỸ PHẨM ORICO ============
  {
    slug: "orico-sua-rua-mat",
    name: "Sữa rửa mặt Orico Cleanser",
    subtitle: "Làm sạch dịu nhẹ, không sulfate & paraben",
    category: "my-pham",
    shortDesc:
      "Sữa rửa mặt với chất làm sạch từ dầu dừa tự nhiên, sâm Hàn Quốc và Exo-P™ — dịu nhẹ cho cả da nhạy cảm.",
    longDesc:
      "Orico Cleanser kết hợp các chất làm sạch dẫn xuất từ dầu dừa tự nhiên với chiết xuất sâm Hàn Quốc và Exo-P™ — công nghệ vi sinh độc quyền. Sản phẩm làm sạch lớp trang điểm, bụi bẩn và tế bào chết mà vẫn giữ được độ ẩm tự nhiên của da. Phù hợp cho cả da nhạy cảm.",
    ingredients:
      "Sodium cocoyl isethionate, chiết xuất sâm Hàn Quốc, Exo-P™, gluconolactone, hyaluronic acid, panthenol, chiết xuất hoa cỏ ba lá.",
    usage:
      "Làm ướt mặt, lấy một lượng vừa đủ tạo bọt và massage nhẹ nhàng theo chuyển động tròn. Rửa lại với nước sạch.",
    price: 378000,
    images: ["/products/orico-sua-rua-mat/1.jpg"],
    featured: true,
    tags: ["da nhạy cảm", "không sulfate", "hằng ngày"],
  },
  {
    slug: "orico-toner",
    name: "Nước hoa hồng Orico Toner",
    subtitle: "Cân bằng & cấp ẩm với niacinamide",
    category: "my-pham",
    shortDesc:
      "Toner với Exo-P™, niacinamide, sâm Hàn Quốc và allantoin — cân bằng pH, làm sáng và dịu da. Không cồn, không paraben.",
    longDesc:
      "Orico Toner là bước chăm sóc thiết yếu sau khi rửa mặt, công thức kết hợp Exo-P™ và nước Quantum cùng niacinamide làm sáng da, sâm Hàn Quốc tăng độ rạng rỡ, allantoin làm dịu và cấp ẩm, chiết xuất đu đủ hỗ trợ tẩy da chết nhẹ. Không chứa cồn và paraben — an toàn cho da nhạy cảm.",
    ingredients:
      "Nước Quantum, Exo-P™, niacinamide (Vitamin B3), chiết xuất sâm Hàn Quốc, allantoin, chiết xuất đu đủ, hyaluronic acid.",
    usage:
      "Sau khi rửa mặt, lấy một lượng vừa đủ ra tay hoặc bông tẩy trang, vỗ nhẹ đều khắp mặt và cổ. Đợi 2-3 phút trước khi dùng bước skincare tiếp theo.",
    price: 540000,
    images: ["/products/orico-toner/1.jpg"],
    tags: ["niacinamide", "cấp ẩm", "không cồn"],
  },
  {
    slug: "orico-micellar",
    name: "Nước tẩy trang Orico Micellar Water",
    subtitle: "Tẩy trang dịu nhẹ không cần rửa lại",
    category: "my-pham",
    shortDesc:
      "Micellar water với Babassu Oil esters, Exo-P™, vitamin B5 và Calendula — làm sạch trang điểm và bảo vệ da khỏi ô nhiễm.",
    longDesc:
      "Orico Micellar Water dùng công nghệ micelle để làm sạch trang điểm, bụi bẩn và bã nhờn dư thừa một cách nhẹ nhàng. Công thức bổ sung Exo-P™ bảo vệ da khỏi tác nhân ô nhiễm và kim loại nặng, vitamin B5 (D-Panthenol) cùng chiết xuất Calendula cấp ẩm và làm dịu. Không cồn, không paraben.",
    ingredients:
      "Babassu oil glycereth-8 esters, PEG-7 glyceryl cocoate, Exo-P™, D-Panthenol (Vitamin B5), chiết xuất Calendula, chiết xuất sâm Hàn Quốc, sodium PCA.",
    usage:
      "Thấm một lượng vừa đủ lên bông tẩy trang, lau nhẹ nhàng toàn mặt (kể cả vùng mắt). Không cần rửa lại với nước.",
    price: 587127,
    images: ["/products/orico-micellar/1.jpg"],
    tags: ["tẩy trang", "không rửa lại", "Calendula"],
  },
  {
    slug: "orico-cream",
    name: "Kem dưỡng da Orico Cream",
    subtitle: "Dưỡng ẩm, làm sáng & hỗ trợ chống lão hoá",
    category: "my-pham",
    shortDesc:
      "Kem dưỡng cao cấp với Hexyl 3-glyceryl ascorbate, sâm Hàn Quốc, sodium hyaluronate và Aquaxyl — dưỡng ẩm sâu và làm sáng da.",
    longDesc:
      "Orico Cream là kem dưỡng da kết hợp công nghệ hiện đại và chiết xuất thảo dược, hỗ trợ làm mờ thâm nám, dưỡng sáng và chống lão hoá. Thành phần Hexyl 3-glyceryl ascorbate (vitamin C ổn định) cùng sâm Hàn Quốc, sodium hyaluronate và Aquaxyl cấp ẩm sâu, mang lại làn da mềm mượt và rạng rỡ.",
    ingredients:
      "Hexyl 3-glyceryl ascorbate, chiết xuất sâm Hàn Quốc, sodium hyaluronate, Aquaxyl.",
    usage:
      "Sau bước rửa mặt và toner, lấy một lượng vừa đủ, thoa và massage nhẹ nhàng từ giữa khuôn mặt ra ngoài. Dùng sáng và tối.",
    price: 1030909,
    images: ["/products/orico-cream/1.jpg"],
    featured: true,
    tags: ["chống lão hoá", "vitamin C", "dưỡng sáng"],
  },
  {
    slug: "orico-sunscreen",
    name: "Kem chống nắng Orico Sun Screen",
    subtitle: "Bảo vệ da với Lingostem™ và astaxanthin",
    category: "my-pham",
    shortDesc:
      "Kem chống nắng với Lingostem™, sâm Hàn Quốc và astaxanthin — bảo vệ da khỏi tia UV và làm chậm dấu hiệu lão hoá.",
    longDesc:
      "Orico Sun Screen bảo vệ da khỏi tác hại của tia UV, phòng ngừa các dấu hiệu lão hoá sớm, làm mờ vết thâm và nếp nhăn do nắng. Công thức nổi bật với Lingostem™ — chiết xuất từ quả việt quất Lingoberry bằng công nghệ tế bào gốc thực vật, kết hợp sâm Hàn Quốc và astaxanthin cùng chiết xuất tô mộc.",
    ingredients:
      "Lingostem™ (chiết xuất Vaccinium vitis-idaea), chiết xuất sâm Hàn Quốc, astaxanthin, chiết xuất gỗ tô mộc (Caesalpinia sappan).",
    usage:
      "Sau các bước chăm sóc da, lấy một lượng vừa đủ thoa đều mặt và vùng da hở. Thoa trước khi ra nắng ít nhất 20 phút và thoa lại sau mỗi 2-3 giờ.",
    price: 711818,
    images: ["/products/orico-sunscreen/1.jpg"],
    featured: true,
    tags: ["chống nắng", "Lingostem", "astaxanthin"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export function countByCategory(category: CategorySlug): number {
  return getProductsByCategory(category).length;
}
