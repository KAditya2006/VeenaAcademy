import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; options: Array<{ label: string; value: string }> };

export function Select({ label, error, id, className, options, ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <label className="grid gap-2 text-sm font-bold text-primary" htmlFor={selectId}>
      {label}
      <select id={selectId} className={cn("form-field", error && "border-error", className)} aria-invalid={Boolean(error)} aria-describedby={error ? `${selectId}-error` : undefined} {...props}>
        <option value="">Select option</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      {error && <span id={`${selectId}-error`} className="text-sm font-semibold text-error">{error}</span>}
    </label>
  );
}
