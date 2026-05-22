import React from 'react';
import { UserCircle } from 'lucide-react';

function RD_ClientInfo({ name, contact }) {
  return (
    <div className="p-2 h-100">
      <h6 className="text-primary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <UserCircle size={18} /> بيانات العميل 
      </h6>

      <div className="mb-3">
        <div className="small text-muted mb-1">الاسم:</div>
        <div className="fw-bold" style={{ fontSize: '20px', color: '#333' }}>
          {name || "---"}
        </div>
      </div>

      <div className="mt-3">
        <div className="small text-muted mb-1">التواصل:</div>
        <div className="fw-bold" style={{ fontSize: '18px', direction: 'ltr', textAlign: 'right' }}>
          {contact || "---"}
        </div>
      </div>
    </div>
  );
}

export default RD_ClientInfo;