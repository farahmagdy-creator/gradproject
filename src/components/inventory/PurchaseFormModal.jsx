/**
 * PurchaseFormModal — فورم تسجيل فاتورة شراء جديدة
 *
 * Props:
 *  - show    : boolean
 *  - onClose : دالة الإغلاق
 *  - onSave  : دالة الحفظ (بتاخد بيانات الفاتورة)
 */

import React, { useState } from "react";
import { X, FileText, Trash2, Plus, Check } from "lucide-react";

const EMPTY_ITEM = { name: "", supplier: "", qty: 1, unitPrice: 0 };

const inputStyle = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "13px",
  fontFamily: "'Cairo', sans-serif",
  backgroundColor: "#F8F9FB",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#374151",
  marginBottom: "6px",
  display: "block",
  fontFamily: "'Cairo', sans-serif",
};

const PurchaseFormModal = ({ show, onClose, onSave }) => {
  const [items,     setItems]     = useState([{ ...EMPTY_ITEM }]);
  const [buyer,     setBuyer]     = useState("");
  const [recipient, setRecipient] = useState("");
  const [date,      setDate]      = useState("");

  if (!show) return null;

  /* ── helpers ── */
  const updateItem = (i, field, value) => {
    setItems((prev) => prev.map((it, idx) => idx === i ? { ...it, [field]: value } : it));
  };

  const addItem = () => setItems((prev) => [...prev, { ...EMPTY_ITEM }]);

  const removeItem = (i) => setItems((prev) => prev.filter((_, idx) => idx !== i));

  const total = items.reduce((sum, it) => sum + Number(it.qty) * Number(it.unitPrice), 0);

  const handleSave = () => {
    onSave?.({ items, buyer, recipient, date, total });
    onClose();
  };

  const handleCancel = () => {
    setItems([{ ...EMPTY_ITEM }]);
    setBuyer("");
    setRecipient("");
    setDate("");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleCancel}
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1040 }}
      />

      {/* Modal */}
      <div
        dir="rtl"
        style={{
          position: "fixed",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
          backgroundColor: "#fff",
          borderRadius: "20px",
          width: "min(720px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          fontFamily: "'Cairo', sans-serif",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* زرار الإغلاق */}
        <button
          onClick={handleCancel}
          style={{ position: "absolute", top: "20px", left: "20px", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: "4px" }}
        >
          <X size={20} />
        </button>

        {/* العنوان */}
        <div style={{ textAlign: "right", marginBottom: "28px" }}>
          <h3 style={{ color: "#003178", fontWeight: "700", fontSize: "24px", marginBottom: "4px" }}>
            تسجيل فاتورة شراء
          </h3>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>إضافة قطع غيار جديدة للمخزون</p>
        </div>

        {/* ══ فورم إضافة قطعة ══ */}
        <div style={{ backgroundColor: "#F8F9FB", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>

          {items.map((item, i) => (
            <div key={i} style={{ marginBottom: i < items.length - 1 ? "20px" : 0 }}>

              {/* اسم القطعة */}
              <div style={{ marginBottom: "14px" }}>
                <label style={labelStyle}>اسم القطعة</label>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder={`مثال: شاشة iPhone 13 Pro Max`}
                    value={item.name}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "36px" }}
                  />
                  <FileText size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
                </div>
              </div>

              {/* الكمية + التكلفة */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
                <div>
                  <label style={labelStyle}>التكلفة</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="0.00"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateItem(i, "unitPrice", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "28px" }}
                    />
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "13px" }}>$</span>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>الكمية</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateItem(i, "qty", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "28px" }}
                    />
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "13px" }}>≡</span>
                  </div>
                </div>
              </div>

              {/* المورد + تاريخ الشراء */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={labelStyle}>تاريخ الشراء</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="سنة / شهر / يوم"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "28px" }}
                    />
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "13px" }}>📅</span>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>المورد</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      placeholder="ادخل اسم المورد..."
                      value={item.supplier}
                      onChange={(e) => updateItem(i, "supplier", e.target.value)}
                      style={{ ...inputStyle, paddingLeft: "28px" }}
                    />
                    <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "13px" }}>🏪</span>
                  </div>
                </div>
              </div>

            </div>
          ))}

          {/* زرار إضافة للفاتورة */}
          <button
            type="button"
            onClick={addItem}
            style={{
              marginTop: "16px",
              background: "#e8edf5",
              border: "none",
              borderRadius: "10px",
              padding: "10px 18px",
              fontSize: "13px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "600",
              color: "#003178",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Plus size={15} />
            إضافة للفاتورة
          </button>
        </div>

        {/* ══ الفاتورة ══ */}
        {items.some((it) => it.name) && (
          <div style={{ backgroundColor: "#F8F9FB", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>

            {/* هيدر الفاتورة */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#003178" }}>الفاتورة</span>
              <FileText size={18} color="#003178" />
            </div>

            {/* رأس الجدول */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px", padding: "10px 0", borderBottom: "1px solid #e5e7eb", marginBottom: "4px" }}>
              {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي", "إجراء"].map((h, i) => (
                <span key={i} style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", textAlign: i === 0 ? "right" : "center" }}>{h}</span>
              ))}
            </div>

            {/* الصفوف */}
            {items.filter((it) => it.name).map((it, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px", padding: "12px 0", borderBottom: "1px solid #f0f0f0", alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827", margin: 0 }}>{it.name}</p>
                  {it.supplier && <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>المورد: {it.supplier}</p>}
                </div>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>{it.qty}</span>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>{Number(it.unitPrice).toFixed(2)}</span>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>{(Number(it.qty) * Number(it.unitPrice)).toFixed(2)}</span>
                <button
                  onClick={() => removeItem(items.indexOf(it))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {/* الإجمالي + مشتري + مستلم */}
            <div
              style={{
                marginTop: "16px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#003178" }}>
                {total.toFixed(2)} <span style={{ fontSize: "13px" }}>ج.م</span>
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>:مشتري القطع</span>
                  <input
                    type="text"
                    placeholder="الاسم"
                    value={buyer}
                    onChange={(e) => setBuyer(e.target.value)}
                    style={{ ...inputStyle, width: "130px", padding: "6px 10px", fontSize: "12px" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600" }}>:مستلم القطع</span>
                  <input
                    type="text"
                    placeholder="الاسم"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={{ ...inputStyle, width: "130px", padding: "6px 10px", fontSize: "12px" }}
                  />
                </div>
              </div>

              <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>:الإجمالي الكلي</span>
            </div>
          </div>
        )}

        {/* ══ أزرار الحفظ والإلغاء ══ */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: "linear-gradient(to right, #0d47a1, #003178)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Check size={16} />
            حفظ الفاتورة
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 8px",
            }}
          >
            إلغاء
          </button>
        </div>

      </div>
    </>
  );
};

export default PurchaseFormModal;
