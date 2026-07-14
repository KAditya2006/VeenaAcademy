import {
  Activity,
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  GalleryHorizontal,
  GraduationCap,
  Home,
  Image,
  KeyRound,
  LayoutDashboard,
  Mail,
  Megaphone,
  MessageSquareText,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  Upload,
  UserCog,
  Users,
} from "lucide-react";
import type { Activity as ActivityRecord, AdminNavItem, AdminRecord, AdminRole, DashboardAnalytics, LeadRecord, PermissionKey } from "../types";
import { courses } from "../../data/courses";
import { faculty } from "../../data/faculty";
import { results } from "../../data/results";
import { gallery } from "../../data/gallery";
import { testimonials } from "../../data/testimonials";
import { blogPosts } from "../../data/blogs";

export const rolePermissions: Record<AdminRole, PermissionKey[]> = {
  super_admin: ["dashboard:read", "content:manage", "leads:manage", "settings:manage", "users:manage", "audit:read", "profile:manage"],
  admin: ["dashboard:read", "content:manage", "leads:manage", "settings:manage", "profile:manage"],
  counsellor: ["dashboard:read", "leads:manage", "profile:manage"],
  content_manager: ["dashboard:read", "content:manage", "profile:manage"],
  faculty: ["dashboard:read", "profile:manage"],
};

export const currentAdmin = {
  id: "admin-1",
  name: "Veena Admin",
  email: "admin@veenaacademy.in",
  role: "super_admin" as AdminRole,
  avatarInitials: "VA",
  status: "Active" as const,
  isActive: true,
};

export const adminNavigation: AdminNavItem[] = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, permission: "dashboard:read" },
  { label: "Courses", path: "/admin/courses", icon: BookOpen, permission: "content:manage" },
  { label: "Faculty", path: "/admin/faculty", icon: GraduationCap, permission: "content:manage" },
  { label: "Results", path: "/admin/results", icon: Trophy, permission: "content:manage" },
  { label: "Gallery", path: "/admin/gallery", icon: GalleryHorizontal, permission: "content:manage" },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star, permission: "content:manage" },
  { label: "Notices", path: "/admin/notices", icon: Megaphone, permission: "content:manage" },
  { label: "Blogs", path: "/admin/blogs", icon: FileText, permission: "content:manage" },
  { label: "Admissions", path: "/admin/admissions", icon: Users, permission: "leads:manage" },
  { label: "Demo Requests", path: "/admin/demo-requests", icon: MessageSquareText, permission: "leads:manage" },
  { label: "Scholarship", path: "/admin/scholarship", icon: BriefcaseBusiness, permission: "leads:manage" },
  { label: "Contact Messages", path: "/admin/contact-messages", icon: Mail, permission: "leads:manage" },
  { label: "Media Library", path: "/admin/media", icon: Upload, permission: "content:manage" },
  { label: "Website Settings", path: "/admin/settings", icon: Settings, permission: "settings:manage" },
  { label: "SEO", path: "/admin/seo", icon: Search, permission: "settings:manage" },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3, permission: "dashboard:read" },
  { label: "Users & Roles", path: "/admin/users", icon: UserCog, permission: "users:manage" },
  { label: "Audit Logs", path: "/admin/audit-logs", icon: Activity, permission: "audit:read" },
  { label: "Profile", path: "/admin/profile", icon: Home, permission: "profile:manage" },
  { label: "Change Password", path: "/admin/change-password", icon: KeyRound, permission: "profile:manage" },
];

export const dashboardAnalytics: DashboardAnalytics = {
  cards: [
    { label: "Total Leads", value: "1,284", change: "+18%" },
    { label: "Today's Leads", value: "42", change: "+9%" },
    { label: "Active Courses", value: String(courses.length), change: "+2" },
    { label: "Published Blogs", value: String(blogPosts.length), change: "+3" },
    { label: "Faculty Count", value: String(faculty.length), change: "+1" },
    { label: "Gallery Items", value: String(gallery.length), change: "+12" },
    { label: "Demo Requests", value: "86", change: "+11%" },
    { label: "Scholarship Registrations", value: "214", change: "+24%" },
    { label: "Contact Messages", value: "138", change: "+6%" },
  ],
  leadsTrend: [
    { day: "Mon", leads: 24 }, { day: "Tue", leads: 32 }, { day: "Wed", leads: 28 }, { day: "Thu", leads: 46 }, { day: "Fri", leads: 42 }, { day: "Sat", leads: 55 }, { day: "Sun", leads: 31 },
  ],
  coursePopularity: [
    { course: "JEE", enquiries: 320 }, { course: "NEET", enquiries: 286 }, { course: "Boards", enquiries: 242 }, { course: "CUET", enquiries: 165 }, { course: "SSC", enquiries: 112 },
  ],
  funnel: [
    { stage: "New", value: 620 }, { stage: "Contacted", value: 430 }, { stage: "Demo", value: 210 }, { stage: "Converted", value: 96 },
  ],
  monthlyAdmissions: [
    { month: "Jan", admissions: 34 }, { month: "Feb", admissions: 42 }, { month: "Mar", admissions: 51 }, { month: "Apr", admissions: 49 }, { month: "May", admissions: 64 }, { month: "Jun", admissions: 72 },
  ],
  sources: [
    { source: "Website", value: 46 }, { source: "WhatsApp", value: 28 }, { source: "Referral", value: 16 }, { source: "Walk-in", value: 10 },
  ],
};

export const moduleRecords: Record<string, AdminRecord[]> = {
  courses: courses.map((course, index) => ({ id: course.id, title: course.title, subtitle: `${course.category} • ${course.duration}`, status: index < 7 ? "Published" : "Draft", owner: "Content Team", updatedAt: "Today", metric: course.eligibility })),
  faculty: faculty.map((item) => ({ id: item.id, title: item.name, subtitle: `${item.subject} • ${item.qualification}`, status: "Published", owner: "Academic Team", updatedAt: "Yesterday", metric: item.experience })),
  results: results.map((item) => ({ id: item.id, title: item.name, subtitle: `${item.achievement} • ${item.detail}`, status: "Published", owner: "Results Team", updatedAt: "2 days ago", metric: item.score })),
  gallery: gallery.map((item) => ({ id: item.id, title: item.title, subtitle: item.category, status: "Published", owner: "Media Team", updatedAt: "Today", metric: "Image" })),
  testimonials: testimonials.map((item) => ({ id: item.id, title: item.name, subtitle: item.role, status: "Published", owner: "Content Team", updatedAt: "Today", metric: `${item.rating}/5` })),
  notices: [
    { id: "notice-1", title: "Admissions Open 2026-27", subtitle: "Pinned homepage notice", status: "Published", owner: "Admin", updatedAt: "Today", metric: "High" },
    { id: "notice-2", title: "Scholarship Test Registration", subtitle: "Campaign notice", status: "Draft", owner: "Content Team", updatedAt: "Yesterday", metric: "Normal" },
  ],
  blogs: blogPosts.map((post) => ({ id: post.id, title: post.title, subtitle: `${post.category} • ${post.readTime}`, status: "Published", owner: "Content Team", updatedAt: post.publishedAt, metric: "SEO ready" })),
  media: [
    { id: "media-1", title: "Hero classroom image", subtitle: "Image • 420 KB", status: "Published", owner: "Media Team", updatedAt: "Today", metric: "WebP" },
    { id: "media-2", title: "Brochure PDF", subtitle: "PDF • 1.2 MB", status: "Draft", owner: "Admin", updatedAt: "3 days ago", metric: "PDF" },
  ],
};

export const leads: LeadRecord[] = [
  { id: "lead-1", studentName: "Aarav Sharma", phone: "+91 98765 43210", course: "JEE Preparation", source: "Website", status: "New", assignedTo: "Counsellor A", followUp: "Today, 5:00 PM" },
  { id: "lead-2", studentName: "Saanvi Rao", phone: "+91 97654 32109", course: "NEET Preparation", source: "WhatsApp", status: "Contacted", assignedTo: "Counsellor B", followUp: "Tomorrow" },
  { id: "lead-3", studentName: "Kabir Singh", phone: "+91 96543 21098", course: "Class 10 Boards", source: "Referral", status: "Demo Scheduled", assignedTo: "Counsellor A", followUp: "Sat, 11:00 AM" },
  { id: "lead-4", studentName: "Isha Jain", phone: "+91 95432 10987", course: "CUET Preparation", source: "Website", status: "Converted", assignedTo: "Counsellor C", followUp: "Completed" },
];

export const activities: ActivityRecord[] = [
  { id: "act-1", user: "Veena Admin", action: "Published course", module: "Courses", timestamp: "12 min ago" },
  { id: "act-2", user: "Counsellor A", action: "Updated lead status", module: "Admissions", timestamp: "28 min ago" },
  { id: "act-3", user: "Content Team", action: "Uploaded gallery image", module: "Gallery", timestamp: "1 hour ago" },
  { id: "act-4", user: "Super Admin", action: "Changed SEO settings", module: "SEO", timestamp: "Yesterday" },
];

export const adminUsers = [
  currentAdmin,
  { id: "admin-2", name: "Riya Counsellor", email: "counsellor@veenaacademy.in", role: "counsellor" as AdminRole, avatarInitials: "RC", status: "Active" as const, isActive: true },
  { id: "admin-3", name: "Content Manager", email: "content@veenaacademy.in", role: "content_manager" as AdminRole, avatarInitials: "CM", status: "Active" as const, isActive: true },
  { id: "admin-4", name: "Faculty Member", email: "faculty@veenaacademy.in", role: "faculty" as AdminRole, avatarInitials: "FM", status: "Inactive" as const, isActive: false },
];





