# Quick Start Guide

Get up and running with ThemesX in under 5 minutes!

## Installation

```bash
npm install themesx
```

## Basic Usage

### 1. Wrap Your App

```tsx
import { ThemeProvider } from 'themesx';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use the Hook

```tsx
import { useTheme } from 'themesx';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### 3. Style with CSS Variables

```css
body {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}
```

That's it! You now have a working theme system! 🎉

## Next Steps

### Add Custom Colors

```tsx
const config = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0070f3',
  },
  dark: {
    background: '#000000',
    foreground: '#ffffff',
    primary: '#0090ff',
  },
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

### Use OKLCH Colors

```tsx
const config = {
  light: {
    primary: 'oklch(0.55 0.22 250)',
  },
  dark: {
    primary: 'oklch(0.65 0.25 250)',
  },
};
```

### Add Theme Variants

```tsx
const config = {
  dark: [
    { name: 'dark', colors: { background: '#1a1a1a' } },
    { name: 'amoled', colors: { background: '#000000' } },
  ],
};
```

## Common Patterns

### Theme Selector

```tsx
function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  );
}
```

### Themed Icon

```tsx
function ThemedIcon() {
  const { resolvedTheme } = useTheme();
  
  return resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />;
}
```

### Conditional Styling

```tsx
function Component() {
  const { resolvedTheme } = useTheme();
  
  return (
    <div className={resolvedTheme === 'dark' ? 'dark-style' : 'light-style'}>
      Content
    </div>
  );
}
```

## Framework-Specific

### Next.js (App Router)

```tsx
// app/providers.tsx
'use client';

import { ThemeProvider } from 'themesx';

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// app/layout.tsx
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Vite

```tsx
// src/main.tsx
import { ThemeProvider } from 'themesx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider config={{ applyToBody: true }}>
    <App />
  </ThemeProvider>
);
```

## Learn More

- 📖 [Full Documentation](../README.md)
- 🎨 [Custom Colors](../README.md#custom-colors)
- 💡 [Examples](../EXAMPLES.md)
- 📚 [API Reference](./api-reference.md)
