import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "stencil" | "outline" | "paper" | "ghost" | "needle";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "stencil",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-sans font-semibold rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gym-gold disabled:opacity-50 disabled:pointer-events-none select-none min-h-[44px]";

  const variantClasses = {
    stencil:
      "bg-gym-gold text-gym-dark font-bold hover:bg-[#d9ae15] active:bg-[#c29b12]",
    outline:
      "border-2 border-gym-gold text-gym-gold bg-transparent hover:bg-gym-gold/10 active:bg-gym-gold/20",
    paper:
      "bg-gym-darkCard text-foreground hover:bg-white/10 active:bg-white/15 border border-gym-darkBorder",
    ghost:
      "bg-transparent text-muted-foreground hover:bg-white/10 hover:text-white",
    needle:
      "bg-needle text-white hover:bg-red-600 active:bg-red-700",
  }[variant];

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm min-h-[36px]",
    md: "px-5 py-2.5 text-base min-h-[44px]",
    lg: "px-7 py-3.5 text-lg min-h-[52px]",
  }[size];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
