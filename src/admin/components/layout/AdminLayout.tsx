import type { CSSProperties } from "react";
import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import type { AdminTheme } from "../../types";
import { useAdminAuth } from "../../lib/auth";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { cn } from "../../../lib/cn";

function AdminAuthLoader() {
  return <section className="grid min-h-screen place-items-center bg-surface"><div className="rounded-token2xl border border-border bg-card p-6 text-center shadow-level2"><span className="eyebrow">Checking session</span><p className="mt-3 font-bold text-primary">Securing Veena Admin...</p></div></section>;
}

export function ProtectedAdminRoute() {
  const { isAuthenticated, isInitializing } = useAdminAuth();
  const location = useLocation();
  if (isInitializing) return <AdminAuthLoader />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<AdminTheme>("light");

  return <div className={cn("min-h-screen bg-surface text-text-primary", theme === "dark" && "bg-[#071429]")}> <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:block" style={{ width: collapsed ? 76 : 280 }}><AdminSidebar collapsed={collapsed} /></div>{mobileOpen && <div className="fixed inset-0 z-50 bg-overlay lg:hidden"><div className="h-full w-80 max-w-[86vw]"><AdminSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} /></div><button type="button" className="absolute inset-0 -z-10" onClick={() => setMobileOpen(false)} aria-label="Close admin menu" /></div>}<div className="transition-all duration-normal lg:ml-[var(--admin-sidebar)]" style={{ "--admin-sidebar": `${collapsed ? 76 : 280}px` } as CSSProperties}><div className="hidden lg:block"><AdminTopbar onMenu={() => setCollapsed((value) => !value)} theme={theme} setTheme={setTheme} /></div><div className="lg:hidden"><AdminTopbar onMenu={() => setMobileOpen(true)} theme={theme} setTheme={setTheme} /></div><main className="p-4 lg:p-6"><Outlet /></main></div></div>;
}
