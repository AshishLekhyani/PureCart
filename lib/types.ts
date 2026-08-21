export type CategoryId = "women" | "men" | "accessories" | "home";

export type Badge = "new" | "bestseller" | "limited" | "sale";

export type ColorVariant = {
  /** Display name, e.g. "Ecru" */
  name: string;
  /** Swatch fill. Use a two-stop gradient string for prints. */
  hex: string;
  /** Path under /public */
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  /** Merchandising line shown under the category, e.g. "Knitwear". */
  line: string;
  priceCents: number;
  /** Original price when the item is marked down. */
  compareAtCents?: number;
  colors: ColorVariant[];
  /** Empty for one-size items and homeware. */
  sizes: string[];
  description: string;
  details: string[];
  rating: { stars: number; count: number };
  badges: Badge[];
  keywords: string[];
};

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  /** Hero image path under /public */
  image: string;
  lines: string[];
};

export type CartItem = {
  productId: string;
  colorName: string;
  size: string;
  quantity: number;
  deliveryOptionId: string;
};

export type OrderItem = CartItem & {
  priceCents: number;
  estimatedDeliveryMs: number;
};

export type Order = {
  id: string;
  placedAtMs: number;
  totalCents: number;
  items: OrderItem[];
};
