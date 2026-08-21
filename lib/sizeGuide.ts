export type SizeTable = {
  id: string;
  title: string;
  note: string;
  columns: string[];
  rows: string[][];
};

export const sizeTables: SizeTable[] = [
  {
    id: "clothing",
    title: "Clothing",
    note: "Body measurements in centimetres, not garment measurements.",
    columns: ["Size", "Chest", "Waist", "Hip"],
    rows: [
      ["XS", "80–84", "62–66", "88–92"],
      ["S", "86–90", "68–72", "94–98"],
      ["M", "92–96", "74–78", "100–104"],
      ["L", "98–104", "80–86", "106–112"],
      ["XL", "106–112", "88–94", "114–120"],
    ],
  },
  {
    id: "trousers",
    title: "Trousers",
    note: "Waist sizes are stated in inches.",
    columns: ["Waist", "Centimetres", "Equivalent"],
    rows: [
      ["28", "71", "XS"],
      ["30", "76", "S"],
      ["32", "81", "M"],
      ["34", "86", "M"],
      ["36", "91", "L"],
      ["38", "96", "XL"],
    ],
  },
  {
    id: "footwear",
    title: "Footwear",
    note: "Measure the longest point of the foot, standing.",
    columns: ["EU", "UK", "US", "Foot length"],
    rows: [
      ["36", "3", "5", "22.5 cm"],
      ["37", "4", "6", "23.5 cm"],
      ["38", "5", "7", "24.0 cm"],
      ["39", "6", "8", "24.5 cm"],
      ["40", "6.5", "8.5", "25.5 cm"],
      ["41", "7", "9", "26.0 cm"],
      ["42", "8", "10", "27.0 cm"],
      ["43", "9", "11", "27.5 cm"],
      ["44", "9.5", "11.5", "28.5 cm"],
      ["45", "10.5", "12.5", "29.0 cm"],
    ],
  },
];

const [clothing, trousers, footwear] = sizeTables;

export function tableForSizes(sizes: string[]): SizeTable | null {
  if (sizes.length === 0) return null;

  const numeric = sizes.filter((size) => /^\d{2}$/.test(size)).map(Number);
  if (numeric.length > 0) {
    return Math.min(...numeric) >= 36 ? footwear : trousers;
  }

  const lettered = new Set(clothing.rows.map((row) => row[0]));
  return sizes.every((size) => lettered.has(size)) ? clothing : null;
}
