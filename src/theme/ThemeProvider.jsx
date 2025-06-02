import React from "react";
import { useTheme } from "./ThemeContext";

export const ThemeProvider = ({ children }) => {
  const { currentTheme } = useTheme();

  return <div data-theme={currentTheme}>{children}</div>;
};
