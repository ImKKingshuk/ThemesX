# Migration Guide: v1.x to v2.0

This guide will help you migrate from ThemesX v1.x to v2.0.

## Breaking Changes

### 1. CSS Variable Names

**Changed:** CSS variables now use semantic naming with the `themesx` prefix.

**Before (v1.x):**
```css
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

**After (v2.0):**
```css
body {
  background-color: var(--themesx-background);
  color: var(--themesx-foreground);
}
```

**Migration:** Use find-and-replace across your CSS files:
- `--background-color` → `--themesx-background`
- `--text-color` → `--themesx-foreground`

---

### 2. Body Styles

**Changed:** Body styles are no longer applied by default.

**Before (v1.x):**
Body background and text colors were automatically applied.

**After (v2.0):**
You need to enable `applyToBody` in config:

```jsx
<ThemeProvider config={{ applyToBody: true }}>
  <App />
</ThemeProvider>
```

**Alternative:** Use CSS:
```css
body {
  background-color: var(--themesx-background);
  color: var(--themesx-foreground);
  transition: background-color 0.3s, color 0.3s;
}
```

---

### 3. useTheme Hook Return Values

**Changed:** The hook now returns additional properties.

**Before (v1.x):**
```typescript
const { theme, setTheme } = useTheme();
```

**After (v2.0):**
```typescript
const { 
  theme,           // 'light' | 'dark' | 'system'
  setTheme,
  resolvedTheme,   // NEW: 'light' | 'dark' (system resolved)
  systemTheme,     // NEW: OS preference
  variant,         // NEW: current variant
  setVariant,      // NEW: set variant
  themes,          // NEW: available themes
  refreshTheme     // NEW: force refresh
} = useTheme();
```

**Migration:** Your existing code will continue to work. New properties are optional.

---

## New Features You Can Adopt

### 1. Custom Colors

You can now customize light and dark mode colors:

```jsx
import { ThemeProvider } from 'themesx';

const config = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    primary: '#0070f3',
    secondary: '#7928ca',
  },
  dark: {
    background: '#000000',  // Pure black for AMOLED
    foreground: '#ffffff',
    primary: '#0070f3',
    secondary: '#7928ca',
  },
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

### 2. OKLCH Colors

Use modern perceptually uniform colors:

```jsx
const config = {
  light: {
    background: 'oklch(1 0 0)',           // White
    foreground: 'oklch(0.2 0 0)',         // Dark gray
    primary: 'oklch(0.55 0.22 250)',      // Blue
  },
  dark: {
    background: 'oklch(0.15 0 0)',        // Near black
    foreground: 'oklch(0.95 0 0)',        // Near white
    primary: 'oklch(0.65 0.25 250)',      // Brighter blue
  },
};
```

### 3. Theme Variants

Support multiple variants per mode:

```jsx
const config = {
  dark: [
    {
      name: 'dark',
      colors: { background: '#1a1a1a' }
    },
    {
      name: 'amoled',
      colors: { background: '#000000' }  // Pure black
    },
    {
      name: 'midnight',
      colors: { background: '#0a0e17' }  // Navy
    },
  ],
};

// Switch variants
function VariantToggle() {
  const { setVariant } = useTheme();
  return <button onClick={() => setVariant?.('amoled')}>AMOLED</button>;
}
```

### 4. Built-in Presets

Use pre-configured themes:

```jsx
import { ThemeProvider, themePresets } from 'themesx';

const config = {
  dark: themePresets.amoled,  // Pure black AMOLED theme
  applyToBody: true,
};
```

Available presets:
- `themePresets.light` - Default light
- `themePresets.dark` - Default dark
- `themePresets.amoled` - AMOLED dark
- `themePresets.warmLight` - Warm beige
- `themePresets.coolDark` - Cool navy

### 5. Semantic Color Variables

Use 15+ semantic color variables:

```css
.card {
  background: var(--themesx-card);
  color: var(--themesx-card-foreground);
  border: 1px solid var(--themesx-border);
}

.btn-primary {
  background: var(--themesx-primary);
  color: white;
}

.btn-destructive {
  background: var(--themesx-destructive);
  color: var(--themesx-destructive-foreground);
}

.text-muted {
  color: var(--themesx-muted);
}
```

---

## Step-by-Step Migration

### Step 1: Update Package

```bash
bun update themesx
# or
npm update themesx
```

### Step 2: Update CSS Variables

Find and replace in all CSS files:
- `--background-color` → `--themesx-background`
- `--text-color` → `--themesx-foreground`

### Step 3: Update Provider

```jsx
// Before
<ThemeProvider defaultTheme="system" enableSystemTheme={true}>
  <App />
</ThemeProvider>

// After (minimal change)
<ThemeProvider 
  defaultTheme="system" 
  enableSystemTheme={true}
  config={{ applyToBody: true }}
>
  <App />
</ThemeProvider>
```

### Step 4: Test Your App

1. Check that themes switch correctly
2. Verify CSS variables are working
3. Test system theme detection
4. Check localStorage persistence

### Step 5: (Optional) Add Custom Colors

```jsx
const config = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    // Add your colors
  },
  dark: {
    background: '#000000',
    foreground: '#ffffff',
    // Add your colors
  },
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

---

## Common Issues

### Issue: Body styles not applying

**Solution:** Add `applyToBody: true` to config:

```jsx
<ThemeProvider config={{ applyToBody: true }}>
```

### Issue: CSS variables not found

**Solution:** Update variable names from `--background-color` to `--themesx-background`, etc.

### Issue: TypeScript errors

**Solution:** The types have changed. Update your imports:

```typescript
import type { ThemeMode, ThemeConfig, ThemeColors } from 'themesx';
```

### Issue: Flash of unstyled content (FOUC)

**Solution:** Ensure `enableSSR` is true (default) and add `suppressHydrationWarning` to `<html>`:

```jsx
<html lang="en" suppressHydrationWarning>
```

---

## Need Help?

- Check [EXAMPLES.md](./EXAMPLES.md) for comprehensive examples
- Read the [README.md](./README.md) for full API documentation
- Open an issue on GitHub if you encounter problems

---

## Benefits of v2.0

✅ Custom colors for light and dark modes  
✅ OKLCH color space support  
✅ Theme variants (AMOLED, warm, cool, etc.)  
✅ Better TypeScript support  
✅ More semantic color names  
✅ Built-in presets  
✅ Improved SSR support  
✅ Better performance  
✅ More flexible configuration  
✅ Active maintenance
