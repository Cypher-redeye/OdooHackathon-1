# 🌍 Traveloop

Your AI-Powered Travel Planning Companion — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Hero](https://github.com/user-attachments/assets/9999c4bb-0103-4433-8424-f5c467ae3823)

### 🗺️ Popular Destinations
![Popular Destinations](https://github.com/user-attachments/assets/3b52fd18-bbaa-48a6-a08e-790b04b1e694)

### 🔐 Authentication
![Auth Screen](https://github.com/user-attachments/assets/c6abd946-44bb-475e-9bd6-6c68395f7212)

### 📊 Traveler Dashboard
![Dashboard](https://github.com/user-attachments/assets/63caf11e-b08f-4a5c-98d2-42ba354f1ab3)

### 🧳 My Trips
![My Trips](https://github.com/user-attachments/assets/a32273c0-e848-4419-9a45-0da3527c08f7)

### 🔍 Explore Destinations
![Explore](https://github.com/user-attachments/assets/6c4fbc99-1b0d-43a9-b876-532f445291f6)

### 🗓️ Itinerary Builder
![Itinerary Builder](https://github.com/user-attachments/assets/12ca15ab-3fbc-4f16-882f-0ad0cec2b4b3)

### 🎯 Discover Activities
![Discover Activities](https://github.com/user-attachments/assets/1685d0fe-8b3f-41d8-9af0-7c2170841673)

### 👥 Community — Traveler Hub
![Community](https://github.com/user-attachments/assets/22c9f894-582c-4809-85c6-5a16ade4b14b)

### 🛡️ Admin Dashboard
![Admin Dashboard](https://github.com/user-attachments/assets/74147829-d20d-4702-9d7f-bdac28ab97c6)
![Admin Dashboard Detail](https://github.com/user-attachments/assets/ef142384-7bf7-44f9-981a-62e9467b8829)

### 👤 User Profile
![Profile](https://github.com/user-attachments/assets/3a02de2e-3d73-490d-be39-3833eede95c0)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ Itinerary Builder | Drag-and-drop stops, add activities, and build day-by-day travel plans |
| 💰 Budget Tracker | Visual pie/bar charts, daily spending alerts, and AI-powered cost insights |
| 🔍 Explore Destinations | Search and filter destinations by tags (Beach, Culture, Luxury, etc.) |
| 🔗 Share Trips | Public itinerary view with timeline, copy-trip, and social sharing |
| 👥 Community Hub | Connect with other travelers, share experiences |
| 🛡️ Admin Dashboard | Manage users, trips, and platform analytics |
| 👤 User Profile | Personal travel stats, preferences, and settings |
| 🎨 Glassmorphism UI | Stunning dark-mode design with backdrop-blur, gradients, and micro-animations |
| 🔐 Auth | JWT + Google OAuth with bcrypt password hashing |
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
| Auth | JWT + bcryptjs + Google OAuth |
| DB Adapter | @prisma/adapter-neon |

---

## 📁 Project Structure

```
OdooHackathon/
├── traveloop-app/              # Next.js frontend
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── dashboard/      # Traveler dashboard
│   │   │   ├── trips/          # Trip management
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── budget/
│   │   │   │   │   └── builder/
│   │   │   │   └── create/
│   │   │   ├── search/city/    # Explore destinations
│   │   │   ├── community/      # Traveler hub
│   │   │   ├── admin/          # Admin dashboard
│   │   │   └── profile/        # User profile
│   │   ├── auth/               # Authentication
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx            # Landing page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── BottomNav.tsx
│   │   └── ConfirmDialog.tsx
│   ├── lib/
│   │   ├── api.ts              # API URL config
│   │   └── utils.ts
│   ├── public/                 # Static assets
│   ├── tailwind.config.ts
│   └── package.json
│
└── backend/                    # Express.js backend
    ├── lib/
    │   └── prisma.js           # Prisma client with Neon adapter
    ├── middleware/              # Auth guards, ownership checks
    ├── prisma/
    │   ├── schema.prisma        # DB models
    │   └── migrations/
    ├── routes/
    │   ├── auth.js             # signup, login, google, reset-password
    │   └── trip.js             # CRUD trip endpoints
    ├── scratch/
    ├── prisma.config.ts         # Prisma 7 config
    ├── server.js                # Entry point
    └── package.json
```

---

## 🗄️ Database Schema

```
User        → id, name, email, password
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

Create `traveloop-app/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

Open [http://localhost:3000](http://localhost:3000)

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=5000
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
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
| POST | `/api/auth/google` | Google OAuth login |
| POST | `/api/auth/reset-password` | Reset user password |

### Trips
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/trips` | Create a new trip |
| GET | `/api/trips/:userId` | Get all trips for a user |

---

## 📱 Screens

| Screen | Route | Description |
|---|---|---|
| Landing | `/` | Hero, popular destinations |
| Auth | `/auth` | Sign in / Sign up / Google OAuth |
| Dashboard | `/dashboard` | Welcome stats, upcoming trips |
| My Trips | `/trips` | Trip cards with filter and actions |
| Create Trip | `/trips/create` | Multi-step trip creation |
| Itinerary Builder | `/trips/[id]/builder` | Drag-and-drop stop manager |
| Budget Tracker | `/trips/[id]/budget` | Spending charts and insights |
| Explore | `/search/city` | Destination search with filters |
| Community | `/community` | Traveler hub and sharing |
| Admin | `/admin` | Platform management dashboard |
| Profile | `/profile` | User info and travel stats |

---

## 🎨 Design System

- **Theme:** Warm cocoa + butter yellow
- **Background:** Dark warm gradient
- **Primary:** Amber/brown tones
- **Glass Cards:** `bg-white/10 backdrop-blur-md border-white/20`
- **Typography:** Clash Display (headings) + Cabinet Grotesk (body)

---

## 👥 Team

Built with ❤️ for the **Odoo Hackathon 2026**.

---

## 📄 License

This project is built for educational and hackathon purposes.
