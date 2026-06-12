import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/PrivateRoute"
import { Layout } from "./components/Layout"
import { Login } from "./components/Login"
import { LandingPage } from "./pages/LandingPage"
import { Productos } from "./pages/Productos"
import { Clientes } from "./pages/Clientes"
import { Ventas } from "./pages/Ventas"
import { Categorias } from "./pages/Categorias"
import { Dashboard } from "./pages/Dashboard"
import "./styles/app.css"

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark"
    document.documentElement.classList.remove("theme-dark", "theme-light")
    document.documentElement.classList.add(theme === "dark" ? "theme-dark" : "theme-light")
  }, [])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="productos" element={<Productos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="categorias" element={<Categorias />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
