import React from 'react';

// أضفنا props هنا عشان نستقبل البيانات من المكون الأب (Parent Component)
const PaymentDetails = ({ totalAmount, depositPaid, remainingAmount }) => {
  return (
    <div className="bg-white p-4 border-0 position-relative" 
    style={{ backgroundColor: '#fff', width: '560px', direction: 'rtl', marginRight: '100px' }}>
      
      <div className="text-muted small fw-bold mb-3" style={{ fontSize: '14px' }}>
        تكلفة الخدمة
      </div>

      <div className="d-flex flex-column align-items-start mt-2">
        <div className="text-secondary small mb-1 fw-medium">الإجمالي التقديري</div>
        
        <div className="d-flex align-items-baseline gap-1" style={{ color: '#1467e4' }}>
            {/* عرض المبلغ الإجمالي ديناميكياً */}
            <h1 className="fw-bold mb-0" style={{ fontSize: '35px' }}>
                {totalAmount?.toLocaleString() || "0.00"}
            </h1>
            <span className="h4 fw-bold mb-0">ج.م</span>
        </div>

        {/* عرض المبلغ المتبقي فقط إذا كان موجوداً (أكبر من صفر) */}
        {remainingAmount > 0 && (
          <div className="text-danger small mt-2 fw-bold">
            المتبقي: {remainingAmount.toLocaleString()} ج.م
          </div>
        )}
      </div>

      {/* شارة حالة الدفع - تظهر فقط إذا تم دفع العربون فعلاً */}
      {depositPaid && (
        <div className="position-absolute bottom-0 start-0 m-4">
          <div className="bg-light border rounded-2 px-3 py-2 d-flex align-items-center gap-2 shadow-sm" 
          style={{ backgroundColor: '#fff' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></span>
            <span className="small fw-bold text-dark">تم دفع العربون</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;