/**
 * ClientReturnItemModal — مودال اختيار القطعة المراد إرجاعها لعميل
 *
 * Props:
 *  - show     : boolean
 *  - onClose  : دالة الإغلاق
 *  - onSave   : دالة الحفظ — بتاخد { returnedItems, invoice }
 *  - invoice  : { id, meta:[{label,value}], items:[{name,supplier,qty,unitPrice}] }
 *              لو مش متبعتش بيستخدم mockSaleInvoice كـ fallback
 *
 * Layout:
 *  ┌─────────────────────────────────────────────────────┐
 *  │ العنوان + رقم الفاتورة                              │
 *  ├─────────────────────────────────────────────────────┤
 *  │ هيدر الفاتورة (4 عناصر)                            │
 *  │ جدول كل القطع  — زرار — لحذف كل صف                │
 *  │ إجمالي كلي                                         │
 *  ├─────────────────────────────────────────────────────┤
 *  │ "القطعة المراد إرجاعها"                            │
 *  │ هيدر أمر الإرجاع (مصدر + تاريخ)                   │
 *  │ جدول القطع المختارة + حذف                          │
 *  │ إجمالي                                             │
 *  ├─────────────────────────────────────────────────────┤
 *  │ حفظ أمر الإرجاع  |  إلغاء                         │
 *  └─────────────────────────────────────────────────────┘
 */

import React, { useState, useMemo } from "react";
import { X, FileText, Trash2, Check, Minus } from "lucide-react";
import { mockSaleInvoice } from "../../data/mockData";

/* ══ shared styles ══ */
const sectionBox = {
  backgroundColor: "#F8F9FB",
  borderRadius: "14px",
  padding: "20px 24px",
  marginBottom: "20px",
};

const tableHeaderRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 44px",
  padding: "10px 0",
  borderBottom: "1px solid #e5e7eb",
  marginBottom: "4px",
};

const tableDataRow = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 44px",
  padding: "13px 0",
  borderBottom: "1px solid #f0f0f0",
  alignItems: "center",
};

const thStyle = (i) => ({
  fontSize: "13px",
  color: "#6b7280",
  fontWeight: "600",
  textAlign: i === 0 ? "right" : "center",
});

/* ════════════════════════════════════════════════════════════ */
const ClientReturnItemModal = ({ show, onClose, onSave, invoice: invoiceProp }) => {
  const invoice = invoiceProp ?? mockSaleInvoice;

  /* القطع المختارة للإرجاع — كل عنصر له key فريد */
  const [returnedKeys, setReturnedKeys] = useState([]);

  if (!show) return null;

  const allItems = invoice?.items ?? [];

  /* إجمالي الفاتورة الأصلية */
  const invoiceTotal = allItems.reduce(
    (sum, it) => sum + it.qty * it.unitPrice,
    0
  );

  /* إضافة قطعة للإرجاع بـ key = index */
  const markForReturn = (idx) => {
    setReturnedKeys((prev) =>
      prev.includes(idx) ? prev : [...prev, idx]
    );
  };

  /* إزالة قطعة من قائمة الإرجاع */
  const removeFromReturn = (idx) => {
    setReturnedKeys((prev) => prev.filter((k) => k !== idx));
  };

  /* القطع المختارة */
  const returnedItems = useMemo(
    () => returnedKeys.map((k) => ({ ...allItems[k], _key: k })),
    [returnedKeys, allItems]
  );

  /* إجمالي المرتجع */
  const returnTotal = returnedItems.reduce(
    (sum, it) => sum + it.qty * it.unitPrice,
    0
  );

  /* meta بيانات هيدر الفاتورة */
  const meta = invoice?.meta ?? [
    { label: "تاريخ الفاتورة", value: "—" },
    { label: "المشتري",         value: "—" },
    { label: "موبايل المشتري",  value: "—" },
    { label: "مصدر الفاتورة",   value: "—" },
  ];

  /* بيانات هيدر أمر الإرجاع */
  const returnMeta = [
    { label: "مصدر أمر الإرجاع", value: meta.find((m) => m.label === "مصدر الفاتورة")?.value ?? "—" },
    { label: "تاريخ المرتجع",     value: new Date().toLocaleDateString("ar-EG") },
  ];

  /* إغلاق + reset */
  const handleClose = () => {
    setReturnedKeys([]);
    onClose();
  };

  /* حفظ */
  const handleSave = () => {
    onSave?.({ returnedItems, invoice });
    handleClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1040,
        }}
      />

      {/* Modal */}
      <div
        dir="rtl"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050,
          backgroundColor: "#fff",
          borderRadius: "20px",
          width: "min(760px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          fontFamily: "'Cairo', sans-serif",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* ── زرار الإغلاق ── */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={20} />
        </button>

        {/* ── العنوان ── */}
        <div style={{ textAlign: "right", marginBottom: "24px" }}>
          <h3
            style={{
              color: "#BA1A1A",
              fontWeight: "700",
              fontSize: "26px",
              marginBottom: "4px",
            }}
          >
            اختر القطعة المراد إرجاعها
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
            رقم الفاتورة:{" "}
            <span style={{ color: "#003178", fontWeight: "700" }}>
              {invoice?.id}
            </span>
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            القسم 1: بيانات الفاتورة + جدول كل القطع
        ════════════════════════════════════════════════ */}
        <div style={sectionBox}>

          {/* هيدر الفاتورة */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${meta.length}, 1fr)`,
              gap: "16px",
              marginBottom: "20px",
              textAlign: "right",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "16px 20px",
            }}
          >
            {meta.map((m, i) => (
              <div key={i}>
                <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>
                  {m.label}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#111827",
                    margin: 0,
                  }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* هيدر الجدول */}
          <div style={tableHeaderRow}>
            {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي", ""].map((h, i) => (
              <span key={i} style={thStyle(i)}>
                {h}
              </span>
            ))}
          </div>

          {/* صفوف القطع */}
          {allItems.map((it, idx) => {
            const alreadySelected = returnedKeys.includes(idx);
            return (
              <div key={idx} style={tableDataRow}>
                {/* اسم القطعة */}
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {it.name}
                  </p>
                  {it.supplier && (
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                      المورد: {it.supplier}
                    </p>
                  )}
                </div>

                {/* الكمية */}
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {it.qty}
                </span>

                {/* سعر الوحدة */}
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {it.unitPrice.toFixed(2)}
                </span>

                {/* الإجمالي */}
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {(it.qty * it.unitPrice).toFixed(2)}
                </span>

                {/* زرار الإزالة / الإضافة للمرتجع */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MinusButton
                    active={alreadySelected}
                    onClick={() =>
                      alreadySelected
                        ? removeFromReturn(idx)
                        : markForReturn(idx)
                    }
                  />
                </div>
              </div>
            );
          })}

          {/* الإجمالي الكلي للفاتورة */}
          <TotalRow total={invoiceTotal} color="#003178" />
        </div>

        {/* ════════════════════════════════════════════════
            القسم 2: القطعة المراد إرجاعها
        ════════════════════════════════════════════════ */}
        {returnedItems.length > 0 && (
          <div style={sectionBox}>

            {/* هيدر القسم */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "700",
                  color: "#BA1A1A",
                }}
              >
                القطعة المراد إرجاعها
              </span>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  background: "#BA1A1A",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText size={15} color="#fff" />
              </div>
            </div>

            {/* هيدر أمر الإرجاع */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                marginBottom: "16px",
                textAlign: "right",
              }}
            >
              {returnMeta.map((m, i) => (
                <div key={i}>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      marginBottom: "4px",
                    }}
                  >
                    {m.label}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "700",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* هيدر جدول المرتجعات */}
            <div style={tableHeaderRow}>
              {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي", "إجراء"].map(
                (h, i) => (
                  <span key={i} style={thStyle(i)}>
                    {h}
                  </span>
                )
              )}
            </div>

            {/* صفوف القطع المختارة */}
            {returnedItems.map((it) => (
              <div key={it._key} style={tableDataRow}>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {it.name}
                  </p>
                  {it.supplier && (
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                      المورد: {it.supplier}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {it.qty}
                </span>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {it.unitPrice.toFixed(2)}
                </span>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#374151",
                  }}
                >
                  {(it.qty * it.unitPrice).toFixed(2)}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => removeFromReturn(it._key)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#BA1A1A",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      borderRadius: "6px",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#FFE4E4")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}

            {/* الإجمالي الكلي للمرتجع */}
            <TotalRow total={returnTotal} color="#BA1A1A" />
          </div>
        )}

        {/* ════════════════════════════════════════════════
            أزرار حفظ أمر الإرجاع والإلغاء
        ════════════════════════════════════════════════ */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={handleSave}
            disabled={returnedItems.length === 0}
            style={{
              background:
                returnedItems.length === 0
                  ? "#e5e7eb"
                  : "linear-gradient(to right, #9a0010, #BA1A1A)",
              color: returnedItems.length === 0 ? "#9ca3af" : "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "12px 28px",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "700",
              cursor: returnedItems.length === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "opacity 0.2s, transform 0.15s, box-shadow 0.2s",
              boxShadow:
                returnedItems.length > 0
                  ? "0 4px 14px rgba(186,26,26,0.3)"
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (returnedItems.length === 0) return;
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(186,26,26,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                returnedItems.length > 0
                  ? "0 4px 14px rgba(186,26,26,0.3)"
                  : "none";
            }}
          >
            <Check size={16} />
            حفظ أمر الإرجاع
          </button>

          <button
            type="button"
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              padding: "12px 8px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#374151")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            إلغاء
          </button>
        </div>
      </div>
    </>
  );
};

/* ════════════════════════════════════════════════════════════
   MinusButton — زرار الـ — لاختيار قطعة للإرجاع
════════════════════════════════════════════════════════════ */
const MinusButton = ({ active, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        border: "none",
        background: active
          ? "#BA1A1A"
          : hovered
          ? "#FFE4E4"
          : "#f3f4f6",
        color: active ? "#fff" : "#BA1A1A",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s, color 0.15s",
        flexShrink: 0,
      }}
    >
      <Minus size={13} />
    </button>
  );
};

/* ════════════════════════════════════════════════════════════
   TotalRow — صف الإجمالي الكلي
════════════════════════════════════════════════════════════ */
const TotalRow = ({ total, color }) => (
  <div
    style={{
      marginTop: "14px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "14px 18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <span style={{ fontSize: "18px", fontWeight: "700", color }}>
      {total.toFixed(2)}{" "}
      <span style={{ fontSize: "13px", color: "#6b7280" }}>ج.م</span>
    </span>
    <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>
      :الإجمالي الكلي
    </span>
  </div>
);

export default ClientReturnItemModal;
