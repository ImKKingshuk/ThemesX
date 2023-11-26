//
// ThemesX
// by ImKKingshuk
// Git-  https://github.com/ImKKingshuk/ThemesX.git
// Copyright © 2023 , @ImKKingshuk | All Rights Reserved.
// GNU General Public License v3.0 or later
//
import { useContext } from "react";
import ThemeContext, { UseThemeProps } from "./ThemeContext";

const useTheme = (): UseThemeProps =>
  useContext(ThemeContext) || { setTheme: (_) => {}, themes: [] };

export default useTheme;
