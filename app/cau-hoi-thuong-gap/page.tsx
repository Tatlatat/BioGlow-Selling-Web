import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ZaloCallButtons } from "@/components/zalo-call-buttons";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { faqs } from "@/data/faq";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
  description: `Giải đáp các thắc mắc thường gặp về sản phẩm, giao hàng, đổi trả và tư vấn tại ${siteConfig.name}. Không tìm thấy câu trả lời — nhắn Zalo để được hỗ trợ nhanh.`,
  keywords: [
    "câu hỏi thường gặp",
    "FAQ",
    `${siteConfig.name} có uy tín không`,
    "sản phẩm chính hãng",
    "đổi trả",
    "thanh toán COD",
    "giao hàng toàn quốc",
    siteConfig.name,
  ],
  alternates: { canonical: "/cau-hoi-thuong-gap" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: `${siteConfig.url}/cau-hoi-thuong-gap`,
    title: `Câu hỏi thường gặp · ${siteConfig.name}`,
    description: `Giải đáp thắc mắc về sản phẩm và dịch vụ tại ${siteConfig.name}.`,
    siteName: siteConfig.name,
  },
};

export default function FaqPage(): React.ReactElement {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Hỏi đáp", url: "/cau-hoi-thuong-gap" },
        ]}
      />

      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            Câu hỏi thường gặp
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Tổng hợp những câu hỏi khách hàng hay đặt cho {siteConfig.name}. Không tìm thấy
            câu trả lời? Nhắn Zalo để được hỗ trợ nhanh.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="rounded-xl bg-white border border-brand-100 px-6 shadow-card">
              {faqs.map((f, i) => (
                <AccordionItem key={f.question} value={`item-${i}`}>
                  <AccordionTrigger>{f.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-ink leading-relaxed">{f.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="rounded-xl bg-brand-50 p-6 h-fit border border-brand-100">
            <h3 className="font-serif text-xl font-semibold text-brand-900">
              Còn câu hỏi khác?
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Đội ngũ {siteConfig.name} sẵn sàng tư vấn qua Zalo hoặc điện thoại.
            </p>
            <div className="mt-4">
              <ZaloCallButtons layout="stack" size="md" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
