import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-text-inverse shadow-glow hover:bg-accent-hover hover:shadow-level2",
  secondary: "border border-border bg-card text-primary shadow-level1 hover:border-accent/40 hover:bg-accent-light",
  outline: "border border-border bg-transparent text-primary hover:bg-primary-light",
  ghost: "bg-transparent text-primary hover:bg-primary-light",
  link: "bg-transparent px-0 text-primary underline-offset-4 hover:text-accent hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-7 text-base",
};

const base = "inline-flex items-center justify-center gap-2 rounded-tokenPill font-bold transition duration-normal hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

export function Button({ variant = "primary", size = "md", loading, leftIcon, rightIcon, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 className="animate-spin" size={18} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}

export function AnchorButton({ variant = "primary", size = "md", loading, leftIcon, rightIcon, className, children, ...props }: AnchorButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {loading ? <Loader2 className="animate-spin" size={18} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </a>
  );
}
