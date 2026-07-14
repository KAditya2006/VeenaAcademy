import type { ComponentType } from "react";

export const adminRoles = ["super_admin", "admin", "counsellor", "content_manager", "faculty"] as const;
export type AdminRole = (typeof adminRoles)[number];
export type AdminTheme = "light" | "dark";

export const adminRoleLabels: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  counsellor: "Counsellor",
  content_manager: "Content Manager",
  faculty: "Faculty",
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string | null;
  avatarInitials: string;
  status: "Active" | "Inactive";
  isActive: boolean;
};

export type PermissionKey =
  | "dashboard:read"
  | "content:manage"
  | "leads:manage"
  | "settings:manage"
  | "users:manage"
  | "audit:read"
  | "profile:manage";

export type AdminNavItem = {
  label: string;
  path: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  permission?: PermissionKey;
};

export type ModuleStatus = "Published" | "Draft" | "Archived" | "New" | "Contacted" | "Demo Scheduled" | "Converted" | "Closed";

export type AdminRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: ModuleStatus;
  owner: string;
  updatedAt: string;
  metric?: string;
};

export type LeadRecord = {
  id: string;
  studentName: string;
  phone: string;
  course: string;
  source: string;
  status: ModuleStatus;
  assignedTo: string;
  followUp: string;
};

export type Activity = {
  id: string;
  user: string;
  action: string;
  module: string;
  timestamp: string;
};

export type DashboardAnalytics = {
  cards: Array<{ label: string; value: string; change: string }>;
  leadsTrend: Array<{ day: string; leads: number }>;
  coursePopularity: Array<{ course: string; enquiries: number }>;
  funnel: Array<{ stage: string; value: number }>;
  monthlyAdmissions: Array<{ month: string; admissions: number }>;
  sources: Array<{ source: string; value: number }>;
};
