/**
 * VIEW: vw_member_activity
 * ---------------------------------------------------------
 * Descripción: 
 * Muestra la actividad de los socios de la biblioteca, incluyendo 
 * número total de préstamos, préstamos atrasados y tasa de atraso.
 * * Granularidad (grain): Un registro por socio (member_id).
 * * Métricas:
 * - total_prestamos: total de préstamos realizados
 * - prestamos_atrasados: número de préstamos vencidos
 * - tasa_atraso: proporción de préstamos atrasados respecto al total
 * * Campos calculados: tasa_atraso (división), COALESCE para evitar nulos
 * Técnicas SQL: Uso de HAVING para actividad, CASE/COALESCE en cálculos
 * * Uso esperado: Identificar socios activos y evaluar cumplimiento.
 * * VERIFY:
 * 1. SELECT * FROM vw_member_activity ORDER BY total_prestamos DESC;
 * 2. SELECT * FROM vw_member_activity WHERE tasa_atraso > 0;
 */


export const dynamic = "force-dynamic";
import { query } from "@/lib/db";

type MemberActivityRow = {
  member_id: number;
  name: string;
  total_prestamos: number;
  prestamos_atrasados: number;
  tasa_atraso: number;
};

export default async function MemberActivityReport() {
  const data = await query(
    "SELECT * FROM vw_member_activity ORDER BY total_prestamos DESC"
  );

  const moroso = (data as MemberActivityRow[]).reduce(
    (prev, curr) =>
      Number(curr.tasa_atraso) > Number(prev.tasa_atraso) ? curr : prev,
    (data as MemberActivityRow[])[0]
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Actividad de socios</h1>
      <p>Muestra la actividad de los socios, el total de préstamos realizados y su nivel de atraso en devoluciones. </p>
      {moroso && (
        <p>
          <strong>KPI – Socio con mayor tasa de atraso: </strong>
          {moroso.name} ({Number(moroso.tasa_atraso).toFixed(2)}%)
        </p>
      )}

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">Socio</th>
            <th className="p-3 text-left border-b">Total préstamos</th>
            <th className="p-3 text-left border-b">Atrasados</th>
            <th className="p-3 text-left border-b">Tasa atraso (%)</th>
          </tr>
        </thead>

        <tbody>
          {(data as MemberActivityRow[]).map((row, i) => (
            <tr key={i}>
              <td className="p-3 border-b">{row.name}</td>
              <td className="p-3 border-b">{row.total_prestamos}</td>
              <td className="p-3 border-b">{row.prestamos_atrasados}</td>
              <td className="p-3 border-b">
                {Number(row.tasa_atraso).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}