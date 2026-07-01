# DeployIt Frontend Status

## 1. Existing Structure

### Pages under `src/app`

- `/` - landing page
- `/login` - GitHub-style login placeholder
- `/dashboard` - dashboard overview
- `/projects` - project listing
- `/projects/[id]` - project overview
- `/projects/[id]/deployments` - deployment history
- `/projects/[id]/logs` - terminal-style logs page
- `/projects/[id]/domains` - custom domains page
- `/projects/[id]/variables` - environment variables page
- `/settings` - general settings and danger zone
- `/account` - account/profile page

### Components under `src/components`

- `common/`
  - `empty-state.tsx`
  - `loading-spinner.tsx`
  - `status-badge.tsx`
- `dashboard/`
  - `recent-deployments.tsx`
  - `recent-projects.tsx`
  - `stat-card.tsx`
- `deployments/`
  - `deployment-card.tsx`
  - `logs-terminal.tsx`
- `domains/`
  - `domain-card.tsx`
- `layout/`
  - `dashboard-layout.tsx`
  - `navbar.tsx`
  - `page-shell.tsx`
  - `sidebar.tsx`
- `projects/`
  - `create-project-modal.tsx`
  - `project-card.tsx`
  - `project-tabs.tsx`
- `ui/`
  - shadcn-style primitives: avatar, badge, button, card, dialog, dropdown-menu, input, select, sheet, skeleton, table, tabs, textarea, tooltip
- `variables/`
  - `variables-table.tsx`

### Hooks

- No custom hooks directory currently exists.
- TanStack Query is installed but no query hooks are currently implemented.

### Providers

- `src/providers/query-provider.tsx`
  - Provides `QueryClientProvider`
  - Provides `sonner` toaster

### Types

- `src/types/index.ts`
  - `User`
  - `Project`
  - `ProjectStatus`
  - `Deployment`
  - `DeploymentStatus`
  - `Domain`
  - `EnvironmentVariable`

### Data Layer

- Current data layer is mock/static TypeScript files under `src/data`.
- No Axios API client exists yet.
- No backend service functions exist yet.
- No server actions are used.
- No React Query API calls are wired yet.

## 2. Existing Features

- Dashboard
  - Summary cards for total projects, successful deployments, failed deployments, active domains
  - Recent deployments card
  - Recent projects card
- Projects page
  - Project grid
  - Project cards
  - Create Project modal with React Hook Form and Zod validation
- Project overview page
  - Project status
  - Framework, URL, last deployment, production domain
  - Deploy, redeploy, visit buttons
- Deployments page
  - Deployment history list
  - Deployment cards with commit hash, duration, status
- Logs page
  - Terminal-style static log viewer
- Variables page
  - Environment variables table
  - Sensitive value masking
  - Add, edit, delete buttons as UI only
- Domains page
  - Domain cards
  - Verification and SSL status
  - Add Domain button as UI only
- Settings page
  - General project settings form UI
  - Framework selector
  - Danger zone delete UI
- Account page
  - Mock user profile
  - Logout button as UI only
- Navbar
  - Search input
  - Notifications button
  - User avatar
  - Mobile sidebar sheet
- Sidebar
  - Dashboard, Projects, Deployments, Settings, Account links
  - Mock user summary
  - Logout button
- Modals
  - Create Project modal exists
- Cards
  - Strong card system throughout dashboard, projects, deployments, domains, settings
- Tables
  - Environment variables table exists
- Skeletons
  - Skeleton component exists, but no page currently uses it.
- Empty states
  - EmptyState component exists, but no page currently uses it.

## 3. Mock Data

### Files inside `src/data`

- `src/data/projects.ts`
  - Mock projects: Atlas Web, Merchant API, Pulse Dashboard, Jobs Worker
  - Hardcoded framework, status, URLs, domains, repositories, deployment times
- `src/data/deployments.ts`
  - Mock deployment history
  - Hardcoded commit hashes, durations, statuses, timestamps
- `src/data/domains.ts`
  - Mock custom domains and SSL/verification flags
- `src/data/variables.ts`
  - Mock environment variables
  - Includes hardcoded secret-like values such as `DATABASE_URL` and `GITHUB_TOKEN`
- `src/data/user.ts`
  - Mock user profile and DiceBear avatar

### Components/pages using mock data

- `src/app/dashboard/page.tsx`
  - Uses `projects`, `deployments`, `domains`
- `src/app/projects/page.tsx`
  - Uses `projects`
- `src/app/projects/[id]/page.tsx`
  - Uses `projects`
- `src/app/projects/[id]/deployments/page.tsx`
  - Uses `projects`, `deployments`
- `src/app/projects/[id]/logs/page.tsx`
  - Uses `projects`
- `src/app/projects/[id]/domains/page.tsx`
  - Uses `projects`, `domains`
- `src/app/projects/[id]/variables/page.tsx`
  - Uses `projects`, `variables`
- `src/app/account/page.tsx`
  - Uses `user`
- `src/components/layout/sidebar.tsx`
  - Uses `user`
  - Hardcodes Deployments link to `/projects/atlas-web/deployments`
- `src/components/layout/navbar.tsx`
  - Uses `user`
- `src/components/deployments/logs-terminal.tsx`
  - Uses local hardcoded log lines
- `src/components/projects/create-project-modal.tsx`
  - Uses toast only; does not call backend

### Other hardcoded values

- Landing page has hardcoded CLI output and `https://acme.deployit.app`
- Project cards and overview use hardcoded deployment URLs from mock data
- Settings page uses default project name `Atlas Web`
- Sidebar Deployments link points to one mock project
- Login page links directly to `/dashboard`

## 4. Backend Integration Status

### Pages

- `/` landing page: Not integrated
- `/login`: Not integrated
- `/dashboard`: Not integrated, uses mock data
- `/projects`: Not integrated, uses mock data
- `/projects/[id]`: Not integrated, uses mock data
- `/projects/[id]/deployments`: Not integrated, uses mock data
- `/projects/[id]/logs`: Not integrated, uses static terminal logs
- `/projects/[id]/domains`: Not integrated, uses mock data
- `/projects/[id]/variables`: Not integrated, uses mock data
- `/settings`: Not integrated, local form UI only
- `/account`: Not integrated, uses mock user

### Components

- `CreateProjectModal`: Partially integrated at UI level only; validates form but only shows toast
- `ProjectCard`: Not integrated; buttons do not call APIs
- `DeploymentCard`: Not integrated; displays props from mock data
- `LogsTerminal`: Not integrated; no SSE/EventSource
- `VariablesTable`: Not integrated; add/edit/delete buttons are UI only
- `DomainCard`: Not integrated; displays mock data only
- `Navbar`: Not integrated; search/notifications/avatar are static UI
- `Sidebar`: Not integrated; user and route links are static/mock
- `RecentDeployments`: Not integrated; mock data
- `RecentProjects`: Not integrated; mock data
- `StatCard`: UI only
- `StatusBadge`: UI only

### Data/API

- Axios is installed but no Axios instance exists.
- TanStack Query is installed and provider exists, but no queries/mutations are implemented.
- No backend URL config exists.
- No deployment API client exists.
- No auth API client exists.

## 5. Authentication Status

- Login page
  - Exists at `/login`
  - Styled as GitHub login
  - Button links directly to `/dashboard`
  - No real auth request
- Account page
  - Exists at `/account`
  - Uses mock `src/data/user.ts`
  - Logout button has no action
- Route protection
  - Not implemented
  - Dashboard/project/account routes are publicly accessible
- Token handling
  - Not implemented
  - No localStorage/cookie/session handling found
  - No Authorization header handling found
- API layer
  - Not implemented
  - No `src/lib/api.ts`
  - No auth service functions
  - No current integration with `/auth/signup`, `/auth/login`, or `/auth/me`

## 6. Missing Features

- [ ] Auth API client
- [ ] Login form/API integration
- [ ] Signup page if product needs email/password auth
- [ ] Auth token persistence
- [ ] Auth route protection
- [ ] Account page connected to `/auth/me`
- [ ] Axios instance with backend URL
- [ ] Axios auth interceptor
- [ ] React Query hooks for dashboard/project/deployment data
- [ ] Deploy API integration
- [ ] Create Project modal wired to backend flow
- [ ] Deployment details from backend
- [ ] Deployment status polling
- [ ] Monitoring stats integration
- [ ] Live logs via SSE/EventSource
- [ ] Environment variables CRUD integration
- [ ] Redeploy action
- [ ] Delete deployment/project action
- [ ] Start deployment action
- [ ] Stop deployment action
- [ ] Settings save action
- [ ] Settings destructive action confirmation
- [ ] Replace mock domains with backend-supported domain/proxy state or hide until backend exists
- [ ] Replace hardcoded sidebar deployment link
- [ ] Loading states using `Skeleton` or `LoadingSpinner`
- [ ] Empty states using `EmptyState`
- [ ] Error states for failed API calls
- [ ] Toast feedback for mutations

## 7. Recommended Order of Work

1. Create the API foundation
   - Add `src/lib/api.ts`
   - Configure backend base URL
   - Add token injection support

2. Add auth foundation
   - Add auth types matching backend
   - Implement login/signup/me calls
   - Add token persistence
   - Add route protection for dashboard routes
   - Replace mock user in navbar/sidebar/account

3. Replace dashboard mock reads
   - Create React Query hooks for deployments/projects
   - Wire dashboard counts to backend data
   - Add skeleton and error states

4. Connect deploy/create flow
   - Map Create Project modal to backend deploy request or project creation flow
   - Add deploy mutation
   - Show queued deployment state

5. Connect project/deployment detail pages
   - Decide whether frontend routes should remain project-based or shift to deployment-based IDs
   - Wire overview and deployments page to backend metadata/status APIs

6. Connect monitoring
   - Use deployment monitoring endpoints for status, CPU, memory, restarts, uptime, URL, image, port

7. Connect logs
   - Use last-100 logs endpoint for initial state
   - Use SSE endpoint for live streaming
   - Add disconnect/reconnect handling

8. Connect environment variables
   - Wire variables table to env GET/POST/DELETE APIs
   - Ensure secret values are masked
   - Show “requires redeploy” after changes

9. Connect lifecycle actions
   - Redeploy
   - Start
   - Stop
   - Delete
   - Add confirmations and toast states

10. Polish states
   - Empty states
   - Skeletons
   - API error banners
   - Disabled/loading button states

## 8. Progress Estimation

- Frontend UI: 70%
  - Strong visual foundation exists for landing, dashboard, projects, deployments, logs, variables, domains, settings, account, navigation, cards, tables, and modals.

- Frontend Integration: 10%
  - React Query provider exists and forms/toasts are installed, but actual backend calls, auth, token handling, route protection, and live data are not wired.

- Overall Frontend: 40%
  - The interface is substantially designed, but most production behavior still needs API integration and state handling.
