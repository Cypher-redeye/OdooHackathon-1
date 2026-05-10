[README.md](https://github.com/user-attachments/files/27566945/README.md)
# 🌍 Traveloop
# 🌍 Traveloop

Your AI-Powered Travel Planning Companion — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## 📸 Screenshots

### 🏠 Landing Page — Hero
![Landing Hero]<img width="1600" height="942" alt="01-landing-hero" src="https://github.com/user-attachments/assets/9999c4bb-0103-4433-8424-f5c467ae3823" />


### 🗺️ Popular Destinations
![Popular Destinations]<img width="1600" height="860" alt="02-popular-destinations" src="https://github.com/user-attachments/assets/3b52fd18-bbaa-48a6-a08e-790b04b1e694" />


### 🔐 Authentication
![Auth Screen]<img width="1600" height="857" alt="03-auth" src="https://github.com/user-attachments/assets/c6abd946-44bb-475e-9bd6-6c68395f7212" />


### 📊 Traveler Dashboard
![Dashboard]<img width="1600" height="938" alt="04-dashboard" src="https://github.com/user-attachments/assets/63caf11e-b08f-4a5c-98d2-42ba354f1ab3" />


### 🧳 My Trips
![My Trips]<img width="1600" height="946" alt="05-my-trips" src="https://github.com/user-attachments/assets/a32273c0-e848-4419-9a45-0da3527c08f7" />


### 🔍 Explore Destinations
![Explore]<img width="1600" height="858" alt="06-explore" src="https://github.com/user-attachments/assets/6c4fbc99-1b0d-43a9-b876-532f445291f6" />


### 🗓️ Itinerary Builder
![Itinerary Builder]<img width="1600" height="887" alt="07-itinerary-builder" src="https://github.com/user-attachments/assets/12ca15ab-3fbc-4f16-882f-0ad0cec2b4b3" />


### 🎯 Discover Activities
![Discover Activities]<img width="1600" height="863" alt="08-discover-activities" src="https://github.com/user-attachments/assets/1685d0fe-8b3f-41d8-9af0-7c2170841673" />


### 👥 Community — Traveler Hub
![Community]<img width="1600" height="861" alt="09-community" src="https://github.com/user-attachments/assets/22c9f894-582c-4809-85c6-5a16ade4b14b" />


### 🛡️ Admin Dashboard
![Admin Dashboard]<img width="1276" height="768" alt="10-admin-dashboard" src="https://github.com/user-attachments/assets/74147829-d20d-4702-9d7f-bdac28ab97c6" />


![Admin Dashboard Detail]<img width="1600" height="859" alt="11-admin-closeup" src="https://github.com/user-attachments/assets/ef142384-7bf7-44f9-981a-62e9467b8829" />

### 👤 User Profile
![Profile]<img width="1600" height="863" alt="12-profile" src="https://github.com/user-attachments/assets/3a02de2e-3d73-490d-be39-3833eede95c0" />


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
