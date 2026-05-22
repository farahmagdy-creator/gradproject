import React from 'react';

function RD_StatusGrid({ receiptData }) {
  const { receivedDate, expectedDate, status, ticketId } = receiptData || {};

  return (
    <div className="row g-0 text-center py-4 shadow-sm border" 
    style={{ backgroundColor: '#f9f9f9' }}>
      
      {/* 1. تاريخ الاستلام */}
      <div className="col-3 border-start">
        <small className="text-muted d-block mb-1" style={{ fontSize: '17px' }}>تاريخ الاستلام</small>
        <strong style={{ fontSize: '18px', color: '#333' }}>{receivedDate || "---"}</strong>
      </div>

      {/* 2. التسليم المتوقع */}
      <div className="col-3 border-start">
        <small className="text-muted d-block mb-1" style={{ fontSize: '17px' }}>التسليم المتوقع</small>
        <strong style={{ fontSize: '18px', color: '#333' }}>{expectedDate || "---"}</strong>
      </div>

      {/* 3. الحالة) */}
      <div className="col-3 border-start">
        <small className="text-muted d-block mb-1" style={{ fontSize: '17px' }}>الحالة</small>
        <strong style={{ fontSize: '18px', color: '#333' }}>{status || "--- "}</strong>
      </div>

      {/* 4. معرف المستند) */}
      <div className="col-3">
        <small className="text-muted d-block mb-1" style={{ fontSize: '17px' }}>معرف المستند</small>
        <strong style={{ fontSize: '18px', color: '#333' }}>{ticketId || "---"}</strong>
      </div>

    </div>
  );
}

export default RD_StatusGrid;