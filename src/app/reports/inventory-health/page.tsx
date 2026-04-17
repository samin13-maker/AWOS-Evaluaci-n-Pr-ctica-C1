/**
 * VIEW: vw_inventory_health
 * ---------------------------------------------------------
 * Descripción: 
 * Muestra el estado del inventario de libros agrupado por categoría, 
 * indicando cuántas copias están disponibles, prestadas o perdidas.
 * * Granularidad (grain): Un registro por categoría (category).
 * * Métricas:
 * - disponibles: número de copias disponibles
 * - prestados: número de copias actualmente prestadas
 * - perdidos: número de copias marcadas como perdidas
 * * Campos calculados: Clasificación del estado de cada copia usando CASE, COALESCE
 * Técnicas SQL: GROUP BY por categoría, Uso de CASE para clasificación
 * * Uso esperado: Evaluación de la salud del inventario y detección de pérdidas.
 * * VERIFY:
 * 1. SELECT * FROM vw_inventory_health;
 * 2. SELECT category, perdidos FROM vw_inventory_health ORDER BY perdidos DESC;
 */

export const dynamic = "force-dynamic";
import { query } from "@/lib/db";

type InventoryHealthRow = {
  category: string;
  disponibles: number;
  prestados: number;
  perdidos: number;
};

export default async function InventoryHealthReport() {
  const data = await query("SELECT * FROM vw_inventory_health ORDER BY category");

  const totalPerdidos = (data as InventoryHealthRow[]).reduce(
    (acc, row) => acc + Number(row.perdidos),
    0
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Salud del inventario</h1>
      <p>Se divide por 3 categorías: Disponibles, Prestados y Perdidos</p>

      <p>
        <strong>KPI – Total de copias perdidas en el sistema: {totalPerdidos}</strong>
      </p>

      <table className="w-full mt-6 border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left border-b">Categoría</th>
            <th className="p-3 text-left border-b">Disponibles</th>
            <th className="p-3 text-left border-b">Prestados</th>
            <th className="p-3 text-left border-b">Perdidos</th>
          </tr>
        </thead>

        <tbody>
          {(data as InventoryHealthRow[]).map((row, i) => (
            <tr key={i}>
              <td className="p-3 border-b">{row.category}</td>
              <td className="p-3 border-b">{row.disponibles}</td>
              <td className="p-3 border-b">{row.prestados}</td>
              <td className="p-3 border-b">{row.perdidos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}