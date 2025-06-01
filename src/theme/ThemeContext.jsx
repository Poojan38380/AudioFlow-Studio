import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeContextProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [currentTheme, setCurrentTheme] = useState(getInitialTheme);

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
