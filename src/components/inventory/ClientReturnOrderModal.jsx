/**
 * ClientReturnOrderModal — مودال تسجيل أمر إرجاع لعميل
 *
 * Props:
 *  - show    : boolean
 *  - onClose : دالة الإغلاق
 *  - onSave  : دالة الحفظ (اختيارية)
 *
 * Flow:
 *  1) عرض قائمة فواتير البيع مع سيرش — اختيار فاتورة أو أكثر
 *  2) إدخال بيانات العميل (الاسم + الموبايل)
 *  3) عرض الفاتورة النهائية مع أزرار الحفظ والإلغاء
 */

import React, { useState, useMemo } from "react";
import {
  X, Search, ShoppingCart, Hash, DollarSign,
  Calendar, User, Phone, MapPin, FileText,
  Trash2, Check, Plus,
} from "lucide-react";
import { mockExternalSales, mockSaleInvoice } from "../../data/mockData";

/* ── ثوابت التنسيق ── */
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

/* ── DataItem مصغّر داخل كارت الفاتورة ── */
const DataItem = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "#4B5563",
      fontSize: "12.5px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ color: "#6B7280", display: "flex", alignItems: "center" }}>{icon}</span>
    <span>{label}</span>
  </div>
);

/* ════════════════════════════════════════════════════════════ */
const ClientReturnOrderModal = ({ show, onClose, onSave }) => {
  const [searchQuery,    setSearchQuery]    = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState([]); // الفواتير المختارة
  const [customerName,   setCustomerName]   = useState("");
  const [customerPhone,  setCustomerPhone]  = useState("");

  if (!show) return null;

  /* ── فلترة فواتير البيع بالسيرش ── */
  const filteredInvoices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mockExternalSales.filter((inv) =>
      !q ||
      inv.id?.toLowerCase().includes(q) ||
      inv.customer?.toLowerCase().includes(q) ||
      inv.customerPhone?.includes(q)
    );
  }, [searchQuery]);

  /* ── إضافة / إلغاء اختيار فاتورة ── */
  const toggleInvoice = (inv) => {
    setSelectedInvoices((prev) => {
      const exists = prev.find((it) => it.id === inv.id);
      if (exists) return prev.filter((it) => it.id !== inv.id);
      return [...prev, inv];
    });
  };
  const isSelected = (id) => selectedInvoices.some((it) => it.id === id);

  /* ── حساب الإجمالي ── */
  const grandTotal = selectedInvoices.reduce(
    (sum, inv) => sum + (inv.totalInvoice ?? 0),
    0
  );

  /* ── إعادة التهيئة عند الإغلاق ── */
  const handleClose = () => {
    setSearchQuery(""); setSelectedInvoices([]);
    setCustomerName(""); setCustomerPhone("");
    onClose();
  };

  /* ── حفظ ── */
  const handleSave = () => {
    onSave?.({
      customerName,
      customerPhone,
      invoices: selectedInvoices,
      grandTotal,
    });
    handleClose();
  };

  /* ── فواتير مختارة: قطع موحّدة لعرضها في الجدول ── */
  const invoiceItems = useMemo(() => {
    // نستخدم بيانات mockSaleInvoice كمرجع للقطع لكل فاتورة مختارة
    return selectedInvoices.flatMap((inv) =>
      (mockSaleInvoice.items || []).map((item, idx) => ({
        key: `${inv.id}-${idx}`,
        invoiceId: inv.id,
        name: item.name,
        supplier: item.supplier,
        qty: item.qty,
        unitPrice: item.unitPrice,
      }))
    );
  }, [selectedInvoices]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
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
          width: "min(880px, 96vw)",
          maxHeight: "92vh",
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
            position: "absolute", top: "20px", left: "20px",
            background: "none", border: "none",
            cursor: "pointer", color: "#6b7280", padding: "4px",
          }}
        >
          <X size={20} />
        </button>

        {/* ── العنوان ── */}
        <div style={{ textAlign: "right", marginBottom: "28px" }}>
          <h3
            style={{
              color: "#BA1A1A",
              fontWeight: "700",
              fontSize: "26px",
              marginBottom: "4px",
            }}
          >
            تسجيل أمر إرجاع لعميل
          </h3>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
            قم بأختيار فاتورة الشراء ثم حدد القطعة و السبب
          </p>
        </div>

        {/* ════════════════════════════════════════════════
            القسم 1: اختيار الفاتورة
        ════════════════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            borderRadius: "14px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
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
            <span style={{ fontSize: "15px", fontWeight: "700", color: "#BA1A1A" }}>
              اختر الفاتورة
            </span>
            <div
              style={{
                width: "34px", height: "34px",
                background: "#BA1A1A",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <FileText size={16} color="#fff" />
            </div>
          </div>

          {/* سيرش */}
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <input
              type="text"
              placeholder="ابحث برقم الفاتورة أو الموبايل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ ...inputStyle, backgroundColor: "#fff", paddingLeft: "36px" }}
            />
            <Search
              size={14}
              style={{
                position: "absolute", left: "12px", top: "50%",
                transform: "translateY(-50%)", color: "#9ca3af",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* قائمة الفواتير */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredInvoices.map((inv) => (
              <SaleInvoiceSelectCard
                key={inv.id}
                invoice={inv}
                selected={isSelected(inv.id)}
                onToggle={() => toggleInvoice(inv)}
              />
            ))}

            {filteredInvoices.length === 0 && (
              <div
                style={{
                  textAlign: "center", padding: "24px",
                  color: "#9ca3af", fontSize: "13px",
                }}
              >
                لا توجد فواتير تطابق البحث الحالي
              </div>
            )}
          </div>

          {/* زر إضافة للفاتورة */}
          {selectedInvoices.length > 0 && (
            <div style={{ marginTop: "14px" }}>
              <button
                type="button"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  background: "#e9f0ff", border: "none",
                  borderRadius: "10px", padding: "10px 20px",
                  fontSize: "13px", fontFamily: "'Cairo', sans-serif",
                  fontWeight: "700", color: "#003178",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#d0e2ff")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#e9f0ff")}
              >
                <Plus size={14} />
                إضافة للفاتورة
              </button>
            </div>
          )}
        </div>

        {/* ════════════════════════════════════════════════
            القسم 2: بيانات العميل
        ════════════════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: "#F8F9FB",
            borderRadius: "14px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>اسم المشتري</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="ادخل اسم العميل..."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                />
                <User
                  size={14}
                  style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#9ca3af",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>موبايل المشتري</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="(+20)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                />
                <Phone
                  size={14}
                  style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#9ca3af",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════
            القسم 3: الفاتورة النهائية
        ════════════════════════════════════════════════ */}
        {selectedInvoices.length > 0 && (
          <div
            style={{
              backgroundColor: "#F8F9FB",
              borderRadius: "14px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            {/* هيدر القسم */}
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "flex-end", gap: "8px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "15px", fontWeight: "700", color: "#003178" }}>
                الفاتورة
              </span>
              <FileText size={18} color="#003178" />
            </div>

            {/* بيانات هيدر الفاتورة */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginBottom: "16px",
                textAlign: "right",
              }}
            >
              {[
                { label: "تاريخ الفاتورة",  value: new Date().toLocaleDateString("ar-EG") },
                { label: "المشتري",           value: customerName  || "—" },
                { label: "موبايل المشتري",   value: customerPhone || "—" },
                { label: "مصدر الفاتورة",    value: selectedInvoices[0]?.saleSource || "—" },
              ].map((m, i) => (
                <div key={i}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>{m.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#111827", margin: 0 }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* رأس جدول القطع */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
                padding: "10px 4px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي", "إجراء"].map((h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "12px", color: "#9ca3af", fontWeight: "600",
                    textAlign: i === 0 ? "right" : "center",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* صفوف القطع */}
            {invoiceItems.map((it) => (
              <div
                key={it.key}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 40px",
                  padding: "12px 4px",
                  borderBottom: "1px solid #f0f0f0",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827", margin: 0 }}>
                    {it.name}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                    المورد: {it.supplier}
                  </p>
                </div>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>{it.qty}</span>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>
                  {it.unitPrice.toFixed(2)}
                </span>
                <span style={{ textAlign: "center", fontSize: "13px", color: "#374151" }}>
                  {(it.qty * it.unitPrice).toFixed(2)}
                </span>
                <button
                  type="button"
                  style={{
                    background: "none", border: "none",
                    cursor: "pointer", color: "#ba1a1a",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {/* الإجمالي الكلي */}
            <div
              style={{
                marginTop: "16px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#003178" }}>
                {grandTotal.toFixed(2)}{" "}
                <span style={{ fontSize: "13px" }}>ج.م</span>
              </span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>
                :الإجمالي الكلي
              </span>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════
            أزرار الحفظ والإلغاء
        ════════════════════════════════════════════════ */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={handleSave}
            style={{
              background: "linear-gradient(to right, #9a0010, #BA1A1A)",
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
              transition: "opacity 0.2s, transform 0.15s",
              boxShadow: "0 4px 14px rgba(186,26,26,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Check size={16} />
            حفظ الفاتورة
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
   SaleInvoiceSelectCard — كارت فاتورة بيع قابل للاختيار
════════════════════════════════════════════════════════════ */
const SaleInvoiceSelectCard = ({ invoice, selected, onToggle }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: selected ? "#fff5f5" : hovered ? "#f9fafb" : "#fff",
        borderRadius: "12px",
        border: selected
          ? "1.5px solid #BA1A1A"
          : hovered
          ? "1.5px solid #d1d5db"
          : "1.5px solid #e5e7eb",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        boxShadow: hovered && !selected
          ? "0 2px 12px rgba(0,0,0,0.06)"
          : selected
          ? "0 2px 14px rgba(186,26,26,0.1)"
          : "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>

        {/* Accent bar */}
        <div
          style={{
            width: "5px",
            background: selected ? "#BA1A1A" : "#28a745",
            flexShrink: 0,
            transition: "background 0.2s",
          }}
        />

        {/* المحتوى */}
        <div
          style={{
            flex: "1 1 auto",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* يمين: الأيقونة + رقم الفاتورة */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div
              style={{
                width: "36px", height: "36px",
                borderRadius: "8px",
                background: selected ? "#FFE4E4" : "#e6e8ea",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              <ShoppingCart size={16} color={selected ? "#BA1A1A" : "#003178"} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  background: selected ? "#FFE4E4" : "#d4edda",
                  color: selected ? "#BA1A1A" : "#402f61",
                  fontSize: "10px",
                  fontWeight: "700",
                  borderRadius: "5px",
                  padding: "3px 8px",
                  lineHeight: 1,
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                فاتورة بيع
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>
                {invoice.id}
              </span>
              <span style={{ fontSize: "11px", color: "#6B7280" }}>{invoice.date}</span>
            </div>
          </div>

          {/* وسط: البيانات */}
          <div
            style={{
              flex: "1 1 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, auto)",
              gap: "8px 28px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DataItem icon={<Hash size={13} />}       label={`${invoice.partsCount} قطعة`} />
            <DataItem icon={<DollarSign size={13} />}  label={`إجمالي الفاتورة : ${invoice.totalInvoice?.toLocaleString()}`} />
            <DataItem icon={<User size={13} />}         label={`المشتري : ${invoice.customer}`} />
            <DataItem icon={<Calendar size={13} />}    label={`تاريخ البيع : ${invoice.saleDate}`} />
            <DataItem icon={<User size={13} />}         label={`مصدر الفاتورة : ${invoice.saleSource}`} />
            <DataItem icon={<Phone size={13} />}        label={`موبايل المشتري : ${invoice.customerPhone}`} />
          </div>

          {/* شمال: مؤشر الاختيار */}
          <div
            style={{
              width: "22px", height: "22px",
              borderRadius: "50%",
              border: selected ? "2px solid #BA1A1A" : "2px solid #d1d5db",
              background: selected ? "#BA1A1A" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            {selected && <Check size={12} color="#fff" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReturnOrderModal;
