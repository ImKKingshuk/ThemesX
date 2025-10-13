# ThemesX Examples

## Table of Contents

- [Custom Color Examples](#custom-color-examples)
- [Advanced Configurations](#advanced-configurations)
- [Framework Integration](#framework-integration)
- [Real-world Use Cases](#real-world-use-cases)

---

## Custom Color Examples

### 1. AMOLED Dark with Custom Primary

Perfect for mobile apps with OLED screens:

```jsx
import { ThemeProvider } from 'themesx';

const config = {
  dark: {
    background: '#000000',        // Pure black saves battery
    foreground: '#ffffff',
    primary: '#00d9ff',          // Bright cyan
    secondary: '#bb86fc',        // Purple
    accent: '#03dac6',           // Teal
    muted: '#0a0a0a',
    border: '#1a1a1a',
  },
  applyToBody: true,
};

export default function App() {
  return (
    <ThemeProvider config={config} defaultTheme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Warm Light Theme

Softer, easier on the eyes:

```jsx
const config = {
  light: {
    background: '#fef9f3',       // Warm off-white
    foreground: '#1a1816',       // Dark brown
    primary: '#d97706',          // Amber
    secondary: '#ea580c',        // Orange
    accent: '#f59e0b',
    muted: '#fef3e2',
    border: '#e7d7c1',
  },
  applyToBody: true,
};
```

### 3. OKLCH Color Space (Perceptually Uniform)

Modern color space for consistent brightness:

```jsx
const config = {
  light: {
    background: 'oklch(1 0 0)',            // L=100%, C=0, H=0 (white)
    foreground: 'oklch(0.2 0 0)',          // Dark gray
    primary: 'oklch(0.55 0.22 250)',       // Blue
    secondary: 'oklch(0.55 0.22 320)',     // Purple
    accent: 'oklch(0.7 0.15 150)',         // Green
  },
  dark: {
    background: 'oklch(0.15 0 0)',         // Very dark
    foreground: 'oklch(0.95 0 0)',         // Almost white
    primary: 'oklch(0.65 0.25 250)',       // Brighter blue
    secondary: 'oklch(0.65 0.25 320)',     // Brighter purple
    accent: 'oklch(0.75 0.2 150)',         // Brighter green
  },
};
```

### 4. Multiple Variants Per Mode

```jsx
const config = {
  light: [
    {
      name: 'light',
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#0070f3',
      },
    },
    {
      name: 'sepia',
      colors: {
        background: '#f4ecd8',
        foreground: '#5b4636',
        primary: '#8b6f47',
      },
    },
  ],
  dark: [
    {
      name: 'dark',
      colors: {
        background: '#1a1a1a',
        foreground: '#ffffff',
      },
    },
    {
      name: 'amoled',
      colors: {
        background: '#000000',
        foreground: '#ffffff',
        primary: '#00d9ff',
      },
    },
    {
      name: 'midnight',
      colors: {
        background: '#0a0e17',
        foreground: '#e4e7eb',
        primary: '#3b82f6',
      },
    },
  ],
};
```

---

## Advanced Configurations

### Custom CSS Variable Prefix

```jsx
const config = {
  cssVarPrefix: 'app',           // Use --app-background instead of --themesx-background
  light: { background: '#fff' },
  dark: { background: '#000' },
};
```

Now use: `var(--app-background)` in your CSS.

### Custom Storage Key

```jsx
const config = {
  storageKey: 'my-app-theme',    // Custom localStorage key
};
```

### Disable Transitions

```jsx
const config = {
  disableTransitions: true,      // No smooth color transitions
};
```

### Custom Transition Duration

```jsx
const config = {
  transitionDuration: 500,       // 500ms transitions
};
```

### Force Color Scheme Meta Tag

Tells browser about theme for native scrollbars, form controls:

```jsx
<ThemeProvider 
  config={{ forceColorScheme: true }}
>
  <App />
</ThemeProvider>
```

### Using Class Attribute Instead of Data Attribute

```jsx
<ThemeProvider attribute="class">
  <App />
</ThemeProvider>
```

Now themes are applied as classes: `<html class="dark">` or `<html class="light">`

---

## Framework Integration

### Next.js App Router with Custom Colors

```tsx
// app/layout.tsx
import { ThemeProvider } from 'themesx';
import './globals.css';

const themeConfig = {
  light: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#0070f3',
    secondary: '#7928ca',
    card: '#f9fafb',
    border: '#e5e7eb',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#ededed',
    primary: '#0090ff',
    secondary: '#8b5cf6',
    card: '#1a1a1a',
    border: '#2a2a2a',
  },
  applyToBody: true,
  forceColorScheme: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider config={themeConfig}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Vite + React with OKLCH

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'themesx';
import App from './App';

const config = {
  light: {
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.2 0 0)',
    primary: 'oklch(0.55 0.22 250)',
  },
  dark: {
    background: 'oklch(0.15 0 0)',
    foreground: 'oklch(0.95 0 0)',
    primary: 'oklch(0.65 0.25 250)',
  },
  applyToBody: true,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider config={config}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Remix with Theme Persistence

```tsx
// app/root.tsx
import { ThemeProvider } from 'themesx';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="system"
          config={{
            applyToBody: true,
            storageKey: 'remix-theme',
          }}
        >
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
```

---

## Real-world Use Cases

### 1. Theme Toggle Component

```tsx
import { useTheme } from 'themesx';
import { Moon, Sun, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme('light')}
        className={theme === 'light' ? 'active' : ''}
        aria-label="Light mode"
      >
        <Sun />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={theme === 'dark' ? 'active' : ''}
        aria-label="Dark mode"
      >
        <Moon />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={theme === 'system' ? 'active' : ''}
        aria-label="System mode"
      >
        <Monitor />
      </button>
    </div>
  );
}
```

### 2. Variant Selector Dropdown

```tsx
import { useTheme } from 'themesx';

export function VariantSelector() {
  const { variant, setVariant, themes } = useTheme();

  // Filter out base themes to show only variants
  const variants = themes.filter(t => !['light', 'dark', 'system'].includes(t));

  if (!setVariant || variants.length === 0) {
    return null;
  }

  return (
    <select
      value={variant}
      onChange={(e) => setVariant(e.target.value)}
      className="theme-selector"
    >
      {variants.map((v) => (
        <option key={v} value={v}>
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </option>
      ))}
    </select>
  );
}
```

### 3. Theme-aware CSS

```css
/* globals.css */
body {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}

.card {
  background: var(--themesx-card);
  border: 1px solid var(--themesx-border);
  border-radius: 8px;
  padding: 1rem;
}

.btn-primary {
  background: var(--themesx-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-secondary {
  background: var(--themesx-secondary);
  color: white;
}

.text-muted {
  color: var(--themesx-muted);
}
```

### 4. Conditional Rendering Based on Theme

```tsx
import { useTheme } from 'themesx';

export function ThemeAwareComponent() {
  const { resolvedTheme } = useTheme();

  return (
    <div>
      {resolvedTheme === 'dark' ? (
        <img src="/logo-dark.png" alt="Logo" />
      ) : (
        <img src="/logo-light.png" alt="Logo" />
      )}
    </div>
  );
}
```

### 5. E-commerce Site with Reading Mode

```tsx
const config = {
  light: [
    {
      name: 'light',
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        primary: '#0070f3',
      },
    },
    {
      name: 'reading',
      colors: {
        background: '#f4ecd8',    // Sepia for reading
        foreground: '#5b4636',
        primary: '#8b6f47',
      },
    },
  ],
  dark: [
    {
      name: 'dark',
      colors: {
        background: '#1a1a1a',
        foreground: '#ffffff',
      },
    },
    {
      name: 'night',
      colors: {
        background: '#000000',    // Pure black for night reading
        foreground: '#e0e0e0',
        primary: '#4a9eff',
      },
    },
  ],
  applyToBody: true,
};
```

### 6. Dashboard with Multiple Theme Options

```tsx
import { ThemeProvider, themePresets, mergeThemes } from 'themesx';

const dashboardTheme = {
  light: {
    ...themePresets.light,
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
  dark: {
    ...themePresets.dark,
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
  },
};

export function Dashboard() {
  return (
    <ThemeProvider
      config={{
        ...dashboardTheme,
        applyToBody: true,
        forceColorScheme: true,
      }}
    >
      <DashboardApp />
    </ThemeProvider>
  );
}
```

### 7. Using System Theme with Override

```tsx
export function PreferenceAware() {
  const { systemTheme, theme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>System prefers: {systemTheme}</p>
      <p>You selected: {theme}</p>
      <p>Currently showing: {resolvedTheme}</p>
    </div>
  );
}
```

---

## CSS Examples

### Using CSS Variables in Tailwind

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--themesx-background)',
        foreground: 'var(--themesx-foreground)',
        primary: 'var(--themesx-primary)',
        secondary: 'var(--themesx-secondary)',
        accent: 'var(--themesx-accent)',
        muted: 'var(--themesx-muted)',
        border: 'var(--themesx-border)',
      },
    },
  },
};
```

Now use Tailwind classes: `bg-background text-foreground border-border`

### Styled Components

```tsx
import styled from 'styled-components';

const Card = styled.div`
  background: var(--themesx-card);
  color: var(--themesx-card-foreground);
  border: 1px solid var(--themesx-border);
  border-radius: 8px;
  padding: 1rem;
`;

const Button = styled.button`
  background: var(--themesx-primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
`;
```

### CSS Modules

```css
/* Card.module.css */
.card {
  background: var(--themesx-card);
  color: var(--themesx-card-foreground);
  border: 1px solid var(--themesx-border);
}

.button {
  background: var(--themesx-primary);
  color: white;
}
```
