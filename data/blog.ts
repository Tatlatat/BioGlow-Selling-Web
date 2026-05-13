export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Định dạng YYYY-MM-DD */
  date: string;
  /** ISO date YYYY-MM-DD nếu khác `date` — dùng cho `dateModified` schema. */
  updated?: string;
  readingMinutes: number;
  coverColor: "leaf" | "warm" | "gold" | "brand";
  /** Tác giả/người viết. Bỏ trống = dùng BioGlowVN (Organization). */
  author?: string;
  /** Từ khoá để build meta `keywords` và `BlogPosting.keywords` schema. */
  keywords?: string[];
  /** Nội dung markdown đơn giản (đoạn văn cách bởi 2 newline, gạch đầu dòng bằng "- "). */
  content: string;
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "bai-viet-moi",
    title: "Bài viết mới (đang cập nhật)",
    excerpt:
      "Nội dung bài viết đang được biên tập — sẽ cập nhật trong thời gian sớm nhất.",
    date: "2026-05-13",
    readingMinutes: 1,
    coverColor: "brand",
    content: `Nội dung bài viết đang được biên tập.

Quay lại sau ít ngày để đọc bài viết hoàn chỉnh, hoặc tham khảo các bài viết khác trong Cẩm nang BioGlowVN.`,
  },
  {
    slug: "5-thoi-quen-tot-cho-lan-da-tuoi-30",
    title: "5 thói quen tốt cho làn da tuổi 30",
    excerpt:
      "Bước qua tuổi 30, làn da bắt đầu thay đổi rõ rệt. Chăm sóc đúng cách ngay từ bây giờ giúp duy trì làn da khoẻ, rạng rỡ lâu dài.",
    date: "2026-04-12",
    readingMinutes: 4,
    coverColor: "gold",
    content: `Bước qua tuổi 30, làn da bắt đầu mất dần collagen tự nhiên. Đây là thời điểm thích hợp để xây dựng thói quen chăm sóc da bền vững — không cần phức tạp, nhưng phải đều đặn.

## 1. Tẩy trang sạch mỗi tối

Dù không trang điểm, da vẫn tiếp xúc với bụi, kem chống nắng và mồ hôi cả ngày. Tẩy trang giúp loại bỏ lớp này, ngăn ngừa tắc lỗ chân lông.

- Dùng nước tẩy trang micellar dịu nhẹ
- Lau theo chuyển động nhẹ nhàng, không chà xát
- Không cần rửa lại nếu sản phẩm phù hợp

## 2. Cấp ẩm hai lần mỗi ngày

Da tuổi 30 dễ mất nước hơn. Cấp ẩm sáng và tối giúp da đàn hồi, giảm nhăn sớm.

## 3. Chống nắng — kể cả khi ở trong nhà

Tia UV xuyên qua cửa kính. Kem chống nắng SPF 30+ là bước không thể bỏ, ngay cả ngày râm.

## 4. Ngủ đủ giấc và uống đủ nước

Không sản phẩm nào thay được giấc ngủ 7-8 tiếng và 2 lít nước mỗi ngày. Đây là nền tảng cho mọi liệu trình chăm sóc da.

## 5. Bổ sung dưỡng chất từ bên trong

Vitamin C, E, kẽm và collagen tự nhiên từ thực phẩm hỗ trợ làn da khoẻ từ bên trong. Có thể kết hợp với thực phẩm bổ sung khi chế độ ăn không đáp ứng đủ.

---

Thay đổi nhỏ mỗi ngày tích luỹ thành kết quả lớn. Hãy bắt đầu từ một thói quen — và duy trì nó.`,
  },
  {
    slug: "cach-bo-sung-canxi-tu-nhien-cho-nguoi-lon-tuoi",
    title: "Cách bổ sung canxi tự nhiên cho người lớn tuổi",
    excerpt:
      "Loãng xương là vấn đề phổ biến sau tuổi 50. Bổ sung canxi đúng cách giúp xương chắc khoẻ và giảm nguy cơ chấn thương.",
    date: "2026-03-28",
    readingMinutes: 5,
    coverColor: "leaf",
    content: `Sau tuổi 50, mật độ xương giảm dần và nguy cơ loãng xương tăng cao — đặc biệt ở phụ nữ sau mãn kinh. Bổ sung canxi hợp lý là cách hiệu quả để giữ xương chắc khoẻ.

## Nguồn canxi tự nhiên từ thực phẩm

- **Sữa và chế phẩm sữa**: sữa tươi, sữa chua, phô mai
- **Cá nhỏ ăn cả xương**: cá cơm, cá mòi
- **Rau lá xanh đậm**: cải bó xôi, cải xoăn, bông cải xanh
- **Đậu phụ và các loại đậu**: nguồn canxi thực vật dồi dào
- **Hạt và hạnh nhân**: tốt cho người dị ứng sữa

## Khi nào cần thực phẩm bổ sung?

Khi chế độ ăn không đủ canxi (thường < 800mg/ngày), thực phẩm bổ sung là lựa chọn. Lưu ý:

- Chọn sản phẩm có nguồn gốc rõ ràng, đạt chuẩn GMP
- Uống cùng vitamin D3 để hấp thu tốt hơn
- Chia liều nhỏ trong ngày thay vì uống một lần lượng lớn

## Kết hợp với vận động

Đi bộ, yoga nhẹ và bài tập kháng lực giúp xương hấp thu canxi tốt hơn. Vận động 30 phút mỗi ngày là đủ.

## Lưu ý quan trọng

Tham khảo ý kiến bác sĩ trước khi bắt đầu bổ sung canxi nếu bạn có tiền sử sỏi thận hoặc đang dùng thuốc.

Thực phẩm bảo vệ sức khoẻ không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.`,
  },
  {
    slug: "phuc-hoi-co-bap-sau-tap-luyen",
    title: "Phục hồi cơ bắp sau tập luyện: những điều nên biết",
    excerpt:
      "Phục hồi là phần quan trọng không kém việc tập luyện. Hiểu đúng giúp bạn tránh chấn thương và tiến bộ nhanh hơn.",
    date: "2026-03-10",
    readingMinutes: 4,
    coverColor: "warm",
    content: `Nhiều người tập gym chỉ chú trọng vào buổi tập mà bỏ qua phục hồi — đây là nguyên nhân chính của chấn thương và "chững" tiến bộ.

## Tại sao phục hồi quan trọng?

Trong khi tập, cơ bắp bị tổn thương vi mô. Quá trình phục hồi mới là lúc cơ phát triển. Không phục hồi tốt = không phát triển.

## 3 nguyên tắc phục hồi cơ bản

### 1. Ngủ đủ
Hormone tăng trưởng tiết ra mạnh nhất khi ngủ sâu. Người tập nên ngủ tối thiểu 7-9 tiếng.

### 2. Dinh dưỡng đúng
- Protein: 1.6-2.2g/kg trọng lượng cơ thể mỗi ngày
- Carb hấp thu tốt sau tập để bổ sung glycogen
- Đủ nước — mất 2% nước = giảm 20% hiệu suất

### 3. Giãn cơ và massage
Stretching nhẹ sau tập, foam roller, hoặc gel xoa bóp giúp lưu thông máu và giảm đau mỏi.

## Khi nào nên nghỉ?

Đau cơ kéo dài > 72 giờ, mệt mỏi liên tục, mất ngủ, giảm hiệu suất rõ rệt — đó là dấu hiệu cần nghỉ. Một tuần nghỉ chủ động (active recovery) tốt hơn nhiều so với tập "ép".

## Hỗ trợ từ sản phẩm

Gel xoa bóp với thành phần thảo dược có thể giảm đau mỏi tại chỗ. Thực phẩm bổ sung canxi, magie và vitamin D3 hỗ trợ xương khớp cho người tập nặng.

Phục hồi tốt — tiến bộ bền vững.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
