import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import CategoryTiles from "@/components/home/CategoryTiles";
import EditorialSplit from "@/components/home/EditorialSplit";
import Campaign from "@/components/home/Campaign";
import ServiceRow from "@/components/home/ServiceRow";
import ProductRail from "@/components/product/ProductRail";
import { products } from "@/lib/catalog";

const newIn = products.filter((product) => product.badges.includes("new"));
const bestsellers = products.filter((product) => product.badges.includes("bestseller"));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <div className="reveal-on-scroll">
        <ProductRail
          title="New In"
          products={[...newIn, ...bestsellers].slice(0, 8)}
          href="/shop/new"
        />
      </div>

      <div className="reveal-on-scroll">
        <EditorialSplit
          eyebrow="The edit"
          title="Everyday Knitwear"
          body="Brushed fleece and heavy cotton jersey, cut roomy through the body. The layer that does most of the work between September and March."
          href="/shop/women"
          cta="Shop the edit"
          image="/products/variations/plain-hooded-fleece-sweatshirt-yellow.jpg"
          imageAlt="Hooded fleece sweatshirt in butter yellow"
        />
      </div>

      <div className="reveal-on-scroll">
        <CategoryTiles />
      </div>

      <Campaign />

      <div className="reveal-on-scroll">
        <ProductRail
          title="Most Wanted"
          products={bestsellers}
          href="/shop/women"
          cta="Shop women"
        />
      </div>

      <div className="reveal-on-scroll">
        <EditorialSplit
          eyebrow="Home"
          title="Plain Materials"
          body="Zero-twist cotton, stonewashed linen blends, and glazed stoneware. The same restraint we apply to clothes, applied to the rooms you wear them in."
          href="/shop/home"
          cta="Shop home"
          image="/products/cotton-bath-towels-teal.webp"
          imageAlt="Combed cotton bath towels in teal"
          reverse
        />
      </div>

      <ServiceRow />
    </>
  );
}
