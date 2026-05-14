import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Chính sách Cookie",
  description: `Cách ${siteConfig.name} sử dụng cookie trên website.`,
  alternates: { canonical: "/chinh-sach-cookie" },
};

export default function CookiePage(): React.ReactElement {
  return (
    <article className="container-tight py-12 max-w-3xl">
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
        Chính sách Cookie
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Cập nhật lần cuối: 14/05/2026
      </p>

      <div className="prose-shop mt-8 space-y-6 text-ink">
        <section>
          <h2 className="text-xl font-semibold text-brand-900">Cookie là gì?</h2>
          <p>
            Cookie là các tệp văn bản nhỏ được lưu trên thiết bị của bạn khi truy cập
            website. Chúng giúp website ghi nhớ tuỳ chọn và cải thiện trải nghiệm sử
            dụng.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">
            Cookie chúng tôi sử dụng
          </h2>

          <div className="rounded-lg border border-brand-100 p-4">
            <p className="font-semibold text-brand-900">1. Cookie kỹ thuật cần thiết</p>
            <p className="mt-1 text-sm">
              Bắt buộc để website hoạt động — ví dụ ghi nhớ trạng thái giỏ hàng tạm,
              phiên đăng nhập (nếu có), preferences UI. Không thể tắt nếu vẫn muốn
              dùng website bình thường.
            </p>
          </div>

          <div className="mt-3 rounded-lg border border-brand-100 p-4">
            <p className="font-semibold text-brand-900">2. Cookie hiệu năng (nếu được bạn đồng ý)</p>
            <p className="mt-1 text-sm">
              Hiện tại {siteConfig.name} <strong>chưa</strong> dùng cookie phân tích
              của bên thứ ba (Google Analytics, Facebook Pixel, v.v.). Nếu trong
              tương lai chúng tôi triển khai, sẽ có banner xin sự đồng ý của bạn
              trước khi bật.
            </p>
          </div>

          <div className="mt-3 rounded-lg border border-brand-100 p-4">
            <p className="font-semibold text-brand-900">3. Cookie quảng cáo</p>
            <p className="mt-1 text-sm">
              Hiện tại chúng tôi <strong>không</strong> dùng cookie quảng cáo nào.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">Cách quản lý cookie</h2>
          <p>
            Bạn có thể xoá cookie hoặc chặn cookie thông qua cài đặt của trình duyệt
            (Chrome, Safari, Firefox, Edge). Việc chặn cookie kỹ thuật có thể khiến
            một số chức năng (ví dụ form đặt hàng) hoạt động không đầy đủ.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-brand-900">Liên hệ</h2>
          <p>
            Mọi thắc mắc về cookie xin liên hệ qua Zalo{" "}
            {siteConfig.contact.phones[0].display} hoặc trang{" "}
            <a href="/lien-he" className="text-brand-700 underline">
              Liên hệ
            </a>
            . Xem thêm{" "}
            <a href="/chinh-sach-bao-mat" className="text-brand-700 underline">
              Chính sách bảo mật
            </a>{" "}
            để hiểu cách chúng tôi xử lý dữ liệu cá nhân.
          </p>
        </section>
      </div>
    </article>
  );
}
