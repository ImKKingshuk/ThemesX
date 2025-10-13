import * as React from 'react';

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Base theme mode type
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Color format type
 */
export type ColorFormat = 'hex' | 'oklch' | 'rgb' | 'hsl';

/**
 * Color value that can be a hex string, oklch string, or CSS color value
 */
export type ColorValue = string;

/**
 * Theme colors configuration
 */
export interface ThemeColors {
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
  // Custom CSS variables
  [key: string]: ColorValue | undefined;
}

/**
 * Theme variant configuration
 */
export interface ThemeVariant {
  name: string;
  colors: ThemeColors;
}

/**
 * Complete theme configuration
 */
export interface ThemeConfig {
  /** Light mode colors (default or custom) */
  light?: ThemeColors | ThemeVariant[];
  /** Dark mode colors (default or custom) */
  dark?: ThemeColors | ThemeVariant[];
  /** Custom theme variants */
  variants?: Record<string, ThemeColors>;
  /** CSS variable prefix (default: "themesx") */
  cssVarPrefix?: string;
  /** Storage key for theme persistence (default: "themesx-theme") */
  storageKey?: string;
  /** Disable smooth transitions */
  disableTransitions?: boolean;
  /** Custom transition duration in ms */
  transitionDuration?: number;
  /** Apply theme to body element */
  applyToBody?: boolean;
  /** Force color scheme meta tag update */
  forceColorScheme?: boolean;
  /** Custom CSS injection point (default: document.head) */
  styleTarget?: HTMLElement;
}

/**
 * Theme context type
 */
export interface ThemeContextType {
  /** Current theme mode */
  theme: ThemeMode;
  /** Set theme mode */
  setTheme: (theme: ThemeMode) => void;
  /** Current theme variant (if using variants) */
  variant?: string;
  /** Set theme variant */
  setVariant?: (variant: string) => void;
  /** Resolved theme (system resolved to light/dark) */
  resolvedTheme: 'light' | 'dark';
  /** System theme preference */
  systemTheme: 'light' | 'dark';
  /** Available themes/variants */
  themes: string[];
  /** Force refresh theme */
  refreshTheme: () => void;
}

/**
 * ThemeProvider props
 */
export interface ThemeProviderProps {
  children: React.ReactNode;
  /** Enable system theme detection */
  enableSystemTheme?: boolean;
  /** Default theme mode */
  defaultTheme?: ThemeMode;
  /** Theme configuration */
  config?: ThemeConfig;
  /** Attribute name for theme (default: "themesx") */
  attribute?: 'class' | 'data-theme' | 'data-mode';
  /** Disable localStorage persistence */
  disableStorage?: boolean;
  /** Server-side rendering support (don't flash on load) */
  enableSSR?: boolean;
  /** Custom theme script for SSR */
  nonce?: string;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LIGHT_COLORS: ThemeColors = {
  background: '#ffffff',
  foreground: '#000000',
  primary: '#0070f3',
  secondary: '#7928ca',
  accent: '#f81ce5',
  muted: '#f5f5f5',
  border: '#e5e5e5',
  card: '#ffffff',
  cardForeground: '#000000',
};

const DEFAULT_DARK_COLORS: ThemeColors = {
  background: '#000000',
  foreground: '#ffffff',
  primary: '#0070f3',
  secondary: '#7928ca',
  accent: '#f81ce5',
  muted: '#1a1a1a',
  border: '#333333',
  card: '#1a1a1a',
  cardForeground: '#ffffff',
};

const DEFAULT_AMOLED_COLORS: ThemeColors = {
  background: '#000000',
  foreground: '#ffffff',
  primary: '#00d9ff',
  secondary: '#bb86fc',
  accent: '#03dac6',
  muted: '#0a0a0a',
  border: '#1a1a1a',
  card: '#000000',
  cardForeground: '#ffffff',
};

const DEFAULT_CSS_VAR_PREFIX = 'themesx';
const DEFAULT_STORAGE_KEY = 'themesx-theme';
const DEFAULT_TRANSITION_DURATION = 300;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Parse and normalize color value
 */
function parseColor(color: ColorValue): ColorValue {
  // Already a valid CSS color
  if (
    color.startsWith('oklch(') ||
    color.startsWith('rgb(') ||
    color.startsWith('hsl(')
  ) {
    return color;
  }

  // Hex color
  if (color.startsWith('#')) {
    return color;
  }

  // OKLCH shorthand: "0.5 0.2 180" -> "oklch(0.5 0.2 180)"
  if (/^[\d.]+\s+[\d.]+\s+[\d.]+/.test(color)) {
    return `oklch(${color})`;
  }

  return color;
}

/**
 * Convert colors object to CSS variables
 */
function colorsToCSS(colors: ThemeColors, prefix: string): string {
  return Object.entries(colors)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const parsedColor = parseColor(value as ColorValue);
      return `  --${prefix}-${cssVarName}: ${parsedColor};`;
    })
    .join('\n');
}

/**
 * Generate CSS for theme configuration
 */
function generateThemeCSS(config: ThemeConfig): string {
  const prefix = config.cssVarPrefix || DEFAULT_CSS_VAR_PREFIX;
  const transitionDuration =
    config.transitionDuration || DEFAULT_TRANSITION_DURATION;
  const disableTransitions = config.disableTransitions || false;

  let css = '';

  // Root light theme
  const lightColors = Array.isArray(config.light)
    ? config.light[0]?.colors || DEFAULT_LIGHT_COLORS
    : config.light || DEFAULT_LIGHT_COLORS;

  css += `:root {\n${colorsToCSS(lightColors, prefix)}\n}\n\n`;

  // Dark theme
  const darkColors = Array.isArray(config.dark)
    ? config.dark[0]?.colors || DEFAULT_DARK_COLORS
    : config.dark || DEFAULT_DARK_COLORS;

  css += `[data-theme="dark"], .dark {\n${colorsToCSS(darkColors, prefix)}\n}\n\n`;

  // Variant themes
  if (config.variants) {
    for (const [variantName, variantColors] of Object.entries(
      config.variants,
    )) {
      css += `[data-theme="${variantName}"], .${variantName} {\n${colorsToCSS(variantColors, prefix)}\n}\n\n`;
    }
  }

  // Array-based variants (light variants)
  if (Array.isArray(config.light)) {
    config.light.forEach((variant, index) => {
      if (index === 0) return; // Skip first one (already used as default)
      css += `[data-theme="${variant.name}"], .${variant.name} {\n${colorsToCSS(variant.colors, prefix)}\n}\n\n`;
    });
  }

  // Array-based variants (dark variants)
  if (Array.isArray(config.dark)) {
    config.dark.forEach((variant, index) => {
      if (index === 0) return; // Skip first one (already used as default)
      css += `[data-theme="${variant.name}"], .${variant.name} {\n${colorsToCSS(variant.colors, prefix)}\n}\n\n`;
    });
  }

  // Optional body styles
  if (config.applyToBody) {
    const transition = disableTransitions
      ? ''
      : `transition: background-color ${transitionDuration}ms ease-in-out, color ${transitionDuration}ms ease-in-out;`;

    css += `body {\n  background-color: var(--${prefix}-background);\n  color: var(--${prefix}-foreground);\n  ${transition}\n}\n`;
  }

  return css;
}

/**
 * Get system theme preference
 */
function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Update color-scheme meta tag
 */
function updateColorSchemeMeta(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;

  let meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'color-scheme');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', theme);
}

// ============================================================================
// Context
// ============================================================================

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

// ============================================================================
// ThemeProvider Component
// ============================================================================

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  enableSystemTheme = true,
  defaultTheme = 'system',
  config = {},
  attribute = 'data-theme',
  disableStorage = false,
  enableSSR = true,
  nonce,
}) => {
  const [theme, setThemeState] = React.useState<ThemeMode>(defaultTheme);
  const [variant, setVariantState] = React.useState<string | undefined>();
  const [mounted, setMounted] = React.useState(false);
  const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(
    'light',
  );

  const styleRef = React.useRef<HTMLStyleElement | null>(null);
  const storageKey = config.storageKey || DEFAULT_STORAGE_KEY;

  // Get resolved theme (system -> light/dark)
  const resolvedTheme = React.useMemo((): 'light' | 'dark' => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme as 'light' | 'dark';
  }, [theme, systemTheme]);

  // Get available themes
  const themes = React.useMemo(() => {
    const baseThemes = ['light', 'dark', 'system'];
    const variantThemes = config.variants ? Object.keys(config.variants) : [];
    const lightVariants = Array.isArray(config.light)
      ? config.light.map((v) => v.name)
      : [];
    const darkVariants = Array.isArray(config.dark)
      ? config.dark.map((v) => v.name)
      : [];
    return [...baseThemes, ...variantThemes, ...lightVariants, ...darkVariants];
  }, [config]);

  // Apply theme to DOM
  const applyTheme = React.useCallback(
    (newTheme: ThemeMode, newVariant?: string) => {
      if (typeof document === 'undefined') return;

      const root = document.documentElement;
      const resolved = newTheme === 'system' ? systemTheme : newTheme;

      // Update attribute
      if (attribute === 'class') {
        root.classList.remove('light', 'dark');
        if (newVariant) {
          root.classList.add(newVariant);
        } else {
          root.classList.add(resolved);
        }
      } else {
        root.setAttribute(attribute, newVariant || resolved);
      }

      // Update color scheme meta
      if (config.forceColorScheme) {
        updateColorSchemeMeta(resolved);
      }
    },
    [systemTheme, attribute, config.forceColorScheme],
  );

  // Initialize theme
  // biome-ignore lint/correctness/useExhaustiveDependencies: Initialization effect should only run once on mount
  React.useEffect(() => {
    const initialSystemTheme = getSystemTheme();
    setSystemTheme(initialSystemTheme);

    // Inject styles
    const styleElement = document.createElement('style');
    if (nonce) {
      styleElement.setAttribute('nonce', nonce);
    }
    styleElement.setAttribute('data-themesx', '');
    styleElement.textContent = generateThemeCSS(config);

    const target = config.styleTarget || document.head;
    target.appendChild(styleElement);
    styleRef.current = styleElement;

    // Restore saved theme
    let savedTheme = defaultTheme;
    let savedVariant: string | undefined;

    if (!disableStorage && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          savedTheme = parsed.theme || defaultTheme;
          savedVariant = parsed.variant;
        }
      } catch (e) {
        console.warn('ThemesX: Failed to parse stored theme', e);
      }
    }

    setThemeState(savedTheme);
    setVariantState(savedVariant);
    applyTheme(savedTheme, savedVariant);
    setMounted(true);

    return () => {
      styleRef.current?.parentNode?.removeChild(styleRef.current);
    };
  }, []); // Run once on mount - intentionally empty to initialize only

  // System theme listener
  React.useEffect(() => {
    if (!mounted || !enableSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      setSystemTheme(newSystemTheme);
      if (theme === 'system') {
        applyTheme('system', variant);
      }
    };

    handleChange(mediaQuery);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [mounted, enableSystemTheme, theme, variant, applyTheme]);

  // Set theme function
  const setTheme = React.useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyTheme(newTheme, variant);

      if (!disableStorage && typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({ theme: newTheme, variant }),
          );
        } catch (e) {
          console.warn('ThemesX: Failed to save theme to storage', e);
        }
      }
    },
    [variant, applyTheme, disableStorage, storageKey],
  );

  // Set variant function
  const setVariant = React.useCallback(
    (newVariant: string) => {
      setVariantState(newVariant);
      applyTheme(theme, newVariant);

      if (!disableStorage && typeof window !== 'undefined') {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({ theme, variant: newVariant }),
          );
        } catch (e) {
          console.warn('ThemesX: Failed to save variant to storage', e);
        }
      }
    },
    [theme, applyTheme, disableStorage, storageKey],
  );

  // Force refresh theme
  const refreshTheme = React.useCallback(() => {
    applyTheme(theme, variant);
  }, [theme, variant, applyTheme]);

  // SSR support - don't render children until mounted
  if (enableSSR && !mounted) {
    return null;
  }

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    variant,
    setVariant: themes.length > 3 ? setVariant : undefined,
    resolvedTheme,
    systemTheme,
    themes,
    refreshTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// Hooks
// ============================================================================

/**
 * Hook to access theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ============================================================================
// Presets & Utilities
// ============================================================================

/**
 * Built-in theme presets
 */
export const themePresets = {
  light: DEFAULT_LIGHT_COLORS,
  dark: DEFAULT_DARK_COLORS,
  amoled: DEFAULT_AMOLED_COLORS,
  warmLight: {
    background: '#fef9f3',
    foreground: '#1a1816',
    primary: '#d97706',
    secondary: '#ea580c',
    accent: '#f59e0b',
    muted: '#fef3e2',
    border: '#e7d7c1',
    card: '#fef9f3',
    cardForeground: '#1a1816',
  } as ThemeColors,
  coolDark: {
    background: '#0a0e17',
    foreground: '#e4e7eb',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
    muted: '#1e293b',
    border: '#334155',
    card: '#0f172a',
    cardForeground: '#e4e7eb',
  } as ThemeColors,
};

/**
 * Create custom theme configuration
 */
export function createTheme(config: ThemeConfig): ThemeConfig {
  return config;
}

/**
 * Merge multiple theme configs
 */
export function mergeThemes(...configs: ThemeConfig[]): ThemeConfig {
  return configs.reduce((acc, config) => {
    return {
      cssVarPrefix: config.cssVarPrefix || acc.cssVarPrefix,
      storageKey: config.storageKey || acc.storageKey,
      disableTransitions: config.disableTransitions ?? acc.disableTransitions,
      transitionDuration: config.transitionDuration ?? acc.transitionDuration,
      applyToBody: config.applyToBody ?? acc.applyToBody,
      forceColorScheme: config.forceColorScheme ?? acc.forceColorScheme,
      styleTarget: config.styleTarget || acc.styleTarget,
      light: config.light || acc.light,
      dark: config.dark || acc.dark,
      variants: { ...acc.variants, ...config.variants },
    };
  }, {} as ThemeConfig);
}
