export type CategoryId = "women" | "men" | "accessories" | "home";

export type Badge = "new" | "bestseller" | "limited" | "sale";

export type ShotStyle = "model" | "still";

export type ColorVariant = {
  name: string;
  hex: string;
  image: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  line: string;
  shot: ShotStyle;
  priceCents: number;
  compareAtCents?: number;
  colors: ColorVariant[];
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
