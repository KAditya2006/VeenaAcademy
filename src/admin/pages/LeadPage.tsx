import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Download, UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { AdminCard } from "../components/common/AdminCard";
import { AdminSearch } from "../components/common/AdminSearch";
import { StatusBadge } from "../components/common/StatusBadge";
import { adminApi } from "../lib/api";
import { useDebounce } from "../hooks/useDebounce";

export default function LeadPage({ title, description }: { title: string; description: string }) {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query);
  const { data = [], isLoading } = useQuery({ queryKey: ["admin-leads"], queryFn: adminApi.listLeads });
  const filtered = useMemo(() => data.filter((lead) => `${lead.studentName} ${lead.phone} ${lead.course} ${lead.status}`.toLowerCase().includes(debounced.toLowerCase())), [data, debounced]);
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">CRM</p><h2 className="font-display text-5xl text-primary">{title}</h2><p className="mt-2 max-w-3xl text-text-secondary">{description}</p></div><div className="flex flex-col gap-3 sm:flex-row"><Button variant="secondary" leftIcon={<Download size={18} />}>Export CSV</Button><Button leftIcon={<UserPlus size={18} />}>Assign Counsellor</Button></div></div><AdminCard className="p-5"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><AdminSearch value={query} onChange={setQuery} placeholder="Search leads, phone, course" /><div className="flex flex-wrap gap-2">{["New", "Contacted", "Demo Scheduled", "Converted", "Closed"].map((status) => <button key={status} type="button" className="rounded-tokenPill border border-border px-3 py-2 text-sm font-bold text-primary hover:bg-primary-light">{status}</button>)}</div></div></AdminCard>{isLoading ? <div className="h-80 animate-pulse rounded-token2xl bg-card" /> : <div className="grid gap-4 lg:grid-cols-2">{filtered.map((lead) => <AdminCard key={lead.id} className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="text-xl font-black text-primary">{lead.studentName}</h3><p className="mt-1 text-sm font-semibold text-text-muted">{lead.phone}</p></div><StatusBadge status={lead.status} /></div><div className="mt-5 grid gap-3 text-sm text-text-secondary sm:grid-cols-2"><p><strong>Course:</strong> {lead.course}</p><p><strong>Source:</strong> {lead.source}</p><p><strong>Assigned:</strong> {lead.assignedTo}</p><p className="flex items-center gap-2"><CalendarClock size={16} className="text-accent" /> {lead.followUp}</p></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm">Add Note</Button><Button size="sm" variant="secondary">Update Status</Button><Button size="sm" variant="ghost">Timeline</Button></div></AdminCard>)}</div>}</div>;
}


