import { type BlogPost } from "@/data/blog";
import { siteConfig } from "@/data/site-config";

type JsonLdData = Record<string, unknown>;

function JsonLdScript({ data }: { data: JsonLdData }): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function vnPhoneToE164(tel: string): string {
  const digits = tel.replace(/\D/g, "").replace(/^0/, "");
  return `+84${digits}`;
}

export function OrganizationJsonLd(): React.ReactElement {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "OnlineStore"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpg`,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    foundingDate: String(siteConfig.foundingYear),
    areaServed: { "@type": "Country", name: "Vietnam" },
    knowsLanguage: "vi",
    contactPoint: siteConfig.contact.phones.map((p, i) => ({
      "@type": "ContactPoint",
      telephone: vnPhoneToE164(p.tel),
      contactType: i === 0 ? "customer service" : "sales",
      areaServed: "VN",
      availableLanguage: ["Vietnamese"],
    })),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  };
  return <JsonLdScript data={data} />;
}

export function WebsiteJsonLd(): React.ReactElement {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "vi-VN",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
  return <JsonLdScript data={data} />;
}

export type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({
  items,
}: {
  items: BreadcrumbItem[];
}): React.ReactElement {
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  };
  return <JsonLdScript data={data} />;
}

export function BlogPostingJsonLd({
  post,
}: {
  post: BlogPost;
}): React.ReactElement {
  const authorName = post.author ?? siteConfig.name;
  const authorType = post.author ? "Person" : "Organization";
  const data: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": authorType, name: authorName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.jpg`,
      },
    },
    inLanguage: "vi-VN",
    ...(post.keywords && post.keywords.length > 0
      ? { keywords: post.keywords.join(", ") }
      : {}),
  };
  return <JsonLdScript data={data} />;
}
