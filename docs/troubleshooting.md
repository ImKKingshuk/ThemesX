# Troubleshooting Guide

Common issues and their solutions when using ThemesX.

## Installation Issues

### Module Not Found

**Problem:**
```
Error: Cannot find module 'themesx'
```

**Solutions:**

1. **Verify installation:**
```bash
npm list themesx
```

2. **Reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

3. **Check import path:**
```tsx
// ✅ Correct
import { ThemeProvider } from 'themesx';

// ❌ Wrong
import { ThemeProvider } from 'themex'; // Typo
import { ThemeProvider } from '@themesx/core'; // Wrong package
```

### TypeScript Errors

**Problem:**
```
Could not find a declaration file for module 'themesx'
```

**Solutions:**

1. **Ensure TypeScript is installed:**
```bash
npm install -D typescript
```

2. **Check tsconfig.json:**
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // or "node"
    "esModuleInterop": true
  }
}
```

3. **Restart TypeScript server** in your IDE

---

## Runtime Issues

### Hook Error: "useTheme must be used within a ThemeProvider"

**Problem:**
```
Error: useTheme must be used within a ThemeProvider
```

**Cause:** Using `useTheme` outside of `ThemeProvider`.

**Solution:**

```tsx
// ❌ Wrong
function App() {
  const { theme } = useTheme(); // Error!
  return <div>...</div>;
}

// ✅ Correct
function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

function Content() {
  const { theme } = useTheme(); // Works!
  return <div>...</div>;
}
```

### Theme Not Persisting

**Problem:** Theme resets on page reload.

**Causes & Solutions:**

**1. Storage disabled:**
```tsx
// ❌ Storage disabled
<ThemeProvider disableStorage={true}>

// ✅ Enable storage (default)
<ThemeProvider disableStorage={false}>
```

**2. localStorage not available:**
```tsx
// Check if localStorage is accessible
if (typeof window !== 'undefined' && window.localStorage) {
  console.log('localStorage available');
}
```

**3. Browser privacy mode:**
- localStorage may be disabled in private/incognito mode
- Use `disableStorage={true}` and manage state yourself

**4. Custom storage key conflict:**
```tsx
// Check the storage key
const config = {
  storageKey: 'my-unique-key', // Ensure uniqueness
};
```

### Theme Flashing (FOUC)

**Problem:** Brief flash of wrong theme on page load.

**Solutions:**

**1. Add suppressHydrationWarning:**
```tsx
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </body>
</html>
```

**2. Ensure SSR is enabled:**
```tsx
<ThemeProvider enableSSR={true}> {/* Default */}
  <App />
</ThemeProvider>
```

**3. For Next.js, use proper client component:**
```tsx
// app/providers.tsx
'use client'; // Important!

import { ThemeProvider } from 'themesx';

export function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

---

## Styling Issues

### CSS Variables Not Working

**Problem:** CSS variables like `var(--themesx-background)` don't work.

**Causes & Solutions:**

**1. No colors configured:**
```tsx
// ❌ No colors defined
<ThemeProvider>

// ✅ Configure colors
<ThemeProvider config={{
  light: { background: '#fff' },
  dark: { background: '#000' },
}}>
```

**2. Wrong CSS variable name:**
```css
/* ❌ Wrong */
background: var(--background);
background: var(--theme-background);

/* ✅ Correct */
background: var(--themesx-background);
```

**3. Custom prefix:**
```tsx
// If using custom prefix
const config = {
  cssVarPrefix: 'app',
};

// Use matching CSS variables
/* var(--app-background) */
```

**4. Check browser DevTools:**
- Open DevTools → Elements
- Select `<html>` element
- Check Computed Styles for `--themesx-*` variables

### Styles Not Applying to Body

**Problem:** Body background/color not changing.

**Solution:**

```tsx
// Enable applyToBody
const config = {
  applyToBody: true,
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

Or use CSS:

```css
body {
  background-color: var(--themesx-background);
  color: var(--themesx-foreground);
  transition: background-color 0.3s, color 0.3s;
}
```

### Transitions Not Smooth

**Problem:** Colors change abruptly without transitions.

**Solutions:**

**1. Enable transitions in config:**
```tsx
const config = {
  disableTransitions: false, // Default
  transitionDuration: 300, // ms
};
```

**2. Add CSS transitions:**
```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card {
  transition: all 0.3s ease;
}
```

---

## System Theme Issues

### System Theme Not Detected

**Problem:** System theme preference not being detected.

**Solutions:**

**1. Ensure it's enabled:**
```tsx
<ThemeProvider enableSystemTheme={true}> {/* Default */}
  <App />
</ThemeProvider>
```

**2. Check browser support:**
```javascript
// Test media query support
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log('System prefers dark:', isDark);
```

**3. Check OS theme settings:**
- macOS: System Preferences → General → Appearance
- Windows: Settings → Personalization → Colors
- Linux: Depends on desktop environment

### System Theme Not Updating

**Problem:** Theme doesn't update when OS theme changes.

**Cause:** Event listeners not attached properly.

**Debug:**
```tsx
function DebugTheme() {
  const { systemTheme, theme, resolvedTheme } = useTheme();
  
  return (
    <div>
      <p>Selected: {theme}</p>
      <p>System: {systemTheme}</p>
      <p>Resolved: {resolvedTheme}</p>
    </div>
  );
}
```

**Solution:** Ensure component is mounted and ThemeProvider is at the root.

---

## Framework-Specific Issues

### Next.js Hydration Mismatch

**Problem:**
```
Error: Text content does not match server-rendered HTML
```

**Solutions:**

**1. Add suppressHydrationWarning:**
```tsx
<html lang="en" suppressHydrationWarning>
```

**2. Use 'use client' directive:**
```tsx
'use client';

import { ThemeProvider } from 'themesx';
```

**3. Conditional rendering after mount:**
```tsx
function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return null;
  
  return <button onClick={() => setTheme('dark')}>Toggle</button>;
}
```

### Vite Import Error

**Problem:**
```
Failed to resolve import 'themesx'
```

**Solution:**

Check vite.config.ts:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['themesx'],
  },
});
```

### Remix Route Changes

**Problem:** Theme resets on route change.

**Solution:** Ensure ThemeProvider is in root.tsx, not in individual routes:

```tsx
// ✅ Correct: root.tsx
export default function App() {
  return (
    <html>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  );
}

// ❌ Wrong: routes/index.tsx
export default function Index() {
  return (
    <ThemeProvider> {/* Don't put here */}
      <div>...</div>
    </ThemeProvider>
  );
}
```

---

## Performance Issues

### Slow Theme Switching

**Problem:** Theme change feels laggy.

**Solutions:**

**1. Reduce transition duration:**
```tsx
const config = {
  transitionDuration: 150, // Faster
};
```

**2. Disable transitions:**
```tsx
const config = {
  disableTransitions: true,
};
```

**3. Optimize CSS selectors:**
```css
/* ❌ Slow */
* {
  transition: all 0.3s;
}

/* ✅ Fast */
body {
  transition: background-color 0.3s, color 0.3s;
}
```

### Multiple Re-renders

**Problem:** Component re-renders too often when theme changes.

**Solution:** Memoize components:

```tsx
import { memo } from 'react';

const MyComponent = memo(function MyComponent() {
  const { theme } = useTheme();
  return <div>{theme}</div>;
});
```

---

## Advanced Issues

### CSP Violations

**Problem:**
```
Refused to apply inline style because it violates CSP
```

**Solution:** Use nonce:

```tsx
// Generate nonce per request (SSR)
const nonce = generateNonce();

<ThemeProvider nonce={nonce}>
  <App />
</ThemeProvider>
```

Add to CSP header:
```
Content-Security-Policy: style-src 'self' 'nonce-{NONCE_VALUE}'
```

### Custom Colors Not Working

**Problem:** Custom colors don't appear.

**Debug checklist:**

1. **Check color format:**
```tsx
// Valid formats
'#ffffff'
'#fff'
'oklch(1 0 0)'
'rgb(255, 255, 255)'
'hsl(0, 0%, 100%)'
```

2. **Check config structure:**
```tsx
const config = {
  light: {
    background: '#ffffff', // ✅ Correct
  },
  // ❌ Wrong (typo)
  ligt: {
    background: '#ffffff',
  },
};
```

3. **Verify CSS variable generation:**
```javascript
// Check in browser console
const styles = getComputedStyle(document.documentElement);
console.log(styles.getPropertyValue('--themesx-background'));
```

### Variants Not Working

**Problem:** Theme variants not switching.

**Solutions:**

**1. Check variant configuration:**
```tsx
const config = {
  dark: [
    { name: 'dark', colors: { background: '#1a1a1a' } },
    { name: 'amoled', colors: { background: '#000000' } },
  ],
};
```

**2. Use setVariant:**
```tsx
const { setVariant } = useTheme();
if (setVariant) {
  setVariant('amoled');
}
```

**3. Check variant is available:**
```tsx
const { themes } = useTheme();
console.log('Available themes:', themes);
```

---

## Still Having Issues?

### 1. Check the Basics

- ✅ Latest version of ThemesX installed
- ✅ ThemeProvider wraps your app
- ✅ useTheme used inside ThemeProvider
- ✅ No TypeScript errors
- ✅ Browser console has no errors

### 2. Create a Minimal Reproduction

Create a minimal example that reproduces the issue:

```tsx
import { ThemeProvider, useTheme } from 'themesx';

function App() {
  return (
    <ThemeProvider>
      <Test />
    </ThemeProvider>
  );
}

function Test() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme('dark')}>Dark</button>
    </div>
  );
}
```

### 3. Get Help

- 📖 [Documentation](../README.md)
- 💬 [GitHub Discussions](https://github.com/ImKKingshuk/ThemesX/discussions)
- 🐛 [Report Bug](https://github.com/ImKKingshuk/ThemesX/issues/new?template=bug_report.md)
- 💡 [Examples](../EXAMPLES.md)

### 4. Provide Information

When asking for help, include:

- ThemesX version
- Framework and version
- Minimal reproduction
- Expected vs actual behavior
- Error messages
- Browser/environment details

---

**Most issues are solved quickly with the solutions above!** 🚀
