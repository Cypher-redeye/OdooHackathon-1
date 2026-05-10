# 🌍 Traveloop

> **Your AI-Powered Travel Planning Companion** — Plan, organize, and share personalized travel itineraries with ease.

Built for the **Odoo Hackathon 2026**.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🗺️ **Itinerary Builder** | Drag-and-drop stops, add activities, and build day-by-day travel plans |
| 💰 **Budget Tracker** | Visual pie/bar charts, daily spending alerts, and AI-powered cost insights |
| 🔍 **Explore Destinations** | Search and filter destinations by tags (Beach, Culture, Luxury, etc.) |
| 🔗 **Share Trips** | Public itinerary view with timeline, copy-trip, and social sharing |
| 👤 **User Profile** | Personal travel stats, preferences, and settings |
| 🎨 **Glassmorphism UI** | Stunning dark-mode design with backdrop-blur, gradients, and micro-animations |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + custom glassmorphism design system |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) |
| **Fonts** | [Clash Display](https://www.fontshare.com/fonts/clash-display) + [Cabinet Grotesk](https://www.fontshare.com/fonts/cabinet-grotesk) |

---

## 📁 Project Structure

```
traveloop-app/
├── app/
│   ├── (main)/                 # Route group with shared layout (Navbar, Sidebar, BottomNav)
│   │   ├── dashboard/          # Home dashboard with stats & upcoming trips
│   │   ├── trips/              # Trip management (list, create, builder, budget)
│   │   ├── search/city/        # Explore destinations
│   │   └── profile/            # User profile & settings
│   ├── globals.css             # Design system tokens & utility classes
│   ├── layout.tsx              # Root layout (HTML, fonts, metadata)
│   └── page.tsx                # Auth / landing page
├── components/                 # Reusable UI components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── BottomNav.tsx
│   └── ConfirmDialog.tsx
├── lib/                        # Shared utilities
│   └── utils.ts                # cn() class merging helper
├── tailwind.config.ts          # Custom color palette, fonts, gradients
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/ankitrmishra01/OdooHackathon.git
cd OdooHackathon/traveloop-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Screens

| Screen | Route | Description |
|--------|-------|-------------|
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

- **Background**: Deep space gradient (`#0f0c29` → `#302b63` → `#24243e`)
- **Primary**: Violet-Indigo gradient (`#7C3AED` → `#4F46E5`)
- **Accent Colors**: Amber (`#F59E0B`) for warnings, Teal (`#0D9488`) for success
- **Glass Cards**: `bg-white/10 backdrop-blur-md border-white/20`
- **Typography**: Clash Display (headings) + Cabinet Grotesk (body)

---

## 👥 Team

Built with ❤️ for the Odoo Hackathon 2026.

---

## 📄 License

This project is built for educational and hackathon purposes.
