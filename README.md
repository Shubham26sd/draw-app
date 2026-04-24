# Collaborative Draw App

A collaborative whiteboard app built as a Turborepo monorepo.

## Tech Stack

- Frontend: Next.js (`apps/excalidraw-frontent`)
- HTTP API: Express + JWT (`apps/http-backend`)
- Realtime: WebSocket (`apps/ws-backend`)
- Database: PostgreSQL + Prisma (`packages/db`)
- Shared packages: `@repo/ui`, `@repo/common`, `@repo/backend-common`

## Monorepo Structure

- `apps/excalidraw-frontent`: main product UI
- `apps/http-backend`: auth + room + chat history APIs
- `apps/ws-backend`: realtime room messaging
- `packages/db`: Prisma schema + client
- `packages/ui`: shared UI components
- `packages/common`: shared zod schemas/types
- `packages/backend-common`: backend shared config (JWT secret)

## Prerequisites

- Node.js 18+
- pnpm (repo uses `pnpm@9`)
- PostgreSQL database

## Environment Variables

Create env files where needed (or set these via your deployment platform):

### Root / Backends / DB package

Used by HTTP backend, WS backend, and Prisma package:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB_NAME
JWT_SECRET=your-strong-secret
```

### Frontend (`apps/excalidraw-frontent`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

## Install Dependencies

```bash
pnpm install
```

## Database Setup (Prisma)

Run Prisma migrations from the `packages/db` package:

```bash
pnpm --dir packages/db exec prisma migrate dev
```

To regenerate Prisma client after schema changes:

```bash
pnpm --dir packages/db exec prisma generate
```

## Run the App Locally

You can run everything with turbo:

```bash
pnpm dev
```

Or run services individually:

```bash
pnpm --filter excalidraw-frontent dev
pnpm --filter http-backend dev
pnpm --filter ws-backend dev
```

Expected local ports:

- Frontend: `http://localhost:3000`
- HTTP backend: `http://localhost:3001`
- WS backend: `ws://localhost:8080`

## Build and Lint

From repo root:

```bash
pnpm build
pnpm lint
pnpm check-types
```

Run only frontend lint:

```bash
pnpm --filter excalidraw-frontent lint
```

## API Overview

HTTP backend endpoints:

- `POST /signup`
- `POST /signin`
- `POST /room` (auth required)
- `GET /room/:slug`
- `GET /chats/:roomId`
- `GET /me` (auth required)

WebSocket message types:

- `join_room`
- `leave_room`
- `chat`

## Free Deployment Recommendation

For this architecture:

- Deploy frontend (`apps/excalidraw-frontent`) on Vercel
- Deploy `http-backend` + `ws-backend` on Render or Railway
- Use Neon or Supabase for free PostgreSQL

Set production env vars:

- Frontend:
  - `NEXT_PUBLIC_BACKEND_URL=https://your-http-service-url`
  - `NEXT_PUBLIC_WS_URL=wss://your-ws-service-url`
- Backends:
  - `DATABASE_URL`
  - `JWT_SECRET`

## Notes

- Free tiers may sleep after inactivity, so first request/websocket connection can be slow.
- The app/package name `excalidraw-frontent` is kept as-is to match the current repository naming.
