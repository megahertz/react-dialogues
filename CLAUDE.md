# CLAUDE.md

## Project Overview

react-dialogues is a lightweight React modal dialog library inspired by Ant
Design. It provides Modal, Toast, and Popover components with an imperative API
(static methods like `Modal.show()`, `Modal.info()`, etc.).

## Commands

```bash
# Build the library
npm run build

# Run tests (unit tests in react-dialogues + e2e tests in examples)
npm test

# Run a single test file
npm test --prefix packages/react-dialogues -- src/core/__specs__/RdState.spec.ts

# Update snapshots
npm run test:update

# Full test suite (lint + typecheck + tests)
npm run test:full

# Lint and format check
npm run lint

# Type check all packages
npm run typecheck

# Start examples dev server
npm start

# Start documentation site
npm run start:website
```

## Architecture

### Monorepo Structure

- `packages/react-dialogues/` - Main library (published to npm)
- `packages/examples/` - Demo app with Playwright e2e tests
- `packages/website/` - Docusaurus documentation site

### Core State Management (`packages/react-dialogues/src/core/`)

- **RdState.ts** - Central state class managing all dialog controllers. Each
  dialog (modal/toast/popover) is represented by an `RdController` with
  lifecycle methods (`destroy`, `update`, `setResult`).
- **dialogues.tsx** - Global singleton exposing `dialogues.internal.state` and
  lazy portal rendering via `ensurePortalRendered()`.
- **controllerContext.ts** - React context providing `useRdController()` hook
  for components to access their controller.

### Component Types

- **Modal** (`src/modal/Modal.tsx`) - Full-screen overlay dialogs with mask,
  focus lock, and keyboard handling. Static methods: `show`, `info`, `success`,
  `warning`, `error`, `prompt`, `showCustom`.
- **Toast** (`src/toast/Toast.tsx`) - Auto-dismissing notifications with
  progress bar and pause-on-hover. Placements: `top`, `topLeft`, `topRight`,
  `bottom`, `bottomLeft`, `bottomRight`.
- **Popover** (`src/popover/Popover.tsx`) - Positioned floating elements
  attached to trigger elements. Uses custom positioning via
  `defaultPositionFn.ts`.
- **Dialog** (`src/dialog/Dialog.tsx`) - Base component used by Modal/Toast,
  handles rendering header, body, footer, buttons, and icons.

### Container System (`src/container/`)

- **RootContainer.tsx** - Root portal component separating modals, toasts, and
  popovers into different containers.
- **ToastContainer.tsx** - Groups toasts by placement position.
- **UniversalContainer.tsx** - Renders modal and popover controllers.

### Build Output

The library builds two variants:

- With CSS injected (`index.mjs`, `index.cjs`)
- Without CSS (`index.nocss.mjs`, `index.nocss.cjs`) for custom styling

### Testing

- Unit tests: Vitest in `packages/react-dialogues/`
- E2E tests: Playwright in `packages/examples/`
