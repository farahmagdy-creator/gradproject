import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = ({ referenceNumber }) => {
  return (
    <footer className="py-4 mt-auto" style={{ direction: 'rtl' }}>
      <div className="container-fluid px-5">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          
          {/* الجزء الأيمن: التوثيق الرقمي */}
          <div className="d-flex align-items-center gap-2 text-muted">
            <ShieldCheck size={18} className="text-secondary opacity-75" />
            <span style={{ fontSize: '14px' }}>
              موثق رقمياً بواسطة <span className="fw-bold text-dark">نظام عباد الرحمن الذكي</span>
            </span>
          </div>

          {/* الجزء الأيسر: الروابط والمرجع */}
          <div className="d-flex align-items-center gap-4" style={{ fontSize: '13px' }}>
             <div className="text-muted">
                المرجع: <span className="text-dark fw-medium" style={{ direction: 'ltr', display: 'inline-block' }}>
                   {referenceNumber || "REF-990-21-ALX"}
                </span>
             </div>
             <a href="#" className="text-muted text-decoration-none hover-dark">سياسة الخصوصية</a>
             <a href="#" className="text-muted text-decoration-none hover-dark">الدعم الفني</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;