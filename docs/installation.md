# Installation Guide

Complete installation instructions for ThemesX across different package managers and frameworks.

## Package Managers

### npm

```bash
npm install themesx
```

### yarn

```bash
yarn add themesx
```

### pnpm

```bash
pnpm add themesx
```

### bun

```bash
bun add themesx
```

## Framework-Specific Setup

### Next.js (App Router)

**1. Install the package:**
```bash
npm install themesx
```

**2. Create a providers file:**
```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'themesx';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystemTheme>
      {children}
    </ThemeProvider>
  );
}
```

**3. Add to your layout:**
```tsx
// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

**4. Add Tailwind config (optional):**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... rest of config
};
```

### Next.js (Pages Router)

**1. Install the package:**
```bash
npm install themesx
```

**2. Add to _app.tsx:**
```tsx
// pages/_app.tsx
import { ThemeProvider } from 'themesx';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Vite + React

**1. Install the package:**
```bash
npm install themesx
```

**2. Add to main.tsx:**
```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'themesx';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider config={{ applyToBody: true }}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

### Remix

**1. Install the package:**
```bash
npm install themesx
```

**2. Add to root.tsx:**
```tsx
// app/root.tsx
import { ThemeProvider } from 'themesx';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
```

### Gatsby

**1. Install the package:**
```bash
npm install themesx
```

**2. Create gatsby-browser.js and gatsby-ssr.js:**
```javascript
// gatsby-browser.js & gatsby-ssr.js
import React from 'react';
import { ThemeProvider } from 'themesx';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
```

### Astro

**1. Install the package:**
```bash
npm install themesx
```

**2. Create a React component:**
```jsx
// src/components/ThemeWrapper.jsx
import { ThemeProvider } from 'themesx';

export default function ThemeWrapper({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

**3. Use in your layout:**
```astro
---
import ThemeWrapper from '../components/ThemeWrapper.jsx';
---

<ThemeWrapper client:load>
  <slot />
</ThemeWrapper>
```

## TypeScript Setup

ThemesX includes TypeScript definitions out of the box. No additional setup required!

### Type imports

```typescript
import type {
  ThemeMode,
  ThemeConfig,
  ThemeColors,
  ThemeContextType,
} from 'themesx';
```

### tsconfig.json (recommended)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

## CSS Integration

### Tailwind CSS

**1. Configure dark mode:**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'class'
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

**2. Use in your components:**
```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-white">Click me</button>
</div>
```

### Plain CSS

```css
/* globals.css */
body {
  background-color: var(--themesx-background);
  color: var(--themesx-foreground);
  transition: background-color 0.3s, color 0.3s;
}

.card {
  background: var(--themesx-card);
  border: 1px solid var(--themesx-border);
}
```

### CSS Modules

```css
/* Component.module.css */
.container {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}

.button {
  background: var(--themesx-primary);
}
```

### Styled Components

```tsx
import styled from 'styled-components';

const Container = styled.div`
  background: var(--themesx-background);
  color: var(--themesx-foreground);
`;

const Button = styled.button`
  background: var(--themesx-primary);
  color: white;
`;
```

### Emotion

```tsx
import { css } from '@emotion/react';

const containerStyle = css`
  background: var(--themesx-background);
  color: var(--themesx-foreground);
`;
```

## Verification

After installation, verify it's working:

**1. Create a test component:**
```tsx
import { useTheme } from 'themesx';

export function ThemeTest() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}
```

**2. Run your dev server:**
```bash
npm run dev
```

**3. Test theme switching:**
- Click the theme buttons
- Check localStorage for persistence
- Verify system theme detection

## Troubleshooting

### Module not found

If you get "Module not found" error:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

If types aren't recognized:

```bash
# Ensure TypeScript is installed
npm install -D typescript

# Restart your IDE/editor
```

### SSR Hydration mismatch

Add `suppressHydrationWarning` to your html tag:

```tsx
<html lang="en" suppressHydrationWarning>
```

### Theme not persisting

Check if localStorage is enabled and accessible:

```tsx
<ThemeProvider disableStorage={false}>
  {children}
</ThemeProvider>
```

## Peer Dependencies

ThemesX requires React as a peer dependency:

```json
{
  "peerDependencies": {
    "react": ">=16.9.0",
    "react-dom": ">=16.9.0"
  }
}
```

Ensure you have React installed:

```bash
npm install react react-dom
```

## Bundle Size

ThemesX is lightweight:

- **Uncompressed:** ~11.3 KB
- **Gzipped:** ~3.0 KB
- **Zero dependencies** (except React)

## Next Steps

- 📖 Read the [API Reference](./api-reference.md)
- 💡 Check out [Examples](../EXAMPLES.md)
- 🚀 Start using [custom colors](../README.md#custom-colors)

## Need Help?

- 📚 [Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/ImKKingshuk/ThemesX/issues)
- 💬 [Discussions](https://github.com/ImKKingshuk/ThemesX/discussions)
