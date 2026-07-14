import { MoreHorizontal } from "lucide-react";
import type { AdminRecord } from "../../types";
import { StatusBadge } from "./StatusBadge";
import { EmptyState } from "./EmptyState";

export function DataTable({ records }: { records: AdminRecord[] }) {
  if (records.length === 0) return <EmptyState />;
  return <div className="overflow-hidden rounded-token2xl border border-border bg-card"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-divider text-sm"><thead className="bg-surface text-left text-xs uppercase tracking-[0.14em] text-text-muted"><tr><th className="px-5 py-4">Name</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Owner</th><th className="px-5 py-4">Metric</th><th className="px-5 py-4">Updated</th><th className="px-5 py-4 text-right">Actions</th></tr></thead><tbody className="divide-y divide-divider">{records.map((record) => <tr key={record.id} className="hover:bg-surface/60"><td className="px-5 py-4"><p className="font-black text-text-primary">{record.title}</p><p className="mt-1 text-text-muted">{record.subtitle}</p></td><td className="px-5 py-4"><StatusBadge status={record.status} /></td><td className="px-5 py-4 text-text-secondary">{record.owner}</td><td className="px-5 py-4 font-semibold text-primary">{record.metric}</td><td className="px-5 py-4 text-text-muted">{record.updatedAt}</td><td className="px-5 py-4 text-right"><button type="button" aria-label={`Open actions for ${record.title}`} className="rounded-tokenPill p-2 text-text-muted hover:bg-primary-light hover:text-primary"><MoreHorizontal size={18} /></button></td></tr>)}</tbody></table></div></div>;
}


