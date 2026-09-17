import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDB, saveDB } from './db.js';
import { queryKnowledgeBase, PROJECT_OVERVIEW, KNOWLEDGE_TOPICS } from './knowledgeBase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with broad headers for local dev & production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// Helper for generating unique ID
const genId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

// ----------------------------------------------------
// SYSTEM HEALTH CHECK
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Grand Aurelia Hospitality Enterprise',
    message: 'Backend REST API is operational',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime())
  });
});

// ----------------------------------------------------
// PDF DOCUMENTATION DOWNLOAD
// ----------------------------------------------------
app.get('/api/download-pdf', (req, res) => {
  const possiblePaths = [
    path.resolve(__dirname, '../../Grand_Aurelia_Full_Project_Documentation.pdf'),
    path.resolve(__dirname, '../Grand_Aurelia_Full_Project_Documentation.pdf'),
    path.resolve(process.cwd(), 'Grand_Aurelia_Full_Project_Documentation.pdf'),
    path.resolve(process.cwd(), 'client/public/Grand_Aurelia_Full_Project_Documentation.pdf')
  ];
  
  const foundPath = possiblePaths.find(p => fs.existsSync(p));
  
  if (foundPath) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Grand_Aurelia_Full_Project_Documentation.pdf"');
    fs.createReadStream(foundPath).pipe(res);
  } else {
    res.status(404).json({ error: 'PDF documentation not found' });
  }
});

// ----------------------------------------------------
// AUTH & USERS
// ----------------------------------------------------
app.get('/api/users', (req, res) => {
  try {
    const db = getDB();
    res.json(db.users || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users', details: err.message });
  }
});

app.post('/api/auth/switch-role', (req, res) => {
  try {
    const { role } = req.body;
    const db = getDB();
    const user = (db.users || []).find((u) => u.role === role) || db.users?.[0] || { id: 'guest', role: 'GUEST_CUSTOMER', name: 'Guest' };
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to switch role', details: err.message });
  }
});

// ----------------------------------------------------
// HOTEL MANAGEMENT ENDPOINTS
// ----------------------------------------------------
app.get('/api/rooms', (req, res) => {
  try {
    const db = getDB();
    res.json(db.rooms || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve rooms', details: err.message });
  }
});

app.get('/api/rooms/:id', (req, res) => {
  try {
    const db = getDB();
    const room = (db.rooms || []).find(r => r.id === req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve room', details: err.message });
  }
});

app.post('/api/rooms', (req, res) => {
  try {
    const db = getDB();
    if (!db.rooms) db.rooms = [];
    const newRoom = {
      id: genId('rm'),
      tier: 'Standard',
      floor: 1,
      pricePerNight: 100,
      capacity: 2,
      bedType: '1 Queen Bed',
      size: '35 m²',
      status: 'Available',
      amenities: ['Wi-Fi', 'Smart TV', 'Air Conditioning'],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
      cleaningStatus: 'Clean',
      ...req.body
    };
    db.rooms.push(newRoom);
    saveDB(db);
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create room', details: err.message });
  }
});

app.patch('/api/rooms/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const index = (db.rooms || []).findIndex((r) => r.id === id);
    if (index === -1) return res.status(404).json({ error: 'Room not found' });

    db.rooms[index] = { ...db.rooms[index], ...req.body };
    saveDB(db);
    res.json(db.rooms[index]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update room', details: err.message });
  }
});

app.delete('/api/rooms/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.rooms = (db.rooms || []).filter(r => r.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete room', details: err.message });
  }
});

// Bookings
app.get('/api/bookings', (req, res) => {
  try {
    const db = getDB();
    res.json(db.bookings || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve bookings', details: err.message });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  try {
    const db = getDB();
    const booking = (db.bookings || []).find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve booking', details: err.message });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const db = getDB();
    if (!db.bookings) db.bookings = [];
    const { 
      roomId, 
      roomNumber,
      guestName, 
      guestEmail, 
      guestPhone, 
      guestIdNumber,
      checkInDate, 
      checkOutDate, 
      nights, 
      totalGuests, 
      pricePerNight,
      totalAmount,
      addons,
      paymentMethod,
      specialRequests,
      status
    } = req.body;

    const room = (db.rooms || []).find((r) => r.id === roomId || r.number === roomNumber);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const nightsCount = Number(nights) || 1;
    const finalTotal = totalAmount ? Number(totalAmount) : (room.pricePerNight || 100) * nightsCount;
    const bookingStatus = status || 'Confirmed';

    const newBooking = {
      id: genId('bk'),
      bookingNumber: `AGH-BK-${Date.now().toString().slice(-4)}`,
      roomId: room.id,
      roomNumber: room.number,
      guestName: guestName || 'Guest',
      guestEmail: guestEmail || 'guest@example.com',
      guestPhone: guestPhone || '+880 1800 000000',
      guestIdNumber: guestIdNumber || '',
      checkInDate: checkInDate || new Date().toISOString().split('T')[0],
      checkOutDate: checkOutDate || new Date(Date.now() + 86400000 * nightsCount).toISOString().split('T')[0],
      nights: nightsCount,
      totalGuests: Number(totalGuests) || 1,
      pricePerNight: pricePerNight || room.pricePerNight || 100,
      totalAmount: finalTotal,
      paidAmount: finalTotal,
      paymentStatus: 'Paid',
      paymentMethod: paymentMethod || 'Credit Card / Online',
      status: bookingStatus,
      specialRequests: specialRequests || '',
      addons: addons || [],
      createdAt: new Date().toISOString()
    };

    db.bookings.unshift(newBooking);

    if (bookingStatus === 'Checked-In') {
      room.status = 'Occupied';
      room.currentGuest = guestName || 'Guest';
    }

    // Save corresponding invoice
    if (!db.invoices) db.invoices = [];
    const newInvoice = {
      id: genId('inv'),
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      guestName: guestName || 'Guest',
      roomNumber: room.number,
      roomTotal: Number(finalTotal),
      diningTotal: 0.0,
      tax: Number((finalTotal * 0.1).toFixed(2)),
      netTotal: Number((finalTotal * 1.1).toFixed(2)),
      paidAmount: Number((finalTotal * 1.1).toFixed(2)),
      balanceDue: 0.0,
      status: 'Paid',
      paymentMethod: paymentMethod || 'Credit Card (Visa)',
      date: new Date().toISOString().split('T')[0]
    };
    db.invoices.unshift(newInvoice);

    saveDB(db);
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking', details: err.message });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.bookings = (db.bookings || []).filter(b => b.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Booking removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete booking', details: err.message });
  }
});

// Front Desk: Check-in Guest
app.post('/api/bookings/:id/checkin', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const booking = (db.bookings || []).find((b) => b.id === id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'Checked-In';

    // Mark room occupied
    const room = (db.rooms || []).find((r) => r.id === booking.roomId);
    if (room) {
      room.status = 'Occupied';
      room.currentGuest = booking.guestName;
    }

    saveDB(db);
    res.json({ success: true, booking, room });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check-in guest', details: err.message });
  }
});

// Front Desk: Check-out Guest & Trigger Housekeeping
app.post('/api/bookings/:id/checkout', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const booking = (db.bookings || []).find((b) => b.id === id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    booking.status = 'Checked-Out';

    // Find room & set to Cleaning
    const room = (db.rooms || []).find((r) => r.id === booking.roomId);
    if (room) {
      room.status = 'Cleaning';
      room.cleaningStatus = 'Cleaning Required';
      room.currentGuest = null;
    }

    // Create automatic housekeeping task
    if (!db.housekeepingTasks) db.housekeepingTasks = [];
    const newHKTask = {
      id: genId('hk'),
      roomId: booking.roomId,
      roomNumber: booking.roomNumber,
      taskType: 'Post Checkout Deep Clean',
      assignedTo: 'Farhana Akter',
      priority: 'High',
      status: 'Pending',
      notes: `Suite ${booking.roomNumber} vacated by ${booking.guestName}. Full turnover needed.`,
      scheduledAt: new Date().toISOString(),
      completedAt: null
    };
    db.housekeepingTasks.unshift(newHKTask);

    // Generate finalized invoice
    if (!db.invoices) db.invoices = [];
    const newInvoice = {
      id: genId('inv'),
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      guestName: booking.guestName,
      roomNumber: booking.roomNumber,
      roomTotal: booking.totalAmount || 0,
      diningTotal: 45.00,
      tax: Number(((booking.totalAmount || 0) * 0.1).toFixed(2)),
      discount: 0,
      netTotal: Number(((booking.totalAmount || 0) * 1.1 + 45.00).toFixed(2)),
      paidAmount: Number(((booking.totalAmount || 0) * 1.1 + 45.00).toFixed(2)),
      balanceDue: 0,
      status: 'Paid',
      date: new Date().toISOString().split('T')[0]
    };
    db.invoices.unshift(newInvoice);

    saveDB(db);
    res.json({ success: true, booking, room, invoice: newInvoice });
  } catch (err) {
    res.status(500).json({ error: 'Failed to check-out guest', details: err.message });
  }
});

// Housekeeping
app.get('/api/housekeeping', (req, res) => {
  try {
    const db = getDB();
    res.json(db.housekeepingTasks || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve housekeeping tasks', details: err.message });
  }
});

app.post('/api/housekeeping', (req, res) => {
  try {
    const db = getDB();
    if (!db.housekeepingTasks) db.housekeepingTasks = [];
    const newTask = {
      id: genId('hk'),
      status: 'Pending',
      scheduledAt: new Date().toISOString(),
      completedAt: null,
      assignedTo: 'Farhana Akter',
      priority: 'Medium',
      ...req.body
    };
    db.housekeepingTasks.unshift(newTask);
    saveDB(db);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create housekeeping task', details: err.message });
  }
});

app.patch('/api/housekeeping/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const task = (db.housekeepingTasks || []).find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: 'Housekeeping task not found' });

    Object.assign(task, req.body);
    if (req.body.status === 'Cleaned' || req.body.status === 'Completed') {
      task.completedAt = new Date().toISOString();
      // Update room status if related
      const room = (db.rooms || []).find((r) => r.id === task.roomId);
      if (room && room.status === 'Cleaning') {
        room.status = 'Available';
        room.cleaningStatus = 'Clean';
      }
    }

    saveDB(db);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update housekeeping task', details: err.message });
  }
});

app.delete('/api/housekeeping/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.housekeepingTasks = (db.housekeepingTasks || []).filter(t => t.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Housekeeping task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete housekeeping task', details: err.message });
  }
});

// In-Room Services
app.get('/api/in-room-services', (req, res) => {
  try {
    const db = getDB();
    res.json(db.inRoomServices || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve room services', details: err.message });
  }
});

app.post('/api/in-room-services', (req, res) => {
  try {
    const db = getDB();
    if (!db.inRoomServices) db.inRoomServices = [];
    const newRequest = {
      id: genId('irs'),
      status: 'Requested',
      requestedAt: new Date().toISOString(),
      ...req.body
    };
    db.inRoomServices.unshift(newRequest);
    saveDB(db);
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to request room service', details: err.message });
  }
});

app.patch('/api/in-room-services/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const item = (db.inRoomServices || []).find((s) => s.id === id);
    if (!item) return res.status(404).json({ error: 'Service request not found' });

    Object.assign(item, req.body);
    saveDB(db);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service request', details: err.message });
  }
});

// ----------------------------------------------------
// RESTAURANT & TABLE MANAGEMENT ENDPOINTS
// ----------------------------------------------------
app.get('/api/tables', (req, res) => {
  try {
    const db = getDB();
    res.json(db.tables || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tables', details: err.message });
  }
});

app.post('/api/tables', (req, res) => {
  try {
    const db = getDB();
    if (!db.tables) db.tables = [];
    const newTable = {
      id: genId('tbl'),
      status: 'Available',
      capacity: 4,
      section: 'Main Fine Dining',
      currentOrderId: null,
      ...req.body
    };
    db.tables.push(newTable);
    saveDB(db);
    res.status(201).json(newTable);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create table', details: err.message });
  }
});

app.patch('/api/tables/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const table = (db.tables || []).find((t) => t.id === id);
    if (!table) return res.status(404).json({ error: 'Table not found' });

    Object.assign(table, req.body);
    saveDB(db);
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update table', details: err.message });
  }
});

app.get('/api/table-reservations', (req, res) => {
  try {
    const db = getDB();
    res.json(db.tableReservations || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve table reservations', details: err.message });
  }
});

app.post('/api/table-reservations', (req, res) => {
  try {
    const db = getDB();
    if (!db.tableReservations) db.tableReservations = [];
    const newReservation = {
      id: genId('res'),
      reservationNumber: `AGH-TB-${Date.now().toString().slice(-3)}`,
      status: 'Confirmed',
      ...req.body
    };

    // Find table and set status to Reserved
    const table = (db.tables || []).find((t) => t.number === req.body.tableNumber);
    if (table && table.status === 'Available') {
      table.status = 'Reserved';
    }

    db.tableReservations.unshift(newReservation);
    saveDB(db);
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create table reservation', details: err.message });
  }
});

app.get('/api/menu', (req, res) => {
  try {
    const db = getDB();
    res.json(db.menuItems || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve menu items', details: err.message });
  }
});

app.post('/api/menu', (req, res) => {
  try {
    const db = getDB();
    if (!db.menuItems) db.menuItems = [];
    const newItem = {
      id: genId('m'),
      rating: 4.8,
      category: 'Main Course',
      price: 20.00,
      calories: 500,
      prepTime: '15 mins',
      isVeg: false,
      isChefSpecial: false,
      ...req.body
    };
    db.menuItems.push(newItem);
    saveDB(db);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create menu item', details: err.message });
  }
});

app.patch('/api/menu/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const item = (db.menuItems || []).find((m) => m.id === id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });

    Object.assign(item, req.body);
    saveDB(db);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update menu item', details: err.message });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    db.menuItems = (db.menuItems || []).filter(m => m.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete menu item', details: err.message });
  }
});

// ----------------------------------------------------
// ORDERS & KDS (Dine-In and Food Delivery)
// ----------------------------------------------------
app.get('/api/orders', (req, res) => {
  try {
    const db = getDB();
    res.json(db.orders || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve orders', details: err.message });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const db = getDB();
    const order = (db.orders || []).find(o => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
  }
});

// Waiter: Create Dine-In Order
app.post('/api/orders/dine-in', (req, res) => {
  try {
    const db = getDB();
    if (!db.orders) db.orders = [];
    const { tableNumber, waiterName, items = [] } = req.body;

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    const tax = Number((subtotal * 0.1).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    const newOrder = {
      id: genId('ord_dine'),
      orderNumber: `AGH-ORD-${Date.now().toString().slice(-4)}`,
      orderType: 'DINE_IN',
      tableNumber: tableNumber || 'T-01',
      waiterName: waiterName || 'Tanvir Hossain',
      customerName: `Table ${tableNumber} Diners`,
      customerPhone: '',
      items,
      subtotal,
      tax,
      deliveryFee: 0,
      discount: 0,
      total,
      paymentMethod: 'Pending (At Table)',
      paymentStatus: 'Pending',
      status: 'PLACED',
      kdsStatus: 'PLACED',
      createdAt: new Date().toISOString()
    };

    // Update table status to Occupied
    const table = (db.tables || []).find((t) => t.number === tableNumber);
    if (table) {
      table.status = 'Occupied';
      table.currentOrderId = newOrder.id;
    }

    db.orders.unshift(newOrder);
    saveDB(db);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create dine-in order', details: err.message });
  }
});

// Customer: Place Online Food Delivery Order
app.post('/api/orders/delivery', (req, res) => {
  try {
    const db = getDB();
    if (!db.orders) db.orders = [];
    const { customerName, customerPhone, deliveryAddress, deliveryNotes, items = [], paymentMethod } = req.body;

    const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
    const tax = Number((subtotal * 0.1).toFixed(2));
    const deliveryFee = subtotal > 0 ? 4.50 : 0;
    const discount = subtotal > 50 ? 5.00 : 0.00;
    const total = Number((subtotal + tax + deliveryFee - discount).toFixed(2));

    const newOrder = {
      id: genId('ord_deliv'),
      orderNumber: `AGH-FD-${Date.now().toString().slice(-4)}`,
      orderType: 'DELIVERY',
      customerName: customerName || 'Valued Guest',
      customerPhone: customerPhone || '+880 1700 000000',
      deliveryAddress: deliveryAddress || 'Dhaka, Bangladesh',
      deliveryNotes: deliveryNotes || '',
      items,
      subtotal,
      tax,
      deliveryFee,
      discount,
      total,
      paymentMethod: paymentMethod || 'bKash / Credit Card',
      paymentStatus: 'Paid',
      status: 'ORDER_PLACED',
      assignedRider: null,
      estimatedMinutes: 30,
      createdAt: new Date().toISOString(),
      timeline: [
        { status: 'ORDER_PLACED', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), text: 'Order successfully placed & verified' }
      ]
    };

    db.orders.unshift(newOrder);
    saveDB(db);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to place food delivery order', details: err.message });
  }
});

// Update Order Status (Used by KDS, Waiter, and Riders)
app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, note, assignedRider } = req.body;
    const db = getDB();
    const order = (db.orders || []).find((o) => o.id === id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.status = status;
    if (order.orderType === 'DINE_IN') {
      order.kdsStatus = status;
      if (status === 'PAID') {
        order.paymentStatus = 'Paid';
        const table = (db.tables || []).find((t) => t.number === order.tableNumber);
        if (table) {
          table.status = 'Available';
          table.currentOrderId = null;
        }
      }
    }

    if (assignedRider) {
      order.assignedRider = assignedRider;
    }

    if (order.orderType === 'DELIVERY' && order.timeline) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      order.timeline.push({
        status,
        time: timeStr,
        text: note || `Order updated to ${status}`
      });
    }

    saveDB(db);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status', details: err.message });
  }
});

// ----------------------------------------------------
// INVENTORY & STOCK MANAGEMENT
// ----------------------------------------------------
app.get('/api/inventory', (req, res) => {
  try {
    const db = getDB();
    res.json(db.inventory || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve inventory', details: err.message });
  }
});

app.post('/api/inventory', (req, res) => {
  try {
    const db = getDB();
    if (!db.inventory) db.inventory = [];
    const newItem = {
      id: genId('inv'),
      currentStock: 10,
      minThreshold: 5,
      unit: 'pcs',
      unitCost: 10.00,
      status: 'Optimal',
      supplier: 'Grand Aurelia Central Supplies',
      ...req.body
    };
    db.inventory.push(newItem);
    saveDB(db);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add inventory item', details: err.message });
  }
});

app.patch('/api/inventory/:id', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const item = (db.inventory || []).find((i) => i.id === id);
    if (!item) return res.status(404).json({ error: 'Inventory item not found' });

    Object.assign(item, req.body);
    if (item.currentStock <= item.minThreshold) {
      item.status = 'Low Stock';
    } else {
      item.status = 'Optimal';
    }

    saveDB(db);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update inventory', details: err.message });
  }
});

// ----------------------------------------------------
// INVOICES & BILLING
// ----------------------------------------------------
app.get('/api/invoices', (req, res) => {
  try {
    const db = getDB();
    res.json(db.invoices || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve invoices', details: err.message });
  }
});

app.post('/api/invoices/:id/pay', (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    const inv = (db.invoices || []).find((i) => i.id === id);
    if (!inv) return res.status(404).json({ error: 'Invoice not found' });

    inv.paidAmount = inv.netTotal;
    inv.balanceDue = 0;
    inv.status = 'Paid';
    saveDB(db);
    res.json(inv);
  } catch (err) {
    res.status(500).json({ error: 'Failed to settle invoice', details: err.message });
  }
});

// ----------------------------------------------------
// EXECUTIVE / GM ANALYTICS
// ----------------------------------------------------
app.get('/api/analytics', (req, res) => {
  try {
    const db = getDB();

    const rooms = db.rooms || [];
    const bookings = db.bookings || [];
    const orders = db.orders || [];
    const hk = db.housekeepingTasks || [];
    const inv = db.inventory || [];

    const totalRooms = rooms.length;
    const occupiedRooms = rooms.filter((r) => r.status === 'Occupied').length;
    const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

    const roomRevenue = bookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const orderRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalRevenue = Number((roomRevenue + orderRevenue).toFixed(2));

    const pendingHousekeeping = hk.filter((h) => h.status !== 'Cleaned' && h.status !== 'Completed').length;
    const lowStockCount = inv.filter((i) => i.status === 'Low Stock' || i.currentStock <= i.minThreshold).length;
    const activeOrdersCount = orders.filter((o) => o.status !== 'DELIVERED' && o.status !== 'PAID' && o.status !== 'CANCELLED').length;

    res.json({
      kpis: {
        totalRevenue,
        roomRevenue: Number(roomRevenue.toFixed(2)),
        orderRevenue: Number(orderRevenue.toFixed(2)),
        occupancyRate,
        occupiedRooms,
        totalRooms,
        pendingHousekeeping,
        lowStockCount,
        activeOrdersCount,
        totalBookings: bookings.length,
        totalOrders: orders.length
      },
      recentBookings: bookings.slice(0, 5),
      recentOrders: orders.slice(0, 5),
      lowStockAlerts: inv.filter((i) => i.status === 'Low Stock' || i.currentStock <= i.minThreshold)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to compile analytics', details: err.message });
  }
});

// ----------------------------------------------------
// ----------------------------------------------------
// AI CONCIERGE & KNOWLEDGE BASE ENGINE
// ----------------------------------------------------
app.get('/api/knowledge-base', (req, res) => {
  try {
    const db = getDB();
    res.json({
      overview: PROJECT_OVERVIEW,
      topics: KNOWLEDGE_TOPICS,
      liveStats: {
        totalRooms: (db.rooms || []).length,
        availableRooms: (db.rooms || []).filter(r => r.status === 'Available').length,
        occupiedRooms: (db.rooms || []).filter(r => r.status === 'Occupied').length,
        totalTables: (db.tables || []).length,
        availableTables: (db.tables || []).filter(t => t.status === 'Available').length,
        totalMenuItems: (db.menuItems || []).length,
        activeOrders: (db.orders || []).filter(o => o.status !== 'Delivered' && o.status !== 'Completed').length,
        totalInvoices: (db.invoices || []).length
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve knowledge base', details: err.message });
  }
});

app.post('/api/ai/concierge', (req, res) => {
  try {
    const { query } = req.body;
    const db = getDB();
    const result = queryKnowledgeBase(query, db);

    res.json({
      ...result,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: 'AI Concierge service error', details: err.message });
  }
});

// Production Static Serving (Single Full-stack URL)
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Global 404 Handler for API routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found on Grand Aurelia Server` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Grand Aurelia Server Error]', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Global Uncaught Handlers
process.on('uncaughtException', (err) => {
  console.error('[Grand Aurelia Uncaught Exception]', err);
});
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Grand Aurelia Server] Running on http://localhost:${PORT}`);
  });
}

export default app;
