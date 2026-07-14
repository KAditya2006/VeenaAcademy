# Veena Academy Phase 8 Final Master Blueprint

## 1. Final Product Vision

Veena Academy is positioned as a premium coaching institute website and future education platform. The public website should build trust instantly, explain academic value clearly, and convert students or parents into enquiries through demo, call, WhatsApp, admission, scholarship, and brochure actions.

The platform is designed to grow into:

- Public marketing website
- CMS-managed content system
- Admin dashboard
- Student portal
- Parent portal
- Faculty portal
- LMS
- Online tests
- Attendance
- Assignments
- Fee management
- AI chat assistant
- Mobile app APIs

## 2. Current Implemented Public Website

The React/Vite frontend now includes:

- React Router routes
- React Helmet Async SEO metadata
- TypeScript data models
- Tailwind design tokens
- Framer Motion section animation
- React Hook Form + Zod enquiry validation
- Reusable common components
- Responsive navbar and mobile menu
- Floating WhatsApp and call buttons
- Courses with search and filters
- Course detail route
- Gallery filters and lightbox modal
- Blog listing and blog detail routes
- Sitemap and robots files
- Analytics event helper

Implemented routes:

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

## 3. Brand System

Brand name:

Veena Academy

Brand qualities:

- Premium
- Trustworthy
- Academic
- Modern
- Parent-focused
- Student-friendly
- Result-oriented
- Warm
- Professional

Visual language:

- Light theme
- White background
- Deep blue primary
- Orange accent
- Soft gradients
- Spacious layouts
- Premium cards
- Purposeful motion

Typography:

- Headings: Instrument Serif
- Body/UI: Inter

Design references:

- Apple
- Stripe
- Linear
- Notion
- Google Material 3
- Premium education products

## 4. Public Website IA

```txt
Home
├── About
├── Courses
│   ├── Class 6-8 Foundation
│   ├── Class 9-10 Board Preparation
│   ├── Class 11-12 Science
│   ├── Class 11-12 Commerce
│   ├── JEE Preparation
│   ├── NEET Preparation
│   ├── CUET Preparation
│   ├── SSC Preparation
│   └── Scholarship Preparation
├── Faculty
├── Results
├── Facilities
├── Gallery
├── Testimonials
├── Blog
├── FAQ
├── Contact
└── Admission
```

Homepage flow:

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

## 5. Frontend Architecture

Folder structure:

```txt
src/
  assets/
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

Common components:

- Button
- Container
- SectionHeader
- Badge
- Card
- Input
- Textarea
- Select
- Modal
- Accordion
- AnimatedCounter
- FloatingActions
- SEO

Layout components:

- Navbar
- MobileMenu
- Footer

Section components:

- Hero
- TrustStats
- Courses
- WhyChoose
- Results
- Faculty
- Facilities
- Gallery
- Testimonials
- AdmissionProcess
- FAQ
- Contact
- CTASection

Data files:

- courses
- faculty
- results
- testimonials
- gallery
- faqs
- stats
- facilities
- navigation
- blogs

API readiness:

Each data file uses stable typed shapes so static arrays can later be replaced by public API calls such as:

```txt
GET /api/v1/courses/public
GET /api/v1/faculty/public
GET /api/v1/results/public
GET /api/v1/gallery/public
GET /api/v1/testimonials/public
GET /api/v1/settings/public
```

## 6. Design System Tokens

Color roles:

- Primary
- Primary Dark
- Primary Light
- Accent
- Accent Dark
- Background
- Surface
- Card
- Border
- Divider
- Text Primary
- Text Secondary
- Text Muted
- Success
- Warning
- Error
- Overlay
- Glass

Typography roles:

- Display heading
- Section heading
- Card heading
- Body large
- Body
- Caption
- Button label

Spacing:

- 8px scale
- Consistent section padding
- Responsive page containers

Radius:

- sm
- md
- lg
- xl
- 2xl
- pill
- circle

Elevation:

- level1
- level2
- level3
- level4
- glow

Motion:

- fadeUp
- fadeIn
- scaleIn
- slideLeft
- slideRight
- staggerContainer

## 7. Conversion System

Primary CTAs:

- Book Free Demo
- Start Admission Enquiry
- Call Now
- WhatsApp

Secondary CTAs:

- Know More
- Talk to Counsellor
- Read Article
- Download Brochure, future
- Scholarship Test Registration, future

CTA placement:

- Hero: demo, call, WhatsApp
- Courses: know more
- CTA band: demo and call
- Admission process: start admission enquiry
- Contact: submit enquiry and WhatsApp fallback
- Floating: WhatsApp and call

Lead capture:

- Current frontend validates enquiry locally with Zod.
- Future backend endpoint: `POST /api/v1/enquiries`.

## 8. Backend API Architecture

Base URL:

```txt
/api/v1
```

Modules:

- Auth
- Admin Users
- Courses
- Faculty
- Results
- Gallery
- Testimonials
- Notices
- Blogs
- Enquiries
- Demo Requests
- Scholarship
- Contact
- Settings
- SEO
- Uploads
- Analytics
- Audit Logs

Public endpoints:

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

Protected endpoints:

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

## 9. MongoDB Collections

Required collections:

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

Common model rules:

- timestamps
- validation
- indexes
- soft delete
- publish status
- slug fields where needed
- createdBy and updatedBy where relevant

## 10. Authentication and RBAC

Roles:

1. Super Admin
2. Admin
3. Counsellor
4. Content Manager
5. Faculty

Access strategy:

- JWT access token
- HTTP-only refresh token
- Refresh token rotation
- bcrypt password hashing
- account lock after repeated failed attempts
- role-based middleware
- audit logging for sensitive actions

Role summary:

- Super Admin: full access
- Admin: manage content and enquiries
- Counsellor: manage leads and follow-ups
- Content Manager: manage blogs, gallery, notices, testimonials
- Faculty: manage own profile

## 11. Admin Dashboard Architecture

Pages:

```txt
Login
Dashboard
Courses
Faculty
Results
Gallery
Testimonials
Notices
Blogs
Admission Enquiries
Demo Requests
Scholarship Registrations
Contact Messages
Media Library
Settings
SEO
Users & Roles
Audit Logs
Profile
Change Password
```

Dashboard modules:

- total enquiries
- today’s enquiries
- demo class requests
- scholarship registrations
- course-wise interest
- lead source
- conversion funnel
- monthly growth
- latest admissions
- follow-up reminders

Admin UX components:

- sidebar
- topbar
- search
- notifications
- data tables
- filters
- forms
- modals
- confirmation dialogs
- toasts
- loading states
- empty states
- error states

## 12. Upload System

Media provider:

- Cloudinary

Supported media:

- faculty photos
- student photos
- course images
- gallery images
- blog covers
- logo
- brochure PDF

Rules:

- validate file type
- validate file size
- store Cloudinary public_id
- store secure_url
- delete old media when replacing
- use responsive image transformations

## 13. SEO System

Current frontend includes:

- React Helmet Async
- route-level titles and descriptions
- canonical placeholder support
- JSON-LD support
- sitemap.xml
- robots.txt

Required schema:

- EducationalOrganization
- LocalBusiness
- Course
- FAQPage
- BreadcrumbList
- Article
- Review, where valid

Homepage title:

`Veena Academy | Coaching for Boards, JEE, NEET, CUET & SSC`

Homepage description:

`Join Veena Academy for expert coaching, regular tests, doubt support, library facility, transport facility, and result-oriented preparation for Boards, JEE, NEET, CUET, SSC and Foundation courses.`

Future local SEO:

- Best Coaching in [City]
- Best JEE Coaching in [City]
- Best NEET Coaching in [City]
- Class 10 Coaching in [City]
- Class 12 Coaching in [City]

## 14. Performance Plan

Targets:

- Lighthouse Performance 90+
- Accessibility 95+
- SEO 95+
- Best Practices 95+
- LCP under 2.5s
- CLS under 0.1
- INP under 200ms

Optimization:

- route-level code splitting
- lazy loaded route chunks
- optimized images
- responsive media
- font-display swap
- minimal dependencies
- no backend secrets in frontend
- defer analytics scripts
- reserve image dimensions when real media is added

## 15. Analytics Plan

Analytics helper supports:

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

Recommended tools:

- Google Analytics 4
- Google Search Console
- Microsoft Clarity

Privacy:

- mask form fields in Clarity
- never send sensitive form values as analytics parameters

## 16. Deployment Plan

Recommended domains:

```txt
www.veenaacademy.com
admin.veenaacademy.com
api.veenaacademy.com
```

Future:

```txt
student.veenaacademy.com
parent.veenaacademy.com
faculty.veenaacademy.com
```

Recommended services:

- Cloudflare DNS
- Vercel or Netlify frontend
- Render or Railway backend
- MongoDB Atlas database
- Cloudinary media
- Resend/Brevo/SMTP email
- UptimeRobot and Sentry monitoring

## 17. Security Plan

Backend must include:

- Helmet
- CORS whitelist
- rate limiting
- Mongo sanitization
- XSS protection
- JWT access token
- refresh token
- bcrypt password hashing
- file type validation
- file size validation
- RBAC middleware
- audit logging
- global error handler
- environment variable validation
- secure cookies where needed

Frontend must include:

- no secrets in env
- validated forms
- semantic HTML
- visible focus states
- no unsafe HTML
- secure external links

## 18. Verification Completed

Completed in this phase:

- `npm run build` passes.
- Local preview responds at `http://127.0.0.1:5173`.
- Browser smoke checked:
  - `/`
  - `/courses`
  - `/courses/jee-preparation`
  - `/blog`
  - `/blog/weekly-tests-jee-neet`
  - `/admission`
- Mobile viewport checked at 390px.
- No horizontal overflow detected in checked routes.
- Mobile hamburger is visible.
- Floating WhatsApp and call actions are present.
- SEO titles update after lazy route load.

## 19. Next Implementation Milestones

1. Add real academy images and Cloudinary-ready image components.
2. Integrate public APIs once backend exists.
3. Implement backend foundation: auth, courses, faculty, enquiries, uploads.
4. Build admin dashboard shell and CMS pages.
5. Replace static arrays with API data using TanStack Query.
6. Add live GA4 and Clarity IDs.
7. Add Google Business Profile and local SEO pages.
8. Run Lighthouse and accessibility audits after real assets are added.

