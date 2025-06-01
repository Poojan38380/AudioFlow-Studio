// Design tokens for the audio playground application

const baseColors = {
  indigo: {
    50: "#EEF2FF",
    100: "#E0E7FF",
    200: "#C7D2FE",
    300: "#A5B4FC",
    400: "#818CF8",
    500: "#6366F1",
    600: "#4F46E5",
    700: "#4338CA",
    800: "#3730A3",
    900: "#312E81",
  },
  rose: {
    50: "#FFF1F2",
    100: "#FFE4E6",
    200: "#FECDD3",
    300: "#FDA4AF",
    400: "#FB7185",
    500: "#F43F5E",
    600: "#E11D48",
    700: "#BE123C",
    800: "#9F1239",
    900: "#881337",
  },
  gray: {
    50: "#FAFAFA",
    100: "#F4F4F5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
  },
};

export const themes = {
  light: {
    primary: {
      main: baseColors.indigo[600],
      light: baseColors.indigo[500],
      dark: baseColors.indigo[700],
      contrast: baseColors.gray[50],
    },
    secondary: {
      main: baseColors.rose[500],
      light: baseColors.rose[400],
      dark: baseColors.rose[600],
      contrast: baseColors.gray[50],
    },
    background: {
      primary: baseColors.gray[50],
      secondary: baseColors.gray[100],
      tertiary: baseColors.gray[200],
      overlay: "rgba(250, 250, 250, 0.8)",
    },
    text: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[600],
      disabled: baseColors.gray[400],
    },
    status: {
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
    },
    nodes: {
      audio: baseColors.indigo[500],
      effect: baseColors.rose[500],
      output: "#10B981",
      input: "#3B82F6",
    },
  },
  dark: {
    primary: {
      main: baseColors.indigo[500],
      light: baseColors.indigo[400],
      dark: baseColors.indigo[600],
      contrast: baseColors.gray[50],
    },
    secondary: {
      main: baseColors.rose[500],
      light: baseColors.rose[400],
      dark: baseColors.rose[600],
      contrast: baseColors.gray[50],
    },
    background: {
      primary: baseColors.gray[900],
      secondary: baseColors.gray[800],
      tertiary: baseColors.gray[700],
      overlay: "rgba(24, 24, 27, 0.8)",
    },
    text: {
      primary: baseColors.gray[50],
      secondary: baseColors.gray[400],
      disabled: baseColors.gray[600],
    },
    status: {
      success: "#10B981",
      error: "#EF4444",
      warning: "#F59E0B",
      info: "#3B82F6",
    },
    nodes: {
      audio: baseColors.indigo[500],
      effect: baseColors.rose[500],
      output: "#10B981",
      input: "#3B82F6",
    },
  },
};

export const spacing = {
  xxs: "0.25rem", // 4px
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  xxl: "3rem", // 48px
};

export const typography = {
  fontFamily: {
    primary:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    display: "2rem", // 32px
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.03)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.08)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.08)",
};

export const transitions = {
  default: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  smooth: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "400ms cubic-bezier(0.4, 0, 0.2, 1)",
};

export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.75rem", // 12px
  full: "9999px", // Fully rounded
};

export const zIndex = {
  modal: 1000,
  overlay: 900,
  dropdown: 800,
  header: 700,
  tooltip: 600,
};
