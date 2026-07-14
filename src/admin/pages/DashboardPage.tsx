import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, Plus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { AdminCard } from "../components/common/AdminCard";
import { DataTable } from "../components/common/DataTable";
import { LeadsTrendChart, CoursePopularityChart, FunnelPanel } from "../components/charts/DashboardCharts";
import { adminApi } from "../lib/api";

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ["admin-dashboard"], queryFn: adminApi.getDashboard });
  const { data: activities = [] } = useQuery({ queryKey: ["admin-activities"], queryFn: adminApi.listActivities });
  const { data: leads = [] } = useQuery({ queryKey: ["admin-leads"], queryFn: adminApi.listLeads });
  if (!data) return <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-32 animate-pulse rounded-token2xl bg-card" />)}</div>;
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Overview</p><h2 className="font-display text-5xl text-primary">Platform command center</h2><p className="mt-2 text-text-secondary">Track admissions, content, performance and team activity from one place.</p></div><Button rightIcon={<Plus size={18} />}>Create New</Button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{data.cards.map((card) => <AdminCard key={card.label} className="p-5"><p className="text-sm font-bold text-text-muted">{card.label}</p><div className="mt-4 flex items-end justify-between"><p className="font-display text-4xl text-primary">{card.value}</p><span className="rounded-tokenPill bg-success/10 px-2 py-1 text-xs font-black text-success">{card.change}</span></div></AdminCard>)}</div><div className="grid gap-5 xl:grid-cols-2"><LeadsTrendChart data={data.leadsTrend} /><CoursePopularityChart data={data.coursePopularity} /></div><div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]"><FunnelPanel data={data.funnel} /><AdminCard className="p-5"><div className="flex items-center justify-between"><h3 className="text-lg font-black text-primary">Recent Activities</h3><ArrowUpRight size={18} className="text-accent" /></div><div className="mt-5 space-y-4">{activities.map((item) => <div key={item.id} className="flex items-start justify-between gap-4 rounded-tokenXl bg-surface p-4"><div><p className="font-bold text-text-primary">{item.action}</p><p className="mt-1 text-sm text-text-muted">{item.user} • {item.module}</p></div><span className="text-xs font-bold text-text-muted">{item.timestamp}</span></div>)}</div></AdminCard></div><AdminCard className="p-5"><h3 className="text-lg font-black text-primary">Recent Enquiries</h3><div className="mt-5 overflow-x-auto"><table className="min-w-full text-sm"><tbody>{leads.slice(0, 4).map((lead) => <tr key={lead.id} className="border-t border-divider"><td className="py-3 font-black text-text-primary">{lead.studentName}</td><td className="py-3 text-text-secondary">{lead.course}</td><td className="py-3 text-text-muted">{lead.status}</td><td className="py-3 text-right text-primary">{lead.followUp}</td></tr>)}</tbody></table></div></AdminCard></div>;
}


