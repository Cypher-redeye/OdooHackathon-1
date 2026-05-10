[README.md](https://github.com/user-attachments/files/27566945/README.md)
# 🌍 Traveloop
# 🌍 Traveloop

Your AI-Powered Travel Planning Companion — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## 📸 Screenshots

### 🏠 Landing Page — Hero
![Landing Hero](screenshots/01-landing-hero.jpeg)

### 🗺️ Popular Destinations
![Popular Destinations](screenshots/02-popular-destinations.jpeg)

### 🔐 Authentication
![Auth Screen](screenshots/03-auth.jpeg)

### 📊 Traveler Dashboard
![Dashboard](screenshots/04-dashboard.jpeg)

### 🧳 My Trips
![My Trips](screenshots/05-my-trips.jpeg)

### 🔍 Explore Destinations
![Explore](screenshots/06-explore.jpeg)

### 🗓️ Itinerary Builder
![Itinerary Builder](screenshots/07-itinerary-builder.jpeg)

### 🎯 Discover Activities
![Discover Activities](screenshots/08-discover-activities.jpeg)

### 👥 Community — Traveler Hub
![Community](screenshots/09-community.jpeg)

### 🛡️ Admin Dashboard
![Admin Dashboard](screenshots/10-admin-dashboard.jpeg)

![Admin Dashboard Detail](screenshots/11-admin-closeup.jpeg)

### 👤 User Profile
![Profile](screenshots/12-profile.jpeg)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ Itinerary Builder | Drag-and-drop stops, add activities, and build day-by-day travel plans |
| 💰 Budget Tracker | Visual pie/bar charts, daily spending alerts, and AI-powered cost insights |
| 🔍 Explore Destinations | Search and filter destinations by tags (Beach, Culture, Luxury, etc.) |
| 🔗 Share Trips | Public itinerary view with timeline, copy-trip, and social sharing |
| 👤 User Profile | Personal travel stats, preferences, and settings |
| 🎨 Glassmorphism UI | Stunning dark-mode design with backdrop-blur, gradients, and micro-animations |
| 🔐 Auth API | JWT-based signup/login with bcrypt password hashing |
| 🗄️ Database | PostgreSQL on Neon (serverless) via Prisma ORM |

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom glassmorphism design system |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit |
| Fonts | Clash Display + Cabinet Grotesk |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js v24 |
| Framework | Express.js v5 |
| ORM | Prisma v7 |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT + bcryptjs |
| DB Adapter | @prisma/adapter-neon |

---

## 📁 Project Structure

```
OdooHackathon/
├── traveloop-app/          # Next.js frontend
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   ├── trips/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── budget/
│   │   │   │   │   └── builder/
│   │   │   │   └── create/
│   │   │   ├── search/city/
│   │   │   └── profile/
│   │   ├── auth/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── ConfirmDialog.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                # Express.js backend
    ├── lib/
    │   └── prisma.js       # Prisma client with Neon adapter
    ├── prisma/
    │   ├── schema.prisma   # DB models
    │   └── migrations/
    ├── routes/
    │   ├── auth.js         # /api/auth/signup, /api/auth/login
    │   └── trip.js         # /api/trips
    ├── prisma.config.ts    # Prisma 7 config
    ├── server.js           # Entry point
    └── package.json
```

---

## 🗄️ Database Schema

```
User        → id, email, password
Trip        → id, name, description, startDate, endDate, userId
Stop        → id, city, startDate, endDate, tripId
Activity    → id, name, cost, stopId
Budget      → id, transport, stay, meals, activities, tripId
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- A [Neon](https://neon.tech) PostgreSQL database

### Frontend

```bash
cd traveloop-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
```

Then run:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips/:userId` | Get all trips for a user |

---

## 📱 Screens

| Screen | Route | Description |
|---|---|---|
| Auth | `/` | Sign in / Sign up with animated background |
| Dashboard | `/dashboard` | Welcome stats, upcoming trips, popular destinations |
| My Trips | `/trips` | Trip cards with filter, delete, view/edit actions |
| Create Trip | `/trips/create` | Multi-step trip creation form |
| Itinerary Builder | `/trips/[id]/builder` | Drag-and-drop stop & activity manager |
| Budget Tracker | `/trips/[id]/budget` | Spending charts, health bar, AI insights |
| Trip Detail | `/trips/[id]` | Public-style trip view with timeline |
| Explore | `/search/city` | Destination search with tag filters |
| Profile | `/profile` | User info, travel stats, preferences |

---

## 🎨 Design System

- **Background:** Deep space gradient (`#0f0c29 → #302b63 → #24243e`)
- **Primary:** Violet-Indigo gradient (`#7C3AED → #4F46E5`)
- **Accent Colors:** Amber (`#F59E0B`) for warnings, Teal (`#0D9488`) for success
- **Glass Cards:** `bg-white/10 backdrop-blur-md border-white/20`
- **Typography:** Clash Display (headings) + Cabinet Grotesk (body)

---

## 👥 Team

Built with ❤️ for the **Odoo Hackathon 2026**.

---

## 📄 License

This project is built for educational and hackathon purposes.

Your AI-Powered Travel Planning Companion — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ Itinerary Builder | Drag-and-drop stops, add activities, and build day-by-day travel plans |
| 💰 Budget Tracker | Visual pie/bar charts, daily spending alerts, and AI-powered cost insights |
| 🔍 Explore Destinations | Search and filter destinations by tags (Beach, Culture, Luxury, etc.) |
| 🔗 Share Trips | Public itinerary view with timeline, copy-trip, and social sharing |
| 👤 User Profile | Personal travel stats, preferences, and settings |
| 🎨 Glassmorphism UI | Stunning dark-mode design with backdrop-blur, gradients, and micro-animations |
| 🔐 Auth API | JWT-based signup/login with bcrypt password hashing |
| 🗄️ Database | PostgreSQL on Neon (serverless) via Prisma ORM |

---

## 🛠️ Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + custom glassmorphism design system |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit |
| Fonts | Clash Display + Cabinet Grotesk |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js v24 |
| Framework | Express.js v5 |
| ORM | Prisma v7 |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT + bcryptjs |
| DB Adapter | @prisma/adapter-neon |

---

## 📁 Project Structure

```
OdooHackathon/
├── traveloop-app/          # Next.js frontend
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── dashboard/
│   │   │   ├── trips/
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── budget/
│   │   │   │   │   └── builder/
│   │   │   │   └── create/
│   │   │   ├── search/city/
│   │   │   └── profile/
│   │   ├── auth/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── ConfirmDialog.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                # Express.js backend
    ├── lib/
    │   └── prisma.js       # Prisma client with Neon adapter
    ├── prisma/
    │   ├── schema.prisma   # DB models
    │   └── migrations/
    ├── routes/
    │   ├── auth.js         # /api/auth/signup, /api/auth/login
    │   └── trip.js         # /api/trips
    ├── prisma.config.ts    # Prisma 7 config
    ├── server.js           # Entry point
    └── package.json
```

---

## 🗄️ Database Schema

```
User        → id, email, password
Trip        → id, name, description, startDate, endDate, userId
Stop        → id, city, startDate, endDate, tripId
Activity    → id, name, cost, stopId
Budget      → id, transport, stay, meals, activities, tripId
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- A [Neon](https://neon.tech) PostgreSQL database

### Frontend

```bash
cd traveloop-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
```

Then run:

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Server runs on [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips/:userId` | Get all trips for a user |

---

## 📱 Screens

| Screen | Route | Description |
|---|---|---|
| Auth | `/` | Sign in / Sign up with animated background |
| Dashboard | `/dashboard` | Welcome stats, upcoming trips, popular destinations |
| My Trips | `/trips` | Trip cards with filter, delete, view/edit actions |
| Create Trip | `/trips/create` | Multi-step trip creation form |
| Itinerary Builder | `/trips/[id]/builder` | Drag-and-drop stop & activity manager |
| Budget Tracker | `/trips/[id]/budget` | Spending charts, health bar, AI insights |
| Trip Detail | `/trips/[id]` | Public-style trip view with timeline |
| Explore | `/search/city` | Destination search with tag filters |
| Profile | `/profile` | User info, travel stats, preferences |

---

## 🎨 Design System

- **Background:** Deep space gradient (`#0f0c29 → #302b63 → #24243e`)
- **Primary:** Violet-Indigo gradient (`#7C3AED → #4F46E5`)
- **Accent Colors:** Amber (`#F59E0B`) for warnings, Teal (`#0D9488`) for success
- **Glass Cards:** `bg-white/10 backdrop-blur-md border-white/20`
- **Typography:** Clash Display (headings) + Cabinet Grotesk (body)

---

## 👥 Team

Built with ❤️ for the **Odoo Hackathon 2026**.

---

## 📄 License

This project is built for educational and hackathon purposes.
