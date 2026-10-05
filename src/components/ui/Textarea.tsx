import React from "react";

interface TextareaProps
 extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
 label?: string;
 error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
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
 <textarea
 ref={ref}
 id={inputId}
 className={`w-full p-3 bg-gym-darkCard dark:bg-card border rounded-[4px] text-base text-foreground dark:text-muted-foreground placeholder:text-graphite/50 dark:placeholder:text-muted-foreground/40 transition-colors focus:outline-none focus:ring-2 focus:ring-gym-gold min-h-[120px] ${
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

Textarea.displayName = "Textarea";
