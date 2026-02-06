import { query } from "@/lib/db";

export default async function InventoryHealthReport() {
  const data = await query(
    "SELECT * FROM vw_inventory_health"
  );

  return (
    <main style={{ padding: "2rem" }}>
      <h1> Salud del inventario</h1>
      <p>Estado del inventario por categoría.</p>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Disponibles</th>
            <th>Prestados</th>
            <th>Perdidos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.category}</td>
              <td>{row.disponibles}</td>
              <td>{row.prestados}</td>
              <td>{row.perdidos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}