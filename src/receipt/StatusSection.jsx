import React from 'react';

const StatusSection = () => {
  return (
    <div className="bg-white p-4 rounded-4 shadow-sm border-0 h-100" style={{ direction: 'rtl', textAlign: 'right' }}>
      
      {/* القسم العلوي: بيانات الاستلام والفني */}
      <div className="mb-4">
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">مستلم الجهاز</span>
          <span className="fw-bold text-dark">أحمد محمد</span>
        </div>
        
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">تاريخ الاستلام</span>
          <span className="fw-bold text-dark">24 أكتوبر 2024، 09:12 ص</span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted small fw-bold">الفني المسؤول</span>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-dark">أحمد رضا</span>
            <div className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" 
                 style={{ width: '28px', height: '28px', backgroundColor: '#d4af37', fontSize: '12px' }}>
              أر
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted small fw-bold">وقت الإصلاح المتوقع</span>
          <span className="fw-bold text-dark">2-3 أيام عمل</span>
        </div>
      </div>

      <hr className="text-muted opacity-25 mb-4" />

      {/* القسم السفلي: سجل التدقيق (Audit Log) */}
      <div>
        <h6 className="text-muted small fw-bold mb-4">سجل التدقيق</h6>
        
        <div className="position-relative ps-4">
          {/* الحدث الأول (نشط) */}
          <div className="mb-4 position-relative">
            <div className="position-absolute translate-middle-y" style={{ right: '-32px', top: '12px' }}>
              <div className="rounded-circle border border-white" style={{ width: '12px', height: '12px', backgroundColor: '#0d6efd', boxShadow: '0 0 0 4px rgba(13, 110, 253, 0.1)' }}></div>
            </div>
            <div className="fw-bold text-dark small mb-1">تغيرت الحالة إلى قيد الاصلاح</div>
            <div className="text-muted" style={{ fontSize: '11px' }}>النظام • منذ ساعة</div>
          </div>

          {/* الحدث الثاني (قديم) */}
          <div className="position-relative">
            <div className="position-absolute translate-middle-y" style={{ right: '-32px', top: '12px' }}>
              <div className="rounded-circle border border-white" style={{ width: '12px', height: '12px', backgroundColor: '#dee2e6' }}></div>
            </div>
            <div className="fw-bold text-muted small mb-1">اكتمال إجراءات الاستلام</div>
            <div className="text-muted" style={{ fontSize: '11px' }}>سارة جونز • منذ 4 ساعات</div>
          </div>

          {/* الخط الواصل بين النقاط */}
          <div className="position-absolute" style={{ right: '-27px', top: '15px', bottom: '15px', width: '2px', backgroundColor: '#eee', zIndex: -1 }}></div>
        </div>
      </div>

    </div>
  );
};

export default StatusSection;