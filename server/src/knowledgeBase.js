// =========================================================
// GRAND AURELIA ENTERPRISE HOSPITALITY & CONCIERGE KNOWLEDGE BASE
// Complete repository knowledge, flight booking, luxury chauffeur,
// yacht charter, spa, ballroom, tech stack, and bilingual NLP engine.
// =========================================================

export const PROJECT_OVERVIEW = {
  name: "Grand Aurelia Hotel & Resort",
  tagline: "Where Timeless Luxury Meets Culinary Artistry & Global Concierge",
  established: 1928,
  description: "Grand Aurelia is an enterprise-grade full-stack hospitality, fine dining, restaurant POS, Kitchen Display System (KDS), online gourmet delivery, airlines ticketing & VIP concierge, housekeeping, and financial ledger platform.",
  techStack: {
    frontend: "React 19, Vite, Vanilla CSS Design System, Lucide Icons, Canvas Confetti",
    backend: "Node.js, Express.js REST API, CORS, File-based JSON Database persistence",
    architecture: "Component-driven Single Page Application (SPA) with centralized role-based state management, optimistic UI updates, and real-time 12s polling synchronization"
  },
  roles: [
    { role: "ADMIN_GM", title: "General Manager (GM)", desc: "Full executive overview, revenue KPIs, ADR, RevPAR, real-time turnover and inventory monitoring." },
    { role: "FRONT_DESK", title: "Front Desk Concierge", desc: "Suite reservation, instant guest check-in/out, folio billing and room status management." },
    { role: "KITCHEN_CHEF", title: "Executive Kitchen Chef", desc: "Kitchen Display System (KDS), ticket lifecycle management (Cooking, Ready, Expediting)." },
    { role: "WAITER", title: "Fine Dining Waiter / Captain", desc: "Table POS management, dine-in ordering, guest seat assignment, bill settlement." },
    { role: "DELIVERY_RIDER", title: "Gourmet Express Delivery Rider", desc: "Live dispatch dashboard, simulated GPS transit, contactless delivery verification." },
    { role: "GUEST_CUSTOMER", title: "Guest / Patron", desc: "Online food ordering, luxury suite exploration, flight booking, table reservation, and concierge requests." }
  ]
};

// Comprehensive Global Flight Schedules & Airline Partners
export const FLIGHT_SCHEDULES = [
  {
    id: "fl_01",
    flightNumber: "EK-583",
    airline: "Emirates Airlines",
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
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
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
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
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
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
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
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
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
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
    airlineLogo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=120",
    from: "Custom Origin (Any International Airport)",
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

export const KNOWLEDGE_TOPICS = [
  {
    id: "flights",
    title: "Airlines & Flight Ticket Booking",
    keywords: ["flight", "flights", "airline", "airlines", "ticket", "tickets", "plane", "airport", "dubai", "london", "singapore", "bangkok", "cox's bazar", "jet", "private jet", "boarding", "বিমাব", "ফ্লাইট", "এয়ারলাইন্স", "টিকেট", "বিমান", "টিকিট", "দুবাই", "লন্ডন"],
    answerEn: `✈️ **Grand Aurelia VIP Aviation & Flight Concierge**:
We offer instant airline ticket booking, seat reservation, and private charter services with our global 5-star airline partners:

**Popular International & Domestic Routes**:
1. **Dhaka (DAC) ⇄ Dubai (DXB)** — Emirates Airlines (\`EK-583\`)
   - Economy: **$380** | Business Class: **$850** | First Class Suite: **$1,650**
2. **Dhaka (DAC) ⇄ Singapore (SIN)** — Singapore Airlines (\`SQ-447\`)
   - Economy: **$340** | Business Class: **$780** | First Suite: **$1,450**
3. **Dhaka (DAC) ⇄ London (LHR)** — Qatar Airways Qsuite (\`QR-641\`)
   - Economy: **$620** | Qsuite Business: **$1,250** | First Class: **$2,400**
4. **Dhaka (DAC) ⇄ Bangkok (BKK)** — Thai Airways (\`TG-322\`)
   - Economy: **$240** | Royal Silk Business: **$520**
5. **Dhaka (DAC) ⇄ Cox's Bazar (CXB)** — Domestic Express (\`BG-401\`)
   - Economy: **$65** | Business: **$120**
6. **Private Gulfstream G650ER Jet Charter** (\`GA-JET99\`) — **$8,500/trip** (Worldwide on-demand with private chef & tarmac limousine).

**VIP Concierge Inclusions**:
- Complimentary Mercedes-Benz airport transfer with Business/First tickets.
- Fast-track immigration & VIP airport lounge access.
- Instant digital e-Ticket and boarding pass issued directly in chat.`,
    answerBn: `✈️ **গ্র্যান্ড অরেলিয়া ভিআইপি এয়ারলাইন্স ও ফ্লাইট বুকিং কনসিয়ার্জ**:
আমরা বিশ্বের শীর্ষস্থানীয় ৫-স্টার এয়ারলাইন্সের মাধ্যমে সরাসরি বিমান টিকিট বুকিং ও প্রাইভেট জেট চার্টার সুবিধা প্রদান করি:

**জনপ্রিয় আন্তর্জাতিক ও অভ্যন্তরীণ রুটসমূহ**:
১. **ঢাকা (DAC) ⇄ দুবাই (DXB)** — এমিরেটস এয়ারলাইন্স (\`EK-583\`)
   - ইকোনমি: **$৩৮০** | বিজনেস ক্লাস: **$৮৫০** | ফার্স্ট ক্লাস সুইট: **$১,৬৫০**
২. **ঢাকা (DAC) ⇄ সিঙ্গাপুর (SIN)** — সিঙ্গাপুর এয়ারলাইন্স (\`SQ-447\`)
   - ইকোনমি: **$৩৪০** | বিজনেস ক্লাস: **$৭৮০** | ফার্স্ট সুইট: **$১,৪৫০**
৩. **ঢাকা (DAC) ⇄ লন্ডন হিথ্রো (LHR)** — কাতার এয়ারওয়েজ Qsuite (\`QR-641\`)
   - ইকোনমি: **$৬২০** | Qsuite বিজনেস: **$১,২৫০** | ফার্স্ট ক্লাস: **$২,৪০০**
৪. **ঢাকা (DAC) ⇄ ব্যাংকক (BKK)** — থাই এয়ারওয়েজ (\`TG-322\`)
   - ইকোনমি: **$২৪০** | রয়্যাল সিল্ক বিজনেস: **$৫২০**
৫. **ঢাকা (DAC) ⇄ কক্সবাজার (CXB)** — ডোমেস্টিক এক্সপ্রেস (\`BG-401\`)
   - ইকোনমি: **$৬৫** | বিজনেস: **$১২০**
৬. **প্রাইভেট গাল্ফস্ট্রিম G650ER জেট চার্টার** (\`GA-JET99\`) — **$৮,৫০০/ফ্লাইট** (ব্যক্তিগত শেফ ও টারম্যাক লিমোজিন সহ)।

**ভিআইপি সুবিধাসমূহ**:
- বিজনেস ও ফার্স্ট ক্লাসে ফ্রি মার্সিডিজ এয়ারপোর্ট পিকআপ।
- ফাস্ট-ট্র্যাক ইমিগ্রেশন ও ভিআইপি লাউঞ্জ এক্সেস।
- চ্যাটবট থেকেই ডিজিটাল ই-টিকেট ও বোর্ডিং পাস সংগ্রহ করা যায়।`
  },
  {
    id: "chauffeur_yacht",
    title: "Luxury Chauffeur & Yacht Charter",
    keywords: ["car", "cars", "chauffeur", "limousine", "yacht", "boat", "cruise", "maybach", "rolls royce", "ড্রাইভ", "গাড়ি", "কার", "লিমোজিন", "ইয়ট", "বোট", "ক্রুজ"],
    answerEn: `🚗 **Luxury Chauffeur & Private Fleet**:
- **Rolls-Royce Phantom VIII**: $150/hour (Chauffeured VIP city escort, leather interior, Starlight headliner).
- **Mercedes-Maybach S-Class**: $95/hour (Executive airport transfer, champagne cooler).
- **Range Rover Autobiography**: $80/hour (Spacious luxury SUV for family & coastal travel).

⛵ **Aurelia Azure 65ft Private Yacht Charter**:
- **Sunset Champagne Cruise**: $250/hour (Includes onboard caviar, live acoustic violin, and champagne).
- **Full-Day Private Island Charter**: $1,400/day (Captain, private chef, jet ski, and snorkeling gear included).`,
    answerBn: `🚗 **লাক্সারি কার ও লিমোজিন সার্ভিস**:
- **রোলস-রয়েস ফ্যান্টম (Rolls-Royce Phantom)**: $১৫০/ঘণ্টা (ভিআইপি প্রটোকল ও পার্সোনাল ড্রাইভার)।
- **মার্সিডিজ-মেবাখ (Mercedes-Maybach S-Class)**: $৯৫/ঘণ্টা (এয়ারপোর্ট ট্রান্সফার ও ভিআইপি জার্নি)।
- **রেঞ্জ রোভার অটোবায়োগ্রাফি**: $৮০/ঘণ্টা (লাক্সারি ফ্যামিলি এসইউভি)।

⛵ **অরেলিয়া অ্যাজুর ৬৫ ফুট প্রাইভেট লাক্সারি ইয়ট**:
- **সানসেট শ্যাম্পেন ক্রুজ**: $২৫০/ঘণ্টা (প্রাইভেট শেফ, শ্যাম্পেন ও লাইভ মিউজিক)।
- **ফুল-ডে আইল্যান্ড চার্টার**: $১,৪০০/দিন (জেট স্কি, ক্যাভিয়ার ও স্নরকেলিং গিয়ার সহ)।`
  },
  {
    id: "spa_wellness",
    title: "Royal Spa & Thalassotherapy",
    keywords: ["spa", "massage", "wellness", "sauna", "facial", "hammam", "স্পা", "ম্যাসাজ", "ওয়েলনেস", "সোনা"],
    answerEn: `💆 **Grand Aurelia Imperial Thalassotherapy & Spa**:
- **Royal Moroccan Hammam & Body Polish ($120)** — 90 min black soap cleanse, eucalyptus steam & argan oil rub.
- **Himalayan Hot Salt Stone Massage ($95)** — 60 min deep muscle relaxation with mineral-rich hot stones.
- **24K Gold Luxury Facial Treatment ($140)** — Anti-aging lifting therapy using pure 24K gold leaf and hyaluronic serum.
- **Hydrotherapy Thermal Mineral Pool Pass ($30/day)** — Unlimited vitality pool, herbal sauna & sensory rain showers.`,
    answerBn: `💆 **গ্র্যান্ড অরেলিয়া ইম্পেরিয়াল স্পা ও ওয়েলনেস**:
- **রয়্যাল মরোক্কান হাম্মাম ($১২০)** — ৯০ মিনিটের ইউক্যালিপটাস স্টিম ও আর্গান অয়েল বডি পলিশ।
- **হিমালয়ান হট স্টোন ম্যাসাজ ($৯৫)** — ৬০ মিনিটের ডিপ রিলাক্সেশন ম্যাসাজ।
- **২৪ ক্যারেট গোল্ড ফেসিয়াল ($১৪০)** — পিওর গোল্ড সিরাম ও অ্যান্টি-এজিং স্কিন ট্রিটমেন্ট।
- **হাইড্রোথেরাপি থার্মাল পুল পাস ($৩০/দিন)** — স্টিম বাথ ও ভেষজ শাওয়ার।`
  },
  {
    id: "events_banquet",
    title: "Banquet Halls & Event Booking",
    keywords: ["event", "banquet", "hall", "wedding", "ballroom", "conference", "party", "meeting", "অনুষ্ঠান", "হল", "বিয়ে", "কনফারেন্স", "পার্টি"],
    answerEn: `🎟️ **Grand Aurelia Ballrooms & Event Venues**:
- **The Royal Aurelia Grand Ballroom** ($3,500/day) — Capacity up to 500 guests, Swarovski chandeliers, 8K LED stage, banquet catering.
- **Crystal Executive Boardroom** ($650/day) — 20 VIP seats, high-security video conferencing, private dining.
- **Terrace Garden Sunset Pavilion** ($1,800/evening) — Al-fresco open-air wedding and cocktail reception venue by the fountain.`,
    answerBn: `🎟️ **গ্র্যান্ড অরেলিয়া ব্যাংকুয়েট হল ও ইভেন্ট ভেন্যু**:
- **রয়্যাল অরেলিয়া গ্র্যান্ড বলরুম** ($৩,৫০০/দিন) — ৫০০ জন ধারণক্ষমতা, ক্রিস্টাল ঝাড়বাতি ও 8K এলইডি স্টেজ।
- **ক্রিস্টাল এক্সিকিউটিভ বোর্ডরুম** ($৬৫০/দিন) — ২০ জনের হাই-টেক কনফারেন্স রুম।
- **টেরেস গার্ডেন প্যাভিলিয়ন** ($১,৮০০/সন্ধ্যা) — খোলা আকাশের নিচে বিয়ে ও কর্পোরেট পার্টির জন্য উন্মুক্ত ভেন্যু।`
  },
  {
    id: "loyalty_club",
    title: "Aurelia Elite Loyalty Club",
    keywords: ["loyalty", "club", "points", "rewards", "member", "membership", "elite", "gold", "রিওয়ার্ড", "পয়েন্ট", "মেম্বারশিপ"],
    answerEn: `🎁 **Aurelia Elite Club Rewards**:
- **Silver Tier**: 5% cashback in Aurelia Points on all suites and dining.
- **Gold Tier**: 10% points, complimentary room upgrade upon availability, 2 PM late checkout.
- **Platinum / VIP Tier**: 15% points, free airport limousine, dedicated 24/7 personal butler, and complimentary breakfast.`,
    answerBn: `🎁 **অরেলিয়া এলিট ক্লাব মেম্বারশিপ রিওয়ার্ডস**:
- **সিলভার মেম্বার**: সকল রুম ও খাবারে ৫% ক্যাশব্যাক পয়েন্ট।
- **গোল্ড মেম্বার**: ১০% পয়েন্ট, ফ্রি রুম আপগ্রেড ও ২টা পর্যন্ত লেট চেক-আউট।
- **প্লাটিনাম ভিআইপি**: ১৫% পয়েন্ট, ফ্রি এয়ারপোর্ট লিমোজিন ও ডেডিকেটেড পার্সোনাল বাটলার।`
  },
  {
    id: "overview",
    title: "Project Overview & Architecture",
    keywords: ["project", "grand aurelia", "about", "what is", "features", "overview", "system", "architecture", "কী", "সম্পর্কে", "প্রজেক্ট", "গ্র্যান্ড অরেলিয়া"],
    answerEn: `**Grand Aurelia** is an all-in-one Luxury Hospitality & Restaurant Enterprise Platform established with 8 interconnected operational modules:
1. **Luxury Suites & Front Desk**: Real-time suite booking, instant front-desk check-in, housekeeping turnover & room servicing.
2. **Fine Dining & Table POS**: Interactive floor plan (8 tables across Grand Hall, Terrace Garden & VIP Lounge), waiter POS order entry, and table reservations.
3. **Kitchen Display System (KDS)**: Live chef workstation tracking orders from New -> In Preparation -> Ready for Dispatch.
4. **Gourmet Express Food Delivery**: Full-featured e-commerce food cart, delivery zones, order tracking, and rider dispatch.
5. **Airlines & VIP Travel Concierge**: Global flight bookings (Emirates, Singapore Airlines, Qatar), boarding pass simulator, and private jet charter.
6. **Housekeeping & Maintenance**: Automated post-checkout turnover tasks, priority scheduling, and sanitization tracking.
7. **Inventory & Stock Registry**: Real-time ingredient & luxury supply tracking, reorder alert thresholds, and 1-click restock.
8. **Invoices & Financial Ledger**: Automated 10% hospitality VAT calculation, printable digital folios, payment tracking (bKash, Nagad, Visa, Mastercard, Cash).`,
    answerBn: `**গ্র্যান্ড অরেলিয়া (Grand Aurelia)** একটি আন্তর্জাতিক মানের লাক্সারি হোটেল, ফাইন ডাইনিং রেস্তোরাঁ, কিচেন ডিসপ্লে সিস্টেম (KDS), ফুড ডেলিভারি, এয়ারলাইন্স টিকেট বুকিং এবং ফাইন্যান্সিয়াল প্ল্যাটফর্ম।`
  },
  {
    id: "rooms",
    title: "Luxury Suites & Accommodation",
    keywords: ["room", "suite", "suites", "book", "stay", "pricing", "cost", "hotel", "floor", "bed", "ocean", "penthouse", "রুম", "সুইট", "ভাড়া", "বুক", "থাকতে", "হোটেল"],
    answerEn: `Grand Aurelia features luxury handcrafted suites across multiple tiers:
- **Suite 101: Deluxe Ocean Suite** ($180/night) — 1 King Bed, 2 Guests, 48 m², Panoramic Sea View, Private Balcony, King Jacuzzi.
- **Suite 102: Executive Business Suite** ($220/night) — 1 King + 1 Sofa Bed, 3 Guests, 56 m², High-Speed Wi-Fi, Ergonomic Workstation Desk.
- **Suite 201: Presidential Penthouse** ($450/night) — 2 King Beds, 4 Guests, 110 m², Private Heated Jacuzzi, Dedicated 24/7 Butler Service, Dining Salon.
- **Suite 202: Royal Garden Villa** ($320/night) — 1 King Bed, 2 Guests, 65 m², Private Plunge Pool, Garden Patio.
- **Suite 301: Sunset Panoramic Suite** ($280/night) — 1 King Bed, 2 Guests, 52 m², High Floor Sunset View, Wine Chiller.
- **Suite 302: Grand Heritage Suite** ($380/night) — 2 Queen Beds, 4 Guests, 85 m², Artisan Woodwork, Fireplace.`,
    answerBn: `গ্র্যান্ড অরেলিয়ার লাক্সারি সুইটসমূহের তালিকা ও ভাড়া:
- **সুইট ১০১: ডিলাক্স ওশান সুইট** ($১৮০ / রাত) — সমুদ্র দৃশ্য, ব্যালকনি ও জাকুজি।
- **সুইট ১০২: এক্সিকিউটিভ বিজনেস সুইট** ($২২০ / রাত) — ওয়ার্কস্টেশন ডেস্ক ও হাই-স্পিড ওয়াইফাই।
- **সুইট ২০১: প্রেসিডেন্সিয়াল পেন্টহাউস** ($৪৫০ / রাত) — প্রাইভেট জাকুজি ও বাটলার সার্ভিস।
- **সুইট ২০২: রয়্যাল গার্ডেন ভিলা** ($৩২০ / রাত) — প্রাইভেট পুল ও গার্ডেন টেরেস।`
  },
  {
    id: "dining_menu",
    title: "Fine Dining & Chef Specials",
    keywords: ["food", "menu", "eat", "dining", "chef", "steak", "wagyu", "salmon", "dessert", "drinks", "dinner", "breakfast", "খাবার", "মেনু", "রেস্তোরাঁ", "খেতে", "স্টেক", "ডিনার"],
    answerEn: `**Chef's Signature Highlights**:
1. **Prime Wagyu Ribeye Steak ($42.00)** — Grade A5 Wagyu (300g), Truffle Butter, Roasted Asparagus & Garlic Confit. (Halal, Gluten-Free).
2. **Pan-Seared Atlantic Salmon ($34.00)** — Wild-caught Salmon, Lemon-Dill Cream, Saffron Scented Risotto.
3. **Truffle Tagliatelle ($26.00)** — Fresh Egg Pasta, Shaved Black Winter Truffles, 24-Month Aged Parmesan.
4. **Molten Belgian Lava Cake ($14.00)** — Warm Valrhona Dark Chocolate with Bourbon Vanilla Gelato.`,
    answerBn: `**শেফের সেরা সিগনেচার ডিশসমূহ**:
1. **প্রাইম ওয়াগিউ রিবআই স্টেক ($৪২.০০)** — গ্রেড A5 ওয়াগিউ, ট্রাফেল বাটার ও অ্যাসপারাগাস (হালাল)।
2. **প্যান-সিয়ার্ড আটলান্টিক স্যামন ($৩৪.০০)** — স্যামন মাছ ও জাফরানি রিসোতো।
3. **ট্রাফেল ট্যাগলিয়াটেলে পাস্তা ($২৬.০০)** — ফ্রেশ পাস্তা ও ব্ল্যাক ট্রাফেল।
4. **মল্টেন বেলজিয়ান লাভা কেক ($১৪.০০)** — ভ্যানিলা জেলাতো আইসক্রিম সহ।`
  },
  {
    id: "invoices_billing",
    title: "Invoices, Billing & Payment Methods",
    keywords: ["bill", "invoice", "payment", "vat", "tax", "bkash", "nagad", "card", "money", "pay", "বিল", "ইনভয়েস", "পেমেন্ট", "টাকা", "ভ্যাট", "বিকাশ", "নগদ"],
    answerEn: `**Financial Folio & Billing**:
- Itemized room charges, flights, in-room dining, add-ons, and standard 10% hospitality VAT.
- Accepted payment channels: **Credit Card (Visa / Mastercard / Amex)**, **bKash & Nagad Mobile Banking**, **Cash at Front Desk**, and **Corporate Direct Billing**.`,
    answerBn: `**বিলিং ও পেমেন্ট ব্যবস্থা**:
- ১০% সরকারি ট্যাক্স/ভ্যাট সহ প্রিন্টেবল রিসিট পাওয়া যায়।
- গ্রহণযোগ্য পেমেন্ট: **ক্রেডিট/ডেবিট কার্ড (Visa, Mastercard)**, **বিকাশ (bKash)**, **নগদ (Nagad)**, এবং **ক্যাশ অন ফ্রন্ট ডেস্ক**।`
  }
];

// Helper to query knowledge base with live data augmentation (100% English responses)
export function queryKnowledgeBase(query, db = {}) {
  const q = (query || '').toLowerCase().trim();
  const rooms = db.rooms || [];
  const menuItems = db.menuItems || [];
  const tables = db.tables || [];
  const orders = db.orders || [];
  const inventory = db.inventory || [];
  const invoices = db.invoices || [];

  let matchedTopic = null;
  let highestScore = 0;

  for (const topic of KNOWLEDGE_TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (q.includes(kw)) score += 2;
    }
    if (score > highestScore) {
      highestScore = score;
      matchedTopic = topic;
    }
  }

  // Check for Flight specific queries
  if (q.includes('flight') || q.includes('airline') || q.includes('ticket') || q.includes('flug') || q.includes('flüge') || q.includes('vol') || q.includes('billet') || q.includes('vuelo') || q.includes('طيران') || q.includes('تذكرة') || q.includes('বিমান') || q.includes('ফ্লাইট') || q.includes('টিকেট') || q.includes('dubai') || q.includes('london') || q.includes('singapore') || q.includes('bangkok')) {
    const matchingFlights = FLIGHT_SCHEDULES.slice(0, 3);

    const flightCards = matchingFlights.map(f => ({
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
    }));

    const flightReply = `✈️ **Grand Aurelia VIP Airline & Flight Concierge**:
We provide instant flight ticket booking and digital boarding passes with top global airlines:
1. **Dhaka ⇄ Dubai (Emirates EK-583)**: Economy **$380** | Business **$850** | First Suite **$1,650**
2. **Dhaka ⇄ Singapore (Singapore Airlines SQ-447)**: Economy **$340** | Business **$780**
3. **Dhaka ⇄ London (Qatar Airways QR-641 Qsuite)**: Economy **$620** | Qsuite Business **$1,250**
4. **Dhaka ⇄ Bangkok (Thai Airways TG-322)**: Economy **$240** | Business **$520**
5. **Dhaka ⇄ Cox's Bazar (BG-401)**: Economy **$65** | Business **$120**
6. **Private Jet Gulfstream G650ER**: **$8,500/trip** (Worldwide on-demand with private chef & limousine).

*Click the **"Book Flight & Issue Boarding Pass"** button below to reserve seats and generate your instant e-Ticket & Boarding Pass!*`;

    return {
      reply: flightReply,
      recommendations: flightCards,
      suggestedAction: { target: 'flight-modal', label: 'Book Flight Ticket & Boarding Pass' },
      topicId: 'flights',
      flightSchedules: FLIGHT_SCHEDULES
    };
  }

  // Dynamic live stats
  const availableRooms = rooms.filter(r => r.status === 'Available');
  const availableTables = tables.filter(t => t.status === 'Available');

  if (matchedTopic) {
    const text = matchedTopic.answerEn;
    let recommendations = [];
    let suggestedAction = null;

    if (matchedTopic.id === 'rooms') {
      recommendations = rooms.slice(0, 2).map(r => ({
        title: `${r.type} (Suite ${r.number})`,
        subtitle: `$${r.pricePerNight}/night • ${r.bedType}`,
        image: r.image,
        action: 'VIEW_ROOM',
        target: 'hotel'
      }));
      suggestedAction = { target: 'hotel', label: 'Explore All Luxury Suites' };
    } else if (matchedTopic.id === 'dining_menu') {
      recommendations = menuItems.slice(0, 3).map(m => ({
        title: m.name,
        subtitle: `$${m.price.toFixed(2)} • ★ ${m.rating}`,
        image: m.image,
        action: 'ORDER_FOOD',
        target: 'delivery'
      }));
      suggestedAction = { target: 'delivery', label: 'Order Gourmet Food' };
    } else if (matchedTopic.id === 'chauffeur_yacht') {
      suggestedAction = { target: 'hotel', label: 'Reserve Chauffeur / Yacht' };
    } else if (matchedTopic.id === 'spa_wellness') {
      suggestedAction = { target: 'hotel', label: 'Book Luxury Spa Treatment' };
    } else if (matchedTopic.id === 'tables') {
      suggestedAction = { target: 'restaurant', label: 'Reserve Dining Table' };
    } else if (matchedTopic.id === 'invoices_billing') {
      suggestedAction = { target: 'invoices', label: 'View Invoices & Receipts' };
    }

    return {
      reply: text,
      recommendations,
      suggestedAction,
      topicId: matchedTopic.id
    };
  }

  // Default Fallback in 100% English
  const fallbackEn = `Welcome to **Grand Aurelia Enterprise AI ChatBoot & Global Concierge**!
I have complete knowledge of our luxury hospitality ecosystem:
• ✈️ **Airlines & Flight Booking**: Emirates, Singapore Airlines, Qatar Airways, Domestic & Private Jets.
• 🏨 **Luxury Suites & Pricing**: Room rates ($180-$450), amenities & VIP add-ons.
• 🚗 **Chauffeur & Yacht Charter**: Rolls-Royce Phantom, Maybach & 65ft Azure Private Yacht.
• 💆 **Royal Spa & Wellness**: Moroccan Hammam, 24K Gold Facials & Hot Stone therapy.
• 🍽️ **Gourmet Food & Menu**: Wagyu Steak, Atlantic Salmon, Pasta & Lava Cake.
• 🪑 **Table Reservations**: Grand Hall, Terrace Garden & VIP Lounge.
• 👨‍🍳 **Kitchen KDS & Delivery**: Live cooking flow & simulated GPS rider transit.
• 💳 **Billing & Invoices**: Itemized 10% VAT tax folios, bKash, Nagad, Visa/Mastercard.

*You can speak via Microphone in any language (Bengali, German, Arabic, etc.) and I will always provide answers in clear English!*`;

  return {
    reply: fallbackEn,
    recommendations: [
      { title: 'Emirates Dubai Flight (EK-583)', subtitle: 'Economy $380 • Business $850 • First $1,650', action: 'BOOK_FLIGHT', target: 'flight-modal', flightData: FLIGHT_SCHEDULES[0] },
      { title: 'Deluxe Ocean Suite', subtitle: 'Sea View • $180/night', image: rooms[0]?.image, action: 'VIEW_ROOM', target: 'hotel' }
    ],
    suggestedAction: { target: 'overview', label: 'Explore Platform Dashboard' }
  };
}
