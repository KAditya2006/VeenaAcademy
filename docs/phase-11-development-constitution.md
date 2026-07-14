# Phase 11 - Veena Academy Enterprise Development Constitution

## Purpose

This document defines the engineering constitution for Veena Academy. It is the execution standard for all future product, frontend, backend, admin, CMS, SEO, analytics, deployment, and performance work.

Veena Academy must be treated as an enterprise-grade education platform, not a throwaway landing page or temporary prototype. Every new feature should improve long-term maintainability, scalability, accessibility, performance, developer experience, user experience, and business value.

## Project Ownership Standard

The developer role for this project is technical ownership, not isolated code generation.

Before implementation, every change must be evaluated against:

- Existing project architecture
- Product and UX documentation
- UI design system
- Frontend architecture
- Backend and CMS architecture
- Admin dashboard architecture
- SEO, analytics, deployment, and performance requirements
- Existing components, hooks, data structures, routes, and conventions

Working features must not be rewritten unless there is a clear architectural reason and all downstream usage is updated safely.

## Source Of Truth

The project documentation is the source of truth for future development:

- [Phase 3 UX Blueprint](phase-3-ux-blueprint.md)
- [Phase 4 UI Design Blueprint](phase-4-ui-design-blueprint.md)
- [Phase 6 Backend, Admin, CMS Architecture](phase-6-backend-admin-cms-architecture.md)
- [Phase 7 Deployment, SEO, Performance, Analytics](phase-7-deployment-seo-performance-analytics.md)
- [Phase 8 Final Master Blueprint](phase-8-final-master-blueprint.md)
- [Project Overview](../project-overview.md)

When multiple implementation options exist, choose the option that best supports maintainability and scalability over short-term speed.

## Non-Negotiable Development Principles

All work must follow these principles:

- Understand the requirement before editing files.
- Review the existing architecture before creating new structure.
- Reuse existing components, hooks, helpers, data arrays, and layout patterns.
- Avoid duplicated UI, repeated data, and parallel design systems.
- Keep code modular and typed.
- Prefer composition over duplication.
- Keep pages thin and move business logic outside UI components.
- Keep naming consistent across files, routes, data, and UI labels.
- Preserve routing, SEO, accessibility, responsiveness, and existing behavior.
- Update documentation when major features or architecture are added.

## Frontend Constitution

Frontend work must use:

- TypeScript
- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion where motion adds clarity or polish
- Existing reusable components before new components
- Semantic HTML
- Accessible controls and visible focus states
- Responsive layouts across mobile, tablet, laptop, and desktop

Frontend rules:

- Do not invent random colors, spacing, typography, or motion styles.
- Do not create one-off components when a reusable component can serve the need.
- Do not overuse animation.
- Lazy load route-level pages where practical.
- Keep forms validated with structured schemas.
- Handle loading, success, empty, and error states for async experiences.
- Preserve one H1 per public page.
- Use alt text for meaningful images.

## Admin Dashboard Constitution

The admin dashboard must remain a SaaS-quality operating system for Veena Academy.

Admin work must preserve:

- Protected admin routing
- Role-based access control
- Sidebar and topbar shell
- Responsive mobile drawer
- Reusable dashboard cards, tables, search, filters, badges, and chart components
- Clear loading, empty, and error states
- Audit-friendly action patterns
- API-ready mock service boundaries until real backend integration is added

Admin modules should stay data-driven and should not duplicate table, card, or form patterns without a reason.

## Backend Constitution

Backend work must preserve separation of concerns:

- Controllers handle request and response flow only.
- Services contain business logic.
- Models define database schemas and validation.
- Routes define route registration only.
- Middlewares handle authentication, authorization, validation, rate limiting, errors, and security.

Every API endpoint must:

- Validate input.
- Return consistent response shapes.
- Handle errors gracefully.
- Support pagination where list data can grow.
- Support filtering, searching, and sorting where relevant.
- Avoid exposing sensitive information.
- Use RBAC for protected admin operations.
- Log important actions.

## Database Constitution

Database design must be scalable and normalized.

Database rules:

- Avoid duplicated data.
- Use indexes for searchable and frequently queried fields.
- Use timestamps.
- Use soft delete for recoverable CMS/admin records.
- Use slugs for public content URLs.
- Validate schemas.
- Prepare content, leads, users, analytics, and audit logs for future growth.

## Security Constitution

Security is mandatory for all production-facing backend and admin work.

Rules:

- Hash passwords.
- Validate all input.
- Escape unsafe values.
- Use JWT securely.
- Protect admin routes and APIs.
- Protect file uploads.
- Enforce RBAC.
- Rate limit sensitive endpoints.
- Avoid committing secrets.
- Never expose private credentials in frontend code.

## SEO And Performance Constitution

Public website work must preserve:

- Semantic HTML
- Metadata per page
- Canonical URLs
- Structured data where useful
- Clean readable URLs
- Alt text
- Sitemap and robots files
- Fast page loads
- Optimized bundles
- Lazy loaded route chunks and media where practical
- Core Web Vitals awareness

Performance rules:

- Avoid unnecessary dependencies.
- Avoid unnecessary renders.
- Keep animation lightweight.
- Split heavy admin/public features where practical.
- Run production builds after meaningful code changes.

## Accessibility Constitution

Accessibility is part of production readiness.

All interactive experiences must support:

- Keyboard navigation
- Visible focus states
- Readable contrast
- Large enough touch targets
- Screen reader labels where visible text is not sufficient
- Responsive text and layouts
- ARIA attributes only where they improve clarity

## Quality Gate

Before any major task is considered complete, verify:

- TypeScript build passes.
- Production build passes.
- Existing routing remains intact.
- Public pages remain SEO-friendly.
- Admin routes remain protected.
- Mobile and desktop layouts remain responsive.
- Forms validate user input.
- Async operations show loading, empty, and error states.
- No unrelated files were modified.
- Documentation is updated when architecture or major modules change.

## Current Implementation Alignment

The current codebase already follows this constitution in several areas:

- Public pages use React Router and lazy route loading.
- Public content is driven by reusable data arrays.
- Common UI components live under `src/components/common`.
- Admin code is isolated under `src/admin`.
- Admin pages use reusable cards, tables, charts, badges, and layout components.
- Admin data access is routed through an API-ready mock service layer.
- SEO utilities and metadata components exist for public pages.
- The project builds with TypeScript and Vite.

Future work should extend these patterns instead of replacing them.
