import { query } from "@/lib/db";

type Props = {
  searchParams: {
    min_days?: string;
    page?: string;
    limit?: string;
  };
};

type OverdueLoanRow = {
  loan_id: number;
  member_name: string;
  book_title: string;
  due_at: string;
  days_overdue: number;
  suggested_fine: number;
};

export default async function OverdueLoansReport({ searchParams }: Props) {
  const page = Number(searchParams.page ?? 1);
  const limit = Number(searchParams.limit ?? 5);
  const minDays = Number(searchParams.min_days ?? 0);

  const offset = (page - 1) * limit;

  const data = await query(
    `
    SELECT *
    FROM vw_overdue_loans
    WHERE days_overdue >= $1
    ORDER BY days_overdue DESC
    LIMIT $2 OFFSET $3
    `,
    [minDays, limit, offset]
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1> Préstamos vencidos</h1>
      <p>Reporte de préstamos fuera de tiempo.</p>

      <h3>Página: {page}</h3>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Socio</th>
            <th>Libro</th>
            <th>Fecha límite</th>
            <th>Días atraso</th>
            <th>Multa sugerida</th>
          </tr>
        </thead>
        <tbody>
          {(data as OverdueLoanRow[]).map((row, i) => (
            <tr key={i}>
              <td>{row.member_name}</td>
              <td>{row.book_title}</td>
              <td>{row.due_at}</td>
              <td>{row.days_overdue}</td>
              <td>${row.suggested_fine}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}