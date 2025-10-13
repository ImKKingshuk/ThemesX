# API Reference

Complete API documentation for ThemesX.

## Table of Contents

- [ThemeProvider](#themeprovider)
- [useTheme Hook](#usetheme-hook)
- [Types](#types)
- [Utility Functions](#utility-functions)
- [Presets](#presets)

---

## ThemeProvider

The main provider component that wraps your application.

### Props

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  enableSystemTheme?: boolean;
  defaultTheme?: ThemeMode;
  config?: ThemeConfig;
  attribute?: "class" | "data-theme" | "data-mode";
  disableStorage?: boolean;
  enableSSR?: boolean;
  nonce?: string;
}
```

#### `children`
- **Type:** `React.ReactNode`
- **Required:** Yes
- **Description:** Your application components

#### `enableSystemTheme`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable automatic system theme detection

**Example:**
```tsx
<ThemeProvider enableSystemTheme={false}>
  <App />
</ThemeProvider>
```

#### `defaultTheme`
- **Type:** `'light' | 'dark' | 'system'`
- **Default:** `'system'`
- **Description:** Initial theme mode

**Example:**
```tsx
<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

#### `config`
- **Type:** `ThemeConfig`
- **Default:** `{}`
- **Description:** Theme configuration object

**Example:**
```tsx
const config = {
  light: { background: '#fff' },
  dark: { background: '#000' },
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

#### `attribute`
- **Type:** `'class' | 'data-theme' | 'data-mode'`
- **Default:** `'data-theme'`
- **Description:** HTML attribute to use for theme

**Example:**
```tsx
<ThemeProvider attribute="class">
  <App />
</ThemeProvider>
// Result: <html class="dark">
```

#### `disableStorage`
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Disable localStorage persistence

**Example:**
```tsx
<ThemeProvider disableStorage={true}>
  <App />
</ThemeProvider>
```

#### `enableSSR`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Enable SSR support (prevents FOUC)

**Example:**
```tsx
<ThemeProvider enableSSR={true}>
  <App />
</ThemeProvider>
```

#### `nonce`
- **Type:** `string`
- **Default:** `undefined`
- **Description:** CSP nonce for inline styles

**Example:**
```tsx
<ThemeProvider nonce="random-nonce-value">
  <App />
</ThemeProvider>
```

---

## useTheme Hook

Hook to access and control theme state.

### Return Type

```typescript
interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  variant?: string;
  setVariant?: (variant: string) => void;
  resolvedTheme: "light" | "dark";
  systemTheme: "light" | "dark";
  themes: string[];
  refreshTheme: () => void;
}
```

### Properties

#### `theme`
- **Type:** `'light' | 'dark' | 'system'`
- **Description:** Current theme mode

**Example:**
```tsx
const { theme } = useTheme();
console.log(theme); // 'dark'
```

#### `setTheme`
- **Type:** `(theme: ThemeMode) => void`
- **Description:** Function to change theme mode

**Example:**
```tsx
const { setTheme } = useTheme();
setTheme('dark');
```

#### `variant`
- **Type:** `string | undefined`
- **Description:** Current theme variant (if using variants)

**Example:**
```tsx
const { variant } = useTheme();
console.log(variant); // 'amoled'
```

#### `setVariant`
- **Type:** `((variant: string) => void) | undefined`
- **Description:** Function to change theme variant (only available when using variants)

**Example:**
```tsx
const { setVariant } = useTheme();
if (setVariant) {
  setVariant('amoled');
}
```

#### `resolvedTheme`
- **Type:** `'light' | 'dark'`
- **Description:** Actual theme being displayed (system resolved to light/dark)

**Example:**
```tsx
const { theme, resolvedTheme } = useTheme();
// theme: 'system'
// resolvedTheme: 'dark' (based on OS preference)
```

#### `systemTheme`
- **Type:** `'light' | 'dark'`
- **Description:** Operating system theme preference

**Example:**
```tsx
const { systemTheme } = useTheme();
console.log(systemTheme); // 'dark'
```

#### `themes`
- **Type:** `string[]`
- **Description:** Array of available theme names

**Example:**
```tsx
const { themes } = useTheme();
console.log(themes); // ['light', 'dark', 'system', 'amoled', 'warm']
```

#### `refreshTheme`
- **Type:** `() => void`
- **Description:** Force refresh theme application

**Example:**
```tsx
const { refreshTheme } = useTheme();
refreshTheme();
```

---

## Types

### ThemeConfig

Complete theme configuration object.

```typescript
interface ThemeConfig {
  light?: ThemeColors | ThemeVariant[];
  dark?: ThemeColors | ThemeVariant[];
  variants?: Record<string, ThemeColors>;
  cssVarPrefix?: string;
  storageKey?: string;
  disableTransitions?: boolean;
  transitionDuration?: number;
  applyToBody?: boolean;
  forceColorScheme?: boolean;
  styleTarget?: HTMLElement;
}
```

#### Properties

**`light`**
- Colors for light mode or array of light variants
- Type: `ThemeColors | ThemeVariant[]`

**`dark`**
- Colors for dark mode or array of dark variants
- Type: `ThemeColors | ThemeVariant[]`

**`variants`**
- Custom theme variants
- Type: `Record<string, ThemeColors>`

**`cssVarPrefix`**
- CSS variable prefix
- Type: `string`
- Default: `'themesx'`

**`storageKey`**
- localStorage key for persistence
- Type: `string`
- Default: `'themesx-theme'`

**`disableTransitions`**
- Disable smooth color transitions
- Type: `boolean`
- Default: `false`

**`transitionDuration`**
- Transition duration in milliseconds
- Type: `number`
- Default: `300`

**`applyToBody`**
- Apply theme colors to body element
- Type: `boolean`
- Default: `false`

**`forceColorScheme`**
- Update color-scheme meta tag
- Type: `boolean`
- Default: `false`

**`styleTarget`**
- Custom CSS injection point
- Type: `HTMLElement`
- Default: `document.head`

### ThemeColors

Color definitions for a theme.

```typescript
interface ThemeColors {
  background?: ColorValue;
  foreground?: ColorValue;
  primary?: ColorValue;
  secondary?: ColorValue;
  accent?: ColorValue;
  muted?: ColorValue;
  border?: ColorValue;
  ring?: ColorValue;
  card?: ColorValue;
  cardForeground?: ColorValue;
  popover?: ColorValue;
  popoverForeground?: ColorValue;
  destructive?: ColorValue;
  destructiveForeground?: ColorValue;
  success?: ColorValue;
  successForeground?: ColorValue;
  warning?: ColorValue;
  warningForeground?: ColorValue;
  info?: ColorValue;
  infoForeground?: ColorValue;
  [key: string]: ColorValue | undefined;
}
```

#### Semantic Colors

| Property | Description | CSS Variable |
|----------|-------------|--------------|
| `background` | Main background | `--themesx-background` |
| `foreground` | Main text color | `--themesx-foreground` |
| `primary` | Primary brand color | `--themesx-primary` |
| `secondary` | Secondary brand color | `--themesx-secondary` |
| `accent` | Accent color | `--themesx-accent` |
| `muted` | Muted background | `--themesx-muted` |
| `border` | Border color | `--themesx-border` |
| `ring` | Focus ring color | `--themesx-ring` |
| `card` | Card background | `--themesx-card` |
| `cardForeground` | Card text | `--themesx-card-foreground` |
| `destructive` | Destructive action | `--themesx-destructive` |
| `destructiveForeground` | Destructive text | `--themesx-destructive-foreground` |
| `success` | Success state | `--themesx-success` |
| `warning` | Warning state | `--themesx-warning` |
| `info` | Info state | `--themesx-info` |

#### Color Formats

**Hex:**
```typescript
{ background: '#ffffff' }
```

**OKLCH:**
```typescript
{ background: 'oklch(1 0 0)' }
```

**RGB:**
```typescript
{ background: 'rgb(255, 255, 255)' }
```

**HSL:**
```typescript
{ background: 'hsl(0, 0%, 100%)' }
```

### ThemeVariant

Theme variant with name and colors.

```typescript
interface ThemeVariant {
  name: string;
  colors: ThemeColors;
}
```

**Example:**
```typescript
const variant: ThemeVariant = {
  name: 'amoled',
  colors: {
    background: '#000000',
    foreground: '#ffffff',
  },
};
```

---

## Utility Functions

### createTheme

Create a theme configuration object.

```typescript
function createTheme(config: ThemeConfig): ThemeConfig
```

**Example:**
```typescript
import { createTheme } from 'themesx';

const config = createTheme({
  light: { background: '#fff' },
  dark: { background: '#000' },
});
```

### mergeThemes

Merge multiple theme configurations.

```typescript
function mergeThemes(...configs: ThemeConfig[]): ThemeConfig
```

**Example:**
```typescript
import { mergeThemes } from 'themesx';

const base = { light: { background: '#fff' } };
const custom = { dark: { background: '#000' } };

const merged = mergeThemes(base, custom);
```

---

## Presets

Built-in theme presets.

```typescript
const themePresets: {
  light: ThemeColors;
  dark: ThemeColors;
  amoled: ThemeColors;
  warmLight: ThemeColors;
  coolDark: ThemeColors;
}
```

### Available Presets

#### `light`
Default light theme with clean white background.

```typescript
import { themePresets } from 'themesx';

const config = {
  light: themePresets.light,
};
```

#### `dark`
Default dark theme with dark gray background.

```typescript
const config = {
  dark: themePresets.dark,
};
```

#### `amoled`
Pure black AMOLED-friendly theme.

```typescript
const config = {
  dark: themePresets.amoled,
};
```

#### `warmLight`
Warm beige tones for comfortable reading.

```typescript
const config = {
  light: themePresets.warmLight,
};
```

#### `coolDark`
Cool navy tones for professional interfaces.

```typescript
const config = {
  dark: themePresets.coolDark,
};
```

---

## CSS Variables

All theme colors are automatically converted to CSS custom properties.

### Format

```
--{prefix}-{property-name}: {color-value};
```

### Examples

```css
/* With default prefix 'themesx' */
var(--themesx-background)
var(--themesx-foreground)
var(--themesx-primary)
var(--themesx-card)
var(--themesx-border)
```

### Custom Prefix

```typescript
const config = {
  cssVarPrefix: 'app',
};

// Result: var(--app-background)
```

### Usage in CSS

```css
body {
  background-color: var(--themesx-background);
  color: var(--themesx-foreground);
}

.card {
  background: var(--themesx-card);
  border: 1px solid var(--themesx-border);
}

.btn-primary {
  background: var(--themesx-primary);
}
```

### Usage in Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--themesx-background)',
        foreground: 'var(--themesx-foreground)',
        primary: 'var(--themesx-primary)',
      },
    },
  },
};
```

---

## Error Handling

### useTheme Outside Provider

```typescript
// ❌ Error
function Component() {
  const { theme } = useTheme();
  // Throws: "useTheme must be used within a ThemeProvider"
}

// ✅ Correct
function App() {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
}
```

### Type Safety

ThemesX is fully typed. TypeScript will catch errors at compile time:

```typescript
// ❌ Type error
setTheme('custom'); // Error: Argument of type 'custom' is not assignable

// ✅ Correct
setTheme('light'); // OK
setTheme('dark');  // OK
setTheme('system'); // OK
```

---

## Performance

### Memoization

ThemesX uses React memoization for optimal performance:

- `useMemo` for computed values
- `useCallback` for functions
- Minimal re-renders

### Bundle Size

- **Uncompressed:** ~11.3 KB
- **Gzipped:** ~3.0 KB
- **Zero dependencies** (React as peer)

---

## Browser Support

ThemesX supports all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 16.9+

### SSR Support

Full server-side rendering support for:

- Next.js (App Router & Pages Router)
- Remix
- Gatsby
- Any React SSR framework

---

## TypeScript

ThemesX is written in TypeScript and includes full type definitions.

### Import Types

```typescript
import type {
  ThemeMode,
  ThemeConfig,
  ThemeColors,
  ThemeVariant,
  ThemeContextType,
  ThemeProviderProps,
  ColorValue,
  ColorFormat,
} from 'themesx';
```

### Type Examples

```typescript
const config: ThemeConfig = {
  light: { background: '#fff' },
};

const colors: ThemeColors = {
  background: '#000000',
  foreground: '#ffffff',
};

const mode: ThemeMode = 'dark';
```

---

## Next Steps

- 📖 [Examples](../EXAMPLES.md)
- 🚀 [Migration Guide](./migration-from-next-themes.md)
- 💡 [GitHub Repository](https://github.com/ImKKingshuk/ThemesX)
