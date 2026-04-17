/**
 * VIEW: vw_overdue_loans
 * ---------------------------------------------------------
 * Descripción: 
 * Lista los préstamos vencidos, mostrando información del socio, 
 * libro, días de atraso y un monto sugerido de multa.
 * * Granularidad (grain): Un registro por préstamo vencido (loan_id).
 * * Métricas:
 * - dias_atraso: número de días de retraso
 * - monto_sugerido: multa calculada en función del atraso
 * * Campos calculados: dias_atraso (fecha), monto_sugerido usando CASE
 * Técnicas SQL: Uso de CTE (WITH), CASE para cálculo de multa
 * * Uso esperado: Seguimiento de morosidad y estimación de ingresos.
 * * VERIFY:
 * 1. SELECT * FROM vw_overdue_loans ORDER BY dias_atraso DESC;
 * 2. SELECT COUNT(*) FROM vw_overdue_loans;
 */

export const dynamic = "force-dynamic";
import { query } from "@/lib/db";
import { overdueLoansSchema } from "@/lib/validators";

type Props = {
  searchParams: Promise<{
    min_days?: string;
    page?: string;
    limit?: string;
  }>;
};

type OverdueLoanRow = {
  loan_id: number;
  member_name: string;
  book_title: string;
  due_at: string;
  dias_atraso: number;
  monto_sugerido: number;
};

export default async function OverdueLoansReport({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = overdueLoansSchema.parse(params);

  const offset = (parsed.page - 1) * parsed.limit;

  const data = await query(
    `
    SELECT *
    FROM vw_overdue_loans
    WHERE ($1::int IS NULL OR dias_atraso >= $1)
    ORDER BY dias_atraso DESC
    LIMIT $2 OFFSET $3
    `,
    [parsed.min_days ?? null, parsed.limit, offset]
  );

  const totalMulta = (data as OverdueLoanRow[]).reduce(
    (acc, row) => acc + Number(row.monto_sugerido),
    0
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Préstamos vencidos</h1>
      <p>Los préstamos que no han sido devueltos a tiempo, junto con los días de atraso y una estimación de la multa correspondiente.</p>

      <p>
        Filtrando: mínimo <strong>{parsed.min_days}</strong> días de atraso — Página: <strong>{parsed.page}</strong>
      </p>

      <p>
        <strong>KPI – Total estimado de multas: ${totalMulta}</strong>
      </p>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">Socio</th>
            <th className="p-3 text-left border-b">Libro</th>
            <th className="p-3 text-left border-b">Fecha límite</th>
            <th className="p-3 text-left border-b">Días atraso</th>
            <th className="p-3 text-left border-b">Multa sugerida</th>
          </tr>
        </thead>

        <tbody>
          {(data as OverdueLoanRow[]).map((row, i) => (
            <tr key={i}>
              <td className="p-3 border-b">{row.member_name}</td>
              <td className="p-3 border-b">{row.book_title}</td>
              <td className="p-3 border-b">
                {new Date(row.due_at).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
              <td className="p-3 border-b">{row.dias_atraso}</td>
              <td className="p-3 border-b">
                ${row.monto_sugerido}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-4 mt-6">
        {parsed.page > 1 && (
          <a
            href={`?min_days=${parsed.min_days ?? ""}&page=${parsed.page - 1}&limit=${parsed.limit}`}
            className="px-3 py-1 bg-gray-700 rounded"
          >
            ← Anterior
          </a>
        )}

        <span className="font-semibold">
          Página {parsed.page}
        </span>

        <a
          href={`?min_days=${parsed.min_days ?? ""}&page=${parsed.page + 1}&limit=${parsed.limit}`}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          Siguiente →
        </a>
      </div>
    </main>
  );
}