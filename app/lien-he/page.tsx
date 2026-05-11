import type { Metadata } from "next";
import { Phone, Clock, Truck, Mail } from "lucide-react";
import { ZaloIcon } from "@/components/zalo-icon";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/data/site-config";
import { buildTelLink, buildZaloOrderLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${siteConfig.name} để được tư vấn miễn phí về sản phẩm thiên nhiên. Hotline: ${siteConfig.contact.phoneDisplay}.`,
};

type IconComponent = React.ComponentType<{ className?: string }>;

type ContactItem = {
  icon: IconComponent;
  label: string;
  value: string;
  href?: string;
};

export default function ContactPage(): React.ReactElement {
  const contacts: ContactItem[] = [
    {
      icon: Phone,
      label: "Điện thoại",
      value: siteConfig.contact.phoneDisplay,
      href: buildTelLink(siteConfig.contact.phone),
    },
    {
      icon: ZaloIcon,
      label: "Zalo",
      value: siteConfig.contact.phoneDisplay,
      href: buildZaloOrderLink(siteConfig.contact.zalo),
    },
    {
      icon: Clock,
      label: "Giờ làm việc",
      value: siteConfig.contact.workingHours,
    },
    {
      icon: Truck,
      label: "Khu vực giao hàng",
      value: `Toàn quốc · COD · ${siteConfig.shipping.estimatedDays}`,
    },
  ];

  if (siteConfig.contact.email) {
    contacts.push({
      icon: Mail,
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    });
  }

  return (
    <div>
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="container-tight py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brand-900">
            Liên hệ {siteConfig.name}
          </h1>
          <p className="mt-2 text-ink-muted max-w-2xl">
            Để lại thông tin hoặc nhắn Zalo ngay — chúng tôi sẽ phản hồi trong vòng vài
            phút trong giờ làm việc.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-tight grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-xl bg-white border border-brand-100 p-6 shadow-card">
            <h2 className="font-serif text-2xl font-semibold text-brand-900">
              Gửi tin nhắn
            </h2>
            <p className="mt-2 text-ink-muted text-sm">
              Điền thông tin liên hệ — bạn sẽ được phản hồi nhanh nhất.
            </p>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-2 flex flex-col gap-4">
            {contacts.map((c) => (
              <div
                key={c.label}
                className="rounded-xl bg-brand-50 border border-brand-100 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-700 shadow-card">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-ink-muted">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-lg font-semibold text-brand-900 hover:text-warm-red"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-brand-900">{c.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
