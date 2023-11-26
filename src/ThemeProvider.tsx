//
// ThemesX
// by ImKKingshuk
// Git-  https://github.com/ImKKingshuk/ThemesX.git
// Copyright © 2023 , @ImKKingshuk | All Rights Reserved.
// GNU General Public License v3.0 or later
//
import React, { Fragment, useMemo, useContext, FC, ReactNode } from "react";
import Theme from "./Theme";
import ThemeContext from "./ThemeContext";

export interface ThemeProviderProps {
  themes?: string[] | undefined;
  forcedTheme?: string | undefined;
  enableSystem?: boolean | undefined;
  disableTransitionOnChange?: boolean | undefined;
  enableColorScheme?: boolean | undefined;
  storageKey?: string | undefined;
  defaultTheme?: string | undefined;
  attribute?: string | "class" | undefined;
  value?: Record<string, string> | undefined;
  nonce?: string | undefined;
  children?: ReactNode | undefined;
}

const ThemeProvider: FC<ThemeProviderProps> = ({
  themes,
  forcedTheme,
  enableSystem,
  disableTransitionOnChange,
  enableColorScheme,
  storageKey,
  defaultTheme,
  attribute,
  value,
  nonce,
  children,
}) => {
  const context = useContext(ThemeContext);

  if (context) return <Fragment>{children}</Fragment>;
  return (
    <Theme
      {...{
        themes,
        forcedTheme,
        enableSystem,
        disableTransitionOnChange,
        enableColorScheme,
        storageKey,
        defaultTheme,
        attribute,
        value,
        nonce,
        children,
      }}
    />
  );
};

export default ThemeProvider;
