import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 label?: string;
 error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
 ({ label, error, className = "", id, ...props }, ref) => {
 const inputId = id || props.name;

 return (
 <div className="w-full flex flex-col gap-1.5">
 {label && (
 <label
 htmlFor={inputId}
 className="text-sm font-medium text-graphite dark:text-muted-foreground/90"
 >
 {label}
 </label>
 )}
 <input
 ref={ref}
 id={inputId}
 className={`w-full min-h-[44px] px-3 py-2 bg-gym-darkCard dark:bg-card border rounded-[4px] text-base text-foreground dark:text-muted-foreground placeholder:text-graphite/50 dark:placeholder:text-muted-foreground/40 transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold ${
 error
 ? "border-needle focus:ring-needle"
 : "border-gym-darkBorder dark:border-graphite focus:border-gym-gold"
 } ${className}`}
 {...props}
 />
 {error && <span className="text-xs text-needle font-medium">{error}</span>}
 </div>
 );
 }
);

Input.displayName = "Input";
