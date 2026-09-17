import React, { useState } from 'react';
import { 
  Boxes, 
  AlertTriangle, 
  CheckCircle, 
  PackagePlus, 
  Search, 
  Building, 
  Utensils, 
  Coffee, 
  Package,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InventoryView({ inventory, onRestock }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'ALL',
    'Kitchen Ingredients',
    'Beverages',
    'Hotel Amenities',
    'Front Desk Supplies',
    'Delivery Packaging'
  ];

  const filteredItems = inventory.filter(item => {
    const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.supplier || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.currentStock <= i.minThreshold).length;

  const handleRestockClick = (itemId, currentQty) => {
    onRestock(itemId, currentQty + 15);
    confetti({ particleCount: 40, spread: 40 });
  };

  return (
    <div className="inventory-view-container animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2>Unified Enterprise Stock & Inventory</h2>
          <p className="text-secondary">
            Centralized tracking of culinary ingredients, beverages, room amenities, and packaging.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search ingredient or supply..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Stock Health Banner */}
      <div className="inventory-status-banner">
        <div className="flex items-center gap-3">
          <div className={`status-icon-box ${lowStockCount > 0 ? 'warning' : 'success'}`}>
            {lowStockCount > 0 ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
          </div>
          <div>
            <h4>Inventory Status: {lowStockCount > 0 ? `${lowStockCount} Items Low in Stock` : 'All Stock Levels Optimal'}</h4>
            <p className="text-xs text-secondary">
              Auto-threshold monitors trigger procurement warnings when items fall below safe buffer levels.
            </p>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="filter-pills-bar mt-4">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat} ({cat === 'ALL' ? inventory.length : inventory.filter(i => i.category === cat).length})
          </button>
        ))}
      </div>

      {/* Inventory Items Table */}
      <div className="card mt-4">
        <div className="table-responsive">
          <table className="ihg-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Safe Threshold</th>
                <th>Unit Cost</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Restock Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const isLow = item.status === 'Low Stock' || item.currentStock <= item.minThreshold;
                const percentage = Math.min(100, Math.round((item.currentStock / (item.minThreshold * 2)) * 100));

                return (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td><span className="badge badge-primary">{item.category}</span></td>
                    <td>
                      <div className="flex items-center gap-2">
                        <strong className={isLow ? 'text-danger' : 'text-primary'}>
                          {item.currentStock} {item.unit}
                        </strong>
                      </div>
                      <div className="progress-bar-bg" style={{ width: '90px', height: '5px', marginTop: '4px' }}>
                        <div 
                          className={`progress-bar-fill ${isLow ? 'bg-danger' : 'bg-success'}`} 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </td>
                    <td>{item.minThreshold} {item.unit}</td>
                    <td>${item.unitCost.toFixed(2)}</td>
                    <td className="text-xs text-secondary">{item.supplier}</td>
                    <td>
                      <span className={`badge badge-${isLow ? 'danger' : 'success'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn btn-sm ${isLow ? 'btn-accent' : 'btn-outline'}`}
                        onClick={() => handleRestockClick(item.id, item.currentStock)}
                      >
                        <PackagePlus size={14} /> Restock +15
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
