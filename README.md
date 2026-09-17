# International Hospitality Group (IHG)
## Enterprise Hospitality, Restaurant & Food Delivery Management Platform

An integrated, enterprise-grade software platform connecting **Hotel Operations**, **Fine Dining POS & KDS**, **Online Food Delivery**, **Housekeeping**, **Unified Inventory**, and **24/7 AI Concierge**.

---

## 🚀 Quick Start (For Client / Handover)

### Option 1: 1-Click Launch (Recommended for Windows)
Simply double-click the **`start.bat`** file in this directory.  
It will automatically launch the backend server, frontend client, and open your web browser at **`http://localhost:3000`**.

---

### Option 2: Command Line Run

#### 1. Install All Dependencies (First-time setup only):
```bash
npm run install:all
```

#### 2. Start Both Server & Client Together:
```bash
npm start
# or
npm run dev
```

- **Live Production URL**: [https://grand-aurelia-five.vercel.app/](https://grand-aurelia-five.vercel.app/)
- **Frontend Application (Local)**: `http://localhost:3000`
- **Backend REST API (Local)**: `http://localhost:5000`
- **API Health Check**: `https://grand-aurelia-five.vercel.app/api/health`

---

## 📋 Core Modules Included

1. **Executive GM Dashboard**: Real-time revenue analytics, hotel occupancy %, order volume, and supply health alerts.
2. **Hotel Management**: Room availability matrix, 1-click check-in/check-out, automatic housekeeping turnover dispatch, and in-room service.
3. **Fine Dining & Table POS**: Live floor map (Terrace, Main Dining, VIP Lounge), waiter POS order-taking directly dispatched to the kitchen, table reservations, and bill settlement.
4. **Kitchen Display System (KDS)**: Real-time ticket management for chefs with prep timers and cooking status advancement.
5. **Gourmet Food Delivery**: Interactive online storefront, menu filtering, smart cart with promo discounts, checkout (bKash/Cards/COD), and 4-step live order tracking.
6. **Housekeeping & Facility Care**: 3-stage Kanban cleaning board (*Pending* → *In-Progress* → *Cleaned & Ready*) with auto room-readiness sync.
7. **Unified Inventory**: Centralized stock levels across kitchen ingredients, beverages, and hotel amenities with 1-click restock.
8. **Invoices & Billing Hub**: Digital folios with room charges, dining fees, taxes, and official printable PDF receipts.
9. **24/7 AI Smart Concierge**: Hospitality AI chatbot for guest inquiries, room recommendations, and instant actions.

---

## 📁 Project Structure

```
Nasir Vai_project/
├── client/                     # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/         # Modular UI Views for each department
│   │   ├── App.jsx             # Root App State & Integration
│   │   └── index.css           # IHG Enterprise Design Tokens (#1F3A5F & #FF2147)
│   └── vite.config.js          # Port 3000 & API Proxy Configuration
├── server/                     # Express REST API Backend
│   ├── data/
│   │   └── database.json       # Persistent JSON Database
│   └── src/
│       ├── db.js               # Database Engine & Seed Data
│       └── index.js            # REST API Endpoints & Business Logic
├── start.bat                   # 1-Click Windows Launcher
├── USER_MANUAL.md              # Plain-language user guide for staff & management
├── IHG Project Proposal.pdf    # Original Enterprise Proposal Specification
└── README.md                   # Project overview & documentation
```

---

## 📖 Handover & Documentation
- Refer to **[`USER_MANUAL.md`](./USER_MANUAL.md)** for detailed role-by-role operating instructions.
