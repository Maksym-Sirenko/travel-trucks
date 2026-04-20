# TravelTrucks

TravelTrucks is a portfolio project built from a Figma layout for a camper rental service. The application allows users to browse a campers catalog, filter results, view detailed camper pages, save favorites, and submit a booking form.

The project was implemented with Next.js App Router and focuses on clean component structure, typed data models, reusable UI blocks, and a simple but practical client-side state architecture.

## Overview

- Landing page with a hero section and call to action
- Catalog page with camper cards and incremental "Load more" pagination
- Filtering by location, vehicle form, transmission, engine type, and equipment
- Camper details page with gallery, features, reviews, and booking form
- Favorites persisted in local storage with Zustand `persist`
- Lightbox-style gallery modal for camper photos
- Booking form with client-side validation and toast notifications
- Next.js route handlers used as an API proxy to the external mock API
- Custom project favicon added for better branding

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- Zustand
- Axios
- react-hot-toast
- modern-normalize
- ESLint

## Project Structure

```text
src/
  app/
    api/                 # Route handlers for catalog and camper details
    catalog/             # Catalog and camper details pages
    layout.tsx           # Root layout and metadata
    page.tsx             # Home page
  components/
    Hero/                # Landing hero section
    Header/              # Navigation header
    FilterPanel/         # Catalog filtering UI
    CamperCard/          # Catalog card component
    CamperGallery/       # Gallery with modal viewer
    CamperFeatures/      # Camper feature badges and specifications
    CamperReviews/       # Reviews list
    BookingForm/         # Booking form with validation
    ui/                  # Reusable UI primitives
  lib/
    api/                 # Client API functions and query builder
    ui/                  # Shared presentation metadata for icons/features
    utils/               # Small utility helpers
  store/
    campersStore.ts      # Global state for catalog, filters, favorites, details
  types/
    camper.ts            # Camper data types
    filters.ts           # Catalog filters types
public/
  hero.jpg               # Hero image
  image.svg              # SVG sprite with icons and logo
```

## Implemented Features

### Catalog

- Fetching campers from the API through `/api/catalog`
- Query building for filters and pagination
- Error and loading states
- Client-side "Load more" behavior

### Filters

- Location filter
- Vehicle type filter
- Transmission filter
- Engine filter
- Equipment multi-select filter

### Camper Details

- Dynamic route for each camper
- Detail loading through `/api/catalog/[id]`
- Gallery with keyboard navigation support
- Features tab and reviews tab
- Back navigation to the catalog

### Favorites

- Add and remove campers from favorites
- Persist favorites between sessions using Zustand middleware

### Booking Form

- Controlled form state
- Basic validation for name, email, and booking date
- Date picker interaction
- Toast feedback after submit

## API Configuration

The project expects the following environment variables:

```env
MOCKAPI_BASE_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
NEXT_PUBLIC_API_URL=/api
```

`MOCKAPI_BASE_URL` is used by Next.js route handlers as the upstream API source.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create an environment file

Create `.env` in the project root and add:

```env
MOCKAPI_BASE_URL=https://66b1f8e71ca8ad33d4f5f63e.mockapi.io
NEXT_PUBLIC_API_URL=/api
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Design Reference

The interface was implemented based on the provided Figma layout for the campers service.

## Notes

- The project is focused on frontend architecture and UI behavior.
- Data is loaded from a mock API through internal route handlers.
- The codebase passes ESLint checks with `npm run lint`.

## Possible Next Improvements

- Improve README with screenshots or a live demo link
- Add form submission to a real backend
- Add tests for store logic and critical UI flows
- Improve accessibility for modal and filter controls
- Refine encoding issues in some UI strings and symbols
