import React from 'react';
import { TabletSmartphone } from 'lucide-react';

function RD_UnitSummary({ model, fault }) {
  return (
    <div className="p-2 h-100" style={{ backgroundColor: '#f9f9f9' }}>
      
    
      <h6 className="text-primary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <TabletSmartphone size={18} /> ملخص التشخيص
      </h6>

      <div className="small mb-3">
        الموديل: <br />
        <span className="fw-bold" style={{ fontSize: '20px' }}>
          {model || "---"}
        </span>
      </div>

      <div className="p-2 rounded" style={{ backgroundColor: '#fff5f5', borderRight: '4px solid #ef4444' }}>
        <small className="text-danger fw-bold">
          الشكوى: {fault || "---"}
        </small>
      </div>

    </div>
  );
}

export default RD_UnitSummary;