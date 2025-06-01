import styled, { css } from "styled-components";

// Button variants with more subtle styling
const buttonVariants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrast};
    &:hover {
      background: ${({ theme }) => theme.colors.primary.dark};
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.background.secondary};
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  `,
};

// Button sizes with refined proportions
const buttonSizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: ${({ theme }) => theme.typography.fontSize.md};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  gap: ${({ theme }) => theme.spacing.xs};
  letter-spacing: 0.01em;

  ${({ variant = "primary" }) => buttonVariants[variant]}
  ${({ size = "md" }) => buttonSizes[size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disabled};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.main};
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

export const Slider = styled.input.attrs({ type: "range" })`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  -webkit-appearance: none;
  margin: ${({ theme }) => theme.spacing.md} 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: ${({ theme }) => theme.colors.primary.main};
    border-radius: 50%;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.default};
    border: 2px solid ${({ theme }) => theme.colors.background.primary};

    &:hover {
      transform: scale(1.2);
      background: ${({ theme }) => theme.colors.primary.light};
    }
  }

  &:focus {
    outline: none;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: 0.01em;
`;

export const Flex = styled.div`
  display: flex;
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : 0)};
  align-items: ${({ align }) => align || "center"};
  justify-content: ${({ justify }) => justify || "flex-start"};
  flex-direction: ${({ direction }) => direction || "row"};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ gap, theme }) => (gap ? theme.spacing[gap] : 0)};
  grid-template-columns: ${({ columns = 1 }) => `repeat(${columns}, 1fr)`};
  align-items: ${({ align }) => align || "start"};
  justify-content: ${({ justify }) => justify || "start"};
`;

export const Text = styled.p`
  color: ${({ variant = "primary", theme }) => theme.colors.text[variant]};
  font-size: ${({ size = "md", theme }) => theme.typography.fontSize[size]};
  font-weight: ${({ weight = "regular", theme }) =>
    theme.typography.fontWeight[weight]};
  line-height: ${({ lineHeight = "normal", theme }) =>
    theme.typography.lineHeight[lineHeight]};
  letter-spacing: ${({ size }) => (size === "sm" ? "0.02em" : "0.01em")};
  margin: 0;
`;

export const BaseNode = styled.div`
  background: ${({ theme, type }) => {
    switch (type) {
      case "osc":
      case "noise":
        return `linear-gradient(45deg, ${theme.colors.nodes.audio}22, transparent)`;
      case "amp":
      case "flanger":
      case "chorus":
      case "phaser":
        return `linear-gradient(45deg, ${theme.colors.nodes.effect}22, transparent)`;
      case "waveform":
        return `linear-gradient(45deg, ${theme.colors.nodes.input}22, transparent)`;
      case "out":
        return `linear-gradient(45deg, ${theme.colors.nodes.output}22, transparent)`;
      default:
        return theme.colors.background.secondary;
    }
  }};
  border: 1px solid
    ${({ theme, type }) => {
      switch (type) {
        case "osc":
        case "noise":
          return theme.colors.nodes.audio;
        case "amp":
        case "flanger":
        case "chorus":
        case "phaser":
          return theme.colors.nodes.effect;
        case "waveform":
          return theme.colors.nodes.input;
        case "out":
          return theme.colors.nodes.output;
        default:
          return theme.colors.background.tertiary;
      }
    }};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 220px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;

  /* Increase the clickable area around the node */
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    z-index: -1;
  }

  /* Style for React Flow handles */
  .react-flow__handle {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.background.primary};
    border: 2px solid ${({ theme }) => theme.colors.background.tertiary};
    transition: all ${({ theme }) => theme.transitions.default};

    &:hover {
      width: 14px;
      height: 14px;
      border-radius: 7px;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    /* Increase the clickable area of handles */
    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      z-index: -1;
    }

    /* Position adjustments for handles */
    &.react-flow__handle-top {
      top: -6px;
    }
    &.react-flow__handle-bottom {
      bottom: -6px;
    }
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    transform: translateY(-1px);

    .react-flow__handle {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  .node-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    h3 {
      margin: 0;
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  .node-content {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};

    label {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.spacing.xs};

      .label-text {
        display: flex;
        justify-content: space-between;
        font-size: ${({ theme }) => theme.typography.fontSize.sm};
        color: ${({ theme }) => theme.colors.text.secondary};
      }
    }

    input[type="range"] {
      width: 100%;
      margin: 0;
    }

    select {
      width: 100%;
      padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
      background: ${({ theme }) => theme.colors.background.primary};
      border: 1px solid ${({ theme }) => theme.colors.background.tertiary};
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      color: ${({ theme }) => theme.colors.text.primary};
      font-size: ${({ theme }) => theme.typography.fontSize.sm};
      cursor: pointer;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary.main};
      }

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary.main};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary.main}22;
      }
    }
  }
`;
