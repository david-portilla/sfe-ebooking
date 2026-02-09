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
    bun lint
    bun run check-format
    # OR run everything (lint, format, test, build):
    bun run check-all
    ```
