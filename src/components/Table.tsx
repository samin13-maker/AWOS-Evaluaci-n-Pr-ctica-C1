type Props = {
  headers: string[];
  rows: (string | number)[][];
};

export default function Table({ headers, rows }: Props) {
  return (
    <table className="w-full mt-6 border-collapse">
      <thead>
        <tr className="bg-gray-800">
          {headers.map((h, i) => (
            <th key={i} className="p-3 text-left">
              {h}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-gray-700">
            {row.map((cell, j) => (
              <td key={j} className="p-3">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}