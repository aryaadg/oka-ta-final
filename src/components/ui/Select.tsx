import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
 label?: string;
 error?: string;
 options: { label: string; value: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
 ({ label, error, options, className = "", id, ...props }, ref) => {
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
 <select
 ref={ref}
 id={inputId}
 className={`w-full min-h-[44px] px-3 py-2 bg-gym-darkCard dark:bg-card border rounded-[4px] text-base text-foreground dark:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold ${
 error
 ? "border-needle focus:ring-needle"
 : "border-gym-darkBorder dark:border-graphite focus:border-gym-gold"
 } ${className}`}
 {...props}
 >
 {options.map((opt) => (
 <option key={opt.value} value={opt.value}>
 {opt.label}
 </option>
 ))}
 </select>
 {error && <span className="text-xs text-needle font-medium">{error}</span>}
 </div>
 );
 }
);

Select.displayName = "Select";
