import { absoluteUrl, siteDescription, siteName, siteUrl } from "@/lib/site";
import { formatCurrency } from "@/lib/money";
import type { Product } from "@/lib/types";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        currenciesAccepted: "USD",
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: absoluteUrl("/search?q={search_term_string}"),
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function ProductJsonLd({ product }: { product: Product }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        sku: product.id,
        category: `${product.category} / ${product.line}`,
        image: product.colors.map((color) => absoluteUrl(color.image)),
        color: product.colors.map((color) => color.name).join(", "),
        brand: { "@type": "Brand", name: siteName },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating.stars,
          reviewCount: product.rating.count,
          bestRating: 5,
        },
        offers: {
          "@type": "Offer",
          url: absoluteUrl(`/product/${product.slug}`),
          price: formatCurrency(product.priceCents),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: absoluteUrl(crumb.path),
        })),
      }}
    />
  );
}
