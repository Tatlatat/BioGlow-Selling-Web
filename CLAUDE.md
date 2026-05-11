# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev         # Next dev server, http://localhost:3000
npm run build       # Production build
npm run start       # Run built app (requires `build` first)
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
```

There is no test runner configured.

## Architecture

**BioGlowVN** is a Vietnamese-language storefront for natural health/beauty products — a marketing/catalog site, not a transactional store. Orders flow through Zalo and phone (`tel:`), not a cart. Built on Next.js 15 App Router + React 19 + TypeScript + Tailwind + shadcn/ui.

### Content lives in `data/*.ts` — this is the key pattern

Every editable piece of the site (shop name, phone, products, categories, FAQ, blog) is a typed TypeScript constant. Pages import these constants directly; there is no CMS, database, or markdown directory. "Editing the site" = editing files in `data/`.

- `data/site-config.ts` — `siteConfig` singleton: name, contact (phone/zalo/email), shipping, social. **All UI must read from here**; never hardcode the shop's phone, name, or tagline elsewhere.
- `data/products.ts` — `products: readonly Product[]` plus helpers `getProductBySlug`, `getProductsByCategory`, `getFeaturedProducts`, `getRelatedProducts`. `Product.category` is a typed `CategorySlug`.
- `data/categories.ts` — closed set of 4 category slugs as a const tuple: `["dinh-duong", "thiet-yeu", "suc-khoe", "my-pham"]`. Adding a category means updating both `CATEGORY_SLUGS` and the `iconName` union, plus the icon switch in `components/category-icon.tsx`.
- `data/faq.ts`, `data/blog.ts` — same pattern.

When a product detail page calls `generateStaticParams()`, it maps over `products` — so adding to the array is enough to create a new static route at `/san-pham/<slug>`.

### Routes (Vietnamese slugs)

App Router under `app/`:
- `/` → `page.tsx` (home)
- `/san-pham` and `/san-pham/[slug]` — product list + detail (JSON-LD `Product`)
- `/nhom/[nhom]` — products filtered by category slug
- `/blog` and `/blog/[slug]`
- `/cau-hoi-thuong-gap` — FAQ (JSON-LD `FAQPage`)
- `/ve-bioglowvn`, `/lien-he`
- `sitemap.ts` and `robots.ts` are dynamic — they import from `data/` so new products/posts appear automatically.

Each page that has dynamic params types them as `Params = Promise<{ ... }>` and `await`s — this is Next 15's async-params shape, follow it on any new dynamic route.

### Styling and design system

- Tailwind config (`tailwind.config.ts`) defines a custom palette: `brand` (warm brown), `leaf` (green), `gold`, `warm.red`, `ink`. Use these tokens — don't reach for raw `stone-*`/`amber-*` colors.
- shadcn/ui is set up with `baseColor: "stone"` and `cssVariables: false` (`components.json`) — generated components use literal Tailwind classes, not CSS vars. Don't add a vars-based color system on top.
- Body font: `Be_Vietnam_Pro` (sans), with `Lora` (serif). Base font size is bumped to ~17px in the Tailwind theme for older-customer readability — preserve this when adjusting typography.
- Path alias: `@/*` → repo root. Use `@/components/...`, `@/data/...`, `@/lib/utils`.

### TypeScript strictness

`tsconfig.json` enables `noUncheckedIndexedAccess`, `noImplicitReturns`, `noFallthroughCasesInSwitch`. Array/object index access returns `T | undefined` — handle it (e.g. `product.images[0] ? [product.images[0]] : undefined` in the OG metadata block). Use the existing typed helpers in `data/categories.ts` (`getCategory`, `isCategorySlug`) rather than ad-hoc casts.

### Assets

Product images live at `public/products/<slug>/1.jpg`, `2.jpg`, …, referenced from `Product.images` as absolute paths (`/products/<slug>/1.jpg`). Empty `images: []` falls back to a placeholder in `product-card.tsx` / `product-gallery.tsx`.

### SEO

Every page exports `generateMetadata` (or static `metadata`) and inherits the `metadataBase` + title template from `app/layout.tsx`. Product detail pages emit JSON-LD `Product`; the FAQ page emits `FAQPage`. `app/sitemap.ts` and `app/robots.ts` are the canonical sources — don't add static `public/sitemap.xml`.

## Domain notes

- This is a Vietnamese TPCN (thực phẩm chức năng) site. The footer disclaimer "Thực phẩm này không phải là thuốc..." and the `STANDARD_FOOD_WARNING` constant in `data/products.ts` are legally required for health products advertised in Vietnam. Don't remove them and reuse the constant for new health-supplement products.
- The contact form falls back to a Zalo redirect when `siteConfig.contact.email` is empty — keep both paths working when touching `components/contact-form.tsx`.
