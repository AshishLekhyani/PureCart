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
- Category listing with live filtering (line, size, colour, reduced), four sort orders, and a
  two-up / four-up grid density switch.
- `new` and `sale` merchandising views over the whole range, the latter ordered by depth of
  markdown.
- Product detail with colourway switching, size selection, an in-page size guide drawer that opens
  on the chart matching the piece, an accordion spec panel, and a business-day delivery estimate.
- Product cards with a hover image swap between colourways, swatch previews, hover-to-add size
  chips, and a save-to-wishlist heart.
- Wishlist and recently viewed, both persisted per browser.
- Instant search panel in the header plus a full `/search` results page.

**Bag, checkout, orders**

- Slide-out bag drawer with a free-shipping progress rail, quantity stepper, and a suggestion row
  when the bag is empty.
- Full bag page with per-line delivery speed selection.
- Sticky purchase bar on mobile product pages, appearing once the real button scrolls away.
- Checkout with field validation and a live order summary. No payment is taken — it is a demo.
- Order history and a per-order tracking page with a Preparing → Shipped → Delivered progress rail
  computed from real timestamps.

**Craft**

- Bag, wishlist and order history persist to `localStorage` and are hydration-safe, so nothing
  flashes or mismatches on first paint.
- 38 static product pages plus category pages prerendered at build time.
- Real focus management: overlays trap Tab, restore focus to whatever opened them, and go `inert`
  when closed rather than leaving off-screen links in the tab order.
- Skip link, visible focus rings, `Escape` on every overlay, `aria-pressed` on every toggle, and a
  `prefers-reduced-motion` bail-out.
- Loading skeletons shaped like the real layout, plus an error boundary with retry.
- Sitemap, robots, Product / Breadcrumb / OnlineStore JSON-LD, and per-product share cards
  generated with `next/og`.
- 75 unit tests over the money, delivery, cart, wishlist, size-guide, and catalogue logic.

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
  shop/[category]/ Category listing — plus the `new` and `sale` views
  product/[slug]/  Product detail, share card, loading state
  cart/ checkout/  Bag and checkout
  orders/          Order history and per-order tracking
  wishlist/        Saved pieces
  search/          Search results
  sitemap.ts       Sitemap and robots
  globals.css      Design tokens and component classes
components/
  layout/          Header, footer, search panel, mobile menu, newsletter
  product/         Card, grid, rail, category view, detail, wishlist, size guide
  cart/            Drawer, bag view, quantity stepper
  checkout/        Checkout form and summary
  orders/          Order list and tracking
  home/            Hero, marquee, category tiles, editorial splits, campaign
  ui/              Skeletons
hooks/             useDialog — focus trap, scroll lock, focus restore
lib/               Catalogue, money, delivery, size guide, types, helpers
store/             Zustand stores (cart, orders, wishlist, recently viewed)
tests/             Vitest suites
assets/fonts/      Display face embedded into generated share cards
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

## Configuration

`NEXT_PUBLIC_SITE_URL` sets the canonical origin used by the sitemap, robots file, structured data
and share cards. On Vercel the deployment host is picked up automatically; locally it falls back to
`http://localhost:3000`.

## Notes

This is a portfolio build. No orders are placed, no payments are taken, and no data leaves the
browser — the bag, wishlist and order history live in `localStorage`, so they do not follow you to
another device.

Product photography and the underlying catalogue data originate from the
[SuperSimpleDev](https://supersimplebackend.dev/) sample dataset; the copy, pricing, colourways,
merchandising, and design are original to this project.

The pre-2.0 vanilla HTML/CSS/JS version of PureCart is preserved in git history at commit
`8ae7885`.
