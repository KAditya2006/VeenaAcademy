import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { AdminCard } from "../components/common/AdminCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { adminRoleLabels } from "../types";
import { adminApi } from "../lib/api";

export default function UsersPage() {
  const { data = [] } = useQuery({ queryKey: ["admin-users"], queryFn: adminApi.listUsers });
  return <div className="space-y-6"><div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Security</p><h2 className="font-display text-5xl text-primary">Users & Roles</h2><p className="mt-2 text-text-secondary">Create users, assign roles, deactivate accounts and manage permissions.</p></div><Button leftIcon={<UserPlus size={18} />}>Create User</Button></div><div className="grid gap-4 lg:grid-cols-2">{data.map((user) => <AdminCard key={user.id} className="p-5"><div className="flex items-start justify-between gap-4"><div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-tokenPill bg-primary text-sm font-black text-text-inverse">{user.avatarInitials}</span><div><h3 className="text-lg font-black text-primary">{user.name}</h3><p className="text-sm text-text-muted">{user.email}</p></div></div><StatusBadge status={user.status === "Active" ? "Published" : "Archived"} /></div><div className="mt-5 rounded-tokenXl bg-surface p-4"><p className="text-sm font-bold text-text-muted">Role</p><p className="mt-1 font-black text-text-primary">{adminRoleLabels[user.role]}</p></div><div className="mt-5 flex flex-wrap gap-2"><Button size="sm">Edit</Button><Button size="sm" variant="secondary">Reset Password</Button><Button size="sm" variant="ghost">Permissions</Button></div></AdminCard>)}</div></div>;
}
