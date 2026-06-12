import { useEffect, useMemo, useState } from "react"
import { api } from "../services/api"

interface Venta {
  id: number
  fecha: string
  total: number
  cliente?: { nombres: string; apellidos: string; email?: string }
  detalles?: Array<{
    id: number
    cantidad: number
    precioUnitario: number
    subtotal: number
    producto?: { nombre: string }
  }>
}

export function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get<Venta[]>("/ventas")
      .then((data) => setVentas(Array.isArray(data) ? data : []))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar ventas."))
      .finally(() => setLoading(false))
  }, [])

  const filteredVentas = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return ventas
    return ventas.filter((venta) => {
      const cliente = venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos} ${venta.cliente.email || ""}` : ""
      const detalles = (venta.detalles || []).map((detalle) => detalle.producto?.nombre || "").join(" ")
      return `${venta.id} ${cliente} ${detalles}`.toLowerCase().includes(term)
    })
  }, [search, ventas])

  const totalVentas = ventas.reduce((sum, venta) => sum + Number(venta.total || 0), 0)

  return (
    <div className="stack">
      <div className="page-title">
        <span className="eyebrow">Sales History</span>
        <h2>Ventas</h2>
        <p>Review all historical transaction data across the marketplace.</p>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid compact">
        <article className="stat-card"><span>Total Transactions</span><strong>{ventas.length}</strong></article>
        <article className="stat-card"><span>Total Revenue</span><strong>${totalVentas.toFixed(2)}</strong></article>
      </div>

      <section className="panel">
        <div className="table-toolbar">
          <h3>Listado de ventas</h3>
          <input aria-label="Buscar ventas" placeholder="Search orders..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {loading ? <p>Cargando ventas...</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Cliente</th><th>Detalle</th><th>Fecha</th><th>Total</th></tr></thead>
              <tbody>
                {filteredVentas.map((venta) => (
                  <tr key={venta.id}>
                    <td>#{venta.id}</td>
                    <td>{venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos}` : "Sin cliente"}</td>
                    <td>
                      {(venta.detalles || []).map((detalle) => (
                        <span className="line-item" key={detalle.id}>
                          {detalle.producto?.nombre || "Producto"} x{detalle.cantidad}
                        </span>
                      ))}
                      {(!venta.detalles || venta.detalles.length === 0) && "Sin detalle"}
                    </td>
                    <td>{venta.fecha ? new Date(venta.fecha).toLocaleString() : "Sin fecha"}</td>
                    <td>${Number(venta.total || 0).toFixed(2)}</td>
                  </tr>
                ))}
                {filteredVentas.length === 0 && <tr><td colSpan={5} className="empty-cell">No hay ventas registradas.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
