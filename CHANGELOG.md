# Changelog

All notable changes to ThemesX will be documented in this file.

## [2.0.0] - 2025/10/13

### 🎉 Major Release - Complete Rewrite

This release transforms ThemesX into the ultimate theming library for React-based frameworks, with advanced features and modern color space support.

### ✨ Added

#### Custom Color Support

- **Hex Colors**: Full support for custom hex color values for light and dark modes
- **OKLCH Colors**: First-class support for OKLCH color space (perceptually uniform)
- **RGB/HSL Support**: Standard CSS color formats supported
- **Color Parsing**: Automatic parsing and normalization of color values

#### Theme Variants

- **Multiple Variants**: Support for unlimited theme variants per mode
- **Built-in Presets**: Pre-configured themes (light, dark, amoled, warmLight, coolDark)
- **Variant Switching**: `setVariant()` function for dynamic variant changes
- **Array-based Config**: Define multiple variants as arrays

#### Enhanced API

- **ThemeConfig Interface**: Comprehensive configuration object
- **ThemeColors Type**: Strongly-typed color definitions with 15+ semantic colors
- **createTheme()**: Utility for creating theme configurations
- **mergeThemes()**: Utility for combining multiple theme configs
- **themePresets**: Built-in preset themes for quick setup

#### Improved Provider Props

- `config`: Theme configuration object
- `attribute`: Choose between 'class', 'data-theme', or 'data-mode'
- `disableStorage`: Disable localStorage persistence
- `enableSSR`: Server-side rendering support (no FOUC)
- `nonce`: CSP nonce support for inline styles

#### Enhanced useTheme Hook

- `variant`: Current theme variant name
- `setVariant()`: Function to change variants
- `resolvedTheme`: Actual theme (system resolved to light/dark)
- `systemTheme`: OS theme preference
- `themes`: Array of all available theme names
- `refreshTheme()`: Force theme refresh

#### Configuration Options

- `cssVarPrefix`: Custom CSS variable prefix (default: 'themesx')
- `storageKey`: Custom localStorage key (default: 'themesx-theme')
- `disableTransitions`: Disable smooth color transitions
- `transitionDuration`: Custom transition duration in milliseconds
- `applyToBody`: Automatically apply theme colors to body element
- `forceColorScheme`: Update color-scheme meta tag
- `styleTarget`: Custom CSS injection point

#### CSS Features

- **Auto-generated Variables**: Automatic CSS custom property generation
- **Semantic Naming**: CSS variables follow semantic naming (background, foreground, primary, etc.)
- **15+ Color Variables**: background, foreground, primary, secondary, accent, muted, border, ring, card, cardForeground, and more
- **Custom Variables**: Support for unlimited custom color properties

### 🔧 Changed

- **Complete Rewrite**: Modern React patterns with hooks and memoization
- **Better TypeScript**: Comprehensive type definitions for all APIs
- **Improved Performance**: Optimized rendering with React.memo and useCallback
- **Enhanced SSR**: Better server-side rendering support with no hydration mismatch

---

## [1.1.9] - Previous Release

Previous stable version with basic light/dark mode support.

### Features

- Basic light/dark/system theme modes
- Simple CSS injection
- localStorage persistence
- System theme detection
- Basic TypeScript support
