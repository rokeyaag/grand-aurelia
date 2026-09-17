import React, { useState } from 'react';
import { 
  ReceiptText, 
  DollarSign, 
  Printer, 
  CheckCircle, 
  CreditCard, 
  FileText, 
  X,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvoicesView({ invoices, onPayInvoice }) {
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState(null);

  const handlePay = (invoiceId) => {
    onPayInvoice(invoiceId);
    confetti({ particleCount: 50, spread: 45 });
  };

  return (
    <div className="invoices-view-container animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h2>Enterprise Invoicing & Billing</h2>
          <p className="text-secondary">
            Consolidated guest statements, room folios, dining charges, and electronic payment receipts.
          </p>
        </div>
      </div>

      {/* Invoices Master Table */}
      <div className="card mt-4">
        <div className="table-responsive">
          <table className="ihg-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Guest / Customer</th>
                <th>Room / Order Ref</th>
                <th>Stay Total</th>
                <th>Dining Total</th>
                <th>Tax</th>
                <th>Net Total</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const isPaid = inv.status === 'Paid';

                return (
                  <tr key={inv.id}>
                    <td><strong>{inv.invoiceNumber}</strong></td>
                    <td className="font-semibold">{inv.guestName}</td>
                    <td>{inv.roomNumber ? `Suite ${inv.roomNumber}` : 'Direct Service'}</td>
                    <td>${inv.roomTotal?.toFixed(2) || '0.00'}</td>
                    <td>${inv.diningTotal?.toFixed(2) || '0.00'}</td>
                    <td>${inv.tax?.toFixed(2) || '0.00'}</td>
                    <td><strong className="text-primary">${inv.netTotal.toFixed(2)}</strong></td>
                    <td>
                      <span className="text-success font-semibold">
                        ${inv.paidAmount.toFixed(2)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${isPaid ? 'success' : 'warning'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => setSelectedInvoiceForPrint(inv)}
                          title="View Digital Receipt"
                        >
                          <FileText size={14} /> Receipt
                        </button>
                        {!isPaid && (
                          <button 
                            className="btn btn-accent btn-sm" 
                            onClick={() => handlePay(inv.id)}
                          >
                            <CreditCard size={14} /> Settle (${inv.balanceDue?.toFixed(2)})
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable / Digital Receipt Modal */}
      {selectedInvoiceForPrint && (
        <div className="modal-overlay">
          <div className="modal-content receipt-modal">
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <ReceiptText size={20} className="text-primary" />
                <h3>Guest Folio & Official Invoice</h3>
              </div>
              <button className="btn-ghost" onClick={() => setSelectedInvoiceForPrint(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="receipt-paper">
              {/* Receipt Top Header */}
              <div className="receipt-header">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <img src="/brand_logo.jpg" alt="Grand Aurelia Crest" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-dark)', margin: 0 }}>GRAND AURELIA</h2>
                </div>
                <p style={{ fontWeight: '600', color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>HOTEL, RESORT & FINE CULINARY SUITE</p>
                <p className="text-xs text-muted">Invoice Ref: {selectedInvoiceForPrint.invoiceNumber} • Date: {selectedInvoiceForPrint.date}</p>
              </div>

              {/* Guest Details */}
              <div className="receipt-guest-box">
                <div>
                  <span className="text-xs text-muted block">Billed To:</span>
                  <strong>{selectedInvoiceForPrint.guestName}</strong>
                </div>
                {selectedInvoiceForPrint.roomNumber && (
                  <div className="text-right">
                    <span className="text-xs text-muted block">Room / Accommodation:</span>
                    <strong>Suite {selectedInvoiceForPrint.roomNumber}</strong>
                  </div>
                )}
              </div>

              {/* Line Items */}
              <div className="receipt-items-table">
                <div className="receipt-row header">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                {selectedInvoiceForPrint.roomTotal > 0 && (
                  <div className="receipt-row">
                    <span>Room Accommodation Charges</span>
                    <span>${selectedInvoiceForPrint.roomTotal.toFixed(2)}</span>
                  </div>
                )}
                {selectedInvoiceForPrint.diningTotal > 0 && (
                  <div className="receipt-row">
                    <span>Restaurant Dining & In-Room Services</span>
                    <span>${selectedInvoiceForPrint.diningTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="receipt-row">
                  <span>Service Tax & VAT (10%)</span>
                  <span>${selectedInvoiceForPrint.tax.toFixed(2)}</span>
                </div>
                <div className="receipt-row grand-total">
                  <span>Total Amount Billed:</span>
                  <span>${selectedInvoiceForPrint.netTotal.toFixed(2)}</span>
                </div>
                <div className="receipt-row paid-total">
                  <span>Amount Paid:</span>
                  <span className="text-success">${selectedInvoiceForPrint.paidAmount.toFixed(2)}</span>
                </div>
                {selectedInvoiceForPrint.balanceDue > 0 && (
                  <div className="receipt-row balance-due">
                    <span>Balance Due:</span>
                    <span className="text-accent">${selectedInvoiceForPrint.balanceDue.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Receipt Footer */}
              <div className="receipt-footer">
                <p>Thank you for choosing International Hospitality Group.</p>
                <span className="badge badge-success mt-2">✓ Verified Digital Record</span>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setSelectedInvoiceForPrint(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                <Printer size={16} /> Print Official Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
