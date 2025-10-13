<h1 align="center">ThemesX</h1>

<p align="center">
<strong>The Ultimate Themes Library for React-Based Frameworks</strong><br>
ThemesX is the most powerful, flexible, and developer-friendly theming solution for React applications. With custom color support (Hex, OKLCH), theme variants, and zero-config defaults, ThemesX makes beautiful dark modes effortless. 🌗✨
</p>

<br>

## ✨ Features

### 🎨 **Advanced Color System**

- **Custom Colors**: Define your own light and dark mode colors using Hex, OKLCH, RGB, or HSL
- **Multiple Variants**: Support for AMOLED dark, warm light, cool dark, and unlimited custom variants
- **Modern Color Spaces**: First-class OKLCH support for perceptually uniform colors
- **CSS Variables**: Automatic CSS custom property generation with configurable prefixes

### 🚀 **Developer Experience**

- **Zero Config**: Beautiful defaults out of the box
- **Type Safe**: Fully typed with TypeScript for excellent IDE support
- **Framework Agnostic**: Works with Next.js, Vite, Gatsby, Remix, Astro, and more
- **SSR Ready**: No flash of unstyled content (FOUC) on page load
- **Tree Shakeable**: Import only what you need

### 🎯 **Smart Features**

- **System Theme Detection**: Automatically syncs with OS preferences
- **Persistent Themes**: LocalStorage support with custom storage keys
- **Theme Variants**: Support for multiple theme variants per mode
- **Color Scheme Meta**: Automatic `color-scheme` meta tag updates
- **Smooth Transitions**: Configurable transition durations
- **Multiple Attributes**: Support for `class`, `data-theme`, or `data-mode` attributes

## Installation

Install `ThemesX` using your preferred package manager:

### Bun

```bash
bun add themesx
```

### npm

```bash
npm install themesx
```

### pnpm

```bash
pnpm add themesx
```

### yarn

```bash
yarn add themesx
```

## 🚀 Quick Start

### Basic Setup (Zero Config)

```jsx
import { ThemeProvider } from "themesx";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Themes in Components

```jsx
import { useTheme } from "themesx";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current: {resolvedTheme}</p>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
    </div>
  );
}
```

### Access CSS Variables

```css
/* Use generated CSS variables in your styles */
body {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}

.card {
  background: var(--themesx-card);
  border: 1px solid var(--themesx-border);
}
```

---

## 🎨 Custom Colors

### Custom Hex Colors

```jsx
import { ThemeProvider, createTheme } from "themesx";

const config = createTheme({
  light: {
    background: "#ffffff",
    foreground: "#000000",
    primary: "#0070f3",
    secondary: "#7928ca",
  },
  dark: {
    background: "#000000", // Pure black
    foreground: "#ffffff",
    primary: "#0070f3",
    secondary: "#7928ca",
  },
  applyToBody: true,
});

function App() {
  return (
    <ThemeProvider config={config}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### AMOLED Dark Mode

```jsx
import { ThemeProvider, themePresets } from "themesx";

const config = {
  dark: themePresets.amoled, // Pure black AMOLED-friendly
  applyToBody: true,
};

function App() {
  return (
    <ThemeProvider config={config}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### OKLCH Colors (Modern Perceptual Color Space)

```jsx
import { ThemeProvider } from "themesx";

const config = {
  light: {
    background: "oklch(1 0 0)", // Pure white
    foreground: "oklch(0 0 0)", // Pure black
    primary: "oklch(0.5 0.2 250)", // Blue
    accent: "oklch(0.7 0.15 150)", // Green
  },
  dark: {
    background: "oklch(0.15 0 0)", // Near black
    foreground: "oklch(0.95 0 0)", // Near white
    primary: "oklch(0.6 0.25 250)", // Brighter blue
    accent: "oklch(0.75 0.2 150)", // Brighter green
  },
  applyToBody: true,
};
```

### Multiple Theme Variants

```jsx
import { ThemeProvider } from "themesx";

const config = {
  light: [
    {
      name: "light",
      colors: {
        background: "#ffffff",
        foreground: "#000000",
      },
    },
    {
      name: "warm",
      colors: {
        background: "#fef9f3", // Warm beige
        foreground: "#1a1816",
      },
    },
  ],
  dark: [
    {
      name: "dark",
      colors: {
        background: "#000000",
        foreground: "#ffffff",
      },
    },
    {
      name: "amoled",
      colors: {
        background: "#000000", // Pure black
        foreground: "#ffffff",
        primary: "#00d9ff", // Cyan
      },
    },
    {
      name: "midnight",
      colors: {
        background: "#0a0e17", // Navy
        foreground: "#e4e7eb",
      },
    },
  ],
};

function App() {
  return (
    <ThemeProvider config={config}>
      <YourApp />
    </ThemeProvider>
  );
}

// Use variants
function VariantSelector() {
  const { variant, setVariant } = useTheme();

  return (
    <select value={variant} onChange={(e) => setVariant?.(e.target.value)}>
      <option value="light">Default Light</option>
      <option value="warm">Warm Light</option>
      <option value="dark">Default Dark</option>
      <option value="amoled">AMOLED Dark</option>
      <option value="midnight">Midnight Dark</option>
    </select>
  );
}
```

---

## 📚 API Reference

### `ThemeProvider`

| Prop                | Type                                     | Default        | Description                   |
| ------------------- | ---------------------------------------- | -------------- | ----------------------------- |
| `children`          | `ReactNode`                              | —              | Your app components           |
| `defaultTheme`      | `'light' \| 'dark' \| 'system'`          | `'system'`     | Initial theme                 |
| `enableSystemTheme` | `boolean`                                | `true`         | Enable system theme detection |
| `config`            | `ThemeConfig`                            | `{}`           | Theme configuration           |
| `attribute`         | `'class' \| 'data-theme' \| 'data-mode'` | `'data-theme'` | Attribute for theme           |
| `disableStorage`    | `boolean`                                | `false`        | Disable localStorage          |
| `enableSSR`         | `boolean`                                | `true`         | Enable SSR support (no FOUC)  |
| `nonce`             | `string`                                 | —              | CSP nonce for inline styles   |

### `useTheme()`

Returns an object with:

| Property        | Type                               | Description                    |
| --------------- | ---------------------------------- | ------------------------------ |
| `theme`         | `'light' \| 'dark' \| 'system'`    | Current theme mode             |
| `setTheme`      | `(theme) => void`                  | Set theme mode                 |
| `variant`       | `string \| undefined`              | Current variant name           |
| `setVariant`    | `((variant) => void) \| undefined` | Set theme variant              |
| `resolvedTheme` | `'light' \| 'dark'`                | Actual theme (system resolved) |
| `systemTheme`   | `'light' \| 'dark'`                | OS theme preference            |
| `themes`        | `string[]`                         | Available theme names          |
| `refreshTheme`  | `() => void`                       | Force theme refresh            |

### `ThemeConfig`

```typescript
interface ThemeConfig {
  light?: ThemeColors | ThemeVariant[];
  dark?: ThemeColors | ThemeVariant[];
  variants?: Record<string, ThemeColors>;
  cssVarPrefix?: string; // Default: 'themesx'
  storageKey?: string; // Default: 'themesx-theme'
  disableTransitions?: boolean;
  transitionDuration?: number; // Default: 300ms
  applyToBody?: boolean;
  forceColorScheme?: boolean;
  styleTarget?: HTMLElement;
}
```

### `ThemeColors`

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
  // ... and more, plus custom properties
  [key: string]: ColorValue | undefined;
}
```

### Built-in Presets

```javascript
import { themePresets } from "themesx";

themePresets.light; // Default light
themePresets.dark; // Default dark
themePresets.amoled; // AMOLED dark
themePresets.warmLight; // Warm beige tones
themePresets.coolDark; // Cool navy tones
```

### Utility Functions

```javascript
import { createTheme, mergeThemes } from "themesx";

// Create a theme config
const myTheme = createTheme({
  light: { background: "#fff" },
  dark: { background: "#000" },
});

// Merge multiple configs
const combined = mergeThemes(baseTheme, customTheme);
```

---

## 🎯 Framework Integration

### Next.js (App Router)

```tsx
// app/layout.tsx
import { ThemeProvider } from "themesx";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider config={{ applyToBody: true }}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { ThemeProvider } from "themesx";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Vite + React

```tsx
// src/main.tsx
import { ThemeProvider } from "themesx";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider config={{ applyToBody: true }}>
    <App />
  </ThemeProvider>
);
```

### Remix

```tsx
// app/root.tsx
import { ThemeProvider } from "themesx";
import { Outlet } from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Gatsby

```jsx
// gatsby-browser.js & gatsby-ssr.js
import { ThemeProvider } from "themesx";

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
```

### Astro

```jsx
// src/components/App.jsx
import { ThemeProvider } from "themesx";

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## 📖 More Examples

Check out [EXAMPLES.md](./EXAMPLES.md) for:

- Advanced color configurations (OKLCH, RGB, HSL)
- Multiple theme variants
- Real-world component examples
- CSS integration patterns
- Framework-specific advanced setups

---

## 🆚 Comparison with next-themes

| Feature                 | ThemesX   | next-themes     |
| ----------------------- | --------- | --------------- |
| Custom Colors (Hex)     | ✅        | ❌              |
| Custom Colors (OKLCH)   | ✅        | ❌              |
| Theme Variants          | ✅        | ❌              |
| Built-in Presets        | ✅        | ❌              |
| CSS Variable Generation | ✅ Auto   | Manual          |
| TypeScript              | ✅ Full   | Partial         |
| Maintenance             | ✅ Active | ⚠️ Discontinued |
| SSR Support             | ✅        | ✅              |
| System Theme            | ✅        | ✅              |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the GPL-3.0-or-later License.
