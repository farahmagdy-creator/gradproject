import React from 'react';

const DeviceDetails = ({ deviceName, deviceColor, issueDescription }) => {
  return (
    <div className="bg-white p-4 border-0 h-100" 
    style={{ backgroundColor: '#fff', width: '560px', direction: 'rtl', marginRight: '100px' }}>
      {/* العنوان الجانبي */}
      <div className="text-muted small fw-bold mb-4" style={{ fontSize: '14px' }}>
        المواصفات الفنية
      </div>
      {/* تفاصيل الجهاز واللون بشكل ديناميكي */}
      <div className="d-flex justify-content-between">
        <div>
          <div className="text-muted small mb-1">تفاصيل الجهاز</div>
          {/* عرض اسم الجهازـ */}
          <h4 className="fw-bold">
            {deviceName || "جاري تحميل الجهاز..."}
          </h4>
        </div>
        <div className="text-start" style={{transform:'translateX(120px)'}}>
          <div className="text-muted small">اللون</div>
          {/* عرض اللون من الـ Props */}
          <h5 className="fw-bold">
            {deviceColor || "---"}
          </h5>
        </div>
      </div>

      <hr className="text-muted opacity-25 mb-4" />

      {/* وصف العطل ديناميكي */}
      <div>
        <div className="text-muted small mb-2">وصف العطل</div>
        <p className="fw-medium lh-lg text-dark mb-0" style={{ fontSize: '1.1rem' }}>
          {issueDescription || "لا يوجد وصف متوفر."}
        </p>
      </div>
    </div>
  );
};

export default DeviceDetails;