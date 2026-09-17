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
  X,
  CreditCard,
  Eye,
  Wrench,
  Brush,
  ShieldCheck,
  Award,
  Coffee,
  Tv,
  Wifi,
  DollarSign,
  Phone,
  Mail,
  User,
  Clock,
  Car,
  Wine,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HotelView({ 
  rooms = [], 
  bookings = [], 
  onBookRoom, 
  onCheckIn, 
  onCheckOut, 
  onRequestRoomService,
  onUpdateRoomStatus,
  onAddNewRoom,
  onViewInvoice
}) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [selectedRoomForDetails, setSelectedRoomForDetails] = useState(null);
  const [selectedRoomForService, setSelectedRoomForService] = useState(null);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);
  const [bookingFilter, setBookingFilter] = useState('ALL');
  const [bookingSearch, setBookingSearch] = useState('');
  const [successToast, setSuccessToast] = useState(null);

  // Booking Form State
  const [bookingMode, setBookingMode] = useState('INSTANT'); // 'INSTANT' or 'RESERVE'
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestIdNumber, setGuestIdNumber] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
  );
  const [nights, setNights] = useState(3);
  const [totalGuests, setTotalGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card (Visa/Mastercard)');
  
  // Luxury Add-ons
  const [addonLimo, setAddonLimo] = useState(false);
  const [addonChampagne, setAddonChampagne] = useState(false);
  const [addonSpa, setAddonSpa] = useState(false);
  const [addonLateCheckout, setAddonLateCheckout] = useState(false);

  // Service Request State
  const [serviceType, setServiceType] = useState('In-Room Dining');
  const [serviceDetails, setServiceDetails] = useState('');

  // Add Room Form State
  const [newRoomNumber, setNewRoomNumber] = useState('');
  const [newRoomType, setNewRoomType] = useState('Royal Heritage Suite');
  const [newRoomTier, setNewRoomTier] = useState('Luxury Suite');
  const [newRoomFloor, setNewRoomFloor] = useState(2);
  const [newRoomPrice, setNewRoomPrice] = useState(200);
  const [newRoomBed, setNewRoomBed] = useState('1 King Bed');
  const [newRoomCapacity, setNewRoomCapacity] = useState(2);
  const [newRoomSize, setNewRoomSize] = useState('45 m²');
  const [newRoomImage, setNewRoomImage] = useState('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600');

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filterStatus === 'ALL' || room.status.toUpperCase() === filterStatus;
    const matchesSearch = room.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          room.number.includes(searchQuery) ||
                          (room.tier && room.tier.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Filter bookings
  const filteredBookings = bookings.filter(bk => {
    const matchesStatus = bookingFilter === 'ALL' || bk.status.toUpperCase() === bookingFilter;
    const matchesSearch = bk.guestName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
                          bk.roomNumber.includes(bookingSearch) ||
                          bk.bookingNumber.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate nights when dates change
  const handleCheckInDateChange = (val) => {
    setCheckInDate(val);
    const start = new Date(val);
    const end = new Date(checkOutDate);
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    setNights(diff);
  };

  const handleCheckOutDateChange = (val) => {
    setCheckOutDate(val);
    const start = new Date(checkInDate);
    const end = new Date(val);
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    setNights(diff);
  };

  const handleOpenBooking = (room) => {
    setSelectedRoomForBooking(room);
    setTotalGuests(Math.min(2, room.capacity));
    setAddonLimo(false);
    setAddonChampagne(false);
    setAddonSpa(false);
    setAddonLateCheckout(false);
  };

  // Addon pricing
  const addonsTotal = 
    (addonLimo ? 45 : 0) + 
    (addonChampagne ? 35 : 0) + 
    (addonSpa ? 30 * nights : 0) + 
    (addonLateCheckout ? 25 : 0);

  const roomBaseTotal = selectedRoomForBooking ? selectedRoomForBooking.pricePerNight * nights : 0;
  const grandTotal = roomBaseTotal + addonsTotal;

  const submitBooking = (e) => {
    e.preventDefault();
    if (!guestName || !selectedRoomForBooking) return;

    const addonsList = [];
    if (addonLimo) addonsList.push('Airport Limousine Transfer ($45)');
    if (addonChampagne) addonsList.push('Champagne & Chocolate Welcome ($35)');
    if (addonSpa) addonsList.push(`Spa & Wellness Pass ($${30 * nights})`);
    if (addonLateCheckout) addonsList.push('Late Check-Out Privilege ($25)');

    const payload = {
      roomId: selectedRoomForBooking.id,
      roomNumber: selectedRoomForBooking.number,
      guestName,
      guestEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      guestPhone: guestPhone || '+880 1800 123456',
      guestIdNumber,
      checkInDate,
      checkOutDate,
      nights: Number(nights) || 1,
      totalGuests: Number(totalGuests) || 1,
      pricePerNight: selectedRoomForBooking.pricePerNight,
      totalAmount: grandTotal,
      addons: addonsList,
      paymentMethod,
      specialRequests,
      status: bookingMode === 'INSTANT' ? 'Checked-In' : 'Confirmed'
    };

    onBookRoom(payload);

    confetti({ particleCount: 80, spread: 65, origin: { y: 0.6 } });
    showNotification(`Suite ${selectedRoomForBooking.number} booked successfully for ${guestName}!`);
    
    setSelectedRoomForBooking(null);
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestIdNumber('');
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
      amount: serviceType === 'In-Room Dining' ? 32.50 : 0
    });

    confetti({ particleCount: 40, spread: 45 });
    showNotification(`Service request dispatched to Suite ${selectedRoomForService.number}`);
    setSelectedRoomForService(null);
    setServiceDetails('');
  };

  const handleAddNewRoomSubmit = (e) => {
    e.preventDefault();
    if (!newRoomNumber) return;

    if (onAddNewRoom) {
      onAddNewRoom({
        number: newRoomNumber,
        type: newRoomType,
        tier: newRoomTier,
        floor: Number(newRoomFloor),
        pricePerNight: Number(newRoomPrice),
        capacity: Number(newRoomCapacity),
        bedType: newRoomBed,
        size: newRoomSize,
        image: newRoomImage,
        status: 'Available',
        cleaningStatus: 'Clean',
        amenities: ['High-Speed Wi-Fi', 'Smart TV', 'Air Conditioning', 'Ensuite Bathroom', 'Mini Bar']
      });
      showNotification(`Suite ${newRoomNumber} added to property registry!`);
    }

    setShowAddRoomModal(false);
    setNewRoomNumber('');
  };

  const showNotification = (msg) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleQuickStatusChange = (roomId, newStatus) => {
    if (onUpdateRoomStatus) {
      onUpdateRoomStatus(roomId, newStatus);
      showNotification(`Suite status updated to ${newStatus}`);
    }
  };

  return (
    <div className="hotel-view-container animate-fade-in">
      {/* Success Toast */}
      {successToast && (
        <div className="fixed-toast animate-fade-in">
          <CheckCircle2 size={18} className="text-success" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="section-header-row">
        <div>
          <div className="flex items-center gap-2">
            <h2>Luxury Hotel Accommodations</h2>
            <span className="badge badge-accent">5-Star Suites</span>
          </div>
          <p className="text-secondary">
            Manage luxury suites, instant front-desk reservations & check-in, housekeeping turnover, and guest folio management.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search suite, floor or tier..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {onAddNewRoom && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddRoomModal(true)}
            >
              <Plus size={16} /> Add New Suite
            </button>
          )}
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
          const isMaintenance = room.status === 'Maintenance';

          return (
            <div key={room.id} className={`room-card card ${room.status.toLowerCase()}`}>
              <div className="room-image-container" onClick={() => setSelectedRoomForDetails(room)}>
                <img src={room.image} alt={room.type} className="room-image" />
                <span className={`room-status-badge badge badge-${
                  isAvailable ? 'success' : isOccupied ? 'warning' : isCleaning ? 'info' : 'danger'
                }`}>
                  {room.status}
                </span>
                <span className="room-number-tag">Suite {room.number}</span>
                <div className="room-image-overlay">
                  <span className="overlay-btn"><Eye size={14} /> Quick View</span>
                </div>
              </div>

              <div className="room-content">
                <div className="flex items-center justify-between mb-1">
                  <span className="room-tier-badge">{room.tier || 'Luxury Suite'}</span>
                  <span className="room-floor-tag">Floor {room.floor}</span>
                </div>

                <h3 className="room-title" onClick={() => setSelectedRoomForDetails(room)}>
                  {room.type}
                </h3>

                <div className="room-specs-row">
                  <span className="room-spec-item"><Bed size={15} /> {room.bedType}</span>
                  <span className="room-spec-item"><Users size={15} /> Max {room.capacity} Guests</span>
                  <span className="room-spec-item"><Maximize2 size={15} /> {room.size}</span>
                </div>

                <div className="room-amenities-tags">
                  {(room.amenities || []).slice(0, 4).map((amenity, idx) => (
                    <span key={idx} className="amenity-tag">✓ {amenity}</span>
                  ))}
                  {(room.amenities || []).length > 4 && (
                    <span className="amenity-tag">+{room.amenities.length - 4} more</span>
                  )}
                </div>

                {isOccupied && (
                  <div className="occupied-guest-box">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted font-medium">Current Guest:</span>
                      <span className="badge badge-success text-xs">Checked-In</span>
                    </div>
                    <strong className="text-sm text-primary block mt-1">
                      {room.currentGuest || 'Registered Guest'}
                    </strong>
                  </div>
                )}

                {isCleaning && (
                  <div className="cleaning-status-box">
                    <div className="flex items-center gap-2 text-xs text-warning font-semibold">
                      <Sparkles size={14} />
                      <span>Housekeeping Turnover Active</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      {room.cleaningStatus || 'Linen sanitization & deep cleaning in-progress'}
                    </p>
                  </div>
                )}

                {isMaintenance && (
                  <div className="maintenance-status-box">
                    <div className="flex items-center gap-2 text-xs text-danger font-semibold">
                      <Wrench size={14} />
                      <span>Maintenance Protocol</span>
                    </div>
                    <p className="text-xs text-muted mt-1">
                      {room.cleaningStatus || 'Equipment check & room servicing'}
                    </p>
                  </div>
                )}

                <div className="room-footer-row">
                  <div className="room-price-box">
                    <span className="price-amount">${room.pricePerNight}</span>
                    <span className="price-period">/ night</span>
                  </div>

                  <div className="room-action-buttons">
                    {isAvailable && (
                      <div className="flex items-center gap-2">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => setSelectedRoomForDetails(room)}
                          title="View Suite Details"
                        >
                          <Eye size={14} /> Details
                        </button>
                        <button 
                          className="btn btn-accent btn-sm book-suite-btn" 
                          onClick={() => handleOpenBooking(room)}
                          title="Book Suite & Front Desk Check-in"
                        >
                          <Calendar size={15} /> Book Suite
                        </button>
                      </div>
                    )}

                    {isOccupied && (
                      <div className="flex items-center gap-1">
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => setSelectedRoomForService(room)}
                          title="Request In-Room Dining & Amenities"
                        >
                          <Bell size={14} /> Service
                        </button>
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => {
                            const b = bookings.find(b => b.roomId === room.id && b.status === 'Checked-In') || 
                                      bookings.find(b => b.roomNumber === room.number && b.status === 'Checked-In') ||
                                      bookings[0];
                            if (b) {
                              onCheckOut(b.id);
                              showNotification(`Suite ${room.number} checked out. Turnover task created!`);
                            }
                          }}
                          title="Check-out guest & generate invoice"
                        >
                          <LogOut size={14} /> Check-out
                        </button>
                      </div>
                    )}

                    {isCleaning && (
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleQuickStatusChange(room.id, 'Available')}
                        title="Mark room as cleaned and ready for guests"
                      >
                        <CheckCircle2 size={14} /> Mark Ready
                      </button>
                    )}

                    {isMaintenance && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleQuickStatusChange(room.id, 'Available')}
                        title="Resolve maintenance issue and make available"
                      >
                        <Check size={14} /> Mark Ready
                      </button>
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
            <p className="section-desc">Real-time check-in, checkout, and guest folio management</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="search-input-wrapper">
              <Search size={14} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search guest or booking ref..." 
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="search-input"
                style={{ height: '34px', fontSize: '0.8rem' }}
              />
            </div>

            <div className="filter-mini-pills">
              {['ALL', 'CONFIRMED', 'CHECKED-IN', 'CHECKED-OUT'].map((st) => (
                <button
                  key={st}
                  className={`mini-pill ${bookingFilter === st ? 'active' : ''}`}
                  onClick={() => setBookingFilter(st)}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="ihg-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Guest Name</th>
                <th>Suite #</th>
                <th>Stay Dates</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    No bookings found matching your search.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((bk) => (
                  <tr key={bk.id}>
                    <td>
                      <strong>{bk.bookingNumber}</strong>
                      <span className="text-xs text-muted block">
                        {bk.paymentMethod || 'Online'}
                      </span>
                    </td>
                    <td>
                      <div className="font-semibold">{bk.guestName}</div>
                      <div className="text-xs text-muted">{bk.guestPhone}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">Suite {bk.roomNumber}</span>
                    </td>
                    <td>
                      <div className="text-xs font-medium">
                        {bk.checkInDate} <span className="text-muted">→</span> {bk.checkOutDate}
                      </div>
                    </td>
                    <td>{bk.nights} nights</td>
                    <td>
                      <strong className="text-primary">${bk.totalAmount}</strong>
                    </td>
                    <td>
                      <span className="badge badge-success">{bk.paymentStatus || 'Paid'}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${
                        bk.status === 'Checked-In' ? 'success' : bk.status === 'Confirmed' ? 'warning' : 'info'
                      }`}>
                        {bk.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        {bk.status === 'Confirmed' && (
                          <button 
                            className="btn btn-primary btn-sm" 
                            onClick={() => {
                              onCheckIn(bk.id);
                              showNotification(`Guest ${bk.guestName} checked in to Suite ${bk.roomNumber}!`);
                            }}
                            title="Front Desk Check-In"
                          >
                            <LogIn size={13} /> Check-In
                          </button>
                        )}
                        {bk.status === 'Checked-In' && (
                          <button 
                            className="btn btn-outline btn-sm" 
                            onClick={() => {
                              onCheckOut(bk.id);
                              showNotification(`Guest ${bk.guestName} checked out of Suite ${bk.roomNumber}!`);
                            }}
                            title="Guest Check-Out"
                          >
                            <LogOut size={13} /> Check-Out
                          </button>
                        )}
                        {bk.status === 'Checked-Out' && (
                          <span className="text-xs text-muted flex items-center gap-1">
                            <Check size={13} className="text-success" /> Completed
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. BOOK SUITE MODAL (Interactive, Rich, Luxury) */}
      {/* ========================================================= */}
      {selectedRoomForBooking && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-fade-in">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="modal-icon-badge">
                  <Building2 size={22} className="text-accent" />
                </div>
                <div>
                  <h3>Reserve & Book {selectedRoomForBooking.type}</h3>
                  <p className="text-xs text-muted">
                    Suite {selectedRoomForBooking.number} • Floor {selectedRoomForBooking.floor} • ${selectedRoomForBooking.pricePerNight} / night
                  </p>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedRoomForBooking(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitBooking} className="modal-body">
              {/* Top Mode Toggle: Instant Check-In vs Advance Reservation */}
              <div className="booking-mode-selector">
                <button
                  type="button"
                  className={`booking-mode-tab ${bookingMode === 'INSTANT' ? 'active' : ''}`}
                  onClick={() => setBookingMode('INSTANT')}
                >
                  <LogIn size={16} />
                  <div>
                    <strong>Instant Front-Desk Check-In</strong>
                    <span className="block text-xs opacity-80">Guest is present, issue key & occupy suite now</span>
                  </div>
                </button>
                <button
                  type="button"
                  className={`booking-mode-tab ${bookingMode === 'RESERVE' ? 'active' : ''}`}
                  onClick={() => setBookingMode('RESERVE')}
                >
                  <Calendar size={16} />
                  <div>
                    <strong>Advance Reservation</strong>
                    <span className="block text-xs opacity-80">Confirmed booking for scheduled arrival</span>
                  </div>
                </button>
              </div>

              {/* Guest Profile Section */}
              <div className="form-section-header mt-4">
                <User size={15} /> Primary Guest Information
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Full Legal Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Dr. Sarah Mahmud" 
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Contact Phone Number *</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+880 1819 123456" 
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    placeholder="guest@example.com" 
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Passport / National ID #</label>
                  <input 
                    type="text" 
                    placeholder="A09823190 / 1990269..." 
                    value={guestIdNumber}
                    onChange={(e) => setGuestIdNumber(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Stay Dates & Capacity */}
              <div className="form-section-header mt-3">
                <Calendar size={15} /> Stay Dates & Occupancy
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check-In Date</label>
                  <input 
                    type="date" 
                    value={checkInDate}
                    onChange={(e) => handleCheckInDateChange(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Check-Out Date</label>
                  <input 
                    type="date" 
                    value={checkOutDate}
                    onChange={(e) => handleCheckOutDateChange(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Nights</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={nights}
                    onChange={(e) => setNights(Math.max(1, Number(e.target.value)))}
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

              {/* Luxury Add-ons & Concierge Privileges */}
              <div className="form-section-header mt-3">
                <Sparkles size={15} /> Luxury Add-Ons & Concierge Services
              </div>

              <div className="addons-grid">
                <label className={`addon-card ${addonLimo ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={addonLimo} 
                    onChange={(e) => setAddonLimo(e.target.checked)} 
                  />
                  <div className="addon-icon"><Car size={18} /></div>
                  <div className="addon-info">
                    <strong>VIP Limousine Airport Transfer</strong>
                    <span>Chauffeured Mercedes-Benz airport pickup (+$45)</span>
                  </div>
                </label>

                <label className={`addon-card ${addonChampagne ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={addonChampagne} 
                    onChange={(e) => setAddonChampagne(e.target.checked)} 
                  />
                  <div className="addon-icon"><Wine size={18} /></div>
                  <div className="addon-info">
                    <strong>Champagne & Artisan Truffles</strong>
                    <span>Chilled Moët & Chandon bottle in suite upon arrival (+$35)</span>
                  </div>
                </label>

                <label className={`addon-card ${addonSpa ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={addonSpa} 
                    onChange={(e) => setAddonSpa(e.target.checked)} 
                  />
                  <div className="addon-icon"><HeartHandshake size={18} /></div>
                  <div className="addon-info">
                    <strong>Full Spa & Thalassotherapy Pass</strong>
                    <span>Unlimited hydro-pool & sauna access (+$30/night)</span>
                  </div>
                </label>

                <label className={`addon-card ${addonLateCheckout ? 'selected' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={addonLateCheckout} 
                    onChange={(e) => setAddonLateCheckout(e.target.checked)} 
                  />
                  <div className="addon-icon"><Clock size={18} /></div>
                  <div className="addon-info">
                    <strong>Guaranteed Late Check-Out (4 PM)</strong>
                    <span>Relax longer on departure day without rush (+$25)</span>
                  </div>
                </label>
              </div>

              {/* Payment Method & Special Requests */}
              <div className="form-row mt-3">
                <div className="form-group flex-1">
                  <label>Payment Method</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-control"
                  >
                    <option value="Credit Card (Visa/Mastercard)">Credit Card (Visa / Mastercard / Amex)</option>
                    <option value="Cash at Front Desk">Cash Settlement at Front Desk</option>
                    <option value="bKash / Nagad Mobile Banking">bKash / Nagad Digital Payment</option>
                    <option value="Corporate Direct Billing">Corporate Billing Account</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Special Requests / Room Preferences</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Quiet corner suite, extra feather pillows..." 
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="booking-summary-box mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Suite Accommodation ({nights} Nights × ${selectedRoomForBooking.pricePerNight}):</span>
                  <span>${roomBaseTotal.toFixed(2)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex items-center justify-between text-sm mb-1 text-accent">
                    <span>Selected Luxury Add-ons & Amenities:</span>
                    <span>+${addonsTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Hospitality Service & Luxury Tax (10%):</span>
                  <span className="text-success">Complimentary Demo Tier ($0.00)</span>
                </div>
                <div className="flex items-center justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total Amount Payable:</span>
                  <span className="text-accent">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedRoomForBooking(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent btn-lg">
                  <Check size={18} />
                  {bookingMode === 'INSTANT' ? 'Confirm & Check-In Guest Now' : 'Confirm & Reserve Suite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. SUITE SHOWCASE / ROOM DETAILS MODAL */}
      {/* ========================================================= */}
      {selectedRoomForDetails && (
        <div className="modal-overlay">
          <div className="modal-content modal-large animate-fade-in">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <Award size={22} className="text-accent" />
                <div>
                  <h3>{selectedRoomForDetails.type} (Suite {selectedRoomForDetails.number})</h3>
                  <span className="room-tier-badge">{selectedRoomForDetails.tier}</span>
                </div>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedRoomForDetails(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body suite-details-body">
              <div className="suite-showcase-hero">
                <img src={selectedRoomForDetails.image} alt={selectedRoomForDetails.type} className="suite-hero-img" />
                <div className="suite-hero-badge">
                  <span className="price-tag">${selectedRoomForDetails.pricePerNight}</span>
                  <span className="price-unit">/ night</span>
                </div>
              </div>

              <div className="suite-quick-specs">
                <div className="spec-tile">
                  <Bed size={18} className="text-primary" />
                  <div>
                    <span className="spec-label">Bedding</span>
                    <strong>{selectedRoomForDetails.bedType}</strong>
                  </div>
                </div>
                <div className="spec-tile">
                  <Users size={18} className="text-primary" />
                  <div>
                    <span className="spec-label">Occupancy</span>
                    <strong>Up to {selectedRoomForDetails.capacity} Guests</strong>
                  </div>
                </div>
                <div className="spec-tile">
                  <Maximize2 size={18} className="text-primary" />
                  <div>
                    <span className="spec-label">Suite Size</span>
                    <strong>{selectedRoomForDetails.size}</strong>
                  </div>
                </div>
                <div className="spec-tile">
                  <Building2 size={18} className="text-primary" />
                  <div>
                    <span className="spec-label">Location</span>
                    <strong>Floor {selectedRoomForDetails.floor}</strong>
                  </div>
                </div>
              </div>

              <div className="suite-desc-box mt-3">
                <h4>Suite Description</h4>
                <p className="text-secondary text-sm">
                  {selectedRoomForDetails.description || 
                   'An exquisitely designed luxury suite blending timeless elegance with state-of-the-art hospitality conveniences. Enjoy marble en-suite bathrooms, panoramic views, custom artisan bedding, and 24/7 dedicated guest concierge support.'}
                </p>
              </div>

              <div className="suite-amenities-full mt-4">
                <h4>Suite Inclusions & Amenities</h4>
                <div className="amenities-full-grid">
                  {(selectedRoomForDetails.amenities || []).map((am, i) => (
                    <div key={i} className="amenity-full-card">
                      <CheckCircle2 size={15} className="text-success" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Status Control for Hotel Staff */}
              <div className="staff-controls-box mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted uppercase">Operational Room Status</span>
                  <span className={`badge badge-${
                    selectedRoomForDetails.status === 'Available' ? 'success' : 
                    selectedRoomForDetails.status === 'Occupied' ? 'warning' : 'info'
                  }`}>
                    Current: {selectedRoomForDetails.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      handleQuickStatusChange(selectedRoomForDetails.id, 'Available');
                      setSelectedRoomForDetails(prev => ({ ...prev, status: 'Available' }));
                    }}
                  >
                    Set Available
                  </button>
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      handleQuickStatusChange(selectedRoomForDetails.id, 'Cleaning');
                      setSelectedRoomForDetails(prev => ({ ...prev, status: 'Cleaning' }));
                    }}
                  >
                    Set Cleaning
                  </button>
                  <button 
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      handleQuickStatusChange(selectedRoomForDetails.id, 'Maintenance');
                      setSelectedRoomForDetails(prev => ({ ...prev, status: 'Maintenance' }));
                    }}
                  >
                    Set Maintenance
                  </button>
                </div>
              </div>

              <div className="modal-footer mt-4">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedRoomForDetails(null)}>
                  Close
                </button>
                {selectedRoomForDetails.status === 'Available' && (
                  <button 
                    type="button" 
                    className="btn btn-accent" 
                    onClick={() => {
                      const roomToBook = selectedRoomForDetails;
                      setSelectedRoomForDetails(null);
                      handleOpenBooking(roomToBook);
                    }}
                  >
                    <Calendar size={16} /> Book This Suite Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. IN-ROOM SERVICE & AMENITIES MODAL */}
      {/* ========================================================= */}
      {selectedRoomForService && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
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
                <label>Guest in Residence</label>
                <input 
                  type="text" 
                  readOnly 
                  value={selectedRoomForService.currentGuest || 'Registered Guest'} 
                  className="form-control"
                  style={{ background: 'var(--bg-subtle)' }}
                />
              </div>

              <div className="form-group">
                <label>Service Category</label>
                <select 
                  value={serviceType} 
                  onChange={(e) => setServiceType(e.target.value)}
                  className="form-control"
                >
                  <option value="In-Room Dining">In-Room Dining & Refreshments (+$32.50)</option>
                  <option value="Housekeeping Amenities">Fresh Towels, Linen & Dental Kit ($0)</option>
                  <option value="Room Cleaning">Quick Room Refresh & Trash Clear ($0)</option>
                  <option value="Luggage & Bellhop">Luggage Assistance & Departure Concierge ($0)</option>
                  <option value="Maintenance">AC / TV / Tech Support ($0)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Details & Specific Instructions *</label>
                <textarea 
                  required
                  rows="3" 
                  placeholder="Specify what you'd like delivered or serviced (e.g. 1x Wagyu steak, sparkling water, extra bath robes)..." 
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

      {/* ========================================================= */}
      {/* 4. ADD NEW SUITE MODAL */}
      {/* ========================================================= */}
      {showAddRoomModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Plus size={20} className="text-accent" />
                <h3>Add New Suite to Property Registry</h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowAddRoomModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddNewRoomSubmit} className="modal-body">
              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Suite Number *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 401" 
                    value={newRoomNumber}
                    onChange={(e) => setNewRoomNumber(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Floor *</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="20" 
                    value={newRoomFloor}
                    onChange={(e) => setNewRoomFloor(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Suite Name / Type *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Grand Horizon Penthouse" 
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Tier</label>
                  <select 
                    value={newRoomTier} 
                    onChange={(e) => setNewRoomTier(e.target.value)}
                    className="form-control"
                  >
                    <option value="Luxury Suite">Luxury Suite</option>
                    <option value="Business Suite">Business Suite</option>
                    <option value="Presidential">Presidential</option>
                    <option value="Premium">Premium</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
                <div className="form-group flex-1">
                  <label>Rate per Night ($) *</label>
                  <input 
                    type="number" 
                    min="50" 
                    value={newRoomPrice}
                    onChange={(e) => setNewRoomPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Bed Configuration</label>
                  <input 
                    type="text" 
                    value={newRoomBed}
                    onChange={(e) => setNewRoomBed(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Max Capacity</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={newRoomCapacity}
                    onChange={(e) => setNewRoomCapacity(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddRoomModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} /> Save New Suite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
