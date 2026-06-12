import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "D" },
  { to: "/admin/productos", label: "Productos", icon: "P" },
  { to: "/admin/categorias", label: "Categorias", icon: "C" },
  { to: "/admin/clientes", label: "Clientes", icon: "U" },
  { to: "/admin/ventas", label: "Ventas", icon: "V" },
]

export function Layout() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login", { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand-block">
          <span className="brand-mark">TF</span>
          <div>
            <strong>ToolForge</strong>
            <small>Management Suite</small>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Navegacion administrativa">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="button sidebar-action" type="button" onClick={() => navigate("/admin/productos")}>
            Nuevo producto
          </button>
          <button className="nav-link logout-link" type="button" onClick={handleLogout}>
            <span className="nav-icon" aria-hidden="true">S</span>
            Cerrar sesion
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="eyebrow">Admin Console</span>
            <h1>ToolForge Operations</h1>
          </div>
          <div className="topbar-actions">
            <span className="user-pill">{user?.email || "Sesion activa"}</span>
            <button className="button secondary" type="button" onClick={handleLogout}>
              Cerrar sesion
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
