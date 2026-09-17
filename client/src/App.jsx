import React, { useState, useEffect } from 'react';
import Header, { ROLES } from './components/Header';
import GMDashboard from './components/GMDashboard';
import HotelView from './components/HotelView';
import RestaurantView from './components/RestaurantView';
import KDSView from './components/KDSView';
import DeliveryView from './components/DeliveryView';
import HousekeepingView from './components/HousekeepingView';
import InventoryView from './components/InventoryView';
import InvoicesView from './components/InvoicesView';
import RiderView from './components/RiderView';
import AIChatModal from './components/AIChatModal';

import {
  initialRooms,
  initialBookings,
  initialTables,
  initialTableReservations,
  initialMenuItems,
  initialOrders,
  initialHousekeepingTasks,
  initialInventory,
  initialInvoices,
  initialAnalytics
} from './mockData';

export default function App() {
  const [currentRole, setCurrentRole] = useState('ADMIN_GM');
  const [activeTab, setActiveTab] = useState('overview');

  // Core Data States with rich seed defaults
  const [rooms, setRooms] = useState(initialRooms);
  const [bookings, setBookings] = useState(initialBookings);
  const [tables, setTables] = useState(initialTables);
  const [tableReservations, setTableReservations] = useState(initialTableReservations);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [orders, setOrders] = useState(initialOrders);
  const [housekeepingTasks, setHousekeepingTasks] = useState(initialHousekeepingTasks);
  const [inventory, setInventory] = useState(initialInventory);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [analytics, setAnalytics] = useState(initialAnalytics);

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Safe fetch helper
  const safeFetchJson = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  };

  // Initial & Periodic Data Fetch from Backend (if connected)
  const fetchAllData = async () => {
    try {
      const [
        roomsRes,
        bookingsRes,
        tablesRes,
        tableResRes,
        menuRes,
        ordersRes,
        hkRes,
        invRes,
        invoicesRes,
        analyticsRes
      ] = await Promise.all([
        safeFetchJson('/api/rooms'),
        safeFetchJson('/api/bookings'),
        safeFetchJson('/api/tables'),
        safeFetchJson('/api/table-reservations'),
        safeFetchJson('/api/menu'),
        safeFetchJson('/api/orders'),
        safeFetchJson('/api/housekeeping'),
        safeFetchJson('/api/inventory'),
        safeFetchJson('/api/invoices'),
        safeFetchJson('/api/analytics')
      ]);

      if (Array.isArray(roomsRes) && roomsRes.length > 0) setRooms(roomsRes);
      if (Array.isArray(bookingsRes) && bookingsRes.length > 0) setBookings(bookingsRes);
      if (Array.isArray(tablesRes) && tablesRes.length > 0) setTables(tablesRes);
      if (Array.isArray(tableResRes) && tableResRes.length > 0) setTableReservations(tableResRes);
      if (Array.isArray(menuRes) && menuRes.length > 0) setMenuItems(menuRes);
      if (Array.isArray(ordersRes) && ordersRes.length > 0) setOrders(ordersRes);
      if (Array.isArray(hkRes) && hkRes.length > 0) setHousekeepingTasks(hkRes);
      if (Array.isArray(invRes) && invRes.length > 0) setInventory(invRes);
      if (Array.isArray(invoicesRes) && invoicesRes.length > 0) setInvoices(invoicesRes);
      if (analyticsRes && analyticsRes.kpis) setAnalytics(analyticsRes);
    } catch (err) {
      console.warn('Backend sync in background:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 12000);
    return () => clearInterval(interval);
  }, []);

  // Role changes
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'FRONT_DESK') setActiveTab('hotel');
    else if (newRole === 'KITCHEN_CHEF') setActiveTab('kds');
    else if (newRole === 'HOUSEKEEPING') setActiveTab('housekeeping');
    else if (newRole === 'WAITER') setActiveTab('restaurant');
    else if (newRole === 'DELIVERY_RIDER') setActiveTab('rider');
    else if (newRole === 'GUEST_CUSTOMER') setActiveTab('delivery');
  };

  // --- HOTEL & ROOM ACTIONS ---
  const handleBookRoom = async (bookingData) => {
    const isInstantCheckIn = bookingData.status === 'Checked-In';
    const newBkId = `bk_${Date.now()}`;
    const newBkNumber = `IHG-BK-${Date.now().toString().slice(-4)}`;

    const newBookingObj = {
      id: newBkId,
      bookingNumber: newBkNumber,
      roomId: bookingData.roomId,
      roomNumber: bookingData.roomNumber,
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkInDate: bookingData.checkInDate,
      checkOutDate: bookingData.checkOutDate,
      nights: bookingData.nights,
      totalGuests: bookingData.totalGuests,
      pricePerNight: bookingData.pricePerNight,
      totalAmount: bookingData.totalAmount,
      paidAmount: bookingData.totalAmount,
      paymentStatus: 'Paid',
      paymentMethod: bookingData.paymentMethod || 'Credit Card (Visa)',
      status: isInstantCheckIn ? 'Checked-In' : 'Confirmed',
      specialRequests: bookingData.specialRequests || '',
      addons: bookingData.addons || [],
      createdAt: new Date().toISOString()
    };

    // Optimistically update Bookings
    setBookings(prev => [newBookingObj, ...prev]);

    // If instant check-in, occupy room
    if (isInstantCheckIn) {
      setRooms(prev => prev.map(r => {
        if (r.id === bookingData.roomId || r.number === bookingData.roomNumber) {
          return { ...r, status: 'Occupied', currentGuest: bookingData.guestName };
        }
        return r;
      }));
    }

    // Add corresponding Invoice
    const newInv = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-${Date.now().toString().slice(-4)}`,
      guestName: bookingData.guestName,
      roomNumber: bookingData.roomNumber,
      roomTotal: Number(bookingData.totalAmount),
      diningTotal: 0.0,
      tax: Number((bookingData.totalAmount * 0.1).toFixed(2)),
      netTotal: Number((bookingData.totalAmount * 1.1).toFixed(2)),
      paidAmount: Number((bookingData.totalAmount * 1.1).toFixed(2)),
      balanceDue: 0.0,
      status: 'Paid',
      paymentMethod: bookingData.paymentMethod || 'Credit Card (Visa)',
      date: new Date().toISOString().split('T')[0]
    };
    setInvoices(prev => [newInv, ...prev]);

    // Send to backend API
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
    } catch (e) {
      // Local state is already updated
    }
  };

  const handleCheckIn = async (bookingId) => {
    const bk = bookings.find(b => b.id === bookingId);
    if (bk) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Checked-In' } : b));
      setRooms(prev => prev.map(r => {
        if (r.id === bk.roomId || r.number === bk.roomNumber) {
          return { ...r, status: 'Occupied', currentGuest: bk.guestName };
        }
        return r;
      }));
    }

    try {
      await fetch(`/api/bookings/${bookingId}/checkin`, { method: 'POST' });
    } catch (e) {}
  };

  const handleCheckOut = async (bookingId) => {
    const bk = bookings.find(b => b.id === bookingId);
    if (bk) {
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'Checked-Out' } : b));
      setRooms(prev => prev.map(r => {
        if (r.id === bk.roomId || r.number === bk.roomNumber) {
          return { ...r, status: 'Cleaning', cleaningStatus: 'Cleaning Required', currentGuest: null };
        }
        return r;
      }));

      // Add housekeeping turnover task
      const newHK = {
        id: `hk_${Date.now()}`,
        roomId: bk.roomId,
        roomNumber: bk.roomNumber,
        taskType: 'Post Checkout Deep Clean',
        assignedTo: 'Farhana Akter',
        priority: 'High',
        status: 'Pending',
        notes: `Suite ${bk.roomNumber} vacated by ${bk.guestName}. Sanitize and restock amenities.`,
        scheduledAt: new Date().toISOString(),
        completedAt: null
      };
      setHousekeepingTasks(prev => [newHK, ...prev]);
    }

    try {
      await fetch(`/api/bookings/${bookingId}/checkout`, { method: 'POST' });
    } catch (e) {}
  };

  const handleUpdateRoomStatus = async (roomId, newStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return { 
          ...r, 
          status: newStatus,
          currentGuest: newStatus === 'Available' ? null : r.currentGuest,
          cleaningStatus: newStatus === 'Available' ? 'Clean' : r.cleaningStatus
        };
      }
      return r;
    }));

    try {
      await fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
  };

  const handleAddNewRoom = async (roomData) => {
    const newRoom = {
      id: `rm_${Date.now()}`,
      ...roomData
    };
    setRooms(prev => [...prev, newRoom]);

    try {
      await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
    } catch (e) {}
  };

  const handleRequestRoomService = async (serviceData) => {
    try {
      await fetch('/api/in-room-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
    } catch (e) {}
  };

  // --- RESTAURANT & KDS ACTIONS ---
  const handleCreateDineInOrder = async (orderData) => {
    const newOrd = {
      id: `ord_dine_${Date.now()}`,
      orderNumber: `ORD-DINE-${Date.now().toString().slice(-3)}`,
      orderType: 'DINE_IN',
      tableNumber: orderData.tableNumber,
      customerName: `Table ${orderData.tableNumber} Guest`,
      waiterName: orderData.waiterName || 'Tanvir Hossain',
      items: orderData.items || [],
      totalAmount: (orderData.items || []).reduce((sum, it) => sum + it.price * it.quantity, 0),
      status: 'PLACED',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrd, ...prev]);
    setTables(prev => prev.map(t => t.number === orderData.tableNumber ? { ...t, status: 'Occupied' } : t));

    try {
      await fetch('/api/orders/dine-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    } catch (e) {}
  };

  const handleCreateReservation = async (resData) => {
    const newRes = {
      id: `res_${Date.now()}`,
      reservationNumber: `IHG-TB-${Date.now().toString().slice(-3)}`,
      ...resData,
      status: 'Confirmed'
    };

    setTableReservations(prev => [newRes, ...prev]);
    setTables(prev => prev.map(t => t.number === resData.tableNumber ? { ...t, status: 'Reserved' } : t));

    try {
      await fetch('/api/table-reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resData)
      });
    } catch (e) {}
  };

  const handleUpdateOrderStatus = async (orderId, newStatus, note) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note })
      });
    } catch (e) {}
  };

  const handleSettleBill = async (orderId) => {
    const ord = orders.find(o => o.id === orderId);
    if (ord) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'PAID' } : o));
      if (ord.tableNumber) {
        setTables(prev => prev.map(t => t.number === ord.tableNumber ? { ...t, status: 'Available' } : t));
      }

      // Add Invoice
      const newInv = {
        id: `inv_${Date.now()}`,
        invoiceNumber: `INV-REST-${Date.now().toString().slice(-4)}`,
        guestName: ord.customerName || `Table ${ord.tableNumber}`,
        roomNumber: null,
        roomTotal: 0.0,
        diningTotal: Number(ord.totalAmount),
        tax: Number((ord.totalAmount * 0.1).toFixed(2)),
        netTotal: Number((ord.totalAmount * 1.1).toFixed(2)),
        paidAmount: Number((ord.totalAmount * 1.1).toFixed(2)),
        balanceDue: 0.0,
        status: 'Paid',
        paymentMethod: 'Credit Card / Cash POS',
        date: new Date().toISOString().split('T')[0]
      };
      setInvoices(prev => [newInv, ...prev]);
    }

    handleUpdateOrderStatus(orderId, 'PAID', 'Dine-in bill settled by waiter');
  };

  // --- DELIVERY & CART ACTIONS ---
  const handleAddToCart = (item) => {
    if (!item) return;
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (itemId, qty) => {
    setCart(prev => {
      if (qty <= 0) return prev.filter(i => i.id !== itemId);
      return prev.map(i => i.id === itemId ? { ...i, quantity: qty } : i);
    });
  };

  const handleClearCart = () => setCart([]);

  const handlePlaceDeliveryOrder = async (orderPayload) => {
    const itemsTotal = (orderPayload.items || []).reduce((s, it) => s + it.price * it.quantity, 0);
    const newOrd = {
      id: `ord_del_${Date.now()}`,
      orderNumber: `ORD-DEL-${Date.now().toString().slice(-3)}`,
      orderType: 'DELIVERY',
      customerName: orderPayload.customerName,
      customerPhone: orderPayload.customerPhone,
      deliveryAddress: orderPayload.deliveryAddress,
      items: orderPayload.items,
      totalAmount: itemsTotal,
      status: 'PLACED',
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrd, ...prev]);

    // Add Invoice
    const newInv = {
      id: `inv_${Date.now()}`,
      invoiceNumber: `INV-DEL-${Date.now().toString().slice(-4)}`,
      guestName: orderPayload.customerName,
      roomNumber: null,
      roomTotal: 0.0,
      diningTotal: itemsTotal,
      tax: Number((itemsTotal * 0.1).toFixed(2)),
      netTotal: Number((itemsTotal * 1.1 + 4.5).toFixed(2)),
      paidAmount: Number((itemsTotal * 1.1 + 4.5).toFixed(2)),
      balanceDue: 0.0,
      status: 'Paid',
      paymentMethod: orderPayload.paymentMethod || 'Online Payment',
      date: new Date().toISOString().split('T')[0]
    };
    setInvoices(prev => [newInv, ...prev]);

    try {
      await fetch('/api/orders/delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    } catch (e) {}
  };

  const handleCompleteDelivery = async (orderId) => {
    handleUpdateOrderStatus(orderId, 'DELIVERED', 'Delivered to customer doorstep');
  };

  // --- HOUSEKEEPING ACTIONS ---
  const handleUpdateHousekeepingStatus = async (taskId, newStatus) => {
    setHousekeepingTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, status: newStatus, completedAt: newStatus === 'Cleaned' ? new Date().toISOString() : t.completedAt };
      }
      return t;
    }));

    if (newStatus === 'Cleaned') {
      const task = housekeepingTasks.find(t => t.id === taskId);
      if (task) {
        setRooms(prev => prev.map(r => {
          if (r.id === task.roomId || r.number === task.roomNumber) {
            return { ...r, status: 'Available', cleaningStatus: 'Clean' };
          }
          return r;
        }));
      }
    }

    try {
      await fetch(`/api/housekeeping/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {}
  };

  const handleCreateHousekeepingTask = async (taskData) => {
    const newHK = {
      id: `hk_${Date.now()}`,
      ...taskData,
      status: 'Pending',
      scheduledAt: new Date().toISOString(),
      completedAt: null
    };

    setHousekeepingTasks(prev => [newHK, ...prev]);

    try {
      await fetch('/api/housekeeping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
    } catch (e) {}
  };

  // --- INVENTORY ACTIONS ---
  const handleRestock = async (itemId, newStock) => {
    setInventory(prev => prev.map(it => {
      if (it.id === itemId) {
        return { 
          ...it, 
          currentStock: newStock,
          status: newStock > it.minThreshold ? 'Optimal' : 'Low Stock'
        };
      }
      return it;
    }));

    try {
      await fetch(`/api/inventory/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStock: newStock })
      });
    } catch (e) {}
  };

  // --- INVOICES ACTIONS ---
  const handlePayInvoice = async (invoiceId) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return { ...inv, status: 'Paid', paidAmount: inv.netTotal, balanceDue: 0.0 };
      }
      return inv;
    }));

    try {
      await fetch(`/api/invoices/${invoiceId}/pay`, { method: 'POST' });
    } catch (e) {}
  };

  const totalCartCount = (cart || []).reduce((sum, i) => sum + (i.quantity || 0), 0);

  return (
    <div className="ihg-app-layout">
      {/* Top Header & Role Switcher */}
      <Header 
        currentRole={currentRole}
        setCurrentRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setShowCartModal(true)}
        onOpenAI={() => setShowAIModal(true)}
      />

      {/* Main View Area */}
      <main className="main-content-area container">
        {activeTab === 'overview' && (
          <GMDashboard 
            analytics={analytics}
            inventory={inventory || []}
            rooms={rooms || []}
            orders={orders || []}
            bookings={bookings || []}
            onRestock={handleRestock}
            onNavigate={(tab) => setActiveTab(tab)}
            onRefresh={fetchAllData}
          />
        )}

        {activeTab === 'hotel' && (
          <HotelView 
            rooms={rooms || []}
            bookings={bookings || []}
            onBookRoom={handleBookRoom}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onRequestRoomService={handleRequestRoomService}
            onUpdateRoomStatus={handleUpdateRoomStatus}
            onAddNewRoom={handleAddNewRoom}
            onViewInvoice={(invId) => setActiveTab('invoices')}
          />
        )}

        {activeTab === 'restaurant' && (
          <RestaurantView 
            tables={tables || []}
            menuItems={menuItems || []}
            tableReservations={tableReservations || []}
            orders={orders || []}
            onCreateDineInOrder={handleCreateDineInOrder}
            onCreateReservation={handleCreateReservation}
            onSettleBill={handleSettleBill}
          />
        )}

        {activeTab === 'kds' && (
          <KDSView 
            orders={orders || []}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onRefresh={fetchAllData}
          />
        )}

        {activeTab === 'delivery' && (
          <DeliveryView 
            menuItems={menuItems || []}
            cart={cart || []}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onClearCart={handleClearCart}
            orders={orders || []}
            onPlaceDeliveryOrder={handlePlaceDeliveryOrder}
            onOpenCart={() => setShowCartModal(true)}
            showCartModal={showCartModal}
            setShowCartModal={setShowCartModal}
          />
        )}

        {activeTab === 'housekeeping' && (
          <HousekeepingView 
            housekeepingTasks={housekeepingTasks || []}
            rooms={rooms || []}
            onUpdateHousekeepingStatus={handleUpdateHousekeepingStatus}
            onCreateHousekeepingTask={handleCreateHousekeepingTask}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryView 
            inventory={inventory || []}
            onRestock={handleRestock}
          />
        )}

        {activeTab === 'invoices' && (
          <InvoicesView 
            invoices={invoices || []}
            onPayInvoice={handlePayInvoice}
          />
        )}

        {activeTab === 'rider' && (
          <RiderView 
            orders={orders || []}
            onCompleteDelivery={handleCompleteDelivery}
          />
        )}
      </main>

      {/* 24/7 AI Concierge Floating Button & Modal */}
      <AIChatModal 
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onNavigate={(tab) => setActiveTab(tab)}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="ihg-footer">
        <div className="container flex items-center justify-between">
          <div className="text-xs text-muted">
            © 2026 Grand Aurelia Luxury Hotel & Resort. All rights reserved. Enterprise Hospitality Management.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Primary Brand: #1F3A5F</span>
            <span>Secondary CTA: #FF2147</span>
            <span>Live System: <strong className="text-success">Interactive & Operational</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
