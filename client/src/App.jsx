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

export default function App() {
  const [currentRole, setCurrentRole] = useState('ADMIN_GM');
  const [activeTab, setActiveTab] = useState('overview');

  // Core Data States with resilient defaults
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableReservations, setTableReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [housekeepingTasks, setHousekeepingTasks] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  // Cart & Modals
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);

  // Safe fetch helper
  const safeFetchJson = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.warn(`[API Notice] ${url} responded with status ${res.status}`);
        return null;
      }
      return await res.json();
    } catch (err) {
      console.warn(`[API Network Notice] ${url} error:`, err);
      return null;
    }
  };

  // Initial & Periodic Data Fetch
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

      if (Array.isArray(roomsRes)) setRooms(roomsRes);
      if (Array.isArray(bookingsRes)) setBookings(bookingsRes);
      if (Array.isArray(tablesRes)) setTables(tablesRes);
      if (Array.isArray(tableResRes)) setTableReservations(tableResRes);
      if (Array.isArray(menuRes)) setMenuItems(menuRes);
      if (Array.isArray(ordersRes)) setOrders(ordersRes);
      if (Array.isArray(hkRes)) setHousekeepingTasks(hkRes);
      if (Array.isArray(invRes)) setInventory(invRes);
      if (Array.isArray(invoicesRes)) setInvoices(invoicesRes);
      if (analyticsRes && analyticsRes.kpis) setAnalytics(analyticsRes);
    } catch (err) {
      console.error('Error fetching platform data:', err);
    }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(fetchAllData, 10000);
    return () => clearInterval(interval);
  }, []);

  // When role changes, switch to relevant default tab
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'FRONT_DESK') setActiveTab('hotel');
    else if (newRole === 'KITCHEN_CHEF') setActiveTab('kds');
    else if (newRole === 'HOUSEKEEPING') setActiveTab('housekeeping');
    else if (newRole === 'WAITER') setActiveTab('restaurant');
    else if (newRole === 'DELIVERY_RIDER') setActiveTab('rider');
    else if (newRole === 'GUEST_CUSTOMER') setActiveTab('delivery');
  };

  // --- HOTEL ACTIONS ---
  const handleBookRoom = async (bookingData) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Booking error:', e); }
  };

  const handleCheckIn = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/checkin`, { method: 'POST' });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Check-in error:', e); }
  };

  const handleCheckOut = async (bookingId) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/checkout`, { method: 'POST' });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Check-out error:', e); }
  };

  const handleRequestRoomService = async (serviceData) => {
    try {
      const res = await fetch('/api/in-room-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Room service error:', e); }
  };

  // --- RESTAURANT & KDS ACTIONS ---
  const handleCreateDineInOrder = async (orderData) => {
    try {
      const res = await fetch('/api/orders/dine-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Dine-in order error:', e); }
  };

  const handleCreateReservation = async (resData) => {
    try {
      const res = await fetch('/api/table-reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resData)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Reservation error:', e); }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus, note) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note })
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Order update error:', e); }
  };

  const handleSettleBill = async (orderId) => {
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
    try {
      const res = await fetch('/api/orders/delivery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Delivery order error:', e); }
  };

  const handleCompleteDelivery = async (orderId) => {
    handleUpdateOrderStatus(orderId, 'DELIVERED', 'Delivered to customer doorstep');
  };

  // --- HOUSEKEEPING ACTIONS ---
  const handleUpdateHousekeepingStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch(`/api/housekeeping/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Housekeeping update error:', e); }
  };

  const handleCreateHousekeepingTask = async (taskData) => {
    try {
      const res = await fetch('/api/housekeeping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Housekeeping task error:', e); }
  };

  // --- INVENTORY ACTIONS ---
  const handleRestock = async (itemId, newStock) => {
    try {
      const res = await fetch(`/api/inventory/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStock: newStock })
      });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Inventory restock error:', e); }
  };

  // --- INVOICES ACTIONS ---
  const handlePayInvoice = async (invoiceId) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, { method: 'POST' });
      if (res.ok) fetchAllData();
    } catch (e) { console.error('Invoice settlement error:', e); }
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
            © 2026 International Hospitality Group (IHG). All rights reserved. Enterprise Management System.
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Primary Brand: #1F3A5F</span>
            <span>Secondary CTA: #FF2147</span>
            <span>API Server: <strong className="text-success">Connected (Port 5000)</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
