# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server with Turbopack (default port 3000)
npm run dev

# Build production version with Turbopack
npm run build

# Start production server (after build)
npm start

# Lint code using ESLint with Next.js config
npm run lint
```

### Testing Individual Components
Since this project doesn't have a test suite configured yet, test changes by:
1. Running `npm run dev` and viewing at http://localhost:3000
2. Making changes to components and observing hot reload
3. Running `npm run lint` to check for code quality issues

## Architecture Overview

This is a Next.js 15 project using the App Router architecture with the following key characteristics:

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Build Tool**: Turbopack (enabled for both dev and build)
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with custom theme configuration
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Linting**: ESLint with Next.js core-web-vitals and TypeScript rules

### Directory Structure
```
src/
  app/                    # App Router directory (Next.js 13+ structure)
    layout.tsx           # Root layout component
    page.tsx             # Home page component
    globals.css          # Global styles with Tailwind imports
    favicon.ico          # App icon
```

### Key Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` → `./src/*`)
- `eslint.config.mjs` - ESLint flat config extending Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS processing
- `package.json` - All scripts use Turbopack for faster builds

### Styling Architecture
- Uses Tailwind CSS v4 with `@theme inline` configuration in globals.css
- CSS custom properties for theming (`--background`, `--foreground`)
- Automatic dark mode support via `prefers-color-scheme`
- Font variables defined in layout.tsx and referenced in CSS

### Development Notes
- Project currently contains boilerplate Next.js code
- App Router pattern means pages are defined by folder structure in `src/app/`
- TypeScript path aliases configured: use `@/` to reference `src/` directory
- Turbopack is enabled for both development and production builds for faster compilation
- ESLint configuration includes Next.js specific rules and TypeScript support