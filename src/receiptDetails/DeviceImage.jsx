import React from 'react';
import { Maximize2 } from 'lucide-react';

const DeviceImage = ({ imageUrl, fileName, date }) => {
  return (
    <div className="bg-white p-4 border-0 h-100" 
         style={{ direction: 'rtl', textAlign: 'right', width: '420px', transform: 'translateX(120px)' }}>
      
      {/* الرأس: العنوان وأيقونة التكبير */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-secondary mb-0">صورة حالة الجهاز</h6>
        <button className="btn btn-link text-secondary p-0">
          <Maximize2 size={20} />
        </button>
      </div>

      {/* الحاوية النسبية للصورة */}
      <div className="position-relative rounded-3 overflow-hidden shadow-sm">
        {/* الصورة الآن ديناميكية تماماً تأخذ القيمة من الـ props فقط */}
        <img 
          src={imageUrl} 
          alt="Device Condition" 
          className="img-fluid w-100"
          style={{ objectFit: 'cover', minHeight: '250px' }}
        />

        {/* الشريط الأسود الشفاف السفلي */}
        <div className="position-absolute bottom-0 end-0 m-3 px-3 py-2 rounded-2 text-white" 
             style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', fontSize: '12px', direction: 'ltr' }}>
          {date} • {fileName}
        </div>
      </div>
    </div>
  );
};

export default DeviceImage;