import React, { useState } from 'react';
import { FileText, ClipboardList, Play, Image as ImageIcon, User, Share2, Printer, X, Mic } from 'lucide-react';

const StatusSection = ({ 
  reportId, 
  technicianName, 
  images = [], 
  diagnosisText, 
  audioDuration,
  audioUrl, 
  summaryText 
}) => {
  const [showFullReport, setShowFullReport] = useState(false);

  return (
    <div className="shadow-sm border text-center" style={{ 
            height:'370px',
            direction: 'rtl', 
            textAlign: 'right', 
            width: '420px', 
            backgroundColor: '#d3d1d1', 
            marginRight: '-120px', 
            marginLeft: 'auto',
          }}>
      
      {/* Title Section */}
      <div className="d-flex align-items-center justify-content-center gap-2 mb-3 mt-2">
        <FileText className="text-dark opacity-75" size={24} />
        <h3 className="fw-bold mb-0 text-dark">التقرير الفني</h3>
      </div>
      
      <hr className="my-4 opacity-25" />

      <div className="px-4 mb-5" style={{ minHeight: '110px' }}>
        <p className="text-dark opacity-75 fw-medium" style={{ lineHeight: '1.8', fontSize: '15px' }}>
          {summaryText || "جاري تحديث بيانات التقرير الفني بناءً على فحص المهندس المختص..."}
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => setShowFullReport(true)}
        className="btn btn-primary d-flex align-items-center justify-content-center gap-2 px-5 py-3 mx-auto shadow-sm"
        style={{ borderRadius: '12px', backgroundColor: '#1d5ed2', border: 'none' }}
      >
        <span className="fw-bold">عرض التقرير كاملاً</span>
        <ClipboardList size={20} />
      </button>

      {showFullReport && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
             style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 10000, padding: '20px'}}>
          
          <div className="bg-white rounded-4 shadow-lg w-100 h-100 overflow-auto position-relative" 
               style={{ maxWidth: '850px', maxHeight: '90vh', border: '1px solid #eee' }} dir="rtl">
            
            {/* Header */}
            <div className="p-4 border-bottom d-flex justify-content-between align-items-center sticky-top bg-white rounded-top-4">
              <div className="text-start">
                <h4 className="fw-bold mb-1 text-primary">التقرير الفني الكامل</h4>
                <div className="text-muted small d-flex align-items-center gap-1">
                    <span className="fw-bold" style={{ color: '#85a40b' }}> {reportId || "---"} </span>
                    <span> • رقم الإيصال </span>
                </div>
              </div>
              <button onClick={() => setShowFullReport(false)} className="btn btn-light rounded-circle p-2 border-0">
                <X size={24} />
              </button>
            </div>

            <div className="p-4">
              {/* Dynamic Audio Section */}
              <div className="mb-5 text-start">
                <div className="d-flex justify-content-start align-items-center mb-2 gap-2">
                  <h6 className="fw-bold mb-0 text-dark">مشغل التقرير الصوتي</h6>
                  <Mic size={18} className="text-primary" />
                </div>
                
                <div className="p-2 rounded-4 d-flex align-items-center gap-3 shadow-sm"
                 style={{ backgroundColor: '#f1f1f1', direction: 'ltr' }}>
                  <div className="d-flex align-items-center px-2">
                    <span className="small text-muted fw-bold" style={{ fontSize: '12px' }}>{audioDuration || "00:00"}</span>
                  </div>
                  <div className="flex-grow-1 position-relative"
                   style={{ height: '8px', backgroundColor: '#e0e0e0', borderRadius: '10px' }}>
                      <div className="h-100 rounded-pill position-absolute start-0" 
                      style={{ width: audioUrl ? '100%' : '0%', backgroundColor: '#0d47a1' }}></div>
                  </div>
                  <button className="btn p-0 d-flex align-items-center justify-content-center shadow-sm" 
                    style={{ width: '55px', height: '55px', backgroundColor: '#0d47a1', borderRadius: '15px', border: 'none', flexShrink: 0 }}>
                    <Play fill="white" size={24} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Dynamic Images Map */}
              <div className="mb-5 text-start">
                <div className="d-flex justify-content-between align-items-center mb-3 px-1">
                  <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                     <ImageIcon size={18} className="text-primary" /> صور عملية الصيانة
                  </h6>
                  <span className="text-muted small">{images.length} صور ملتقطة</span>
                </div>
                <div className="row g-3">
                  {images.length > 0 ? images.map((img, idx) => (
                    <div key={idx} className="col-6 col-md-3">
                      <div className="rounded-3 overflow-hidden shadow-sm border">
                        <img src={img} className="img-fluid w-100" 
                        style={{ height: '140px', objectFit: 'cover' }} alt={`maintenance-img-${idx}`} />
                      </div>
                    </div>
                  )) : <p className="text-muted small px-2">لا توجد صور مرفقة حالياً.</p>}
                </div>
              </div>

              {/* Dynamic Diagnosis */}
              <div className="mb-5 text-start">
                <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                   <ClipboardList size={18} className="text-primary" /> التشخيص النهائي وإجراءات الصيانة
                </h6>
                <div className="p-4 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <p className="mb-0 text-dark opacity-75 fw-medium" style={{ lineHeight: '2' }}>
                    {diagnosisText || "بانتظار تسجيل تقرير الصيانة النهائي..."}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="row g-4 mb-2 align-items-center border-top pt-4">
                <div className="col-md-6 text-start">
                   <div className="mb-3 d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                        <User size={28} />
                      </div>
                      <div>
                        <p className="mb-0 fw-bold fs-5">{technicianName || "فني غير محدد"}</p>
                        <p className="mb-0 text-muted small">الفني المسؤول عن الحالة</p>
                      </div>
                   </div>
                </div>
                <div className="col-md-6 d-flex align-items-center justify-content-md-end gap-2">
                    <button className="btn btn-outline-secondary d-flex align-items-center gap-2 px-4 py-2 rounded-3 border-2"><Printer size={18} /> طباعة </button>
                    <button className="btn btn-dark d-flex align-items-center gap-2 px-4 py-2 rounded-3 shadow-sm"><Share2 size={18} /> مشاركة </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSection;