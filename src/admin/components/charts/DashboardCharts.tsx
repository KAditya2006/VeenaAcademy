import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Funnel, FunnelChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AdminCard } from "../common/AdminCard";
import type { DashboardAnalytics } from "../../types";

const chartColors = ["#08265c", "#ff7a1a", "#2563eb", "#16a34a", "#f59e0b"];

export function LeadsTrendChart({ data }: { data: DashboardAnalytics["leadsTrend"] }) {
  return <AdminCard className="p-5"><h3 className="text-lg font-black text-primary">Leads Trend</h3><div className="mt-5 h-72"><ResponsiveContainer><AreaChart data={data}><defs><linearGradient id="leads" x1="0" x2="0" y1="0" y2="1"><stop offset="5%" stopColor="#08265c" stopOpacity={0.28} /><stop offset="95%" stopColor="#08265c" stopOpacity={0} /></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e7eef8" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Area type="monotone" dataKey="leads" stroke="#08265c" fill="url(#leads)" strokeWidth={3} /></AreaChart></ResponsiveContainer></div></AdminCard>;
}

export function CoursePopularityChart({ data }: { data: DashboardAnalytics["coursePopularity"] }) {
  return <AdminCard className="p-5"><h3 className="text-lg font-black text-primary">Course Popularity</h3><div className="mt-5 h-72"><ResponsiveContainer><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#e7eef8" /><XAxis dataKey="course" /><YAxis /><Tooltip /><Bar dataKey="enquiries" radius={[12, 12, 0, 0]}>{data.map((_, index) => <Cell key={index} fill={chartColors[index % chartColors.length]} />)}</Bar></BarChart></ResponsiveContainer></div></AdminCard>;
}

export function FunnelPanel({ data }: { data: DashboardAnalytics["funnel"] }) {
  return <AdminCard className="p-5"><h3 className="text-lg font-black text-primary">Conversion Funnel</h3><div className="mt-5 h-72"><ResponsiveContainer><FunnelChart><Tooltip /><Funnel dataKey="value" data={data} nameKey="stage">{data.map((_, index) => <Cell key={index} fill={chartColors[index % chartColors.length]} />)}</Funnel></FunnelChart></ResponsiveContainer></div></AdminCard>;
}

