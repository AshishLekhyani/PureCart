import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/catalog";
import { formatPrice } from "@/lib/money";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PureCart product";

// The OG runtime ships no serif, so the display face is embedded rather than
// named — otherwise the card silently falls back to a generic sans.
const displayFont = readFile(path.join(process.cwd(), "assets/fonts/BodoniModa-Regular.ttf"));

/**
 * Share card for a product. The OG runtime supports a small subset of CSS —
 * flexbox only, no stylesheets — so this is written in plain inline styles
 * rather than reusing the site's Tailwind classes.
 */
export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  const eyebrow = product ? `${product.category} — ${product.line}` : "Ready to wear";
  const title = product?.name ?? "PureCart";
  const price = product ? formatPrice(product.priceCents) : "";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#ffffff",
        color: "#0e0e0e",
        padding: "72px",
        fontFamily: "Bodoni Moda",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 34, letterSpacing: "0.28em", textTransform: "uppercase" }}>
          PureCart
        </span>
        <span
          style={{
            fontSize: 20,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#78746e",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 92, lineHeight: 1.02, textTransform: "uppercase" }}>{title}</span>
        {price && <span style={{ fontSize: 44, marginTop: 30 }}>{price}</span>}
      </div>

      <div style={{ display: "flex", width: "100%", height: 1, background: "#e3dfd8" }} />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Bodoni Moda",
          data: await displayFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
