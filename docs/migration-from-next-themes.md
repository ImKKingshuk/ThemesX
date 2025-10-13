# Migration Guide: next-themes to ThemesX

This comprehensive guide will help you migrate from `next-themes` to `ThemesX` with minimal breaking changes.

## Why Migrate?

- ✅ **Active Maintenance**: next-themes is no longer maintained
- ✅ **Custom Colors**: Define your own colors for light and dark modes
- ✅ **OKLCH Support**: Modern perceptual color space
- ✅ **Theme Variants**: Multiple variants per mode (AMOLED, warm, cool, etc.)
- ✅ **Better TypeScript**: Comprehensive type definitions
- ✅ **More Features**: 15+ semantic colors, built-in presets, and utilities

## Quick Migration

### 1. Update Package

```bash
# Remove next-themes
npm uninstall next-themes

# Install ThemesX
npm install themesx
```

### 2. Update Imports

**Before (next-themes):**

```tsx
import { ThemeProvider } from "next-themes";
```

**After (ThemesX):**

```tsx
import { ThemeProvider } from "themesx";
```

### 3. Update Provider (Minimal Changes)

Most of your existing code will work with minimal changes!

**Before (next-themes):**

```tsx
<ThemeProvider attribute="class" defaultTheme="system">
  <Component {...pageProps} />
</ThemeProvider>
```

**After (ThemesX):**

```tsx
<ThemeProvider attribute="class" defaultTheme="system">
  <Component {...pageProps} />
</ThemeProvider>
```

## API Compatibility

### ThemeProvider Props

| next-themes                 | ThemesX                     | Status           | Notes                       |
| --------------------------- | --------------------------- | ---------------- | --------------------------- |
| `attribute`                 | `attribute`                 | ✅ Compatible    | Same functionality          |
| `defaultTheme`              | `defaultTheme`              | ✅ Compatible    | Same values                 |
| `enableSystem`              | `enableSystemTheme`         | ⚠️ Renamed       | Just rename the prop        |
| `storageKey`                | `config.storageKey`         | ⚠️ Moved         | Now in config object        |
| `themes`                    | N/A                         | ⚠️ Different     | Use config.variants instead |
| `forcedTheme`               | N/A                         | ❌ Not supported | Use defaultTheme            |
| `enableColorScheme`         | `config.forceColorScheme`   | ⚠️ Moved         | Now in config object        |
| `disableTransitionOnChange` | `config.disableTransitions` | ⚠️ Renamed       | Inverted logic              |

### useTheme Hook

| next-themes     | ThemesX         | Status           | Notes    |
| --------------- | --------------- | ---------------- | -------- |
| `theme`         | `theme`         | ✅ Compatible    | Same     |
| `setTheme`      | `setTheme`      | ✅ Compatible    | Same     |
| `systemTheme`   | `systemTheme`   | ✅ Compatible    | Same     |
| `themes`        | `themes`        | ✅ Compatible    | Enhanced |
| `resolvedTheme` | `resolvedTheme` | ✅ Compatible    | Same     |
| `forcedTheme`   | N/A             | ❌ Not supported | -        |

## Step-by-Step Migration

### Step 1: Basic Setup (Next.js App Router)

**Before (next-themes):**

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

**After (ThemesX):**

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "themesx";

export function Providers({ children }) {
  return <ThemeProvider enableSystemTheme>{children}</ThemeProvider>;
}
```

### Step 2: Update Theme Toggle

**Before (next-themes):**

```tsx
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

**After (ThemesX):**

```tsx
import { useTheme } from "themesx";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

No changes required! 🎉

### Step 3: Update CSS (If Using Tailwind)

If you were using Tailwind with next-themes class strategy, no changes needed:

```tsx
<ThemeProvider attribute="class">
  <App />
</ThemeProvider>
```

```css
/* Continues to work */
.dark .my-component {
  background: black;
}
```

### Step 4: Update Custom Themes (If Any)

**Before (next-themes):**

```tsx
<ThemeProvider themes={["light", "dark", "system"]}>
  <App />
</ThemeProvider>
```

**After (ThemesX with Variants):**

```tsx
const config = {
  variants: {
    light: { background: "#ffffff" },
    dark: { background: "#000000" },
  },
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>;
```

## Breaking Changes

### 1. `enableSystem` → `enableSystemTheme`

**Before:**

```tsx
<ThemeProvider enableSystem>
```

**After:**

```tsx
<ThemeProvider enableSystemTheme>
```

### 2. `storageKey` moved to config

**Before:**

```tsx
<ThemeProvider storageKey="my-theme">
```

**After:**

```tsx
<ThemeProvider config={{ storageKey: 'my-theme' }}>
```

### 3. `themes` prop removed

**Before:**

```tsx
<ThemeProvider themes={['light', 'dark', 'custom']}>
```

**After:**

```tsx
const config = {
  variants: {
    custom: { background: '#123456' }
  }
};

<ThemeProvider config={config}>
```

### 4. `forcedTheme` not supported

Use `defaultTheme` instead and disable storage if needed:

**Before:**

```tsx
<ThemeProvider forcedTheme="dark">
```

**After:**

```tsx
<ThemeProvider defaultTheme="dark" disableStorage>
```

## New Features You Can Use

### 1. Custom Colors

Now you can define custom colors for your themes:

```tsx
import { ThemeProvider } from "themesx";

const config = {
  light: {
    background: "#ffffff",
    foreground: "#000000",
    primary: "#0070f3",
  },
  dark: {
    background: "#000000", // Pure black AMOLED
    foreground: "#ffffff",
    primary: "#0090ff",
  },
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>;
```

Use in CSS:

```css
body {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}
```

### 2. OKLCH Colors

Use modern perceptual color space:

```tsx
const config = {
  light: {
    primary: "oklch(0.55 0.22 250)", // Perceptually uniform blue
  },
  dark: {
    primary: "oklch(0.65 0.25 250)", // Brighter for dark mode
  },
};
```

### 3. Theme Variants

Multiple variants per mode:

```tsx
const config = {
  dark: [
    { name: "dark", colors: { background: "#1a1a1a" } },
    { name: "amoled", colors: { background: "#000000" } },
    { name: "midnight", colors: { background: "#0a0e17" } },
  ],
};

// Switch variants
const { setVariant } = useTheme();
setVariant("amoled");
```

### 4. Built-in Presets

```tsx
import { themePresets } from "themesx";

const config = {
  dark: themePresets.amoled, // Pure black AMOLED theme
};
```

## Complete Example

### Before (next-themes + Tailwind)

```tsx
// app/layout.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// components/theme-toggle.tsx
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

### After (ThemesX + Tailwind)

```tsx
// app/layout.tsx
import { ThemeProvider } from "themesx";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// components/theme-toggle.tsx
import { useTheme } from "themesx";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle
    </button>
  );
}
```

**Changes:** Only the import statement! 🎉

## Advanced: Using New Features

Now enhance your theme with custom colors:

```tsx
// lib/theme-config.ts
import { createTheme } from "themesx";

export const themeConfig = createTheme({
  light: {
    background: "#ffffff",
    foreground: "#0a0a0a",
    primary: "#0070f3",
    secondary: "#7928ca",
    accent: "#f81ce5",
    muted: "#f5f5f5",
    border: "#e5e7eb",
  },
  dark: {
    background: "#000000", // AMOLED
    foreground: "#ededed",
    primary: "#0090ff",
    secondary: "#8b5cf6",
    accent: "#ff2db4",
    muted: "#1a1a1a",
    border: "#2a2a2a",
  },
  applyToBody: true,
  forceColorScheme: true,
});

// app/layout.tsx
import { ThemeProvider } from "themesx";
import { themeConfig } from "@/lib/theme-config";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider config={themeConfig} attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Use semantic CSS variables:

```css
.card {
  background: var(--themesx-card);
  color: var(--themesx-card-foreground);
  border: 1px solid var(--themesx-border);
}

.button-primary {
  background: var(--themesx-primary);
}

.button-destructive {
  background: var(--themesx-destructive);
}
```

## Troubleshooting

### Issue: Hydration Mismatch

**Solution:** Add `suppressHydrationWarning` to html tag:

```tsx
<html lang="en" suppressHydrationWarning>
```

### Issue: Theme not persisting

**Solution:** Check if `disableStorage` is set:

```tsx
<ThemeProvider disableStorage={false}>  {/* Default is false */}
```

### Issue: System theme not detected

**Solution:** Ensure `enableSystemTheme` is true:

```tsx
<ThemeProvider enableSystemTheme>  {/* Default is true */}
```

## Testing

Update your tests from next-themes:

**Before:**

```tsx
import { ThemeProvider } from "next-themes";
```

**After:**

```tsx
import { ThemeProvider } from "themesx";
```

All test logic remains the same!

## Need Help?

- 📖 [API Documentation](./api-reference.md)
- 💡 [Examples](../EXAMPLES.md)
- 🐛 [Report Issues](https://github.com/ImKKingshuk/ThemesX/issues)

---

**Migration Time:** ~5-15 minutes for most projects

**Breaking Changes:** Minimal (mostly just renaming props)

**Recommended:** Take advantage of new features like custom colors and variants! 🚀
