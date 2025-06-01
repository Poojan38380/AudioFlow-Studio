import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { useTheme } from "./ThemeContext";
import {
  themes,
  spacing,
  typography,
  shadows,
  transitions,
  borderRadius,
  zIndex,
} from "./tokens";

// Global styles for the entire application
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    background-color: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color ${({ theme }) => theme.transitions.smooth},
                color ${({ theme }) => theme.transitions.smooth};
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text.disabled};
  }

  /* Basic element styling */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: color ${({ theme }) => theme.transitions.smooth};
  }

  h1 { font-size: ${({ theme }) => theme.typography.fontSize.display}; }
  h2 { font-size: ${({ theme }) => theme.typography.fontSize.xxl}; }
  h3 { font-size: ${({ theme }) => theme.typography.fontSize.xl}; }
  h4 { font-size: ${({ theme }) => theme.typography.fontSize.lg}; }
  h5 { font-size: ${({ theme }) => theme.typography.fontSize.md}; }
  h6 { font-size: ${({ theme }) => theme.typography.fontSize.sm}; }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    letter-spacing: 0.01em;
    color: ${({ theme }) => theme.colors.text.primary};
    transition: color ${({ theme }) => theme.transitions.smooth};
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.default};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.light};
    }
  }

  button {
    font-family: inherit;
    border: none;
    cursor: pointer;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  /* Flow specific styles */
  .react-flow__node {
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: ${({ theme }) => theme.shadows.sm};
    transition: all ${({ theme }) => theme.transitions.default};
    background: ${({ theme }) => theme.colors.background.secondary};

    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  }

  .react-flow__handle {
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme.colors.primary.main};
    border: 1px solid ${({ theme }) => theme.colors.background.primary};
    transition: all ${({ theme }) => theme.transitions.default};

    &:hover {
      transform: scale(1.5);
    }
  }

  .react-flow__edge-path {
    stroke: ${({ theme }) => theme.colors.text.disabled};
    stroke-width: 1.5;
    transition: all ${({ theme }) => theme.transitions.default};
  }

  .react-flow__connection-path {
    stroke: ${({ theme }) => theme.colors.primary.main};
    stroke-width: 1.5;
  }

  .react-flow__edge:hover .react-flow__edge-path {
    stroke: ${({ theme }) => theme.colors.primary.main};
  }
`;

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const { currentTheme } = useTheme();

  const theme = {
    colors: themes[currentTheme],
    spacing,
    typography,
    shadows,
    transitions,
    borderRadius,
    zIndex,
  };

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
