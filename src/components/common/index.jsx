import React from "react";
import { twMerge } from "tailwind-merge";

export const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all duration-200 gap-xs";

    const variantClasses = {
      primary:
        "bg-primary-main text-primary-contrast hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0",
      secondary:
        "bg-background-tertiary text-text-primary hover:bg-background-secondary hover:-translate-y-0.5 active:translate-y-0",
      ghost: "bg-transparent text-text-primary hover:bg-background-secondary",
    };

    const sizeClasses = {
      sm: "px-sm py-xs text-sm",
      md: "px-md py-sm text-base",
      lg: "px-lg py-md text-lg",
    };

    const classes = twMerge(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      "rounded-md",
      disabled && "opacity-50 cursor-not-allowed transform-none",
      className
    );

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

export const Card = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const classes = twMerge(
      "bg-background-secondary rounded-lg p-lg shadow-md border border-background-tertiary transition-all duration-200 hover:shadow-lg",
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  const classes = twMerge(
    "w-full px-md py-sm bg-background-tertiary border border-background-tertiary rounded-md text-text-primary font-primary text-base transition-all duration-200 focus:outline-none focus:border-primary-main focus:bg-background-secondary placeholder:text-text-disabled",
    className
  );

  return <input ref={ref} className={classes} {...props} />;
});

export const Select = React.forwardRef(({ className, ...props }, ref) => {
  const classes = twMerge(
    "w-full px-md py-sm bg-background-tertiary border border-background-tertiary rounded-md text-text-primary font-primary text-base transition-all duration-200 focus:outline-none focus:border-primary-main focus:bg-background-secondary cursor-pointer",
    className
  );

  return <select ref={ref} className={classes} {...props} />;
});

export const Slider = React.forwardRef(({ className, ...props }, ref) => {
  const classes = twMerge(
    "w-full h-0.5 bg-background-tertiary rounded-full cursor-pointer my-md appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-primary-main [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background-primary [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:bg-primary-light focus:outline-none",
    className
  );

  return <input ref={ref} type="range" className={classes} {...props} />;
});

export const Badge = React.forwardRef(
  ({ children, className, ...props }, ref) => {
    const classes = twMerge(
      "inline-flex items-center px-xs py-xxs bg-background-tertiary text-text-primary rounded-full text-sm font-medium tracking-wide",
      className
    );

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    );
  }
);

export const Flex = React.forwardRef(
  (
    {
      children,
      gap = "",
      align = "center",
      justify = "start",
      direction = "row",
      wrap = "nowrap",
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "flex",
      gap && `gap-${gap}`,
      `items-${align}`,
      `justify-${justify}`,
      `flex-${direction}`,
      `flex-${wrap}`,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

export const Grid = React.forwardRef(
  (
    {
      children,
      gap = "",
      columns = 1,
      align = "start",
      justify = "start",
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "grid",
      gap && `gap-${gap}`,
      `grid-cols-${columns}`,
      `items-${align}`,
      `justify-${justify}`,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

export const Text = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      weight = "normal",
      lineHeight = "normal",
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      `text-text-${variant}`,
      `text-${size}`,
      `font-${weight}`,
      `leading-${lineHeight}`,
      size === "sm" ? "tracking-wider" : "tracking-wide",
      "m-0",
      className
    );

    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);

export const BaseNode = React.forwardRef(
  ({ children, type, className, ...props }, ref) => {
    const getNodeColors = () => {
      switch (type) {
        case "osc":
        case "noise":
          return "bg-white dark:bg-gray-800 border-l-4 border-nodes-audio shadow-[0_0_0_1px] shadow-nodes-audio/30";
        case "amp":
        case "flanger":
        case "chorus":
        case "phaser":
          return "bg-white dark:bg-gray-800 border-l-4 border-nodes-effect shadow-[0_0_0_1px] shadow-nodes-effect/30";
        case "waveform":
          return "bg-white dark:bg-gray-800 border-l-4 border-nodes-input shadow-[0_0_0_1px] shadow-nodes-input/30";
        case "out":
          return "bg-white dark:bg-gray-800 border-l-4 border-nodes-output shadow-[0_0_0_1px] shadow-nodes-output/30";
        default:
          return "bg-white dark:bg-gray-800 border-l-4 border-primary-main shadow-[0_0_0_1px] shadow-primary-main/30";
      }
    };

    const classes = twMerge(
      "rounded-lg p-md min-w-[220px] transition-all duration-200 relative hover:-translate-y-0.5",
      "shadow-lg hover:shadow-xl",
      getNodeColors(),
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="node-header" data-type={type}>
          {children}
        </div>
      </div>
    );
  }
);
