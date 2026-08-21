import type { Category, CategoryId, Product } from "./types";

const P = "/products";
const V = "/products/variations";

const APPAREL = ["XS", "S", "M", "L", "XL"];
const SHOE = ["36", "37", "38", "39", "40", "41", "42", "43"];
const WAIST = ["28", "30", "32", "34", "36", "38"];

export const products: Product[] = [
  /* ------------------------------- WOMEN ------------------------------- */
  {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    slug: "stretch-popover-hoodie",
    name: "Stretch Popover Hoodie",
    category: "women",
    line: "Sweatshirts",
    priceCents: 3990,
    compareAtCents: 4990,
    colors: [
      { name: "Black", hex: "#141414", image: `${V}/women-stretch-popover-hoodie-black.jpg` },
      { name: "Indigo", hex: "#3C4E6B", image: `${V}/women-stretch-popover-hoodie-blue.jpg` },
      { name: "Grey Marl", hex: "#9A9A97", image: `${V}/women-stretch-popover-hoodie-gray.jpg` },
    ],
    sizes: APPAREL,
    description:
      "A soft four-way stretch hoodie cut close to the body, with a half-placket neckline and a drawcord hood. Wears equally well over a bare shoulder or under a coat.",
    details: [
      "88% polyester, 12% elastane",
      "Regular fit, mid weight",
      "Kangaroo pocket",
      "Machine wash cold",
    ],
    rating: { stars: 4.5, count: 2465 },
    badges: ["bestseller", "sale"],
    keywords: ["hoodie", "sweatshirt", "women", "athleisure", "popover"],
  },
  {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    slug: "french-terry-jogger",
    name: "French Terry Jogger",
    category: "women",
    line: "Trousers",
    priceCents: 4590,
    colors: [
      {
        name: "Camo",
        hex: "linear-gradient(135deg,#6B6F47 0%,#4A4E36 100%)",
        image: `${V}/women-french-terry-fleece-jogger-camo.jpg`,
      },
      {
        name: "Grey Marl",
        hex: "#A3A3A0",
        image: `${V}/women-french-terry-fleece-jogger-gray.jpg`,
      },
    ],
    sizes: APPAREL,
    description:
      "Brushed french terry joggers with a tapered leg and elasticated cuffs. The drawstring waist sits high for a relaxed, clean silhouette.",
    details: [
      "60% cotton, 40% polyester",
      "Relaxed fit, tapered leg",
      "Side seam pockets",
      "Machine wash cold",
    ],
    rating: { stars: 4.5, count: 248 },
    badges: [],
    keywords: ["jogger", "trousers", "sweatpants", "women", "fleece"],
  },
  {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    slug: "sheer-chiffon-cover-up",
    name: "Sheer Chiffon Cover-Up",
    category: "women",
    line: "Beachwear",
    priceCents: 3590,
    colors: [
      { name: "Black", hex: "#131313", image: `${P}/women-chiffon-beachwear-coverup-black.jpg` },
    ],
    sizes: ["S", "M", "L"],
    description:
      "A long chiffon cover-up with a deep V neckline and a tie waist. Semi-sheer, weightless, and made to be thrown over anything from June to September.",
    details: ["100% polyester chiffon", "Semi-sheer", "Self-tie waist", "Hand wash"],
    rating: { stars: 4.5, count: 235 },
    badges: ["new"],
    keywords: ["coverup", "beach", "dress", "women", "chiffon", "kaftan"],
  },
  {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    slug: "knit-ballet-flat",
    name: "Knit Ballet Flat",
    category: "women",
    line: "Shoes",
    priceCents: 4990,
    colors: [
      { name: "Black", hex: "#151515", image: `${V}/women-knit-ballet-flat-black.jpg` },
      { name: "Stone", hex: "#B9B4AC", image: `${V}/women-knit-ballet-flat-gray.jpg` },
      {
        name: "Leopard",
        hex: "linear-gradient(135deg,#C8A166 0%,#4A3521 100%)",
        image: `${V}/women-knit-ballet-flat-leopard.jpg`,
      },
    ],
    sizes: SHOE,
    description:
      "The ballet flat, reworked in a stretch knit upper that moves with the foot. Padded footbed, flexible sole, no break-in period.",
    details: ["Stretch knit upper", "Cushioned insole", "Flexible rubber sole", "Spot clean"],
    rating: { stars: 4, count: 326 },
    badges: ["bestseller"],
    keywords: ["flats", "ballet", "shoes", "women", "knit"],
  },
  {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    slug: "flat-slide-sandal",
    name: "Flat Slide Sandal",
    category: "women",
    line: "Shoes",
    priceCents: 2990,
    colors: [{ name: "Tan", hex: "#B98A5E", image: `${P}/women-beach-sandals.jpg` }],
    sizes: SHOE,
    description:
      "A pared-back slide with a moulded footbed and a single wide strap. Quick-drying and built for sand, tile, and everything in between.",
    details: ["Synthetic upper", "Contoured footbed", "Water resistant", "Wipe clean"],
    rating: { stars: 4.5, count: 562 },
    badges: [],
    keywords: ["sandals", "slides", "beach", "shoes", "women", "summer"],
  },
  {
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    slug: "knit-runner-sneaker",
    name: "Knit Runner Sneaker",
    category: "women",
    line: "Shoes",
    priceCents: 5990,
    colors: [
      { name: "Blush", hex: "#D9A3A8", image: `${P}/knit-athletic-sneakers-pink.webp` },
      { name: "Grey", hex: "#8E8E8B", image: `${P}/knit-athletic-sneakers-gray.jpg` },
    ],
    sizes: SHOE,
    description:
      "A lightweight runner with a seamless knit upper and a foam midsole. Low profile, breathable, and quiet enough to wear off the track.",
    details: ["Engineered knit upper", "EVA foam midsole", "Lace fastening", "Spot clean"],
    rating: { stars: 4, count: 89 },
    badges: ["new"],
    keywords: ["sneakers", "trainers", "runner", "shoes", "women", "knit"],
  },
  {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    slug: "hooded-fleece-sweatshirt",
    name: "Hooded Fleece Sweatshirt",
    category: "women",
    line: "Sweatshirts",
    priceCents: 3990,
    colors: [
      { name: "Butter", hex: "#E4C86A", image: `${V}/plain-hooded-fleece-sweatshirt-yellow.jpg` },
      { name: "Teal", hex: "#3F7F7D", image: `${V}/plain-hooded-fleece-sweatshirt-teal.jpg` },
    ],
    sizes: APPAREL,
    description:
      "A plain brushed-back hoodie with dropped shoulders and a roomy body. Unbranded, pre-shrunk, and softer after every wash.",
    details: ["80% cotton, 20% polyester", "Oversized fit", "Kangaroo pocket", "Machine wash cold"],
    rating: { stars: 4.5, count: 317 },
    badges: [],
    keywords: ["hoodie", "sweatshirt", "fleece", "oversized", "unisex"],
  },

  /* -------------------------------- MEN -------------------------------- */
  {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    slug: "pique-polo-shirt",
    name: "Piqué Polo Shirt",
    category: "men",
    line: "T-Shirts",
    priceCents: 2990,
    colors: [
      { name: "Sky", hex: "#7FA8CF", image: `${V}/men-golf-polo-t-shirt-blue.jpg` },
      { name: "Black", hex: "#161616", image: `${V}/men-golf-polo-t-shirt-black.jpg` },
      { name: "Red", hex: "#A5342E", image: `${V}/men-golf-polo-t-shirt-red.jpg` },
    ],
    sizes: APPAREL,
    description:
      "A technical piqué polo with a three-button placket and a flat rib collar that holds its shape through the wash. Moisture-wicking and cut for movement.",
    details: [
      "100% recycled polyester piqué",
      "Regular fit",
      "Ribbed collar and cuffs",
      "Machine wash cold",
    ],
    rating: { stars: 4.5, count: 2556 },
    badges: ["bestseller"],
    keywords: ["polo", "tshirt", "men", "golf", "shirt"],
  },
  {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    slug: "cotton-t-shirt-two-pack",
    name: "Cotton T-Shirt Two-Pack",
    category: "men",
    line: "T-Shirts",
    priceCents: 1990,
    colors: [
      { name: "Teal", hex: "#3E7C7B", image: `${V}/adults-plain-cotton-tshirt-2-pack-teal.jpg` },
      { name: "Black", hex: "#141414", image: `${V}/adults-plain-cotton-tshirt-2-pack-black.jpg` },
      { name: "Red", hex: "#9E3128", image: `${V}/adults-plain-cotton-tshirt-2-pack-red.jpg` },
    ],
    sizes: APPAREL,
    description:
      "Two plain crew-neck tees in a mid-weight cotton jersey. Straight body, ribbed neckline, no branding. The layer everything else goes on top of.",
    details: ["100% cotton jersey", "Two per pack", "Regular fit", "Machine wash cold"],
    rating: { stars: 4.5, count: 56 },
    badges: ["bestseller"],
    keywords: ["tshirt", "tee", "basics", "cotton", "pack", "unisex"],
  },
  {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    slug: "slim-fit-chino",
    name: "Slim Fit Chino",
    category: "men",
    line: "Trousers",
    priceCents: 4590,
    colors: [
      { name: "Sand", hex: "#C9B294", image: `${V}/men-chino-pants-beige.jpg` },
      { name: "Black", hex: "#171717", image: `${V}/men-chino-pants-black.jpg` },
      { name: "Olive", hex: "#5C6247", image: `${V}/men-chino-pants-green.jpg` },
    ],
    sizes: WAIST,
    description:
      "Slim-cut chinos in a cotton twill with a touch of stretch. Clean front, slanted pockets, and a hem that breaks just above the shoe.",
    details: [
      "97% cotton, 3% elastane twill",
      "Slim fit",
      "Zip fly, four pockets",
      "Machine wash cold",
    ],
    rating: { stars: 4.5, count: 9017 },
    badges: ["bestseller"],
    keywords: ["chinos", "trousers", "pants", "men", "slim"],
  },
  {
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    slug: "zip-through-fleece-hoodie",
    name: "Zip-Through Fleece Hoodie",
    category: "men",
    line: "Sweatshirts",
    priceCents: 4990,
    colors: [
      { name: "Rust", hex: "#8E3B2E", image: `${V}/men-cozy-fleece-zip-up-hoodie-red.jpg` },
      { name: "Black", hex: "#151515", image: `${V}/men-cozy-fleece-zip-up-hoodie-black.jpg` },
    ],
    sizes: APPAREL,
    description:
      "A heavyweight sherpa-lined hoodie with a full-length zip and a lined hood. Built for the cold end of the season.",
    details: [
      "100% polyester sherpa fleece",
      "Regular fit, heavy weight",
      "Two zip pockets",
      "Machine wash cold",
    ],
    rating: { stars: 4.5, count: 3157 },
    badges: [],
    keywords: ["hoodie", "fleece", "zip", "men", "jacket", "sweatshirt"],
  },
  {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    slug: "slim-fit-short",
    name: "Slim Fit Short",
    category: "men",
    line: "Shorts",
    priceCents: 2590,
    compareAtCents: 3590,
    colors: [
      { name: "Grey", hex: "#8C8C89", image: `${V}/men-slim-fit-summer-shorts-gray.jpg` },
      { name: "Sand", hex: "#CBB79A", image: `${V}/men-slim-fit-summer-shorts-beige.jpg` },
      { name: "Black", hex: "#161616", image: `${V}/men-slim-fit-summer-shorts-black.jpg` },
    ],
    sizes: WAIST,
    description:
      "A 7-inch short in a lightweight stretch weave. Slim through the leg, flat at the front, and comfortable enough to keep on all day.",
    details: [
      "96% cotton, 4% elastane",
      'Slim fit, 7" inseam',
      "Elastic back waistband",
      "Machine wash cold",
    ],
    rating: { stars: 4, count: 160 },
    badges: ["sale"],
    keywords: ["shorts", "men", "summer", "slim"],
  },
  {
    id: "1c079479-8586-494f-ab53-219325432536",
    slug: "mesh-trainer",
    name: "Mesh Trainer",
    category: "men",
    line: "Shoes",
    priceCents: 6990,
    colors: [
      { name: "Green", hex: "#4F6B4A", image: `${V}/men-athletic-shoes-green.jpg` },
      { name: "Black", hex: "#171717", image: `${V}/men-athletic-shoes-black.jpg` },
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description:
      "An everyday trainer with a breathable mesh upper and a rubber outsole with a low-profile tread. Understated enough to wear with a chino.",
    details: ["Breathable mesh upper", "Padded collar", "Rubber outsole", "Spot clean"],
    rating: { stars: 4, count: 229 },
    badges: [],
    keywords: ["shoes", "trainers", "sneakers", "men", "athletic"],
  },

  /* ---------------------------- ACCESSORIES ---------------------------- */
  {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    slug: "round-metal-sunglasses",
    name: "Round Metal Sunglasses",
    category: "accessories",
    line: "Eyewear",
    priceCents: 2590,
    colors: [
      { name: "Black", hex: "#141414", image: `${V}/round-sunglasses-black.jpg` },
      { name: "Gold", hex: "#C0A059", image: `${V}/round-sunglasses-gold.jpg` },
    ],
    sizes: [],
    description:
      "A slim round frame in lightweight metal with flat tinted lenses and adjustable nose pads. Comes with a soft case.",
    details: ["Metal frame", "UV400 protection", "Adjustable nose pads", "Soft case included"],
    rating: { stars: 4.5, count: 30 },
    badges: ["new"],
    keywords: ["sunglasses", "eyewear", "accessories", "round"],
  },
  {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    slug: "navigator-sunglasses",
    name: "Navigator Sunglasses",
    category: "accessories",
    line: "Eyewear",
    priceCents: 2290,
    colors: [
      { name: "Tortoise", hex: "#7A5330", image: `${V}/men-navigator-sunglasses-brown.jpg` },
      { name: "Silver", hex: "#B4B7BA", image: `${V}/men-navigator-sunglasses-silver.jpg` },
    ],
    sizes: [],
    description:
      "A classic navigator with a double bridge and gradient lenses. Polarised, so glare off water and glass drops away.",
    details: ["Metal frame", "Polarised UV400 lenses", "Double bridge", "Soft case included"],
    rating: { stars: 3.5, count: 42 },
    badges: [],
    keywords: ["sunglasses", "eyewear", "aviator", "navigator", "accessories"],
  },
  {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    slug: "twisted-wire-drop-earring",
    name: "Twisted Wire Drop Earring",
    category: "accessories",
    line: "Jewellery",
    priceCents: 2400,
    colors: [
      {
        name: "Gold",
        hex: "#C6A961",
        image: `${P}/double-elongated-twist-french-wire-earrings.webp`,
      },
    ],
    sizes: [],
    description:
      "An elongated double twist on a french wire, long enough to catch the light when you move. Hypoallergenic and featherweight.",
    details: ["14k gold plated brass", "French wire fastening", "Nickel free", "Length 6 cm"],
    rating: { stars: 4.5, count: 117 },
    badges: [],
    keywords: ["earrings", "jewellery", "jewelry", "gold", "accessories"],
  },
  {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    slug: "flower-stud-earring",
    name: "Flower Stud Earring",
    category: "accessories",
    line: "Jewellery",
    priceCents: 1890,
    colors: [{ name: "Sky", hex: "#9DBBD6", image: `${P}/sky-flower-stud-earrings.webp` }],
    sizes: [],
    description:
      "A small enamel flower on a sterling post. Quiet enough for every day, and it will not fight with anything else you are wearing.",
    details: ["Sterling silver post", "Enamel detail", "Nickel free", "Diameter 8 mm"],
    rating: { stars: 4.5, count: 52 },
    badges: [],
    keywords: ["earrings", "studs", "jewellery", "jewelry", "accessories"],
  },
  {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    slug: "woven-straw-hat",
    name: "Woven Straw Hat",
    category: "accessories",
    line: "Hats",
    priceCents: 2990,
    colors: [{ name: "Natural", hex: "#D8C398", image: `${P}/straw-sunhat.webp` }],
    sizes: [],
    description:
      "A wide-brim straw hat with a grosgrain band and an internal drawstring so it stays on in the wind. Folds flat for travel.",
    details: ["100% paper straw", "Wide 10 cm brim", "Internal size drawstring", "UPF 50+"],
    rating: { stars: 4, count: 215 },
    badges: ["limited"],
    keywords: ["hat", "straw", "sunhat", "summer", "accessories"],
  },
  {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    slug: "chunky-rib-beanie",
    name: "Chunky Rib Beanie",
    category: "accessories",
    line: "Hats",
    priceCents: 1690,
    colors: [{ name: "Grey Marl", hex: "#9C9C99", image: `${P}/women-chunky-beanie-gray.webp` }],
    sizes: [],
    description:
      "A deep-turnup beanie in a chunky rib knit. Warm, slightly slouchy, and it holds its shape.",
    details: ["100% acrylic", "Chunky rib knit", "Turn-up cuff", "Hand wash"],
    rating: { stars: 5, count: 83 },
    badges: [],
    keywords: ["beanie", "hat", "knit", "winter", "accessories"],
  },
  {
    id: "0ba9a1bd-1a3f-4a11-a1c4-2f6ec1a2f001",
    slug: "canvas-day-backpack",
    name: "Canvas Day Backpack",
    category: "accessories",
    line: "Bags",
    priceCents: 4590,
    colors: [{ name: "Charcoal", hex: "#3B3D40", image: `${P}/backpack.jpg` }],
    sizes: [],
    description:
      "A clean-front backpack in a coated canvas, with a padded laptop sleeve and a water-bottle pocket that disappears when empty.",
    details: ["Coated cotton canvas", 'Fits 15" laptop', "Water repellent finish", "Capacity 22 L"],
    rating: { stars: 4.5, count: 402 },
    badges: ["new"],
    keywords: ["backpack", "bag", "canvas", "accessories", "laptop"],
  },
  {
    id: "0ba9a1bd-1a3f-4a11-a1c4-2f6ec1a2f002",
    slug: "compact-storm-umbrella",
    name: "Compact Storm Umbrella",
    category: "accessories",
    line: "Bags",
    priceCents: 1990,
    colors: [{ name: "Black", hex: "#1A1A1A", image: `${P}/umbrella.jpg` }],
    sizes: [],
    description:
      "A vented double canopy on a fibreglass frame that flips back instead of breaking. Folds down to 28 cm.",
    details: [
      "Fibreglass ribbed frame",
      "Vented double canopy",
      "Automatic open and close",
      "Folded length 28 cm",
    ],
    rating: { stars: 4.5, count: 268 },
    badges: [],
    keywords: ["umbrella", "rain", "accessories"],
  },
  {
    id: "0ba9a1bd-1a3f-4a11-a1c4-2f6ec1a2f003",
    slug: "ribbed-sport-sock-six-pack",
    name: "Ribbed Sport Sock Six-Pack",
    category: "accessories",
    line: "Socks",
    priceCents: 1490,
    colors: [
      {
        name: "Black / Grey",
        hex: "linear-gradient(135deg,#1A1A1A 50%,#9A9A9A 50%)",
        image: `${P}/athletic-cotton-socks-6-pairs.jpg`,
      },
    ],
    sizes: ["S/M", "L/XL"],
    description:
      "Six pairs of cushioned crew socks in a cotton rib, with an arch band that keeps them from sliding.",
    details: [
      "80% cotton, 17% polyester, 3% elastane",
      "Six pairs per pack",
      "Cushioned sole",
      "Machine wash warm",
    ],
    rating: { stars: 4.5, count: 87 },
    badges: [],
    keywords: ["socks", "basics", "sport", "accessories", "pack"],
  },

  /* -------------------------------- HOME ------------------------------- */
  {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    slug: "washed-cotton-duvet-set",
    name: "Washed Cotton Duvet Set",
    category: "home",
    line: "Bedroom",
    priceCents: 5990,
    colors: [
      { name: "Indigo", hex: "#41597E", image: `${V}/duvet-cover-set-blue-twin.jpg` },
      { name: "Brick", hex: "#8E4438", image: `${V}/duvet-cover-set-red-twin.jpg` },
    ],
    sizes: ["Twin", "Queen"],
    description:
      "A stonewashed cotton duvet cover with two pillowcases. Soft from the first night, with the lived-in crumple that only washed cotton gets.",
    details: [
      "100% stonewashed cotton",
      "Duvet cover + 2 pillowcases",
      "Hidden button closure",
      "Machine wash cold",
    ],
    rating: { stars: 4, count: 456 },
    badges: [],
    keywords: ["duvet", "bedding", "bedroom", "cotton", "home"],
  },
  {
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    slug: "combed-cotton-bath-towel",
    name: "Combed Cotton Bath Towel",
    category: "home",
    line: "Bathroom",
    priceCents: 2490,
    colors: [{ name: "Teal", hex: "#3D7A79", image: `${P}/cotton-bath-towels-teal.webp` }],
    sizes: ["Hand", "Bath", "Sheet"],
    description:
      "A dense combed-cotton towel with a plain woven border. Absorbent, quick to dry, and it will not shed.",
    details: ["100% combed cotton, 600 gsm", "Woven border", "Low lint", "Machine wash warm"],
    rating: { stars: 4.5, count: 93 },
    badges: [],
    keywords: ["towel", "bathroom", "cotton", "home", "bath"],
  },
  {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    slug: "zero-twist-towel-set",
    name: "Zero-Twist Towel Set",
    category: "home",
    line: "Bathroom",
    priceCents: 4590,
    colors: [{ name: "Graphite", hex: "#6E7175", image: `${V}/luxury-tower-set-6-piece.jpg` }],
    sizes: ["4 Piece", "6 Piece"],
    description:
      "A full set of bath, hand, and face towels in a heavyweight zero-twist cotton. One colour, no pattern, no logo.",
    details: [
      "100% zero-twist cotton",
      "700 gsm",
      "Bath, hand, and face towels",
      "Machine wash warm",
    ],
    rating: { stars: 4.5, count: 144 },
    badges: ["bestseller"],
    keywords: ["towels", "bathroom", "set", "home", "cotton"],
  },
  {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    slug: "tufted-bath-mat",
    name: "Tufted Bath Mat",
    category: "home",
    line: "Bathroom",
    priceCents: 1690,
    colors: [{ name: "Charcoal", hex: "#4A4A48", image: `${P}/bathroom-rug.jpg` }],
    sizes: [],
    description:
      "A dense tufted mat with a non-slip backing. Deep enough to sink into, thin enough to clear the door.",
    details: ["Microfibre pile", "Non-slip TPR backing", "50 x 80 cm", "Machine wash cold"],
    rating: { stars: 4.5, count: 119 },
    badges: [],
    keywords: ["rug", "mat", "bathroom", "home"],
  },
  {
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    slug: "blackout-curtain-pair",
    name: "Blackout Curtain Pair",
    category: "home",
    line: "Living",
    priceCents: 5490,
    colors: [
      { name: "Black", hex: "#1C1C1C", image: `${P}/blackout-curtains-black.jpg` },
      { name: "Sand", hex: "#CDBEA5", image: `${P}/blackout-curtain-set-beige.webp` },
    ],
    sizes: ['84"', '96"'],
    description:
      "A triple-weave blackout panel that kills light and softens sound. Grommet top, so it hangs in even folds straight out of the pack.",
    details: [
      "Triple-weave polyester",
      "Blackout and thermal",
      "Grommet top",
      "Two panels per pack",
    ],
    rating: { stars: 4.5, count: 363 },
    badges: [],
    keywords: ["curtains", "blackout", "living", "home", "window"],
  },
  {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    slug: "round-vanity-mirror",
    name: "Round Vanity Mirror",
    category: "home",
    line: "Living",
    priceCents: 2290,
    colors: [{ name: "Silver", hex: "#B7BABD", image: `${P}/vanity-mirror-silver.jpg` }],
    sizes: [],
    description:
      "A double-sided mirror on a pivot stand, one side plain and one 10x magnified. Brushed metal frame, weighted base.",
    details: ["Brushed metal frame", "10x magnification reverse", "360° pivot", "Diameter 20 cm"],
    rating: { stars: 4.5, count: 130 },
    badges: [],
    keywords: ["mirror", "vanity", "bedroom", "home"],
  },
  {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    slug: "soft-close-step-bin",
    name: "Soft-Close Step Bin",
    category: "home",
    line: "Living",
    priceCents: 8990,
    colors: [
      { name: "Steel", hex: "#B0B4B7", image: `${V}/trash-can-with-foot-pedal-50-liter.jpg` },
    ],
    sizes: ["30 L", "50 L"],
    description:
      "A fingerprint-resistant steel bin with a soft-close lid and a removable inner bucket. Silent, and it stays shut.",
    details: [
      "Fingerprint-resistant stainless steel",
      "Soft-close lid",
      "Removable inner bucket",
      "Non-skid base",
    ],
    rating: { stars: 4.5, count: 2286 },
    badges: [],
    keywords: ["bin", "trash", "living", "home", "steel"],
  },
  {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    slug: "stoneware-plate-set",
    name: "Stoneware Plate Set",
    category: "home",
    line: "Dining",
    priceCents: 3490,
    colors: [{ name: "White", hex: "#EFEDE7", image: `${P}/6-piece-white-dinner-plate-set.jpg` }],
    sizes: [],
    description:
      "Six plain stoneware dinner plates with a subtle rim. Chip resistant, stackable, dishwasher and microwave safe.",
    details: [
      "Glazed stoneware",
      "Six plates, 27 cm",
      "Dishwasher and microwave safe",
      "Chip resistant",
    ],
    rating: { stars: 4, count: 37 },
    badges: [],
    keywords: ["plates", "dining", "tableware", "home", "stoneware"],
  },
  {
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    slug: "printed-mixing-bowl-set",
    name: "Printed Mixing Bowl Set",
    category: "home",
    line: "Dining",
    priceCents: 4290,
    colors: [
      {
        name: "Floral",
        hex: "linear-gradient(135deg,#E8DCC8 0%,#7E8F6A 100%)",
        image: `${P}/floral-mixing-bowl-set.jpg`,
      },
    ],
    sizes: [],
    description:
      "A nesting set of ceramic mixing bowls with a hand-drawn floral print. Oven safe, and good enough to serve from.",
    details: [
      "Glazed ceramic",
      "Set of three, nesting",
      "Oven and dishwasher safe",
      "1 L / 2 L / 3.5 L",
    ],
    rating: { stars: 5, count: 679 },
    badges: ["limited"],
    keywords: ["bowls", "kitchen", "dining", "ceramic", "home", "baking"],
  },
  {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    slug: "airtight-storage-canister-set",
    name: "Airtight Storage Canister Set",
    category: "home",
    line: "Kitchen",
    priceCents: 3290,
    colors: [
      { name: "Clear", hex: "#DCE2E4", image: `${P}/round-airtight-food-storage-containers.jpg` },
    ],
    sizes: [],
    description:
      "Stackable canisters with a one-touch airtight lid and a silicone gasket. Clear body so you can see what is running low.",
    details: ["BPA-free plastic", "Set of five", "One-touch airtight seal", "Dishwasher safe base"],
    rating: { stars: 4, count: 126 },
    badges: [],
    keywords: ["storage", "containers", "kitchen", "home", "canister"],
  },
  {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    slug: "glass-and-steel-kettle",
    name: "Glass and Steel Kettle",
    category: "home",
    line: "Kitchen",
    priceCents: 3990,
    colors: [
      {
        name: "Steel",
        hex: "#B9BDC0",
        image: `${P}/electric-glass-and-steel-hot-water-kettle.webp`,
      },
    ],
    sizes: [],
    description:
      "A borosilicate glass kettle with a brushed steel collar and a blue interior light. Boils 1.7 litres in under five minutes.",
    details: [
      "Borosilicate glass body",
      "1.7 L capacity",
      "Auto shut-off and boil-dry protection",
      "Cordless base",
    ],
    rating: { stars: 5, count: 846 },
    badges: ["bestseller"],
    keywords: ["kettle", "kitchen", "appliance", "home", "glass"],
  },
  {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    slug: "glass-carafe-coffee-maker",
    name: "Glass Carafe Coffee Maker",
    category: "home",
    line: "Kitchen",
    priceCents: 2990,
    colors: [
      { name: "Black", hex: "#1E1E1E", image: `${P}/coffeemaker-with-glass-carafe-black.jpg` },
    ],
    sizes: [],
    description:
      "A twelve-cup drip machine with a pause-and-serve valve and a programmable timer. Simple controls, no screen to fight.",
    details: [
      "12 cup glass carafe",
      "Programmable 24h timer",
      "Pause and serve",
      "Reusable filter included",
    ],
    rating: { stars: 4.5, count: 1211 },
    badges: [],
    keywords: ["coffee", "kitchen", "appliance", "home", "carafe"],
  },
  {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    slug: "two-slot-toaster",
    name: "Two-Slot Toaster",
    category: "home",
    line: "Kitchen",
    priceCents: 2490,
    colors: [{ name: "Black", hex: "#1D1D1D", image: `${P}/black-2-slot-toaster.jpg` }],
    sizes: [],
    description:
      "A matte two-slot toaster with extra-wide slots, six browning levels, and a crumb tray that actually slides out.",
    details: [
      "Extra-wide slots",
      "Six browning levels",
      "Defrost and reheat",
      "Removable crumb tray",
    ],
    rating: { stars: 5, count: 2197 },
    badges: [],
    keywords: ["toaster", "kitchen", "appliance", "home"],
  },
  {
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    slug: "countertop-blender",
    name: "Countertop Blender",
    category: "home",
    line: "Kitchen",
    priceCents: 10990,
    compareAtCents: 12990,
    colors: [{ name: "Steel", hex: "#AFB4B7", image: `${P}/countertop-blender-64-oz.jpg` }],
    sizes: [],
    description:
      "A 64-ounce blender with a 1200-watt motor and a stainless six-point blade. Crushes ice without a preset.",
    details: [
      "1200 W motor",
      "64 oz BPA-free jar",
      "Six-point stainless blade",
      "Dishwasher safe jar",
    ],
    rating: { stars: 4, count: 312 },
    badges: ["sale"],
    keywords: ["blender", "kitchen", "appliance", "home"],
  },
  {
    id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    slug: "non-stick-cookware-set",
    name: "Non-Stick Cookware Set",
    category: "home",
    line: "Kitchen",
    priceCents: 7990,
    colors: [
      { name: "Charcoal", hex: "#3A3A38", image: `${P}/non-stick-cooking-set-15-pieces.webp` },
    ],
    sizes: [],
    description:
      "Fifteen pieces of hard-anodised cookware with a triple-layer non-stick coating and stay-cool handles.",
    details: [
      "Hard-anodised aluminium",
      "15 pieces with lids and tools",
      "Oven safe to 200°C",
      "PFOA free",
    ],
    rating: { stars: 4.5, count: 511 },
    badges: [],
    keywords: ["cookware", "pans", "kitchen", "home", "set"],
  },
  {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    slug: "carbon-steel-bakeware-set",
    name: "Carbon Steel Bakeware Set",
    category: "home",
    line: "Kitchen",
    priceCents: 3990,
    colors: [{ name: "Charcoal", hex: "#40403E", image: `${P}/6-piece-non-stick-baking-set.webp` }],
    sizes: [],
    description:
      "Six carbon-steel baking pans with a textured non-stick surface that browns evenly and releases clean.",
    details: [
      "Carbon steel core",
      "Six pieces",
      "Warp resistant to 230°C",
      "Hand wash recommended",
    ],
    rating: { stars: 4.5, count: 175 },
    badges: [],
    keywords: ["baking", "bakeware", "kitchen", "home", "set"],
  },
];

export const categories: Category[] = [
  {
    id: "women",
    name: "Women",
    tagline: "Soft structure, easy volume",
    image: `${V}/women-stretch-popover-hoodie-black.jpg`,
    lines: ["Sweatshirts", "Trousers", "Beachwear", "Shoes"],
  },
  {
    id: "men",
    name: "Men",
    tagline: "Clean lines, worn-in cotton",
    image: `${V}/men-chino-pants-beige.jpg`,
    lines: ["T-Shirts", "Sweatshirts", "Trousers", "Shorts", "Shoes"],
  },
  {
    id: "accessories",
    name: "Accessories",
    tagline: "The last thing you put on",
    image: `${P}/straw-sunhat.webp`,
    lines: ["Eyewear", "Jewellery", "Hats", "Bags", "Socks"],
  },
  {
    id: "home",
    name: "Home",
    tagline: "Plain materials, honestly made",
    image: `${P}/cotton-bath-towels-teal.webp`,
    lines: ["Bedroom", "Bathroom", "Living", "Dining", "Kitchen"],
  },
];

/* ------------------------------- Lookups ------------------------------- */

const bySlug = new Map(products.map((p) => [p.slug, p]));
const byId = new Map(products.map((p) => [p.id, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return bySlug.get(slug);
}

export function getProduct(id: string): Product | undefined {
  return byId.get(id);
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getProductsByCategory(id: CategoryId): Product[] {
  return products.filter((p) => p.category === id);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameLine = products.filter((p) => p.id !== product.id && p.line === product.line);
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category && p.line !== product.line,
  );
  return [...sameLine, ...sameCategory].slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return products
    .map((product) => {
      const haystack = [product.name, product.line, product.category, ...product.keywords]
        .join(" ")
        .toLowerCase();
      const score = terms.reduce((total, term) => (haystack.includes(term) ? total + 1 : total), 0);
      return { product, score };
    })
    .filter((entry) => entry.score === terms.length)
    .sort((a, b) => b.product.rating.count - a.product.rating.count)
    .map((entry) => entry.product);
}
