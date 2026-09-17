// =========================================================
// GRAND AURELIA FRONTEND KNOWLEDGE BASE & FLIGHT BOOKING ENGINE
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
    keywords: ['flight', 'flights', 'airline', 'ticket', 'airport', 'dubai', 'london', 'singapore', 'jet', 'বিমান', 'ফ্লাইট', 'টিকেট'],
    summaryEn: 'Instant flight bookings (Emirates, Singapore Airlines, Qatar), seat reservations & boarding passes.',
    summaryBn: 'এমিরেটস, কাতার ও সিঙ্গাপুর এয়ারলাইন্সের ফ্লাইট টিকিট ও বোর্ডিং পাস বুকিং।'
  },
  {
    id: 'overview',
    icon: 'Sparkles',
    title: 'Platform Overview & Architecture',
    badge: 'Core System',
    keywords: ['about', 'project', 'grand aurelia', 'what is', 'features', 'কী', 'সম্পর্কে', 'প্রজেক্ট'],
    summaryEn: 'Full-stack enterprise hospitality, fine dining POS, KDS, food delivery & billing ledger platform.',
    summaryBn: 'লাক্সারি হোটেল, রেস্তোরাঁ POS, কিচেন KDS, ফুড ডেলিভারি ও বিলিং প্ল্যাটফর্ম।'
  },
  {
    id: 'rooms',
    icon: 'Building2',
    title: 'Luxury Suites & Accommodations',
    badge: '6 Suites',
    keywords: ['room', 'suite', 'suites', 'book', 'stay', 'price', 'pricing', 'ocean', 'penthouse', 'রুম', 'সুইট', 'ভাড়া', 'বুক'],
    summaryEn: '6 luxury suites ($180-$450/night) with instant front desk check-in, VIP add-ons, and turnover tracking.',
    summaryBn: '৬টি লাক্সারি সুইট ($১৮০-$৪৫০/রাত), ইনস্ট্যান্ট চেক-ইন ও ভিআইপি অ্যাড-অন।'
  },
  {
    id: 'chauffeur_yacht',
    icon: 'Car',
    title: 'Luxury Chauffeur & Yacht Charter',
    badge: 'VIP Travel',
    keywords: ['car', 'chauffeur', 'limousine', 'yacht', 'cruise', 'maybach', 'rolls royce', 'গাড়ি', 'লিমোজিন', 'ইয়ট'],
    summaryEn: 'Rolls-Royce Phantom ($150/hr), Maybach ($95/hr) & 65ft Aurelia Azure private yacht ($250/hr).',
    summaryBn: 'রোলস-রয়েস ও মেবাখ লিমোজিন এবং ৬৫ ফুট লাক্সারি প্রাইভেট ইয়ট চার্টার।'
  },
  {
    id: 'spa_wellness',
    icon: 'HeartHandshake',
    title: 'Royal Spa & Thalassotherapy',
    badge: 'Wellness',
    keywords: ['spa', 'massage', 'wellness', 'sauna', 'facial', 'স্পা', 'ম্যাসাজ', 'ওয়েলনেস'],
    summaryEn: 'Royal Moroccan Hammam ($120), Himalayan Salt Stone Massage ($95), 24K Gold Facial ($140).',
    summaryBn: 'মরোক্কান হাম্মাম, হট স্টোন ম্যাসাজ ও ২৪ ক্যারেট গোল্ড ফেসিয়াল ট্রিটমেন্ট।'
  },
  {
    id: 'dining_menu',
    icon: 'Utensils',
    title: 'Gourmet Food & Chef Specials',
    badge: 'Fine Dining',
    keywords: ['food', 'menu', 'eat', 'dining', 'chef', 'steak', 'wagyu', 'salmon', 'dessert', 'lava cake', 'খাবার', 'মেনু', 'স্টেক'],
    summaryEn: 'Michelin-grade dining: Wagyu Ribeye ($42), Atlantic Salmon ($34), Truffle Pasta ($26), Lava Cake ($14).',
    summaryBn: 'শেফ স্পেশাল ওয়াগিউ স্টেক ($৪২), স্যামন ($৩৪), পাস্তা ($২৬), লাভা কেক ($১৪)।'
  },
  {
    id: 'tables',
    icon: 'Users',
    title: 'Table Reservations & Restaurant POS',
    badge: '8 Tables',
    keywords: ['table', 'reserve', 'reservation', 'terrace', 'lounge', 'টেবিল', 'রিজার্ভেশন'],
    summaryEn: '8 dedicated dining tables across Indoor Grand Hall, Terrace Garden & VIP Private Lounge.',
    summaryBn: 'গ্র্যান্ড হল, টেরেস গার্ডেন ও ভিআইপি লাউঞ্জে মোট ৮টি ডাইনিং টেবিল।'
  },
  {
    id: 'kds_delivery',
    icon: 'Truck',
    title: 'Kitchen KDS & Gourmet Express Delivery',
    badge: 'Live Operations',
    keywords: ['kds', 'kitchen', 'chef', 'cook', 'delivery', 'rider', 'order', 'কিচেন', 'ডেলিভারি', 'রাইডার'],
    summaryEn: 'Live kitchen cooking stages (New -> Cooking -> Ready) & GPS rider dispatch tracking.',
    summaryBn: 'কিচেন অর্ডার লাইফসাইকেল ও লাইভ রাইডার ট্র্যাকিং সহ এক্সপ্রেস ডেলিভারি।'
  },
  {
    id: 'invoices_billing',
    icon: 'Receipt',
    title: 'Billing, Invoices & Payment Gateways',
    badge: 'Finance',
    keywords: ['bill', 'invoice', 'payment', 'vat', 'tax', 'bkash', 'nagad', 'card', 'বিল', 'ইনভয়েস', 'পেমেন্ট', 'বিকাশ', 'নগদ'],
    summaryEn: '10% VAT tax folios, downloadable receipts, bKash, Nagad, Visa, Mastercard, and Cash settlement.',
    summaryBn: '১০% ভ্যাট সহ ইনভয়েস তৈরি এবং বিকাশ, নগদ, কার্ড ও ক্যাশ পেমেন্ট ব্যবস্থা।'
  }
];

export const FREQUENT_QUESTIONS = [
  { label: '✈️ Book Flight Ticket to Dubai/London/Singapore', query: 'Show available flights and ticket booking to Dubai, Singapore, and London' },
  { label: '🚗 Reserve Rolls-Royce or Private Yacht', query: 'How can I book a Rolls-Royce Chauffeur or 65ft Private Yacht?' },
  { label: '💆 Book Royal Moroccan Spa & Massage', query: 'What spa and wellness treatments are available?' },
  { label: '🏨 Show available luxury suites & prices', query: 'Show available luxury suites and prices' },
  { label: '🥩 What are the Chef Special dishes?', query: 'What are the chef specials and best food recommendations?' },
  { label: '🪑 How to book a table at Terrace Garden?', query: 'How can I reserve a table at the Terrace Garden?' },
  { label: '💳 Which payment methods are accepted?', query: 'What payment methods and mobile banking are accepted?' },
  { label: '🇧🇩 বাংলায় বিমান টিকেট ও প্রজেক্টের ফিচার জানাও', query: 'গ্র্যান্ড অরেলিয়া প্রজেক্টে বিমান টিকিট বুকিং ও সকল ফিচার সম্পর্কে বাংলায় বিস্তারিত বলো' }
];

// Offline client-side query matcher with live state
export function queryClientKnowledge(query, { rooms = [], menuItems = [], tables = [], orders = [] }) {
  const q = (query || '').toLowerCase().trim();
  const isBengali = /[\u0980-\u09FF]/.test(q) || 
                    q.includes('kemon') || q.includes('koto') || q.includes('ki') || 
                    q.includes('hobe') || q.includes('kichu') || q.includes('bolo') || 
                    q.includes('janiye') || q.includes('parbo');

  // Flight Queries
  if (q.includes('flight') || q.includes('airline') || q.includes('ticket') || q.includes('বিমান') || q.includes('ফ্লাইট') || q.includes('টিকেট') || q.includes('dubai') || q.includes('london') || q.includes('singapore')) {
    const text = isBengali
      ? `✈️ **গ্র্যান্ড অরেলিয়া ভিআইপি এয়ারলাইন্স টিকিট ও বোর্ডিং পাস সার্ভিস**:
আমরা বিশ্বের শীর্ষস্থানীয় এয়ারলাইন্সের মাধ্যমে সরাসরি বিমান টিকিট বুকিং সুবিধা প্রদান করি:
1. **ঢাকা ⇄ দুবাই (Emirates EK-583)**: ইকোনমি **$৩৮০** | বিজনেস **$৮৫০** | ফার্স্ট সুইট **$১,৬৫০**
2. **ঢাকা ⇄ সিঙ্গাপুর (Singapore SQ-447)**: ইকোনমি **$৩৪০** | বিজনেস **$৭৮০**
3. **ঢাকা ⇄ লন্ডন (Qatar Airways QR-641 Qsuite)**: ইকোনমি **$৬২০** | বিজনেস **$১,২৫০**
4. **ঢাকা ⇄ ব্যাংকক (Thai Airways TG-322)**: ইকোনমি **$২৪০** | বিজনেস **$৫২০**
5. **ঢাকা ⇄ কক্সবাজার (BG-401)**: ইকোনমি **$৬৫** | বিজনেস **$১২০**
6. **প্রাইভেট জেট চার্টার (Gulfstream G650ER)**: **$৮,৫০০/ফ্লাইট** (অন-ডিমান্ড ভিআইপি)।

*নিচে প্রদর্শিত টিকেট কার্ড থেকে সরাসরি **"Book Ticket"** বাটনে চাপ দিয়ে ইনস্ট্যান্ট ই-টিকেট ও বোর্ডিং পাস বুক করতে পারেন!*`
      : `✈️ **Grand Aurelia VIP Airline & Flight Concierge**:
We provide instant flight ticket booking and digital boarding passes with top global airlines:
1. **Dhaka ⇄ Dubai (Emirates EK-583)**: Economy **$380** | Business **$850** | First Suite **$1,650**
2. **Dhaka ⇄ Singapore (Singapore Airlines SQ-447)**: Economy **$340** | Business **$780**
3. **Dhaka ⇄ London (Qatar Airways QR-641 Qsuite)**: Economy **$620** | Qsuite Business **$1,250**
4. **Dhaka ⇄ Bangkok (Thai Airways TG-322)**: Economy **$240** | Business **$520**
5. **Dhaka ⇄ Cox's Bazar (BG-401)**: Economy **$65** | Business **$120**
6. **Private Jet Gulfstream G650ER**: **$8,500/trip** (Worldwide on-demand with private chef & limousine).

*Click the **"Book Ticket"** button below to reserve seats and generate your instant e-Ticket & Boarding Pass!*`;

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
      suggestedAction: { target: 'flight-modal', label: isBengali ? 'ফ্লাইট টিকিট বুক ও পেমেন্ট' : 'Book Flight Ticket & Boarding Pass' }
    };
  }

  // Chauffeur & Yacht
  if (q.includes('car') || q.includes('chauffeur') || q.includes('limousine') || q.includes('yacht') || q.includes('maybach') || q.includes('rolls royce') || q.includes('গাড়ি') || q.includes('লিমোজিন') || q.includes('ইয়ট')) {
    const text = isBengali
      ? `🚗 **লাক্সারি কার ও প্রাইভেট ইয়ট চার্টার**:
- **রোলস-রয়েস ফ্যান্টম**: $১৫০/ঘণ্টা (ভিআইপি পার্সোনাল ড্রাইভার ও স্টারলাইট সিলিং)।
- **মার্সিডিজ-মেবাখ S-Class**: $৯৫/ঘণ্টা (এয়ারপোর্ট ট্রান্সফার ও শ্যাম্পেন কুলার)।
- **৬৫ ফুট অরেলিয়া অ্যাজুর ইয়ট**: $২৫০/ঘণ্টা (সানসেট শ্যাম্পেন ক্রুজ, প্রাইভেট শেফ ও ক্যাভিয়ার)।`
      : `🚗 **Luxury Chauffeur Fleet & Private Yacht Charter**:
- **Rolls-Royce Phantom VIII**: $150/hr (Chauffeured VIP escort, starlight headliner).
- **Mercedes-Maybach S-Class**: $95/hr (Airport transfers, executive rear seating).
- **Aurelia Azure 65ft Private Yacht**: $250/hr (Sunset champagne cruise, private chef, caviar).`;

    return {
      reply: text,
      suggestedAction: { target: 'hotel', label: isBengali ? 'লিমোজিন ও ইয়ট বুক করুন' : 'Reserve Chauffeur / Yacht' }
    };
  }

  // Spa
  if (q.includes('spa') || q.includes('massage') || q.includes('wellness') || q.includes('স্পা') || q.includes('ম্যাসাজ')) {
    const text = isBengali
      ? `💆 **গ্র্যান্ড অরেলিয়া রয়্যাল স্পা ও ওয়েলনেস**:
- **মরোক্কান হাম্মাম বডি পলিশ ($১২০)**: ৯০ মিনিটের ইউক্যালিপটাস স্টিম ও আর্গান অয়েল।
- **হিমালয়ান হট স্টোন ম্যাসাজ ($৯৫)**: ৬০ মিনিটের ডিপ মাসল রিলাক্সেশন।
- **২৪ ক্যারেট গোল্ড ফেসিয়াল ($১৪০)**: পিওর গোল্ড লিফ ও অ্যান্টি-এজিং থেরাপি।`
      : `💆 **Grand Aurelia Royal Thalassotherapy Spa**:
- **Royal Moroccan Hammam ($120)**: 90 min eucalyptus steam & argan oil rub.
- **Himalayan Hot Salt Stone Massage ($95)**: 60 min deep muscle relaxation.
- **24K Gold Luxury Facial ($140)**: Anti-aging lifting therapy with 24K gold leaf.`;

    return {
      reply: text,
      suggestedAction: { target: 'hotel', label: isBengali ? 'স্পা সার্ভিস বুক করুন' : 'Book Spa Treatment' }
    };
  }

  const availableRooms = rooms.filter(r => r.status === 'Available');
  const availableTables = tables.filter(t => t.status === 'Available');

  // Room queries
  if (q.includes('room') || q.includes('suite') || q.includes('stay') || q.includes('book') || q.includes('রুম') || q.includes('সুইট')) {
    const text = isBengali
      ? `🏨 **গ্র্যান্ড অরেলিয়া লাক্সারি সুইটস**: বর্তমানে **${availableRooms.length}টি রুম খালি (Available)** আছে।
- **ডিলাক্স ওশান সুইট ($১৮০/রাত)**: সমুদ্রের মনোরম দৃশ্য, ব্যালকনি ও জাকুজি।
- **এক্সিকিউটিভ বিজনেস সুইট ($২২০/রাত)**: ৩ জনের ক্যাপাসিটি, হাই-স্পিড ওয়াইফাই ও ওয়ার্কস্টেশন ডেস্ক।
- **প্রেসিডেন্সিয়াল পেন্টহাউস ($৪৫০/রাত)**: ৪ জনের ক্যাপাসিটি, প্রাইভেট জাকুজি ও ২৪/৭ বাটলার সার্ভিস।`
      : `🏨 **Grand Aurelia Luxury Suites**: Currently **${availableRooms.length} of ${rooms.length} suites are Available** for booking.
- **Deluxe Ocean Suite ($180/night)**: Panoramic sea view, balcony, King bed, Jacuzzi.
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
      suggestedAction: { target: 'hotel', label: isBengali ? 'লাক্সারি সুইট সেকশনে যান' : 'Go to Luxury Suites' }
    };
  }

  // Food / Dining queries
  if (q.includes('food') || q.includes('menu') || q.includes('eat') || q.includes('steak') || q.includes('chef') || q.includes('খাবার') || q.includes('মেনু') || q.includes('স্টেক')) {
    const text = isBengali
      ? `🍽️ **ফাইন ডাইনিং ও শেফ স্পেশাল মেনু**:
- **প্রাইম ওয়াগিউ রিবআই স্টেক ($৪২.০০)**: গ্রেড A5 ওয়াগিউ (৩০০ গ্রাম), ট্রাফেল বাটার ও রোস্টেড অ্যাসপারাগাস।
- **প্যান-সিয়ার্ড আটলান্টিক স্যামন ($৩৪.০০)**: স্যামন মাছ, লেমন-ডিল ক্রিম ও রিসোতো।
- **মল্টেন বেলজিয়ান লাভা কেক ($১৪.০০)**: ভ্যালরোনা ডার্ক চকলেট ও ভ্যানিলা আইসক্রিম।`
      : `🍽️ **Fine Dining & Chef Signature Highlights**:
- **Prime Wagyu Ribeye Steak ($42.00)**: Grade A5 Wagyu, Truffle Butter, Roasted Asparagus (Halal, Gluten-Free).
- **Pan-Seared Atlantic Salmon ($34.00)**: Lemon-dill cream, saffron scented risotto.
- **Molten Belgian Lava Cake ($14.00)**: Warm Valrhona dark chocolate with bourbon vanilla gelato.`;

    return {
      reply: text,
      recommendations: menuItems.slice(0, 3).map(m => ({
        title: m.name,
        subtitle: `$${m.price.toFixed(2)} • ★ ${m.rating}`,
        image: m.image,
        action: 'ORDER_FOOD',
        target: 'delivery'
      })),
      suggestedAction: { target: 'delivery', label: isBengali ? 'ফুড অর্ডার করুন' : 'Order Food Delivery' }
    };
  }

  // Default Overview
  const text = isBengali
    ? `**গ্র্যান্ড অরেলিয়া এন্টারপ্রাইজ নলেজ বেজ ও AI ChatBoot-এ স্বাগতম!**
আমি এই প্ল্যাটফর্মের সকল বিষয়ে সার্বক্ষণিক সেবা দিতে প্রস্তুত:
- ✈️ **এয়ারলাইন্স ও বিমান টিকিট বুকিং**: এমিরেটস, সিঙ্গাপুর, কাতার এয়ারওয়েজ ও প্রাইভেট জেট।
- 🏨 **লাক্সারি সুইট ও ভাড়া**: রুমের দাম ($১৮০-$৪৫০), সুযোগ-সুবিধা ও চেক-ইন।
- 🚗 **লিমোজিন ও ইয়ট চার্টার**: রোলস-রয়েস ফ্যান্টম ও ৬৫ ফুট প্রাইভেট ইয়ট।
- 💆 **রয়্যাল স্পা ও ম্যাসাজ**: মরোক্কান হাম্মাম ও ২৪ ক্যারেট গোল্ড ফেসিয়াল।
- 🍽️ **খাবার ও রেস্তোরাঁ মেনু**: ওয়াগিউ স্টেক, স্যামন, পাস্তা ও ডেজার্ট।
- 🪑 **টেবিল রিজার্ভেশন**: ইনডোর হল, টেরেস গার্ডেন ও ভিআইপি লাউঞ্জ।
- 💳 **ইনভয়েস ও বিলিং**: ১০% ভ্যাট, বিকাশ, নগদ ও কার্ড পেমেন্ট।`
    : `**Welcome to Grand Aurelia Enterprise Knowledge Base & 24/7 AI ChatBoot!**
I have complete knowledge of our luxury hospitality & travel ecosystem:
- ✈️ **Airlines & Flight Ticket Booking**: Emirates, Singapore Airlines, Qatar Airways & Private Jets.
- 🏨 **Suites & Pricing**: Room rates ($180-$450), amenities & VIP add-ons.
- 🚗 **Chauffeur & Yacht Charter**: Rolls-Royce Phantom, Maybach & 65ft Azure Private Yacht.
- 💆 **Royal Spa & Wellness**: Moroccan Hammam, 24K Gold Facials & Hot Stone therapy.
- 🍽️ **Gourmet Food Menu**: Wagyu Steak, Atlantic Salmon, Truffle Pasta & Lava Cake.
- 🪑 **Table Reservations**: Grand Hall, Terrace Garden & VIP Lounge.
- 💳 **Billing & Invoices**: Itemized 10% VAT tax folios, bKash, Nagad, Visa/Mastercard.`;

  return {
    reply: text,
    recommendations: [
      { title: 'Emirates Dubai Flight (EK-583)', subtitle: 'Economy $380 • Business $850 • First $1,650', action: 'BOOK_FLIGHT', target: 'flight-modal' },
      { title: 'Deluxe Ocean Suite', subtitle: 'Sea View • $180/night', image: rooms[0]?.image, action: 'VIEW_ROOM', target: 'hotel' }
    ],
    suggestedAction: { target: 'overview', label: isBengali ? 'ড্যাশবোর্ড ওভারভিউ' : 'Explore GM Dashboard' }
  };
}
