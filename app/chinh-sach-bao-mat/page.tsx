import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: `Chính sách bảo vệ dữ liệu cá nhân của khách hàng tại ${siteConfig.name}.`,
  alternates: { canonical: "/chinh-sach-bao-mat" },
};

export default function PrivacyPage(): React.ReactElement {
  return (
    <article className="container-tight py-12 max-w-3xl">
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
        Chính sách bảo mật
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Cập nhật lần cuối: 14/05/2026
      </p>

      <div className="prose-shop mt-8 space-y-6 text-ink">
        <section>
          <h2 className="text-xl font-semibold text-brand-900">1. Phạm vi áp dụng</h2>
          <p>
            Chính sách này áp dụng cho mọi dữ liệu cá nhân mà {siteConfig.name}
            (&ldquo;chúng tôi&rdquo;) thu thập từ khách hàng (&ldquo;bạn&rdquo;) khi sử dụng
            website {siteConfig.url}. Chúng tôi cam kết tuân thủ Nghị định 13/2023/NĐ-CP
            của Chính phủ Việt Nam về bảo vệ dữ liệu cá nhân.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            2. Dữ liệu chúng tôi thu thập
          </h2>
          <p>Khi bạn đặt hàng hoặc liên hệ qua form trên website, chúng tôi thu thập:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Họ và tên đầy đủ</li>
            <li>Số điện thoại liên hệ</li>
            <li>Địa chỉ giao hàng</li>
            <li>Ghi chú đơn hàng (nếu có)</li>
          </ul>
          <p>
            Chúng tôi <strong>không</strong> thu thập số CMND/CCCD, thông tin tài khoản
            ngân hàng, hay bất kỳ dữ liệu nhạy cảm nào khác. Việc thanh toán được thực
            hiện khi nhận hàng (COD) trực tiếp với đơn vị vận chuyển.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">3. Mục đích sử dụng</h2>
          <p>Dữ liệu của bạn chỉ được dùng cho các mục đích sau:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Liên hệ xác nhận đơn hàng và chốt giao</li>
            <li>Giao hàng và xử lý đổi trả</li>
            <li>Hỗ trợ, chăm sóc khách hàng sau bán</li>
            <li>Tuân thủ nghĩa vụ pháp lý nếu có</li>
          </ul>
          <p>
            Chúng tôi <strong>không</strong> dùng dữ liệu của bạn để gửi email/SMS
            marketing tự động, không bán hay chia sẻ cho bên thứ ba dưới mọi hình thức.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">4. Lưu trữ và bảo mật</h2>
          <p>
            Dữ liệu đơn hàng được lưu giữ trong khoảng thời gian cần thiết để xử lý
            đơn và đối soát kế toán (tối đa 24 tháng kể từ ngày đặt). Sau đó dữ liệu
            sẽ được xóa hoặc ẩn danh hóa.
          </p>
          <p>
            Chúng tôi áp dụng các biện pháp kỹ thuật hợp lý (truyền tải qua HTTPS,
            xác thực truy cập, lưu trữ trên hạ tầng đám mây có chứng nhận bảo mật) để
            bảo vệ dữ liệu khỏi truy cập trái phép, làm mất hay làm lộ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">5. Bên thứ ba</h2>
          <p>
            Để vận hành dịch vụ, một số dữ liệu được xử lý thông qua các nhà cung cấp:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Đơn vị vận chuyển</strong> (Viettel Post, GHN, GHTK, J&T, v.v.):
              nhận họ tên, SĐT, địa chỉ để giao hàng.
            </li>
            <li>
              <strong>Vercel Inc.</strong> (hosting): cung cấp hạ tầng máy chủ.
            </li>
            <li>
              <strong>Telegram Messenger</strong> (gửi thông báo đơn nội bộ): chỉ
              người quản lý của chúng tôi nhận được thông báo.
            </li>
          </ul>
          <p>
            Các đối tác này đều cam kết bảo mật và chỉ xử lý dữ liệu theo chỉ định
            của chúng tôi.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            6. Quyền của bạn theo Nghị định 13/2023/NĐ-CP
          </h2>
          <p>Bạn có quyền:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Yêu cầu được biết những dữ liệu nào của bạn đang được lưu trữ</li>
            <li>Yêu cầu chỉnh sửa thông tin sai lệch</li>
            <li>Yêu cầu xóa dữ liệu (trừ trường hợp pháp luật yêu cầu lưu giữ)</li>
            <li>Rút lại sự đồng ý cho phép xử lý dữ liệu</li>
            <li>Khiếu nại lên cơ quan có thẩm quyền</li>
          </ul>
          <p>
            Để thực hiện các quyền trên, vui lòng liên hệ qua Zalo{" "}
            {siteConfig.contact.phones[0].display} hoặc trang{" "}
            <a href="/lien-he" className="text-brand-700 underline">
              Liên hệ
            </a>
            . Chúng tôi sẽ phản hồi trong vòng 72 giờ làm việc.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">7. Cookie</h2>
          <p>
            Website sử dụng một số cookie kỹ thuật cần thiết để vận hành. Chi tiết
            tại{" "}
            <a href="/chinh-sach-cookie" className="text-brand-700 underline">
              Chính sách Cookie
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">8. Thay đổi chính sách</h2>
          <p>
            Chúng tôi có thể cập nhật chính sách này khi cần thiết. Phiên bản mới sẽ
            được đăng tại trang này với ngày cập nhật rõ ràng. Việc bạn tiếp tục sử
            dụng dịch vụ sau khi chính sách thay đổi đồng nghĩa với việc bạn chấp
            nhận phiên bản mới.
          </p>
        </section>
      </div>
    </article>
  );
}
