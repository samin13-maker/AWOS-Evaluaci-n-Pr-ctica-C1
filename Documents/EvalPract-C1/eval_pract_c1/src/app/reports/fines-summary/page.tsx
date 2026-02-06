import { query } from "@/lib/db";

export default async function FinesSummaryReport() {
  const data = await query(
    "SELECT * FROM vw_fines_summary"
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1> Resumen de multas</h1>
      <p>Resumen mensual de multas pagadas y pendientes.</p>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Mes</th>
            <th>Pagadas</th>
            <th>Pendientes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.month}</td>
              <td>${row.paid_total}</td>
              <td>${row.pending_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}