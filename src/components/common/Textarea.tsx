import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string };

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <label className="grid gap-2 text-sm font-bold text-primary" htmlFor={textareaId}>
      {label}
      <textarea id={textareaId} className={cn("form-field min-h-32", error && "border-error", className)} aria-invalid={Boolean(error)} aria-describedby={error ? `${textareaId}-error` : undefined} {...props} />
      {error && <span id={`${textareaId}-error`} className="text-sm font-semibold text-error">{error}</span>}
    </label>
  );
}
