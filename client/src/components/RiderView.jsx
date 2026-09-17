import React from 'react';
import { 
  Bike, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Package, 
  Navigation,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RiderView({ orders, onCompleteDelivery }) {
  const deliveryOrders = orders.filter(o => o.orderType === 'DELIVERY');
  const activeDeliveries = deliveryOrders.filter(o => o.status === 'OUT_FOR_DELIVERY' || o.status === 'PREPARING');
  const completedDeliveries = deliveryOrders.filter(o => o.status === 'DELIVERED');

  const handleMarkDelivered = (orderId) => {
    onCompleteDelivery(orderId);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="rider-view-container animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2>Delivery Fleet & Courier Dispatch</h2>
          <p className="text-secondary">
            Rider route management, real-time handoff verification, and delivery completion.
          </p>
        </div>
      </div>

      {/* Active Delivery Cards */}
      <div className="section-title-row mt-4">
        <h3>Active Deliveries in Transit</h3>
        <span className="badge badge-accent">{activeDeliveries.length} Active Trips</span>
      </div>

      {activeDeliveries.length === 0 ? (
        <div className="card empty-state-card">
          <CheckCircle2 size={40} className="text-success" />
          <h4>No active deliveries at the moment</h4>
          <p className="text-secondary text-sm">New online orders will appear here once dispatched from the kitchen.</p>
        </div>
      ) : (
        <div className="rider-cards-grid">
          {activeDeliveries.map(order => (
            <div key={order.id} className="rider-card card">
              <div className="flex items-center justify-between mb-3">
                <span className="rider-order-badge">{order.orderNumber}</span>
                <span className="badge badge-warning">
                  <Clock size={12} /> {order.status}
                </span>
              </div>

              <div className="rider-customer-box">
                <span className="text-xs text-muted block">Deliver To:</span>
                <h4 className="font-bold text-base">{order.customerName}</h4>
                <div className="flex items-center gap-1 text-sm text-primary font-medium mt-1">
                  <Phone size={14} /> {order.customerPhone}
                </div>
              </div>

              <div className="rider-address-box mt-2">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                  <div>
                    <span className="text-sm font-medium">{order.deliveryAddress}</span>
                    {order.deliveryNotes && (
                      <p className="text-xs text-secondary mt-1 italic">
                        "{order.deliveryNotes}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Items package */}
              <div className="rider-items-box mt-3">
                <span className="text-xs text-muted block mb-1">Order Package:</span>
                {order.items.map((item, i) => (
                  <div key={i} className="text-xs flex items-center justify-between py-0.5">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="rider-footer mt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted">Amount Collectable:</span>
                  <strong className="text-accent text-base">
                    {order.paymentStatus === 'Paid' ? 'PAID ONLINE' : `$${order.total.toFixed(2)} CASH`}
                  </strong>
                </div>

                <button 
                  className="btn btn-accent w-full" 
                  onClick={() => handleMarkDelivered(order.id)}
                >
                  <CheckCircle2 size={16} /> Mark Successfully Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Trips */}
      {completedDeliveries.length > 0 && (
        <div className="card mt-6">
          <h3>Completed Deliveries Today</h3>
          <div className="table-responsive mt-3">
            <table className="ihg-table">
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedDeliveries.map(o => (
                  <tr key={o.id}>
                    <td><strong>{o.orderNumber}</strong></td>
                    <td>{o.customerName}</td>
                    <td className="text-xs">{o.deliveryAddress}</td>
                    <td><strong>${o.total.toFixed(2)}</strong></td>
                    <td><span className="badge badge-success">{o.paymentStatus}</span></td>
                    <td><span className="badge badge-success">✓ DELIVERED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
