import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="grid gap-2 text-sm font-bold text-primary" htmlFor={inputId}>
      {label}
      <input id={inputId} className={cn("form-field", error && "border-error", className)} aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} {...props} />
      {error && <span id={`${inputId}-error`} className="text-sm font-semibold text-error">{error}</span>}
    </label>
  );
}
