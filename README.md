# PureCart

A ready-to-wear storefront built with Next.js — women, men, accessories, and home. The design
follows the editorial-minimal register that Zara, COS, and H&M use: high-contrast serif display
type, tiny wide-tracked uppercase labels, hairline rules instead of shadows, square corners, and
photography carrying the page.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Features

**Storefront**

- Editorial home page — staggered hero, scrolling marquee, category tiles, editorial splits, and
  horizontally scrolling product rails.
- Category listing with live filtering (line, size, reduced), four sort orders, and a two-up /
  four-up grid density switch.
- Product detail with colourway switching, size selection, an accordion spec panel, and a
  business-day delivery estimate.
- Product cards with a hover image swap between colourways, swatch previews, and hover-to-add size
  chips.
- Instant search panel in the header plus a full `/search` results page.

**Bag, checkout, orders**

- Slide-out bag drawer with a free-shipping progress rail, quantity stepper, and per-line removal.
- Full bag page with per-line delivery speed selection.
- Checkout with field validation and a live order summary. No payment is taken — it is a demo.
- Order history and a per-order tracking page with a Preparing → Shipped → Delivered progress rail
  computed from real timestamps.

**Craft**

- Bag and order history persist to `localStorage` and are hydration-safe, so nothing flashes or
  mismatches on first paint.
- 38 static product pages plus category pages prerendered at build time.
- Keyboard-navigable throughout: skip link, focus rings, `Escape` closes every overlay,
  `aria-pressed` on every toggle, and a `prefers-reduced-motion` bail-out.
- 57 unit tests over the money, delivery, cart, and catalogue logic.

## Tech

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, tokens defined in `app/globals.css` |
| State | Zustand with `persist` |
| Icons | lucide-react |
| Type | Bodoni Moda (display) + Inter (UI), via `next/font` |
| Testing | Vitest |

## Structure

```text
app/               Routes (App Router)
  shop/[category]/ Category listing — plus the `new` merchandising view
  product/[slug]/  Product detail
  cart/ checkout/  Bag and checkout
  orders/          Order history and per-order tracking
  search/          Search results
  globals.css      Design tokens and component classes
components/
  layout/          Header, footer, search panel, mobile menu
  product/         Card, grid, rail, category view, detail
  cart/            Drawer, bag view, quantity stepper
  checkout/        Checkout form and summary
  orders/          Order list and tracking
  home/            Hero, marquee, category tiles, editorial splits, campaign
lib/               Catalogue, money, delivery, types, helpers
store/             Zustand stores (cart, orders)
tests/             Vitest suites
public/products/   Product photography
```

## Design system

Everything is built from a handful of tokens in `app/globals.css`:

- **Colour** — `ink` `#0E0E0E`, `paper` `#FFFFFF`, `sand` `#F5F2ED`, `line` `#E3DFD8`, `muted`
  `#78746E`, and one accent, `sale` `#A8332B`.
- **Type** — Bodoni Moda for display, Inter for UI. The `.label` and `.label-sm` classes carry most
  of the interface: uppercase, 11px/10px, `0.16em`–`0.18em` tracking.
- **Depth** — none. No border radius and no shadows anywhere; separation comes from hairlines,
  whitespace, and the photography.
- **Motion** — one easing curve (`--ease-out-soft`), 300–700ms, disabled under
  `prefers-reduced-motion`.

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm start       # serve the production build
npm test        # run the Vitest suite
```

## Notes

This is a portfolio build. No orders are placed, no payments are taken, and no data leaves the
browser — the bag and order history live in `localStorage`, so they do not follow you to another
device.

Product photography and the underlying catalogue data originate from the
[SuperSimpleDev](https://supersimplebackend.dev/) sample dataset; the copy, pricing, colourways,
merchandising, and design are original to this project.

The pre-2.0 vanilla HTML/CSS/JS version of PureCart is preserved in git history at commit
`8ae7885`.
