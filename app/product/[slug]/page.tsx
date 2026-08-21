import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
import ProductRail from "@/components/product/ProductRail";
import { getProductBySlug, getRelated, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${formatPrice(product.priceCents)}`,
      description: product.description,
      images: [{ url: product.colors[0].image }],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <ProductRail title="You may also like" products={getRelated(product, 8)} />
    </>
  );
}
