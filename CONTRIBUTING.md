# Contributing Guide

Thank you for your interest in contributing to the **User Management Dashboard** project! This document provides guidelines for development, testing, and contribution workflows.

## 🛠️ Development Workflow

### 1. Project Setup

Ensure you have [Bun](https://bun.sh) installed.

```bash
bun install
```

### 2. Start Development Server

```bash
bun dev
```

The app will run at `http://localhost:5173`.

### 3. Branching Strategy

We use a feature-branch workflow. All changes should be made in a dedicated branch.

- **Naming Convention**: `SFE-<TASK_ID>-<short-description>`
- **Example**: `SFE-006-users-list`, `SFE-012-search-filtering`

### 4. Commits

We use **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).
Structure: `<type>(<scope>): <subject>`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (whitespace, etc.)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Build/tooling changes

**Example:**

```bash
git commit -m "feat(users): implement user list api integration"
```

## ✅ Quality Checks

Before pushing your changes, always run the full verification suite:

```bash
bun run check-all
```

This command automatically runs:

1.  `bun lint:fix` (ESLint auto-fix)
2.  `bun run format` (Prettier write)
3.  `bun run check-format` (Prettier check)
4.  `bun run test:run` (Vitest single run)
5.  `bun run build` (Production build verification)

## 🧪 Testing

We use **Vitest** + **React Testing Library**.

- **Run Interactive Mode**: `bun run test`
- **Run CI Mode**: `bun run test:run`

**Guidelines:**

- Colocate tests with components (`Component.test.tsx`).
- Test accessibility (ARIA labels, keyboard navigation).
- Mock external API calls (never hit real endpoints in tests).
