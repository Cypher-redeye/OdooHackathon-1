# 🌍 Traveloop

Your AI-Powered Travel Planning Companion — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ Itinerary Builder | Drag-and-drop stops, add activities, and build day-by-day travel plans |
| 💰 Budget Tracker | Visual spending charts, daily budget health, and cost insights |
| 🔍 Explore Destinations | Search and filter destinations by tags (Beach, Culture, Luxury, etc.) |
| 🔗 Share Trips | Public itinerary view with timeline, copy-trip, and community feed |
| 👤 User Profile | Personal travel stats, bio, and custom profile images |
| 🎨 Premium UI | Cocoa & Butter Yellow aesthetic with glassmorphism and smooth Framer Motion animations |
| 🔐 Robust Security | JWT-based auth with granular ownership checks and protection against ID enumeration |

---

## 🔐 Security & Robustness

This project underwent a strict security audit to ensure production-grade safety:

- **Authentication**: JWT-based session management with `bcrypt` password hashing.
- **Granular Authorization**: Every API request (`Packing`, `Notes`, `Stops`, `Activities`, `Budget`) verifies trip ownership. Users can only access or modify their own data.
- **Injection Protection**: All database queries use Prisma ORM to prevent SQL injection.
- **Security Headers**: Implemented manual middleware for `X-Content-Type-Options`, `X-Frame-Options` (Clickjacking protection), and `X-XSS-Protection`.
- **Input Validation**: Server-side length and format validation for profile and trip inputs.
- **CORS**: Restricted origins to prevent unauthorized cross-origin requests.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3 (Custom Cocoa & Butter Yellow theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Auth**: @react-oauth/google (Google Login) + Custom JWT

### Backend
- **Runtime**: Node.js v24
- **Framework**: Express.js v5
- **ORM**: Prisma v7
- **Database**: PostgreSQL (Neon serverless)
- **Auth**: JWT + bcryptjs

---

## 📁 Project Structure

```
OdooHackathon/
├── traveloop-app/          # Next.js frontend
│   ├── app/
│   │   ├── (main)/
│   │   │   ├── dashboard/  # Traveler Dashboard
│   │   │   ├── trips/      # Trip Management & List
│   │   │   ├── search/     # Discovery Engine
│   │   │   └── profile/    # User Profile
│   │   ├── auth/           # Login/Signup/Forgot Password
│   ├── components/         # Reusable UI Components
│   └── tailwind.config.ts  # Theme configuration
│
└── backend/                # Express.js backend
    ├── middleware/
    │   └── auth.js         # JWT Verification Middleware
    ├── routes/
    │   ├── auth.js         # Auth & Profile Routes
    │   ├── trip.js         # Core Trip & Ownership logic
    │   └── ...             # Resource-specific routes
    ├── server.js           # Security-hardened entry point
    └── prisma/             # Schema & Migrations
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
npm run dev
```

---

## 📡 API Endpoints (Protected)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login & receive JWT |
| PATCH | `/api/auth/profile` | Update user name/image (Validated) |
| GET | `/api/trips` | Get user's own trips |
| POST | `/api/trips` | Create trip with auto-stops |
| DELETE | `/api/trips/:id` | Delete trip (Ownership checked) |
| GET | `/api/trips/all` | **Public** Community Feed |

---

## 🎨 Design System

- **Background**: Deep Cocoa (`#0A0705`)
- **Primary**: Butter Yellow (`#E4C48C`)
- **Secondary**: Muted Gold (`#A0724B`)
- **Glass Cards**: `bg-white/5 backdrop-blur-xl border-white/10`
- **Typography**: Clash Display + Cabinet Grotesk

---

## 👥 Team

Built with ❤️ for the **Odoo Hackathon 2026**.
