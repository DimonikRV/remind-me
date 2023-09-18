"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, FC } from "react";

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  return (
    <NextThemesProvider attribute="class" enableSystem>
      {children}
    </NextThemesProvider>
  );
};
