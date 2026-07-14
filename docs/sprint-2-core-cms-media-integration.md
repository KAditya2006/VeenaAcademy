# Sprint 2 - Core CMS APIs, Cloudinary Media, and Public/Admin Integration

## Summary

Sprint 2 introduces the first real CMS content pipeline for Veena Academy:

```txt
Admin Dashboard -> Protected REST APIs -> MongoDB -> Cloudinary Media -> Public REST APIs -> Public Website
```

Implemented modules:

- Courses
- Faculty
- Results
- Gallery
- Image uploads

Testimonials, blogs, notices, lead CRM, settings, SEO CMS, and dashboard analytics remain outside this sprint.

## Backend Models

Added models:

```txt
Course
Faculty
Result
GalleryItem
Upload
```

All CMS records support:

- `createdBy`
- `updatedBy`
- `isPublished`
- `publishedAt`
- `isDeleted`
- `deletedAt`
- `sortOrder`
- timestamps

Image-bearing records store a media object instead of a raw URL:

```ts
{
  publicId: string;
  secureUrl: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
  altText?: string;
}
```

## API Endpoints

Public:

```txt
GET /api/v1/courses/public
GET /api/v1/courses/public/:slug
GET /api/v1/faculty/public
GET /api/v1/faculty/public/:slug
GET /api/v1/results/public
GET /api/v1/gallery/public
```

Protected admin:

```txt
GET    /api/v1/courses
POST   /api/v1/courses
GET    /api/v1/courses/:id
PATCH  /api/v1/courses/:id
DELETE /api/v1/courses/:id
PATCH  /api/v1/courses/:id/publish
PATCH  /api/v1/courses/:id/feature
PATCH  /api/v1/courses/reorder
```

The same admin CRUD pattern exists for:

```txt
/api/v1/faculty
/api/v1/results
/api/v1/gallery
```

Uploads:

```txt
POST   /api/v1/uploads/image
DELETE /api/v1/uploads/:id
```

## RBAC

Protected CMS write actions allow:

- `super_admin`
- `admin`
- `content_manager`

Read access allows:

- `super_admin`
- `admin`
- `content_manager`
- `counsellor`
- `faculty`

Permanent media deletion is restricted to:

- `super_admin`
- `admin`

Backend RBAC is the final authority.

## Cloudinary Setup

Backend env variables:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER_ROOT=veena-academy
MAX_IMAGE_SIZE_MB=5
```

Allowed uploads:

- JPG
- JPEG
- PNG
- WebP

Rejected uploads:

- SVG
- Executables
- Unsupported MIME types
- Files larger than configured max size

Cloudinary secrets are backend-only and must never be exposed to the frontend.

## Upload Rules

- Multer uses memory storage.
- Uploads do not write permanent local files.
- Upload records are stored in MongoDB.
- Linked active media cannot be deleted directly.
- Upload actions are audit logged.
- CMS record deletion is soft delete and does not immediately delete media.

## Public/Private Field Differences

Faculty public APIs intentionally exclude:

- email
- phone

Admin APIs can return these fields to authorized users.

Public APIs return only:

- published records
- non-deleted records

Draft and deleted records never appear publicly.

## Frontend Integration

Admin integration:

- `src/admin/lib/api.ts` now uses real APIs for Courses, Faculty, Results, and Gallery.
- `src/admin/pages/ModulePage.tsx` now supports real CMS listing, create/update basics, publish/unpublish, feature/unfeature, soft delete, loading, empty, error, and retry states for Sprint 2 modules.
- Non-Sprint-2 modules still use mock data.

Public integration:

- `src/lib/publicApi.ts` fetches public CMS data.
- `src/components/sections/Courses.tsx` uses `/courses/public`.
- `src/pages/CourseDetailsPage.tsx` uses `/courses/public/:slug` and CMS SEO fields.
- `src/components/sections/Faculty.tsx` uses `/faculty/public`.
- `src/components/sections/Results.tsx` uses `/results/public`.
- `src/components/sections/Gallery.tsx` uses `/gallery/public`.

## Static Fallback Strategy

Frontend fallback is development-only and explicit:

```env
VITE_ENABLE_STATIC_FALLBACK=true
```

Production should keep:

```env
VITE_ENABLE_STATIC_FALLBACK=false
```

When fallback is disabled and the backend is unavailable, public sections show a clean unavailable/retry state instead of fake content.

## Seed Strategy

Added:

```bash
npm run seed:cms --prefix backend
```

Seed behavior:

- Seeds the nine existing course structures.
- Does not overwrite existing records.
- Development/test may seed clearly marked placeholders for faculty, results, and gallery.
- Production avoids fake person/result/gallery data.

## Tests

Backend tests cover:

- public published-only filtering
- draft detail rejection
- admin auth requirement
- RBAC create denial for counsellor
- content manager create permission
- duplicate slug rejection
- update/publish/feature/delete/reorder
- pagination/search
- faculty public privacy
- result percentage validation
- gallery image/alt validation
- upload accept/reject behavior
- linked upload deletion rejection

## Verification

Passed:

```bash
npm run type-check --prefix backend
npm run build --prefix backend
npm test --prefix backend
npm run build
```

Note: backend Vitest runs required unsandboxed execution in this Windows environment because sandboxed Vitest previously hit `spawn EPERM`.

## Known Limitations

- Cloudinary deletion cleanup for replaced CMS images is not a background job yet.
- Admin forms are intentionally pragmatic for Sprint 2 and can be refined with richer module-specific UX later.
- Testimonials, notices, blogs, CRM leads, settings, SEO CMS, and analytics remain mock/static.
- Public homepage institutional counters still come from static data, not CMS/settings.
- Media Library is limited to assets uploaded through Sprint 2 upload endpoints.

## Next Sprint Recommendations

1. Add richer module-specific admin forms and confirmations.
2. Add Cloudinary-safe image replacement cleanup workflow per CMS service.
3. Connect testimonials, blogs, and notices CMS.
4. Connect enquiry/admission/demo/scholarship forms to backend APIs.
5. Add settings and SEO CMS.
6. Add admin dashboard analytics APIs.
