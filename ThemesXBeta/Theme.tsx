import React, { FC, useCallback, useEffect, useState, useMemo } from "react";
import ThemeScript from "./ThemeScript";
import { ThemeProviderProps } from "./ThemeProvider";
import ThemeContext from "./ThemeContext";
import { getTheme, disableAnimation, getSystemTheme } from "./Helpers";

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";

const Theme: FC<ThemeProviderProps> = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = ["light", "dark"],
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
}) => {
  const [theme, setThemeState] = useState(() =>
    getTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    getTheme(storageKey)
  );
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = useCallback((theme: string) => {
    let resolved = theme;
    if (!resolved) return;

    if (theme === "system" && enableSystem) {
      resolved = getSystemTheme();
    }

    const name = value ? value[resolved] : resolved;
    const enable = disableTransitionOnChange ? disableAnimation() : null;
    const d = document.documentElement;

    if (attribute === "class") {
      d.classList.remove(...attrs);

      if (name) d.classList.add(name);
    } else {
      if (name) {
        d.setAttribute(attribute, name);
      } else {
        d.removeAttribute(attribute);
      }
    }

    if (enableColorScheme) {
      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;
      const colorScheme = colorSchemes.includes(resolved) ? resolved : fallback;
      // @ts-ignore
      d.style.colorScheme = colorScheme;
    }

    enable?.();
  }, []);

  const setTheme = useCallback(
    (newTheme: string | ((currentTheme: string) => string)) => {
      const resolvedTheme =
        typeof newTheme === "function"
          ? (newTheme as (currentTheme: string) => string)(theme)
          : newTheme;
      setThemeState(resolvedTheme);

      try {
        localStorage.setItem(storageKey, resolvedTheme);
      } catch (e) {
        // Unsupported
      }
    },
    [theme, setThemeState, storageKey]
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, forcedTheme]
  );

  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      const theme = e.newValue || defaultTheme;
      setTheme(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setTheme]);

  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, "system"] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as
        | "light"
        | "dark"
        | undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes]
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          disableTransitionOnChange,
          enableSystem,
          enableColorScheme,
          storageKey,
          themes,
          defaultTheme,
          attribute,
          value,
          children,
          attrs,
          nonce,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;
