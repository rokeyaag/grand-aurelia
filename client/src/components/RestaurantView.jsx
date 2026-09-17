import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  Receipt, 
  CheckCircle, 
  X, 
  Search, 
  Sparkles,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RestaurantView({ 
  tables, 
  menuItems, 
  tableReservations, 
  orders, 
  onCreateDineInOrder, 
  onCreateReservation,
  onSettleBill 
}) {
  const [selectedTableForOrder, setSelectedTableForOrder] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  // Reservation Form State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [resDate, setResDate] = useState('2026-09-17');
  const [resTime, setResTime] = useState('19:30');
  const [guestCount, setGuestCount] = useState(2);
  const [selectedTableNum, setSelectedTableNum] = useState(tables[0]?.number || 'T-01');
  const [specialReq, setSpecialReq] = useState('');

  // Waiter Order Form State
  const [orderItems, setOrderItems] = useState({});
  const [waiterName, setWaiterName] = useState('Tanvir Hossain');

  const handleAddItemToOrder = (itemId) => {
    setOrderItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleRemoveItemFromOrder = (itemId) => {
    setOrderItems(prev => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const submitDineInOrder = (e) => {
    e.preventDefault();
    if (!selectedTableForOrder) return;

    const items = Object.keys(orderItems).map(itemId => {
      const item = menuItems.find(m => m.id === itemId);
      return {
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: orderItems[itemId],
        notes: ''
      };
    });

    if (items.length === 0) {
      alert('Please add at least one dish to the order.');
      return;
    }

    onCreateDineInOrder({
      tableNumber: selectedTableForOrder.number,
      waiterName,
      items
    });

    confetti({ particleCount: 60, spread: 50 });
    setSelectedTableForOrder(null);
    setOrderItems({});
  };

  const submitReservation = (e) => {
    e.preventDefault();
    if (!custName || !custPhone) return;

    onCreateReservation({
      customerName: custName,
      phone: custPhone,
      guestsCount: Number(guestCount),
      tableNumber: selectedTableNum,
      section: tables.find(t => t.number === selectedTableNum)?.section || 'Main Dining',
      date: resDate,
      timeSlot: resTime,
      specialRequests: specialReq
    });

    setShowReservationModal(false);
    setCustName('');
    setCustPhone('');
    setSpecialReq('');
  };

  return (
    <div className="restaurant-view-container animate-fade-in">
      {/* Header & Actions */}
      <div className="section-header-row">
        <div>
          <h2>Fine Dining & Table Management</h2>
          <p className="text-secondary">
            Floor layout, waiter POS ordering directly linked to Kitchen KDS, and table reservations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn btn-accent" onClick={() => setShowReservationModal(true)}>
            <Calendar size={16} /> Reserve a Table
          </button>
        </div>
      </div>

      {/* Tables Floor Plan Grid */}
      <div className="section-title-row mt-4">
        <h3>Restaurant Floor Map</h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1"><span className="status-indicator available"></span> Available</span>
          <span className="flex items-center gap-1"><span className="status-indicator occupied"></span> Occupied</span>
          <span className="flex items-center gap-1"><span className="status-indicator reserved"></span> Reserved</span>
        </div>
      </div>

      <div className="tables-grid">
        {tables.map(tbl => {
          const isAvailable = tbl.status === 'Available';
          const isOccupied = tbl.status === 'Occupied';
          const isReserved = tbl.status === 'Reserved';

          const activeOrder = orders.find(o => o.tableNumber === tbl.number && o.status !== 'PAID' && o.status !== 'CANCELLED');

          return (
            <div key={tbl.id} className={`table-card card ${tbl.status.toLowerCase()}`}>
              <div className="table-card-top">
                <span className="table-number-badge">{tbl.number}</span>
                <span className={`badge badge-${
                  isAvailable ? 'success' : isOccupied ? 'warning' : 'primary'
                }`}>
                  {tbl.status}
                </span>
              </div>

              <div className="table-card-body">
                <span className="table-section-tag">{tbl.section}</span>
                <div className="flex items-center gap-1 text-sm text-secondary mt-1">
                  <Users size={15} /> Capacity: {tbl.capacity} Seats
                </div>

                {isOccupied && activeOrder && (
                  <div className="table-active-order-box">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>Order #{activeOrder.orderNumber.slice(-4)}</span>
                      <span className="text-accent">${activeOrder.total.toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-muted block">{activeOrder.items.length} dishes in kitchen</span>
                  </div>
                )}
              </div>

              <div className="table-card-footer">
                {isAvailable && (
                  <button 
                    className="btn btn-primary btn-sm w-full" 
                    onClick={() => {
                      setSelectedTableForOrder(tbl);
                      setOrderItems({});
                    }}
                  >
                    <Plus size={14} /> Waiter POS Order
                  </button>
                )}

                {isOccupied && activeOrder && (
                  <button 
                    className="btn btn-accent btn-sm w-full" 
                    onClick={() => onSettleBill(activeOrder.id)}
                  >
                    <Receipt size={14} /> Settle Bill (${activeOrder.total.toFixed(2)})
                  </button>
                )}

                {isReserved && (
                  <button 
                    className="btn btn-outline btn-sm w-full" 
                    onClick={() => {
                      setSelectedTableForOrder(tbl);
                      setOrderItems({});
                    }}
                  >
                    Seat Guests & Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Reservations Register */}
      <div className="card mt-6">
        <div className="section-title-row">
          <div>
            <h3>Upcoming Dining Reservations</h3>
            <p className="section-desc">Guest table bookings and VIP anniversary setups</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="ihg-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Guest Name</th>
                <th>Contact</th>
                <th>Table</th>
                <th>Section</th>
                <th>Date & Time</th>
                <th>Guests</th>
                <th>Special Requests</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableReservations.map(res => (
                <tr key={res.id}>
                  <td><strong>{res.reservationNumber}</strong></td>
                  <td className="font-semibold">{res.customerName}</td>
                  <td>{res.phone}</td>
                  <td><span className="badge badge-primary">{res.tableNumber}</span></td>
                  <td>{res.section}</td>
                  <td>{res.date} at {res.timeSlot}</td>
                  <td>{res.guestsCount} Guests</td>
                  <td className="text-xs text-secondary">{res.specialRequests || 'Standard setup'}</td>
                  <td><span className="badge badge-success">{res.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waiter POS Modal */}
      {selectedTableForOrder && (
        <div className="modal-overlay">
          <div className="modal-content modal-lg">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <UtensilsCrossed size={20} className="text-accent" />
                <h3>Waiter Order Taking — Table {selectedTableForOrder.number} ({selectedTableForOrder.section})</h3>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedTableForOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitDineInOrder} className="modal-body">
              <div className="form-group">
                <label>Serving Waiter</label>
                <input 
                  type="text" 
                  value={waiterName}
                  onChange={(e) => setWaiterName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="pos-menu-selection-grid">
                {menuItems.map(item => {
                  const qty = orderItems[item.id] || 0;
                  return (
                    <div key={item.id} className="pos-menu-item-card">
                      <img src={item.image} alt={item.name} className="pos-item-img" />
                      <div className="pos-item-info">
                        <span className="font-semibold text-sm">{item.name}</span>
                        <span className="text-accent font-bold text-sm">${item.price.toFixed(2)}</span>
                      </div>
                      <div className="pos-item-counter">
                        {qty > 0 ? (
                          <div className="flex items-center gap-2">
                            <button type="button" className="btn-counter" onClick={() => handleRemoveItemFromOrder(item.id)}>-</button>
                            <span className="font-bold">{qty}</span>
                            <button type="button" className="btn-counter" onClick={() => handleAddItemToOrder(item.id)}>+</button>
                          </div>
                        ) : (
                          <button 
                            type="button" 
                            className="btn btn-outline btn-sm" 
                            onClick={() => handleAddItemToOrder(item.id)}
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="booking-summary-box mt-3">
                <h4>Order Summary</h4>
                {Object.keys(orderItems).length === 0 ? (
                  <p className="text-xs text-muted">No items selected yet.</p>
                ) : (
                  <div className="order-summary-items-list">
                    {Object.keys(orderItems).map(itemId => {
                      const item = menuItems.find(m => m.id === itemId);
                      return (
                        <div key={itemId} className="flex items-center justify-between text-sm py-1 border-b">
                          <span>{orderItems[itemId]}x {item.name}</span>
                          <span className="font-semibold">${(item.price * orderItems[itemId]).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedTableForOrder(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent">
                  <Sparkles size={16} /> Fire Order to Kitchen KDS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Reservation Modal */}
      {showReservationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-accent" />
                <h3>Reserve Fine Dining Table</h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowReservationModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitReservation} className="modal-body">
              <div className="form-group">
                <label>Customer Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Ashfaqur Rahman" 
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Contact Phone *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+880 1711..." 
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Time Slot</label>
                  <select 
                    value={resTime} 
                    onChange={(e) => setResTime(e.target.value)}
                    className="form-control"
                  >
                    <option value="12:30">12:30 PM (Lunch)</option>
                    <option value="14:00">02:00 PM (Lunch)</option>
                    <option value="19:30">07:30 PM (Dinner)</option>
                    <option value="20:30">08:30 PM (Dinner)</option>
                    <option value="21:30">09:30 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Select Table</label>
                  <select 
                    value={selectedTableNum} 
                    onChange={(e) => setSelectedTableNum(e.target.value)}
                    className="form-control"
                  >
                    {tables.map(t => (
                      <option key={t.id} value={t.number}>
                        {t.number} ({t.section} • {t.capacity} seats) - {t.status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Total Guests</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="12" 
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests (e.g. Candlelight, Birthday Cake)</label>
                <textarea 
                  rows="2" 
                  placeholder="Any special setup or dietary requirements..." 
                  value={specialReq}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowReservationModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent">
                  <CheckCircle size={16} /> Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
