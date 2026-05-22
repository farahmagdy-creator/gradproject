import React, { useState } from 'react';
import { Printer, UserPlus, Edit3, PackageCheck, Smartphone, AlertTriangle } from 'lucide-react';
import OTPModal   from './OTPModal.jsx';
import PrintView  from '../viewDetails/PrintView.jsx';

const ReceiptHeader = ({ receiptData = {} }) => {
  const [showOTP,   setShowOTP]   = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const statusBadgeStyle = {
    color: '#940fc9',
    border: '1px solid #940fc9',
  };

  return (
    <div className="container" style={{ direction: 'rtl' }}>

      <div className="row align-items-center">
        <div className="col-md-7">
          <p className="text-muted small mb-1">الإيصالات › أرشيف-2024</p>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold mb-0">
              {receiptData.receiptNumber || receiptData.id || '---'}
            </h2>
            <span className="badge rounded-pill px-3" style={statusBadgeStyle}>
              {receiptData.status || 'في الانتظار'}
            </span>
            <button
              className="btn btn-sm rounded-pill px-3 fw-bold"
              style={{ color: '#ba1a1a', border: '1px solid #ba1a1a' }}
            >
              <AlertTriangle size={12} /> وضع علامة عاجل
            </button>
          </div>
        </div>

        <div className="col-md-5 d-flex gap-2 justify-content-end">
          <button
            onClick={() => setShowPrint(true)}
            className="btn border btn-sm px-3 py-2"
            style={{ background: '#e9e8e9' }}
          >
            <Printer size={16} /> طباعة الإيصال
          </button>
          <button className="btn border btn-sm px-3 py-2" style={{ background: '#e9e8e9' }}>
            <UserPlus size={16} /> تعيين فني
          </button>
          <button className="btn btn-light border btn-sm px-3 py-2">
            <Edit3 size={16} /> تعديل الإيصال
          </button>
        </div>
      </div>

      <div className="d-flex gap-3 mt-4" style={{ transform: 'translateX(-65px)' }}>
        <button className="btn btn-primary fw-bold py-2 shadow-sm" style={{ backgroundColor: '#1f66e1', borderRadius: '10px' }}>
          <PackageCheck size={20} /> تسليم الجهاز (بالإيصال)
        </button>
        <button
          onClick={() => setShowOTP(true)}
          className="btn btn-outline-primary py-2 fw-bold shadow-sm"
          style={{ borderRadius: '10px', borderWidth: '2px' }}
        >
          <Smartphone size={20} /> تسليم (فقدان الإيصال - OTP)
        </button>
      </div>

      {showOTP   && <OTPModal   onClose={() => setShowOTP(false)} />}
      {showPrint && <PrintView  receiptData={receiptData} onClose={() => setShowPrint(false)} />}

    </div>
  );
};

export default ReceiptHeader;
