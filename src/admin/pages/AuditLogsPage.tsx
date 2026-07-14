import { useQuery } from "@tanstack/react-query";
import { AdminCard } from "../components/common/AdminCard";
import { adminApi } from "../lib/api";

export default function AuditLogsPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-activities"], queryFn: adminApi.listActivities });
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Audit</p><h2 className="font-display text-5xl text-primary">Audit Logs</h2><p className="mt-2 text-text-secondary">Track login, content changes, user updates, publish actions, delete actions and settings changes.</p></div><AdminCard className="p-5"><div className="grid gap-4">{data.map((item) => <div key={item.id} className="grid gap-3 rounded-tokenXl border border-border p-4 md:grid-cols-[1fr_1fr_1fr_auto]"><p className="font-black text-primary">{item.action}</p><p className="text-text-secondary">{item.module}</p><p className="text-text-muted">{item.user}</p><p className="text-sm font-bold text-text-muted">{item.timestamp}</p></div>)}</div></AdminCard></div>;
}


