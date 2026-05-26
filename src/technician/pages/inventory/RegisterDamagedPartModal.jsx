// import React, { useState } from "react";
// import { X, Search, Smartphone, Plus, ChevronRight, ChevronLeft, Check, FileText } from "lucide-react";

// const RegisterDamagedPartModal = ({ isOpen, onClose, onSave }) => {
//   const [reason, setReason] = useState(""); // state لسبب التلف
//   const [selectedPart, setSelectedPart] = useState(null); // state للقطع المختارة من الجدول

//   if (!isOpen) return null;

//   // الداتا التجريبية للمخزون
//   const stockPartsData = [
//     { id: "PRT-8010", name: "شاشة iPhone 14 Pro OLED", price: 11300, sellPrice: 12400, qty: 24, status: "لم تستخدم", supplier: "البنا", receiver: "محمد عادل", date: "19-11-2023" },
//     { id: "PRT-5522", name: "بطارية Samsung S22 Ultra", price: 3200, sellPrice: 4100, qty: 3, status: "مستعملة", supplier: "الكابتن", receiver: "حازم علي", date: "19-11-2023" },
//     { id: "PRT-1100", name: "آيسي شحن iPhone 11", price: 450, sellPrice: 800, qty: 50, status: "لم تستخدم", supplier: "شهاب - 45", receiver: "بلال جمال", date: "19-11-2023" },
//   ];

//   // لما يضغط على زرار الـ (+) في الجدول يختار القطعة
//   const handleSelectPart = (item) => {
//     setSelectedPart({
//       id: `DAP-${Math.floor(1000 + Math.random() * 9000)}`, // بيعمل سيريال وهمي للتلف
//       partName: item.name,
//       partNo: item.id,
//       buyPrice: item.price,
//       sellPrice: item.sellPrice,
//       recorder: item.receiver, // نعتبر المستلم هو المسجل للتجربة
//       damageDate: new Date().toLocaleDateString("en-GB"), // تاريخ اليوم تلقائي
//     });
//   };

//   // عند الضغط على حفظ السجل النهائي
//   const handleFinalSave = () => {
//     if (!selectedPart) {
//       alert("رجاء اختر قطعة من الجدول أولاً!");
//       return;
//     }
//     if (!reason.trim()) {
//       alert("رجاء ادخل سبب التلف!");
//       return;
//     }

//     onSave({
//       ...selectedPart,
//       date: selectedPart.damageDate,
//       reason: reason
//     });

//     // ريست للـ states وقفل البوب اب
//     setSelectedPart(null);
//     setReason("");
//     onClose();
//   };

//   return (
//     <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, fontFamily: "'Cairo', sans-serif", padding: "20px" }}>
//       <div dir="rtl" style={{ backgroundColor: "#ffffff", borderRadius: "16px", width: "100%", maxWidth: "1150px", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column" }}>
        
//         {/* الهيدر */}
//         <div style={{ display: "flex", justifycontent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #F1F5F9" }}>
//           <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: "4px" }}><X size={20} /></button>
//           <div style={{ textAlign: "left", width: "100%" }}>
//             <h3 style={{ color: "#F5A623", fontSize: "20px", fontWeight: "700", margin: 0 }}>تسجيل قطعة تالفة</h3>
//             <p style={{ color: "#64748B", fontSize: "12px", margin: "4px 0 0 0", fontWeight: "500" }}>اختر القطع التالفة وادخل سبب التلف</p>
//           </div>
//         </div>

//         {/* المحتوى الداخلي */}
//         <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
//           {/* 1. حقل سبب التلف */}
//           <div>
//             <label style={{ display: "block", color: "#1E293B", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>سبب تلف القطعة</label>
//             <div style={{ position: "relative" }}>
//               <input 
//                 type="text" 
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)} // ربط الـ input بالـ state
//                 placeholder="رجاء ادخال سبب التلف تفصيليا." 
//                 style={{ width: "100%", padding: "14px 44px 14px 14px", borderRadius: "8px", border: "1px solid #E2E8F0", backgroundColor: "#F1F5F9", fontSize: "13px", outline: "none", textAlign: "right" }}
//               />
//               <FileText size={18} color="#94A3B8" style={{ position: "absolute", top: "16px", right: "14px" }} />
//             </div>
//           </div>

//           {/* 2. جدول اختيار القطعة من المخزون */}
//           <div style={{ backgroundColor: "#F8FAFC", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8F0" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
//               <div style={{ backgroundColor: "#F5A623", padding: "6px", borderRadius: "6px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><Smartphone size={16} /></div>
//               <span style={{ color: "#003178", fontWeight: "700", fontSize: "15px" }}>اختر القطعة التالفة من المخزون</span>
//             </div>

//             <div style={{ overflowX: "auto", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "right" }}>
//                 <thead>
//                   <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontWeight: "700" }}>
//                     <th style={{ padding: "14px 16px" }}>القطعة</th>
//                     <th style={{ padding: "14px 16px" }}>السعر</th>
//                     <th style={{ padding: "14px 16px" }}>الكمية المتوفرة</th>
//                     <th style={{ padding: "14px 16px" }}>الحالة</th>
//                     <th style={{ padding: "14px 16px" }}>المورد</th>
//                     <th style={{ padding: "14px 16px", textAlign: "center" }}>إجراءات</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {stockPartsData.map((item, index) => (
//                     <tr key={index} style={{ borderBottom: "1px solid #F1F5F9" }}>
//                       <td style={{ padding: "14px 16px" }}>
//                         <div style={{ fontWeight: "700", color: "#1E293B" }}>{item.name}</div>
//                         <div style={{ fontSize: "11px", color: "#64748B" }}>SKU: {item.id}</div>
//                       </td>
//                       <td style={{ padding: "14px 16px", fontWeight: "700" }}>{item.price}</td>
//                       <td style={{ padding: "14px 16px", fontWeight: "700" }}>{item.qty}</td>
//                       <td style={{ padding: "14px 16px" }}>
//                         <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", color: "#fff", backgroundColor: item.status === "لم تستخدم" ? "#1d4ed8" : "#86198f" }}>{item.status}</span>
//                       </td>
//                       <td style={{ padding: "14px 16px" }}>{item.supplier}</td>
//                       <td style={{ padding: "14px 16px", textAlign: "center" }}>
//                         <button 
//                           type="button"
//                           onClick={() => handleSelectPart(item)} // عند الضغط يضيف للكارد تحت
//                           style={{ background: "none", border: "none", color: "#1d4ed8", cursor: "pointer", padding: "4px" }}
//                         >
//                           <Plus size={18} strokeWidth={3} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* 3. سجل التلف المختار — يظهر فقط لو تم اختيار قطعة */}
//           {selectedPart && (
//             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F5A623", fontWeight: "700", fontSize: "15px" }}>
//                 <FileText size={16} />
//                 <span>سجل التلف</span>
//               </div>
              
//               <DamageCard 
//                 id={selectedPart.id}
//                 date={selectedPart.damageDate}
//                 partName={selectedPart.partName}
//                 partNo={selectedPart.partNo}
//                 buyPrice={selectedPart.buyPrice}
//                 sellPrice={selectedPart.sellPrice}
//                 recorder={selectedPart.recorder}
//                 damageDate={selectedPart.damageDate}
//                 reason={reason || "برجاء كتابة سبب التلف بالأعلى..."} // بيسمع لايف من الـ input فوق
//               />
//             </div>
//           )}

//         </div>

//         {/* الفوتر */}
//         <div style={{ padding: "16px 24px", backgroundColor: "#F8FAFC", borderTop: "1px solid #F1F5F9", display: "flex", gap: "16px" }}>
//           <button 
//             onClick={handleFinalSave} // دالة الحفظ والترحيل للخارج
//             style={{ backgroundColor: "#F5A623", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px" }}
//           >
//             <Check size={16} strokeWidth={3} />
//             <span>حفظ السجل</span>
//           </button>
//           <button onClick={onClose} style={{ backgroundColor: "transparent", color: "#003178", border: "none", padding: "10px 16px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}>إلغاء</button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default RegisterDamagedPartModal;




import React, { useState } from "react";
import { X, Search, Smartphone, Plus, ChevronRight, ChevronLeft, Check, FileText } from "lucide-react";
import DamageCard from "../../../components/DamageCard";

const RegisterDamagedPartModal = ({ isOpen, onClose, onSave }) => {
  const [reason, setReason] = useState(""); // State لسبب التلف المكتوب
  const [selectedPart, setSelectedPart] = useState(null); // State للقطعة المختارة من الجدول

  if (!isOpen) return null;

  // الداتا التجريبية للمخزون
  const stockPartsData = [
    { id: "PRT-8010", name: "شاشة iPhone 14 Pro OLED", price: 11300, sellPrice: 12400, qty: 24, status: "لم تستخدم", supplier: "البنا", receiver: "محمد عادل", date: "19-11-2023" },
    { id: "PRT-5522", name: "بطارية Samsung S22 Ultra", price: 3200, sellPrice: 4100, qty: 3, status: "مستعملة", supplier: "الكابتن", receiver: "حازم علي", date: "19-11-2023" },
    { id: "PRT-1100", name: "آيسي شحن iPhone 11", price: 450, sellPrice: 800, qty: 50, status: "لم تستخدم", supplier: "شهاب - 45", receiver: "بلال جمال", date: "19-11-2023" },
  ];

  // عند الضغط على زرار الـ (+) في الجدول
  const handleSelectPart = (item) => {
    setSelectedPart({
      id: `DAP-${Math.floor(1000 + Math.random() * 9000)}`, // إنشاء سيريال وهمي للتلف
      partName: item.name,
      partNo: item.id,
      buyPrice: item.price,
      sellPrice: item.sellPrice,
      recorder: item.receiver,
      damageDate: new Date().toLocaleDateString("en-GB"), // تاريخ اليوم تلقائيًا
    });
  };

  // عند الضغط على حفظ السجل النهائي للترحيل برة
  const handleFinalSave = () => {
    if (!selectedPart) {
      alert("رجاء اختر قطعة من الجدول أولاً!");
      return;
    }
    if (!reason.trim()) {
      alert("رجاء ادخل سبب التلف!");
      return;
    }

    // ترحيل الداتا كاملة للصفحة الأصلية
    onSave({
      ...selectedPart,
      date: selectedPart.damageDate,
      reason: reason
    });

    // تفريغ البيانات وقفل المودال
    setSelectedPart(null);
    setReason("");
    onClose();
  };

  return (
    <div 
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        display: "flex",
        alignItems: "center", 
        justifyContent: "center", // السحر اللي بيرجع البوب اب في النص بالظبط (اتصلحت هنا)
        zIndex: 2000,
        fontFamily: "'Cairo', sans-serif", padding: "20px"
      }}
    >
      <div 
        dir="rtl"
        style={{
          backgroundColor: "#ffffff", borderRadius: "16px", width: "100%",
          maxWidth: "1150px", maxHeight: "92vh", overflowY: "auto",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column"
        }}
      >
        
        {/* ─── الهيدر الرئيسي (على اليمين بالكامل) ─── */}
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "16px 24px", 
            borderBottom: "1px solid #F1F5F9",
            flexDirection: "row-reverse"
          }}
        >
          {/* زر الإغلاق يذهب لليسار */}
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: "4px" }}>
            <X size={20} />
          </button>

          {/* نصوص الهيدر تذهب لليمين */}
          <div style={{ textAlign: "right" }}>
            <h3 style={{ color: "#F5A623", fontSize: "20px", fontWeight: "700", margin: 0 }}>تسجيل قطعة تالفة</h3>
            <p style={{ color: "#64748B", fontSize: "12px", margin: "4px 0 0 0", fontWeight: "500" }}>اختر القطع التالفة وادخل سبب التلف</p>
          </div>
        </div>

        {/* ─── محتوى البوب اب الداخلي ─── */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* 1. حقل سبب التلف تفصيلياً */}
          <div>
            <label style={{ display: "block", color: "#1E293B", fontSize: "14px", fontWeight: "700", marginBottom: "8px" }}>
              سبب تلف القطعة
            </label>
            <div style={{ position: "relative" }}>
              <input 
                type="text" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="رجاء ادخال سبب التلف تفصيليا." 
                style={{
                  width: "100%", padding: "14px 44px 14px 14px", borderRadius: "8px",
                  border: "1px solid #E2E8F0", backgroundColor: "#F1F5F9", fontSize: "13px",
                  outline: "none", textAlign: "right"
                }}
              />
              <FileText size={18} color="#94A3B8" style={{ position: "absolute", top: "16px", right: "14px" }} />
            </div>
          </div>

          {/* 2. سيكشن جدول اختيار القطعة من المخزون */}
          <div style={{ backgroundColor: "#F8FAFC", borderRadius: "12px", padding: "20px", border: "1px solid #E2E8F0" }}>
            
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ backgroundColor: "#F5A623", padding: "6px", borderRadius: "6px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Smartphone size={16} />
              </div>
              <span style={{ color: "#003178", fontWeight: "700", fontSize: "15px" }}>اختر القطعة التالفة من المخزون</span>
            </div>

            {/* حقل البحث داخل الجدول */}
            <div style={{ position: "relative", marginBottom: "16px" }}>
              <input 
                type="text" 
                placeholder="ابحث عن اسم القطعة" 
                style={{ width: "100%", padding: "12px 40px 12px 12px", borderRadius: "8px", border: "1px solid #E2E8F0", backgroundColor: "#FFF", fontSize: "13px", outline: "none" }}
              />
              <Search size={16} color="#94A3B8" style={{ position: "absolute", top: "14px", right: "14px" }} />
            </div>

            {/* حاوية الجدول */}
            <div style={{ overflowX: "auto", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "right" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontWeight: "700" }}>
                    <th style={{ padding: "14px 16px" }}>القطعة</th>
                    <th style={{ padding: "14px 16px" }}>السعر</th>
                    <th style={{ padding: "14px 16px" }}>الكمية المتوفرة</th>
                    <th style={{ padding: "14px 16px" }}>الحالة</th>
                    <th style={{ padding: "14px 16px" }}>المورد</th>
                    <th style={{ padding: "14px 16px", textAlign: "center" }}>إجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {stockPartsData.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontWeight: "700", color: "#1E293B" }}>{item.name}</div>
                        <div style={{ fontSize: "11px", color: "#64748B" }}>SKU: {item.id}</div>
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: "700" }}>{item.price}</td>
                      <td style={{ padding: "14px 16px", fontWeight: "700" }}>{item.qty}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ padding: "4px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", color: "#fff", backgroundColor: item.status === "لم تستخدم" ? "#1d4ed8" : "#86198f" }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>{item.supplier}</td>
                      <td style={{ padding: "14px 16px", textAlign: "center" }}>
                        <button 
                          type="button"
                          onClick={() => handleSelectPart(item)}
                          style={{ background: "none", border: "none", color: "#1d4ed8", cursor: "pointer", padding: "4px" }}
                        >
                          <Plus size={18} strokeWidth={3} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* الباجينيشن */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderTop: "1px solid #E2E8F0", fontSize: "13px", color: "#475569", backgroundColor: "#FFF" }}>
                <div>عرض 1 إلى 3 من 3 عناصر</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", direction: "ltr" }}>
                  <button type="button" style={{ border: "1px solid #E2E8F0", background: "#fff", padding: "4px", borderRadius: "6px" }}><ChevronLeft size={16} /></button>
                  <button type="button" style={{ border: "none", background: "#003178", color: "#fff", width: "28px", height: "28px", borderRadius: "6px", fontWeight: "700" }}>1</button>
                  <button type="button" style={{ border: "1px solid #E2E8F0", background: "#fff", padding: "4px", borderRadius: "6px" }}><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>

            {/* زر إضافة للفاتورة */}
            <button style={{ marginTop: "14px", display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#DDF2FF", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: "700", color: "#0056B3", cursor: "pointer" }}>
              <Plus size={14} strokeWidth={3} />
              <span>إضافة للفاتورة</span>
            </button>
          </div>

          {/* 3. سجل التلف المختار (يظهر ديناميكياً عند اختيار قطعة) */}
          {selectedPart && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#F5A623", fontWeight: "700", fontSize: "15px" }}>
                <FileText size={16} />
                <span>سجل التلف</span>
              </div>
              
              <DamageCard 
                id={selectedPart.id}
                date={selectedPart.damageDate}
                partName={selectedPart.partName}
                partNo={selectedPart.partNo}
                buyPrice={selectedPart.buyPrice}
                sellPrice={selectedPart.sellPrice}
                recorder={selectedPart.recorder}
                damageDate={selectedPart.damageDate}
                reason={reason || "برجاء كتابة سبب التلف بالأعلى..."}
              />
            </div>
          )}

        </div>

        {/* ─── الفوتر وأزرار الحفظ (مضبوطة في أقصى الشمال تماماً بالـ RTL) ─── */}
        <div 
          style={{ 
            padding: "16px 24px", 
            backgroundColor: "#F8FAFC", 
            borderTop: "1px solid #F1F5F9", 
            display: "flex", 
            justifyContent: "flex-end", // في الـ RTL الـ flex-end يزقهم على أقصى الشمال (اليسار)
            alignItems: "center", 
            gap: "12px"
          }}
        >
          {/* زر إلغاء (هيكون على اليمين) */}
          <button 
            onClick={onClose} 
            style={{ backgroundColor: "transparent", color: "#003178", border: "none", padding: "10px 16px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            إلغاء
          </button>

          {/* زر حفظ السجل (هيكون على الحافة الشمال بالظبط) */}
          <button 
            onClick={handleFinalSave}
            style={{ 
              backgroundColor: "#F5A623", color: "#fff", border: "none", padding: "10px 24px", 
              borderRadius: "8px", fontWeight: "700", cursor: "pointer", fontSize: "14px",
              display: "flex", alignItems: "center", gap: "6px"
            }}
          >
            <Check size={16} strokeWidth={3} />
            <span>حفظ السجل</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterDamagedPartModal;