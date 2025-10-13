import { beforeEach, describe, expect, test } from '@rstest/core';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import {
  createTheme,
  mergeThemes,
  ThemeProvider,
  themePresets,
  useTheme,
} from '../src/index';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(prefers-color-scheme: dark)',
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Test component
function TestComponent() {
  const {
    theme,
    setTheme,
    resolvedTheme,
    systemTheme,
    themes,
    variant,
    setVariant,
  } = useTheme();

  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="resolved-theme">{resolvedTheme}</div>
      <div data-testid="system-theme">{systemTheme}</div>
      <div data-testid="variant">{variant || 'none'}</div>
      <div data-testid="themes">{themes.join(',')}</div>
      <button
        type="button"
        onClick={() => setTheme('light')}
        data-testid="set-light"
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme('dark')}
        data-testid="set-dark"
      >
        Dark
      </button>
      <button
        type="button"
        onClick={() => setTheme('system')}
        data-testid="set-system"
      >
        System
      </button>
      {setVariant && (
        <button
          type="button"
          onClick={() => setVariant('amoled')}
          data-testid="set-variant"
        >
          Set Variant
        </button>
      )}
    </div>
  );
}

beforeEach(() => {
  localStorageMock.clear();
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.className = '';
});

describe('ThemeProvider', () => {
  test('should render with default theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });
  });

  test('should switch themes', async () => {
    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });

    const darkButton = screen.getByTestId('set-dark');
    act(() => {
      darkButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });
  });

  test('should persist theme to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toBeDefined();
    });

    const lightButton = screen.getByTestId('set-light');
    act(() => {
      lightButton.click();
    });

    await waitFor(() => {
      const stored = localStorageMock.getItem('themesx-theme');
      expect(stored).toBeTruthy();
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.theme).toBe('light');
      }
    });
  });

  test('should work with custom config', async () => {
    const config = createTheme({
      light: {
        background: '#ffffff',
        foreground: '#000000',
      },
      dark: {
        background: '#000000',
        foreground: '#ffffff',
      },
      applyToBody: true,
    });

    render(
      <ThemeProvider config={config} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });

  test('should support theme variants', async () => {
    const config = {
      dark: [
        { name: 'dark', colors: { background: '#1a1a1a' } },
        { name: 'amoled', colors: { background: '#000000' } },
      ],
    };

    render(
      <ThemeProvider config={config} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      const themesText = screen.getByTestId('themes').textContent;
      expect(themesText).toContain('amoled');
    });

    const variantButton = screen.getByTestId('set-variant');
    act(() => {
      variantButton.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('variant')).toHaveTextContent('amoled');
    });
  });

  test('should disable storage when configured', async () => {
    render(
      <ThemeProvider disableStorage={true}>
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toBeDefined();
    });

    const lightButton = screen.getByTestId('set-light');
    act(() => {
      lightButton.click();
    });

    await waitFor(() => {
      const stored = localStorageMock.getItem('themesx-theme');
      expect(stored).toBeNull();
    });
  });

  test('should use custom storage key', async () => {
    const config = {
      storageKey: 'custom-theme-key',
    };

    render(
      <ThemeProvider config={config}>
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toBeDefined();
    });

    const lightButton = screen.getByTestId('set-light');
    act(() => {
      lightButton.click();
    });

    await waitFor(() => {
      const stored = localStorageMock.getItem('custom-theme-key');
      expect(stored).toBeTruthy();
    });
  });

  test('should apply class attribute when configured', async () => {
    render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  test('should throw error when useTheme used outside provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within a ThemeProvider');
  });
});

describe('Theme Presets', () => {
  test('should have built-in presets', () => {
    expect(themePresets.light).toBeDefined();
    expect(themePresets.dark).toBeDefined();
    expect(themePresets.amoled).toBeDefined();
    expect(themePresets.warmLight).toBeDefined();
    expect(themePresets.coolDark).toBeDefined();
  });

  test('should use amoled preset', async () => {
    const config = {
      dark: themePresets.amoled,
    };

    render(
      <ThemeProvider config={config} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });
});

describe('Utility Functions', () => {
  test('createTheme should return config', () => {
    const theme = createTheme({
      light: { background: '#fff' },
      dark: { background: '#000' },
    });

    expect(theme.light).toBeDefined();
    expect(theme.dark).toBeDefined();
  });

  test('mergeThemes should combine configs', () => {
    const theme1 = createTheme({
      light: { background: '#fff' },
    });

    const theme2 = createTheme({
      dark: { background: '#000' },
    });

    const merged = mergeThemes(theme1, theme2);

    expect(merged.light).toBeDefined();
    expect(merged.dark).toBeDefined();
  });
});
