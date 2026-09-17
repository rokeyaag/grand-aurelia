import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Bike, 
  Clock, 
  Flame, 
  CheckCircle, 
  Search, 
  Star, 
  Tag, 
  X, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DeliveryView({ 
  menuItems, 
  cart, 
  onAddToCart, 
  onUpdateCartQty, 
  onClearCart, 
  orders, 
  onPlaceDeliveryOrder,
  onOpenCart,
  showCartModal,
  setShowCartModal 
}) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState(null);

  // Checkout Form State
  const [custName, setCustName] = useState('Nazmul Abedin');
  const [custPhone, setCustPhone] = useState('+880 1713 554433');
  const [deliveryAddress, setDeliveryAddress] = useState('House 42, Road 11, Block D, Banani, Dhaka');
  const [deliveryNotes, setDeliveryNotes] = useState('Ring bell twice, leave with security if unreachable.');
  const [paymentMethod, setPaymentMethod] = useState('bKash Online Payment');

  const categories = ['ALL', 'Chef Special', 'Main Course', 'Appetizers', 'Desserts', 'Beverages'];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = 
      activeCategory === 'ALL' ||
      (activeCategory === 'Chef Special' ? item.isChefSpecial : item.category === activeCategory);

    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTax = Number((cartSubtotal * 0.1).toFixed(2));
  const deliveryFee = cartSubtotal > 0 ? 4.50 : 0;
  const discount = cartSubtotal > 50 ? 5.00 : 0.00;
  const cartTotal = Number((cartSubtotal + cartTax + deliveryFee - discount).toFixed(2));

  const handleAddToCartWithEffect = (item) => {
    onAddToCart(item);
    confetti({ particleCount: 30, spread: 35, origin: { y: 0.8 } });
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    onPlaceDeliveryOrder({
      customerName: custName,
      customerPhone: custPhone,
      deliveryAddress,
      deliveryNotes,
      paymentMethod,
      items: cart
    });

    confetti({ particleCount: 90, spread: 70 });
    setShowCheckoutModal(false);
    setShowCartModal(false);
    onClearCart();
  };

  const deliveryOrders = orders.filter(o => o.orderType === 'DELIVERY');

  return (
    <div className="delivery-view-container animate-fade-in">
      {/* Hero Delivery Banner */}
      <div className="delivery-hero-banner">
        <div className="delivery-hero-content">
          <span className="badge badge-accent">
            <Sparkles size={13} /> Gourmet Express Delivery
          </span>
          <h1>IHG Luxury Dining at Your Doorstep</h1>
          <p>
            Handcrafted five-star culinary creations delivered hot, fast, and fresh within 30 minutes.
          </p>

          <div className="delivery-search-bar">
            <Search size={18} className="text-muted" />
            <input 
              type="text" 
              placeholder="Search gourmet steak, burrata, dessert, mocktail..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="delivery-search-input"
            />
          </div>
        </div>
      </div>

      {/* Categories Tabs Bar */}
      <div className="delivery-categories-bar">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`delivery-cat-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Cards Grid */}
      <div className="delivery-menu-grid">
        {filteredItems.map(item => {
          const cartItem = cart.find(c => c.id === item.id);
          const qtyInCart = cartItem ? cartItem.quantity : 0;

          return (
            <div key={item.id} className="food-card card">
              <div className="food-img-container">
                <img src={item.image} alt={item.name} className="food-img" />
                {item.isChefSpecial && (
                  <span className="food-chef-badge">★ Chef's Special</span>
                )}
                <span className="food-rating-tag">★ {item.rating}</span>
              </div>

              <div className="food-card-body">
                <div className="flex items-center justify-between mb-1">
                  <span className="food-category-tag">{item.category}</span>
                  <span className="food-calories-tag">{item.calories} kcal</span>
                </div>

                <h3 className="food-title">{item.name}</h3>
                <p className="food-desc">{item.description}</p>

                <div className="food-meta-row">
                  <span className="food-prep-time">
                    <Clock size={13} /> {item.prepTime}
                  </span>
                  {item.isVeg && <span className="food-veg-tag">🌿 100% Veg</span>}
                </div>

                <div className="food-card-footer">
                  <div className="food-price-box">
                    <span className="food-price">${item.price.toFixed(2)}</span>
                  </div>

                  <div className="food-action-box">
                    {qtyInCart > 0 ? (
                      <div className="cart-counter-pill">
                        <button className="counter-btn" onClick={() => onUpdateCartQty(item.id, qtyInCart - 1)}>-</button>
                        <span className="counter-qty">{qtyInCart}</span>
                        <button className="counter-btn" onClick={() => onUpdateCartQty(item.id, qtyInCart + 1)}>+</button>
                      </div>
                    ) : (
                      <button 
                        className="btn btn-accent btn-sm" 
                        onClick={() => handleAddToCartWithEffect(item)}
                      >
                        <Plus size={15} /> Add to Bag
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Orders & History Tracker */}
      {deliveryOrders.length > 0 && (
        <div className="card mt-8">
          <div className="section-title-row">
            <div>
              <h3>Recent Food Delivery Orders & Live Status</h3>
              <p className="section-desc">Track live delivery progress from kitchen to your door</p>
            </div>
          </div>

          <div className="delivery-orders-list">
            {deliveryOrders.map(order => (
              <div key={order.id} className="delivery-order-item">
                <div className="flex items-center gap-3">
                  <div className="delivery-order-icon">
                    <Bike size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong>{order.orderNumber}</strong>
                      <span className={`badge badge-${
                        order.status === 'DELIVERED' ? 'success' : order.status === 'OUT_FOR_DELIVERY' ? 'info' : 'warning'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-xs text-muted block mt-1">
                      {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-accent">${order.total.toFixed(2)}</span>
                  <button 
                    className="btn btn-outline btn-sm" 
                    onClick={() => setTrackedOrder(order)}
                  >
                    Track Live Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer / Modal */}
      {showCartModal && (
        <div className="modal-overlay">
          <div className="modal-content cart-modal">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-accent" />
                <h3>Your Culinary Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowCartModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {cart.length === 0 ? (
                <div className="empty-cart-state">
                  <ShoppingBag size={48} className="text-muted" />
                  <h4>Your bag is currently empty</h4>
                  <p className="text-secondary text-sm">Add some exquisite gourmet dishes from our menu.</p>
                </div>
              ) : (
                <>
                  <div className="cart-items-scroll">
                    {cart.map(item => (
                      <div key={item.id} className="cart-item-row">
                        <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                        <div className="cart-item-details">
                          <span className="font-semibold text-sm">{item.name}</span>
                          <span className="text-xs text-muted block">${item.price.toFixed(2)} each</span>
                        </div>
                        <div className="cart-counter-pill">
                          <button className="counter-btn" onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}>-</button>
                          <span className="counter-qty">{item.quantity}</span>
                          <button className="counter-btn" onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <span className="font-bold text-sm min-w-16 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="booking-summary-box mt-4">
                    <div className="flex items-center justify-between text-sm py-1">
                      <span>Subtotal:</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1">
                      <span>Government Tax (10%):</span>
                      <span>${cartTax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm py-1">
                      <span>Express Delivery Fee:</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-sm py-1 text-success">
                        <span>Special Offer Discount:</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between font-bold text-lg pt-2 border-t mt-2">
                      <span>Grand Total:</span>
                      <span className="text-accent">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="modal-footer mt-4">
                    <button className="btn btn-outline" onClick={() => setShowCartModal(false)}>
                      Continue Ordering
                    </button>
                    <button 
                      className="btn btn-accent" 
                      onClick={() => {
                        setShowCartModal(false);
                        setShowCheckoutModal(true);
                      }}
                    >
                      Proceed to Checkout <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Bike size={20} className="text-accent" />
                <h3>Delivery Details & Checkout</h3>
              </div>
              <button className="btn-ghost" onClick={() => setShowCheckoutModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="modal-body">
              <div className="form-group">
                <label>Recipient Name *</label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input 
                    type="text" 
                    required 
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="form-control with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Contact Phone Number *</label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input 
                    type="tel" 
                    required 
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="form-control with-icon"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <div className="input-with-icon">
                  <MapPin size={16} className="input-icon" />
                  <textarea 
                    required 
                    rows="2"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="form-control with-icon"
                  ></textarea>
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Note / Landmark</label>
                <input 
                  type="text" 
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select 
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-control"
                >
                  <option value="bKash Online Payment">bKash Online Instant Payment</option>
                  <option value="Nagad Online Payment">Nagad Online Instant Payment</option>
                  <option value="Credit / Debit Card">Credit / Debit Card (Visa/MasterCard)</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>

              <div className="booking-summary-box">
                <div className="flex items-center justify-between font-bold text-base">
                  <span>Payable Amount:</span>
                  <span className="text-accent">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowCheckoutModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent">
                  <CheckCircle size={16} /> Place Order & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Order Tracker Modal */}
      {trackedOrder && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Bike size={20} className="text-accent" />
                <h3>Live Tracker: {trackedOrder.orderNumber}</h3>
              </div>
              <button className="btn-ghost" onClick={() => setTrackedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="tracker-status-box">
                <span className="badge badge-accent mb-2">Live Update</span>
                <h4>Current Status: {trackedOrder.status}</h4>
                <p className="text-xs text-muted">Estimated arrival in ~{trackedOrder.estimatedMinutes || 20} minutes</p>
              </div>

              {/* Steps timeline */}
              <div className="tracker-timeline mt-4">
                <div className={`timeline-step ${['ORDER_PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(trackedOrder.status) ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-content">
                    <strong>1. Order Placed & Confirmed</strong>
                    <span className="text-xs text-muted block">Kitchen received your gourmet order</span>
                  </div>
                </div>

                <div className={`timeline-step ${['PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'].includes(trackedOrder.status) ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-content">
                    <strong>2. Chef Preparing Food</strong>
                    <span className="text-xs text-muted block">Crafting with fresh ingredients</span>
                  </div>
                </div>

                <div className={`timeline-step ${['OUT_FOR_DELIVERY', 'DELIVERED'].includes(trackedOrder.status) ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-content">
                    <strong>3. Out for Delivery</strong>
                    <span className="text-xs text-muted block">
                      {trackedOrder.assignedRider ? `Rider ${trackedOrder.assignedRider.name} is on the way` : 'Rider assigned and picking up'}
                    </span>
                  </div>
                </div>

                <div className={`timeline-step ${trackedOrder.status === 'DELIVERED' ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-content">
                    <strong>4. Delivered</strong>
                    <span className="text-xs text-muted block">Enjoy your fine dining experience!</span>
                  </div>
                </div>
              </div>

              {/* Rider Card if assigned */}
              {trackedOrder.assignedRider && (
                <div className="rider-contact-card card mt-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" 
                      alt="Rider" 
                      className="rider-avatar" 
                    />
                    <div>
                      <span className="font-semibold text-sm">{trackedOrder.assignedRider.name}</span>
                      <span className="text-xs text-muted block">IHG Delivery Fleet • {trackedOrder.assignedRider.vehicle}</span>
                      <span className="text-xs text-primary font-medium">{trackedOrder.assignedRider.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
