import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { adminNavigation } from "../../data/mockAdmin";
import { adminRoleLabels } from "../../types";
import { useAdminAuth } from "../../lib/auth";
import { cn } from "../../../lib/cn";

export function AdminSidebar({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const { hasPermission, logout, user } = useAdminAuth();
  const items = adminNavigation.filter((item) => hasPermission(item.permission));
  return <aside className="flex h-full flex-col border-r border-border bg-card"><div className="flex h-16 items-center gap-3 border-b border-divider px-4"><span className="grid h-10 w-10 place-items-center rounded-tokenXl bg-primary text-sm font-black text-text-inverse">V</span>{!collapsed && <div><p className="font-black text-primary">Veena Admin</p><p className="text-xs font-semibold text-text-muted">{user ? adminRoleLabels[user.role] : "Admin"}</p></div>}</div><nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin navigation">{items.map((item) => <NavLink key={item.path} to={item.path} end={item.path === "/admin"} onClick={onNavigate} className={({ isActive }) => cn("flex items-center gap-3 rounded-tokenXl px-3 py-2.5 text-sm font-bold transition", isActive ? "bg-primary text-text-inverse shadow-level1" : "text-text-secondary hover:bg-primary-light hover:text-primary")}><item.icon size={19} />{!collapsed && <span>{item.label}</span>}</NavLink>)}</nav><div className="border-t border-divider p-3"><button type="button" onClick={() => void logout()} className="flex w-full items-center gap-3 rounded-tokenXl px-3 py-2.5 text-sm font-bold text-text-secondary hover:bg-error/10 hover:text-error"><LogOut size={19} />{!collapsed && <span>Logout</span>}</button></div></aside>;
}
