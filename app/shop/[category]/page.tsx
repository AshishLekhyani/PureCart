import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CategoryView from "@/components/product/CategoryView";
import { categories, getCategory, getProductsByCategory, products } from "@/lib/catalog";
import type { CategoryId } from "@/lib/types";

type Params = { params: Promise<{ category: string }> };

function resolveView(slug: string) {
  if (slug === "new") {
    return {
      title: "New In",
      tagline: "The complete autumn winter drop, newest pieces first.",
      products: [...products].sort(
        (a, b) => Number(b.badges.includes("new")) - Number(a.badges.includes("new")),
      ),
    };
  }

  if (slug === "sale") {
    return {
      title: "Sale",
      tagline: "Reduced while stock lasts. Deepest markdowns first.",
      products: products
        .filter((product) => typeof product.compareAtCents === "number")
        .sort(
          (a, b) =>
            (b.compareAtCents! - b.priceCents) / b.compareAtCents! -
            (a.compareAtCents! - a.priceCents) / a.compareAtCents!,
        ),
    };
  }

  const category = getCategory(slug);
  if (!category) return null;

  return {
    title: category.name,
    tagline: category.tagline,
    products: getProductsByCategory(category.id as CategoryId),
  };
}

export function generateStaticParams() {
  return [
    ...categories.map((category) => ({ category: category.id })),
    { category: "new" },
    { category: "sale" },
  ];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const view = resolveView(category);
  if (!view) return { title: "Not found" };

  return { title: view.title, description: view.tagline };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = await params;
  const view = resolveView(category);
  if (!view) notFound();

  return <CategoryView title={view.title} tagline={view.tagline} products={view.products} />;
}
