import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "stencil" | "paper" | "ink" | "new" | "replied" | "done";
  className?: string;
}

export function Badge({
  children,
  variant = "stencil",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    stencil: "bg-gym-gold/15 text-gym-gold border border-gym-gold/30",
    paper: "bg-gym-darkCard text-foreground border border-gym-darkBorder",
    ink: "bg-card text-muted-foreground border border-gym-darkBorder",
    new: "bg-gym-gold text-gym-dark font-bold",
    replied:
      "bg-amber-500/20 text-amber-300 border border-amber-500/40",
    done:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-[2px] text-xs font-semibold ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
