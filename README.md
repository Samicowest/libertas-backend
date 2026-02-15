# Libertas Alpha - Professional Refactor

A modern, sectioned, and highly maintainable full-stack application for the Libertas Alpha ecosystem.

## 🚀 Key Features

- **Pure SQL Database Layer**: High-performance database interactions using raw SQL queries.
- **Sectioned Architecture**: Clear separation of concerns between Client, Server, and Shared logic.
- **Modern Frontend**: Built with React, TypeScript, and shadcn/ui for a professional UI/UX.
- **Type Safety**: End-to-end type safety using TypeScript and tRPC.
- **Responsive Design**: Fully responsive layouts optimized for all device sizes.

## 📂 Project Structure

### 🖥️ Server (`/server`)
- **`src/database`**: Pure SQL connection pool and configuration.
- **`src/services`**: Business logic and raw SQL database operations.
- **`src/routes`**: Sectioned tRPC routers (Auth, Certify, System).
- **`src/middleware`**: Authentication and API middleware.

### 🎨 Client (`/client`)
- **`src/layouts`**: Reusable, responsive page layouts.
- **`src/features`**: Domain-specific components and logic.
- **`src/pages`**: Clean, sectioned page implementations.
- **`src/components/ui`**: Professional shadcn/ui component library.

### 🔗 Shared (`/shared`)
- Common types, constants, and error definitions used by both client and server.

## 🛠️ Getting Started

1.  **Database**: Create a MySQL database and run `schema.sql`.
2.  **Environment**: Set up `.env` in the `server/` directory.
3.  **Install**: Run `npm install` in the root.
4.  **Develop**: Run `npm run dev` to start both client and server.

## 📜 Requirements Mapping

- **Requirement 1 (Pure SQL)**: Satisfied in `server/src/database/connection.ts` and `server/src/services/`.
- **Requirement 2 (Sectioned Code)**: Satisfied by the new directory structure and labeled code blocks.
- **Requirement 3 (Professional UI/UX)**: Satisfied in `client/src/layouts/MainLayout.tsx` and `client/src/pages/Dashboard.tsx`.
- **Requirement 4 (Clean & Readable)**: Satisfied through consistent naming, comments, and modularization.

---
© 2025 Libertas Alpha Technologies.
