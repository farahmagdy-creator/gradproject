import React from "react";
import { X } from "lucide-react";

const PurchaseInvoiceModal = ({ show, onClose, invoice }) => {
  if (!show) return null;

  const totalAll = invoice?.items?.reduce((sum, item) => sum + item.qty * item.unitPrice, 0) ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1040,
        }}
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
          width: "min(760px, 95vw)",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          fontFamily: "'Cairo', sans-serif",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* زرار الإغلاق */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "20px", right: "20px",
            background: "none", border: "none",
            cursor: "pointer", color: "#6b7280",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "4px",
          }}
        >
          <X size={20} />
        </button>

        {/* العنوان */}
        <div style={{ textAlign: "right", marginBottom: "24px" }}>
          <h3 style={{ color: "#003178", fontWeight: "700", fontSize: "26px", marginBottom: "4px" }}>
            فاتورة شراء قطع غيار
          </h3>
          <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>
            رقم الفاتورة: <span style={{ color: "#003178", fontWeight: "700" }}>{invoice?.id}</span>
          </p>
        </div>

        {/* بيانات الفاتورة */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            borderRadius: "12px",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "24px",
            textAlign: "right",
          }}
        >
          {[
            { label: "تاريخ الفاتورة", value: invoice?.date },
            { label: "المورد",          value: invoice?.supplier },
            { label: "مشتري الفاتورة", value: invoice?.buyer },
            { label: "مستلم الفاتورة", value: invoice?.recipient },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ fontSize: "12px", color: "#9ca3af", marginBottom: "4px" }}>{item.label}</p>
              <p style={{ fontSize: "15px", fontWeight: "700", color: "#111827", margin: 0 }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* جدول القطع */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "16px",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              padding: "14px 24px",
              borderBottom: "1px solid #e5e7eb",
              textAlign: "center",
            }}
          >
            {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي"].map((h, i) => (
              <span key={i} style={{ fontSize: "13px", color: "#6b7280", fontWeight: "600", textAlign: i === 0 ? "right" : "center" }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {invoice?.items?.map((item, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                padding: "14px 24px",
                borderBottom: i < invoice.items.length - 1 ? "1px solid #f0f0f0" : "none",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "#111827", margin: 0 }}>{item.name}</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>المورد: {item.supplier}</p>
              </div>
              <span style={{ textAlign: "center", fontSize: "14px", color: "#374151" }}>{item.qty}</span>
              <span style={{ textAlign: "center", fontSize: "14px", color: "#374151" }}>{item.unitPrice.toFixed(2)}</span>
              <span style={{ textAlign: "center", fontSize: "14px", color: "#374151" }}>{(item.qty * item.unitPrice).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* الإجمالي الكلي */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            borderRadius: "12px",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#003178" }}>
            {totalAll.toFixed(2)} <span style={{ fontSize: "14px" }}>ج.م</span>
          </span>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#374151" }}>:الإجمالي الكلي</span>
        </div>
      </div>
    </>
  );
};

export default PurchaseInvoiceModal;
