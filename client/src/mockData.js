// Initial comprehensive mock data for Grand Aurelia Luxury Hotel & Resort
export const initialRooms = [
  {
    id: "rm_101",
    number: "101",
    type: "Deluxe Ocean Suite",
    tier: "Luxury Suite",
    floor: 1,
    pricePerNight: 180,
    capacity: 2,
    bedType: "1 King Bed",
    size: "48 m²",
    status: "Occupied",
    amenities: [
      "Ocean View",
      "Private Balcony",
      "King Bed",
      "Free High-Speed Wi-Fi",
      "Smart TV 55\"",
      "Mini Bar",
      "Marble Bathtub",
      "Espresso Machine",
      "24/7 Room Service",
      "Luxury Bathrobes"
    ],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600",
    currentGuest: "Dr. Sarah Mahmud",
    cleaningStatus: "Clean",
    description: "Expansive oceanfront suite featuring floor-to-ceiling panoramic windows, an Italian marble bathroom with soaking tub, and a private sunset terrace."
  },
  {
    id: "rm_102",
    number: "102",
    type: "Executive Business Suite",
    tier: "Business Suite",
    floor: 1,
    pricePerNight: 220,
    capacity: 3,
    bedType: "1 King + 1 Sofa Bed",
    size: "56 m²",
    status: "Available",
    amenities: [
      "Workstation Desk",
      "Ergonomic Chair",
      "High-Speed Wi-Fi",
      "Living Area",
      "Mini Bar",
      "City View",
      "Rain Shower",
      "Wireless Charger",
      "Soundproof Walls"
    ],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600",
    currentGuest: null,
    cleaningStatus: "Clean",
    description: "Designed for modern executives with high-speed fiber connectivity, ergonomic Herman Miller workstation, separated meeting lounge, and premium mini bar."
  },
  {
    id: "rm_201",
    number: "201",
    type: "Presidential Penthouse",
    tier: "Presidential",
    floor: 2,
    pricePerNight: 450,
    capacity: 4,
    bedType: "2 King Beds",
    size: "110 m²",
    status: "Available",
    amenities: [
      "Panoramic View",
      "Private Jacuzzi",
      "Dining Area",
      "Butler Service",
      "Walk-in Closet",
      "Wine Cooler",
      "Smart Automation",
      "Private Terrace",
      "Bespoke Toiletries"
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600",
    currentGuest: null,
    cleaningStatus: "Clean",
    description: "The crown jewel of Grand Aurelia offering 110 square meters of supreme luxury, private rooftop jacuzzi, 24/7 dedicated butler service, and private dining salon."
  },
  {
    id: "rm_202",
    number: "202",
    type: "Grand Premium Room",
    tier: "Premium",
    floor: 2,
    pricePerNight: 140,
    capacity: 2,
    bedType: "1 Queen Bed",
    size: "38 m²",
    status: "Cleaning",
    amenities: [
      "City Skyline View",
      "Work Desk",
      "Wi-Fi 6",
      "Rain Shower",
      "Coffee Maker",
      "Electronic Safe",
      "Blackout Curtains"
    ],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600",
    currentGuest: null,
    cleaningStatus: "Cleaning In-Progress",
    description: "Sophisticated styling with city skyline views, plush queen bedding, automated ambient lighting, and rainforest glass shower."
  },
  {
    id: "rm_301",
    number: "301",
    type: "Deluxe Twin Garden Room",
    tier: "Deluxe",
    floor: 3,
    pricePerNight: 120,
    capacity: 2,
    bedType: "2 Twin Beds",
    size: "35 m²",
    status: "Available",
    amenities: [
      "Garden View",
      "Wi-Fi",
      "43\" LED TV",
      "Mini Fridge",
      "Tea/Coffee Station",
      "Ensuite Bath"
    ],
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?w=600",
    currentGuest: null,
    cleaningStatus: "Clean",
    description: "Tranquil botanical garden vistas with twin luxury plush beds, ideal for friends, colleagues, or light leisure travelers."
  },
  {
    id: "rm_302",
    number: "302",
    type: "Cozy Boutique Studio",
    tier: "Standard",
    floor: 3,
    pricePerNight: 95,
    capacity: 2,
    bedType: "1 Queen Bed",
    size: "30 m²",
    status: "Maintenance",
    amenities: [
      "Wi-Fi",
      "Smart TV",
      "Ensuite Bathroom",
      "Air Conditioning",
      "Wardrobe"
    ],
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
    currentGuest: null,
    cleaningStatus: "Maintenance Required",
    description: "Intimate studio room featuring warm wood finishes, premium bedding, and rapid air-climate controls."
  }
];

export const initialBookings = [
  {
    id: "bk_1001",
    bookingNumber: "IHG-BK-2026-8801",
    roomId: "rm_101",
    roomNumber: "101",
    guestName: "Dr. Sarah Mahmud",
    guestEmail: "sarah.m@gmail.com",
    guestPhone: "+880 1819 123456",
    checkInDate: "2026-09-16",
    checkOutDate: "2026-09-20",
    nights: 4,
    totalGuests: 2,
    pricePerNight: 180,
    totalAmount: 720,
    paidAmount: 720,
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (Visa)",
    status: "Checked-In",
    specialRequests: "Late checkout if available, extra feather pillows.",
    createdAt: "2026-09-15T10:30:00Z"
  },
  {
    id: "bk_1002",
    bookingNumber: "IHG-BK-2026-8802",
    roomId: "rm_102",
    roomNumber: "102",
    guestName: "Mr. Tariq Al-Mansoor",
    guestEmail: "tariq.mansoor@techcorp.com",
    guestPhone: "+880 1712 998877",
    checkInDate: "2026-09-18",
    checkOutDate: "2026-09-22",
    nights: 4,
    totalGuests: 1,
    pricePerNight: 220,
    totalAmount: 880,
    paidAmount: 880,
    paymentStatus: "Paid",
    paymentMethod: "MasterCard",
    status: "Confirmed",
    specialRequests: "High-speed LAN cable required in workspace.",
    createdAt: "2026-09-16T14:15:00Z"
  }
];

export const initialTables = [
  {
    id: "tbl_1",
    number: "T-01",
    capacity: 2,
    section: "Terrace Garden",
    status: "Occupied",
    currentOrderId: "ord_dine_01"
  },
  {
    id: "tbl_2",
    number: "T-02",
    capacity: 4,
    section: "Terrace Garden",
    status: "Reserved",
    currentOrderId: null
  },
  {
    id: "tbl_3",
    number: "T-03",
    capacity: 4,
    section: "Main Fine Dining",
    status: "Occupied",
    currentOrderId: "ord_dine_02"
  },
  {
    id: "tbl_4",
    number: "T-04",
    capacity: 6,
    section: "Main Fine Dining",
    status: "Available",
    currentOrderId: null
  },
  {
    id: "tbl_5",
    number: "T-05",
    capacity: 8,
    section: "VIP Royal Lounge",
    status: "Available",
    currentOrderId: null
  },
  {
    id: "tbl_6",
    number: "T-06",
    capacity: 2,
    section: "Main Fine Dining",
    status: "Available",
    currentOrderId: null
  }
];

export const initialTableReservations = [
  {
    id: "res_01",
    reservationNumber: "IHG-TB-901",
    customerName: "Ashfaqur Rahman",
    phone: "+880 1722 334455",
    guestsCount: 4,
    tableNumber: "T-02",
    section: "Terrace Garden",
    date: "2026-09-17",
    timeSlot: "19:30",
    status: "Confirmed",
    specialRequests: "Candlelight setup for wedding anniversary celebration."
  }
];

export const initialMenuItems = [
  {
    id: "m_01",
    name: "Prime Wagyu Ribeye Steak",
    category: "Main Course",
    price: 42.0,
    rating: 4.9,
    calories: 780,
    prepTime: "20 mins",
    isVeg: false,
    isChefSpecial: true,
    description: "Char-grilled Grade A5 Wagyu ribeye with truffle herb butter, roasted asparagus and garlic mash.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600"
  },
  {
    id: "m_02",
    name: "Grilled Atlantic Salmon Fillet",
    category: "Main Course",
    price: 28.5,
    rating: 4.8,
    calories: 520,
    prepTime: "15 mins",
    isVeg: false,
    isChefSpecial: true,
    description: "Pan-seared wild Atlantic salmon, citrus beurre blanc, wild rice pilaf & charred broccolini.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600"
  },
  {
    id: "m_03",
    name: "Truffle & Wild Mushroom Risotto",
    category: "Main Course",
    price: 22.0,
    rating: 4.7,
    calories: 460,
    prepTime: "18 mins",
    isVeg: true,
    isChefSpecial: false,
    description: "Creamy Arborio rice with porcini mushrooms, white truffle oil, shaved aged Parmigiano Reggiano.",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=600"
  },
  {
    id: "m_04",
    name: "Artisan Burrata Caprese Salad",
    category: "Appetizers",
    price: 15.5,
    rating: 4.9,
    calories: 340,
    prepTime: "8 mins",
    isVeg: true,
    isChefSpecial: false,
    description: "Fresh Italian burrata cheese, heirloom cherry tomatoes, basil pesto glaze, toasted pine nuts & focaccia.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=600"
  },
  {
    id: "m_05",
    name: "Crispy Calamari Fritti",
    category: "Appetizers",
    price: 14.0,
    rating: 4.6,
    calories: 380,
    prepTime: "10 mins",
    isVeg: false,
    isChefSpecial: false,
    description: "Golden spiced calamari rings served with lemon garlic aioli and fresh marinara dip.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600"
  },
  {
    id: "m_06",
    name: "IHG Signature Gourmet Burger",
    category: "Main Course",
    price: 19.5,
    rating: 4.8,
    calories: 820,
    prepTime: "14 mins",
    isVeg: false,
    isChefSpecial: false,
    description: "Angus beef patty, smoked cheddar, caramelized onion relish, brioche bun, served with truffle fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    id: "m_07",
    name: "Velvet Belgian Chocolate Lava Cake",
    category: "Desserts",
    price: 12.0,
    rating: 4.9,
    calories: 490,
    prepTime: "12 mins",
    isVeg: true,
    isChefSpecial: true,
    description: "Molten 70% dark Belgian chocolate center served warm with vanilla bean gelato and raspberry coulis.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },
  {
    id: "m_08",
    name: "Smoked Hibiscus & Yuzu Mocktail",
    category: "Beverages",
    price: 8.5,
    rating: 4.7,
    calories: 110,
    prepTime: "5 mins",
    isVeg: true,
    isChefSpecial: false,
    description: "Botanical hibiscus infusion, Japanese yuzu juice, sparkling mineral water, rosemary smoked finish.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600"
  }
];

export const initialOrders = [
  {
    id: "ord_dine_01",
    orderNumber: "ORD-DINE-881",
    orderType: "DINE_IN",
    tableNumber: "T-01",
    customerName: "Dr. Sarah Mahmud",
    waiterName: "Tanvir Hossain",
    items: [
      { menuItemId: "m_02", name: "Grilled Atlantic Salmon Fillet", price: 28.5, quantity: 1, notes: "Medium well, lemon wedge" },
      { menuItemId: "m_08", name: "Smoked Hibiscus & Yuzu Mocktail", price: 8.5, quantity: 1, notes: "Extra ice" }
    ],
    totalAmount: 37.0,
    status: "PREPARING",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: "ord_del_01",
    orderNumber: "ORD-DEL-902",
    orderType: "DELIVERY",
    customerName: "Nazmul Abedin",
    customerPhone: "+880 1713 554433",
    deliveryAddress: "House 42, Road 11, Block D, Banani, Dhaka",
    items: [
      { menuItemId: "m_01", name: "Prime Wagyu Ribeye Steak", price: 42.0, quantity: 1, notes: "Medium rare" },
      { menuItemId: "m_07", name: "Velvet Belgian Chocolate Lava Cake", price: 12.0, quantity: 1, notes: "" }
    ],
    totalAmount: 54.0,
    status: "PLACED",
    createdAt: new Date(Date.now() - 8 * 60000).toISOString()
  }
];

export const initialHousekeepingTasks = [
  {
    id: "hk_01",
    roomId: "rm_202",
    roomNumber: "202",
    taskType: "Post Checkout Deep Clean",
    assignedTo: "Farhana Akter",
    priority: "High",
    status: "In-Progress",
    notes: "Sanitize linen, restock mini-bar and premium toiletries.",
    scheduledAt: "2026-09-17T08:00:00Z",
    completedAt: null
  },
  {
    id: "hk_02",
    roomId: "rm_101",
    roomNumber: "101",
    taskType: "Daily Turndown & Towel Refresh",
    assignedTo: "Farhana Akter",
    priority: "Medium",
    status: "Pending",
    notes: "Guest requested morning cleaning at 10:30 AM.",
    scheduledAt: "2026-09-17T10:30:00Z",
    completedAt: null
  },
  {
    id: "hk_03",
    roomId: "rm_302",
    roomNumber: "302",
    taskType: "AC Filter Inspection & Maintenance",
    assignedTo: "Maintenance Team",
    priority: "High",
    status: "Pending",
    notes: "Thermostat sensor calibration in progress.",
    scheduledAt: "2026-09-17T09:00:00Z",
    completedAt: null
  }
];

export const initialInventory = [
  {
    id: "inv_01",
    name: "Grade A5 Wagyu Ribeye Loins",
    category: "Kitchen & Meat",
    currentStock: 14,
    minThreshold: 8,
    unit: "kg",
    unitCost: 65.0,
    status: "Optimal"
  },
  {
    id: "inv_02",
    name: "Wild Atlantic Fresh Salmon",
    category: "Kitchen & Seafood",
    currentStock: 9,
    minThreshold: 6,
    unit: "kg",
    unitCost: 32.0,
    status: "Optimal"
  },
  {
    id: "inv_03",
    name: "Luxury Egyptian Cotton Bath Towels",
    category: "Housekeeping & Linen",
    currentStock: 4,
    minThreshold: 15,
    unit: "sets",
    unitCost: 28.0,
    status: "Low Stock"
  },
  {
    id: "inv_04",
    name: "Artisan Espresso Coffee Beans (Ethiopian)",
    category: "Beverages & Bar",
    currentStock: 25,
    minThreshold: 10,
    unit: "bags (1kg)",
    unitCost: 18.5,
    status: "Optimal"
  },
  {
    id: "inv_05",
    name: "Organic Bathroom Spa Kits (Bespoke)",
    category: "Housekeeping & Toiletries",
    currentStock: 52,
    minThreshold: 20,
    unit: "kits",
    unitCost: 6.5,
    status: "Optimal"
  }
];

export const initialInvoices = [
  {
    id: "inv_101",
    invoiceNumber: "INV-2026-8801",
    guestName: "Dr. Sarah Mahmud",
    roomNumber: "101",
    roomTotal: 720.0,
    diningTotal: 45.5,
    tax: 76.55,
    netTotal: 842.05,
    paidAmount: 842.05,
    balanceDue: 0.0,
    status: "Paid",
    paymentMethod: "Credit Card (Visa)",
    date: "2026-09-17"
  },
  {
    id: "inv_102",
    invoiceNumber: "INV-2026-8802",
    guestName: "Mr. Tariq Al-Mansoor",
    roomNumber: "102",
    roomTotal: 880.0,
    diningTotal: 0.0,
    tax: 88.0,
    netTotal: 968.0,
    paidAmount: 968.0,
    balanceDue: 0.0,
    status: "Paid",
    paymentMethod: "MasterCard",
    date: "2026-09-16"
  }
];

export const initialAnalytics = {
  kpis: {
    totalRevenue: 28540,
    occupancyRate: "83.3%",
    activeTables: "3 / 6 Occupied",
    pendingOrdersCount: 2,
    lowStockAlertsCount: 1
  }
};
