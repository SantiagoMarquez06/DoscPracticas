import { useEffect, useMemo, useState, type FormEvent } from "react"
import { api } from "../services/api"

interface Categoria {
  id: number
  nombre: string
  descripcion?: string
}

const emptyForm = { nombre: "", descripcion: "" }

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const loadCategorias = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await api.get<Categoria[]>("/categorias")
      setCategorias(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar categorias.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategorias()
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setError("")
    setMessage("")

    try {
      if (editingId) {
        const updated = await api.put<Categoria>(`/categorias/${editingId}`, form)
        setCategorias((current) => current.map((item) => item.id === editingId ? updated : item))
        setMessage("Categoria actualizada.")
      } else {
        const created = await api.post<Categoria>("/categorias", form)
        setCategorias((current) => [...current, created])
        setMessage("Categoria creada.")
      }
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar categoria.")
    } finally {
      setSaving(false)
    }
  }

  const editCategoria = (categoria: Categoria) => {
    setEditingId(categoria.id)
    setForm({ nombre: categoria.nombre, descripcion: categoria.descripcion || "" })
  }

  const deleteCategoria = async (id: number) => {
    if (!window.confirm("Eliminar esta categoria?")) return
    setError("")
    try {
      await api.delete<void>(`/categorias/${id}`)
      setCategorias((current) => current.filter((categoria) => categoria.id !== id))
      setMessage("Categoria eliminada.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar categoria.")
    }
  }

  const filteredCategorias = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return categorias
    return categorias.filter((categoria) => `${categoria.nombre} ${categoria.descripcion || ""}`.toLowerCase().includes(term))
  }, [categorias, search])

  return (
    <div className="stack">
      <div className="page-title">
        <span className="eyebrow">Categories Management</span>
        <h2>Categorias</h2>
        <p>Organize and manage the tool catalog hierarchy.</p>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid compact">
        <article className="stat-card"><span>Total Categories</span><strong>{categorias.length}</strong></article>
        <article className="stat-card"><span>Catalog Status</span><strong>Active</strong></article>
      </div>

      <section className="panel">
        <h3>{editingId ? "Editar categoria" : "Create New Category"}</h3>
        <form className="form-grid columns" onSubmit={handleSubmit}>
          <label>Nombre<input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /></label>
          <label>Descripcion<input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></label>
          <div className="form-actions">
            <button className="button" type="submit" disabled={saving}>{saving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}</button>
            <button className="button ghost" type="button" onClick={resetForm}>Limpiar</button>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="table-toolbar">
          <h3>Listado de categorias</h3>
          <input aria-label="Buscar categorias" placeholder="Search categories..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {loading ? <p>Cargando categorias...</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Nombre</th><th>Descripcion</th><th>Acciones</th></tr></thead>
              <tbody>
                {filteredCategorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>#{categoria.id}</td>
                    <td>{categoria.nombre}</td>
                    <td>{categoria.descripcion || "Sin descripcion"}</td>
                    <td className="row-actions">
                      <button className="button small ghost" type="button" onClick={() => editCategoria(categoria)}>Editar</button>
                      <button className="button small danger" type="button" onClick={() => deleteCategoria(categoria.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {filteredCategorias.length === 0 && <tr><td colSpan={4} className="empty-cell">No hay categorias registradas.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
