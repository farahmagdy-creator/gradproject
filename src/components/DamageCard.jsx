import React from "react";
import {
  Smartphone,
  Barcode,
  DollarSign,
  User,
  Calendar,
} from "lucide-react";

const DamageCard = ({
  id,
  date,
  partName,
  partNo,
  buyPrice,
  sellPrice,
  recorder,
  damageDate,
  reason,
}) => {
  return (
    <div
      dir="rtl"
      className="card border-0 rounded-3 overflow-hidden shadow w-100"
      style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB" }}
    >
      <div className="d-flex align-items-stretch">
        
        {/* شريط أصفر يمين */}
        <div className="bg-warning" style={{ width: "9px", flexShrink: 0 }} />

        {/* المحتوى الداخلي */}
        <div className="card-body p-3 p-sm-4 d-flex flex-column gap-3">
          
          {/* الصف العلوي — متجاوب (تحت بعض في الموبايل وجنب بعض في الشاشة الكبيرة) */}
          <div className="d-flex flex-column flex-md-row align-items-start gap-4">

            {/* الأيقونة والـ Badge والتاريخ */}
            <div className="d-flex align-items-start gap-3 flex-shrink-0">
              {/* 1. الأيقونة الكبيرة */}
              <div 
                className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                style={{ width: "48px", height: "48px", backgroundColor: "#F2F4F6", marginTop: "-2px" }}
              >
                <Smartphone size={24} className="text-secondary" />
              </div>

              {/* 2. الـ Badge والـ ID والتاريخ — عرض ثابت مسطرة */}
              <div className="d-flex flex-column align-items-center flex-shrink-0" style={{ width: "110px", gap: "6px" }}>
                <span 
                  className="badge fw-bold px-2 py-1"
                  style={{ backgroundColor: "#F5A62380", color: "#402F61", fontSize: "14px", lineHeight: "1.2" }}
                >
                  قطعة تالفة
                </span>
                <span className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                  {id}
                </span>
                <span className="text-muted" style={{ fontSize: "13px" }}>
                  {date}
                </span>
              </div>
            </div>

            {/* 3. شبكة البيانات الـ 6 الذكية والمتجاوبة بنسبة 100% */}
            <div 
              className="flex-grow-1 pt-1 w-100" 
              style={{ 
                display: "grid", 
                /* التعديل السحري: في الشاشات الكبيرة 4 أعمدة مسطرة، وفي الموبايل بيقلب تلقائي عمودين عشان الكلام يظهر كامل وميختفيش */
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
                gap: "16px 20px" 
              }}
            >
              <DataItem icon={<Smartphone size={15} />} label={partName} />
              <DataItem icon={<Barcode size={15} />}    label={`رقم القطعة : ${partNo}`} />
              <DataItem icon={<DollarSign size={15} />} label={`سعر الشراء : ${buyPrice?.toLocaleString()}`} />
              <DataItem icon={<DollarSign size={15} />} label={`سعر البيع : ${sellPrice?.toLocaleString()}`} />
              
              <DataItem icon={<User size={15} />}      label={`مسجل التلف : ${recorder}`} />
              <DataItem icon={<Calendar size={15} />} label={`تاريخ التلف : ${damageDate}`} />
            </div>

          </div>

          {/* سبب التلف في الأسفل */}
          <div className="p-3 bg-light rounded-3 text-center border fw-bold text-dark" style={{ fontSize: "15px" }}>
            <span className="fw-normal">سبب التلف : </span>
            <span className="fw-normal">{reason}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

/* مكون البيانات الفرعي النظيف والمحمي من الاختفاء */
const DataItem = ({ icon, label }) => (
  <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: "15px", minWidth: 0 }}>
    <span className="d-flex align-items-center text-muted flex-shrink-0">
      {icon}
    </span>
    <span title={label} style={{ lineHeight: "1.2", wordBreak: "break-word" }}>
      {label}
    </span>
  </div>
);

export default DamageCard;