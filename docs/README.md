# ThemesX Documentation

Welcome to the complete documentation for ThemesX - the ultimate themes library for React-based frameworks.

## 📚 Documentation Index

### Getting Started

- **[Quick Start Guide](./quick-start.md)** - Get up and running in 5 minutes
- **[Installation Guide](./installation.md)** - Comprehensive installation instructions for all frameworks
- **[API Reference](./api-reference.md)** - Complete API documentation

### Migration & Integration

- **[Migration from next-themes](./migration-from-next-themes.md)** - Step-by-step guide for migrating from next-themes
- **[Troubleshooting](./troubleshooting.md)** - Common issues and solutions

### Project Information

- **[Contributing](../CONTRIBUTING.md)** - How to contribute to ThemesX
- **[Code of Conduct](../CODE_OF_CONDUCT.md)** - Community guidelines
- **[Security Policy](../SECURITY.md)** - Security policies and reporting
- **[Changelog](../CHANGELOG.md)** - Version history and changes
- **[Examples](../EXAMPLES.md)** - Real-world usage examples

## 🚀 Quick Links

### For New Users

1. Start with [Quick Start Guide](./quick-start.md)
2. Check [Installation Guide](./installation.md) for your framework
3. Explore [Examples](../EXAMPLES.md) for common patterns

### For Existing next-themes Users

1. Read [Migration Guide](./migration-from-next-themes.md)
2. Review [API Reference](./api-reference.md) for new features
3. Check [Changelog](../CHANGELOG.md) for breaking changes

### For Contributors

1. Read [Contributing Guidelines](../CONTRIBUTING.md)
2. Follow [Code of Conduct](../CODE_OF_CONDUCT.md)
3. Review [Security Policy](../SECURITY.md)

## 📖 Documentation Structure

```
docs/
├── README.md                        # This file
├── quick-start.md                   # 5-minute quick start
├── installation.md                  # Installation for all frameworks
├── api-reference.md                 # Complete API docs
├── migration-from-next-themes.md    # Migration guide
└── troubleshooting.md               # Common issues & solutions

Root directory/
├── README.md                        # Main project README
├── CONTRIBUTING.md                  # Contributing guidelines
├── CODE_OF_CONDUCT.md              # Code of conduct
├── SECURITY.md                      # Security policies
├── CHANGELOG.md                     # Version history
├── MIGRATION.md                     # v1.x to v2.0 migration
└── EXAMPLES.md                      # Usage examples
```

## 🎯 What is ThemesX?

ThemesX is the most powerful and flexible theming library for React applications, offering:

- ✅ **Custom Colors** - Define colors in Hex, OKLCH, RGB, or HSL
- ✅ **Theme Variants** - Multiple variants per mode (AMOLED, warm, cool, etc.)
- ✅ **Built-in Presets** - Pre-configured themes ready to use
- ✅ **Zero Config** - Beautiful defaults out of the box
- ✅ **Type Safe** - Full TypeScript support
- ✅ **Framework Agnostic** - Works with Next.js, Vite, Remix, and more
- ✅ **SSR Ready** - No flash of unstyled content
- ✅ **Lightweight** - Only ~3KB gzipped

## 💡 Core Concepts

### 1. ThemeProvider

Wrap your application with `ThemeProvider`:

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

### 2. useTheme Hook

Access theme state in components:

```tsx
import { useTheme } from 'themesx';

function Component() {
  const { theme, setTheme } = useTheme();
  return <button onClick={() => setTheme('dark')}>Dark Mode</button>;
}
```

### 3. CSS Variables

ThemesX generates CSS custom properties:

```css
body {
  background: var(--themesx-background);
  color: var(--themesx-foreground);
}
```

### 4. Custom Colors

Define your own color palette:

```tsx
const config = {
  light: { background: '#ffffff', primary: '#0070f3' },
  dark: { background: '#000000', primary: '#0090ff' },
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

## 🔍 Common Use Cases

### Basic Theme Toggle

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

### AMOLED Dark Mode

```tsx
import { ThemeProvider, themePresets } from 'themesx';

const config = {
  dark: themePresets.amoled, // Pure black for OLED screens
};

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

### Multiple Variants

```tsx
const config = {
  dark: [
    { name: 'dark', colors: { background: '#1a1a1a' } },
    { name: 'amoled', colors: { background: '#000000' } },
    { name: 'midnight', colors: { background: '#0a0e17' } },
  ],
};

function VariantSelector() {
  const { variant, setVariant } = useTheme();
  return (
    <select value={variant} onChange={(e) => setVariant?.(e.target.value)}>
      <option value="dark">Dark</option>
      <option value="amoled">AMOLED</option>
      <option value="midnight">Midnight</option>
    </select>
  );
}
```

## 🎨 Features Deep Dive

### Custom Color Support

Define colors in multiple formats:

- **Hex:** `#ffffff`, `#fff`
- **OKLCH:** `oklch(1 0 0)` - Perceptually uniform
- **RGB:** `rgb(255, 255, 255)`
- **HSL:** `hsl(0, 0%, 100%)`

### Semantic Color System

15+ semantic colors for consistent theming:

- `background` / `foreground`
- `primary` / `secondary` / `accent`
- `card` / `muted` / `border`
- `destructive` / `success` / `warning` / `info`
- And more...

### Built-in Presets

Ready-to-use themes:

- `themePresets.light` - Default light
- `themePresets.dark` - Default dark
- `themePresets.amoled` - Pure black AMOLED
- `themePresets.warmLight` - Warm beige tones
- `themePresets.coolDark` - Cool navy tones

## 🛠 Framework Support

ThemesX works seamlessly with:

- ✅ **Next.js** (App Router & Pages Router)
- ✅ **Vite** + React
- ✅ **Remix**
- ✅ **Gatsby**
- ✅ **Astro**
- ✅ **Create React App**
- ✅ Any React-based framework

See [Installation Guide](./installation.md) for framework-specific setup.

## 🔧 Configuration Options

Full configuration example:

```tsx
import { ThemeProvider, createTheme } from 'themesx';

const config = createTheme({
  // Colors
  light: { background: '#fff', foreground: '#000' },
  dark: { background: '#000', foreground: '#fff' },
  
  // Variants
  variants: {
    amoled: { background: '#000000' },
  },
  
  // Settings
  cssVarPrefix: 'themesx',
  storageKey: 'themesx-theme',
  disableTransitions: false,
  transitionDuration: 300,
  applyToBody: true,
  forceColorScheme: true,
});

<ThemeProvider config={config}>
  <App />
</ThemeProvider>
```

## 📊 Comparison with next-themes

| Feature | ThemesX | next-themes |
|---------|---------|-------------|
| Custom Colors | ✅ | ❌ |
| OKLCH Support | ✅ | ❌ |
| Theme Variants | ✅ | ❌ |
| Built-in Presets | ✅ | ❌ |
| CSS Variable Generation | ✅ Auto | Manual |
| TypeScript | ✅ Full | Partial |
| Maintenance | ✅ Active | ⚠️ Discontinued |

See [Migration Guide](./migration-from-next-themes.md) for detailed comparison.

## 🤝 Contributing

We welcome contributions! See:

- [Contributing Guidelines](../CONTRIBUTING.md)
- [Code of Conduct](../CODE_OF_CONDUCT.md)
- [GitHub Issues](https://github.com/ImKKingshuk/ThemesX/issues)

## 📄 License

GPL-3.0-or-later

## 🔗 Links

- **GitHub:** [ImKKingshuk/ThemesX](https://github.com/ImKKingshuk/ThemesX)
- **npm:** [themesx](https://www.npmjs.com/package/themesx)
- **Issues:** [Report bugs](https://github.com/ImKKingshuk/ThemesX/issues)
- **Discussions:** [Ask questions](https://github.com/ImKKingshuk/ThemesX/discussions)

## 📧 Contact

- **Maintainer:** Kingshuk Mondal
- **Email:** [Contact info from package.json]
- **GitHub:** [@ImKKingshuk](https://github.com/ImKKingshuk)

---

**Ready to get started?** Head to the [Quick Start Guide](./quick-start.md)! 🚀
