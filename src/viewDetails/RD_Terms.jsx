import React from 'react';

function RD_Terms() {
  return (
    <div className="mt-4 p-4" style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
    
      <h6 className="text-secondary text-end mb-3" style={{ fontSize: '13px', fontWeight: 'bold' }}>
        شروط الضمان وسياسة الخدمة
      </h6>

      <div className="row g-3 text-end" style={{ fontSize: '12px', color: '#090909', lineHeight: '1.8' }}>
     
        <div className="col-md-6 fw-bold">
          <p className="mb-2">
            • جميع الإصلاحات تخضع لضمان عباد الرحمن لمدة ٩٠ يوماً على القطع المستبدلة.
          </p>
          <p className="mb-2">
            • الأجهزة التي لا يتم استلامها خلال ٣٠ يوماً من حالة "جاهز" تفرض عليها رسوم تخزين.
          </p>
          <p className="mb-0">
            • قد يكشف التشخيص الأولي عن أعطال ثانوية غير مشمولة في هذا التقدير.
          </p>
        </div>

    
        <div className="col-md-6 fw-bold">
          <p className="mb-2">
            • النسخ الاحتياطي للبيانات هو مسؤولية العميل وحده.
          </p>
          <p className="mb-0">
            • الأضرار المادية أو التعرض للسوائل يلغي جميع ضمانات ما بعد الخدمة.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RD_Terms;