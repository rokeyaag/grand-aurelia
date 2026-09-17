import React, { useState } from 'react';
import { 
  Building2, 
  Bed, 
  Users, 
  Maximize2, 
  Calendar, 
  CheckCircle2, 
  LogOut, 
  LogIn, 
  Plus, 
  Sparkles, 
  Bell, 
  Search, 
  Filter,
  Check,
  Receipt,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HotelView({ 
  rooms, 
  bookings, 
  onBookRoom, 
  onCheckIn, 
  onCheckOut, 
  onRequestRoomService 
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [selectedRoomForService, setSelectedRoomForService] = useState(null);

  // Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-09-17');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-21');
  const [nights, setNights] = useState(4);
  const [totalGuests, setTotalGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');

  // Service Request State
  const [serviceType, setServiceType] = useState('In-Room Dining');
  const [serviceDetails, setServiceDetails] = useState('');

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filterStatus === 'ALL' || room.status.toUpperCase() === filterStatus;
    const matchesSearch = room.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.number.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleOpenBooking = (room) => {
    setSelectedRoomForBooking(room);
  };

  const submitBooking = (e) => {
    e.preventDefault();
    if (!guestName || !selectedRoomForBooking) return;

    onBookRoom({
      roomId: selectedRoomForBooking.id,
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      nights: Number(nights) || 1,
      totalGuests: Number(totalGuests) || 1,
      specialRequests
    });

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    setSelectedRoomForBooking(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setSpecialRequests('');
  };

  const submitRoomService = (e) => {
    e.preventDefault();
    if (!serviceDetails || !selectedRoomForService) return;

    onRequestRoomService({
      roomNumber: selectedRoomForService.number,
      guestName: selectedRoomForService.currentGuest || 'Guest',
      serviceType,
      details: serviceDetails,
      amount: serviceType === 'In-Room Dining' ? 25.00 : 0
    });

    setSelectedRoomForService(null);
    setServiceDetails('');
  };

  return (
    <div className="hotel-view-container animate-fade-in">
      {/* Header & Controls */}
      <div className="section-header-row">
        <div>
          <h2>Luxury Hotel Accommodations</h2>
          <p className="text-secondary">
            Manage room reservations, instant front-desk guest check-in/out, and in-room amenities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search room suite or number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-pills-bar">
        {['ALL', 'AVAILABLE', 'OCCUPIED', 'CLEANING', 'MAINTENANCE'].map((status) => (
          <button
            key={status}
            className={`filter-pill ${filterStatus === status ? 'active' : ''}`}
            onClick={() => setFilterStatus(status)}
          >
            {status} ({status === 'ALL' ? rooms.length : rooms.filter(r => r.status.toUpperCase() === status).length})
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {filteredRooms.map((room) => {
          const isAvailable = room.status === 'Available';
          const isOccupied = room.status === 'Occupied';
          const isCleaning = room.status === 'Cleaning';

          return (
            <div key={room.id} className={`room-card card ${room.status.toLowerCase()}`}>
              <div className="room-image-container">
                <img src={room.image} alt={room.type} className="room-image" />
                <span className={`room-status-badge badge badge-${
                  isAvailable ? 'success' : isOccupied ? 'warning' : 'danger'
                }`}>
                  {room.status}
                </span>
                <span className="room-number-tag">Suite {room.number}</span>
              </div>

              <div className="room-content">
                <div className="flex items-center justify-between mb-1">
                  <span className="room-tier-badge">{room.tier}</span>
                  <span className="room-floor-tag">Floor {room.floor}</span>
                </div>

                <h3 className="room-title">{room.type}</h3>

                <div className="room-specs-row">
                  <span className="room-spec-item"><Bed size={15} /> {room.bedType}</span>
                  <span className="room-spec-item"><Users size={15} /> Max {room.capacity} Guests</span>
                  <span className="room-spec-item"><Maximize2 size={15} /> {room.size}</span>
                </div>

                <div className="room-amenities-tags">
                  {room.amenities.slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="amenity-tag">✓ {amenity}</span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="amenity-tag">+{room.amenities.length - 4} more</span>
                  )}
                </div>

                {isOccupied && (
                  <div className="occupied-guest-box">
                    <span className="text-xs text-muted block">Current Guest:</span>
                    <strong className="text-sm text-primary">{room.currentGuest || 'Registered Guest'}</strong>
                  </div>
                )}

                <div className="room-footer-row">
                  <div className="room-price-box">
                    <span className="price-amount">${room.pricePerNight}</span>
                    <span className="price-period">/ night</span>
                  </div>

                  <div className="room-action-buttons">
                    {isAvailable && (
                      <button 
                        className="btn btn-accent btn-sm" 
                        onClick={() => handleOpenBooking(room)}
                      >
                        <Calendar size={15} /> Book Suite
                      </button>
                    )}

                    {isOccupied && (
                      <div className="flex items-center gap-1">
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => setSelectedRoomForService(room)}
                          title="Request In-Room Service"
                        >
                          <Bell size={14} /> Service
                        </button>
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => {
                            const b = bookings.find(b => b.roomId === room.id && b.status === 'Checked-In') || bookings[0];
                            if (b) onCheckOut(b.id);
                          }}
                          title="Check-out guest & generate invoice"
                        >
                          <LogOut size={14} /> Check-out
                        </button>
                      </div>
                    )}

                    {isCleaning && (
                      <span className="badge badge-warning">
                        <Sparkles size={12} /> Housekeeping in progress
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Bookings Master Table */}
      <div className="card mt-6">
        <div className="section-title-row">
          <div>
            <h3>Front Desk Guest Register & Bookings</h3>
            <p className="section-desc">Real-time check-in and checkout management</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="ihg-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Guest Name</th>
                <th>Room</th>
                <th>Stay Dates</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((bk) => (
                <tr key={bk.id}>
                  <td><strong>{bk.bookingNumber}</strong></td>
                  <td>
                    <div className="font-semibold">{bk.guestName}</div>
                    <div className="text-xs text-muted">{bk.guestPhone}</div>
                  </td>
                  <td><span className="badge badge-primary">Suite {bk.roomNumber}</span></td>
                  <td>{bk.checkInDate} → {bk.checkOutDate}</td>
                  <td>{bk.nights} nights</td>
                  <td><strong>${bk.totalAmount}</strong></td>
                  <td>
                    <span className="badge badge-success">{bk.paymentStatus}</span>
                  </td>
                  <td>
                    <span className={`badge badge-${
                      bk.status === 'Checked-In' ? 'success' : bk.status === 'Confirmed' ? 'info' : 'primary'
                    }`}>
                      {bk.status}
                    </span>
                  </td>
                  <td>
                    {bk.status === 'Confirmed' && (
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => onCheckIn(bk.id)}
                      >
                        <LogIn size={13} /> Check-In
                      </button>
                    )}
                    {bk.status === 'Checked-In' && (
                      <button 
                        className="btn btn-outline btn-sm" 
                        onClick={() => onCheckOut(bk.id)}
                      >
                        <LogOut size={13} /> Check-Out
                      </button>
                    )}
                    {bk.status === 'Checked-Out' && (
                      <span className="text-xs text-muted">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Room Modal */}
      {selectedRoomForBooking && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Building2 size={20} className="text-accent" />
                <h3>Reserve {selectedRoomForBooking.type} (Suite {selectedRoomForBooking.number})</h3>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedRoomForBooking(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitBooking} className="modal-body">
              <div className="form-group">
                <label>Primary Guest Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Dr. Sarah Mahmud" 
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="sarah@example.com" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+880 1819..." 
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-In Date</label>
                  <input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Check-Out Date</label>
                  <input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nights</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={nights}
                    onChange={(e) => setNights(Number(e.target.value))}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Total Guests</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={selectedRoomForBooking.capacity} 
                    value={totalGuests}
                    onChange={(e) => setTotalGuests(Number(e.target.value))}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests / Preferences</label>
                <textarea 
                  rows="2" 
                  placeholder="e.g. Quiet room, extra pillows, late checkout..." 
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              {/* Price Calculation Box */}
              <div className="booking-summary-box">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>${selectedRoomForBooking.pricePerNight} × {nights} Nights</span>
                  <span>${selectedRoomForBooking.pricePerNight * nights}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Hotel Service & Tax</span>
                  <span className="text-success">Complimentary Demo</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total Due:</span>
                  <span className="text-accent">${selectedRoomForBooking.pricePerNight * nights}</span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedRoomForBooking(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent">
                  <Check size={16} /> Confirm & Reserve Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-Room Service Modal */}
      {selectedRoomForService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-primary" />
                <h3>Room Service Request (Suite {selectedRoomForService.number})</h3>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedRoomForService(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitRoomService} className="modal-body">
              <div className="form-group">
                <label>Service Category</label>
                <select 
                  value={serviceType} 
                  onChange={(e) => setServiceType(e.target.value)}
                  className="form-control"
                >
                  <option value="In-Room Dining">In-Room Dining & Refreshments</option>
                  <option value="Housekeeping Amenities">Fresh Towels, Linen & Dental Kit</option>
                  <option value="Room Cleaning">Quick Room Refresh & Trash Clear</option>
                  <option value="Maintenance">Luggage Assistance / Tech Support</option>
                </select>
              </div>

              <div className="form-group">
                <label>Details & Specific Instructions *</label>
                <textarea 
                  required
                  rows="3" 
                  placeholder="Specify what you'd like delivered or serviced..." 
                  value={serviceDetails}
                  onChange={(e) => setServiceDetails(e.target.value)}
                  className="form-control"
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedRoomForService(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Sparkles size={16} /> Dispatch Service Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
