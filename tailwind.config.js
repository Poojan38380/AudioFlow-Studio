/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "rgb(var(--color-primary-main) / <alpha-value>)",
          light: "rgb(var(--color-primary-light) / <alpha-value>)",
          dark: "rgb(var(--color-primary-dark) / <alpha-value>)",
          contrast: "rgb(var(--color-primary-contrast) / <alpha-value>)",
        },
        background: {
          primary: "rgb(var(--color-background-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-background-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-background-tertiary) / <alpha-value>)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          disabled: "var(--color-text-disabled)",
        },
        nodes: {
          audio: "var(--color-nodes-audio)",
          effect: "var(--color-nodes-effect)",
          input: "var(--color-nodes-input)",
          output: "var(--color-nodes-output)",
        },
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        xxs: "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      zIndex: {
        dropdown: "1000",
        tooltip: "1100",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        normal: "1.5",
        relaxed: "1.75",
      },
      safelist: [
        {
          pattern:
            /^(bg|text|border|from|to)-(primary|background|text|nodes)-(main|light|dark|contrast|primary|secondary|tertiary|disabled|audio|effect|input|output)/,
        },
        {
          pattern: /^(gap|grid-cols)-\d+/,
        },
        {
          pattern: /^(items|justify|flex|grid)-/,
        },
        {
          pattern: /^(text|font|leading)-/,
        },
      ],
    },
  },
  plugins: [],
};
