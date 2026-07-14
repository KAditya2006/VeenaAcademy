import { useQuery } from "@tanstack/react-query";
import { CoursePopularityChart, FunnelPanel, LeadsTrendChart } from "../components/charts/DashboardCharts";
import { AdminCard } from "../components/common/AdminCard";
import { adminApi } from "../lib/api";

export default function AnalyticsPage() {
  const { data } = useQuery({ queryKey: ["admin-dashboard"], queryFn: adminApi.getDashboard });
  if (!data) return <div className="h-96 animate-pulse rounded-token2xl bg-card" />;
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Analytics</p><h2 className="font-display text-5xl text-primary">Growth Analytics</h2><p className="mt-2 text-text-secondary">Understand admissions, course demand, lead sources and conversion movement.</p></div><div className="grid gap-5 xl:grid-cols-2"><LeadsTrendChart data={data.leadsTrend} /><CoursePopularityChart data={data.coursePopularity} /><FunnelPanel data={data.funnel} /><AdminCard className="p-5"><h3 className="text-lg font-black text-primary">Source Analytics</h3><div className="mt-5 grid gap-3">{data.sources.map((source) => <div key={source.source} className="rounded-tokenXl bg-surface p-4"><div className="flex items-center justify-between"><span className="font-bold text-text-primary">{source.source}</span><span className="font-display text-3xl text-primary">{source.value}%</span></div><div className="mt-3 h-2 rounded-tokenPill bg-primary-light"><div className="h-2 rounded-tokenPill bg-accent" style={{ width: `${source.value}%` }} /></div></div>)}</div></AdminCard></div></div>;
}


