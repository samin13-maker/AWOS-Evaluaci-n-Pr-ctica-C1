import { query } from "@/lib/db";

export default async function MemberActivityReport() {
  const data = await query(
    "SELECT * FROM vw_member_activity"
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1> Actividad de socios</h1>
      <p>Socios activos y su tasa de atraso.</p>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Socio</th>
            <th>Total préstamos</th>
            <th>Atrasados</th>
            <th>Tasa atraso (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.name}</td>
              <td>{row.total_prestamos}</td>
              <td>{row.prestamos_atrasados}</td>
              <td>{row.tasa_atraso}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}