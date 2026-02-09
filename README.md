# User Management Dashboard

Application to visualize and manage users via a public API, built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## 🚀 Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **Framework**: [React](https://react.dev) + [Vite](https://vitejs.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & [React Aria](https://react-spectrum.adobe.com/react-aria/index.html)
- **State Management**: [TanStack Query](https://tanstack.com/query) (Server State)
- **Routing**: [React Router v7](https://reactrouter.com)
- **I18n**: [i18next](https://www.i18next.com)
- **Quality**: ESLint, Prettier, Husky, Commitlint, Vitest

## 🛠️ Setup & Run

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Start development server:**

    ```bash
    bun dev
    ```

3.  **Build for production:**

    ```bash
    bun run build
    ```

4.  **Run Tests:**
    Important: Do not run `bun test` as it uses Bun's native runner. Use validation scripts:

    ```bash
    bun run test        # Watch mode (Vitest)
    bun run test:run    # CI mode (Vitest)
    ```

5.  **Run Quality Checks:**
    ```bash
    bun lint            # Run ESLint
    bun lint:fix        # Fix ESLint errors
    bun run format      # Format code with Prettier
    bun run check-format # Check formatting
    # OR run everything (lint, format, test, build):
    bun run check-all
    ```

## 📁 Project Structure

```
src/
├── app/                    # Application configuration
│   ├── provider.tsx        # Root providers (QueryClient, etc.)
│   └── router.tsx          # React Router configuration
├── components/
│   └── ui/                 # Reusable UI components (React Aria)
│       ├── button.tsx      # Button component with variants
│       ├── input.tsx       # Input component with validation
│       ├── card.tsx        # Card container component
│       └── layout.tsx      # Layout utilities
├── features/               # Feature-based modules
│   └── users/              # Users feature
│       ├── api.ts          # API calls & error handling
│       ├── api.test.ts     # API unit tests
│       ├── types.ts        # TypeScript interfaces
│       ├── hooks/          # Custom hooks (useUsers)
│       └── components/     # Feature components (UserCard, UserGrid)
├── lib/                    # Shared utilities & config
│   ├── i18n.ts             # i18next configuration
│   ├── query-client.ts     # TanStack Query setup
│   └── utils.ts            # Utility functions (cn, etc.)
├── pages/                  # Page components
├── test/                   # Test configuration
│   └── setup.ts            # Test setup (jest-dom)
└── main.tsx                # Application entry point
```

## ✨ Features

### Functional

- 👥 **User Directory**: View a list of users with key details (avatar, email, company).
- ⚡ **Optimized Performance**: Server-state management for instant data access.

### Technical

- ✅ **Feature-based architecture** for scalability
- ✅ **React Aria Components** for WCAG 2.1 AA accessibility
- ✅ **TanStack Query** for efficient server state management
- ✅ **Vitest + React Testing Library** with 14+ tests
- ✅ **TypeScript strict mode** for type safety
- ✅ **Comprehensive error handling** (ApiError class)
- ✅ **Automated quality checks** (ESLint, Prettier, Husky hooks)
- ✅ **CI/CD pipeline** via GitHub Actions
- ✅ **Internationalization** ready (i18next)

## 🧪 Testing

The project uses **Vitest** with **React Testing Library**:

- **Unit tests**: API layer, utility functions
- **Component tests**: UI components with accessibility checks
- **Coverage**: 14 tests across 4 test files
- **Pattern**: Tests are colocated with source files (`.test.ts`, `.test.tsx`)

Run tests:

```bash
bun run test      # Watch mode - runs tests on file changes
bun run test:run  # CI mode - single run with coverage
```

## 🎨 UI Components

All UI components are built with **React Aria Components** for accessibility:

- `Button` - Multiple variants (primary, secondary, outline, ghost, danger) and sizes
- `Input` - Text fields with labels, descriptions, and error states
- `Card` - Content container with hover effects
- `Layout` - Page layout utilities

Components support:

- Keyboard navigation
- Screen reader compatibility
- Focus management
- ARIA attributes
- Render props for advanced styling
