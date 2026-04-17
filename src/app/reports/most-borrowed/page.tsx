/**
 * VIEW: vw_most_borrowed_books
 * ---------------------------------------------------------
 * Descripción: 
 * Muestra los libros más prestados en la biblioteca, permitiendo 
 * identificar los títulos con mayor demanda.
 * * Granularidad (grain): Un registro por libro (title, author).
 * * Métricas:
 * - total_prestamos: número total de préstamos por libro
 * * Campos calculados: Ranking de popularidad usando RANK()
 * Técnicas SQL: Uso de COUNT para agregación, Window Function (RANK OVER)
 * * Uso esperado: Análisis de popularidad y toma de decisiones de inventario.
 * * VERIFY:
 * 1. SELECT * FROM vw_most_borrowed_books ORDER BY total_prestamos DESC;
 * 2. SELECT COUNT(*) FROM vw_most_borrowed_books;
 */

export const dynamic = "force-dynamic";
import { query } from "@/lib/db";

type MostBorrowedRow = {
  title: string;
  author: string;
  total_prestamos: number;
};

export default async function MostBorrowedReport() {
  const data = await query(
    "SELECT * FROM vw_most_borrowed_books ORDER BY total_prestamos DESC LIMIT 10"
  );

  const totalGeneral = (data as MostBorrowedRow[]).reduce(
    (acc, row) => acc + Number(row.total_prestamos),
    0
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Libros más prestados</h1>
      <p>Top 10 de libros con mayor cantidad de préstamos históricos.</p>

      <p>
        <strong>KPI – Total de préstamos del Top 10: {totalGeneral}</strong>
      </p>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">Título</th>
            <th className="p-3 text-left border-b">Autor</th>
            <th className="p-3 text-left border-b">Total Préstamos</th>
          </tr>
        </thead>

        <tbody>
          {(data as MostBorrowedRow[]).map((row, i) => (
            <tr key={i}>
              <td className="p-3 border-b">{row.title}</td>
              <td className="p-3 border-b">{row.author}</td>
              <td className="p-3 border-b">{row.total_prestamos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}