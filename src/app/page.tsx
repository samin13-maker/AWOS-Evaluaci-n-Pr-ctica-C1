import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="p-8 max-w-4xl">

      <ul className="space-y-3 text-lg">
        <li>
          <Link href="/reports/most-borrowed" className="hover:underline">
            📚 Libros más prestados
          </Link>
        </li>
        <li>
          <Link href="/reports/overdue-loans" className="hover:underline">
            ⏰ Préstamos vencidos
          </Link>
        </li>
        <li>
          <Link href="/reports/fines-summary" className="hover:underline">
            💰 Resumen de multas
          </Link>
        </li>
        <li>
          <Link href="/reports/member-activity" className="hover:underline">
            👤 Actividad de socios
          </Link>
        </li>
        <li>
          <Link href="/reports/inventory-health" className="hover:underline">
            📦 Salud del inventario
          </Link>
        </li>
      </ul>
    </main>
  );
}