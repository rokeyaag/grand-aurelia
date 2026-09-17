import React from 'react';
import robotAvatar from '../assets/ai_robot_avatar.jpg';
import { 
  Building2, 
  Utensils, 
  Bike, 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Users, 
  ClipboardList, 
  ReceiptText, 
  Boxes, 
  ChefHat,
  Crown
} from 'lucide-react';

export const ROLES = [
  { id: 'ADMIN_GM', label: 'General Manager (GM)', icon: ShieldCheck, badge: 'Full Admin' },
  { id: 'FRONT_DESK', label: 'Front Desk Reception', icon: Building2, badge: 'Hotel Ops' },
  { id: 'KITCHEN_CHEF', label: 'Executive Chef (KDS)', icon: ChefHat, badge: 'Kitchen Ops' },
  { id: 'HOUSEKEEPING', label: 'Housekeeping Lead', icon: ClipboardList, badge: 'Room Care' },
  { id: 'WAITER', label: 'Dine-In Waiter', icon: Utensils, badge: 'Table POS' },
  { id: 'DELIVERY_RIDER', label: 'Delivery Rider', icon: Bike, badge: 'Dispatch' },
  { id: 'GUEST_CUSTOMER', label: 'Guest & Customer', icon: Users, badge: 'Public Portal' }
];

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenCart, 
  onOpenAI 
}) {
  const currentRoleObj = ROLES.find(r => r.id === currentRole) || ROLES[0];

  return (
    <header className="ihg-header">
      {/* Top Brand Bar */}
      <div className="ihg-topbar">
        <div className="container flex items-center justify-between">
          <div className="ihg-logo-group" onClick={() => setActiveTab('overview')}>
            <div className="ihg-brand-crest-wrapper">
              <img src="/brand_logo.jpg" alt="Grand Aurelia Crest" className="ihg-crest-img" />
            </div>
            <div className="ihg-logo-text">
              <div className="flex items-center gap-2">
                <span className="ihg-brand-title">GRAND AURELIA</span>
                <span className="brand-badge-est">HOTEL & RESORT • EST. 1928</span>
              </div>
              <span className="ihg-brand-tagline">Where Timeless Luxury Meets Culinary Artistry</span>
            </div>
          </div>

          {/* Quick RBAC Role Switcher & Actions */}
          <div className="flex items-center gap-3">
            <div className="role-switcher-container">
              <Crown size={14} className="text-amber-300" />
              <span className="role-switcher-label">Role:</span>
              <select 
                value={currentRole} 
                onChange={(e) => setCurrentRole(e.target.value)}
                className="role-select"
              >
                {ROLES.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.label} ({role.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* AI Assistant Button */}
            <button 
              className="btn btn-primary btn-sm ai-header-btn" 
              onClick={onOpenAI}
              title="Open 24/7 AI ChatBoot"
            >
              <img src={robotAvatar} alt="AI ChatBoot" className="header-ai-robot-icon" />
              <span>AI ChatBoot</span>
            </button>

            {/* Food Delivery Cart Icon */}
            <button 
              className="cart-badge-btn" 
              onClick={onOpenCart}
              title="View Gourmet Bag"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="ihg-nav-bar">
        <div className="container flex items-center justify-between">
          <div className="nav-tabs-group">
            <button 
              className={`nav-tab-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <ShieldCheck size={16} />
              <span>GM Overview</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'hotel' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotel')}
            >
              <Building2 size={16} />
              <span>Luxury Suites</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'restaurant' ? 'active' : ''}`}
              onClick={() => setActiveTab('restaurant')}
            >
              <Utensils size={16} />
              <span>Fine Dining & Tables</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'kds' ? 'active' : ''}`}
              onClick={() => setActiveTab('kds')}
            >
              <ChefHat size={16} />
              <span>Kitchen KDS</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'delivery' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              <Bike size={16} />
              <span>Gourmet Express Delivery</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'housekeeping' ? 'active' : ''}`}
              onClick={() => setActiveTab('housekeeping')}
            >
              <ClipboardList size={16} />
              <span>Housekeeping</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'inventory' ? 'active' : ''}`}
              onClick={() => setActiveTab('inventory')}
            >
              <Boxes size={16} />
              <span>Inventory</span>
            </button>

            <button 
              className={`nav-tab-item ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              <ReceiptText size={16} />
              <span>Invoices & Folios</span>
            </button>
          </div>

          <div className="active-user-badge">
            <span className="status-dot"></span>
            <span className="user-role-text">{currentRoleObj.label}</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
