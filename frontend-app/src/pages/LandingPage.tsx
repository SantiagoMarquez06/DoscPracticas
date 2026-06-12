import { Link } from "react-router-dom"

const features = [
  { title: "Durability", text: "Herramientas forjadas para resistir las condiciones mas exigentes." },
  { title: "Fast Shipping", text: "Inventario conectado para que la operacion no se detenga." },
  { title: "Expert Support", text: "Datos de categorias, clientes y ventas listos para tomar decisiones." },
]

const categories = [
  { name: "Power Tools", span: "wide" },
  { name: "Hand Tools", span: "" },
  { name: "Measurement", span: "" },
  { name: "Safety Gear", span: "" },
  { name: "Workshop Essentials", span: "wide" },
]

export function LandingPage() {
  return (
    <div className="public-page">
      <header className="public-nav">
        <Link className="public-brand" to="/">
          <span className="brand-mark">TF</span>
          ToolForge
        </Link>
        <nav className="public-links">
          <a href="#features">Solutions</a>
          <a href="#categories">Catalogo</a>
          <a href="#contact">Contacto</a>
        </nav>
        <Link className="button small" to="/login">Ingresar</Link>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Industrial Tool Marketplace</span>
          <h1>Potencia tu trabajo con ToolForge</h1>
          <p>
            Las mejores herramientas industriales en un solo lugar. Calidad
            profesional y un panel administrativo conectado al backend real.
          </p>
          <div className="hero-actions">
            <a className="button hero-cta" href="#categories">Explorar herramientas</a>
            <Link className="button ghost hero-cta" to="/login">Ver consola</Link>
          </div>
        </div>
        <div className="hero-workshop" aria-hidden="true">
          <div className="beam beam-one" />
          <div className="beam beam-two" />
          <div className="tool-silhouette drill" />
          <div className="tool-silhouette wrench" />
          <div className="tool-silhouette gauge" />
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <span className="eyebrow">Caracteristicas</span>
          <h2>Precision industrial para administrar la tienda</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="info-card" key={feature.title}>
              <span className="check-icon">+</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section muted-section" id="categories">
        <div className="section-heading">
          <span className="eyebrow">Categorias</span>
          <h2>Categorias principales</h2>
        </div>
        <div className="category-bento">
          {categories.map((category) => (
            <article className={`category-tile ${category.span}`} key={category.name}>
              <span>{category.name}</span>
              <Link to="/login">Explorar seleccion</Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="public-footer" id="contact">
        <strong>ToolForge</strong>
        <span>Frontend React + Backend Node servido por el mismo dominio bajo /api.</span>
      </footer>
    </div>
  )
}
