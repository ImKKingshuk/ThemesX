import * as React from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
);

interface ThemeProviderProps {
  children: React.ReactNode;
  enableSystemTheme?: boolean; // Enable system theme detection (default: true)
  defaultTheme?: Theme; // Default theme to use (default: "system")
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  enableSystemTheme = true,
  defaultTheme = 'system',
}) => {
  const [theme, setTheme] = React.useState<Theme>('system');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // This effect runs only on the client after mounting
    const savedTheme = (typeof window !== 'undefined' &&
      localStorage.getItem('theme')) as Theme;
    const initialTheme = savedTheme || defaultTheme;

    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, [defaultTheme]);

  const applyTheme = React.useCallback(
    (newTheme: Theme) => {
      const root = document.documentElement;

      if (newTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        root.classList.add('dark');
      } else if (newTheme === 'light') {
        root.setAttribute('data-theme', 'light');
        root.classList.remove('dark');
      } else if (enableSystemTheme) {
        // Handle system theme detection
        const systemDarkMode = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;

        root.setAttribute('data-theme', systemDarkMode ? 'dark' : 'light');
        root.classList.toggle('dark', systemDarkMode);
      }
    },
    [enableSystemTheme],
  );

  React.useEffect(() => {
    if (!mounted) return;

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system' && enableSystemTheme) {
        applyTheme('system'); // Rerun applyTheme on system theme change
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (theme === 'system' && enableSystemTheme) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, applyTheme, enableSystemTheme, mounted]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
    applyTheme(newTheme);
  };

  if (!mounted) return null; // Prevents SSR issues with `localStorage`

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
