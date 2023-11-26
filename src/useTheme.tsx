import { useContext } from "react";
import ThemeContext, { UseThemeProps } from "./ThemeContext";

const useTheme = (): UseThemeProps =>
  useContext(ThemeContext) || { setTheme: (_) => {}, themes: [] };

export default useTheme;
