import { beforeEach, describe, expect, it } from "vitest";
import { useCart, selectCount, selectLines, selectShipping, selectSubtotal } from "@/store/cart";
import { getProductBySlug } from "@/lib/catalog";
import { lineKey } from "@/lib/utils";

const hoodie = getProductBySlug("stretch-popover-hoodie")!;
const chino = getProductBySlug("slim-fit-chino")!;

const reset = () => useCart.setState({ items: [], isOpen: false });
const items = () => useCart.getState().items;

beforeEach(reset);

describe("adding to the bag", () => {
  it("adds a new line", () => {
    useCart.getState().add(hoodie, "Black", "M");

    expect(items()).toHaveLength(1);
    expect(items()[0]).toMatchObject({ productId: hoodie.id, size: "M", quantity: 1 });
  });

  it("merges an identical product, colour, and size", () => {
    useCart.getState().add(hoodie, "Black", "M");
    useCart.getState().add(hoodie, "Black", "M", 2);

    expect(items()).toHaveLength(1);
    expect(items()[0].quantity).toBe(3);
  });

  it("keeps a different size as its own line", () => {
    useCart.getState().add(hoodie, "Black", "M");
    useCart.getState().add(hoodie, "Black", "L");

    expect(items()).toHaveLength(2);
  });

  it("keeps a different colour as its own line", () => {
    useCart.getState().add(hoodie, "Black", "M");
    useCart.getState().add(hoodie, "Indigo", "M");

    expect(items()).toHaveLength(2);
  });

  it("defaults to standard delivery", () => {
    useCart.getState().add(hoodie, "Black", "M");
    expect(items()[0].deliveryOptionId).toBe("1");
  });

  it("opens the drawer", () => {
    useCart.getState().add(hoodie, "Black", "M");
    expect(useCart.getState().isOpen).toBe(true);
  });
});

describe("updating the bag", () => {
  const key = () => lineKey(hoodie.id, "Black", "M");

  beforeEach(() => {
    useCart.getState().add(hoodie, "Black", "M", 2);
  });

  it("sets a new quantity", () => {
    useCart.getState().setQuantity(key(), 5);
    expect(items()[0].quantity).toBe(5);
  });

  it("removes the line when the quantity drops to zero", () => {
    useCart.getState().setQuantity(key(), 0);
    expect(items()).toHaveLength(0);
  });

  it("caps the quantity at 99", () => {
    useCart.getState().setQuantity(key(), 500);
    expect(items()[0].quantity).toBe(99);
  });

  it("removes a line by key", () => {
    useCart.getState().remove(key());
    expect(items()).toHaveLength(0);
  });

  it("leaves other lines alone when removing", () => {
    useCart.getState().add(chino, "Sand", "32");
    useCart.getState().remove(key());

    expect(items()).toHaveLength(1);
    expect(items()[0].productId).toBe(chino.id);
  });

  it("changes the delivery option for one line only", () => {
    useCart.getState().add(chino, "Sand", "32");
    useCart.getState().setDeliveryOption(key(), "3");

    expect(items().find((item) => item.productId === hoodie.id)?.deliveryOptionId).toBe("3");
    expect(items().find((item) => item.productId === chino.id)?.deliveryOptionId).toBe("1");
  });

  it("empties the bag", () => {
    useCart.getState().clear();
    expect(items()).toHaveLength(0);
  });
});

describe("selectors", () => {
  it("counts every unit, not every line", () => {
    useCart.getState().add(hoodie, "Black", "M", 2);
    useCart.getState().add(chino, "Sand", "32", 3);

    expect(selectCount(items())).toBe(5);
  });

  it("totals the bag at catalogue prices", () => {
    useCart.getState().add(hoodie, "Black", "M", 2);

    expect(selectSubtotal(items())).toBe(hoodie.priceCents * 2);
  });

  it("joins lines against the catalogue", () => {
    useCart.getState().add(hoodie, "Black", "M");
    const lines = selectLines(items());

    expect(lines[0].product.name).toBe(hoodie.name);
    expect(lines[0].lineTotalCents).toBe(hoodie.priceCents);
  });

  it("drops lines whose product has left the catalogue", () => {
    useCart.setState({
      items: [
        { productId: "gone", colorName: "Black", size: "M", quantity: 1, deliveryOptionId: "1" },
      ],
    });

    expect(selectLines(items())).toHaveLength(0);
    expect(selectSubtotal(items())).toBe(0);
  });

  it("charges shipping once, at the fastest speed requested", () => {
    useCart.getState().add(hoodie, "Black", "M");
    useCart.getState().add(chino, "Sand", "32");
    useCart.getState().setDeliveryOption(lineKey(chino.id, "Sand", "32"), "3");

    expect(selectShipping(items())).toBe(1495);
  });

  it("charges nothing to ship an empty bag", () => {
    expect(selectShipping(items())).toBe(0);
  });
});
