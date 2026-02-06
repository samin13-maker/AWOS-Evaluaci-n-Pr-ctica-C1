import { query } from "@/lib/db";
import { mostBorrowedSchema } from "@/lib/validators";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
    limit?: string;
  }>;
};

type MostBorrowedRow = {
  ranking: number;
  title: string;
  author: string;
  total_loans: number;
};

export default async function MostBorrowedReport({ searchParams }: Props) {
  const params = await searchParams;
  const parsed = mostBorrowedSchema.parse(params);

  const offset = (parsed.page - 1) * parsed.limit;

  const data = await query(
    `
    SELECT *
    FROM vw_most_borrowed_books
    WHERE
      ($1::text IS NULL
       OR title ILIKE '%' || $1 || '%'
       OR author ILIKE '%' || $1 || '%')
    LIMIT $2 OFFSET $3
    `,
    [parsed.search ?? null, parsed.limit, offset]
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1> Libros más prestados</h1>
      <p>Reporte con búsqueda y paginación (server-side).</p>

      <h3>Página: {parsed.page}</h3>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Total préstamos</th>
          </tr>
        </thead>
        <tbody>
          {(data as MostBorrowedRow[]).map((row, i) => (
            <tr key={i}>
              <td>{row.ranking}</td>
              <td>{row.title}</td>
              <td>{row.author}</td>
              <td>{row.total_loans}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}