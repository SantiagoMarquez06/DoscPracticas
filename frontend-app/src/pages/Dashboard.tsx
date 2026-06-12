import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../services/api"

interface DashboardData {
  ventasTotales: number
  clientesTotales: number
  productos: number
  categorias: number
  productosBajoStock: Array<{ id: number; nombre: string; stock: number }>
  ventasRecientes: Array<{
    id: number
    fecha: string
    total: number
    cliente?: { nombres: string; apellidos: string }
  }>
}

const emptyDashboard: DashboardData = {
  ventasTotales: 0,
  clientesTotales: 0,
  productos: 0,
  categorias: 0,
  productosBajoStock: [],
  ventasRecientes: [],
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData>(emptyDashboard)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    api.get<DashboardData>("/dashboard")
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar dashboard."))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="panel">Cargando dashboard...</div>

  return (
    <div className="stack">
      <div className="page-title">
        <span className="eyebrow">Dashboard Overview</span>
        <h2>Dashboard</h2>
        <p>Real-time performance metrics for ToolForge.</p>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid">
        <article className="stat-card"><span>Productos</span><strong>{data.productos}</strong></article>
        <article className="stat-card"><span>Categorias</span><strong>{data.categorias}</strong></article>
        <article className="stat-card"><span>Clientes</span><strong>{data.clientesTotales}</strong></article>
        <article className="stat-card"><span>Ventas</span><strong>${Number(data.ventasTotales || 0).toFixed(2)}</strong></article>
      </div>

      <div className="admin-quick-nav">
        <Link to="/admin/productos">Productos</Link>
        <Link to="/admin/categorias">Categorias</Link>
        <Link to="/admin/clientes">Clientes</Link>
        <Link to="/admin/ventas">Ventas</Link>
      </div>

      <div className="content-grid">
        <section className="panel">
          <h3>Ventas recientes</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>ID</th><th>Cliente</th><th>Fecha</th><th>Total</th></tr>
              </thead>
              <tbody>
                {data.ventasRecientes.map((venta) => (
                  <tr key={venta.id}>
                    <td>#{venta.id}</td>
                    <td>{venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos}` : "Sin cliente"}</td>
                    <td>{venta.fecha ? new Date(venta.fecha).toLocaleString() : "Sin fecha"}</td>
                    <td>${Number(venta.total || 0).toFixed(2)}</td>
                  </tr>
                ))}
                {data.ventasRecientes.length === 0 && (
                  <tr><td colSpan={4} className="empty-cell">No hay ventas recientes.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h3>Stock bajo</h3>
          <div className="mini-list">
            {data.productosBajoStock.map((producto) => (
              <div className="mini-row" key={producto.id}>
                <span>{producto.nombre}</span>
                <strong>{producto.stock}</strong>
              </div>
            ))}
            {data.productosBajoStock.length === 0 && <p className="muted">No hay alertas de stock.</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
