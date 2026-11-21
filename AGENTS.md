<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MentorLagbe — Agent & Contributor Guidelines

These guidelines are **permanent** and apply to every future change in this repository. Read this file and `PROJECT_REQUIREMENTS.md` before touching any code.

---

## 0. Source of Truth

Read in this order before implementing anything:

1. `AGENTS.md` (this file) — how to work in this codebase.
2. `PROJECT_REQUIREMENTS.md` — what the product must do. Treat it as the primary specification.
3. The existing code — the actual source of truth for what currently works.

If the specification and the existing code disagree, **stop and ask** before changing architecture. Do not silently "fix" the spec or the code.

**Requirement preservation rule:** never delete, weaken, or replace an existing requirement from `PROJECT_REQUIREMENTS.md`. New requirements are **added alongside** old ones. If a new requirement conflicts with an old one, raise the conflict and wait for a decision.

---

## 1. Non-Negotiable Development Rules

1. **Never rebuild the project from scratch.** Extend the existing app. No rewrites, no re-scaffolding, no replacing working modules.
2. **Always inspect existing code first.** Read the related pages, components, hooks, utilities, types, and API routes before writing a line.
3. **Preserve existing architecture and working functionality.** If it works today, it must still work after your change.
4. **Reuse before creating.** Prefer existing components, hooks, utilities, UI primitives, and API routes over new ones. Only add a new abstraction when nothing suitable exists.
5. **Follow existing conventions.** Match the surrounding file's structure, naming, import order, styling, and formatting. Consistency beats personal preference.
6. **Maintain a consistent professional UI/UX.** Reuse the established teal/white/dark-slate design language, spacing scale, typography, and button styles. No one-off visual styles.
7. **Every new feature must be responsive.** Verify mobile, tablet, and desktop. No horizontal overflow, no broken dashboards.
8. **Enforce secure authentication and role-based authorization.** All protection is server-side. Client-side redirects are UX only, never security.
9. **Keep the database architecture organized.** One clear owner per collection, consistent field names, explicit types, and indexes for every query path.
10. **Avoid unnecessary dependencies.** Do not install a package when the platform or an existing dependency already solves it. Justify every new dependency.
11. **Never expose environment variables or API secrets.** Server-only secrets stay server-only. Only `NEXT_PUBLIC_*` values may reach the browser. Never log, print, commit, or hardcode secrets.
12. **Use proper TypeScript types and error handling.** No `any` to silence errors. No unhandled promises. Every mutation reports success and failure.
13. **Test new functionality after implementation.** Typecheck, lint, and exercise the real flow before declaring done.
14. **Do not remove existing features without explicit permission.** Removing or hiding behavior requires approval.
15. **Ask before major architectural changes.** New backend, new auth model, collection renames, schema migrations, or route restructuring all require approval first.

---

## 2. Feature Development Workflow

Every feature request follows these steps, in order:

1. **Understand the requirement.** Restate what is being asked. Identify the role(s) affected and the acceptance criteria.
2. **Inspect related existing files.** Read every page, component, hook, type, and route the feature touches, plus its neighbors.
3. **Explain the implementation approach.** Describe the plan, the data flow, and the security model before coding.
4. **Identify files to modify or create.** List exact paths and say why each one changes.
5. **Implement.** Small, coherent changes that follow the existing patterns.
6. **Test.** Run `npm run typecheck`, `npm run lint`, and exercise the flow. Check the relevant role restrictions.
7. **Explain what changed.** Summarize files touched, behavior added, and anything intentionally left out.

Do not skip step 3 or step 7.

---

## 3. Architecture Snapshot (verify before relying on it)

Current shape of the application:

- **Framework:** Next.js App Router (`app/`), React Server Components by default, TypeScript strict mode.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`, shadcn/base-ui primitives in `components/ui/`.
- **Auth:** Better Auth with the MongoDB adapter, configured in `lib/auth.ts`; browser client in `lib/auth-client.ts`.
- **Database:** MongoDB Atlas, database `mentorlagbe`.
- **API:** a single catch-all route at `app/api/auth/[...all]/route.ts`. There is no domain API layer yet.
- **Data:** marketing content is hardcoded in components. There is no tuition/application/payment backend yet.

This snapshot will change as features land. **Always confirm the current state in code** rather than trusting this list.

### Folder conventions

| Path | Purpose |
|---|---|
| `app/` | Routes, layouts, route handlers, route-scoped components |
| `app/(auth)/` | Auth route group (`/sign-in`, `/sign-up`) |
| `app/api/` | Route handlers |
| `app/dashboard/` | Role-based dashboard routes |
| `components/` | Shared application components |
| `components/ui/` | Generated shadcn/base-ui primitives — do not hand-edit unless fixing a real bug |
| `hooks/` | Shared React hooks |
| `lib/` | Auth, database, and shared utilities |

Rules:

- New shared components go in `components/`, **not** `app/components/`. Do not add more files to `app/components/`.
- New route-specific components may live beside their route.
- Use the `@/*` path alias for imports from the project root.
- Keep client components marked with `"use client"` and push interactivity to the leaves.

---

## 4. UI & Design Conventions

- **Design language:** teal primary (`#399B98`), deep slate text (`#17202D`), light surface (`#F8FAFA`), white cards, rounded corners, soft shadows.
- Reuse the existing `Button`, `Card`, `Input`, `Label`, `Dialog`, `Sheet`, and related primitives from `components/ui/`.
- Match heading hierarchy and typography of existing sections. One `<h1>` per page.
- Cards in a grid must have equal height and consistent image sizing.
- Use `lucide-react` for interface icons; `react-icons/fa6` for brand/social icons (including the current X logo).
- Use `next/image` for images. Configure `images.remotePatterns` in `next.config.ts` before using a new remote host.
- Do not introduce hardcoded colors that break dark mode. Prefer existing design tokens where a token exists.
- Every interactive element needs hover, focus, disabled, and loading states.
- All new layouts must be responsive: mobile-first, then `sm` / `md` / `lg` breakpoints.
- Use `sonner`'s `toast()` for feedback, and ensure a `<Toaster />` is mounted before relying on it.

---

## 5. Authentication & Authorization Rules

- Authentication is Better Auth. Do not replace it.
- Roles: `student`, `tutor`, `admin`. Plans: `free`, `pro`.
- **Role must never be user-controlled after sign-up.** Public sign-up may only produce `student` or `tutor`. Role changes happen only through an admin-authorized path.
- **Never trust the client.** Every protected page, route handler, and server action re-checks the session and role on the server.
- Client-side redirects are a UX convenience, not a security boundary.
- Dashboard routes must validate both authentication and the expected role.
- Sensitive fields (`plan`, `role`) are written only by trusted server code or verified webhooks.
- Do not add email-verification, password-reset, or OAuth flows in a way that breaks existing sign-in/sign-up. Extend them.

---

## 6. Database Conventions

Target domain collections (see `PROJECT_REQUIREMENTS.md` for full field lists):

- `users` — identity, role, plan, profile fields
- `tuitions` — tutor-created listings with moderation status
- `applications` — student applications with status
- `payments` — Stripe transaction records

Rules:

- Better Auth's own collections (`user`/`session`/`account`/`verification`) are infrastructure. Do not repurpose or hand-edit them.
- If the spec's `users` name and Better Auth's `user` collection must be reconciled, **ask first** — renaming requires a migration and session handling.
- Use one shared MongoDB connection helper. Do not open a new client per request.
- Define explicit TypeScript types for every collection document and every insert/update payload.
- Add indexes for real query paths (filtering, sorting, uniqueness, idempotency).
- Enforce duplicate prevention in the database (unique index), not only in application code.
- Every write validates input and returns a typed result.
- Never expose raw database errors to the client.

---

## 7. Security Rules

- Secrets live only in environment variables and only on the server.
- Validate and sanitize all user input at the server boundary.
- Authorize every mutation against the authenticated user's identity and role — not against a client-supplied id or email.
- Ownership checks are mandatory: a tutor may only modify their own tuitions; a student may only manage their own applications.
- Webhooks must verify signatures and be idempotent.
- Uploads must validate file type and size before storage.
- Do not log tokens, passwords, connection strings, or personal data.
- Never commit `.env` files or secrets.

---

## 8. TypeScript & Error Handling

- Strict types everywhere. Avoid `any`; use `unknown` plus narrowing when the shape is genuinely unknown.
- Narrow string inputs into unions at the boundary (for example, validate a role against an allowlist before using it as a typed role).
- Handle every async call: `try`/`catch` or explicit error checks. No floating promises.
- Every user-facing mutation shows a success or failure toast.
- Prefer early returns and small pure helpers over deeply nested conditionals.
- Keep server-only code out of client bundles.

---

## 9. Verification Checklist

Run before declaring any task complete:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
npm run build       # next build
```

Then verify manually:

- The changed flow works for its intended role.
- The flow is correctly blocked for other roles and for signed-out users.
- Mobile, tablet, and desktop layouts hold.
- Success and error feedback is visible.
- No new console errors or hydration warnings.
- No existing feature regressed.

Do not use `typescript.ignoreBuildErrors` or disable lint rules to make a build pass. Fix the cause.

---

## 10. Definition of Done

A feature is done only when:

- It satisfies the relevant `PROJECT_REQUIREMENTS.md` items.
- It follows the existing architecture and design language.
- It is responsive and accessible.
- It is protected by server-side auth and role checks.
- It has typed inputs, validated data, and error handling.
- It reuses existing primitives instead of duplicating them.
- It passes typecheck, lint, and build.
- Its behavior has been exercised, not just compiled.
- The change has been explained to the project owner.

---

## 11. Communication Expectations

- State assumptions explicitly.
- Ask before architectural changes, schema migrations, dependency additions, or feature removals.
- Report trade-offs and risks, not just results.
- When something is incomplete or blocked, say so plainly.
- Keep responses focused on what changed, why, and what the owner should verify.
