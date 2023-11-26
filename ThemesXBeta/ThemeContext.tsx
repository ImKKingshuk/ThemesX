import { createContext, Dispatch, SetStateAction } from "react";

export interface UseThemeProps {
  themes: string[];
  forcedTheme?: string | undefined;
  setTheme: Dispatch<SetStateAction<string>>;
  theme?: string | undefined;
  resolvedTheme?: string | undefined;
  systemTheme?: "dark" | "light" | undefined;
}

const ThemeContext = createContext<UseThemeProps | undefined>(undefined);

export default ThemeContext;
