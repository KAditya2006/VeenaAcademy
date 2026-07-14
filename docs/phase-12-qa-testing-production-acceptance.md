# Phase 12 - Enterprise QA, Testing & Production Acceptance Blueprint

## Purpose

This document is the official quality gate for Veena Academy. It defines the QA strategy, testing matrix, audit checklists, release rules, and production acceptance criteria for the public website, admin dashboard, backend APIs, CMS, analytics, SEO, and deployment pipeline.

No feature, page, API, admin module, or release should be considered production ready until it satisfies the applicable criteria in this blueprint.

## 1. Master QA Strategy

Veena Academy must be tested as an enterprise education platform with business-critical lead capture, public trust pages, admin operations, content management, analytics, and future student/parent/faculty portals.

QA coverage must include:

- Public website functionality and conversion flows
- Admin dashboard functionality and RBAC restrictions
- Backend API validation, authentication, authorization, and error handling
- Database integrity, indexes, soft delete, and backup readiness
- Responsive UI across mobile, tablet, laptop, desktop, and wide screens
- Accessibility against WCAG AA expectations
- SEO readiness for public pages
- Performance and Core Web Vitals
- Security hardening
- Analytics accuracy without collecting PII
- Cross-browser compatibility
- Regression testing after every meaningful change

QA must happen in these stages:

1. Developer self-check before handoff
2. TypeScript and production build verification
3. Functional smoke testing
4. Responsive UI testing
5. Accessibility testing
6. API and integration testing
7. Security review
8. Performance and SEO audit
9. Cross-browser testing
10. Release candidate review
11. Post-deployment verification

## 2. Definition Of Done

A feature is complete only when all applicable items pass:

- Business requirement is satisfied.
- UI follows the Veena Academy design system.
- Component reuse is preferred over duplicated UI.
- TypeScript passes.
- Production build passes.
- Lint passes once a lint script is added to the project.
- Routing is intact.
- Layout is responsive at all required breakpoints.
- No horizontal overflow exists.
- No console errors exist.
- No runtime errors exist.
- Loading state exists for async flows.
- Empty state exists for list or search flows.
- Error state exists for failed operations.
- Success state exists for completed operations.
- Forms validate required fields and invalid formats.
- Accessibility has been checked.
- SEO is preserved for public pages.
- Performance has been checked.
- Security requirements are satisfied.
- API integration is verified where backend exists.
- Documentation is updated for major changes.
- Code review checklist is satisfied.

## 3. Frontend QA Checklist

Public website routes to verify:

- `/`
- `/about`
- `/courses`
- `/courses/:slug`
- `/faculty`
- `/results`
- `/gallery`
- `/contact`
- `/admission`
- `/blog`
- `/blog/:slug`
- `*` 404 route

Frontend checks:

- Navbar links navigate to the correct routes.
- Mobile hamburger opens and closes reliably.
- Sticky navbar does not cover page anchors or headings.
- Floating WhatsApp and call buttons remain usable on mobile.
- Hero CTAs are visible above the fold.
- Course cards render from data arrays.
- Course detail routes handle valid and invalid slugs.
- Gallery filters and lightbox behavior work.
- FAQ accordion is keyboard usable.
- Forms display validation errors.
- Form success states are visible and clear.
- Cards, buttons, badges, and sections follow the design system.
- Framer Motion animations are subtle and do not block content.
- Images or placeholders do not distort.
- Lazy routes load without blank permanent states.
- No duplicated UI patterns are introduced.
- Text does not overlap at any tested breakpoint.
- Footer links and contact actions are valid.

## 4. Backend QA Checklist

When backend implementation exists, verify:

- Controllers only handle request/response flow.
- Services contain business logic.
- Models contain schema definitions and validation.
- Routes only register endpoints and middlewares.
- Global error middleware returns consistent errors.
- Request validation exists for every write endpoint.
- Authentication middleware protects private routes.
- Authorization middleware enforces RBAC.
- Rate limiting protects sensitive endpoints.
- Security headers are enabled.
- CORS only allows approved origins.
- Passwords are hashed with a secure algorithm.
- JWT secrets are not hardcoded.
- Refresh token flow is protected.
- Upload endpoints validate type and size.
- Audit logs are created for important admin actions.
- Pagination exists for list endpoints.
- Search, filtering, and sorting behave predictably.
- Soft-deleted data is not shown publicly.
- API docs are updated when routes change.

## 5. Admin Dashboard QA Checklist

Admin routes to verify:

- `/admin/login`
- `/admin`
- `/admin/courses`
- `/admin/faculty`
- `/admin/results`
- `/admin/gallery`
- `/admin/testimonials`
- `/admin/notices`
- `/admin/blogs`
- `/admin/admissions`
- `/admin/demo-requests`
- `/admin/scholarship`
- `/admin/contact-messages`
- `/admin/media`
- `/admin/settings`
- `/admin/seo`
- `/admin/analytics`
- `/admin/users`
- `/admin/audit-logs`
- `/admin/profile`
- `/admin/change-password`

Admin checks:

- Login screen validates credentials.
- Protected admin routes redirect unauthenticated users.
- Logout clears session state.
- Sidebar collapse works on desktop.
- Mobile drawer opens, closes, and traps no content behind it.
- Topbar search is accessible.
- Role preview or real role state changes visible permissions correctly.
- RBAC hides or blocks restricted modules.
- Dashboard cards render correct data.
- Charts render at desktop and mobile widths.
- Tables do not overflow mobile layouts.
- Search filters records correctly.
- Status filters work.
- Empty states are shown when no data matches filters.
- Error states are shown when API calls fail.
- Bulk action buttons are disabled or safe when no rows are selected.
- Create, edit, publish, unpublish, reorder, delete, and upload flows are tested when connected to real APIs.
- Settings and SEO forms preserve validation and success feedback.
- Audit log page is read-only for non-authorized roles.

## 6. API Testing Plan

For every endpoint, test these response classes where applicable:

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `422 Unprocessable Entity`
- `429 Too Many Requests`
- `500 Internal Server Error`

API test dimensions:

- Valid payload
- Missing required fields
- Invalid field formats
- Extra unknown fields
- Invalid object IDs
- Duplicate slug or unique field conflict
- Expired token
- Invalid token
- Missing token
- Unauthorized role
- Pagination defaults
- Pagination limits
- Search query
- Filter combinations
- Sort order
- Empty result set
- Consistent response envelope
- No sensitive fields in response

Expected response pattern:

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {},
  "meta": {}
}
```

Expected error pattern:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

## 7. Responsive Testing Matrix

Test every public page and admin page at these widths:

| Width | Device Class | Required Checks |
| --- | --- | --- |
| 320px | Small mobile | No overflow, readable text, usable CTAs |
| 360px | Mobile | Navbar, forms, cards, floating actions |
| 375px | iPhone compact | Hero, spacing, touch targets |
| 390px | Modern mobile | Forms, gallery, tables, mobile drawer |
| 414px | Large mobile | CTA layout, footer, admin cards |
| 480px | Wide mobile | Section rhythm and card grids |
| 768px | Tablet portrait | Navigation, grids, cards, forms |
| 834px | Tablet | Admin layout, tables, gallery |
| 1024px | Tablet/laptop | Sidebar/topbar, hero balance |
| 1280px | Laptop | Full desktop layout |
| 1440px | Desktop | Section spacing, max widths |
| 1600px | Large desktop | Content does not stretch awkwardly |
| 1920px | Wide desktop | Layout remains premium and centered |

Elements to verify at every breakpoint:

- Navbar
- Sidebar and admin drawer
- Hero section
- Course cards
- Trust stat cards
- Result cards
- Faculty cards
- Forms
- Tables
- Charts
- Gallery
- FAQ
- Footer
- Floating buttons
- Typography
- Spacing
- Touch targets

## 8. Accessibility Audit Checklist

Accessibility must target WCAG AA quality.

Checklist:

- Page has a logical heading hierarchy.
- Public pages have one clear H1.
- Buttons use `button` elements where appropriate.
- Links navigate and buttons perform actions.
- Form fields have labels or accessible names.
- Validation errors are announced or placed near fields.
- Focus states are visible.
- Keyboard navigation works without traps.
- Mobile menu can be opened and closed with keyboard.
- Accordion controls expose expanded state.
- Icon-only buttons have accessible labels.
- Images have meaningful alt text or are decorative.
- Color contrast passes AA.
- Touch targets are at least 44px where practical.
- Motion is reduced when user prefers reduced motion.
- Modals restore focus after closing.
- Tables have useful headers.
- Admin charts have surrounding textual context.

## 9. Security Audit Checklist

Frontend security:

- No secrets in frontend code or Vite env files.
- External links use safe attributes where needed.
- Form values are validated before submission.
- No unsafe HTML rendering without sanitization.
- Error messages do not expose internal details.

Backend security when implemented:

- Helmet is enabled.
- CORS is restricted to approved domains.
- Rate limiting protects auth and form endpoints.
- Passwords are hashed.
- JWT access and refresh secrets are strong.
- Refresh tokens are rotated or invalidated safely.
- Cookies use secure settings where applicable.
- RBAC middleware protects admin APIs.
- Uploads enforce allowed MIME types and file sizes.
- Uploaded filenames cannot execute code.
- Mongo query injection is mitigated.
- XSS protections are in place.
- Audit logs capture admin changes.
- Environment variables are configured outside source control.
- Dependency vulnerabilities are reviewed before release.

## 10. Performance Audit Checklist

Targets:

- Lighthouse Performance: 90 or higher
- Lighthouse Accessibility: 95 or higher
- Lighthouse Best Practices: 95 or higher
- Lighthouse SEO: 95 or higher
- LCP below 2.5 seconds
- CLS below 0.1
- INP below 200ms
- TTFB below 800ms where backend exists

Checklist:

- Production build uses route-level code splitting.
- Heavy admin routes are not loaded on public pages unnecessarily.
- Images are optimized and sized.
- Images use lazy loading where appropriate.
- Critical above-fold media is prioritized.
- Bundle size is reviewed after adding dependencies.
- Unused CSS and JS are minimized.
- Fonts are loaded efficiently.
- Animations use transform and opacity where possible.
- No long blocking JavaScript tasks on core public pages.
- API responses are paginated.
- Static assets use caching.
- CDN is configured in production.

## 11. SEO Audit Checklist

For every public page, verify:

- Unique title tag.
- Unique meta description.
- Canonical URL.
- Open Graph title and description.
- Twitter card metadata where applicable.
- One H1.
- Logical H2/H3 structure.
- Readable route URL.
- Internal links work.
- Image alt text exists for meaningful images.
- Structured data is valid where used.
- Breadcrumbs are present where useful.
- 404 page returns an appropriate user experience.
- `robots.txt` exists and is correct.
- `sitemap.xml` exists and includes public routes.
- No admin routes are indexed.
- Contact information is consistent.
- Local business/education organization schema is ready before launch.

## 12. Analytics Verification Plan

Events to verify:

- `cta_book_demo_click`
- `cta_whatsapp_click`
- `cta_call_click`
- `form_admission_submit`
- `form_contact_submit`
- `form_scholarship_submit`
- `brochure_download`
- `course_card_click`
- `gallery_open`
- `faq_expand`
- `scroll_depth_75`

Analytics rules:

- Events fire once per intended user action.
- Event names match documented constants.
- Page path or page title is included where useful.
- No student name, phone number, email, message, or other PII is sent.
- Admin-only actions are separated from public marketing analytics.
- Failed form submissions do not trigger success events.
- Analytics are disabled or isolated in local development unless explicitly testing.
- GA4, Search Console, and Microsoft Clarity are verified after production deployment.

## 13. Release Checklist

Before release:

- `npm run build` passes.
- TypeScript passes.
- Lint passes once configured.
- No console errors on public routes.
- No console errors on admin routes.
- No broken routes.
- No broken images.
- No horizontal overflow.
- Public forms are working.
- Admin login is working when backend auth exists.
- Admin permissions are verified.
- SEO metadata is verified.
- Accessibility review is complete.
- Lighthouse targets are met.
- Analytics are connected and tested.
- Environment variables are configured.
- SSL is working.
- API health endpoint is reachable.
- Database backup is enabled.
- Cloudinary or media storage is configured.
- Monitoring is enabled.
- `robots.txt` is verified.
- `sitemap.xml` is generated and submitted.
- 404 route is tested.
- Documentation is current.
- Rollback plan is documented.

## 14. Post-Deployment Checklist

Immediately after deployment, verify:

- Homepage loads on production domain.
- Courses page loads.
- Course detail page loads.
- Faculty page loads.
- Results page loads.
- Gallery page loads.
- Blog list and blog detail pages load.
- Admission page loads.
- Contact page loads.
- 404 page works.
- Admin login loads.
- Admin dashboard loads after authentication.
- API health check passes.
- Lead submission reaches backend.
- Email or notification workflow works if configured.
- Image upload works if backend/media exists.
- Analytics events appear in debug tools.
- Search Console can access sitemap.
- Lighthouse production audit passes targets.
- SSL certificate is valid.
- WWW/non-WWW redirect is correct.
- HTTP redirects to HTTPS.

## 15. Regression Testing Plan

Run regression checks whenever adding or changing:

- Routing
- Navigation
- Public sections
- Forms
- Course data
- Gallery behavior
- Results data
- SEO metadata
- Admin dashboard layout
- Admin module permissions
- API contracts
- Authentication
- Uploads
- Analytics
- Dependencies
- Tailwind config
- Build tooling

Minimum regression smoke suite:

1. Build the app.
2. Open `/`, `/courses`, `/courses/jee-preparation`, `/admission`, `/contact`, `/blog`, `/admin`, and `/admin/courses`.
3. Verify public navbar and mobile menu.
4. Submit invalid and valid form data.
5. Verify floating WhatsApp and call actions.
6. Verify admin protected route behavior.
7. Verify admin table/search/filter behavior.
8. Check console for errors.
9. Check mobile width at 390px.
10. Check desktop width at 1440px.

## 16. Production Acceptance Criteria

Veena Academy can be marked production ready only when:

- All applicable QA checklists pass.
- Production build passes.
- Lint and type checks pass once lint tooling is configured.
- Public website routes are verified.
- Admin dashboard routes are verified.
- Backend APIs are verified where implemented.
- Database integrity and backup readiness are verified.
- Security review passes.
- Accessibility review passes.
- SEO review passes.
- Responsive review passes.
- Performance targets are met.
- Analytics are verified without PII leakage.
- Monitoring is enabled.
- Rollback process is known.
- Documentation is complete.
- No critical or high-severity bugs remain open.

## Current Project QA Status

As of this phase:

- `npm run build` is the active production verification command.
- The project does not currently define a separate `lint` script.
- The frontend and admin dashboard currently use mock/API-ready data for admin operations.
- Real backend, JWT auth, database, Cloudinary uploads, and production API integration are planned but not fully connected in this workspace.
- This document is the acceptance standard for those future implementation phases.
