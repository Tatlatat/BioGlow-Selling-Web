import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: `Điều khoản và điều kiện khi sử dụng dịch vụ ${siteConfig.name}.`,
  alternates: { canonical: "/dieu-khoan-su-dung" },
};

export default function TermsPage(): React.ReactElement {
  return (
    <article className="container-tight py-12 max-w-3xl">
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
        Điều khoản sử dụng
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Cập nhật lần cuối: 14/05/2026
      </p>

      <div className="prose-shop mt-8 space-y-6 text-ink">
        <section>
          <h2 className="text-xl font-semibold text-brand-900">1. Chấp nhận điều khoản</h2>
          <p>
            Khi truy cập và sử dụng website {siteConfig.url}, bạn đồng ý tuân thủ các
            điều khoản dưới đây. Nếu không đồng ý với bất kỳ điều khoản nào, vui lòng
            không sử dụng dịch vụ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            2. Sản phẩm và mô tả
          </h2>
          <p>
            Sản phẩm được bán trên website là <strong>thực phẩm bảo vệ sức khoẻ (TPCN)</strong>{" "}
            và <strong>mỹ phẩm</strong> đã được đăng ký lưu hành tại Việt Nam.
          </p>
          <p className="rounded-lg bg-warm-red/5 border border-warm-red/20 p-4 font-medium text-warm-red">
            ⚠ Thực phẩm bảo vệ sức khoẻ không phải là thuốc và không có tác dụng thay
            thế thuốc chữa bệnh. Mọi tuyên bố về công dụng đều mang tính tham khảo, kết
            quả có thể khác nhau giữa các cá nhân tuỳ cơ địa và lối sống.
          </p>
          <p>
            Ảnh sản phẩm trên website mang tính minh hoạ. Bao bì và màu sắc thực tế có
            thể thay đổi theo lô sản xuất. Vui lòng nhắn Zalo để xem ảnh thực tế trước
            khi đặt nếu cần.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">3. Đặt hàng và giá</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Giá hiển thị đã bao gồm thuế (nếu có), chưa bao gồm phí vận chuyển.</li>
            <li>Phí vận chuyển được tính theo bảng giá đơn vị vận chuyển và thông báo trước khi chốt đơn.</li>
            <li>Đơn hàng được xác nhận sau khi nhân viên gọi điện chốt lại với bạn.</li>
            <li>Chúng tôi có quyền từ chối hoặc huỷ đơn nếu nghi ngờ gian lận, đặt hàng đùa, hoặc khách không xác nhận.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">4. Thanh toán</h2>
          <p>
            Hiện tại chúng tôi chỉ chấp nhận <strong>thanh toán khi nhận hàng (COD)</strong>{" "}
            trên toàn quốc. Bạn thanh toán trực tiếp cho nhân viên giao hàng khi nhận
            đơn. Không yêu cầu chuyển khoản trước hay đặt cọc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">5. Vận chuyển</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Thời gian giao trung bình 2-5 ngày làm việc, tuỳ khu vực.</li>
            <li>Bạn có quyền kiểm tra hàng (xem hộp, đối chiếu sản phẩm) trước khi thanh toán.</li>
            <li>Không được mở seal/tem bảo đảm trước khi thanh toán nhận hàng.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">6. Đổi trả</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Đổi trả trong vòng <strong>7 ngày</strong> nếu sản phẩm còn nguyên seal, chưa sử dụng.</li>
            <li>Đổi trả nếu sản phẩm bị lỗi do nhà sản xuất, sai mẫu, hư hỏng do vận chuyển — chúng tôi chịu phí ship hoàn.</li>
            <li>Không nhận đổi trả nếu bạn đổi ý sau khi đã mở seal, sản phẩm còn nguyên không có lỗi.</li>
            <li>Liên hệ qua Zalo trong vòng 7 ngày kể từ ngày nhận để được xử lý.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            7. Sở hữu trí tuệ
          </h2>
          <p>
            Toàn bộ nội dung (văn bản, hình ảnh, logo, thiết kế) trên website thuộc sở
            hữu của {siteConfig.name} hoặc các bên cấp phép tương ứng. Cấm sao chép,
            sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            8. Giới hạn trách nhiệm
          </h2>
          <p>
            Chúng tôi không chịu trách nhiệm cho:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Tác dụng không như mong đợi do cơ địa hoặc cách sử dụng không đúng hướng dẫn.</li>
            <li>Tổn thất gián tiếp phát sinh ngoài giá trị sản phẩm.</li>
            <li>Sự cố do nguyên nhân khách quan (thiên tai, dịch bệnh, mạng lưới vận chuyển).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">9. Pháp luật áp dụng</h2>
          <p>
            Mọi tranh chấp phát sinh được giải quyết trên tinh thần thương lượng,
            thiện chí. Nếu không tự giải quyết được, sẽ được đưa ra toà án có thẩm
            quyền tại Việt Nam, theo pháp luật nước Cộng hoà Xã hội Chủ nghĩa Việt
            Nam.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">10. Liên hệ</h2>
          <p>
            Mọi thắc mắc về điều khoản, đơn hàng, đổi trả: liên hệ Zalo{" "}
            {siteConfig.contact.phones[0].display} (8:00 - 22:00 hằng ngày).
          </p>
        </section>
      </div>
    </article>
  );
}
