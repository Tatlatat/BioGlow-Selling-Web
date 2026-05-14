import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { ZaloIcon } from "@/components/zalo-icon";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";
import { buildTelLink, buildZaloOrderLink } from "@/lib/utils";

export function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
  const phones = siteConfig.contact.phones;

  return (
    <footer className="mt-20 bg-brand-700 text-brand-50">
      <div className="container-tight py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-serif text-2xl text-white">{siteConfig.name}</h3>
          <p className="mt-3 text-sm text-brand-100 leading-relaxed">
            {siteConfig.tagline}. Sản xuất tại Việt Nam, đạt chuẩn GMP/ISO. Giao hàng toàn
            quốc, thanh toán khi nhận.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Danh mục</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/nhom/${c.slug}`}
                  className="text-brand-100 hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Thông tin</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/ve-bioglowvn" className="text-brand-100 hover:text-white">
                Về BioGlowVN
              </Link>
            </li>
            <li>
              <Link href="/cau-hoi-thuong-gap" className="text-brand-100 hover:text-white">
                Hỏi đáp
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-brand-100 hover:text-white">
                Cẩm nang sức khoẻ
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="text-brand-100 hover:text-white">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-bao-mat" className="text-brand-100 hover:text-white">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link href="/dieu-khoan-su-dung" className="text-brand-100 hover:text-white">
                Điều khoản sử dụng
              </Link>
            </li>
            <li>
              <Link href="/chinh-sach-cookie" className="text-brand-100 hover:text-white">
                Chính sách Cookie
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Liên hệ</h4>
          <ul className="mt-3 space-y-3 text-sm">
            {phones.map((p) => (
              <li key={`tel-${p.tel}`} className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={buildTelLink(p.tel)} className="hover:text-white">
                  {p.display}
                </a>
              </li>
            ))}
            {phones.map((p) => (
              <li key={`zalo-${p.tel}`} className="flex items-start gap-2">
                <ZaloIcon className="h-4 w-4 mt-0.5 shrink-0" />
                <a
                  href={buildZaloOrderLink(p.tel)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Zalo: {p.display}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{siteConfig.contact.workingHours}</span>
            </li>
            {siteConfig.contact.email ? (
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
            ) : null}
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>Giao hàng toàn quốc</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-600">
        <div className="container-tight py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-100">
          <p>© {year} {siteConfig.name}. Đã đăng ký bản quyền.</p>
          <p>
            Thực phẩm bảo vệ sức khoẻ không phải là thuốc và không có tác dụng thay thế
            thuốc chữa bệnh.
          </p>
        </div>
      </div>
    </footer>
  );
}
