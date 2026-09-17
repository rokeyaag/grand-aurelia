import React, { useState } from 'react';
import { 
  ChefHat, 
  Clock, 
  Flame, 
  CheckCircle2, 
  UtensilsCrossed, 
  Bike, 
  AlertCircle, 
  Check, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KDSView({ orders, onUpdateOrderStatus, onRefresh }) {
  const [filterType, setFilterType] = useState('ACTIVE');

  // Filter orders for KDS
  const activeOrders = orders.filter(o => {
    if (filterType === 'ACTIVE') return o.status === 'PLACED' || o.status === 'PREPARING' || o.status === 'READY';
    if (filterType === 'DINE_IN') return o.orderType === 'DINE_IN' && o.status !== 'PAID';
    if (filterType === 'DELIVERY') return o.orderType === 'DELIVERY' && o.status !== 'DELIVERED';
    return true; // ALL
  });

  const handleStatusChange = (orderId, newStatus, note) => {
    onUpdateOrderStatus(orderId, newStatus, note);
    if (newStatus === 'READY' || newStatus === 'SERVED') {
      confetti({ particleCount: 50, spread: 45 });
    }
  };

  return (
    <div className="kds-view-container animate-fade-in">
      {/* Top KDS Header */}
      <div className="kds-header-bar">
        <div className="flex items-center gap-3">
          <div className="kds-icon-box">
            <ChefHat size={28} />
          </div>
          <div>
            <h2>Kitchen Display System (KDS)</h2>
            <p className="kds-subtitle">Real-time culinary queue for Chefs, Cook lines, and Dispatch</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="kds-filter-tabs">
            <button 
              className={`kds-tab ${filterType === 'ACTIVE' ? 'active' : ''}`}
              onClick={() => setFilterType('ACTIVE')}
            >
              Active Queue ({orders.filter(o => ['PLACED', 'PREPARING', 'READY'].includes(o.status)).length})
            </button>
            <button 
              className={`kds-tab ${filterType === 'DINE_IN' ? 'active' : ''}`}
              onClick={() => setFilterType('DINE_IN')}
            >
              Dine-In Tables
            </button>
            <button 
              className={`kds-tab ${filterType === 'DELIVERY' ? 'active' : ''}`}
              onClick={() => setFilterType('DELIVERY')}
            >
              Online Delivery
            </button>
            <button 
              className={`kds-tab ${filterType === 'ALL' ? 'active' : ''}`}
              onClick={() => setFilterType('ALL')}
            >
              All Orders
            </button>
          </div>

          <button className="btn btn-outline btn-sm" onClick={onRefresh}>
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      {activeOrders.length === 0 ? (
        <div className="card empty-kds-card">
          <CheckCircle2 size={48} className="text-success" />
          <h3>All Kitchen Orders are Clear!</h3>
          <p className="text-secondary">No pending orders in the kitchen queue. Great job Chef!</p>
        </div>
      ) : (
        <div className="kds-orders-grid">
          {activeOrders.map(order => {
            const isDineIn = order.orderType === 'DINE_IN';
            const isPlaced = order.status === 'PLACED' || order.status === 'ORDER_PLACED';
            const isPreparing = order.status === 'PREPARING';
            const isReady = order.status === 'READY';
            const isDelivering = order.status === 'OUT_FOR_DELIVERY';

            return (
              <div 
                key={order.id} 
                className={`kds-order-card card ${
                  isPlaced ? 'border-placed' : isPreparing ? 'border-cooking' : 'border-ready'
                }`}
              >
                {/* Header of Ticket */}
                <div className="kds-ticket-header">
                  <div>
                    <span className="kds-ticket-number">{order.orderNumber}</span>
                    <span className={`kds-type-badge ${isDineIn ? 'dine-in' : 'delivery'}`}>
                      {isDineIn ? (
                        <>
                          <UtensilsCrossed size={13} /> Table {order.tableNumber}
                        </>
                      ) : (
                        <>
                          <Bike size={13} /> Food Delivery
                        </>
                      )}
                    </span>
                  </div>

                  <div className="kds-status-indicator">
                    <span className={`badge badge-${
                      isPlaced ? 'danger' : isPreparing ? 'warning' : 'success'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Sub info */}
                <div className="kds-ticket-meta">
                  <span>Guest: <strong>{order.customerName}</strong></span>
                  {isDineIn && <span>Waiter: {order.waiterName}</span>}
                  <span>Placed: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Items Checklist */}
                <div className="kds-items-list">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="kds-item-row">
                      <div className="flex items-center gap-2">
                        <span className="kds-item-qty">{item.quantity}x</span>
                        <div>
                          <span className="kds-item-name">{item.name}</span>
                          {item.notes && <span className="kds-item-note">Note: {item.notes}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Special Delivery note if any */}
                {order.deliveryNotes && (
                  <div className="kds-special-note">
                    <AlertCircle size={14} /> {order.deliveryNotes}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="kds-ticket-actions">
                  {isPlaced && (
                    <button 
                      className="btn btn-accent btn-sm w-full" 
                      onClick={() => handleStatusChange(order.id, 'PREPARING', 'Kitchen started cooking')}
                    >
                      <Flame size={15} /> Start Cooking Now
                    </button>
                  )}

                  {isPreparing && (
                    <button 
                      className="btn btn-primary btn-sm w-full" 
                      onClick={() => handleStatusChange(
                        order.id, 
                        isDineIn ? 'READY' : 'OUT_FOR_DELIVERY',
                        isDineIn ? 'Order ready on pass' : 'Handed over to delivery rider'
                      )}
                    >
                      <Check size={15} /> {isDineIn ? 'Mark Ready for Table' : 'Ready / Hand to Rider'}
                    </button>
                  )}

                  {isReady && isDineIn && (
                    <button 
                      className="btn btn-outline btn-sm w-full" 
                      onClick={() => handleStatusChange(order.id, 'SERVED', 'Food served to table')}
                    >
                      <CheckCircle2 size={15} /> Mark Served
                    </button>
                  )}

                  {isDelivering && (
                    <div className="badge badge-info w-full justify-center py-2">
                      <Bike size={14} /> Out for Delivery with Rider
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
