import React from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className,
  width,
  ...props
}) => {
  const variantStyles = {
    primary:
      "bg-blue-500 text-white hover:enabled:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400",
    secondary:
      "bg-gray-100 text-gray-600 hover:enabled:bg-gray-200 disabled:opacity-60",
  };

  return (
    <button
      aria-role="button"
      className={cn(
        "px-4 py-2 rounded text-base transition-all duration-200",
        variantStyles[variant],
        "disabled:cursor-not-allowed",
        className,
      )}
      style={width ? { width } : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
