import { Save } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { AdminCard } from "../components/common/AdminCard";
import { adminRoleLabels } from "../types";
import { useAdminAuth } from "../lib/auth";

export default function ProfilePage() {
  const { user } = useAdminAuth();
  return <div className="space-y-6"><div><p className="text-sm font-bold uppercase tracking-[0.16em] text-text-muted">Account</p><h2 className="font-display text-5xl text-primary">Profile</h2><p className="mt-2 text-text-secondary">Manage your admin profile and account details.</p></div><AdminCard className="p-6"><div className="mb-6 flex items-center gap-4"><span className="grid h-16 w-16 place-items-center rounded-tokenPill bg-primary text-lg font-black text-text-inverse">{user?.avatarInitials}</span><div><h3 className="text-xl font-black text-primary">{user?.name}</h3><p className="text-text-muted">{user ? adminRoleLabels[user.role] : "Admin"}</p></div></div><div className="grid gap-5 lg:grid-cols-2"><Input label="Name" defaultValue={user?.name} /><Input label="Email" defaultValue={user?.email} /><Input label="Role" defaultValue={user ? adminRoleLabels[user.role] : ""} disabled /><Input label="Status" defaultValue={user?.status} disabled /></div><Button className="mt-6" leftIcon={<Save size={18} />}>Save Profile</Button></AdminCard></div>;
}
