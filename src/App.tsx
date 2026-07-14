import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { FloatingActions } from "./components/common/FloatingActions";
import { ProtectedAdminRoute, AdminLayout } from "./admin/components/layout/AdminLayout";
import { PermissionRoute } from "./admin/components/layout/PermissionRoute";
import ModulePage from "./admin/pages/ModulePage";
import LeadPage from "./admin/pages/LeadPage";

const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const CourseDetailsPage = lazy(() => import("./pages/CourseDetailsPage"));
const FacultyPage = lazy(() => import("./pages/FacultyPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdmissionPage = lazy(() => import("./pages/AdmissionPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("./pages/BlogDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const LoginPage = lazy(() => import("./admin/pages/LoginPage"));
const DashboardPage = lazy(() => import("./admin/pages/DashboardPage"));
const SettingsPage = lazy(() => import("./admin/pages/SettingsPage"));
const SeoPage = lazy(() => import("./admin/pages/SeoPage"));
const UsersPage = lazy(() => import("./admin/pages/UsersPage"));
const AuditLogsPage = lazy(() => import("./admin/pages/AuditLogsPage"));
const ProfilePage = lazy(() => import("./admin/pages/ProfilePage"));
const ChangePasswordPage = lazy(() => import("./admin/pages/ChangePasswordPage"));
const AnalyticsPage = lazy(() => import("./admin/pages/AnalyticsPage"));

function PageLoader() {
  return <div className="grid min-h-screen place-items-center bg-background text-primary"><span className="eyebrow">Loading Veena Academy</span></div>;
}

function PublicShell({ children }: { children: React.ReactNode }) {
  return <><Navbar /><main>{children}</main><Footer /><FloatingActions /></>;
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route element={<PermissionRoute permission="content:manage" />}>
              <Route path="courses" element={<ModulePage moduleKey="courses" title="Courses" description="Add, edit, publish, feature, reorder and manage course SEO, batches and images." createLabel="Add Course" />} />
              <Route path="faculty" element={<ModulePage moduleKey="faculty" title="Faculty" description="Manage teacher profiles, photos, qualifications, experience, bios and publish status." createLabel="Add Faculty" />} />
              <Route path="results" element={<ModulePage moduleKey="results" title="Results" description="Manage toppers, ranks, marks, exam year, featured status and result proof." createLabel="Add Result" />} />
              <Route path="gallery" element={<ModulePage moduleKey="gallery" title="Gallery" description="Upload, categorize, reorder, publish and bulk manage gallery images." createLabel="Upload Image" />} />
              <Route path="testimonials" element={<ModulePage moduleKey="testimonials" title="Testimonials" description="Manage student and parent reviews, ratings, videos, images and featured status." createLabel="Add Testimonial" />} />
              <Route path="notices" element={<ModulePage moduleKey="notices" title="Notices" description="Publish admission notices, scholarship announcements, expiry dates and priorities." createLabel="Add Notice" />} />
              <Route path="blogs" element={<ModulePage moduleKey="blogs" title="Blogs" description="Create drafts, publish posts, manage tags, categories, images and SEO." createLabel="New Blog" />} />
              <Route path="media" element={<ModulePage moduleKey="media" title="Media Library" description="Manage images, PDFs, logos, gallery files, blog images and brochures." createLabel="Upload Media" />} />
            </Route>
            <Route element={<PermissionRoute permission="leads:manage" />}>
              <Route path="admissions" element={<LeadPage title="Admission CRM" description="Manage new leads, contacted leads, demo scheduled students, converted admissions and closed records." />} />
              <Route path="demo-requests" element={<LeadPage title="Demo Requests" description="Schedule, update and track demo class requests with counsellor assignment." />} />
              <Route path="scholarship" element={<LeadPage title="Scholarship Registrations" description="Manage scholarship test applicants, exam targets, statuses and follow-up reminders." />} />
              <Route path="contact-messages" element={<LeadPage title="Contact Messages" description="Track contact form submissions, replies, ownership and closure status." />} />
            </Route>
            <Route element={<PermissionRoute permission="settings:manage" />}>
              <Route path="settings" element={<SettingsPage />} />
              <Route path="seo" element={<SeoPage />} />
            </Route>
            <Route element={<PermissionRoute permission="dashboard:read" />}>
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>
            <Route element={<PermissionRoute permission="users:manage" />}>
              <Route path="users" element={<UsersPage />} />
            </Route>
            <Route element={<PermissionRoute permission="audit:read" />}>
              <Route path="audit-logs" element={<AuditLogsPage />} />
            </Route>
            <Route element={<PermissionRoute permission="profile:manage" />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/*" element={<PublicShell><Routes><Route path="/" element={<Home />} /><Route path="/about" element={<AboutPage />} /><Route path="/courses" element={<CoursesPage />} /><Route path="/courses/:slug" element={<CourseDetailsPage />} /><Route path="/faculty" element={<FacultyPage />} /><Route path="/results" element={<ResultsPage />} /><Route path="/gallery" element={<GalleryPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/admission" element={<AdmissionPage />} /><Route path="/blog" element={<BlogPage />} /><Route path="/blog/:slug" element={<BlogDetailsPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></PublicShell>} />
      </Routes>
    </Suspense>
  );
}
