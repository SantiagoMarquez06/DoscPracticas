import { useEffect, useMemo, useState, type FormEvent } from "react"
import { api } from "../services/api"

interface Categoria {
  id: number
  nombre: string
}

interface Producto {
  id: number
  nombre: string
  descripcion?: string
  precio: number
  stock: number
  categoriaId?: number | null
  categoria?: Categoria | null
}

const emptyForm = { nombre: "", descripcion: "", precio: "", stock: "0", categoriaId: "" }

export function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [search, setSearch] = useState("")

  const loadData = async () => {
    setLoading(true)
    setError("")
    try {
      const [productosData, categoriasData] = await Promise.all([
        api.get<Producto[]>("/productos"),
        api.get<Categoria[]>("/categorias"),
      ])
      setProductos(Array.isArray(productosData) ? productosData : [])
      setCategorias(Array.isArray(categoriasData) ? categoriasData : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar productos.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
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

    const payload = {
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      stock: Number(form.stock || 0),
      categoriaId: form.categoriaId ? Number(form.categoriaId) : null,
    }

    try {
      if (editingId) {
        const updated = await api.put<Producto>(`/productos/${editingId}`, payload)
        setProductos((current) => current.map((item) => item.id === editingId ? updated : item))
        setMessage("Producto actualizado.")
      } else {
        const created = await api.post<Producto>("/productos", payload)
        setProductos((current) => [...current, created])
        setMessage("Producto creado.")
      }
      resetForm()
      await loadData()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar producto.")
    } finally {
      setSaving(false)
    }
  }

  const editProducto = (producto: Producto) => {
    setEditingId(producto.id)
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precio: String(producto.precio),
      stock: String(producto.stock),
      categoriaId: producto.categoriaId ? String(producto.categoriaId) : "",
    })
  }

  const deleteProducto = async (id: number) => {
    if (!window.confirm("Eliminar este producto?")) return
    setError("")
    try {
      await api.delete<void>(`/productos/${id}`)
      setProductos((current) => current.filter((producto) => producto.id !== id))
      setMessage("Producto eliminado.")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar producto.")
    }
  }

  const filteredProductos = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return productos
    return productos.filter((producto) => {
      const categoria = producto.categoria?.nombre || categorias.find((item) => item.id === producto.categoriaId)?.nombre || ""
      return `${producto.nombre} ${producto.descripcion || ""} ${categoria}`.toLowerCase().includes(term)
    })
  }, [categorias, productos, search])

  const lowStock = productos.filter((producto) => Number(producto.stock) < 10).length
  const inventoryValue = productos.reduce((sum, producto) => sum + Number(producto.precio || 0) * Number(producto.stock || 0), 0)

  return (
    <div className="stack">
      <div className="page-title">
        <span className="eyebrow">Inventory Management</span>
        <h2>Productos</h2>
        <p>Manage and track your tool marketplace stock and pricing.</p>
      </div>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="stats-grid">
        <article className="stat-card"><span>Total Items</span><strong>{productos.length}</strong></article>
        <article className="stat-card"><span>Low Stock</span><strong>{lowStock}</strong></article>
        <article className="stat-card"><span>Categories</span><strong>{categorias.length}</strong></article>
        <article className="stat-card"><span>Inventory Value</span><strong>${inventoryValue.toFixed(2)}</strong></article>
      </div>

      <section className="product-form-grid">
        <form className="form-card wide" onSubmit={handleSubmit}>
          <h3>Core Information</h3>
          <label>Product Name<input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /></label>
          <label>Description<textarea rows={5} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} /></label>
        </form>

        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Inventory & Pricing</h3>
          <label>Unit Price<input type="number" min="0" step="0.01" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} required /></label>
          <label>Stock Quantity<input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></label>
          <label>Category
            <select value={form.categoriaId} onChange={(e) => setForm({ ...form, categoriaId: e.target.value })}>
              <option value="">Sin categoria</option>
              {categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
            </select>
          </label>
          <div className="form-actions">
            <button className="button" type="submit" disabled={saving}>{saving ? "Guardando..." : editingId ? "Save Product" : "Add New Tool"}</button>
            <button className="button ghost" type="button" onClick={resetForm}>Discard Changes</button>
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="table-toolbar">
          <h3>Listado de productos</h3>
          <input aria-label="Buscar productos" placeholder="Search by tool name or category..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        {loading ? <p>Cargando productos...</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Producto</th><th>Precio</th><th>Stock</th><th>Categoria</th><th>Acciones</th></tr></thead>
              <tbody>
                {filteredProductos.map((producto) => (
                  <tr key={producto.id}>
                    <td>#{producto.id}</td>
                    <td><strong>{producto.nombre}</strong><span>{producto.descripcion || "Sin descripcion"}</span></td>
                    <td>${Number(producto.precio || 0).toFixed(2)}</td>
                    <td>{producto.stock}</td>
                    <td>{producto.categoria?.nombre || categorias.find((c) => c.id === producto.categoriaId)?.nombre || "Sin categoria"}</td>
                    <td className="row-actions">
                      <button className="button small ghost" type="button" onClick={() => editProducto(producto)}>Editar</button>
                      <button className="button small danger" type="button" onClick={() => deleteProducto(producto.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
                {filteredProductos.length === 0 && <tr><td colSpan={6} className="empty-cell">No hay productos registrados.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
