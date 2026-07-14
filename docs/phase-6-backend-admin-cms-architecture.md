# Veena Academy Phase 6 Backend, Admin Dashboard and CMS Architecture

## 1. Architecture Overview

Veena Academy needs a backend and admin CMS that lets the team manage website content, enquiries, demo requests, scholarship registrations, media, SEO settings, notices, blogs, results, and faculty without touching frontend code.

Recommended stack:

- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB Atlas with Mongoose
- Authentication: JWT access token, HTTP-only refresh token, bcrypt
- Validation: Zod or express-validator
- Media: Multer to Cloudinary
- Security: Helmet, CORS whitelist, rate limiting, input sanitization, RBAC, audit logs
- Admin Dashboard: React, Vite, TypeScript, Tailwind CSS, React Router, React Hook Form, Zod, TanStack Query, Recharts, Lucide React
- Deployment: Backend on Render/Railway/VPS, website and admin on Netlify/Vercel, database on MongoDB Atlas, media on Cloudinary

Core principle:

The public website should consume published CMS data through public APIs. The admin dashboard should consume protected APIs. Static frontend data can later be replaced by these APIs without changing UI contracts.

## 2. System Modules

### Public Website API

Used by the public Veena Academy website.

Modules:
- Public courses
- Public faculty
- Public results
- Public gallery
- Public testimonials
- Public notices
- Public blogs
- Public settings
- Public SEO metadata
- Admission enquiry submission
- Demo class request submission
- Scholarship registration submission
- Contact form submission
- Brochure request submission

### Admin CMS API

Used by authenticated admin dashboard users.

Modules:
- Authentication and sessions
- Admin user management
- RBAC permissions
- Course CMS
- Faculty CMS
- Result CMS
- Gallery CMS
- Testimonial CMS
- Notice CMS
- Blog CMS
- Admissions CRM
- Demo request CRM
- Scholarship registrations
- Contact messages
- Media library
- Website settings
- SEO settings
- Analytics
- Audit logs
- Notifications

### Admin Dashboard

Interface for academy staff.

Screens:
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
- Brochure Requests
- Media Library
- Settings
- SEO
- Users and Roles
- Audit Logs
- Profile
- Change Password

## 3. User Roles and RBAC

### Roles

| Role | Purpose |
| --- | --- |
| Super Admin | Full system owner |
| Admin | Manages major content and admissions |
| Counsellor | Manages leads, follow-ups, demos and conversions |
| Content Manager | Manages website content, blogs, gallery, notices, testimonials |
| Faculty | Manages own profile and limited assigned records |

### Permission Matrix

| Module | Super Admin | Admin | Counsellor | Content Manager | Faculty |
| --- | --- | --- | --- | --- | --- |
| Dashboard | Full | Full | Leads only | Content summary | Own summary |
| Admin Users | CRUD | View | No | No | No |
| Courses | CRUD/archive | CRUD | View | Edit content | View |
| Faculty | CRUD/archive | CRUD | View | Edit content | Own profile |
| Results | CRUD/archive | CRUD | View | CRUD | View |
| Gallery | CRUD/archive | CRUD | View | CRUD | View |
| Testimonials | CRUD/archive | CRUD | View | CRUD | View |
| Notices | CRUD/archive | CRUD | View | CRUD | View |
| Blogs | CRUD/archive | CRUD | View | CRUD | View |
| Enquiries | Full | Full | View/update/assign notes | View | Assigned only |
| Demo Requests | Full | Full | View/update | View | Assigned only |
| Scholarship | Full | Full | View/update | View | Assigned only |
| Contact Messages | Full | Full | View/update | View | No |
| Settings | Full | View/update limited | No | Content settings only | No |
| SEO | Full | CRUD | No | CRUD | No |
| Uploads | Full | CRUD | Upload lead files if needed | CRUD | Own profile image |
| Audit Logs | Full | View | No | No | No |

Implementation:
- Store role on `AdminUser`.
- Store granular permissions optionally for future custom roles.
- Use `requireAuth` middleware first.
- Use `authorize(["Super Admin", "Admin"])` or permission-based middleware second.

## 4. Authentication Architecture

### Login Flow

1. Admin submits email and password.
2. Backend validates input.
3. Backend finds active admin user by email.
4. Backend checks lock status.
5. Backend compares password using bcrypt.
6. On success:
   - reset failed login count
   - create access token
   - create refresh token
   - store hashed refresh token or token family metadata
   - set refresh token in HTTP-only secure cookie
   - return access token and user profile
7. On failure:
   - increment failed attempts
   - lock account after configured threshold
   - audit log failed login

### Token Strategy

Access token:
- Short-lived: 10-15 minutes
- Sent in `Authorization: Bearer <token>`

Refresh token:
- Longer-lived: 7-30 days
- HTTP-only secure same-site cookie
- Rotated on refresh
- Stored hashed in database or token collection

### Auth Features

- Login
- Logout
- Refresh token
- Get current user
- Forgot password
- Reset password
- Change password
- Account lock after failed login attempts
- Role-based protected routes
- Session expiry

### Auth Endpoints

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/api/v1/auth/login` | Public | Admin login |
| POST | `/api/v1/auth/refresh` | Cookie | Refresh access token |
| POST | `/api/v1/auth/logout` | Auth | Clear refresh token |
| GET | `/api/v1/auth/me` | Auth | Current user |
| POST | `/api/v1/auth/forgot-password` | Public | Send reset link |
| POST | `/api/v1/auth/reset-password` | Public | Reset password |
| PATCH | `/api/v1/auth/change-password` | Auth | Change own password |

## 5. Database Collections

All main collections should use:
- `createdAt`
- `updatedAt`
- `createdBy`
- `updatedBy`
- `isDeleted`
- `deletedAt`
- `deletedBy`

Soft delete:
- Prefer `isDeleted: true` instead of physical delete.
- Public APIs must filter `isDeleted: false` and published content only.
- Protected list APIs can optionally include archived/deleted records for Super Admin.

### AdminUser

Fields:
- `name: string` required
- `email: string` required unique lowercase indexed
- `phone: string`
- `passwordHash: string` required
- `role: enum` required
- `permissions: string[]` default []
- `avatar: ObjectId Upload`
- `isActive: boolean` default true
- `failedLoginAttempts: number` default 0
- `lockedUntil: Date`
- `lastLoginAt: Date`
- `refreshTokenHash: string`
- `passwordResetTokenHash: string`
- `passwordResetExpires: Date`
- soft delete fields
- timestamps

Indexes:
- unique email
- role
- isActive

Validation:
- strong password on create/change
- valid email
- role enum

### Course

Fields:
- `title: string` required
- `slug: string` required unique
- `category: enum` required
- `shortDescription: string` required
- `longDescription: string`
- `duration: string`
- `eligibility: string`
- `subjects: string[]`
- `features: string[]`
- `outcomes: string[]`
- `batchTimings: [{ label, days, time }]`
- `feesPlaceholder: string`
- `image: ObjectId Upload`
- `icon: string`
- `sortOrder: number` default 0
- `isFeatured: boolean` default false
- `isPublished: boolean` default false
- `publishedAt: Date`
- `seoTitle: string`
- `seoDescription: string`
- `seoKeywords: string[]`
- soft delete fields
- timestamps

Indexes:
- unique slug
- category
- isPublished
- isFeatured
- sortOrder

Relationships:
- `image` references Upload
- `createdBy`, `updatedBy` reference AdminUser

### Faculty

Fields:
- `name: string` required
- `slug: string` unique
- `subject: string` required
- `qualification: string`
- `experienceYears: number`
- `experienceLabel: string`
- `bio: string`
- `photo: ObjectId Upload`
- `socialLinks: { linkedin?, website? }`
- `sortOrder: number` default 0
- `isPublished: boolean` default false
- `userId: ObjectId AdminUser` optional for faculty login
- soft delete fields
- timestamps

Indexes:
- slug
- subject
- isPublished
- sortOrder

### Result

Fields:
- `studentName: string` required
- `slug: string` unique
- `examName: string` required
- `course: ObjectId Course`
- `score: string`
- `rank: string`
- `marks: string`
- `year: number` required
- `achievement: string`
- `studentPhoto: ObjectId Upload`
- `isFeatured: boolean` default false
- `isPublished: boolean` default false
- `sortOrder: number` default 0
- soft delete fields
- timestamps

Indexes:
- examName
- year
- course
- isFeatured
- isPublished

### GalleryItem

Fields:
- `title: string` required
- `category: enum` required
- `image: ObjectId Upload` required
- `altText: string` required
- `sortOrder: number` default 0
- `isPublished: boolean` default false
- soft delete fields
- timestamps

Categories:
- Classroom
- Events
- Students
- Seminars
- Results
- Facilities

Indexes:
- category
- isPublished
- sortOrder

### Testimonial

Fields:
- `name: string` required
- `roleLabel: string`
- `type: enum Student | Parent`
- `quote: string` required
- `rating: number` default 5
- `image: ObjectId Upload`
- `videoUrl: string`
- `course: ObjectId Course`
- `isFeatured: boolean` default false
- `isPublished: boolean` default false
- soft delete fields
- timestamps

Indexes:
- type
- rating
- isFeatured
- isPublished

### Notice

Fields:
- `title: string` required
- `content: string` required
- `priority: enum Low | Normal | High | Urgent` default Normal
- `isPinned: boolean` default false
- `isPublished: boolean` default false
- `publishAt: Date`
- `expiresAt: Date`
- soft delete fields
- timestamps

Indexes:
- priority
- isPinned
- isPublished
- expiresAt

### BlogPost

Fields:
- `title: string` required
- `slug: string` required unique
- `excerpt: string`
- `content: string` required
- `category: string`
- `tags: string[]`
- `author: ObjectId AdminUser`
- `coverImage: ObjectId Upload`
- `status: enum Draft | Published | Archived` default Draft
- `publishedAt: Date`
- `seoTitle: string`
- `seoDescription: string`
- `seoKeywords: string[]`
- soft delete fields
- timestamps

Indexes:
- unique slug
- status
- category
- tags
- publishedAt

### AdmissionEnquiry

Fields:
- `studentName: string` required
- `parentName: string`
- `phone: string` required indexed
- `whatsapp: string`
- `class: string` required
- `courseInterested: ObjectId Course`
- `message: string`
- `preferredBatch: string`
- `source: enum Website | WhatsApp | Phone | Walk-in | Referral | Social | Other` default Website
- `status: enum New | Contacted | Demo Scheduled | Interested | Converted | Not Interested | Closed` default New
- `assignedTo: ObjectId AdminUser`
- `followUpAt: Date`
- `notes: [{ note, addedBy, addedAt }]`
- `convertedAt: Date`
- soft delete fields
- timestamps

Indexes:
- phone
- status
- assignedTo
- followUpAt
- createdAt
- courseInterested

### DemoClassRequest

Fields:
- `studentName: string` required
- `phone: string` required
- `class: string` required
- `course: ObjectId Course`
- `preferredDate: Date`
- `message: string`
- `status: enum New | Scheduled | Attended | Missed | Converted | Closed` default New
- `assignedTo: ObjectId AdminUser`
- `scheduledAt: Date`
- `notes: []`
- soft delete fields
- timestamps

Indexes:
- phone
- status
- preferredDate
- assignedTo

### ScholarshipRegistration

Fields:
- `studentName: string` required
- `class: string` required
- `schoolName: string`
- `phone: string` required
- `examTarget: string`
- `preferredDate: Date`
- `status: enum New | Confirmed | Attended | Qualified | Not Qualified | Closed` default New
- `score: string`
- `notes: []`
- soft delete fields
- timestamps

Indexes:
- phone
- class
- status
- preferredDate

### ContactMessage

Fields:
- `name: string` required
- `email: string`
- `phone: string`
- `subject: string`
- `message: string` required
- `status: enum New | Read | Replied | Closed` default New
- `assignedTo: ObjectId AdminUser`
- `repliedAt: Date`
- soft delete fields
- timestamps

Indexes:
- status
- phone
- email
- createdAt

### BrochureDownload

Fields:
- `name: string`
- `phone: string` required
- `email: string`
- `course: ObjectId Course`
- `brochure: ObjectId Upload`
- `source: string`
- `downloadedAt: Date` default now
- timestamps

Indexes:
- phone
- course
- downloadedAt

### WebsiteSettings

Use a singleton document.

Fields:
- `coachingName: string`
- `logo: ObjectId Upload`
- `phone: string`
- `whatsapp: string`
- `email: string`
- `address: string`
- `googleMapLink: string`
- `businessHours: string`
- `socialLinks: { facebook, instagram, youtube, linkedin }`
- `heroTitle: string`
- `heroSubtitle: string`
- `admissionYear: string`
- `ctaTexts: { primary, secondary }`
- `footerContent: string`
- `isMaintenanceMode: boolean` default false
- timestamps

Indexes:
- none required beyond singleton guard

### SEOSettings

Fields:
- `pageKey: string` required unique
- `path: string` required
- `metaTitle: string` required
- `metaDescription: string` required
- `keywords: string[]`
- `ogImage: ObjectId Upload`
- `robots: string` default `index,follow`
- `canonicalUrl: string`
- `schemaJson: object`
- timestamps

Indexes:
- unique pageKey
- path

### Upload

Fields:
- `originalName: string`
- `publicId: string` required unique
- `secureUrl: string` required
- `resourceType: enum image | video | raw`
- `format: string`
- `bytes: number`
- `width: number`
- `height: number`
- `folder: string`
- `altText: string`
- `uploadedBy: ObjectId AdminUser`
- `usedIn: [{ module, targetId }]`
- soft delete fields
- timestamps

Indexes:
- publicId
- resourceType
- folder
- uploadedBy

### AuditLog

Fields:
- `userId: ObjectId AdminUser`
- `action: string` required
- `module: string` required
- `targetId: ObjectId`
- `metadata: object`
- `ipAddress: string`
- `userAgent: string`
- `createdAt: Date`

Indexes:
- userId
- module
- action
- createdAt

### Notification

Fields:
- `title: string` required
- `message: string` required
- `type: enum Info | Success | Warning | Error`
- `recipient: ObjectId AdminUser`
- `module: string`
- `targetId: ObjectId`
- `isRead: boolean` default false
- `readAt: Date`
- timestamps

Indexes:
- recipient
- isRead
- createdAt

## 6. REST API Design

Base URL:

`/api/v1`

### Standard Response Shapes

Success:

```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

Pagination:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Public APIs

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/courses/public` | Published courses |
| GET | `/courses/public/:slug` | Published course detail |
| GET | `/faculty/public` | Published faculty |
| GET | `/results/public` | Published results |
| GET | `/gallery/public` | Published gallery |
| GET | `/testimonials/public` | Published testimonials |
| GET | `/notices/public` | Active notices |
| GET | `/blogs/public` | Published blogs |
| GET | `/blogs/public/:slug` | Blog detail |
| GET | `/settings/public` | Website settings |
| GET | `/seo/public?path=/courses` | SEO metadata |
| POST | `/enquiries` | Admission enquiry |
| POST | `/demo-requests` | Demo request |
| POST | `/scholarship` | Scholarship registration |
| POST | `/contact` | Contact message |
| POST | `/brochure-requests` | Brochure request |

### Protected CRUD Pattern

Use this consistent pattern for courses, faculty, results, gallery, testimonials, notices, blogs:

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/<resource>` | Auth + permission | List with filters |
| GET | `/<resource>/:id` | Auth + permission | Detail |
| POST | `/<resource>` | Auth + permission | Create |
| PATCH | `/<resource>/:id` | Auth + permission | Update |
| PATCH | `/<resource>/:id/publish` | Auth + permission | Publish/unpublish |
| PATCH | `/<resource>/:id/archive` | Auth + permission | Archive |
| DELETE | `/<resource>/:id` | Super Admin | Soft delete |

### Lead Management APIs

Admission enquiries:

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/enquiries` | Admin/Counsellor | List/filter/search |
| GET | `/enquiries/:id` | Admin/Counsellor | Detail |
| PATCH | `/enquiries/:id/status` | Admin/Counsellor | Update status |
| PATCH | `/enquiries/:id/assign` | Admin | Assign counsellor |
| POST | `/enquiries/:id/notes` | Admin/Counsellor | Add note |
| PATCH | `/enquiries/:id/follow-up` | Admin/Counsellor | Schedule follow-up |
| GET | `/enquiries/export/csv` | Admin | Export CSV |

Repeat equivalent patterns for:
- `/demo-requests`
- `/scholarship`
- `/contact`
- `/brochure-requests`

### Upload APIs

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| POST | `/uploads/image` | Auth | Upload image |
| POST | `/uploads/pdf` | Auth | Upload PDF |
| GET | `/uploads` | Auth | Media library |
| PATCH | `/uploads/:id` | Auth | Update alt text/metadata |
| DELETE | `/uploads/:id` | Admin | Delete from Cloudinary and archive record |

Validation:
- Images: jpg, jpeg, png, webp
- PDFs: pdf only
- Max image size: 5MB
- Max PDF size: 10MB

### Analytics APIs

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/analytics/dashboard` | Auth | Summary cards |
| GET | `/analytics/enquiries-by-day` | Auth | Line chart |
| GET | `/analytics/course-interest` | Auth | Course-wise chart |
| GET | `/analytics/lead-source` | Auth | Lead source chart |
| GET | `/analytics/conversion-funnel` | Auth | Funnel chart |
| GET | `/analytics/monthly-growth` | Auth | Growth chart |

## 7. Validation Strategy

Use Zod schemas at route boundaries.

Validate:
- Required fields
- Email format
- Phone format
- Slug format and uniqueness
- Status enums
- Role enums
- Password strength
- File type
- File size
- Mongo ObjectId format
- Pagination params
- Sort fields whitelist

Example password rules:
- Minimum 8 characters
- At least one uppercase
- At least one lowercase
- At least one number
- At least one special character

Example phone:
- Allow `+`, spaces, hyphens, parentheses
- Normalize before storing if possible

## 8. Security Architecture

Must include:

- Helmet for secure headers
- CORS whitelist from env
- Rate limiting globally and strict limits for auth
- Mongo query sanitization
- XSS protection through sanitization for rich text
- JWT access expiry
- Refresh token rotation
- bcrypt password hashing
- Strong password validation
- HTTP-only secure refresh cookie
- RBAC middleware
- Input validation on all routes
- File upload type and size validation
- Cloudinary folder restrictions
- Centralized error handler
- Request logging with Morgan/Winston
- Audit logging for sensitive actions
- Environment variable validation on startup
- No stack traces in production responses

Recommended limits:
- Login: 5 attempts per 15 minutes per IP/email
- Public forms: 10 submissions per hour per IP
- Uploads: 30 uploads per hour per admin

## 9. Audit Logging

Track:
- Admin login
- Failed login
- Logout
- Password reset
- Course create/update/publish/archive/delete
- Faculty update
- Result publish/unpublish
- Gallery upload/delete/reorder
- Enquiry status change
- Enquiry assignment
- User role change
- Settings update
- SEO update
- Media upload/delete

Audit fields:
- `userId`
- `action`
- `module`
- `targetId`
- `metadata`
- `ipAddress`
- `userAgent`
- `createdAt`

Audit logs should be append-only. Only Super Admin can view them.

## 10. Admin Dashboard UX and IA

### App Shell

Layout:
- Sidebar navigation
- Topbar with search, notifications, profile menu
- Main content area
- Toast notification region
- Confirmation modal layer

Sidebar groups:
- Overview: Dashboard
- Content: Courses, Faculty, Results, Gallery, Testimonials, Notices, Blogs
- Leads: Enquiries, Demo Requests, Scholarship, Contact Messages, Brochure Requests
- System: Media Library, Settings, SEO, Users and Roles, Audit Logs
- Account: Profile, Change Password

### Dashboard

Cards:
- Total enquiries
- Today’s enquiries
- Demo class requests
- Scholarship registrations
- Contact messages
- Active courses
- Published blogs
- Gallery count
- Follow-up reminders
- Conversion rate

Charts:
- Enquiries by day
- Course-wise interest
- Lead source
- Admission conversion funnel
- Monthly growth

Tables:
- Latest enquiries
- Upcoming follow-ups
- Recent activity

### Management Pages

Each CMS list page should include:
- Title and description
- Create button
- Search
- Filters
- Status tabs
- Data table
- Pagination
- Row actions
- Empty state
- Loading skeleton
- Error state

Each edit/create page should include:
- Form sections
- Validation messages
- Save draft if applicable
- Publish toggle
- SEO accordion
- Media upload
- Preview action where useful

### Enquiry CRM Page

Features:
- Search by name/phone
- Filter by course, status, assigned counsellor, date
- Kanban option later
- Status update
- Assign counsellor
- Add note
- Schedule follow-up
- Mark converted
- Export CSV

## 11. Upload Architecture

Flow:

1. Admin selects file.
2. Frontend validates obvious type/size.
3. Backend Multer receives file in memory or temp storage.
4. Backend validates MIME and size again.
5. Backend uploads to Cloudinary folder by module.
6. Backend stores Upload document with public_id and secure_url.
7. Backend returns Upload object.
8. CMS document references Upload `_id`.
9. Replacing media deletes old Cloudinary asset only after new upload succeeds.

Cloudinary folders:
- `veena-academy/logo`
- `veena-academy/courses`
- `veena-academy/faculty`
- `veena-academy/results`
- `veena-academy/gallery`
- `veena-academy/blogs`
- `veena-academy/brochures`

## 12. Backend Folder Structure

```txt
backend/
  src/
    config/
      db.ts
      env.ts
      cloudinary.ts
    controllers/
      auth.controller.ts
      course.controller.ts
      faculty.controller.ts
      result.controller.ts
      gallery.controller.ts
      testimonial.controller.ts
      notice.controller.ts
      blog.controller.ts
      enquiry.controller.ts
      demoRequest.controller.ts
      scholarship.controller.ts
      contact.controller.ts
      upload.controller.ts
      analytics.controller.ts
      settings.controller.ts
      seo.controller.ts
      auditLog.controller.ts
    middlewares/
      auth.middleware.ts
      rbac.middleware.ts
      error.middleware.ts
      validate.middleware.ts
      upload.middleware.ts
      rateLimit.middleware.ts
      sanitize.middleware.ts
    models/
      AdminUser.model.ts
      Course.model.ts
      Faculty.model.ts
      Result.model.ts
      GalleryItem.model.ts
      Testimonial.model.ts
      Notice.model.ts
      BlogPost.model.ts
      AdmissionEnquiry.model.ts
      DemoClassRequest.model.ts
      ScholarshipRegistration.model.ts
      ContactMessage.model.ts
      BrochureDownload.model.ts
      WebsiteSettings.model.ts
      SEOSettings.model.ts
      AuditLog.model.ts
      Notification.model.ts
      Upload.model.ts
    routes/
      auth.routes.ts
      course.routes.ts
      faculty.routes.ts
      result.routes.ts
      gallery.routes.ts
      testimonial.routes.ts
      notice.routes.ts
      blog.routes.ts
      enquiry.routes.ts
      demoRequest.routes.ts
      scholarship.routes.ts
      contact.routes.ts
      upload.routes.ts
      analytics.routes.ts
      settings.routes.ts
      seo.routes.ts
      auditLog.routes.ts
    services/
      auth.service.ts
      token.service.ts
      upload.service.ts
      email.service.ts
      analytics.service.ts
      audit.service.ts
      notification.service.ts
    utils/
      ApiError.ts
      ApiResponse.ts
      asyncHandler.ts
      slugify.ts
      pagination.ts
      pick.ts
    validations/
      auth.validation.ts
      course.validation.ts
      faculty.validation.ts
      enquiry.validation.ts
      upload.validation.ts
    app.ts
    server.ts
```

## 13. Admin Frontend Folder Structure

```txt
admin/
  src/
    components/
      common/
        Button.tsx
        Input.tsx
        Select.tsx
        Modal.tsx
        Toast.tsx
        EmptyState.tsx
        ConfirmDialog.tsx
      layout/
        AdminLayout.tsx
        Sidebar.tsx
        Topbar.tsx
      forms/
        CourseForm.tsx
        FacultyForm.tsx
        BlogForm.tsx
      tables/
        DataTable.tsx
        StatusBadge.tsx
      charts/
        EnquiriesChart.tsx
        FunnelChart.tsx
    pages/
      Login.tsx
      Dashboard.tsx
      Courses.tsx
      Faculty.tsx
      Results.tsx
      Gallery.tsx
      Testimonials.tsx
      Notices.tsx
      Blogs.tsx
      Enquiries.tsx
      DemoRequests.tsx
      Scholarship.tsx
      ContactMessages.tsx
      BrochureRequests.tsx
      MediaLibrary.tsx
      Settings.tsx
      SEO.tsx
      Users.tsx
      AuditLogs.tsx
      Profile.tsx
      ChangePassword.tsx
    hooks/
      useAuth.ts
      useDebounce.ts
      useConfirm.ts
    lib/
      api.ts
      auth.ts
      validation.ts
      queryClient.ts
    store/
      authStore.ts
    types/
      index.ts
    App.tsx
```

## 14. Deployment Plan

### Environments

Use:
- Development
- Staging
- Production

### Backend Environment Variables

- `PORT`
- `NODE_ENV`
- `MONGO_URI`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `ACCESS_TOKEN_EXPIRES_IN`
- `REFRESH_TOKEN_EXPIRES_IN`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CORS_ORIGIN`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASS`
- `RATE_LIMIT_WINDOW_MS`
- `RATE_LIMIT_MAX`

### Frontend Environment Variables

- `VITE_API_BASE_URL`
- `VITE_WHATSAPP_NUMBER`
- `VITE_PHONE_NUMBER`
- `VITE_SITE_URL`

### Hosting

- Backend: Render, Railway, or VPS
- Public website: Vercel or Netlify
- Admin dashboard: Vercel or Netlify
- Database: MongoDB Atlas
- Media: Cloudinary

### Release Checklist

- Environment variables configured
- MongoDB Atlas network access configured
- Cloudinary credentials configured
- CORS whitelist configured
- Admin seed user created securely
- Rate limits enabled
- HTTPS enabled
- Error logging active
- Backup strategy active

## 15. Future Scalability

This architecture should support:

- Student Portal
- Parent Portal
- Faculty Portal
- Attendance
- Test series
- Fee management
- Online payments
- Assignment upload
- Notes download
- LMS
- Push notifications
- Mobile app API
- AI chatbot

Future additions:
- Add `Student`, `Parent`, `Batch`, `Attendance`, `Test`, `Assignment`, `FeeInvoice`, and `Payment` collections.
- Add mobile API auth with role-specific access.
- Add notification channels: email, SMS, WhatsApp, push.
- Add event-driven jobs for reminders and follow-ups.

## 16. Implementation Phases

Phase 1:
- Backend setup
- MongoDB connection
- Auth module
- Admin user seed
- RBAC middleware

Phase 2:
- CMS modules: courses, faculty, results, gallery, testimonials
- Upload management

Phase 3:
- Lead modules: enquiries, demo requests, scholarship, contact
- Counsellor workflow

Phase 4:
- Admin dashboard shell
- Dashboard analytics
- Tables and forms

Phase 5:
- Settings, SEO, blogs, notices
- Public API integration with website

Phase 6:
- Audit logs, notifications, export CSV, polish

## 17. Final Engineering Checklist

Backend:
- TypeScript strict mode
- Central error handler
- Async handler
- Request validation
- Auth and RBAC middleware
- Audit logging
- Rate limiting
- Secure headers
- CORS whitelist
- Upload validation
- Soft delete support
- Pagination utility

Admin:
- Protected routes
- Role-aware sidebar
- TanStack Query cache
- React Hook Form + Zod
- Loading states
- Empty states
- Error states
- Confirmation dialogs
- Toasts
- Responsive dashboard layout

Security:
- Strong passwords
- Hashed refresh tokens
- HTTP-only cookies
- Account lock
- Token rotation
- Input sanitization
- Upload restrictions
- No secrets in frontend

Operations:
- Environment validation
- Production logging
- Database backups
- Cloudinary asset cleanup
- Monitoring and uptime checks

