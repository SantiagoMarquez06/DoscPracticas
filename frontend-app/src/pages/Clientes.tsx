import { useEffect, useMemo, useState } from "react"
import { api } from "../services/api"

interface Cliente {
  id: number
  identificacion: string
  nombres: string
  apellidos: string
  email: string
  telefono: string
  direccion: string
}

export function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    api.get<Cliente[]>("/clientes")
      .then((data) => setClientes(Array.isArray(data) ? data : []))
      .catch((err) => setError(err instanceof Error ? err.message : "Error al cargar clientes."))
      .finally(() => setLoading(false))
  }, [])

  const filteredClientes = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return clientes
    return clientes.filter((cliente) => (
      `${cliente.nombres} ${cliente.apellidos} ${cliente.identificacion} ${cliente.email} ${cliente.telefono}`
        .toLowerCase()
        .includes(term)
    ))
  }, [clientes, search])

  return (
    <div className="stack">
      <div className="page-title">
        <span className="eyebrow">Customers</span>
        <h2>Clientes</h2>
        <p>Monitor and manage your ToolForge client relations.</p>
      </div>

      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid compact">
        <article className="stat-card"><span>Total Users</span><strong>{clientes.length}</strong></article>
        <article className="stat-card"><span>Contactos con email</span><strong>{clientes.filter((cliente) => cliente.email).length}</strong></article>
      </div>

      <section className="panel">
        <div className="table-toolbar">
          <h3>Listado de clientes</h3>
          <input aria-label="Buscar clientes" placeholder="Search customers..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {loading ? <p>Cargando clientes...</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Cliente</th><th>Identificacion</th><th>Email</th><th>Telefono</th><th>Direccion</th></tr></thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>#{cliente.id}</td>
                    <td>{cliente.nombres} {cliente.apellidos}</td>
                    <td>{cliente.identificacion}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.direccion}</td>
                  </tr>
                ))}
                {filteredClientes.length === 0 && <tr><td colSpan={6} className="empty-cell">No hay clientes registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
