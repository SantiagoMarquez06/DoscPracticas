# Neon Protocol - Design System para Frontend

Implementación del diseño cyberpunk **Stitch Cyber Terminal Interface** en tu React app.

## Instalación

### 1. Importa los estilos en tu App principal

En `src/App.tsx` o `src/main.tsx`:

```typescript
import './styles/neon-protocol.css'
```

### 2. Importa los componentes

```typescript
import {
  NeonCard,
  NeonButton,
  NeonHeader,
  NeonStatusTag,
  NeonProgressBar,
  NeonInput,
} from './components/NeonProtocol'
```

### 3. Usa los componentes

```tsx
<NeonCard title="0x01_STAT" variant="primary">
  <div className="headline-md text-primary-fixed-dim">1,234</div>
  <div className="text-[10px] mt-2 text-on-surface-variant">+5% vs prev</div>
</NeonCard>

<NeonButton variant="primary">SUBMIT_DATA</NeonButton>

<NeonStatusTag status="verified">VERIFIED</NeonStatusTag>

<NeonProgressBar value={65} color="primary" />

<NeonHeader 
  title="Dashboard_v2" 
  subtitle="Last update: 2024.10.27"
/>

<NeonInput label="Username" placeholder="ENTER_USERNAME..." />
```

## Componentes Disponibles

### NeonCard
Contenedor base para tarjetas cyberpunk.

**Props:**
- `title?: string` - Etiqueta superior (hex code style)
- `variant?: 'default' | 'primary' | 'success' | 'error'` - Color del borde
- `children: React.ReactNode` - Contenido
- `className?: string` - Clases CSS adicionales

### NeonButton
Botón con estilo cyberpunk.

**Props:**
- `variant?: 'primary' | 'secondary' | 'danger'` - Estilo
- `size?: 'sm' | 'md' | 'lg'` - Tamaño
- `children: React.ReactNode` - Texto del botón
- `...props` - Props estándar de HTML button

### NeonHeader
Encabezado con icono y subtítulo.

**Props:**
- `title: string` - Título principal
- `subtitle?: string` - Subtítulo (ej: timestamp)
- `icon?: React.ReactNode` - Icono opcional

### NeonStatusTag
Etiqueta de estado pequeña.

**Props:**
- `status: 'verified' | 'pending' | 'critical' | 'warning' | 'active'`
- `children: React.ReactNode` - Texto

### NeonProgressBar
Barra de progreso con glow.

**Props:**
- `value: number` - Valor 0-100
- `color?: 'primary' | 'secondary' | 'error'`
- `className?: string` - Clases adicionales

### NeonInput
Input con prefijo `>` (prompt style).

**Props:**
- `label?: string` - Etiqueta
- `...props` - Props estándar de HTML input

## Clases CSS Disponibles

Puedes combinar clases para customizar:

### Tipografía
- `.headline-lg` - Título grande (32px, bold)
- `.headline-md` - Título medio (24px, bold)
- `.body-lg` - Cuerpo grande (16px)
- `.body-md` - Cuerpo medio (14px)
- `.label-sm` - Etiqueta pequeña (12px)
- `.code-snippet` - Código/terminal (13px)

### Colores
- `.text-primary` / `.text-primary-fixed-dim`
- `.text-secondary-fixed`
- `.text-error`
- `.text-outline`
- `.bg-surface` / `.bg-surface-container-low`
- `.border-primary-fixed-dim`

### Efectos
- `.glitch-hover` - Glow en hover
- `.glow-primary` / `.glow-secondary` - Text glow
- `.ascii-border` - Border básico

## Variables CSS

Todas las variables están definidas en `:root`:

```css
--primary-fixed-dim: #00dbe7;      /* Electric Blue */
--secondary-fixed: #79ff5b;         /* Neon Green */
--error: #ffb4ab;                   /* Cyber Pink */
--surface: #131313;                 /* Deep Black */
--surface-container-low: #1c1b1b;   /* Dark Gray */
```

Puedes sobrescribir variables en cualquier sección:

```css
.my-section {
  --primary-fixed-dim: #ff00ff;
}
```

## Ejemplo Completo

Ver `NeonProtocolDemo.tsx` para un dashboard funcional con todos los componentes.

## Paleta de Colores (Neon Protocol)

| Nombre | Hex | Uso |
|--------|-----|-----|
| Primary | #00dbe7 | Focus, active, data |
| Secondary | #79ff5b | Success, secondary nav |
| Error | #ffb4ab | Warnings, alerts |
| Surface | #131313 | Background |
| Surface-Low | #1c1b1b | Containers |
| On-Surface | #e5e2e1 | Texto principal |

## Tailwind CSS

Si usas Tailwind en tu proyecto, puedes agregar estas clases al `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      'primary-fixed-dim': '#00dbe7',
      'secondary-fixed': '#79ff5b',
      'surface': '#131313',
      // ... más colores
    },
    fontFamily: {
      'mono': ['JetBrains Mono', 'monospace'],
    },
  },
}
```

## Tips

1. **Mantén la densidad alta**: El diseño está pensado para mostrar mucha información.
2. **Usa UPPERCASE para labels**: Mantiene la autenticidad cyberpunk.
3. **Agregá `code-snippet` a datos numéricos**: Simula output de terminal.
4. **Combina variantes**: Un card puede tener borde primario pero contenido en verde.

## Recursos

- **Design System**: `stitch_cyber_terminal_interface/neon_protocol/DESIGN.md`
- **Ejemplos HTML**: `stitch_cyber_terminal_interface/*/code.html`
