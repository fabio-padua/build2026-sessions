# Build 2026 Session Explorer

A professional web application to browse, search, and filter all Microsoft Build 2026 sessions.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![Vite](https://img.shields.io/badge/Vite-8-purple) ![Azure](https://img.shields.io/badge/Azure-Static%20Web%20Apps-blue)

## Features

- 🔍 **Full-text search** — sessions, speakers, session codes
- 📅 **Filter by day** — browse sessions by event day
- 🏷️ **Filter by type, level, topic, delivery format**
- 📺 **On-demand links** — watch recorded sessions directly
- 📱 **Responsive** — works on desktop, tablet, and mobile
- ⚡ **Fast** — client-side filtering, no backend needed

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

Output is in `dist/` — ready for any static hosting.

## Deploy to Azure Static Web Apps

Run the deployment script:

```powershell
.\deploy.ps1
```

Or with custom parameters:

```powershell
.\deploy.ps1 -ResourceGroupName "my-rg" -Location "westus2" -AppName "my-build-explorer"
```

The GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`) handles CI/CD automatically after the Static Web App is linked.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Styling | CSS (custom, Microsoft Fluent-inspired) |
| Hosting | Azure Static Web Apps |
| Data | [Official Build 2026 session API](https://eventtools.event.microsoft.com/build2026-prod/fallback/session-all-en-us.json) |

## Project Structure

```
src/
├── components/
│   ├── FilterBar.tsx    # Search + filter dropdowns
│   ├── Header.tsx       # App header with branding
│   ├── SessionCard.tsx  # Individual session card
│   └── States.tsx       # Loading, error, empty states
├── hooks/
│   ├── useFilters.ts    # Filter logic and options
│   └── useSessions.ts   # Data fetching
├── types/
│   └── session.ts       # TypeScript interfaces
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```
