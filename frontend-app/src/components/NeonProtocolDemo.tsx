import React from 'react';
import {
  NeonCard,
  NeonButton,
  NeonHeader,
  NeonStatusTag,
  NeonProgressBar,
  NeonInput,
} from './NeonProtocol';
import '../styles/neon-protocol.css';

export const NeonProtocolDemo: React.FC = () => {
  return (
    <main className="bg-surface text-on-surface min-h-screen p-6">
      {/* Header */}
      <NeonHeader
        title="System_Dashboard_v2"
        subtitle="Last Kernel Update: 2024.10.27 // 09:42:11 UTC"
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <NeonCard title="0x01_TOTAL_PROD" variant="primary">
          <div className="headline-md text-primary-fixed-dim">14,209</div>
          <div className="text-[10px] mt-2 text-on-secondary-fixed-variant">
            +12.5% vs PREV_CYCLE
          </div>
        </NeonCard>

        <NeonCard title="0x02_LOW_STOCK" variant="success">
          <div className="headline-md text-secondary-fixed">42</div>
          <div className="text-[10px] mt-2 text-secondary-fixed-dim">
            REQUIRES_REPLENISHMENT
          </div>
        </NeonCard>

        <NeonCard title="0x03_DAILY_TX" variant="primary">
          <div className="headline-md text-primary-fixed-dim">184</div>
          <div className="text-[10px] mt-2 text-on-surface-variant">
            NODE_VOLUME: OPTIMAL
          </div>
        </NeonCard>

        <NeonCard title="0x04_NET_REV" variant="primary">
          <div className="headline-md text-primary-fixed-dim">¤ 1.2M</div>
          <div className="text-[10px] mt-2 text-primary-fixed-dim tracking-widest">
            <NeonProgressBar value={65} />
          </div>
        </NeonCard>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Sales Table */}
        <div className="lg:col-span-2 ascii-border bg-surface-container-low">
          <div className="border-b border-outline-variant p-3 flex justify-between items-center bg-surface-container">
            <span className="code-snippet text-[12px] uppercase text-primary">
              Recent_Sales_Ledger
            </span>
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-primary-fixed-dim/20" />
              <span className="w-3 h-3 bg-primary-fixed-dim/40" />
              <span className="w-3 h-3 bg-primary-fixed-dim" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left code-snippet text-[12px]">
              <thead>
                <tr className="border-b border-outline-variant bg-surface-container-lowest">
                  <th className="p-3 text-outline">TX_ID</th>
                  <th className="p-3 text-outline">TIMESTAMP</th>
                  <th className="p-3 text-outline">CLIENT_HANDLE</th>
                  <th className="p-3 text-outline text-right">CREDITS</th>
                  <th className="p-3 text-outline text-center">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: '#FF-0192',
                    time: '09:41:22',
                    client: 'CYBERDYNE_SYS',
                    credits: '¤ 4,200.00',
                    status: 'verified' as const,
                  },
                  {
                    id: '#FF-0191',
                    time: '09:38:10',
                    client: 'TYRELL_CORP',
                    credits: '¤ 12,850.50',
                    status: 'verified' as const,
                  },
                  {
                    id: '#FF-0190',
                    time: '09:12:45',
                    client: 'RE_WEYLAND',
                    credits: '¤ 820.00',
                    status: 'verified' as const,
                  },
                  {
                    id: '#FF-0189',
                    time: '08:55:01',
                    client: 'ZION_NODE_4',
                    credits: '¤ 2,150.00',
                    status: 'pending' as const,
                  },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-outline-variant hover:bg-primary/5">
                    <td className="p-3 text-primary-fixed-dim">{row.id}</td>
                    <td className="p-3">{row.time}</td>
                    <td className="p-3">{row.client}</td>
                    <td className="p-3 text-right">{row.credits}</td>
                    <td className="p-3 text-center">
                      <NeonStatusTag status={row.status}>
                        {row.status.toUpperCase()}
                      </NeonStatusTag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="ascii-border bg-surface-container-low">
          <div className="border-b border-outline-variant p-3 bg-surface-container">
            <span className="code-snippet text-[12px] uppercase text-error">
              Critical_Stock_Alerts
            </span>
          </div>
          <div className="p-4 space-y-4">
            <div className="border-l-2 border-error pl-3">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-error font-bold">CRITICAL_01</span>
                <span className="text-on-surface-variant">QTY: 02</span>
              </div>
              <div className="text-[13px] font-bold">NEURAL_LINK_MODULE_V4</div>
              <NeonProgressBar value={10} color="error" />
            </div>
            <NeonButton variant="secondary" size="sm" className="w-full mt-4">
              GENERATE_REQUISITION_ORDER
            </NeonButton>
          </div>
        </div>
      </div>

      {/* Input Example */}
      <div className="mb-8 p-6 ascii-border bg-surface-container-low">
        <h2 className="headline-md text-primary-fixed-dim mb-4 uppercase">
          Formulario Ejemplo
        </h2>
        <div className="space-y-4">
          <NeonInput label="Usuario" placeholder="ENTER_USERNAME..." />
          <NeonInput label="Email" type="email" placeholder="ENTER_EMAIL..." />
          <div className="flex gap-4">
            <NeonButton variant="primary" className="flex-1">
              SUBMIT_DATA
            </NeonButton>
            <NeonButton variant="danger" className="flex-1">
              CANCEL
            </NeonButton>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="ascii-border p-4 bg-surface-container-lowest code-snippet text-[10px] text-outline flex items-center gap-4 flex-wrap">
        <span className="text-primary-fixed-dim animate-pulse">● SYS_READY</span>
        <span className="hidden md:inline">| NODE: ORBITAL_STATION_ALPHA</span>
        <span className="hidden md:inline">| LATENCY: 14MS</span>
        <span className="hidden md:inline">| LOAD: 12.4%</span>
        <span className="ml-auto">ENCRYPTION: AES-256-GCM [ACTIVE]</span>
      </div>
    </main>
  );
};
