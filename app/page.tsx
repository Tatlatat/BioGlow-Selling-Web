import Link from "next/link";
import { HeartPulse, Sparkles, Dumbbell, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudienceCard } from "@/components/audience-card";
import { CategoryGrid } from "@/components/category-grid";
import { CommitmentList } from "@/components/commitment-list";
import { QualityBadges } from "@/components/quality-badges";
import { ProductCard } from "@/components/product-card";
import { ZaloCallButtons } from "@/components/zalo-call-buttons";
import { getFeaturedProducts } from "@/data/products";
import { siteConfig } from "@/data/site-config";

export default function HomePage(): React.ReactElement {
  const featured = getFeaturedProducts(8);

  return (
    <div className="flex flex-col">
      {/* 1. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-brand-50">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-leaf-50 blur-3xl" />
          <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        </div>
        <div className="container-tight py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-leaf-50 px-3 py-1 text-sm font-medium text-leaf-700">
              <Sprout className="h-4 w-4" />
              Sản phẩm thiên nhiên · Tuyển chọn
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 text-lg text-ink-muted max-w-2xl">
              {siteConfig.name} mang đến những sản phẩm sức khoẻ và làm đẹp có nguồn gốc rõ
              ràng, sản xuất tại Việt Nam, đạt chuẩn GMP/ISO. Tư vấn tận tâm — giao hàng
              toàn quốc — thanh toán khi nhận.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="xl" asChild>
                <Link href="/san-pham">Xem sản phẩm</Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link href="/ve-bioglowvn">Về BioGlowVN</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3 ĐỐI TƯỢNG */}
      <section className="section bg-white">
        <div className="container-tight">
          <div className="text-center mx-auto max-w-2xl">
            <h2 className="section-heading">Sản phẩm phù hợp với bạn</h2>
            <p className="section-subheading mx-auto">
              Mỗi nhóm khách hàng đều có nhu cầu khác nhau. Chúng tôi giúp bạn tìm đúng sản
              phẩm cần thiết.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <AudienceCard
              title="Người trung niên & lớn tuổi"
              description="Sản phẩm hỗ trợ xương khớp, tim mạch, miễn dịch — chăm sóc sức khoẻ chủ động hằng ngày."
              href="/nhom/suc-khoe"
              icon={HeartPulse}
              accent="warm"
            />
            <AudienceCard
              title="Phụ nữ hiện đại"
              description="Dòng mỹ phẩm Orico — làm sạch dịu nhẹ, cấp ẩm và bảo vệ da với thành phần thiên nhiên."
              href="/nhom/my-pham"
              icon={Sparkles}
              accent="gold"
            />
            <AudienceCard
              title="Người vận động & gym"
              description="Sản phẩm tăng sức bền, hỗ trợ phục hồi cơ bắp sau tập luyện và bảo vệ khớp."
              href="/nhom/suc-khoe"
              icon={Dumbbell}
              accent="leaf"
            />
          </div>
        </div>
      </section>

      {/* 3. 4 NHÓM SP */}
      <section className="section bg-brand-50">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="section-heading">Danh mục sản phẩm</h2>
              <p className="section-subheading">
                Khám phá các nhóm sản phẩm thiên nhiên được {siteConfig.name} tuyển chọn.
              </p>
            </div>
            <Link
              href="/san-pham"
              className="text-warm-red font-medium hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="mt-8">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* 4. SẢN PHẨM NỔI BẬT */}
      <section className="section bg-white">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="section-heading">Sản phẩm nổi bật</h2>
              <p className="section-subheading">
                Những lựa chọn được khách hàng tin dùng tại {siteConfig.name}.
              </p>
            </div>
            <Link href="/san-pham" className="text-warm-red font-medium hover:underline">
              Tất cả sản phẩm →
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAM KẾT */}
      <section className="section bg-brand-50">
        <div className="container-tight">
          <div className="text-center mx-auto max-w-2xl">
            <h2 className="section-heading">Cam kết của {siteConfig.name}</h2>
            <p className="section-subheading mx-auto">
              Chúng tôi đặt sự an toàn và hài lòng của khách hàng lên hàng đầu.
            </p>
          </div>
          <div className="mt-10">
            <CommitmentList />
          </div>
        </div>
      </section>

      {/* 6. CHẤT LƯỢNG */}
      <section className="section bg-white">
        <div className="container-tight">
          <div className="text-center mx-auto max-w-2xl">
            <h2 className="section-heading">Tiêu chuẩn chất lượng</h2>
            <p className="section-subheading mx-auto">
              Tất cả sản phẩm tại {siteConfig.name} đều được sản xuất trên dây chuyền đạt
              các tiêu chuẩn quốc tế.
            </p>
          </div>
          <div className="mt-8 max-w-3xl mx-auto">
            <QualityBadges />
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="section bg-brand-700 text-white">
        <div className="container-tight">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-semibold leading-tight">
                Bạn cần tư vấn sản phẩm phù hợp?
              </h2>
              <p className="mt-4 text-brand-100 text-lg leading-relaxed">
                Đội ngũ {siteConfig.name} luôn sẵn sàng tư vấn miễn phí qua Zalo và điện
                thoại. Chỉ cần để lại thông tin, chúng tôi sẽ gợi ý sản phẩm phù hợp nhất.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-brand-50 mb-4">Liên hệ ngay hôm nay</p>
              <ZaloCallButtons size="xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
