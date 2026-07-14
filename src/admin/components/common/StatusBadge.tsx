import { cn } from "../../../lib/cn";
import type { ModuleStatus } from "../../types";

const styles: Record<ModuleStatus, string> = {
  Published: "bg-success/10 text-success border-success/20",
  Draft: "bg-warning/10 text-warning border-warning/20",
  Archived: "bg-text-muted/10 text-text-muted border-border",
  New: "bg-info/10 text-info border-info/20",
  Contacted: "bg-primary-light text-primary border-primary/15",
  "Demo Scheduled": "bg-accent-light text-accent border-accent/20",
  Converted: "bg-success/10 text-success border-success/20",
  Closed: "bg-text-muted/10 text-text-muted border-border",
};

export function StatusBadge({ status, className }: { status: ModuleStatus; className?: string }) {
  return <span className={cn("inline-flex rounded-tokenPill border px-2.5 py-1 text-xs font-black", styles[status], className)}>{status}</span>;
}

