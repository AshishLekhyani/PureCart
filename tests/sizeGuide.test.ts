import { describe, expect, it } from "vitest";
import { sizeTables, tableForSizes } from "@/lib/sizeGuide";
import { products } from "@/lib/catalog";

describe("size tables", () => {
  it("gives every row a cell per column", () => {
    for (const table of sizeTables) {
      for (const row of table.rows) {
        expect(row).toHaveLength(table.columns.length);
      }
    }
  });

  it("keeps the first column unique so it can key a row", () => {
    for (const table of sizeTables) {
      const keys = table.rows.map((row) => row[0]);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});

describe("tableForSizes", () => {
  it("picks footwear for shoe runs", () => {
    expect(tableForSizes(["38", "39", "40"])?.id).toBe("footwear");
  });

  it("picks trousers for waist runs", () => {
    expect(tableForSizes(["28", "30", "32"])?.id).toBe("trousers");
  });

  it("keeps a waist run that reaches 38 on the trouser chart", () => {
    expect(tableForSizes(["28", "30", "32", "34", "36", "38"])?.id).toBe("trousers");
  });

  it("picks clothing for lettered runs", () => {
    expect(tableForSizes(["S", "M", "L"])?.id).toBe("clothing");
  });

  it("returns nothing when no chart applies", () => {
    expect(tableForSizes([])).toBeNull();
    expect(tableForSizes(["Twin", "Queen"])).toBeNull();
    expect(tableForSizes(["S/M", "L/XL"])).toBeNull();
  });

  it("never offers a chart that omits a size the product sells", () => {
    for (const product of products) {
      const table = tableForSizes(product.sizes);
      if (!table) continue;

      const known = new Set(table.rows.map((row) => row[0]));
      for (const size of product.sizes) {
        expect(known.has(size), `${product.slug} offers ${size}, missing from ${table.id}`).toBe(
          true,
        );
      }
    }
  });
});
