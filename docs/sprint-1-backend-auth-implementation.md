# Sprint 1 - Backend Foundation and Real JWT Authentication

## Summary

Sprint 1 adds the first production backend foundation for Veena Academy and replaces mock admin authentication with real API-backed authentication.

The public website and admin CMS mock modules remain intact. Only the admin authentication layer moved from frontend mock state to backend JWT authentication.

## Implemented Backend Structure

```txt
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    scripts/
    services/
    tests/
    types/
    utils/
    validations/
    app.ts
    server.ts
  .env.example
  package.json
  tsconfig.json
  vitest.config.ts
```

## Implemented Endpoints

```txt
GET  /api/v1/health
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
GET  /api/v1/auth/me
POST /api/v1/auth/change-password
```

## Security Decisions

- Passwords are hashed with bcryptjs before storage.
- Admin passwords are excluded from normal Mongoose queries.
- Access tokens use a short-lived JWT payload with `sub`, `role`, and `tokenType`.
- Refresh tokens are stored as HTTP-only cookies.
- Refresh tokens are hashed before being stored in MongoDB.
- Refresh token rotation revokes the previous token.
- Reuse of a revoked refresh token revokes all active user sessions.
- Account lockout is applied after repeated failed login attempts.
- Sensitive auth actions are written to audit logs.
- CORS uses an environment-driven origin whitelist with credentials enabled.
- Helmet, JSON payload limits, cookie parsing, request logging, and rate limits are configured.

## API Response Contract

Success:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Readable error message",
  "errors": []
}
```

## Token Lifecycle

1. Admin logs in with email, password, and remember-me flag.
2. Backend validates credentials and account status.
3. Backend returns an access token and sets a refresh cookie.
4. Frontend keeps the access token in memory.
5. On page reload, frontend calls `/auth/refresh` to restore the session.
6. Refresh rotates the refresh token and returns a new access token.
7. Logout revokes the current refresh token and clears the cookie.
8. Password change revokes all sessions and redirects to login.

## Cookie Behavior

Development:

```txt
httpOnly: true
secure: false
sameSite: lax
path: /api/v1/auth
```

Production:

```txt
httpOnly: true
secure: true
sameSite: none
path: /api/v1/auth
```

## Frontend Integration

Updated admin frontend files include:

```txt
src/admin/lib/apiClient.ts
src/admin/lib/api.ts
src/admin/lib/auth.tsx
src/admin/components/layout/AdminLayout.tsx
src/admin/components/layout/PermissionRoute.tsx
src/admin/components/layout/AdminSidebar.tsx
src/admin/components/layout/AdminTopbar.tsx
src/admin/pages/LoginPage.tsx
src/admin/pages/ChangePasswordPage.tsx
src/admin/types/index.ts
```

Frontend auth now supports:

- Login
- Logout
- Refresh session on startup
- Current user loading
- Change password
- Protected admin route loading state
- Redirect to intended destination after login
- Role-aware navigation
- Unauthorized screen for insufficient permissions
- API retry after one refresh attempt on `401`

## Test Coverage

Backend tests use Vitest, Supertest, and MongoDB Memory Server.

Covered areas:

- Health route
- Seed admin creation and duplicate prevention
- Successful login
- Invalid password
- Unknown email
- Inactive account
- Locked account
- Validation failure
- Valid refresh token
- Missing refresh cookie
- Refresh token rotation
- Logout revocation and idempotency
- Current user endpoint
- Missing/invalid/inactive access checks
- Change password success and failures
- RBAC allowed and denied roles

## Verification Status

Passed:

```bash
npm run type-check --prefix backend
npm run build --prefix backend
npm test --prefix backend
npm run build
```

Note: Backend tests required unsandboxed execution in this environment because Vitest/Vite hit a Windows `spawn EPERM` inside the sandbox.

## Current Limitations

- Real MongoDB must be running for local backend dev and seed commands.
- Admin CMS modules still use typed mock data.
- Public website data still comes from local arrays.
- Forgot-password/reset-password email flow is not implemented in Sprint 1.
- Courses, faculty, results, gallery, testimonials, blogs, admissions CRM, uploads, settings CMS, SEO CMS, and analytics APIs are intentionally deferred.

## Next Sprint Recommendations

1. Add admin users CRUD with RBAC enforcement.
2. Add course CMS APIs and replace admin course mock data.
3. Add public published course API and gradually replace frontend static arrays.
4. Add upload foundation with Cloudinary.
5. Add audit log admin API.
6. Add production deployment environment docs and health monitoring.
