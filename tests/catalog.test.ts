import { describe, expect, it } from "vitest";
import {
  categories,
  getCategory,
  getProduct,
  getProductBySlug,
  getProductsByCategory,
  getRelated,
  products,
  searchProducts,
} from "@/lib/catalog";

describe("catalogue integrity", () => {
  it("has a unique id per product", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("has a unique slug per product", () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
  });

  it("gives every product at least one colourway with an image", () => {
    for (const product of products) {
      expect(product.colors.length).toBeGreaterThan(0);
      for (const color of product.colors) {
        expect(color.image).toMatch(/^\/products\//);
      }
    }
  });

  it("prices everything above zero", () => {
    for (const product of products) {
      expect(product.priceCents).toBeGreaterThan(0);
    }
  });

  it("only marks something down from a higher price", () => {
    for (const product of products) {
      if (typeof product.compareAtCents === "number") {
        expect(product.compareAtCents).toBeGreaterThan(product.priceCents);
      }
    }
  });

  it("files every product under a real category", () => {
    const ids = new Set(categories.map((category) => category.id));
    for (const product of products) {
      expect(ids.has(product.category)).toBe(true);
    }
  });

  it("puts at least one product in every category", () => {
    for (const category of categories) {
      expect(getProductsByCategory(category.id).length).toBeGreaterThan(0);
    }
  });
});

describe("lookups", () => {
  it("finds a product by id and by slug", () => {
    const product = products[0];
    expect(getProduct(product.id)).toBe(product);
    expect(getProductBySlug(product.slug)).toBe(product);
  });

  it("returns undefined for an unknown key", () => {
    expect(getProduct("nope")).toBeUndefined();
    expect(getProductBySlug("nope")).toBeUndefined();
    expect(getCategory("nope")).toBeUndefined();
  });
});

describe("getRelated", () => {
  const product = getProductBySlug("stretch-popover-hoodie")!;

  it("never suggests the product you are already looking at", () => {
    expect(getRelated(product, 8).some((entry) => entry.id === product.id)).toBe(false);
  });

  it("respects the limit", () => {
    expect(getRelated(product, 3)).toHaveLength(3);
  });

  it("leads with the same merchandising line", () => {
    expect(getRelated(product, 4)[0].line).toBe(product.line);
  });
});

describe("searchProducts", () => {
  it("matches on a keyword", () => {
    expect(searchProducts("hoodie").length).toBeGreaterThan(0);
  });

  it("matches on the product name", () => {
    expect(searchProducts("chino").map((p) => p.slug)).toContain("slim-fit-chino");
  });

  it("is case insensitive", () => {
    expect(searchProducts("HOODIE").length).toBe(searchProducts("hoodie").length);
  });

  it("requires every term to match", () => {
    expect(searchProducts("hoodie zzzz")).toHaveLength(0);
  });

  it("returns nothing for an empty query", () => {
    expect(searchProducts("   ")).toHaveLength(0);
  });
});
