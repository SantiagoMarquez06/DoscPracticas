import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      navigate("/admin", { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales incorrectas.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <Link className="public-brand login-brand" to="/">
        <span className="brand-mark">TF</span>
        ToolForge
      </Link>

      <section className="login-panel">
        <div className="login-icon" aria-hidden="true">B</div>
        <span className="eyebrow">Admin Console Management Suite</span>
        <h1>Sign In</h1>
        <p>Acceso restringido para gestionar inventario, clientes y ventas.</p>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Email Address
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <div className="field-with-action">
            <label htmlFor="password">Password</label>
            <div className="input-action">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button type="button" onClick={() => setShowPassword((current) => !current)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <div className="alert error">{error}</div>}

          <button className="button" type="submit" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
        <p className="login-note">This terminal is monitored for security purposes.</p>
      </section>
    </div>
  )
}
