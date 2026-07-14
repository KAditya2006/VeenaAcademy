# Veena Academy Phase 7 Deployment, SEO, Performance and Analytics Blueprint

## 1. Production Architecture

Veena Academy should launch as a secure, fast, SEO-ready platform with separate deployments for the public website, admin dashboard, backend API, database, and media storage.

Recommended production stack:

| Layer | Recommended Service |
| --- | --- |
| Public Website | Vercel or Netlify |
| Admin Dashboard | Vercel or Netlify |
| Backend API | Render, Railway, or VPS |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
| DNS/CDN/Security | Cloudflare |
| Email | Resend, Brevo, or SMTP provider |
| Analytics | Google Analytics 4 |
| UX Analytics | Microsoft Clarity |
| Monitoring | UptimeRobot, Sentry |
| Logs | Render/Railway logs, Better Stack optional |

Production domain structure:

```txt
www.veenaacademy.com        -> Public website
admin.veenaacademy.com      -> Admin dashboard
api.veenaacademy.com        -> Backend API
```

Future portal domains:

```txt
student.veenaacademy.com    -> Student portal
parent.veenaacademy.com     -> Parent portal
faculty.veenaacademy.com    -> Faculty portal
```

## 2. Environment Strategy

Use three isolated environments:

1. Development
2. Staging
3. Production

Each environment must have separate:

- API URL
- Database
- Cloudinary folder
- CORS origin
- Analytics keys
- Admin credentials
- Email credentials
- JWT secrets

Rule:

Never use the production database in development or staging.

## 3. Environment Variables

### Public Website

```env
VITE_SITE_URL=https://www.veenaacademy.com
VITE_API_BASE_URL=https://api.veenaacademy.com/api/v1
VITE_WHATSAPP_NUMBER=
VITE_PHONE_NUMBER=
VITE_GA_MEASUREMENT_ID=
VITE_CLARITY_PROJECT_ID=
```

### Admin Dashboard

```env
VITE_ADMIN_URL=https://admin.veenaacademy.com
VITE_API_BASE_URL=https://api.veenaacademy.com/api/v1
```

### Backend

```env
NODE_ENV=production
PORT=5000
MONGO_URI=
CORS_ORIGIN=https://www.veenaacademy.com,https://admin.veenaacademy.com
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=
ADMIN_PASSWORD=
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

Security rule:

- Never commit `.env` files.
- Store production secrets only in hosting provider secret managers.
- Rotate secrets after launch if they were shared during setup.

## 4. DNS and Cloudflare Plan

Use Cloudflare for:

- DNS management
- SSL/TLS
- CDN
- Basic DDoS protection
- Redirect rules
- Cache rules
- Domain verification TXT records

Required DNS records:

| Type | Name | Target |
| --- | --- | --- |
| CNAME/A | `www` | Vercel/Netlify website target |
| CNAME/A | root domain | Vercel/Netlify website target |
| CNAME | `admin` | Admin deployment target |
| CNAME | `api` | Backend provider target |
| TXT | verification | Google Search Console, email provider, hosting |
| MX | email | Email provider if domain email is used |

Redirect strategy:

- `veenaacademy.com` redirects to `www.veenaacademy.com`
- HTTP redirects to HTTPS
- Remove duplicate trailing slash patterns where possible

## 5. Frontend Deployment Checklist

Public website:

- Build command: `npm run build`
- Output directory: `dist`
- Add production environment variables
- Connect custom domain
- Enable HTTPS
- Configure SPA fallback to `index.html`
- Test all routes directly:
  - `/`
  - `/about`
  - `/courses`
  - `/courses/jee-preparation`
  - `/faculty`
  - `/results`
  - `/gallery`
  - `/contact`
  - `/admission`
- Test WhatsApp link
- Test call link
- Test contact/admission form
- Test 404 page
- Check mobile layout
- Check Lighthouse

Admin dashboard:

- Build command: `npm run build`
- Output directory: `dist`
- Add admin environment variables
- Connect `admin.veenaacademy.com`
- Protect admin routes with authentication
- Test login/logout
- Test refresh token behavior
- Test role permissions
- Test media upload flow
- Test table filters and forms

## 6. Backend Deployment Checklist

Backend production setup:

- Add production environment variables
- Connect MongoDB Atlas
- Configure CORS whitelist
- Enable Helmet
- Enable rate limiting
- Enable request logging
- Enable centralized error handler
- Configure Cloudinary
- Configure email service
- Configure health endpoint
- Enable HTTPS through hosting provider
- Seed first Super Admin securely
- Test all public APIs
- Test all protected APIs
- Test file uploads
- Test auth refresh/logout

Health endpoint:

```txt
GET /api/v1/health
```

Expected response:

```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "ISO_DATE"
}
```

Recommended backend checks:

- `/api/v1/health` returns 200
- public course API returns only published records
- protected routes reject unauthenticated requests
- invalid payloads return validation errors
- upload endpoint rejects invalid files
- CORS blocks unknown origins

## 7. MongoDB Atlas Setup

Checklist:

- Create production cluster
- Create staging cluster or separate staging database
- Create database user with strong password
- Restrict network access where possible
- Enable automated backups
- Create required indexes
- Monitor slow queries
- Enable alerts for high CPU/storage
- Never expose connection string in logs or frontend

Backup recommendations:

- Automated daily backups
- Weekly manual backup before major releases
- Test restore process quarterly

## 8. Cloudinary Setup

Production folder structure:

```txt
veena-academy/
  courses/
  faculty/
  results/
  gallery/
  blogs/
  testimonials/
  settings/
  brochures/
```

Upload rules:

- Validate file type on frontend and backend
- Validate file size on backend
- Store `public_id`
- Store `secure_url`
- Store alt text
- Delete old files when replaced
- Use Cloudinary transformations for responsive images
- Prefer WebP/AVIF delivery where possible

Image transformation examples:

- Hero: width 1400, quality auto, format auto
- Cards: width 700, quality auto, format auto
- Thumbnails: width 320, height 240, crop fill, quality auto, format auto

## 9. Technical SEO Strategy

Every public page must include:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter card tags
- Structured data where relevant
- Semantic HTML
- Proper heading hierarchy
- Descriptive image alt text
- Clean URL
- Fast loading

Heading rules:

- One H1 per page
- H2 for major page sections
- H3 for cards and grouped content

## 10. Page SEO Plan

Homepage:

- Title: `Veena Academy | Coaching for Boards, JEE, NEET, CUET & SSC`
- Description: `Join Veena Academy for expert coaching, regular tests, doubt support, library, transport facility, and result-oriented preparation for Boards, JEE, NEET, CUET, SSC, and Foundation courses.`

Courses:

- Title: `Courses at Veena Academy | Boards, JEE, NEET, CUET, SSC`
- Description: `Explore Veena Academy courses for Class 6-12, JEE, NEET, CUET, SSC, scholarship preparation, and foundation programs.`

Faculty:

- Title: `Expert Faculty at Veena Academy`
- Description: `Meet experienced teachers at Veena Academy providing personal guidance, doubt support, and result-oriented coaching.`

Results:

- Title: `Veena Academy Results & Student Achievements`
- Description: `View topper results, student achievements, ranks, marks, and success stories from Veena Academy.`

Contact:

- Title: `Contact Veena Academy | Admission Enquiry`
- Description: `Contact Veena Academy for admission enquiry, demo class, scholarship test, course details, transport, and counselling.`

Course detail pages:

- Title format: `[Course Name] at Veena Academy | Admission Open`
- Description format: `Join Veena Academy for [Course Name] with expert faculty, regular tests, doubt support, study material, and personal mentorship.`

## 11. Local SEO Plan

Future local landing pages:

```txt
Best Coaching in [City]
Best JEE Coaching in [City]
Best NEET Coaching in [City]
Best CUET Coaching in [City]
Best SSC Coaching in [City]
Class 10 Coaching in [City]
Class 12 Coaching in [City]
```

Local SEO assets:

- Google Business Profile
- Accurate NAP: name, address, phone
- Map embed
- LocalBusiness schema
- Parent/student reviews
- City-specific FAQs
- Location keywords
- Photos of academy exterior/interior

Local consistency:

- Website address must match Google Business Profile
- Same phone number across website, GBP, directories, and social profiles

## 12. Structured Data Plan

Recommended JSON-LD:

- `EducationalOrganization`
- `LocalBusiness`
- `Course`
- `FAQPage`
- `BreadcrumbList`
- `Article`
- `Review`, only when reviews are genuine and schema-compliant

EducationalOrganization fields:

- name
- url
- logo
- address
- telephone
- email
- sameAs
- courses
- openingHours

Course schema fields:

- name
- description
- provider
- educationalCredentialAwarded if applicable
- courseMode if relevant

FAQ schema:

- Use only for visible FAQ content on the page.

Breadcrumb schema:

- Use on all detail pages:
  - Course detail
  - Blog detail
  - City landing pages

## 13. Sitemap Strategy

Generate sitemap for:

- Home
- About
- Courses
- Individual course pages
- Faculty
- Results
- Gallery
- Blog
- Blog details
- Contact
- Admission

Future sitemap additions:

- City landing pages
- Scholarship pages
- Public event pages
- Public notice pages

Sitemap URL:

```txt
https://www.veenaacademy.com/sitemap.xml
```

Submit sitemap to:

- Google Search Console
- Bing Webmaster Tools

## 14. Robots.txt Plan

Recommended robots:

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /dashboard
Disallow: /private

Sitemap: https://www.veenaacademy.com/sitemap.xml
```

Notes:

- Admin dashboard should also require authentication.
- API should not be crawled.
- Do not block public course/blog pages.

## 15. Performance Strategy

Targets:

- Lighthouse Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- LCP: under 2.5s
- CLS: under 0.1
- INP: under 200ms

Optimization checklist:

- Lazy load below-the-fold images
- Use WebP/AVIF
- Compress assets
- Use route-level code splitting
- Minimize JavaScript
- Avoid layout shifts
- Preload critical fonts if self-hosted
- Use responsive images
- Cache static assets
- Optimize Cloudinary transformations
- Remove unused CSS
- Defer non-critical scripts
- Avoid autoplay video above the fold
- Respect reduced motion

## 16. Image Optimization

Every image must include:

- Alt text
- Width and height
- Responsive sizes
- Lazy loading unless above fold
- WebP/AVIF where possible
- Cloudinary transformation

Hero image:

- Preload only if it is critical to LCP
- Use optimized desktop and mobile sizes
- Avoid background video on mobile
- Avoid oversized source images

Gallery:

- Lazy load all images
- Use blur placeholder
- Avoid masonry layout shifts by reserving dimensions
- Use thumbnail images in grid and full images in lightbox

Faculty/results:

- Use consistent aspect ratios
- Crop via Cloudinary
- Provide descriptive alt text

## 17. Font Optimization

Fonts:

- Instrument Serif
- Inter

Checklist:

- Preconnect to Google Fonts if using hosted fonts
- Use `font-display: swap`
- Limit font weights
- Avoid unnecessary italic variants unless used
- Consider self-hosting fonts for higher performance control
- Preload only critical self-hosted font files

Recommended weights:

- Instrument Serif: 400
- Inter: 400, 500, 600, 700, 800

## 18. Analytics Tracking Plan

Use Google Analytics 4.

Track events:

| Event | Trigger |
| --- | --- |
| `cta_book_demo_click` | Book Free Demo click |
| `cta_whatsapp_click` | WhatsApp click |
| `cta_call_click` | Call Now click |
| `form_admission_submit` | Admission form success |
| `form_contact_submit` | Contact form success |
| `form_scholarship_submit` | Scholarship form success |
| `brochure_download` | Brochure download |
| `course_card_click` | Course card/detail CTA click |
| `faculty_view` | Faculty page/card interaction |
| `gallery_open` | Gallery lightbox open |
| `faq_expand` | FAQ item expanded |
| `scroll_depth_75` | User reaches 75% scroll |
| `page_view` | Route/page view |
| `lead_conversion` | Lead marked converted in admin |

Event naming rules:

- lowercase
- snake_case
- action-oriented
- stable over time

Recommended event parameters:

- `page_path`
- `course_slug`
- `cta_location`
- `lead_type`
- `device_type`

## 19. Microsoft Clarity Plan

Use Clarity for:

- Heatmaps
- Session recordings
- Rage clicks
- Dead clicks
- Mobile usability issues
- Scroll behavior

Privacy rules:

- Mask all form inputs
- Do not record sensitive lead data
- Do not expose admin dashboard session recordings unless explicitly required and privacy-reviewed

## 20. Security Checklist

Frontend:

- No secrets in frontend environment variables
- Validate forms
- Avoid unsafe HTML
- Use secure external links with `rel="noopener noreferrer"` when opening new tabs
- Disable production source maps if needed
- Do not expose admin-only routes through public navigation

Backend:

- Helmet
- CORS whitelist
- Rate limiting
- Mongo sanitization
- Input validation
- Secure cookies
- JWT expiry
- Refresh token rotation
- File upload validation
- Error messages do not leak internals
- HTTPS only
- Strong admin password
- Audit logs

Admin:

- Protected routes
- Role-based navigation
- Session expiry
- Logout all sessions option later
- Confirmation dialog for destructive actions

## 21. Backup Strategy

Database:

- MongoDB Atlas automated backups
- Weekly manual backup before major releases
- Restore test process documented

Media:

- Cloudinary folder organization
- Store `public_id` in database
- Keep brochure PDFs backed up
- Avoid orphaned assets with cleanup jobs

Code:

- GitHub repository
- Protected `main` branch
- Pull request review before production
- Private documentation for environment variables

## 22. Monitoring Plan

Use:

- UptimeRobot for uptime
- Sentry for frontend/backend errors
- Hosting provider logs
- MongoDB Atlas metrics
- Google Search Console
- GA4
- Microsoft Clarity

Monitor:

- API downtime
- Website downtime
- Form submission errors
- Admin login failures
- Slow pages
- Broken links
- 404 pages
- Server errors
- Database connection errors
- Upload failures
- Search indexing issues

Alert recommendations:

- API down for more than 2 minutes
- Website down for more than 2 minutes
- 5xx rate above threshold
- Database connection failures
- Spike in login failures

## 23. CI/CD Workflow

Branch strategy:

```txt
main        -> production
staging     -> staging
dev         -> development
```

Deployment flow:

1. Push feature branch.
2. Open pull request into `dev`.
3. Run checks.
4. Merge to `dev`.
5. Merge to `staging`.
6. Deploy staging.
7. QA staging.
8. Merge to `main`.
9. Deploy production.
10. Monitor production.

Required checks before production:

- `npm run build`
- `npm run lint`
- `npm run type-check`
- Core route smoke test
- Form submission test
- Admin login test
- API health check
- Environment variable check
- Database backup check

## 24. Launch Checklist

Before launch:

- Domain connected
- HTTPS working
- DNS verified
- Sitemap generated
- Robots.txt added
- Google Search Console connected
- GA4 connected
- Microsoft Clarity connected
- Forms tested
- WhatsApp link tested
- Call button tested
- All images optimized
- All pages responsive
- 404 page ready
- Admin login tested
- Role permissions tested
- Database backup enabled
- Cloudinary upload tested
- SEO metadata checked
- Structured data validated
- Lighthouse tested
- Broken links fixed
- Contact details verified
- Email notifications tested
- CORS configured
- Rate limits enabled
- Error logging enabled

## 25. Post-Launch Plan

First 7 days:

- Monitor errors daily
- Check form submissions
- Check Google Search Console indexing
- Review Clarity recordings
- Fix mobile UX issues
- Check page speed
- Verify leads are received
- Check API uptime
- Review broken links and 404s

First 30 days:

- Add blogs
- Add more results
- Add parent testimonials
- Add local SEO pages
- Improve conversion rate
- Add FAQ updates
- Track top courses
- Optimize landing pages
- Review GA4 conversion paths
- Add Google Business Profile posts

Ongoing monthly:

- Lighthouse audit
- Search Console audit
- Broken link scan
- Content update
- Backup restore check, at least quarterly
- Dependency security audit

## 26. Final Production Readiness Checklist

Deployment:

- Public website deployed
- Admin dashboard deployed
- Backend API deployed
- MongoDB Atlas configured
- Cloudinary configured
- Domains and SSL configured

SEO:

- Titles and descriptions complete
- Sitemap submitted
- Robots.txt correct
- Structured data validated
- Canonicals present
- Image alt text present

Performance:

- LCP under 2.5s
- CLS under 0.1
- INP under 200ms
- Images optimized
- Fonts optimized
- Routes code split

Analytics:

- GA4 page views working
- CTA events working
- Form submit events working
- Clarity installed and masking forms

Security:

- No frontend secrets
- CORS whitelist active
- Rate limits active
- HTTPS active
- Upload validation active
- Admin auth tested

Monitoring:

- Uptime monitoring active
- Error tracking active
- Backend logs accessible
- Database alerts active

Operations:

- Backup enabled
- Restore process documented
- Launch owner assigned
- Post-launch monitoring schedule defined

