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

**Structure**: `<type>(<scope>): [TICKET-ID] <subject>`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting (whitespace, etc.)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Build/tooling changes

**Examples:**

```bash
git commit -m "feat(users): [SFE-010] implement user list api integration"
git commit -m "fix(ui): [SFE-011] resolve button alignment on mobile"
git commit -m "docs(readme): [SFE-012] add troubleshooting section"
```

**Important**: The `[TICKET-ID]` is required and enforced by commitlint hooks.

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

**⚠️ Important**: Always use `bun run test`, **NOT** `bun test` (which uses Bun's native runner instead of Vitest).

**Guidelines:**

- Colocate tests with components (`Component.test.tsx`).
- Test accessibility (ARIA labels, keyboard navigation).
- Mock external API calls (never hit real endpoints in tests).
- Use React Testing Library queries (`getByRole`, `getByText`, etc.).
- Clean up mocks in `beforeEach`/`afterEach`.
- Test edge cases (errors, empty states, loading states).

---

## 🔧 Troubleshooting

### Git Hooks Not Running

If Husky hooks aren't running after cloning:

```bash
bun run prepare  # Reinstalls git hooks
```

### Commit Message Rejected

Ensure your commit follows the format:

```
type(scope): [TICKET-ID] message
```

Example: `feat(users): [SFE-010] add user filtering`

### Port 5173 Already in Use

```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use a different port
bun dev --port 3000
```

---

## 🤝 Pull Request Process

1. Ensure all quality checks pass: `bun run check-all`
2. Update documentation if needed
3. Add/update tests for your changes
4. Open a PR with a clear description
5. Link related issues
6. Wait for CI checks to pass
7. Request review from maintainers

---

## 📞 Questions?

If you have questions or need help:

- Open a [GitHub Issue](https://github.com/david-portilla/sfe-ebooking/issues)
- Check the [README.md](./README.md) for setup instructions
- Review existing [Pull Requests](https://github.com/david-portilla/sfe-ebooking/pulls) for examples

Thank you for contributing! 🚀
