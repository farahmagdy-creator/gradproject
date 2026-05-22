import React, { useRef } from 'react';
import RD_Header      from './RD_Header.jsx';
import RD_StatusGrid  from './RD_StatusGrid.jsx';
import RD_ClientInfo  from './RD_ClientInfo.jsx';
import RD_UnitSummary from './RD_UnitSummary.jsx';
import RD_Financials  from './RD_Financials.jsx';
import RD_Terms       from './RD_Terms.jsx';
import RD_Footer      from './RD_Footer.jsx';

function PrintView({ receiptData = {}, onClose }) {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8" />
          <title>إيصال - ${receiptData.id || ''}</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
          <style>
            body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; padding: 20px; background: #fff; }
            @media print { body { padding: 0; } button { display: none !important; } }
          </style>
        </head>
        <body>
          ${printContent}
          <script>window.onload = function() { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // تجميع بيانات الـ StatusGrid من الـ schema الموحد
  const statusGridData = {
    receivedDate: receiptData.receiveDate  || '---',
    expectedDate: receiptData.deliveryDue  || '---',
    status:       receiptData.status       || '---',
    ticketId:     receiptData.id           || '---',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      zIndex: 99999, overflowY: 'auto', padding: '30px 0',
      backdropFilter: 'blur(4px)',
    }}>
      <div style={{
        backgroundColor: '#fff', width: '850px', maxWidth: '95vw',
        borderRadius: '12px', overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>

        {/* شريط الأدوات */}
        <div className="d-flex justify-content-between align-items-center px-4 py-3"
          style={{ backgroundColor: '#1f66e1', color: '#fff' }}>
          <span className="fw-bold" style={{ fontSize: '16px' }}>معاينة إيصال الطباعة</span>
          <div className="d-flex gap-2">
            <button onClick={handlePrint} className="btn btn-light btn-sm fw-bold px-3" style={{ borderRadius: '8px' }}>
              🖨️ طباعة
            </button>
            <button onClick={onClose} className="btn btn-outline-light btn-sm px-3" style={{ borderRadius: '8px' }}>
              ✕ إغلاق
            </button>
          </div>
        </div>

        {/* محتوى الإيصال */}
        <div ref={printRef} style={{ padding: '30px', direction: 'rtl' }}>

          <RD_Header
            brandName="عباد الرحمن لخدمات المحمول"
            ticketId={receiptData.id || '---'}
          />

          <RD_StatusGrid receiptData={statusGridData} />

          <div className="row g-3 mt-3">
            <div className="col-md-6 border rounded p-0 overflow-hidden">
              <RD_ClientInfo
                name={receiptData.customerName}
                contact={receiptData.phone}
              />
            </div>
            <div className="col-md-6 border rounded p-0 overflow-hidden">
              <RD_UnitSummary
                model={receiptData.device}
                fault={receiptData.issue}
              />
            </div>
          </div>

          <RD_Financials
            staffName={receiptData.tech}
            dept={receiptData.receivedBy  || '---'}
            priority={receiptData.tags?.[0] || '---'}
            subtotal={receiptData.totalAmount  || 0}
            deposit={receiptData.depositPaid   || 0}
          />

          <RD_Terms />

          <RD_Footer
            ticketId={receiptData.id}
            phone={receiptData.shopPhone   || '---'}
            address={receiptData.shopBranch || '---'}
          />
        </div>
      </div>
    </div>
  );
}

export default PrintView;
