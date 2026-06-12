---
name: Industrial Efficiency System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#584237'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#8c7164'
  outline-variant: '#e0c0b1'
  surface-tint: '#9d4300'
  primary: '#9d4300'
  on-primary: '#ffffff'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#ffb690'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#505f76'
  on-tertiary: '#ffffff'
  tertiary-container: '#8c9cb4'
  on-tertiary-container: '#243348'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  code:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 24px
  gutter: 16px
---

## Brand & Style
The design system is engineered for a tool marketplace and management environment where reliability and speed are paramount. The brand personality is **utilitarian, precise, and authoritative**, mirroring the heavy-duty equipment it manages. 

The aesthetic follows a **Modern Corporate** approach with **Industrial** undertones. It prioritizes clarity over decoration, utilizing heavy-duty contrast and a structured grid to instill a sense of trust and professional competence. The UI should feel like a high-end dashboard: robust enough for administrative management yet streamlined enough for a fast-paced marketplace.

## Colors
This design system utilizes a high-visibility palette to ensure critical actions and data points are never missed.

- **Primary (Industrial Orange):** Used exclusively for primary Call-to-Actions (CTAs), progress indicators, and active states. It provides an immediate visual focal point against the neutral backdrop.
- **Secondary (Deep Charcoal):** Reserved for headers, navigation backgrounds, and primary text. It provides the "weight" and authority of the system.
- **Neutral (Slate/Gray):** A range of cool grays provides the foundation. The background is a clean `#F8FAFC`, while borders and dividers use a subtle `#E2E8F0` to maintain structure without adding visual noise.
- **Feedback Colors:** Standardized Red and Green are used for status tracking (e.g., "In Stock" vs. "Out of Service").

## Typography
**Inter** is the sole typeface for the design system. Its neutral, systematic nature ensures maximum legibility across dense data tables and technical specifications.

- **Headlines:** Use Semi-Bold (600) or Bold (700) weights with slight negative letter-spacing for a modern, compact look.
- **Labels:** Small labels (like table headers or category tags) should use the `label-md` style: uppercase with increased letter-spacing to improve scannability in dense layouts.
- **Body:** Standard body text uses a 16px base for accessibility, ensuring manual workers and administrators can read technical details comfortably.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid grid**. Management dashboards utilize a fluid 12-column grid to maximize screen real estate, while the marketplace shop views use a centered fixed container (max-width: 1280px).

- **Grid:** 12 columns with 16px gutters for desktop; 4 columns with 16px gutters for mobile.
- **Rhythm:** An 8px linear scale is used for all spacing. Content blocks should be separated by `xl` (32px) increments to maintain a clean, organized hierarchy.
- **Density:** Use tight padding (`sm`) within data tables and form groups, but generous padding (`lg`) within informational cards to prevent the UI from feeling claustrophobic.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows, maintaining the "industrial" feel.

- **Level 0 (Background):** The base canvas (`#F8FAFC`).
- **Level 1 (Cards/Surface):** White surfaces with a 1px solid border (`#E2E8F0`). No shadow is used for static elements.
- **Level 2 (Hover/Active):** When a card is hovered or an element is active, apply a subtle, crisp shadow: `0 4px 6px -1px rgb(0 0 0 / 0.1)`.
- **Navigation:** The top bar or sidebar should use the Secondary (Deep Charcoal) color to ground the application and define the workspace boundary.

## Shapes
The design system uses a **Soft (0.25rem)** roundedness level. This choice strikes a balance between the harshness of industrial equipment and the approachability of modern software.

- **Small Components:** Buttons, inputs, and tags use `0.25rem`.
- **Containers:** Large cards and modals use `0.5rem` (rounded-lg) to soften the layout's larger blocks.
- **Interactive Elements:** Strictly avoid fully rounded pill shapes; keep corners defined to maintain the professional, structured aesthetic.

## Components
Consistent styling of components ensures the marketplace feels unified with the management platform.

- **Buttons:** 
    - *Primary:* Industrial Orange background, White text, Bold.
    - *Secondary:* Deep Charcoal background, White text.
    - *Outline:* 1px Slate border, Charcoal text.
- **Data Tables:** Use a "zebra-stripe" pattern with an ultra-light gray for alternate rows. Headers must be `label-md` with a subtle bottom border.
- **Cards:** White background, 1px border. Product cards in the marketplace should have a fixed-aspect-ratio image slot (4:3) and a clear price/action area at the bottom.
- **Input Fields:** 1px Slate border that shifts to Industrial Orange on focus. Labels sit clearly above the field, never as placeholder-only text.
- **Status Chips:** Small, rectangular badges with low-opacity background tints of the status color (e.g., light green background with dark green text for "Available").
- **Admin Forms:** Group related fields into "sections" using a 1px border and a faint gray header to help users navigate long registration or inventory forms.