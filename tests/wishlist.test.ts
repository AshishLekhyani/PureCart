import { beforeEach, describe, expect, it } from "vitest";
import { useWishlist } from "@/store/wishlist";
import { useRecentlyViewed } from "@/store/recentlyViewed";

const wishlist = () => useWishlist.getState();
const recent = () => useRecentlyViewed.getState();

describe("wishlist", () => {
  beforeEach(() => useWishlist.setState({ ids: [] }));

  it("saves a product", () => {
    wishlist().toggle("a");
    expect(wishlist().ids).toEqual(["a"]);
  });

  it("unsaves on a second toggle", () => {
    wishlist().toggle("a");
    wishlist().toggle("a");
    expect(wishlist().ids).toEqual([]);
  });

  it("keeps the newest save first", () => {
    wishlist().toggle("a");
    wishlist().toggle("b");
    expect(wishlist().ids).toEqual(["b", "a"]);
  });

  it("removes without toggling back on", () => {
    wishlist().toggle("a");
    wishlist().remove("a");
    wishlist().remove("a");
    expect(wishlist().ids).toEqual([]);
  });

  it("empties completely", () => {
    wishlist().toggle("a");
    wishlist().toggle("b");
    wishlist().clear();
    expect(wishlist().ids).toEqual([]);
  });
});

describe("recently viewed", () => {
  beforeEach(() => useRecentlyViewed.setState({ ids: [] }));

  it("records a view", () => {
    recent().record("a");
    expect(recent().ids).toEqual(["a"]);
  });

  it("moves a repeat view to the front rather than duplicating it", () => {
    recent().record("a");
    recent().record("b");
    recent().record("a");

    expect(recent().ids).toEqual(["a", "b"]);
  });

  it("caps the history at twelve", () => {
    for (let index = 0; index < 20; index++) recent().record(`p${index}`);

    expect(recent().ids).toHaveLength(12);
    expect(recent().ids[0]).toBe("p19");
    expect(recent().ids).not.toContain("p7");
  });
});
