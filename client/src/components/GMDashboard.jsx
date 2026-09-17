import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Building, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  BedDouble,
  UtensilsCrossed,
  PackageCheck,
  RefreshCw
} from 'lucide-react';

export default function GMDashboard({ 
  analytics, 
  inventory, 
  rooms, 
  orders, 
  bookings, 
  onRestock, 
  onNavigate,
  onRefresh
}) {
  const kpis = analytics?.kpis || {
    totalRevenue: 0,
    roomRevenue: 0,
    orderRevenue: 0,
    occupancyRate: 0,
    occupiedRooms: 0,
    totalRooms: 0,
    pendingHousekeeping: 0,
    lowStockCount: 0,
    activeOrdersCount: 0
  };

  const lowStockItems = inventory.filter(i => i.status === 'Low Stock' || i.currentStock <= i.minThreshold);

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Welcome Banner */}
      <div className="gm-banner">
        <div className="gm-banner-content">
          <div className="badge badge-primary" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none' }}>
            <Sparkles size={13} /> Executive Control Hub
          </div>
          <h1>Enterprise Hospitality Overview</h1>
          <p>
            Real-time unified intelligence across Hotel Operations, Fine Dining, Kitchen KDS & Food Delivery Fleet.
          </p>
        </div>
        <div className="gm-banner-actions">
          <button className="btn btn-outline btn-sm" onClick={onRefresh} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>
            <RefreshCw size={15} /> Refresh Live Data
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Total Platform Revenue</span>
            <div className="kpi-icon-wrapper" style={{ background: '#EBF1F8', color: '#1F3A5F' }}>
              <DollarSign size={22} />
            </div>
          </div>
          <div className="kpi-value">${kpis.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="kpi-subtext">
            <span className="text-success flex items-center gap-1 font-semibold">
              <TrendingUp size={14} /> +18.4%
            </span>
            <span>vs previous period</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Hotel Occupancy Rate</span>
            <div className="kpi-icon-wrapper" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
              <Building size={22} />
            </div>
          </div>
          <div className="kpi-value">{kpis.occupancyRate}%</div>
          <div className="kpi-subtext">
            <span>{kpis.occupiedRooms} of {kpis.totalRooms} Luxury Suites Occupied</span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Active Orders (Dine & Delivery)</span>
            <div className="kpi-icon-wrapper" style={{ background: '#FFF0F2', color: '#FF2147' }}>
              <ShoppingBag size={22} />
            </div>
          </div>
          <div className="kpi-value">{kpis.activeOrdersCount}</div>
          <div className="kpi-subtext">
            <span className="text-accent flex items-center gap-1 font-semibold">
              <Clock size={14} /> Real-time in Kitchen & Transit
            </span>
          </div>
        </div>

        <div className="card kpi-card">
          <div className="kpi-header">
            <span className="kpi-label">Stock & Supply Alerts</span>
            <div className="kpi-icon-wrapper" style={{ background: '#FEF2F2', color: '#EF4444' }}>
              <AlertTriangle size={22} />
            </div>
          </div>
          <div className="kpi-value">{kpis.lowStockCount}</div>
          <div className="kpi-subtext">
            <span className={kpis.lowStockCount > 0 ? 'text-danger font-semibold' : 'text-success'}>
              {kpis.lowStockCount > 0 ? 'Items below threshold' : 'All stocks optimal'}
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown & Quick Department Controls */}
      <div className="dashboard-columns-grid">
        {/* Left Column: Revenue Split & Operations status */}
        <div className="dashboard-main-col">
          <div className="card">
            <div className="section-title-row">
              <div>
                <h3>Revenue Contribution by Vertical</h3>
                <p className="section-desc">Consolidated earnings across hotel stays and culinary operations</p>
              </div>
            </div>

            <div className="revenue-split-grid">
              <div className="revenue-split-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} className="text-primary" />
                    <span className="font-semibold">Hotel Accommodations</span>
                  </div>
                  <span className="font-bold text-primary">${kpis.roomRevenue.toFixed(2)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${kpis.totalRevenue > 0 ? Math.round((kpis.roomRevenue / kpis.totalRevenue) * 100) : 50}%`,
                      background: 'var(--primary)'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-muted mt-1 block">
                  {kpis.totalRevenue > 0 ? Math.round((kpis.roomRevenue / kpis.totalRevenue) * 100) : 0}% of platform revenue
                </span>
              </div>

              <div className="revenue-split-card">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-accent" />
                    <span className="font-semibold">Restaurant & Food Delivery</span>
                  </div>
                  <span className="font-bold text-accent">${kpis.orderRevenue.toFixed(2)}</span>
                </div>
                <div className="progress-bar-bg">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${kpis.totalRevenue > 0 ? Math.round((kpis.orderRevenue / kpis.totalRevenue) * 100) : 50}%`,
                      background: 'var(--accent)'
                    }}
                  ></div>
                </div>
                <span className="text-xs text-muted mt-1 block">
                  {kpis.totalRevenue > 0 ? Math.round((kpis.orderRevenue / kpis.totalRevenue) * 100) : 0}% of platform revenue
                </span>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="quick-actions-bar">
              <span className="font-semibold text-sm">Quick Navigate:</span>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('hotel')}>
                <Building size={14} /> Hotel Suites Grid
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('restaurant')}>
                <UtensilsCrossed size={14} /> Dine-In POS
              </button>
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('kds')}>
                <Clock size={14} /> Live Kitchen KDS
              </button>
              <button className="btn btn-accent btn-sm" onClick={() => onNavigate('delivery')}>
                <ShoppingBag size={14} /> Food Delivery App
              </button>
            </div>
          </div>

          {/* Recent Guest Bookings & Live Orders */}
          <div className="card mt-4">
            <div className="section-title-row">
              <h3>Live Operations Stream</h3>
              <span className="badge badge-primary">Real-Time</span>
            </div>

            <div className="activity-stream-list">
              {bookings.slice(0, 3).map(b => (
                <div key={b.id} className="activity-stream-item">
                  <div className="activity-icon-badge hotel">
                    <BedDouble size={16} />
                  </div>
                  <div className="activity-details">
                    <div className="flex items-center justify-between">
                      <span className="activity-title">Room {b.roomNumber} - {b.guestName}</span>
                      <span className="activity-time">{b.checkInDate} to {b.checkOutDate}</span>
                    </div>
                    <p className="activity-sub">
                      Status: <strong className={b.status === 'Checked-In' ? 'text-success' : 'text-primary'}>{b.status}</strong> • Total ${b.totalAmount}
                    </p>
                  </div>
                </div>
              ))}

              {orders.slice(0, 3).map(o => (
                <div key={o.id} className="activity-stream-item">
                  <div className="activity-icon-badge dining">
                    <ShoppingBag size={16} />
                  </div>
                  <div className="activity-details">
                    <div className="flex items-center justify-between">
                      <span className="activity-title">{o.orderNumber} ({o.orderType})</span>
                      <span className="activity-time">${o.total.toFixed(2)}</span>
                    </div>
                    <p className="activity-sub">
                      {o.customerName} • Status: <strong className="text-accent">{o.status}</strong> • {o.items.length} items
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inventory Watchlist & Department Alerts */}
        <div className="dashboard-side-col">
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-warning" />
                <h3>Supply Alerts</h3>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('inventory')}>
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            {lowStockItems.length === 0 ? (
              <div className="empty-state-card">
                <CheckCircle size={32} className="text-success" />
                <p>All kitchen, bar, and hotel amenities are well stocked!</p>
              </div>
            ) : (
              <div className="low-stock-list">
                {lowStockItems.map(item => (
                  <div key={item.id} className="low-stock-item">
                    <div className="low-stock-info">
                      <span className="font-semibold text-sm">{item.name}</span>
                      <span className="text-xs text-muted">
                        Current: <strong className="text-danger">{item.currentStock} {item.unit}</strong> (Min: {item.minThreshold} {item.unit})
                      </span>
                    </div>
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => onRestock(item.id, item.currentStock + 10)}
                    >
                      <PackageCheck size={14} /> Restock +10
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Department Health */}
          <div className="card mt-4">
            <h3 className="mb-3">Department Operational Health</h3>
            <div className="dept-health-list">
              <div className="dept-health-item">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Front Desk & Concierge</span>
                  <span className="badge badge-success">100% Operational</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill bg-success" style={{ width: '100%' }}></div></div>
              </div>

              <div className="dept-health-item">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Kitchen & KDS Prep Lines</span>
                  <span className="badge badge-info">Active Cooking</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill bg-info" style={{ width: '85%' }}></div></div>
              </div>

              <div className="dept-health-item">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Housekeeping Turnaround</span>
                  <span className="badge badge-warning">{kpis.pendingHousekeeping} Rooms Scheduled</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill bg-warning" style={{ width: '70%' }}></div></div>
              </div>

              <div className="dept-health-item">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Delivery Rider Fleet</span>
                  <span className="badge badge-success">Riders Dispatched</span>
                </div>
                <div className="progress-bar-bg"><div className="progress-bar-fill bg-success" style={{ width: '90%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
