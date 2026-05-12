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
    ingredients:
      "Kem không sữa, bột hỗn hợp các hạt (gạo tẻ, đậu nành, đậu xanh, đậu lăng, hạnh nhân, đậu Hà Lan), maltodextrin, protein đậu Hà Lan, chất xơ hoà tan (FOS, Inulin), bột sữa gầy, yến mạch, bột ca cao, fructose, hương socola và vani, gôm gua, gôm xanthan. Thảo dược: Hoàng kỳ, Đảng sâm, nấm Chaga, nấm Ngưu Chương chi, Immulata (nấm hầu thủ + tảo Nannochloropsis sp.), IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus). Vitamin & khoáng chất: Canxi 125mg, Magiê 10mg, Kẽm 2mg, Vitamin C 15mg, Vitamin B1/B2/B6 (0.5mg mỗi loại), silicon dioxide, sucralose, natri clorid.",
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
    ingredients:
      "Kem không sữa, bột hỗn hợp các hạt (gạo tẻ, đậu nành, đậu xanh, đậu lăng, hạnh nhân, đậu Hà Lan), maltodextrin, protein đậu Hà Lan, chất xơ hoà tan (FOS, Inulin), bột sữa gầy, yến mạch, bột Matcha, hương trà xanh - matcha - sữa, gôm xanthan, gôm gua. Thảo dược: Hoàng kỳ, Đảng sâm, nấm Chaga. Vitamin & khoáng chất: Canxi 125mg, Vitamin C 15mg, Magiê 10mg, Kẽm 2mg, Vitamin B1/B2/B6 (0.5mg mỗi loại).",
    usage:
      "Pha 1 gói (25g) với khoảng 150ml nước. Người lớn và trẻ em > 6 tuổi: 1-3 gói/ngày hoặc nhiều hơn theo nhu cầu.",
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
  {
    slug: "hydrogen-quantum",
    name: "Nước uống Hydrogen Quantum",
    subtitle: "Nước uống cấu trúc phân tử nhỏ chứa Hydrogen",
    category: "dinh-duong",
    shortDesc:
      "Nước uống hằng ngày với cấu trúc phân tử nhỏ và Hydrogen — bổ sung nước cho cơ thể, tiện dùng tại chỗ.",
    longDesc:
      "Hydrogen Quantum là nước uống có cấu trúc phân tử nhỏ chứa Hydrogen, được đóng chai sẵn để dùng trực tiếp. Sản phẩm phù hợp làm nước uống hằng ngày, dễ mang theo và sử dụng tiện lợi cho cả gia đình.",
    ingredients:
      "Nước tinh khiết cấu trúc phân tử nhỏ, Hydrogen.",
    usage:
      "Uống trực tiếp ngay khi mở nắp. Đóng kín nắp sau mỗi lần dùng. Khuyến nghị sử dụng trong vòng 4 giờ sau khi mở nắp để đảm bảo chất lượng.",
    warning: STANDARD_FOOD_WARNING,
    price: 780545,
    images: [],
    tags: ["hydrogen", "nước uống", "hằng ngày"],
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
  {
    slug: "vtopcan",
    name: "Thực phẩm bảo vệ sức khoẻ VTOPCAN",
    subtitle: "Công thức cao cấp hỗ trợ đề kháng và phục hồi",
    category: "suc-khoe",
    shortDesc:
      "Công thức kết hợp Fucoidan, Lunasin và nhiều thảo dược quý — hỗ trợ chống oxy hoá và tăng cường sức đề kháng cho người sức khoẻ suy yếu.",
    longDesc:
      "VTOPCAN là dòng thực phẩm bảo vệ sức khoẻ cao cấp dạng cốm, đóng gói 15g/gói (1800g — 4 hộp x 30 gói). Công thức kết hợp Fucoidan với IMCDeltaImmune, protein đậu nành chứa Lunasin cùng nhiều chiết xuất thảo dược, hỗ trợ cơ thể chống oxy hoá và nâng cao sức đề kháng. Phù hợp cho trẻ em từ 6 tuổi trở lên và người lớn, đặc biệt người sức khoẻ suy giảm.",
    ingredients:
      "Fucoidan 205mg, IMCDeltaImmune 100mg, Protein đậu nành chứa Lunasin 100mg, Cao Lá tre 50mg, Tảo Nannochloropsis sp. 25mg, Cao Sả 25mg, Cao Hoa đu đủ đực 5mg, Chiết xuất nấm Ngưu Chương chi 5mg, Selen 20mcg. Phụ liệu: maltodextrin, chất tạo ngọt, hương liệu, acid citric, kali sorbat, gôm gellan, phẩm màu tổng hợp.",
    usage:
      "Ngày dùng 2-4 gói, chia 2 lần. Uống sau bữa ăn 1 giờ. Pha với nước lọc hoặc dùng trực tiếp.",
    warning: STANDARD_FOOD_WARNING,
    price: 8826545,
    images: [],
    tags: ["fucoidan", "đề kháng", "cao cấp"],
  },
  {
    slug: "man-link-max",
    name: "Thực phẩm bảo vệ sức khoẻ MAN-LINK® MAX",
    subtitle: "Hỗ trợ bổ thận tráng dương cho nam giới",
    category: "suc-khoe",
    shortDesc:
      "Viên uống dành cho nam giới với L-Arginine, Bạch tật lê, Ba kích và Đông trùng hạ thảo — hỗ trợ bổ thận và tăng cường sinh lực.",
    longDesc:
      "MAN-LINK® MAX là thực phẩm bảo vệ sức khoẻ dạng viên dành cho nam giới trưởng thành. Công thức kết hợp L-Arginine HCl, IMCDeltaImmune cùng các vị thảo dược truyền thống như Bạch tật lê, Dâm dương hoắc, Ba kích, Nhân sâm, Đông trùng hạ thảo — hỗ trợ bổ thận tráng dương, giảm các biểu hiện đau lưng, mỏi gối do thận kém.",
    ingredients:
      "L-Arginine HCl 450mg, IMCDeltaImmune 150mg, Cao Bạch tật lê 90mg, Cao Dâm dương hoắc 75mg, Cao Ba kích 75mg, Chiết xuất hạt Cỏ cà ri (Fenugreek) 75mg, Cao Nhân sâm 25mg, DHEA 10mg, Kẽm 10mg, Đông trùng hạ thảo 5mg. Phụ liệu và màng bao.",
    usage:
      "Uống 2-3 viên/ngày, chia 2-3 lần. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Khuyến nghị dùng liên tục 1-3 tháng.",
    warning: STANDARD_FOOD_WARNING,
    price: 765818,
    images: [],
    tags: ["nam giới", "bổ thận", "sinh lực"],
  },
  {
    slug: "mindenergy-max",
    name: "Thực phẩm bảo vệ sức khoẻ MINDENERGY® MAX",
    subtitle: "Hỗ trợ tăng cường trí nhớ và giảm mệt mỏi tinh thần",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Bacopa monnieri, Ngưu tất và DHA — hỗ trợ tăng cường trí nhớ và làm giảm nguy cơ suy giảm trí nhớ ở người trưởng thành.",
    longDesc:
      "MINDENERGY® MAX là thực phẩm bảo vệ sức khoẻ dạng viên, được nghiên cứu để hỗ trợ não bộ. Công thức kết hợp enzym tiêu sợi huyết từ ImmuBeans, DeltaImmune, Bacopa monnieri, L-Carnitine, DHA cùng các thảo dược như Ngưu tất, Đinh lăng — phù hợp cho người trưởng thành làm việc trí óc nhiều, hay căng thẳng, suy giảm trí nhớ.",
    ingredients:
      "Enzym tiêu sợi huyết từ ImmuBeans (chiết xuất đậu tương lên men) 450FU, DeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Cao Ngưu tất 125mg, Chiết xuất Bacopa monnieri 90mg, L-Carnitine 60mg, Cao Đinh lăng 55mg, DHA 10mg. Phụ liệu và màng bao.",
    usage:
      "Uống 1 viên/lần x 1-3 lần/ngày. Uống khi đói: sau ăn 2 giờ hoặc trước ăn 30 phút. Uống nguyên viên.",
    warning: STANDARD_FOOD_WARNING,
    price: 495818,
    images: [],
    tags: ["trí nhớ", "não bộ", "DHA"],
  },
  {
    slug: "kidsmune-max",
    name: "Thực phẩm bảo vệ sức khoẻ KIDSMUNE® MAX",
    subtitle: "Cốm dinh dưỡng hỗ trợ đề kháng cho trẻ từ 3 tuổi",
    category: "suc-khoe",
    shortDesc:
      "Cốm uống cho trẻ với Inulin, Colostrum (sữa non), DeltaImmune và DHA — hỗ trợ tăng cường đề kháng và tiêu hoá.",
    longDesc:
      "KIDSMUNE® MAX là thực phẩm bảo vệ sức khoẻ dạng cốm dành cho trẻ em từ 3 tuổi. Công thức kết hợp chất xơ hoà tan (Inulin, FOS, GOS), Colostrum, IMCDeltaImmune cùng Hoàng kỳ, Diếp cá, L-Lysine, Taurine, DHA, kẽm, lutein, acid folic — hỗ trợ trẻ ăn ngon miệng, tiêu hoá tốt và tăng cường đề kháng.",
    ingredients:
      "Inulin 405mg, IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 300mg, Colostrum (sữa non) 200mg, Cao Hoàng kỳ 155mg, Cao Diếp cá (Houttuynia cordata) 130mg, Galacto Oligosaccharide (GOS) 90mg, L-Lysine HCl 50mg, Taurine 50mg, Fructose Oligosaccharide (FOS) 10mg, DHA 5mg, Kẽm gluconat 2mg, Lutein 1mg, Acid folic 130mcg. Phụ liệu: đường, bột ca cao, hương liệu, chất chống đông vón, phẩm màu caramel, chất ổn định, sucralose.",
    usage:
      "Trẻ 3-4 tuổi: 1 gói x 1-2 lần/ngày. Trẻ 5-9 tuổi: 1 gói x 2-3 lần/ngày. Trẻ 10 tuổi trở lên: 2 gói x 2 lần/ngày. Pha với nước hoặc sữa, uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ.",
    warning: STANDARD_FOOD_WARNING,
    price: 505636,
    images: [],
    tags: ["trẻ em", "đề kháng", "tiêu hoá"],
  },
  {
    slug: "cardiopro-max",
    name: "Thực phẩm bảo vệ sức khoẻ Cardiopro® Max",
    subtitle: "Hỗ trợ tim mạch và giảm mỡ máu",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Đan sâm, Hoàng bá, Natto và DeltaImmune — hỗ trợ hoạt huyết, lưu thông khí huyết và bảo vệ tim mạch.",
    longDesc:
      "Cardiopro® Max là thực phẩm bảo vệ sức khoẻ dạng viên, dành cho người cần chăm sóc tim mạch. Công thức kết hợp IMCDeltaImmune với các vị thảo dược như Hoàng bá, Đan sâm, Hoàng đằng cùng Magnesi và chiết xuất Natto — hỗ trợ hoạt huyết, lưu thông khí huyết, giảm mỡ máu và bảo vệ tim mạch. Lưu ý không dùng cho người rối loạn đông máu, trước/sau phẫu thuật, phụ nữ có thai và phụ nữ trong kỳ kinh nguyệt nhiều.",
    ingredients:
      "IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Cao Hoàng bá 150mg, Cao Đan sâm 150mg, Magnesi lactat dihydrat 90mg, Cao Hoàng đằng 75mg, Cao Natto 75mg, L-Carnitine fumarat 37.5mg. Phụ liệu: lactose, CPC, talc, silicon dioxide, magnesi stearat, polyvinyl pyrrolidon, HPMC, phẩm màu, polyvinyl alcohol, PEG, titan dioxide, polysorbate 80.",
    usage:
      "Ngày dùng 2-4 viên, chia 2 lần. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Nên dùng liên tục một đợt 3-6 tháng.",
    warning:
      STANDARD_FOOD_WARNING +
      " Không dùng cho người rối loạn đông máu, trước và sau phẫu thuật, phụ nữ kinh nguyệt nhiều.",
    price: 519382,
    images: [],
    tags: ["tim mạch", "mỡ máu", "Đan sâm"],
  },
  {
    slug: "detoxmune-max",
    name: "Thực phẩm bảo vệ sức khoẻ Detoxmune® Max",
    subtitle: "Hỗ trợ giải độc và bảo vệ chức năng gan",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Bạch phục linh, Alpha Lipoic Acid và DeltaImmune — hỗ trợ bảo vệ và tăng cường chức năng gan.",
    longDesc:
      "Detoxmune® Max là thực phẩm bảo vệ sức khoẻ dành cho người cần chăm sóc gan — người uống nhiều rượu bia, dùng thuốc dài ngày hoặc có biểu hiện mề đay, vàng da, ăn uống kém. Công thức kết hợp IMCDeltaImmune với chiết xuất Bạch phục linh, Calcium alginate, L-Carnitine, L-Arginine và Alpha Lipoic Acid — hỗ trợ bảo vệ gan, hỗ trợ giải độc và tăng cường chức năng gan.",
    ingredients:
      "IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Chiết xuất Bạch phục linh (Poria cocos) 375mg, Calcium alginate 150mg, L-Carnitine fumarate 22.5mg, L-Arginine HCl 18.5mg, Alpha Lipoic Acid 15mg. Phụ liệu: sodium succinate hexahydrate, cellulose vi tinh thể, chất chống đông vón (silicon dioxide, talc, magnesi stearat), lactose, polyvinyl alcohol, PVP, HPMC, PEG, titan dioxide, polysorbate 80, phẩm màu thực phẩm (xanh brilliant FCF, vàng tartrazine).",
    usage:
      "Uống 1 viên/lần x 1-2 lần/ngày. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Nên dùng liên tục 3-6 tháng.",
    warning: STANDARD_FOOD_WARNING,
    price: 584182,
    images: [],
    tags: ["bảo vệ gan", "giải độc", "Alpha Lipoic"],
  },
  {
    slug: "genecel-max",
    name: "Thực phẩm bảo vệ sức khoẻ Genecel® Max",
    subtitle: "Hỗ trợ chống oxy hoá và làm chậm lão hoá",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Linh chi, Bạch thược, Pine bark và Alpha Lipoic Acid — hỗ trợ tăng cường đề kháng, chống oxy hoá và hạn chế lão hoá.",
    longDesc:
      "Genecel® Max là thực phẩm bảo vệ sức khoẻ dành cho người trưởng thành cần tăng cường đề kháng, chống oxy hoá và hạn chế lão hoá. Công thức kết hợp IMCDeltaImmune, Taurine, Bạch thược, Linh chi, Khổ sâm bắc, chiết xuất vỏ thông (Pine bark) và Alpha Lipoic Acid.",
    ingredients:
      "IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Taurine 300mg, Cao Bạch thược 100mg, Cao Linh chi 100mg, Cao Khổ sâm bắc 90mg, Chiết xuất vỏ thông (Pine bark) 30mg, Acid Alpha Lipoic 20mg. Phụ liệu: cellulose, silicon dioxide, magnesi stearat, povidon, HPMC, PEG, titan dioxide, xanh brilliant FCF.",
    usage:
      "Ngày dùng 2-4 viên, chia 2 lần. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Nên dùng liên tục 3-6 tháng. Bảo quản nơi khô mát dưới 30°C, tránh ánh nắng trực tiếp.",
    warning: STANDARD_FOOD_WARNING,
    price: 520363,
    images: [],
    tags: ["chống oxy hoá", "lão hoá", "đề kháng"],
  },
  {
    slug: "lacttocol-max",
    name: "Thực phẩm bảo vệ sức khoẻ Lacttocol® Max",
    subtitle: "Hỗ trợ bảo vệ niêm mạc đại tràng",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Bạch truật, Bạch phục linh và DeltaImmune — hỗ trợ bảo vệ đại tràng và giảm rối loạn tiêu hoá.",
    longDesc:
      "Lacttocol® Max là thực phẩm bảo vệ sức khoẻ dành cho người bị viêm đại tràng co thắt, đầy bụng, khó tiêu, rối loạn tiêu hoá. Công thức kết hợp IMCDeltaImmune với chiết xuất Bạch truật và Bạch phục linh — hỗ trợ bảo vệ niêm mạc đại tràng và làm giảm các triệu chứng tiêu hoá khó chịu.",
    ingredients:
      "IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Cao Bạch truật 135mg, Cao Bạch phục linh 60mg. Phụ liệu: lactose, cellulose vi tinh thể, calci phosphat, tinh bột bắp, màng bao CPC.",
    usage:
      "Ngày dùng 2-4 viên, chia 2 lần. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Nên dùng liên tục 3-6 tháng.",
    warning:
      STANDARD_FOOD_WARNING +
      " Tránh dùng nếu mẫn cảm với bất kỳ thành phần nào của sản phẩm.",
    price: 441818,
    images: [],
    tags: ["tiêu hoá", "đại tràng", "Bạch truật"],
  },
  {
    slug: "jointlink-max",
    name: "Thực phẩm bảo vệ sức khoẻ Jointlink® Max",
    subtitle: "Hỗ trợ giảm đau nhức xương khớp",
    category: "suc-khoe",
    shortDesc:
      "Viên uống với Nghệ, Bạch truật, Ashwagandha và Vitamin K2 — hỗ trợ giảm đau nhức xương khớp và làm chậm thoái hoá khớp.",
    longDesc:
      "Jointlink® Max là thực phẩm bảo vệ sức khoẻ dành cho người đau nhức xương khớp, viêm khớp hoặc thoái hoá khớp. Công thức kết hợp IMCDeltaImmune với chiết xuất Bạch truật, Nghệ vàng, Huyết giác (Dracaena), bột Nghệ, Ashwagandha, Cam thảo, Gừng và Vitamin K2 — hỗ trợ giảm đau nhức và làm chậm quá trình thoái hoá khớp.",
    ingredients:
      "IMCDeltaImmune (vách tế bào Lactobacillus rhamnosus) 400mg, Chiết xuất Bạch truật 300mg, Chiết xuất Nghệ 185mg, Chiết xuất Huyết giác (Dracaena cochinchinensis) 105mg, Bột Nghệ (Curcuma longa) 75mg, Chiết xuất Ashwagandha 37.5mg, Chiết xuất Cam thảo 37.5mg, Chiết xuất Gừng 30mg, Vitamin K2 (Menaquinone-7) 7.5mcg. Phụ liệu: magnesi carbonate, cellulose vi tinh thể, màng bao, silicon dioxide, talc, magnesi stearat, ethyl cellulose, phẩm màu tartrazine.",
    usage:
      "Ngày dùng 2-4 viên, chia 2 lần. Uống trước bữa ăn 30 phút hoặc sau ăn 1 giờ. Nên dùng liên tục 3-6 tháng.",
    warning: STANDARD_FOOD_WARNING,
    price: 530182,
    images: [],
    tags: ["xương khớp", "thoái hoá", "Nghệ"],
  },
  {
    slug: "bach-xuan",
    name: "Thực phẩm bảo vệ sức khoẻ Bách Xuân®",
    subtitle: "Hỗ trợ bổ huyết và tăng nội tiết tố nữ",
    category: "suc-khoe",
    shortDesc:
      "Viên nang với Đương quy, Thục địa, Bạch thược, Soy isoflavone — hỗ trợ bổ huyết, giảm triệu chứng tiền mãn kinh và mãn kinh.",
    longDesc:
      "Bách Xuân® là thực phẩm bảo vệ sức khoẻ dành cho phụ nữ trưởng thành bị suy giảm nội tiết tố nữ, rối loạn kinh nguyệt, tiền mãn kinh và mãn kinh. Công thức kết hợp Lactobacillus với các vị thuốc bổ huyết cổ truyền: Đương quy, Thục địa, Bạch thược, Xuyên khung cùng Acid Alpha Lipoic, Soy isoflavone và Selen — hỗ trợ bổ huyết, giảm bốc hoả, cáu gắt và suy giảm sinh lý nữ.",
    ingredients:
      "Lactobacillus acidophilus và Lactobacillus rhamnosus 10⁸ CFU, Cao Đương quy 40mg, Cao Thục địa 40mg, Cao Bạch thược 25mg, Cao Xuyên khung 25mg, Acid Alpha Lipoic 25mg, Soy isoflavone 25mg, Selen 5mcg.",
    usage:
      "Liều tăng cường: 4-6 viên/ngày, chia 2 lần. Liều duy trì: 2-4 viên/ngày, chia 2 lần. Uống trước bữa ăn 30 phút hoặc cùng bữa ăn. Nên dùng liên tục 1-3 tháng.",
    warning: STANDARD_FOOD_WARNING,
    price: 832582,
    images: [],
    tags: ["phụ nữ", "nội tiết tố", "mãn kinh"],
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
  {
    slug: "v-naturecare-shampoo",
    name: "Dầu gội V-NATURECARE Shampoo",
    subtitle: "Dầu gội thiên nhiên, không sulfate & paraben",
    category: "thiet-yeu",
    shortDesc:
      "Dầu gội không chứa sulfate tạo bọt, paraben hay silicon — làm sạch dịu nhẹ, hỗ trợ giảm gàu và hư tổn tóc.",
    longDesc:
      "V-NATURECARE Shampoo là dầu gội thiên nhiên với công thức không chứa sulfate, paraben và silicon. Phù hợp dùng hằng ngày cho mọi loại tóc, đặc biệt với da đầu gàu và tóc hư tổn. Sản phẩm hỗ trợ làm sạch tóc và da đầu, giảm gãy rụng và mang lại tóc mềm mượt.",
    ingredients:
      "Purified water, Cocamidopropyl betaine, Lauryl glucoside, Glycerin, Disodium laureth sulfosuccinate và các thành phần thực vật. Không chứa sulfate tạo bọt, paraben, silicon.",
    usage:
      "Làm tóc ướt, thoa đều dầu gội lên tóc và da đầu, massage nhẹ nhàng, gội sạch với nước. Nên gội lại lần 2 để tóc và da đầu sạch hơn. Khuyên dùng hằng ngày.",
    price: 481091,
    images: [],
    tags: ["dầu gội", "không sulfate", "gàu"],
  },
  {
    slug: "v-naturecare-conditioner",
    name: "Dầu xả V-NATURECARE Conditioner",
    subtitle: "Dầu xả dưỡng tóc với dầu hạt Macadamia",
    category: "thiet-yeu",
    shortDesc:
      "Dầu xả với dầu hạt Macadamia, không chứa paraben và silicon — cấp ẩm và giúp tóc mềm mượt dễ chải.",
    longDesc:
      "V-NATURECARE Conditioner là dầu xả không chứa paraben và silicon, kết hợp dầu hạt Macadamia và glycerin để cấp ẩm và làm mềm tóc. Phù hợp cho mọi loại tóc, dùng cùng dầu gội V-NATURECARE để chăm sóc trọn bộ.",
    ingredients:
      "Purified water, Isoamyl laurate, Cetearyl alcohol, Glycerin, Behentrimonium chloride, Stearamidopropyl dimethylamine, Macadamia ternifolia seed oil, Hydroxyethylcellulose, Glyceryl laurate, Acid citric. Không chứa paraben và silicon.",
    usage:
      "Sau khi gội đầu, xoa nhẹ nhàng dầu xả theo chiều từ chân tóc đến ngọn tóc, để 1-2 phút rồi xả sạch bằng nước.",
    price: 481091,
    images: [],
    tags: ["dầu xả", "Macadamia", "dưỡng tóc"],
  },
  {
    slug: "v-naturecare-body-wash-women",
    name: "Sữa tắm nữ V-NATURECARE Women Shower",
    subtitle: "Sữa tắm thiên nhiên dành cho nữ",
    category: "thiet-yeu",
    shortDesc:
      "Sữa tắm nữ với rau má và Vitamin E — không paraben, sulfate, silicon hay PEG. Làm sạch và mềm mại da.",
    longDesc:
      "V-NATURECARE Women Shower là sữa tắm thiên nhiên dành cho da nữ giới, với chiết xuất rau má (Centella asiatica) và Vitamin E. Công thức không chứa chất bảo quản, paraben, sulfate, silicon hay PEG — làm sạch dịu nhẹ, khử mùi và giữ làn da mềm mại, thơm dịu.",
    ingredients:
      "Purified water, Cocamidopropyl betaine, Glycerin, Potassium cocoate, Disodium cocoamphodiacetate, Fragrance, Sodium cocoamphoacetate, Sodium chloride, Coco glucoside, Acrylates copolymer, Phenethyl alcohol, Acid citric, chiết xuất rau má (Centella asiatica), Vitamin E, Disodium cocoyl glutamate, Sodium cocoyl glutamate, Caprylhydroxamic acid, Sodium hydroxide. Không chứa chất bảo quản, paraben, sulfate, silicon, PEG.",
    usage:
      "Cho một lượng sữa tắm vừa đủ vào tay hoặc bông tắm, xoa đều và massage toàn cơ thể, sau đó tắm sạch bằng nước.",
    price: 345600,
    images: [],
    tags: ["sữa tắm", "rau má", "không paraben"],
  },
  {
    slug: "v-naturecare-body-wash-men",
    name: "Sữa tắm nam V-NATURECARE Men Shower",
    subtitle: "Sữa tắm thiên nhiên dành cho nam",
    category: "thiet-yeu",
    shortDesc:
      "Sữa tắm nam — không paraben, sulfate, silicon hay PEG. Làm sạch, khử mùi và mềm mại da.",
    longDesc:
      "V-NATURECARE Men Shower là sữa tắm thiên nhiên dành cho da nam giới, không chứa chất bảo quản, paraben, sulfate, silicon hay PEG. Sản phẩm làm sạch hiệu quả, khử mùi cơ thể và giữ da mịn màng, mềm mại.",
    ingredients:
      "Purified water, Cocamidopropyl betaine, Potassium cocoate, Glycerin, Sodium cocoamphoacetate, fragrance và các thành phần dịu nhẹ. Không chứa chất bảo quản, paraben, sulfate, silicon, PEG.",
    usage:
      "Cho một lượng sữa tắm vừa đủ vào tay hoặc bông tắm, xoa đều và massage toàn cơ thể, sau đó tắm sạch bằng nước.",
    price: 345600,
    images: [],
    tags: ["sữa tắm", "nam", "không paraben"],
  },
  {
    slug: "v-naturecare-feminine-wash",
    name: "Dung dịch vệ sinh phụ nữ V-NATURECARE",
    subtitle: "Dung dịch vệ sinh từ kim ngân, trà xanh và rau má",
    category: "thiet-yeu",
    shortDesc:
      "Dung dịch vệ sinh với Kim ngân hoa, Trà xanh và Rau má — không chất tạo bọt sulfate, không paraben. Dịu nhẹ cho dùng hằng ngày.",
    longDesc:
      "V-NATURECARE Dung dịch vệ sinh phụ nữ là sản phẩm chăm sóc vùng kín với chiết xuất Kim ngân hoa, lá Trà xanh và Rau má cùng Vitamin E, Menthol, Glycerin. Công thức dịu nhẹ, không chứa chất tạo bọt sulfate và paraben — hỗ trợ làm sạch, khử mùi, ngăn ngừa vi khuẩn gây viêm nhiễm và nấm ngứa.",
    ingredients:
      "Purified water, Cocamidopropyl betaine, Coco glucoside, chiết xuất Kim ngân hoa, chiết xuất lá Trà xanh, chiết xuất Rau má, Vitamin E, Menthol, Glycerin. Không chứa sulfate tạo bọt và paraben.",
    usage:
      "Vệ sinh hằng ngày: làm ướt vùng kín, cho một lượng vừa đủ ra lòng bàn tay, xoa nhẹ để tạo bọt và vệ sinh nhẹ nhàng bên ngoài vùng kín. Vệ sinh lại bằng nước sạch.",
    price: 230727,
    images: [],
    tags: ["vùng kín", "thiên nhiên", "không paraben"],
  },
  {
    slug: "v-fresh-khu-mui",
    name: "V-FRESH Xịt khử mùi",
    subtitle: "Xịt khử mùi cơ thể không cồn, không paraben",
    category: "thiet-yeu",
    shortDesc:
      "Xịt khử mùi với Aluminum chlorohydrate, Zinc gluconate và Silver citrate — khử mùi hôi nách, hôi chân hằng ngày.",
    longDesc:
      "V-FRESH Xịt khử mùi là sản phẩm chăm sóc cơ thể giúp khử mùi hôi nách, hôi chân và mùi hôi cơ thể nói chung. Công thức kết hợp Aluminum chlorohydrate, Zinc gluconate, Saccharomyces ferment và Silver citrate — hiệu quả mà không chứa cồn hay paraben, phù hợp sử dụng hằng ngày.",
    ingredients:
      "Purified water, Aluminum chlorohydrate, Zinc gluconate, Saccharomyces ferment, Silver citrate, PEG-40 hydrogenated castor oil, Fragrance, Sodium benzoate. Không chứa cồn và paraben.",
    usage:
      "Lắc đều trước khi sử dụng. Để vòi xịt cách vùng da khoảng 10-15cm và xịt đều. Mỗi lần xịt 1-2 nhịp hoặc nhiều hơn theo nhu cầu.",
    price: 736364,
    images: [],
    tags: ["khử mùi", "không cồn", "Silver citrate"],
  },
  {
    slug: "v-fresh-xit-thom-mieng",
    name: "V-FRESH Xịt thơm miệng",
    subtitle: "Xịt thơm miệng với Xylitol và tinh dầu bạc hà",
    category: "thiet-yeu",
    shortDesc:
      "Xịt thơm miệng với Xylitol, tinh dầu bạc hà và Menthol — khử mùi hôi miệng và làm sạch khoang miệng tức thì.",
    longDesc:
      "V-FRESH Xịt thơm miệng là sản phẩm chăm sóc khoang miệng tiện lợi, công thức kết hợp Xylitol, tinh dầu bạc hà, Menthol cùng chiết xuất Solidago virginaurea. Sản phẩm giúp khử mùi hôi miệng và góp phần ngăn ngừa viêm lợi, sâu răng, viêm nhiệt miệng — đặc biệt hữu ích sau khi uống rượu bia, hút thuốc hay ăn thực phẩm có mùi.",
    ingredients:
      "Purified water, Xylitol, PEG-40 hydrogenated castor oil, Glycerin, Peppermint oil, chiết xuất Solidago virginaurea, 4-Terpineol, Menthol, Steviol glycosides, Sodium benzoate, Acid citric. Không chứa cồn và paraben.",
    usage:
      "Xịt vào 2 bên khoang miệng, mỗi lần 1-2 nhịp xịt hoặc nhiều hơn theo nhu cầu. Sử dụng trước khi giao tiếp hoặc sau khi ăn.",
    price: 795273,
    images: [],
    tags: ["hôi miệng", "Xylitol", "bạc hà"],
  },
  // ============ MỸ PHẨM ============
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
      "Kem dưỡng cao cấp với Hexyl 3-glyceryl ascorbate (Vitamin C ổn định), sâm Hàn Quốc, peptide và Aquaxyl — dưỡng ẩm sâu và làm sáng da.",
    longDesc:
      "Orico Cream là kem dưỡng da kết hợp công nghệ hiện đại và chiết xuất thảo dược, hỗ trợ làm mờ thâm nám, dưỡng sáng và chống lão hoá. Công thức kết hợp Hexyl 3-glyceryl ascorbate (vitamin C ổn định), nhiều peptide chuyên biệt, sâm Hàn Quốc, Alteromonas ferment, sodium hyaluronate và Aquaxyl — cấp ẩm sâu và mang lại làn da mềm mượt, rạng rỡ.",
    ingredients:
      "Water (Nước Quantum), Glycerin, Cyclopentasiloxane, Butylene glycol, Dimethicone, Polyacrylate crosspolymer-6, Hexyl 3-glyceryl ascorbate (Vitamin C ổn định), Xylitylglucoside, Chiết xuất Sâm Hàn Quốc (Panax ginseng), Alteromonas ferment extract, 1-Methylhydantoin-2-Imide, Peptide phức hợp (Palmitoyl dipeptide-61, dipeptide-62, dipeptide-63 amide, Palmitoyl tripeptide-95, Norleucyl dipeptide-72, D-Phenylalanine SH-hexapeptide-15 SP amide), Allantoin, Sodium hyaluronate, Sodium PCA, Anhydroxylitol, Arachidyl glucoside, Bis-diglyceryl polyacyladipate-2, Isoamyl laurate, Xylitol, Isopropyl myristate, Arachidyl alcohol, Octyldodecyl myristate, Caprylyl glycol, Glyceryl caprylate, Behenyl alcohol, Glucose, t-Butyl alcohol, Hydroxyethyl acrylate/Sodium acryloyldimethyl taurate copolymer, Xanthan gum, Phenylpropanol, Polyvinyl alcohol, Ethylhexylglycerin, Phenoxyethanol, Lactic acid/Glycolic acid copolymer, Citric acid, Fragrance.",
    usage:
      "Sau bước rửa mặt và toner, lấy một lượng vừa đủ, chấm lên các điểm trên mặt rồi massage nhẹ nhàng từ trong ra ngoài, từ dưới lên trên. Dùng sáng và tối.",
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
      "Orico Sun Screen bảo vệ da khỏi tác hại của tia UV, phòng ngừa các dấu hiệu lão hoá sớm, làm mờ vết thâm và nếp nhăn do nắng. Công thức nổi bật với Lingostem™ — chiết xuất từ quả việt quất Lingoberry bằng công nghệ tế bào gốc thực vật, kết hợp sâm Hàn Quốc, astaxanthin và chiết xuất tô mộc cùng các bộ lọc UV vật lý và hoá học.",
    ingredients:
      "Water (Nước Quantum), Cyclopentasiloxane, Ethylhexyl methoxycinnamate, Titanium dioxide, Diethylamino hydroxybenzoyl hexyl benzoate, PEG/PPG-20/15 dimethicone, Zinc oxide, Methylene bis-benzotriazolyl tetramethylbutylphenol, Propanediol, Caprylyl methicone, Quaternium-18 bentonite, PEG-10 dimethicone, Chiết xuất Sâm Hàn Quốc (Panax ginseng), Chiết xuất vỏ Tô mộc (Caesalpinia sappan), Alteromonas ferment extract, Chiết xuất quả Lingoberry (Vaccinium vitis-idaea / Lingostem™), Diisopropyl sebacate, Silica, Polymethylsilsesquioxane, Sodium hyaluronate, Polyglyceryl-3 polyricinoleate, Sodium chloride, Trimethylsiloxysilicate, C12-15 alkyl benzoate, Decyl glucoside, Hydrated silica, Hydrogen dimethicone, CI 77019 (Mica), Aluminum hydroxide, Ethylhexylglycerin, Disodium EDTA, Butylene glycol, Astaxanthin, CI 77491, Propylene glycol, Xanthan gum, Pentylene glycol, Triethoxycaprylylsilane, CI 77492, 1,2-Hexanediol, Glycerin, Gluconolactone, Citric acid, Phenoxyethanol, Sodium benzoate, Calcium gluconate, Fragrance.",
    usage:
      "Sau các bước chăm sóc da, lấy một lượng vừa đủ chấm đều lên mặt và vùng da hở, sau đó thoa đều. Thoa trước khi ra nắng ít nhất 20 phút và thoa lại sau mỗi 2-3 giờ.",
    price: 711818,
    images: ["/products/orico-sunscreen/1.jpg"],
    featured: true,
    tags: ["chống nắng", "Lingostem", "astaxanthin"],
  },
  {
    slug: "v-naturecare-lips",
    name: "Son dưỡng môi V-NATURECARE Lips",
    subtitle: "Son dưỡng ẩm môi với sáp ong và dầu hạnh nhân",
    category: "my-pham",
    shortDesc:
      "Son dưỡng môi thiên nhiên với dầu hạnh nhân, sáp ong trắng và dầu oliu — dưỡng ẩm và làm mềm môi khô nứt nẻ.",
    longDesc:
      "V-NATURECARE Lips là son dưỡng môi thiên nhiên không chứa dầu khoáng, chất bảo quản hay silicon. Công thức kết hợp dầu hạt hạnh nhân, sáp ong trắng, dầu cám gạo, dầu oliu và bơ hạt pouteria sapota — dưỡng ẩm sâu, làm mềm và cải thiện môi khô, nứt nẻ.",
    ingredients:
      "Dầu hạt Hạnh nhân, Sáp ong trắng, Dầu cám gạo, Dầu quả Oliu, Bơ hạt Pouteria sapota. Không chứa dầu khoáng, chất bảo quản và silicon.",
    usage:
      "Làm sạch môi trước khi dùng. Thoa son dưỡng trực tiếp lên môi hằng ngày, hoặc dùng làm lớp dưỡng ẩm mềm mại trước khi thoa son màu.",
    price: 181636,
    images: [],
    tags: ["son dưỡng", "sáp ong", "thiên nhiên"],
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
