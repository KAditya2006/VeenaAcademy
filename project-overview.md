# Veena Academy Project Overview

## Project Name

**Veena Academy - Premium Coaching Institute Website & Future Education Platform**

## Current Status

This project is a production-oriented public website frontend for **Veena Academy**, built as a premium education brand experience. It also includes detailed planning documents for UX, UI, backend, CMS, admin dashboard, deployment, SEO, performance, analytics, and future platform expansion.

The current implemented application is a React + Vite + TypeScript website with routed pages, reusable components, data-driven content, SEO metadata, a validated enquiry form, and responsive premium UI sections.

## Phase 11 Development Constitution

Phase 11 adds the project's enterprise engineering constitution in [docs/phase-11-development-constitution.md](docs/phase-11-development-constitution.md).

This constitution defines the non-negotiable development standards for all future Veena Academy work:

- Respect existing architecture and documentation before implementing.
- Reuse existing components, hooks, helpers, routes, data structures, and design tokens.
- Keep TypeScript strict, modular, accessible, responsive, SEO-conscious, and performance-aware.
- Preserve public routing, admin routing, RBAC, SEO, and current working features.
- Keep frontend, admin, backend, database, API, security, accessibility, and performance responsibilities separated.
- Update documentation when major features or architecture are added.

The document should be treated as a required checkpoint before future phases, backend integration, CMS expansion, admin module changes, or production hardening.

## Phase 12 QA, Testing & Production Acceptance

Phase 12 adds the official release-quality gate in [docs/phase-12-qa-testing-production-acceptance.md](docs/phase-12-qa-testing-production-acceptance.md).

This document defines the project's QA strategy and production acceptance rules for:

- Definition of Done
- Frontend QA
- Backend QA
- Admin dashboard QA
- API testing
- Responsive testing
- Accessibility audits
- Security audits
- Performance audits
- SEO audits
- Analytics verification
- Release checks
- Post-deployment checks
- Regression testing
- Production readiness approval

No future feature or release should be marked production ready until the applicable Phase 12 checks pass.
## Sprint 1 Backend Foundation and Real Admin Auth

Sprint 1 adds the first real backend implementation under [backend/](backend/) and documents it in [docs/sprint-1-backend-auth-implementation.md](docs/sprint-1-backend-auth-implementation.md).

Implemented backend capabilities:

- Express + TypeScript backend package
- MongoDB + Mongoose connection layer
- Zod environment validation
- Standard API success/error response shape
- Central async error handling and 404 handling
- Helmet, CORS whitelist, JSON limit, cookie parser, Morgan logging and rate limits
- Health endpoint at `GET /api/v1/health`
- Admin user model with bcrypt password hashing, account status, failed-login tracking and lockout
- Refresh token model with hashed token storage, TTL index, rotation and revocation
- Audit log model for authentication events
- Real admin login, refresh, logout, current-user and change-password endpoints
- RBAC middleware with `protect` and `authorize(...roles)`
- Seed script for first `super_admin`
- Backend tests using Vitest, Supertest and MongoDB Memory Server

Updated frontend admin auth:

- Mock admin auth has been replaced by API-backed auth in `src/admin/lib/auth.tsx`.
- The frontend now keeps the access token in memory and restores sessions through the HTTP-only refresh cookie.
- `/admin` routes wait for auth initialization before rendering protected content.
- `/admin/login` redirects logged-in users away and returns users to the intended destination after login.
- `/admin/change-password` calls the backend and logs the user out after a successful password change.
- Admin CMS modules still use typed mock data; only authentication was moved to the backend in this sprint.

Sprint 1 verification:

```bash
npm run type-check --prefix backend
npm run build --prefix backend
npm test --prefix backend
npm run build
```
## Sprint 2 Core CMS and Media Integration

Sprint 2 adds real CMS APIs and media upload support for Courses, Faculty, Results, and Gallery. Full details are documented in [docs/sprint-2-core-cms-media-integration.md](docs/sprint-2-core-cms-media-integration.md).

Implemented:

- Course, Faculty, Result, GalleryItem, and Upload models
- Public published-only APIs
- Protected admin CRUD APIs
- Publish, feature, soft-delete, reorder, pagination, filters, search, and sorting
- Cloudinary image upload endpoint with Multer memory storage
- Upload records and linked-media deletion protection
- Backend RBAC and audit logging for CMS actions
- Optional CMS seed script: `npm run seed:cms --prefix backend`
- Admin API integration for Courses, Faculty, Results, and Gallery
- Public website API integration for Courses, Course Details, Faculty, Results, and Gallery
- Development-only explicit static fallback via `VITE_ENABLE_STATIC_FALLBACK=true`

Still deferred: testimonials, blogs, notices, lead CRM, settings CMS, SEO CMS, and analytics APIs.
## Brand Summary

Veena Academy is positioned as a serious, premium, parent-trusted and student-friendly coaching institute.

Brand qualities:

- Premium
- Trustworthy
- Academic
- Modern
- Student-friendly
- Parent-focused
- Result-oriented
- Warm
- Professional
- Inspiring

Visual theme:

- Light theme
- White background
- Deep blue primary color
- Orange accent color
- Soft gradients
- Rounded premium cards
- Clean spacing
- Smooth but restrained animations

Typography:

- Display/headings: **Instrument Serif**
- Body/UI: **Inter**

## Target Audience

Primary users:

- Students
- Parents

Secondary users:

- Faculty
- School representatives
- Management
- Future franchise partners
- Recruiters

## Core Courses Covered

The website includes data-driven course entries for:

- Class 6-8 Foundation
- Class 9-10 Board Preparation
- Class 11-12 Science
- Class 11-12 Commerce
- JEE Preparation
- NEET Preparation
- CUET Preparation
- SSC Preparation
- Scholarship Preparation

Each course includes:

- Title
- Slug
- Category
- Description
- Duration
- Eligibility
- Icon
- CTA label
- Learning outcomes

## Technology Stack

Frontend:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router
- React Hook Form
- Zod
- Lucide React
- React Helmet Async

Build tooling:

- Vite
- TypeScript compiler
- Tailwind CSS
- PostCSS
- Autoprefixer

Future backend architecture planned for:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cloudinary
- Multer
- Helmet
- CORS
- Rate limiting

Future admin dashboard architecture planned for:

- React
- Vite
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Recharts

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

Script purposes:

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Runs TypeScript build and creates the production `dist/` bundle.
- `npm run preview`: Previews the production build locally.

## Implemented Public Website Routes

The frontend uses React Router and supports:

```txt
/
/about
/courses
/courses/:slug
/faculty
/results
/gallery
/contact
/admission
/blog
/blog/:slug
*
```

Route details:

- `/`: Premium homepage with all major conversion sections.
- `/about`: Academy story, mission, teaching philosophy, parent confidence.
- `/courses`: Searchable and filterable course listing.
- `/courses/:slug`: Individual course detail page.
- `/faculty`: Faculty section page.
- `/results`: Results and testimonials page.
- `/gallery`: Gallery page with filters and lightbox behavior.
- `/contact`: Contact form, contact cards, FAQ.
- `/admission`: Admission process, compact courses, enquiry form.
- `/blog`: Blog listing page.
- `/blog/:slug`: Blog detail page.
- `*`: Not found page.

## Homepage Sections

The homepage includes:

1. Navbar
2. Hero
3. Trust Stats
4. Courses
5. Why Choose Veena Academy
6. CTA Section
7. Results
8. Faculty
9. Facilities
10. Gallery
11. Testimonials
12. Admission Process
13. FAQ
14. Contact
15. Footer
16. Floating WhatsApp and Call buttons

## Conversion Features

Current frontend conversion features:

- Book Free Demo CTA
- Admission enquiry form
- Call Now CTA
- WhatsApp CTA
- Floating WhatsApp button
- Floating call button
- Course detail CTAs
- Contact cards
- Admission process CTA
- Validated enquiry form
- Success state after form submission

Planned future conversion features:

- Download Brochure
- Scholarship Test Registration
- Backend-connected lead capture
- Counsellor assignment
- Follow-up reminders
- Lead conversion tracking

## Form Handling

The contact/admission enquiry form uses:

- React Hook Form
- Zod validation
- Local success state
- API-ready data shape

Current fields:

- Student Name
- Class
- Course Interested
- Phone Number
- Message

Validation:

- Student name required
- Class required
- Course required
- Phone required and pattern-validated
- Message optional with max length

Future API endpoint:

```txt
POST /api/v1/enquiries
```

## SEO Implementation

Current SEO features:

- React Helmet Async
- Route-level page titles
- Route-level meta descriptions
- Canonical URL support
- Open Graph title and description
- JSON-LD placeholder support
- EducationalOrganization structured data placeholder
- `public/robots.txt`
- `public/sitemap.xml`

Current SEO files:

```txt
public/robots.txt
public/sitemap.xml
src/lib/seo.ts
src/components/common/SEO.tsx
```

Homepage SEO title:

```txt
Veena Academy | Premium Coaching for Boards, JEE, NEET, CUET & SSC
```

Homepage SEO description:

```txt
Join Veena Academy for result-oriented coaching, expert faculty, regular tests, doubt support, library facility, transport facility, and personal mentorship.
```

## Analytics Readiness

The project includes an analytics helper:

```txt
src/lib/analytics.ts
```

Supported event names:

```txt
cta_book_demo_click
cta_whatsapp_click
cta_call_click
form_admission_submit
form_contact_submit
form_scholarship_submit
brochure_download
course_card_click
faq_expand
gallery_open
scroll_depth_75
```

Planned analytics tools:

- Google Analytics 4
- Google Search Console
- Microsoft Clarity

Privacy rule:

- Do not send personal form values into analytics events.

## Project Folder Structure

Main source structure:

```txt
src/
  assets/
    images/
    icons/
  components/
    common/
    layout/
    sections/
  data/
  hooks/
  lib/
  pages/
  types/
  App.tsx
  main.tsx
  index.css
```

Documentation:

```txt
docs/
  phase-3-ux-blueprint.md
  phase-4-ui-design-blueprint.md
  phase-6-backend-admin-cms-architecture.md
  phase-7-deployment-seo-performance-analytics.md
  phase-8-final-master-blueprint.md
```

Public SEO files:

```txt
public/
  robots.txt
  sitemap.xml
```

## Important Source Files

Application entry:

```txt
src/main.tsx
src/App.tsx
```

Routing pages:

```txt
src/pages/Home.tsx
src/pages/AboutPage.tsx
src/pages/CoursesPage.tsx
src/pages/CourseDetailsPage.tsx
src/pages/FacultyPage.tsx
src/pages/ResultsPage.tsx
src/pages/GalleryPage.tsx
src/pages/ContactPage.tsx
src/pages/AdmissionPage.tsx
src/pages/BlogPage.tsx
src/pages/BlogDetailsPage.tsx
src/pages/NotFoundPage.tsx
```

Common components:

```txt
src/components/common/Button.tsx
src/components/common/Container.tsx
src/components/common/SectionHeader.tsx
src/components/common/Badge.tsx
src/components/common/Card.tsx
src/components/common/Input.tsx
src/components/common/Textarea.tsx
src/components/common/Select.tsx
src/components/common/Modal.tsx
src/components/common/Accordion.tsx
src/components/common/AnimatedCounter.tsx
src/components/common/FloatingActions.tsx
src/components/common/SEO.tsx
```

Layout components:

```txt
src/components/layout/Navbar.tsx
src/components/layout/MobileMenu.tsx
src/components/layout/Footer.tsx
```

Section components:

```txt
src/components/sections/Hero.tsx
src/components/sections/TrustStats.tsx
src/components/sections/Courses.tsx
src/components/sections/WhyChoose.tsx
src/components/sections/Results.tsx
src/components/sections/Faculty.tsx
src/components/sections/Facilities.tsx
src/components/sections/Gallery.tsx
src/components/sections/Testimonials.tsx
src/components/sections/AdmissionProcess.tsx
src/components/sections/FAQ.tsx
src/components/sections/Contact.tsx
src/components/sections/CTASection.tsx
```

Data files:

```txt
src/data/courses.ts
src/data/faculty.ts
src/data/results.ts
src/data/testimonials.ts
src/data/gallery.ts
src/data/faqs.ts
src/data/stats.ts
src/data/facilities.ts
src/data/navigation.ts
src/data/blogs.ts
```

Utility files:

```txt
src/lib/cn.ts
src/lib/animations.ts
src/lib/constants.ts
src/lib/seo.ts
src/lib/validation.ts
src/lib/analytics.ts
```

Types:

```txt
src/types/index.ts
```

Hooks:

```txt
src/hooks/useMediaQuery.ts
src/hooks/useScrollLock.ts
```

## Design System Implementation

Tailwind config:

```txt
tailwind.config.js
```

Global styles:

```txt
src/index.css
```

Design tokens include:

- Semantic colors
- Display and body fonts
- Radius tokens
- Shadow/elevation tokens
- Transition duration tokens
- Gradient tokens
- Glass styles
- Button styles
- Card styles
- Form field styles
- Focus states

Key reusable CSS classes:

```txt
container-premium
section-pad
button-primary
button-secondary
button-outline
eyebrow
eyebrow-dark
premium-card
glass-panel
form-field
icon-tile
```

## Motion System

Motion utilities:

```txt
src/lib/animations.ts
```

Available animation variants:

- `fadeUp`
- `fadeIn`
- `scaleIn`
- `slideLeft`
- `slideRight`
- `staggerContainer`
- `viewportOnce`

Motion philosophy:

- Use animation to guide attention.
- Avoid decorative or distracting motion.
- Prefer opacity and transform.
- Keep scroll reveal subtle.

## Content Data Summary

Courses:

- 9 course objects
- Search and category filters
- Course detail pages generated by slug

Faculty:

- 4 faculty profile placeholders
- Subject, experience, qualification, initials

Results:

- 4 topper/result cards
- Animated result counters

Gallery:

- 6 gallery placeholder items
- Category filters
- Lightbox modal

Testimonials:

- 3 student/parent review cards
- Rating display

FAQs:

- Admission, demo, courses, transport, tests, contact

Blog:

- 3 placeholder articles
- Blog listing route
- Blog detail route

## Backend and CMS Architecture

Backend is not implemented yet, but the architecture is documented in:

```txt
docs/phase-6-backend-admin-cms-architecture.md
```

Planned backend stack:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT authentication
- bcrypt
- Cloudinary
- Multer
- Helmet
- CORS
- Rate limiting

Planned base API:

```txt
/api/v1
```

Planned public API examples:

```txt
GET /api/v1/courses/public
GET /api/v1/faculty/public
GET /api/v1/results/public
GET /api/v1/gallery/public
GET /api/v1/testimonials/public
GET /api/v1/notices/public
GET /api/v1/settings/public

POST /api/v1/enquiries
POST /api/v1/demo-requests
POST /api/v1/scholarship
POST /api/v1/contact
```

Planned protected API examples:

```txt
POST /api/v1/auth/login
POST /api/v1/auth/logout
GET /api/v1/auth/me

POST /api/v1/courses
PATCH /api/v1/courses/:id
DELETE /api/v1/courses/:id

GET /api/v1/enquiries
PATCH /api/v1/enquiries/:id/status
PATCH /api/v1/enquiries/:id/assign

POST /api/v1/uploads/image
GET /api/v1/analytics/dashboard
```

## Planned Database Collections

The backend architecture plans MongoDB collections for:

- AdminUser
- Course
- Faculty
- Result
- GalleryItem
- Testimonial
- Notice
- BlogPost
- AdmissionEnquiry
- DemoClassRequest
- ScholarshipRegistration
- ContactMessage
- BrochureDownload
- WebsiteSettings
- SEOSettings
- AuditLog
- Notification
- Upload

Common backend model rules:

- Timestamps
- Validation
- Indexes
- Soft delete
- Publish status
- Slugs where needed
- Created by / updated by where relevant

## Planned Admin Dashboard

Admin dashboard is not implemented yet, but the architecture is documented.

Planned admin pages:

- Login
- Dashboard
- Courses
- Faculty
- Results
- Gallery
- Testimonials
- Notices
- Blogs
- Admission Enquiries
- Demo Requests
- Scholarship Registrations
- Contact Messages
- Media Library
- Settings
- SEO
- Users & Roles
- Audit Logs
- Profile
- Change Password

Planned admin roles:

1. Super Admin
2. Admin
3. Counsellor
4. Content Manager
5. Faculty

## Future Platform Modules

The platform architecture is prepared for:

- Student Portal
- Parent Portal
- Faculty Portal
- Admin Dashboard
- Online Tests
- Attendance
- Assignments
- Fee Management
- Learning Management System
- AI Chat Assistant
- Mobile App APIs
- Push Notifications

## Deployment Plan

Deployment is documented in:

```txt
docs/phase-7-deployment-seo-performance-analytics.md
```

Recommended deployment structure:

```txt
www.veenaacademy.com        -> Public website
admin.veenaacademy.com      -> Admin dashboard
api.veenaacademy.com        -> Backend API
```

Recommended services:

- Website: Vercel or Netlify
- Admin: Vercel or Netlify
- Backend: Render, Railway, or VPS
- Database: MongoDB Atlas
- Media: Cloudinary
- DNS/CDN: Cloudflare
- Analytics: GA4 and Microsoft Clarity
- Monitoring: UptimeRobot and Sentry

## Environment Variables Planned

Public website:

```env
VITE_SITE_URL=https://www.veenaacademy.com
VITE_API_BASE_URL=https://api.veenaacademy.com/api/v1
VITE_WHATSAPP_NUMBER=
VITE_PHONE_NUMBER=
VITE_GA_MEASUREMENT_ID=
VITE_CLARITY_PROJECT_ID=
```

Backend:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=
CORS_ORIGIN=https://www.veenaacademy.com,https://admin.veenaacademy.com
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## Security Plan

Frontend:

- No secrets in frontend env
- Validated forms
- Semantic HTML
- Focus states
- No unsafe HTML
- Secure external links where needed

Backend planned:

- Helmet
- CORS whitelist
- Rate limiting
- Mongo sanitization
- XSS protection
- JWT access token
- Refresh token rotation
- bcrypt password hashing
- File type validation
- File size validation
- RBAC middleware
- Audit logging
- Global error handler
- Secure cookies where needed

## Performance Plan

Targets:

- Lighthouse Performance: 90+
- Accessibility: 95+
- SEO: 95+
- Best Practices: 95+
- LCP under 2.5s
- CLS under 0.1
- INP under 200ms

Current implementation supports:

- Route-level code splitting
- Lazy route loading
- Optimized Vite production build
- Lightweight data-driven UI
- No heavy slider dependency
- Placeholder visual assets

Future performance work:

- Add optimized real images
- Use Cloudinary transformations
- Add image width/height attributes
- Add responsive image sources
- Run Lighthouse after real content is added

## Documentation Files

Existing project documentation:

```txt
docs/phase-3-ux-blueprint.md
docs/phase-4-ui-design-blueprint.md
docs/phase-6-backend-admin-cms-architecture.md
docs/phase-7-deployment-seo-performance-analytics.md
docs/phase-8-final-master-blueprint.md
project-overview.md
```

Purpose of each:

- `phase-3-ux-blueprint.md`: UX architecture, journeys, wireframes, CTA strategy.
- `phase-4-ui-design-blueprint.md`: UI design system and screen-by-screen design specification.
- `phase-6-backend-admin-cms-architecture.md`: Backend, database, API, admin dashboard and CMS architecture.
- `phase-7-deployment-seo-performance-analytics.md`: Deployment, SEO, performance, analytics, monitoring, launch plan.
- `phase-8-final-master-blueprint.md`: Final consolidated platform blueprint.
- `project-overview.md`: Practical current project overview and handoff summary.

## Verification Status

Last verified:

- Production build passes with `npm run build`.
- Local dev preview responds at `http://127.0.0.1:5173`.
- Browser smoke checks passed for:
  - `/`
  - `/courses`
  - `/courses/jee-preparation`
  - `/blog`
  - `/blog/weekly-tests-jee-neet`
  - `/admission`
- Mobile viewport check at 390px passed.
- No horizontal overflow detected in checked routes.
- Mobile hamburger visible.
- Floating WhatsApp and call actions present.
- SEO titles update after lazy route load.

## Known Notes

- The backend is planned but not implemented.
- The admin dashboard is planned but not implemented.
- Current content uses placeholder/dummy data arrays.
- Current visuals use polished placeholders rather than real academy photography.
- Contact form currently validates and shows success locally; it does not send to backend yet.
- Some older legacy component files still exist under `src/components/` from the initial single-page implementation, while the active routed app uses `src/components/common`, `src/components/layout`, and `src/components/sections`.

## Recommended Next Steps

1. Replace placeholder visuals with real academy images.
2. Add real address, phone, WhatsApp number, email, and map link.
3. Connect the enquiry form to `POST /api/v1/enquiries` once backend exists.
4. Implement backend foundation:
   - Auth
   - Courses
   - Faculty
   - Results
   - Gallery
   - Enquiries
   - Uploads
5. Build admin dashboard shell and CMS pages.
6. Replace frontend static data with API calls.
7. Add real GA4 and Clarity IDs.
8. Run Lighthouse and accessibility audit with final assets.
9. Deploy staging.
10. Connect production domain and launch.



## Phase 10 Admin Dashboard Implementation Update

The project now includes an enterprise-style admin dashboard frontend under `/admin`.

Implemented admin routes:

```txt
/admin/login
/admin
/admin/courses
/admin/faculty
/admin/results
/admin/gallery
/admin/testimonials
/admin/notices
/admin/blogs
/admin/admissions
/admin/demo-requests
/admin/scholarship
/admin/contact-messages
/admin/media
/admin/settings
/admin/seo
/admin/analytics
/admin/users
/admin/audit-logs
/admin/profile
/admin/change-password
```

Admin dashboard features implemented:

- SaaS-style protected dashboard shell
- Collapsible desktop sidebar
- Mobile drawer navigation
- Sticky admin topbar
- Search UI
- Notifications button
- User avatar menu area
- Role preview selector
- Light/dark mode toggle UI
- RBAC-aware navigation visibility
- Permission-protected routes
- Dashboard analytics widgets
- Recharts-powered leads, course popularity, and funnel charts
- Recent activities feed
- Recent enquiries table
- Reusable CMS module page
- Course, faculty, result, gallery, testimonial, notice, blog, and media module screens
- Admission, demo request, scholarship, and contact-message CRM screens
- Website settings form
- SEO control panel
- Users and roles page
- Audit logs page
- Profile page
- Change password page
- Login screen with remember-me UI
- Mock API abstraction ready for Phase 9 REST APIs

Admin source structure:

```txt
src/admin/
  components/
    common/
    layout/
    charts/
  data/
  hooks/
  lib/
  pages/
  types/
```

Important admin files:

```txt
src/admin/lib/api.ts
src/admin/lib/auth.tsx
src/admin/lib/queryClient.ts
src/admin/data/mockAdmin.ts
src/admin/components/layout/AdminLayout.tsx
src/admin/components/layout/AdminSidebar.tsx
src/admin/components/layout/AdminTopbar.tsx
src/admin/components/layout/PermissionRoute.tsx
src/admin/pages/DashboardPage.tsx
src/admin/pages/ModulePage.tsx
src/admin/pages/LeadPage.tsx
```

Admin implementation notes:

- Admin data currently comes from typed mock data in `src/admin/data/mockAdmin.ts`.
- The mock API layer in `src/admin/lib/api.ts` is shaped so it can later be replaced by Phase 9 backend REST API calls.
- Authentication is currently frontend mock auth through `src/admin/lib/auth.tsx`.
- Real JWT login, refresh token handling, RBAC, audit logging, and persistence must be connected when the backend is implemented.

Verification update:

- `npm run build` passes after the admin dashboard implementation.
- HTTP route checks passed for `/admin`, `/admin/courses`, and `/admin/admissions`.
- Browser automation for the in-app browser timed out while attaching to the webview during the final admin check, so visual browser verification should be repeated if needed.





