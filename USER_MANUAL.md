# International Hospitality Group (IHG)
## Enterprise Hospitality, Restaurant & Food Delivery Platform — User Manual

Welcome to the **IHG Enterprise Management Platform**. This guide explains how staff and managers use each part of the system (Hotel Suites, Fine Dining POS, Kitchen KDS, Online Food Delivery, Housekeeping, Inventory, and Invoices).

---

### 1. Accessing the Platform
- **URL**: `http://localhost:3000` (Dev Client)
- **Backend API**: `http://localhost:5000` (REST API Server)

---

### 2. Role-Based Access Control (RBAC)
At the top-right of the header, use the **Role Mode** dropdown to simulate or switch between employee roles:
- **General Manager (GM)**: Executive analytics, financial KPI metrics, real-time activity feed, and supply health.
- **Front Desk Reception**: Room booking grid, guest check-in, guest check-out, and billing.
- **Executive Chef (KDS)**: Kitchen Display System for cooking line and order dispatch.
- **Housekeeping Lead**: Room turnover tasks, cleaning status advancement, and sanitization.
- **Dine-In Waiter**: Floor table grid, table ordering POS, and bill generation.
- **Delivery Rider**: Delivery dispatch queue, route details, and delivery completion.
- **Guest & Customer**: Public booking portal, food delivery ordering, cart checkout, and room service.

---

### 3. Hotel Operations
- **Browse Suites**: View all rooms with high-res photos, bed types, pricing, and live statuses (*Available*, *Occupied*, *Cleaning*, *Maintenance*).
- **Book a Suite**: Click **"Book Suite"**, enter guest name, contact details, stay dates, and guest count.
- **Check-In Guest**: Front desk clicks **"Check-In"** to mark the suite *Occupied*.
- **Check-Out & Turnover**: Clicking **"Check-Out"** calculates the stay folio, marks the room for *Cleaning*, and automatically queues a housekeeping turnover task!
- **In-Room Service**: Checked-in guests or reception can request in-room dining or amenities.

---

### 4. Fine Dining & Waiter POS
- **Floor Map**: View real-time table statuses (*Available*, *Occupied*, *Reserved*).
- **Waiter POS Order**: Click on an available table, select culinary dishes from the menu, and click **"Fire Order to Kitchen KDS"**. The table instantly updates to *Occupied* and sends tickets to the kitchen.
- **Reserve a Table**: Click **"Reserve a Table"** for date/time slots and special requests (e.g. Candlelight anniversary).
- **Settle Bill**: Waiter clicks **"Settle Bill"** to finalize the order and free the table for new guests.

---

### 5. Kitchen Display System (KDS)
- **Live Ticket Stream**: View incoming orders with item quantities and special guest instructions.
- **Status Progression**:
  1. Click **"Start Cooking Now"** (changes status to *Preparing*).
  2. Click **"Ready / Hand to Rider"** or **"Mark Ready for Table"** (notifies waiters or delivery riders).
  3. Click **"Mark Served"** to complete the kitchen ticket.

---

### 6. Gourmet Food Delivery & Online Ordering
- **Browse Menu**: Filter by *Chef Specials*, *Main Course*, *Appetizers*, *Desserts*, and *Beverages*.
- **Add to Bag**: Adjust quantities with animated counters.
- **Checkout**: Enter recipient name, phone, delivery address, notes, and payment mode (*bKash*, *Nagad*, *Card*, *Cash on Delivery*).
- **Live Order Tracker**: Watch step-by-step progress from *Order Placed* → *Preparing* → *Out for Delivery* → *Delivered*.

---

### 7. Housekeeping Management
- **Task Board**: 3-column workflow (*Pending* → *In-Progress* → *Cleaned & Ready*).
- **Turnover**: When a room is marked **"Cleaned"**, the system automatically makes the room *Available* on the Front Desk grid.
- **Schedule Task**: Assign deep cleaning, sanitization, or maintenance to staff members.

---

### 8. Unified Stock & Inventory
- Centralized tracking for kitchen ingredients, bar beverages, and hotel amenities.
- **Low Stock Warnings**: Red alert flags appear when stock drops below safe threshold levels.
- **1-Click Restock**: Click **"Restock +15"** to replenish inventory.

---

### 9. Invoices & Billing Hub
- Comprehensive folio statements detailing room stay totals, restaurant dining charges, VAT/tax, and payments.
- **Digital Receipt**: Click **"Receipt"** to view and print official branded IHG guest statements.
- **Balance Settlement**: 1-click settlement for remaining guest balances.

---

### 10. 24/7 AI Smart Concierge
- Click the **"AI Concierge"** button in the header.
- Ask questions regarding luxury suites, menu recommendations, or room amenities.
- Click quick suggestion prompts or action buttons to navigate instantly to any department.
