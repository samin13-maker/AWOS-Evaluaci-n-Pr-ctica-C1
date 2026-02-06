import Link from "next/link";

export default function Dashboard() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Library Reports Dashboard</h1>
      <p>Reportes generados desde VIEWS en PostgreSQL</p>

      <ul>
        <li><Link href="/reports/most-borrowed"> Libros más prestados</Link></li>
        <li><Link href="/reports/overdue-loans"> Préstamos vencidos</Link></li>
        <li><Link href="/reports/fines-summary"> Resumen de multas</Link></li>
        <li><Link href="/reports/member-activity"> Actividad de socios</Link></li>
        <li><Link href="/reports/inventory-health"> Salud del inventario</Link></li>
      </ul>
    </main>
  );
}