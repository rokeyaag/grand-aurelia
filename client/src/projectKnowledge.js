// =========================================================
// GRAND AURELIA KNOWLEDGE BASE & GLOBAL FLIGHT ENGINE
// All content and responses are delivered in English.
// Multilingual voice speech recognition catches audio inputs.
// =========================================================

export const FLIGHT_SCHEDULES = [
  {
    id: "fl_01",
    flightNumber: "EK-583",
    airline: "Emirates Airlines",
    from: "Dhaka (DAC)",
    to: "Dubai (DXB)",
    departureTime: "10:15 AM",
    arrivalTime: "01:45 PM",
    duration: "5h 30m (Non-stop)",
    aircraft: "Boeing 777-300ER",
    prices: { economy: 380, business: 850, firstSuite: 1650 },
    baggage: "Economy: 30kg • Business: 40kg • First: 50kg + VIP Lounge",
    inclusions: ["Gourmet 3-Course Dining", "Complimentary Wi-Fi", "Chauffeur Airport Pickup (First/Business)", "Grand Aurelia Concierge Fast-Track"]
  },
  {
    id: "fl_02",
    flightNumber: "SQ-447",
    airline: "Singapore Airlines",
    from: "Dhaka (DAC)",
    to: "Singapore (SIN)",
    departureTime: "11:55 PM",
    arrivalTime: "06:05 AM (+1)",
    duration: "4h 10m (Direct)",
    aircraft: "Airbus A350-900",
    prices: { economy: 340, business: 780, firstSuite: 1450 },
    baggage: "Economy: 30kg • Business: 40kg • First: 50kg",
    inclusions: ["KrisWorld In-Flight Entertainment", "SilverKris VIP Lounge Access", "Artisan Wine Selection", "Direct Changi Fast-Track"]
  },
  {
    id: "fl_03",
    flightNumber: "QR-641",
    airline: "Qatar Airways",
    from: "Dhaka (DAC)",
    to: "London Heathrow (LHR)",
    departureTime: "04:30 AM",
    arrivalTime: "01:15 PM",
    duration: "10h 45m (1-Stop Doha)",
    aircraft: "Airbus A380 / Qsuite A350",
    prices: { economy: 620, business: 1250, firstSuite: 2400 },
    baggage: "Economy: 35kg • Business: 45kg • First: 55kg",
    inclusions: ["Award-Winning Qsuite Private Cabin", "Al Mourjan Business Lounge", "Diptyque Luxury Amenity Kit", "Fine Dining on Demand"]
  },
  {
    id: "fl_04",
    flightNumber: "TG-322",
    airline: "Thai Airways",
    from: "Dhaka (DAC)",
    to: "Bangkok Suvarnabhumi (BKK)",
    departureTime: "01:30 PM",
    arrivalTime: "05:00 PM",
    duration: "2h 30m (Non-stop)",
    aircraft: "Boeing 787 Dreamliner",
    prices: { economy: 240, business: 520, firstSuite: 950 },
    baggage: "Economy: 30kg • Business: 40kg",
    inclusions: ["Royal Silk Class Comfort", "Thai Culinary Masterpieces", "Suvarnabhumi Royal Orchid Spa Access"]
  },
  {
    id: "fl_05",
    flightNumber: "BG-401",
    airline: "Biman Bangladesh / US-Bangla",
    from: "Dhaka (DAC)",
    to: "Cox's Bazar (CXB)",
    departureTime: "09:00 AM",
    arrivalTime: "10:00 AM",
    duration: "1h 00m (Domestic Express)",
    aircraft: "ATR 72-600 / Boeing 737",
    prices: { economy: 65, business: 120, firstSuite: 180 },
    baggage: "Economy: 20kg • Business: 30kg",
    inclusions: ["Express Beach Shuttle", "Grand Aurelia Resort Beachfront Transfer", "Priority Check-in"]
  },
  {
    id: "fl_06",
    flightNumber: "GA-JET99",
    airline: "Grand Aurelia Private Jet Aviation",
    from: "Custom Origin (Worldwide)",
    to: "Custom Destination (Worldwide)",
    departureTime: "On-Demand (Your Schedule)",
    arrivalTime: "Private Terminal VIP Arrival",
    duration: "Custom Non-Stop Route",
    aircraft: "Gulfstream G650ER (14 VIP Passengers)",
    prices: { economy: 0, business: 0, firstSuite: 8500 },
    baggage: "Unlimited VIP Luggage Capacity",
    inclusions: ["Dedicated In-Flight Chef & Butler", "Champagne Dom Pérignon Service", "Direct Tarmac Limousine Access", "Custom In-Flight Bedroom"]
  }
];

export const CLIENT_KNOWLEDGE_TOPICS = [
  {
    id: 'flights',
    icon: 'Plane',
    title: 'Airlines & Flight Ticket Booking',
    badge: 'Aviation',
    keywords: ['flight', 'flights', 'airline', 'ticket', 'airport', 'dubai', 'london', 'singapore', 'bangkok', 'jet', 'flug', 'flüge', 'buchen', 'vol', 'billet', 'vuelo', 'طيران', 'رحلة', 'تذكرة', 'বিমান', 'ফ্লাইট', 'টিকেট'],
    summary: 'Instant flight bookings (Emirates, Singapore Airlines, Qatar), seat reservations & digital boarding passes.'
  },
  {
    id: 'overview',
    icon: 'Sparkles',
    title: 'Platform Overview & Architecture',
    badge: 'Core System',
    keywords: ['about', 'project', 'grand aurelia', 'what is', 'features', 'hotel', 'resort', 'system', 'কী', 'সম্পর্কে', 'প্রজেক্ট'],
    summary: 'Full-stack enterprise hospitality, fine dining POS, KDS, food delivery & billing ledger platform.'
  },
  {
    id: 'rooms',
    icon: 'Building2',
    title: 'Luxury Suites & Accommodations',
    badge: '6 Suites',
    keywords: ['room', 'suite', 'suites', 'book', 'stay', 'price', 'pricing', 'ocean', 'penthouse', 'villa', 'zimmer', 'chambre', 'habitacion', 'غرفة', 'جناح', 'রুম', 'সুইট', 'ভাড়া', 'বুক'],
    summary: '6 luxury suites ($180-$450/night) with instant front desk check-in, VIP add-ons, and turnover tracking.'
  },
  {
    id: 'chauffeur_yacht',
    icon: 'Car',
    title: 'Luxury Chauffeur & Yacht Charter',
    badge: 'VIP Travel',
    keywords: ['car', 'chauffeur', 'limousine', 'yacht', 'cruise', 'maybach', 'rolls royce', 'auto', 'fahrdienst', 'yate', 'سيارة', 'يخت', 'গাড়ি', 'লিমোজিন', 'ইয়ট'],
    summary: 'Rolls-Royce Phantom ($150/hr), Maybach ($95/hr) & 65ft Aurelia Azure private yacht ($250/hr).'
  },
  {
    id: 'spa_wellness',
    icon: 'HeartHandshake',
    title: 'Royal Spa & Thalassotherapy',
    badge: 'Wellness',
    keywords: ['spa', 'massage', 'wellness', 'sauna', 'facial', 'hammam', 'سبا', 'تدليك', 'স্পা', 'ম্যাসাজ', 'ওয়েলনেস'],
    summary: 'Royal Moroccan Hammam ($120), Himalayan Salt Stone Massage ($95), 24K Gold Facial ($140).'
  },
  {
    id: 'dining_menu',
    icon: 'Utensils',
    title: 'Gourmet Food & Chef Specials',
    badge: 'Fine Dining',
    keywords: ['food', 'menu', 'eat', 'dining', 'chef', 'steak', 'wagyu', 'salmon', 'dessert', 'lava cake', 'speisekarte', 'essen', 'طعام', 'قائمة', 'খাবার', 'মেনু', 'স্টেক'],
    summary: 'Michelin-grade dining: Wagyu Ribeye ($42), Atlantic Salmon ($34), Truffle Pasta ($26), Lava Cake ($14).'
  },
  {
    id: 'tables',
    icon: 'Users',
    title: 'Table Reservations & Restaurant POS',
    badge: '8 Tables',
    keywords: ['table', 'reserve', 'reservation', 'terrace', 'lounge', 'tisch', 'mesa', 'طاولة', 'টেবিল', 'রিজার্ভেশন'],
    summary: '8 dedicated dining tables across Indoor Grand Hall, Terrace Garden & VIP Private Lounge.'
  },
  {
    id: 'invoices_billing',
    icon: 'Receipt',
    title: 'Billing, Invoices & Payment Gateways',
    badge: 'Finance',
    keywords: ['bill', 'invoice', 'payment', 'vat', 'tax', 'bkash', 'nagad', 'card', 'rechnung', 'facture', 'فاتورة', 'বিল', 'ইনভয়েস', 'পেমেন্ট', 'বিকাশ', 'নগদ'],
    summary: '10% VAT tax folios, downloadable receipts, bKash, Nagad, Visa, Mastercard, and Cash settlement.'
  }
];

export const FREQUENT_QUESTIONS = [
  { label: '✈️ Book Flight Ticket to Dubai / London / Singapore', query: 'Show available flights and ticket booking to Dubai, Singapore, and London' },
  { label: '🚗 Reserve Rolls-Royce or 65ft Private Yacht', query: 'How can I book a Rolls-Royce Chauffeur or 65ft Private Yacht?' },
  { label: '💆 Book Royal Moroccan Spa & Massage', query: 'What spa and wellness treatments are available?' },
  { label: '🏨 Show available luxury suites & prices', query: 'Show available luxury suites and prices' },
  { label: '🥩 What are the Chef Special dishes & menu?', query: 'What are the chef specials and best food recommendations?' },
  { label: '🪑 How to reserve a table at Terrace Garden?', query: 'How can I reserve a dining table at the Terrace Garden?' },
  { label: '💳 Which payment methods and folios are supported?', query: 'What payment methods, taxes, and mobile banking are accepted?' }
];

// Offline client-side query matcher with 100% English responses
export function queryClientKnowledge(query, { rooms = [], menuItems = [], tables = [], orders = [] }) {
  const q = (query || '').toLowerCase().trim();

  const availableRooms = rooms.filter(r => r.status === 'Available');
  const availableTables = tables.filter(t => t.status === 'Available');

  // Flight Queries
  if (q.includes('flight') || q.includes('airline') || q.includes('ticket') || q.includes('flug') || q.includes('flüge') || q.includes('vol') || q.includes('billet') || q.includes('vuelo') || q.includes('طيران') || q.includes('رحلة') || q.includes('تذكرة') || q.includes('বিমান') || q.includes('ফ্লাইট') || q.includes('টিকেট') || q.includes('dubai') || q.includes('london') || q.includes('singapore') || q.includes('bangkok')) {
    const text = `✈️ **Grand Aurelia VIP Airline & Flight Concierge**:
We provide instant flight ticket bookings and digital boarding passes with world-class airlines:
1. **Dhaka ⇄ Dubai (Emirates EK-583)**: Economy **$380** | Business **$850** | First Suite **$1,650**
2. **Dhaka ⇄ Singapore (Singapore Airlines SQ-447)**: Economy **$340** | Business **$780**
3. **Dhaka ⇄ London (Qatar Airways QR-641 Qsuite)**: Economy **$620** | Qsuite Business **$1,250**
4. **Dhaka ⇄ Bangkok (Thai Airways TG-322)**: Economy **$240** | Business **$520**
5. **Dhaka ⇄ Cox's Bazar (BG-401)**: Economy **$65** | Business **$120**
6. **Private Jet Gulfstream G650ER**: **$8,500/trip** (Worldwide on-demand with private chef & limousine).

*Click the **"Book Flight & Issue Boarding Pass"** button on any card below to reserve seats and generate your instant e-Ticket!*`;

    return {
      reply: text,
      recommendations: FLIGHT_SCHEDULES.slice(0, 3).map(f => ({
        id: f.id,
        title: `${f.airline} (${f.flightNumber})`,
        subtitle: `${f.from} ➔ ${f.to} • ${f.duration}`,
        price: f.prices.economy,
        businessPrice: f.prices.business,
        firstPrice: f.prices.firstSuite,
        departure: f.departureTime,
        arrival: f.arrivalTime,
        aircraft: f.aircraft,
        action: 'BOOK_FLIGHT',
        target: 'flight-modal',
        flightData: f
      })),
      suggestedAction: { target: 'flight-modal', label: 'Book Flight Ticket & Boarding Pass' }
    };
  }

  // Chauffeur & Yacht
  if (q.includes('car') || q.includes('chauffeur') || q.includes('limousine') || q.includes('yacht') || q.includes('maybach') || q.includes('rolls royce') || q.includes('auto') || q.includes('yate') || q.includes('سيارة') || q.includes('يخت') || q.includes('গাড়ি') || q.includes('লিমোজিন') || q.includes('ইয়ট')) {
    const text = `🚗 **Luxury Chauffeur Fleet & Private Yacht Charter**:
- **Rolls-Royce Phantom VIII**: $150/hr (Chauffeured VIP escort, starlight headliner, champagne bar).
- **Mercedes-Maybach S-Class**: $95/hr (Airport transfers, executive rear seating).
- **Aurelia Azure 65ft Private Yacht**: $250/hr (Sunset cruise, onboard private chef, caviar & champagne).`;

    return {
      reply: text,
      suggestedAction: { target: 'hotel', label: 'Reserve Chauffeur / Yacht' }
    };
  }

  // Spa
  if (q.includes('spa') || q.includes('massage') || q.includes('wellness') || q.includes('sauna') || q.includes('تدليك') || q.includes('سبا') || q.includes('স্পা') || q.includes('ম্যাসাজ')) {
    const text = `💆 **Grand Aurelia Royal Thalassotherapy Spa**:
- **Royal Moroccan Hammam ($120)**: 90 min eucalyptus steam & argan oil rub.
- **Himalayan Hot Salt Stone Massage ($95)**: 60 min deep muscle relaxation therapy.
- **24K Gold Luxury Facial ($140)**: Anti-aging lifting therapy with pure 24K gold leaf.`;

    return {
      reply: text,
      suggestedAction: { target: 'hotel', label: 'Book Spa Treatment' }
    };
  }

  // Room queries
  if (q.includes('room') || q.includes('suite') || q.includes('stay') || q.includes('book') || q.includes('zimmer') || q.includes('chambre') || q.includes('habitacion') || q.includes('غرفة') || q.includes('جناح') || q.includes('রুম') || q.includes('সুইট')) {
    const text = `🏨 **Grand Aurelia Luxury Suites**: Currently **${availableRooms.length} of ${rooms.length} suites are Available** for booking.
- **Deluxe Ocean Suite ($180/night)**: Panoramic sea view, private balcony, King bed, Jacuzzi.
- **Executive Business Suite ($220/night)**: Workstation desk, ergonomic chair, sofa bed.
- **Presidential Penthouse ($450/night)**: Private heated Jacuzzi, dedicated 24/7 butler service.`;

    return {
      reply: text,
      recommendations: availableRooms.slice(0, 2).map(r => ({
        title: `${r.type} (Suite ${r.number})`,
        subtitle: `$${r.pricePerNight}/night • ${r.bedType}`,
        image: r.image,
        action: 'VIEW_ROOM',
        target: 'hotel'
      })),
      suggestedAction: { target: 'hotel', label: 'Go to Luxury Suites' }
    };
  }

  // Food / Dining queries
  if (q.includes('food') || q.includes('menu') || q.includes('eat') || q.includes('steak') || q.includes('chef') || q.includes('speisekarte') || q.includes('essen') || q.includes('طعام') || q.includes('قائمة') || q.includes('খাবার') || q.includes('মেনু') || q.includes('স্টেক')) {
    const text = `🍽️ **Fine Dining & Chef Signature Highlights**:
- **Prime Wagyu Ribeye Steak ($42.00)**: Grade A5 Wagyu (300g), Truffle Butter, Roasted Asparagus (Halal, Gluten-Free).
- **Pan-Seared Atlantic Salmon ($34.00)**: Wild-caught Salmon, Lemon-Dill Cream, Saffron Scented Risotto.
- **Molten Belgian Lava Cake ($14.00)**: Warm Valrhona Dark Chocolate with Bourbon Vanilla Gelato.`;

    return {
      reply: text,
      recommendations: menuItems.slice(0, 3).map(m => ({
        title: m.name,
        subtitle: `$${m.price.toFixed(2)} • ★ ${m.rating}`,
        image: m.image,
        action: 'ORDER_FOOD',
        target: 'delivery'
      })),
      suggestedAction: { target: 'delivery', label: 'Order Food Delivery' }
    };
  }

  // Tables
  if (q.includes('table') || q.includes('reserve') || q.includes('dining') || q.includes('টেবিল')) {
    const text = `🪑 **Grand Aurelia Dining Table Reservations**:
Currently **${availableTables.length} of ${tables.length} tables are Available**.
- **Indoor Grand Hall**: Tables T1-T4 (2 to 6 guests).
- **Terrace Garden**: Tables T5-T6 (Romantic outdoor ambience).
- **VIP Private Lounge**: Tables T7-T8 (Private sommelier & dedicated service).`;

    return {
      reply: text,
      suggestedAction: { target: 'restaurant', label: 'Reserve a Dining Table' }
    };
  }

  // Billing / Invoices
  if (q.includes('bill') || q.includes('invoice') || q.includes('payment') || q.includes('vat') || q.includes('tax') || q.includes('card') || q.includes('bkash') || q.includes('বিল') || q.includes('পেমেন্ট')) {
    const text = `💳 **Billing, Invoices & Payment Gateways**:
- Itemized room folios, dining receipts, flight reservations, and 10% hospitality VAT tax invoices.
- Supported Payment Methods: **Credit/Debit Card (Visa, Mastercard, Amex)**, **bKash & Nagad Mobile Banking**, **Front Desk Cash**, and **Corporate Folio Billing**.`;

    return {
      reply: text,
      suggestedAction: { target: 'invoices', label: 'View Invoices & Receipts' }
    };
  }

  // Default Overview (Always in English)
  const overviewText = `**Welcome to Grand Aurelia Enterprise Knowledge Base & 24/7 AI ChatBoot!**
I have complete knowledge of our luxury hospitality & global travel ecosystem:
- ✈️ **Airlines & Flight Ticket Booking**: Emirates, Singapore Airlines, Qatar Airways & Private Jets.
- 🏨 **Suites & Pricing**: Room rates ($180-$450), amenities & VIP add-ons.
- 🚗 **Chauffeur & Yacht Charter**: Rolls-Royce Phantom, Maybach & 65ft Azure Private Yacht.
- 💆 **Royal Spa & Wellness**: Moroccan Hammam, 24K Gold Facials & Hot Stone therapy.
- 🍽️ **Gourmet Food Menu**: Wagyu Steak, Atlantic Salmon, Truffle Pasta & Lava Cake.
- 🪑 **Table Reservations**: Grand Hall, Terrace Garden & VIP Lounge.
- 💳 **Billing & Invoices**: Itemized 10% VAT tax folios, bKash, Nagad, Visa/Mastercard.

*You can speak via Microphone in any language (Bengali, German, Arabic, etc.) and I will provide instant answers in English!*`;

  return {
    reply: overviewText,
    recommendations: [
      { title: 'Emirates Dubai Flight (EK-583)', subtitle: 'Economy $380 • Business $850 • First $1,650', action: 'BOOK_FLIGHT', target: 'flight-modal', flightData: FLIGHT_SCHEDULES[0] },
      { title: 'Deluxe Ocean Suite', subtitle: 'Sea View • $180/night', image: rooms[0]?.image, action: 'VIEW_ROOM', target: 'hotel' }
    ],
    suggestedAction: { target: 'overview', label: 'Explore GM Dashboard' }
  };
}
