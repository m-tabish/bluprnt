# Changelog

All notable changes to this project will be documented in this file.
This project follows Semantic Versioning.

## [Unreleased]

- **IN project.service.js everytime a new project is made, a new connection to rabbitmq is formed check and fix**
- Shareable Link
- Save as PNG/JPG
- Forgot password
- Add Mobile Friendly version
- change the logout button in nav open menu with user details and logout

## [2.1.0] - 2026-07-03
### Added
- **Gemini Prompt Optimization**: Decoupled prompt into a factory function `getPrompt` accepting parameters (`projectName`, `projectDescription`, `language`).
- **Tree-like Layout Constraints**: Instructed Gemini to generate clean hierarchical tree/DAG graphs branching from a single root node.
- **Node Count Enforcement**: Configured Zod schemas on the backend to enforce a minimum of 10 nodes and 9 edges per generated blueprint.
- **Dynamic Node Handles**: Custom nodes now consume target/source positions dynamically to support seamless vertical/horizontal orientation changes.
- **Roadmap.sh Style Edges**: Redesigned graph links to use orthogonal `smoothstep` paths with rounded corners and `arrowclosed` markers.

### Changed
- **Database Status Filtering**: Updated `getProjectsRepo` to only return projects with `status = 'COMPLETED'`, ensuring pending or failed generations remain hidden from the dashboard.
- **Deduplicated Rendering**: Implemented client-side edge deduplication by tracking source-target keys in a Set before rendering in React Flow.
- **Dagre Determinism**: Enforced locale-based sorting on nodes and edges inside `getLayoutedElements` to guarantee layout shape remains stable across page refreshes.

### Fixed
- **Dashboard Real-time Polling**: Resolved a race condition in `useProjects` where loading page 1 projects was blocked by a stale `hasMore` state, ensuring lists update instantly when polling finishes.
- **OAuth Mismatch**: Updated redirect URIs in Google Cloud Console to match the Supabase callback, resolving auth policy issues.
- **JWKS JWT Mismatches**: Aligned client/server environment variables to target the production Supabase database.

## [2.0.0] - 2026-06-30
### Added
- **Database Migration**: Replaced MongoDB with PostgreSQL database using Drizzle ORM.
- **Authentication Switch**: Migrated from Firebase Auth to Supabase Auth.
- **Clean Architecture**: Refactored backend codebase to a Route-Middleware-Controller-Service-Repository pattern.
- **User Scoping & Isolation**: Updated backend and frontend endpoints to scope projects by `userId`, ensuring users only see their own blueprints.
- **Pagination**: Implemented pagination on project fetch requests (supporting page and limit query params).
- **Zod Schemas**: Integrated Zod schemas for strict request body and LLM response validation.

### Fixed
- Corrected path to worker script (`workers/roadmap.worker.js`) in `package.json`.
- Installed missing backend dependencies (`drizzle-orm`, `postgres`, `zod-to-json-schema`).
- Added missing `supabase` import and dynamically fetch headers in the client `projectService.js`.
## [1.2.1] - 2026-01-26
### Added
- profile picture , name and email of user

## [1.2.0] - 2026-01-04
### Added
- Add 2 column login page from shadcn
- Add github repo button with stars
- Add 'i' button in maps for easier navigation

### Changed
- Switched Gemini model to Flash Latest
- Routes ( all routes work via /app )

### Fixed
- JSON truncation issues
- Auth redirect loop
- Fixed resources redirects

## [1.1.1] - 2025-12-20
### Fixed
- Map rendering crash on empty nodes
