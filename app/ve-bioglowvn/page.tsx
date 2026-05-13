import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Leaf, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZaloCallButtons } from "@/components/zalo-call-buttons";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Về ${siteConfig.name}`,
  description: `${siteConfig.name} — shop online chuyên sản phẩm thiên nhiên tuyển chọn cho sức khoẻ và sắc đẹp. Tuyển chọn TPCN/mỹ phẩm sản xuất tại Việt Nam, đạt chuẩn GMP/ISO, có nguồn gốc minh bạch.`,
  keywords: [
    `về ${siteConfig.name}`,
    "shop TPCN uy tín",
    "đại lý Vinalink",
    "đại lý Orico",
    "TPCN chính hãng Việt Nam",
    "GMP ISO",
    siteConfig.name,
  ],
  alternates: { canonical: "/ve-bioglowvn" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteConfig.url}/ve-bioglowvn`,
    title: `Về ${siteConfig.name}`,
    description: `${siteConfig.name} — shop online sản phẩm thiên nhiên tuyển chọn.`,
    siteName: siteConfig.name,
  },
};

const values = [
  {
    icon: ShieldCheck,
    title: "Sản phẩm có nguồn gốc rõ ràng",
    description:
      "Mỗi sản phẩm đều có giấy tờ chứng nhận, tem chống giả và thông tin nhà sản xuất minh bạch.",
  },
  {
    icon: Leaf,
    title: "Ưu tiên thành phần thiên nhiên",
    description:
      "Chúng tôi chọn các sản phẩm với chiết xuất từ thảo dược và nguyên liệu tự nhiên, phù hợp với người Việt.",
  },
  {
    icon: Award,
    title: "Đạt chuẩn GMP & ISO",
    description:
      "Tất cả sản phẩm sản xuất tại Việt Nam theo các tiêu chuẩn nghiêm ngặt của Bộ Y tế.",
  },
  {
    icon: Truck,
    title: "Phục vụ toàn quốc",
    description:
      "Giao hàng tới mọi tỉnh thành với chính sách COD, đổi trả và tư vấn miễn phí.",
  },
] as const;

export default function AboutPage(): React.ReactElement {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: `Về ${siteConfig.name}`, url: "/ve-bioglowvn" },
        ]}
      />
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-tight py-16 sm:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-leaf-50 px-3 py-1 text-sm font-medium text-leaf-700">
              Về {siteConfig.name}
            </span>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl font-semibold leading-tight">
              Sản phẩm thiên nhiên — Tuyển chọn cho người Việt
            </h1>
            <p className="mt-5 text-lg text-ink-muted">
              {siteConfig.name} là shop online chuyên các sản phẩm chăm sóc sức khoẻ và làm
              đẹp từ thiên nhiên. Chúng tôi tuyển chọn những sản phẩm uy tín, sản xuất tại
              Việt Nam, đạt các tiêu chuẩn GMP/ISO của Bộ Y tế — để mang đến cho khách hàng
              các giải pháp an toàn, hiệu quả và có nguồn gốc rõ ràng.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-tight grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="section-heading">Sứ mệnh của chúng tôi</h2>
            <div className="prose-shop mt-5 max-w-2xl">
              <p>
                Trong thị trường nhiều lựa chọn như hiện nay, không phải lúc nào người tiêu
                dùng cũng có thời gian tìm hiểu kỹ về nguồn gốc và chất lượng của từng sản
                phẩm. {siteConfig.name} ra đời với mong muốn trở thành nơi đáng tin cậy —
                đã thẩm định, lựa chọn sẵn — để khách hàng yên tâm sử dụng.
              </p>
              <p>
                Chúng tôi cam kết:
              </p>
              <ul>
                <li>Chỉ bán các sản phẩm chính hãng, có giấy tờ minh bạch.</li>
                <li>Tư vấn trung thực, đúng nhu cầu — không "đẩy hàng".</li>
                <li>Hỗ trợ chăm sóc khách hàng tận tâm trước và sau khi mua.</li>
                <li>Chính sách đổi trả linh hoạt trong 7 ngày.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-50 p-8 border border-brand-100">
            <h3 className="font-serif text-2xl font-semibold text-brand-900">
              Liên hệ với chúng tôi
            </h3>
            <p className="mt-2 text-ink-muted">
              Cần tư vấn sản phẩm hoặc đặt hàng? Nhắn Zalo hoặc gọi điện ngay.
            </p>
            <div className="mt-6">
              <ZaloCallButtons layout="stack" />
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              Phản hồi nhanh trong giờ làm việc: {siteConfig.contact.workingHours}
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-brand-50">
        <div className="container-tight">
          <div className="text-center mx-auto max-w-2xl">
            <h2 className="section-heading">Giá trị cốt lõi</h2>
            <p className="section-subheading mx-auto">
              Những nguyên tắc giúp chúng tôi xây dựng niềm tin với khách hàng.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-white p-6 shadow-card border border-brand-100"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-leaf-50 text-leaf-700">
                  <v.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-900">{v.title}</h3>
                <p className="mt-1 text-ink-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-tight text-center">
          <h2 className="section-heading">Sẵn sàng khám phá sản phẩm?</h2>
          <p className="section-subheading mx-auto mt-3">
            Xem toàn bộ catalog hoặc nhắn Zalo để được tư vấn riêng.
          </p>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Button size="lg" variant="primary" asChild>
              <Link href="/san-pham">Xem sản phẩm</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/lien-he">Liên hệ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
