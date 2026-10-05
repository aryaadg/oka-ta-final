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
 "inline-flex items-center justify-center font-sans font-semibold rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gym-gold focus-visible: disabled:opacity-50 disabled:pointer-events-none select-none min-h-[44px]";

 const variantClasses = {
 stencil: "bg-stencil text-white hover:bg-[#3B47B2] active:bg-[#323D9A]",
 outline:
 "border-2 border-gym-gold text-gym-gold bg-transparent hover:bg-stencil/10 active:bg-stencil/20",
 paper: "bg-background text-foreground hover:bg-gym-darkCard active:bg-background/80 border border-gym-darkBorder",
 ghost: "bg-transparent text-muted-foreground hover:bg-card/80 hover:text-white",
 needle: "bg-needle text-white hover:bg-[#9B1F18] active:bg-[#831A14]",
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
