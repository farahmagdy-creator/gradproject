import React from 'react';

function CustomerDetails({ customerName, customerPhone }) {
  return (
    <div className="card p-4 border-0" 
    style={{ backgroundColor: '#fff', width: '560px', direction: 'rtl', marginRight: '100px' }}>
      
      <div className="mb-4">
        <p className="text-muted fw-bold mb-0" style={{ fontSize: '0.9rem' }}>بيانات العميل</p>
      </div>

      <div className="row text-center">
        
        <div className="col-md-6 border-start">
          <p className="text-muted small mb-1">اسم العميل</p>
          <h4 className="fw-bold mb-0" style={{ color: '#1a1a1a' }}>
            {customerName || "جاري التحميل..."} 
          </h4>
        </div>

        <div className="col-md-6">
          <p className="text-muted small mb-1">رقم الموبايل</p>
          <h4 className="fw-bold mb-0" style={{ direction: 'ltr' }}>
            {customerPhone || "+20 ----------"}
          </h4>
        </div>

      </div>
    </div>
  );
}

export default CustomerDetails;