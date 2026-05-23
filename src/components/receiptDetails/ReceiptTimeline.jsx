import React from 'react';

const ReceiptTimeline = ({ receiverName, receivedDate, technicianName, repairTime, auditLogs = [] }) => {
  return (
    <div className="p-3 shadow-sm border-0 h-70" 
         style={{ 
           direction: 'rtl', 
           textAlign: 'right', 
           width: '420px', 
           backgroundColor: '#d3d1d1', 
           transform: 'translateX(120px)'
         }}>
      
      {/* القسم العلوي: البيانات الأساسية ديناميك */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">مستلم الجهاز</span>
          <span className="fw-bold text-dark">{receiverName}</span>
        </div>
        
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">تاريخ الاستلام</span>
          <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{receivedDate}</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small fw-bold">الفني المسؤول</span>
          <div className="d-flex align-items-center gap-2">
              <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                   style={{ width: '28px', height: '28px', backgroundColor: '#c5a059', fontSize: '11px' }}>
                {/*  أول حرفين من اسم الفني للدائرة */}
                {technicianName ? technicianName.split(' ').map(n => n[0]).join('').slice(0, 2) : '??'}
            </div>
            <span className="fw-bold text-dark">{technicianName}</span>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">وقت الإصلاح المتوقع</span>
          <span className="fw-bold text-dark">{repairTime}</span>
        </div>
      </div>

      <hr className="text-muted opacity-25 mb-4" />

      {/* سجل التدقيق ديناميك */}
      <div>
        <h6 className="text-muted small fw-bold mb-4">سجل التدقيق</h6>
        
        <div className="position-relative mt-2">
          {/* الخط العمودي للتايم لاين */}
          <div className="position-absolute"
           style={{ right: '5px', top: '5px', bottom: '5px', width: '2px', backgroundColor: '#dee2e6', zIndex: 0 }}></div>

          {auditLogs.map((log, index) => (
            <div key={index} className="mb-4 position-relative" style={{ paddingRight: '25px' }}>
              <div className="position-absolute" style={{ right: '0px', top: '5px', zIndex: 1 }}>
                {/* النقطة الزرقاء لأحدث حالة، والرمادية للباقي */}
                <div className="rounded-circle border border-white border-2" 
                     style={{ 
                       width: '12px', 
                       height: '12px', 
                       backgroundColor: index === 0 ? '#0d6efd' : '#adb5bd', 
                       boxShadow: index === 0 ? '0 0 0 4px rgba(13, 110, 253, 0.1)' : 'none' 
                     }}></div>
              </div>
              <div className={`fw-bold small mb-1 ${index === 0 ? 'text-dark' : 'text-muted'}`}>
                {log.status}
              </div>
              <div className="text-muted" style={{ fontSize: '11px' }}>
                {log.userName} • {log.timeAgo}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ReceiptTimeline;