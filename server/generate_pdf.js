import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve(__dirname, '..', 'Grand_Aurelia_Full_Project_Documentation.pdf');

// Initialize PDF document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 35, bottom: 35, left: 45, right: 45 },
  bufferPages: true,
  autoFirstPage: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Luxury Enterprise Brand Colors
const NAVY = '#1F3A5F';
const NAVY_DARK = '#12243C';
const ACCENT = '#FF2147';
const SLATE = '#475569';
const BORDER_DARK = '#CBD5E1';

// Header Helper
function drawHeader(title, subtitle) {
  doc.rect(45, 28, 505, 4).fill(NAVY);
  doc.fillColor(NAVY_DARK).fontSize(15).font('Helvetica-Bold').text(title, 45, 38);
  if (subtitle) {
    doc.fillColor(SLATE).fontSize(8.5).font('Helvetica').text(subtitle, 45, 56);
  }
  doc.strokeColor(BORDER_DARK).lineWidth(0.5).moveTo(45, 70).lineTo(550, 70).stroke();
  doc.y = 80;
}

// Section Title
function drawSectionTitle(title) {
  const y = doc.y;
  doc.rect(45, y, 4, 14).fill(ACCENT);
  doc.fillColor(NAVY_DARK).fontSize(11.5).font('Helvetica-Bold').text(title, 55, y + 1);
  doc.moveDown(0.45);
}

// Subsection Title
function drawSubSectionTitle(title) {
  doc.fillColor(NAVY).fontSize(9.5).font('Helvetica-Bold').text(title);
  doc.moveDown(0.25);
}

// Paragraph
function drawParagraph(text) {
  doc.fillColor(SLATE).fontSize(8.5).font('Helvetica').text(text, { lineGap: 2, align: 'justify' });
  doc.moveDown(0.35);
}

// Bullet
function drawBullet(title, text) {
  doc.fillColor(ACCENT).fontSize(8.5).font('Helvetica-Bold').text('• ', { continued: true });
  doc.fillColor(NAVY_DARK).font('Helvetica-Bold').text(`${title}: `, { continued: true });
  doc.fillColor(SLATE).font('Helvetica').text(text, { lineGap: 1.8 });
  doc.moveDown(0.22);
}

// Badges
function drawBadgeBox(items, startY) {
  let curX = 45;
  const curY = startY || doc.y;
  items.forEach(item => {
    const textWidth = doc.widthOfString(item.label, { size: 7.5, font: 'Helvetica-Bold' }) + 12;
    doc.roundedRect(curX, curY, textWidth, 15, 3).fill(item.bg || '#EBF1F8');
    doc.fillColor(item.color || NAVY).fontSize(7.5).font('Helvetica-Bold').text(item.label, curX + 6, curY + 3.5);
    curX += textWidth + 6;
  });
  doc.y = curY + 22;
}

// ==========================================
// PAGE 1: EXECUTIVE COVER & PLATFORM SUMMARY
// ==========================================

// Hero Header Banner
doc.rect(45, 30, 505, 120).fill(NAVY_DARK);
doc.rect(45, 30, 505, 4).fill(ACCENT);

doc.fillColor('#FFFFFF').fontSize(21).font('Helvetica-Bold').text('GRAND AURELIA', 65, 46);
doc.fillColor('#FCD34D').fontSize(8.5).font('Helvetica-Bold').text('HOTEL & RESORT • EST. 1928 — ENTERPRISE HOSPITALITY PLATFORM', 65, 71);
doc.fillColor('#CBD5E1').fontSize(10).font('Helvetica-Oblique').text('Where Timeless Luxury Meets Culinary Artistry & Intelligent Technology', 65, 86);

// Credits Banner
doc.rect(65, 106, 465, 28).fill('rgba(255, 255, 255, 0.08)');
doc.fillColor('#FFFFFF').fontSize(8).font('Helvetica-Bold').text('Developer: ', 75, 115, { continued: true });
doc.fillColor('#93C5FD').font('Helvetica-Bold').text('Lutfor Rahman', { continued: true });
doc.fillColor('#CBD5E1').font('Helvetica').text('   |   Company: ', { continued: true });
doc.fillColor('#FCD34D').font('Helvetica-Bold').text('Lutfor IT Solution', { continued: true });
doc.fillColor('#CBD5E1').font('Helvetica').text('   |   Live Demo: ', { continued: true });
doc.fillColor('#6EE7B7').font('Helvetica-Bold').text('https://grand-aurelia-five.vercel.app/');

doc.y = 165;

// Executive Summary
drawSectionTitle('1. Executive Summary & Vision');
drawParagraph('Grand Aurelia is an enterprise-grade, full-stack digital management ecosystem tailored for luxury 5-star hotels, fine-dining restaurants, rapid cloud kitchens, and gourmet food delivery operations. The platform seamlessly unifies multi-department hospitality workflows into a single high-performance interface with sub-millisecond responsiveness, real-time synchronization, and a 24/7 AI Concierge.');

// Tech Stack Badges
drawBadgeBox([
  { label: 'React 19', bg: '#EBF1F8', color: NAVY },
  { label: 'Vite 8', bg: '#EFF6FF', color: '#2563EB' },
  { label: 'Node.js & Express', bg: '#ECFDF5', color: '#065F46' },
  { label: 'REST API Engine', bg: '#FFFBEB', color: '#92400E' },
  { label: '24/7 AI Concierge', bg: '#FFF0F2', color: ACCENT },
  { label: 'Vercel Cloud Live', bg: '#F5F3FF', color: '#7C3AED' }
]);

// Core Capabilities
drawSectionTitle('2. Core Enterprise Pillars');
drawBullet('Role-Based Access Control (RBAC)', 'Simulates 7 operational roles: General Manager, Front Desk, Executive Chef, Waiter POS, Delivery Rider, Housekeeping Lead, and Public Guest.');
drawBullet('Hotel Accommodations & Front Desk', 'Real-time room availability matrix, 1-click guest check-in/checkout, automated housekeeping turnover queuing, and in-room dining integration.');
drawBullet('Fine Dining & Table POS', 'Live floor plan (Main Dining, VIP Lounge, Terrace), waiter POS order dispatching directly to the kitchen, reservations, and instant bill settlement.');
drawBullet('Kitchen Display System (KDS)', 'Live kitchen ticket management with preparation countdown timers and stage-by-stage status advancement.');
drawBullet('Gourmet Food Delivery Hub', 'Interactive digital menu, smart promo discount calculations, multi-payment gateway (bKash/Nagad/Cards/COD), and 4-step live rider tracking.');
drawBullet('Housekeeping Turnover Kanban', '3-stage room cleaning board with automatic front-desk room availability synchronization.');
drawBullet('Unified Stock & Inventory', 'Cross-department supplies monitoring with auto low-stock threshold warnings and 1-click restock.');
drawBullet('Digital Folios & Invoicing Hub', 'Consolidated billing covering room nights, restaurant meals, taxes, and printable official receipts.');
drawBullet('24/7 AI Smart Concierge', 'Intelligent hospitality bot answering guest inquiries, suggesting room upgrades, and triggering instant UI actions.');

// ==========================================
// PAGE 2: MODULE-BY-MODULE DETAILED BREAKDOWN
// ==========================================
doc.addPage();
drawHeader('Grand Aurelia — Detailed Module Breakdown', 'Departmental features, business workflows, and interactive capabilities');

drawSectionTitle('3. Comprehensive Module Specifications');

drawSubSectionTitle('3.1 Executive GM Overview Dashboard');
drawParagraph('The executive command center provides leadership with real-time visibility into hospitality operations:');
drawBullet('KPI Performance Cards', 'Tracks Total Platform Revenue, Hotel Occupancy Rate, Active Dine & Delivery Orders, and Critical Low-Stock Alerts with matching brand borders and smooth hover elevation.');
drawBullet('Revenue Contribution Split', 'Visual progress bars analyzing accommodation earnings vs culinary & delivery sales.');
drawBullet('Live Operations Activity Stream', 'Real-time feed of recent guest bookings, check-ins, and incoming culinary orders.');

drawSubSectionTitle('3.2 Hotel Accommodations & Front Desk Operations');
drawParagraph('Manages luxury suite inventories across Presidential Penthouses, Royal Suites, Executive Balcony, and Deluxe Garden rooms:');
drawBullet('Availability Grid', 'Color-coded room statuses: Available (Green), Occupied (Blue), Cleaning (Amber), Maintenance (Red).');
drawBullet('Instant Booking Modal', 'Collects guest name, contact, stay dates, guest count, and calculates total cost with tax.');
drawBullet('1-Click Check-In & Check-Out', 'Streamlines guest arrivals and automatically triggers cleaning tasks upon checkout.');

drawSubSectionTitle('3.3 Fine Dining Table POS & Table Management');
drawParagraph('Designed for floor captains and waiters to manage reservations and table orders:');
drawBullet('Interactive Floor Grid', 'Displays table capacities, current status (Available, Occupied, Reserved), and active orders.');
drawBullet('Waiter POS Dispatch', 'Waiters can select dishes from the culinary catalog and fire tickets straight to Kitchen KDS.');
drawBullet('Table Reservation Engine', 'Enables advance table booking with special requests (Anniversary, Window seat, Business dinner).');

drawSubSectionTitle('3.4 Real-Time Kitchen Display System (KDS)');
drawParagraph('Replaces paper tickets with a synchronized kitchen display screen:');
drawBullet('Ticket Stages', 'Order Placed -> Preparing / Cooking -> Ready for Table / Hand to Rider -> Served / Dispatched.');
drawBullet('Order Timers & Urgency', 'Visual color indicators showing order age to ensure compliance with fine-dining SLAs.');

// ==========================================
// PAGE 3: DELIVERY, HOUSEKEEPING, INVENTORY & AI
// ==========================================
doc.addPage();
drawHeader('Grand Aurelia — Operations, Logistics & AI', 'Online delivery, facility turnover, supply chain, and intelligent agent');

drawSubSectionTitle('3.5 Gourmet Express Food Delivery & Rider App');
drawParagraph('Public-facing online food delivery and dedicated rider dispatch interface:');
drawBullet('Menu Catalog & Cart', 'Filter by Chef Specials, Main Courses, Appetizers, Desserts, and Beverages with animated counters.');
drawBullet('Checkout & Payment', 'Supports bKash, Nagad, Credit/Debit Cards, and Cash on Delivery with delivery address validation.');
drawBullet('Live 4-Stage Rider Tracking', 'Simulates live GPS rider route, vehicle details, contact button, and delivery confirmation.');

drawSubSectionTitle('3.6 Housekeeping & Facility Turnover Management');
drawParagraph('Ensures 5-star sanitization and cleanliness standards across all hotel suites:');
drawBullet('Kanban Board', '3-column drag/click workflow: Pending Cleaning -> In-Progress -> Cleaned & Inspected.');
drawBullet('Automated Room Sync', 'Marking a task "Cleaned" automatically switches room status on Front Desk to "Available".');

drawSubSectionTitle('3.7 Unified Stock & Multi-Department Inventory');
drawParagraph('Centralized warehouse tracking kitchen raw ingredients, bar beverages, and room amenities:');
drawBullet('Threshold Alert System', 'Visual warning badges when items fall below safe threshold limits.');
drawBullet('1-Click Restocking', 'Instant restock buttons to replenish quantities with real-time database update.');

drawSubSectionTitle('3.8 Digital Billing, Folios & Invoicing Hub');
drawParagraph('Consolidated guest billing management:');
drawBullet('Guest Folios', 'Consolidates room stay charges, dining expenses, service fees, and taxes into itemized statements.');
drawBullet('Printable Receipts', 'Branded 5-star official receipts with 1-click browser print integration.');

drawSubSectionTitle('3.9 24/7 AI Smart Concierge & Knowledge Engine');
drawParagraph('Autonomous conversational agent trained on Grand Aurelia hotel policies and menus:');
drawBullet('Automated Recommendations', 'Recommends suites based on guest party size and suggests wine/dining pairings.');
drawBullet('Quick Action Chips', 'Allows guests to instantly jump to suites, order food, or reserve dining tables with 1 click.');

// ==========================================
// PAGE 4: TECHNICAL ARCHITECTURE & DEPLOYMENT
// ==========================================
doc.addPage();
drawHeader('Grand Aurelia — Technical Architecture & Deployment', 'Codebase structure, REST endpoints, deployment, and handover details');

drawSectionTitle('4. Technical Architecture & File Structure');
drawParagraph('The codebase follows clean architecture separating frontend presentation from backend business logic:');

doc.rect(45, doc.y, 505, 92).fill('#F8FAFC');
const treeY = doc.y + 6;
doc.fillColor(NAVY_DARK).fontSize(7.8).font('Courier-Bold');
doc.text('Nasir Vai_project/', 55, treeY);
doc.font('Courier').fontSize(7.5).fillColor(SLATE);
doc.text('  |-- client/                     # React 19 + Vite 8 Frontend Application', 55, treeY + 11);
doc.text('  |   |-- src/components/         # GMDashboard, HotelView, RestaurantView, KDSView, etc.', 55, treeY + 21);
doc.text('  |   |-- src/App.jsx             # Main Application Root State & Safe Sync Engine', 55, treeY + 31);
doc.text('  |   +-- src/index.css           # Grand Aurelia Luxury Design Tokens (#1F3A5F & #FF2147)', 55, treeY + 41);
doc.text('  |-- server/                     # Node.js + Express.js REST API Backend', 55, treeY + 51);
doc.text('  |   |-- data/database.json      # Persistent JSON Database Seed', 55, treeY + 61);
doc.text('  |   +-- src/index.js            # REST API Routes, Middleware & CRUD Handlers', 55, treeY + 71);
doc.text('  +-- start.bat                   # 1-Click Windows Production / Dev Launcher', 55, treeY + 81);

doc.y = treeY + 95;

drawSectionTitle('5. REST API Endpoints Specification');

const endpoints = [
  { method: 'GET / POST', path: '/api/rooms', desc: 'Retrieve all rooms & create room booking' },
  { method: 'POST', path: '/api/rooms/:id/checkin', desc: 'Perform 1-click guest check-in' },
  { method: 'POST', path: '/api/rooms/:id/checkout', desc: 'Check-out guest & dispatch cleaning' },
  { method: 'GET / POST', path: '/api/tables', desc: 'Get floor tables & reserve table' },
  { method: 'GET / POST', path: '/api/orders', desc: 'Fetch culinary orders & fire new tickets' },
  { method: 'PATCH', path: '/api/orders/:id/status', desc: 'Update KDS cooking / delivery status' },
  { method: 'GET / PATCH', path: '/api/housekeeping', desc: 'Manage room cleaning Kanban tasks' },
  { method: 'GET / POST', path: '/api/inventory', desc: 'Monitor stock levels & execute restock' },
  { method: 'GET', path: '/api/analytics', desc: 'Consolidated revenue & occupancy metrics' },
  { method: 'GET', path: '/api/health', desc: 'Production uptime & health check endpoint' }
];

endpoints.forEach(ep => {
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(7.5).text(ep.method.padEnd(12), 45, doc.y, { continued: true, lineBreak: false });
  doc.fillColor(ACCENT).font('Courier-Bold').text(ep.path.padEnd(30), { continued: true, lineBreak: false });
  doc.fillColor(SLATE).font('Helvetica').text(ep.desc, { lineBreak: true });
  doc.moveDown(0.18);
});

doc.moveDown(0.35);

drawSectionTitle('6. Deployment & Developer Credits');
drawBullet('Live Production Cloud URL', 'https://grand-aurelia-five.vercel.app/');
drawBullet('GitHub Official Repository', 'https://github.com/rokeyaag/grand-aurelia');
drawBullet('Local Launch Instruction', 'Double-click start.bat in the root folder or execute "npm start".');
drawBullet('Lead Software Developer', 'Lutfor Rahman');
drawBullet('Engineering Organization', 'Lutfor IT Solution');
drawBullet('Copyright & License', '© 2026 Grand Aurelia Luxury Hotel & Resort. All rights reserved. MIT License.');

// Precise Page Numbering Footer on all 4 pages
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  doc.page.margins.bottom = 0;
  doc.strokeColor(BORDER_DARK).lineWidth(0.5).moveTo(45, 805).lineTo(550, 805).stroke();
  doc.fillColor(SLATE).fontSize(7.5).font('Helvetica')
    .text('Grand Aurelia Enterprise Platform — Full Project Documentation', 45, 812, { lineBreak: false });
  doc.fillColor(NAVY_DARK).font('Helvetica-Bold')
    .text(`Page ${i + 1} of ${totalPages}`, 480, 812, { width: 70, align: 'right', lineBreak: false });
}

doc.end();

writeStream.on('finish', () => {
  console.log(`[SUCCESS] PDF generated cleanly with exactly ${totalPages} pages at: ${outputPath}`);
});
