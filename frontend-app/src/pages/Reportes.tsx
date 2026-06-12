import { useState, useEffect } from "react"
import { NeonCard, NeonHeader } from "../components/NeonProtocol"

export function Reportes() {
  const [estadisticas, setEstadisticas] = useState({
    ventasTotales: 0,
    clientesTotales: 0,
    productos: 0,
    categorias: 0,
    productosBajoStock: [] as any[],
    ventasRecientes: [] as any[]
  })

  const fetchDashboard = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      })
      if (!response.ok) return;
      const data = await response.json()
      setEstadisticas(data)
    } catch (error) {
      console.log("Error cargando reportes")
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  return (
    <div className="bg-surface text-on-surface">
      <NeonHeader
        title="System_Reports"
        subtitle="ANALYTICS_ENGINE_V1.0 // ADVANCED_METRICS"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <NeonCard title="0x01_CRITICAL_STOCK_ALERTS" variant="primary">
          <div className="p-2 space-y-4">
            {estadisticas.productosBajoStock && estadisticas.productosBajoStock.map((prod, i) => (
              <div key={prod.id || i} className={`border-l-2 ${prod.stock === 0 ? 'border-error' : 'border-secondary-fixed-dim'} pl-3`}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className={`${prod.stock === 0 ? 'text-error' : 'text-secondary-fixed'} font-bold`}>
                    {prod.stock === 0 ? 'CRITICAL' : 'WARNING'}
                  </span>
                  <span className="text-on-surface-variant">QTY: {prod.stock.toString().padStart(2, '0')}</span>
                </div>
                <div className="text-[13px] font-bold uppercase">{prod.nombre}</div>
                <div className="w-full bg-surface-container-highest h-1.5 mt-2 overflow-hidden">
                  <div className={`${prod.stock === 0 ? 'bg-error' : 'bg-secondary-fixed-dim'} h-full transition-all`} style={{ width: `${Math.min(Math.max(prod.stock * 10, 5), 100)}%` }}></div>
                </div>
              </div>
            ))}
            {(!estadisticas.productosBajoStock || estadisticas.productosBajoStock.length === 0) && (
              <div className="text-center text-on-surface-variant italic p-4 text-[11px]">ALL_SYSTEMS_OPTIMAL<br/>NO_STOCK_ALERTS</div>
            )}
            <button className="w-full mt-4 py-2 text-center text-[11px] border border-outline-variant hover:bg-outline-variant transition-colors text-on-surface-variant">
              GENERATE_REQUISITION_ORDER
            </button>
          </div>
        </NeonCard>

        <NeonCard title="0x02_RECENT_SALES_LEDGER" variant="primary">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-code-snippet text-[12px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-lowest">
                  <th className="p-3 text-outline">TX_ID</th>
                  <th className="p-3 text-outline">TIMESTAMP</th>
                  <th className="p-3 text-outline">CLIENT_HANDLE</th>
                  <th className="p-3 text-outline text-right">CREDITS</th>
                </tr>
              </thead>
              <tbody>
                {estadisticas.ventasRecientes && estadisticas.ventasRecientes.map((venta, i) => (
                  <tr key={venta.id || i} className="border-b border-outline-variant hover:bg-primary/5">
                    <td className="p-3 text-primary-fixed-dim">#{venta.id}</td>
                    <td className="p-3">{new Date(venta.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="p-3">{venta.cliente ? `${venta.cliente.nombres} ${venta.cliente.apellidos}` : 'DESCONOCIDO'}</td>
                    <td className="p-3 text-right">¤ {Number(venta.total).toFixed(2)}</td>
                  </tr>
                ))}
                {(!estadisticas.ventasRecientes || estadisticas.ventasRecientes.length === 0) && (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-on-surface-variant italic text-[11px]">NO_RECENT_TRANSACTIONS</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </NeonCard>
      </div>
    </div>
  )
}
