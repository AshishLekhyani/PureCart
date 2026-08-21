import type { SizeTable as SizeTableData } from "@/lib/sizeGuide";

export default function SizeTable({ table }: { table: SizeTableData }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-md border-collapse text-left">
        <caption className="label-sm text-muted pb-4 text-left">{table.note}</caption>
        <thead>
          <tr className="label-sm text-muted">
            {table.columns.map((column) => (
              <th key={column} scope="col" className="border-line border-b py-3 pr-6 font-normal">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row[0]}>
              <th scope="row" className="label border-line border-b py-4 pr-6 text-left">
                {row[0]}
              </th>
              {row.slice(1).map((cell, index) => (
                <td key={index} className="border-line border-b py-4 pr-6 tabular-nums">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
