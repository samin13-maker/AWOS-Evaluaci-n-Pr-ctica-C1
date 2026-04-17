/**
 * VIEW: vw_fines_summary
 * ---------------------------------------------------------
 * Descripción: 
 * Proporciona un resumen mensual de las multas generadas en la biblioteca, 
 * diferenciando entre multas pagadas y pendientes.
 * * Granularidad (grain): Un registro por mes (mes).
 * * Métricas:
 * - total_pagadas: suma de montos de multas pagadas
 * - total_pendientes: suma de montos de multas pendientes
 * * Campos calculados: Clasificación de multas usando CASE (pagadas vs pendientes)
 * Técnicas SQL: GROUP BY por mes, Uso de HAVING para filtrar resultados agregados
 * * Uso esperado: Análisis financiero de ingresos por multas y control de adeudos.
 * * VERIFY:
 * 1. SELECT * FROM vw_fines_summary ORDER BY mes DESC;
 * 2. SELECT SUM(total_pagadas), SUM(total_pendientes) FROM vw_fines_summary;
 */

export const dynamic = "force-dynamic";
import { query } from "@/lib/db";
import { finesSummarySchema } from "@/lib/validators";

type Props = {
  searchParams: Promise<{
    date_from?: string;
    date_to?: string;
  }>;
};

type FinesSummaryRow = {
  mes: string;
  total_pagadas: number;
  total_pendientes: number;
};

export default async function FinesSummaryReport({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = finesSummarySchema.parse(params);

  const data = await query(
    `
    SELECT *
    FROM vw_fines_summary
    WHERE ($1::date IS NULL OR mes >= $1::date)
      AND ($2::date IS NULL OR mes <= $2::date)
    ORDER BY mes DESC
    `,
    [parsed.date_from ?? null, parsed.date_to ?? null]
  );

  const totalPagadas = (data as FinesSummaryRow[]).reduce(
    (acc, row) => acc + Number(row.total_pagadas), 0
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Resumen de multas</h1>
      <p> Resumen mensual de las multas que ya fueron pagadas y las que siguen pendientes. </p>

      <p><strong>KPI — Total cobrado en el período: ${totalPagadas.toFixed(2)}</strong></p>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">Mes</th>
            <th className="p-3 text-left border-b">Pagadas ($)</th>
            <th className="p-3 text-left border-b">Pendientes ($)</th>
          </tr>
        </thead>

        <tbody>
          {(data as FinesSummaryRow[]).map((row, i) => (
            <tr key={i}>
              <td className="p-3 border-b">
                {new Date(row.mes).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long"
                })}
              </td>
              <td className="p-3 border-b">
                ${Number(row.total_pagadas).toFixed(2)}
              </td>
              <td className="p-3 border-b">
                ${Number(row.total_pendientes).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}