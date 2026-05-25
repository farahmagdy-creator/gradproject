import React from 'react';

function RD_Footer({ ticketId, phone, address }) {
  return (
    <div className="d-flex justify-content-around p-3 mt-4" 
         style={{ 
           backgroundColor: '#f8fafd', 
           borderRadius: '8px',
           direction: 'rtl',
           fontSize: '13px',
           color: '#6c757d',
           gap: '50px' 
         }}>


      <div className="d-flex gap-1">
        <span>معرف المستند:</span>
        <span className="fw-bold text-dark">{ticketId || "---"}</span>
      </div>

      
      <div className="d-flex gap-1">
        <span>تواصل معنا:</span>
        <span className="fw-bold text-dark" style={{ direction: 'ltr' }}>
          {phone || "---"}
        </span>
      </div>


      <div className="d-flex gap-1">
        <span>الفرع المصدر للإيصال:</span>
        <span className="fw-bold text-dark">{address || "---"}</span>
      </div>


    </div>
  );
}

export default RD_Footer;