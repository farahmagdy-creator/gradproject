import React from "react";
import { Monitor, FileText, DollarSign, Calendar, User, MapPin, Info, ArrowLeft } from "lucide-react";

export default function DeliveryCard({
  type = "tech",              
  returnId,
  returnDate,
  itemName,
  // Props مرتجع الفني
  purchaseDate,
  purchasePrice,
  locationName,
  orderSource,
  returnDateTech,
  // Props مرتجع العميل
  partNumber,
  invoiceNumber,
  saleDate,
  salePrice,
  returnSource,
  returnDateCustomer,
  // Props مشتركة
  deliveryWorker,
  reason
}) {
  const isCustomer = type === "customer";
  
  const badgeWordStyle = { 
    background: "#BA1A1A", 
    color: "#FFFFFF", 
    border: "1px solid #BA1A1A" 
  };

  return (
    <div
      className="card mb-3 position-relative border-0 shadow-sm"
      style={{ 
        borderRadius: 10, 
        direction: "rtl", 
        overflow: "hidden",
        backgroundColor: "#F8F9FB"
      }}
    >
      {/* 🟣 الخط الجانبي البنفسجي الثابت على اليمين */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "6px",
          backgroundColor: "#961F78", 
          zIndex: 15 
        }}
      />

      {/* 🟣 الشريط المائل (Ribbon) أعلى اليمين بمقاساتك الجديدة الموزونة بالملي 🟣 */}
      <div style={{
        position: "absolute",
        top: 24,         
        right: -45,      
        background: "#961F78", 
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        width: 160,      
        textAlign: "center",
        transform: "rotate(45deg)", 
        padding: "4px 0", 
        zIndex: 10,
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
      }}>
        تحت التسليم
      </div>

      {/* المحتوى الرئيسي */}
      <div className="d-flex align-items-center p-4 gap-3">
        
        {/* اليمين: التنسيق الجديد (السهم والـ Badge سطر واحد وتحتهم الـ ID والـ Date متسنترين) */}
        <div className="d-flex align-items-start" style={{ marginRight: "40px", flexShrink: 0 }}>
          <div className="d-flex flex-column align-items-center text-center" style={{ minWidth: 140 }}>
            
            {/* السهم والـ Badge في سطر واحد */}
            <div className="d-flex align-items-center justify-content-center gap-2">
              {/* ستايل السهم الدائري الشيك */}
              <div 
                className="d-flex align-items-center justify-content-center rounded-1"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "#f8f9fa", 
                  border: "1px solid #e0e0e0", 
                  flexShrink: 0
                }}
              >
                <ArrowLeft size={14} className="text-secondary" />
              </div>

              {/* الـ Badge الأحمر */}
              <span className="px-2 py-1 rounded fw-bold text-center" style={{ ...badgeWordStyle, fontSize: 13, whiteSpace: "nowrap" }}>
                {isCustomer ? "مرتجع عميل" : "مرتجع فني"}
              </span>
            </div>

            {/* الـ ID والـ Date تحتهم في السنتر بالظبط */}
            <span className="fw-bold mt-2 text-dark w-100" style={{ fontSize: 14 }}>
              {returnId}
            </span>
            <span className="text-secondary mt-1 w-100" style={{ fontSize: 10, fontWeight: 400 }}>
              {returnDate}
            </span>

          </div>
        </div>

        {/* المنتصف: شبكة البيانات */}
        <div className="flex-fill px-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16Px 20px" }}>
          <DetailItem icon={<Monitor size={14} />} text={itemName} />

          {/* بيانات الفني */}
          {!isCustomer && (
            <>
              <DetailItem icon={<Calendar size={14} />} text={`تاريخ الشراء: ${purchaseDate}`} />
              <DetailItem icon={<DollarSign size={14} />} text={`سعر الشراء: ${purchasePrice}`} />
              <DetailItem icon={<MapPin size={14} />} text={locationName || "المخزن الرئيسي / المورد"} />
              <DetailItem icon={<User size={14} />} text={`مصدر طلب الشراء: ${orderSource}`} />
              <DetailItem icon={<Calendar size={14} />} text={`تاريخ الإرجاع: ${returnDateTech}`} />
            </>
          )}

          {/* بيانات العميل */}
          {isCustomer && (
            <>
              <DetailItem icon={<FileText size={14} />} text={`رقم القطعة: ${partNumber}`} />
              <DetailItem icon={<FileText size={14} />} text={`رقم الفاتورة: ${invoiceNumber}`} />
              <DetailItem icon={<Calendar size={14} />} text={`تاريخ البيع: ${saleDate}`} />
              <DetailItem icon={<DollarSign size={14} />} text={`سعر البيع: ${salePrice}`} />
              <DetailItem icon={<User size={14} />} text={`مصدر المرتجع: ${returnSource || "عميل خارجي"}`} />
              <DetailItem icon={<Calendar size={14} />} text={`تاريخ الاسترجاع: ${returnDateCustomer}`} />
            </>
          )}

          <DetailItem icon={<User size={14} />} text={`عامل التوصيل: ${deliveryWorker}`} />
        </div>
      </div>

      {/* بار سبب الإرجاع */}
      <div className="px-4 pb-3" style={{ paddingRight: "6px" }}>
        <div 
          className="text-center fw-bold w-100"
          style={{ 
            border: "1px solid #333333", 
            borderRadius: 4,
            padding: "10px 10px", 
            fontSize: 14, 
            color: "#000000",
            backgroundColor: "#F8F9FB"
          }}
        >
          {reason}
        </div>
      </div>

      {/* ➖ الخط الفاصل الأفقي */}
      <div className="mx-4 my-4" style={{ borderTop: "1px solid #e0e0e0" }} />

      {/* 🔴 زر القرار المتمركز في المنتصف */}
      <div className="d-flex justify-content-center w-100 pb-4">
        <div 
          className="d-flex align-items-center justify-content-center gap-2 text-white fw-bold px-5 py-2"
          style={{ 
            background: "#BA1A1A", 
            fontSize: 14, 
            borderRadius: "6px", 
            minWidth: "280px",   
            boxShadow: "0 2px 4px rgba(204,34,0,0.15)"
          }}
        >
          <Info size={14} />
          <span>في انتظار قرار الفني باستلام قيمة القطعة</span>
        </div>
      </div>

    </div>
  );
}

function DetailItem({ icon, text }) {
  return (
    <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
      <span style={{ color: "#a0a0a0" }} className="d-flex align-items-center">{icon}</span>
      <span className="text-dark fw-medium" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{text}</span>
    </div>
  );
}