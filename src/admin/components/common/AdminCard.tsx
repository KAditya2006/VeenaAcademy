import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-token2xl border border-border bg-card shadow-level1", className)}>{children}</div>;
}


