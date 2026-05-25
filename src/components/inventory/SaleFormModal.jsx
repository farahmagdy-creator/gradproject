/**
 * SaleFormModal — فورم تسجيل فاتورة بيع
 *
 * Props:
 *  - show    : boolean
 *  - onClose : دالة الإغلاق
 *  - onSave  : دالة الحفظ
 */

import React, { useState, useMemo } from "react";
import { X, FileText, Trash2, Check, User, Phone, Search } from "lucide-react";
import { mockInventoryItems } from "../../data/mockData";
import InventoryTable from "./InventoryTable";

/* ── ثوابت ── */
const PAGE_SIZE = 7;

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

/* ════════════════════════════════════════════════════════ */
const SaleFormModal = ({ show, onClose, onSave }) => {
  const [customerName,  setCustomerName]  = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [search,        setSearch]        = useState("");
  const [page,          setPage]          = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  if (!show) return null;

  /* ── فلترة المخزون ── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mockInventoryItems.filter((it) =>
      !q || it.name?.toLowerCase().includes(q) || it.sku?.toLowerCase().includes(q)
    );
  }, [search]);

  const pageRecords = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  /* ── إضافة / حذف قطعة ── */
  const addToInvoice = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((it) => it.id === item.id);
      if (exists) return prev.map((it) => it.id === item.id ? { ...it, qty: it.qty + 1 } : it);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromInvoice = (id) =>
    setSelectedItems((prev) => prev.filter((it) => it.id !== id));

  const total = selectedItems.reduce((sum, it) => sum + it.cost * it.qty, 0);

  /* ── حفظ وإلغاء ── */
  const handleSave = () => {
    onSave?.({ customerName, customerPhone, items: selectedItems, total });
    handleCancel();
  };

  const handleCancel = () => {
    setCustomerName(""); setCustomerPhone("");
    setSearch(""); setPage(1); setSelectedItems([]);
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
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1050, backgroundColor: "#fff",
          borderRadius: "20px", width: "min(860px, 96vw)",
          maxHeight: "92vh", overflowY: "auto",
          padding: "32px", fontFamily: "'Cairo', sans-serif",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        {/* زرار إغلاق */}
        <button
          onClick={handleCancel}
          style={{ position: "absolute", top: "20px", left: "20px", background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: "4px" }}
        >
          <X size={20} />
        </button>

        {/* العنوان */}
        <div style={{ textAlign: "right", marginBottom: "28px" }}>
          <h3 style={{ color: "#003178", fontWeight: "700", fontSize: "24px", marginBottom: "4px" }}>تسجيل فاتورة بيع</h3>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>قم بتسجيل القطع المباعة و بيانات العميل</p>
        </div>

        {/* ══ بيانات العميل ══ */}
        <div style={{ backgroundColor: "#F8F9FB", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={labelStyle}>اسم المشتري</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text" placeholder="ادخل اسم العميل..."
                  value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                />
                <User size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>موبايل المشتري</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text" placeholder="(+20)"
                  value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: "36px" }}
                />
                <Phone size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
              </div>
            </div>
          </div>
        </div>

        {/* ══ اختر القطعة ══ */}
        <div style={{ backgroundColor: "#F8F9FB", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>

          {/* هيدر */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontSize: "16px", fontWeight: "700", color: "#003178" }}>اختر القطعة التي تريد</span>
            <div style={{ width: "32px", height: "32px", background: "#003178", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={16} color="#fff" />
            </div>
          </div>

          {/* سيرش */}
          <div style={{ position: "relative", marginBottom: "16px" }}>
            <input
              type="text" placeholder="ابحث عن اسم القطعة أو SKU..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ ...inputStyle, backgroundColor: "#fff", paddingLeft: "36px" }}
            />
            <Search size={14} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
          </div>

          {/* التابل — نفس InventoryTable الأصلي مع onAdd */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", overflow: "hidden", border: "1px solid #f0f0f0" }}>
            <InventoryTable
              records={pageRecords}
              page={page}
              totalCount={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
              onAdd={addToInvoice}
            />
          </div>
        </div>

        {/* ══ الفاتورة ══ */}
        {selectedItems.length > 0 && (
          <div style={{ backgroundColor: "#F8F9FB", borderRadius: "14px", padding: "20px", marginBottom: "20px" }}>

            {/* هيدر */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginBottom: "16px" }}>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#003178" }}>الفاتورة</span>
              <FileText size={18} color="#003178" />
            </div>

            {/* بيانات العميل في الفاتورة */}
            <div style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "16px 20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "16px", textAlign: "right" }}>
              {[
                { label: "تاريخ الفاتورة",  value: new Date().toLocaleDateString("ar-EG") },
                { label: "المشتري",           value: customerName  || "—" },
                { label: "موبايل المشتري",   value: customerPhone || "—" },
                { label: "مصدر الفاتورة",    value: "—" },
              ].map((m, i) => (
                <div key={i}>
                  <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>{m.label}</p>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#111827", margin: 0 }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* رأس جدول الفاتورة */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px", padding: "10px 0", borderBottom: "1px solid #e5e7eb" }}>
              {["القطعة", "الكمية", "سعر الوحدة", "الإجمالي", ""].map((h, i) => (
                <span key={i} style={{ fontSize: "12px", color: "#9ca3af", fontWeight: "600", textAlign: i === 0 ? "right" : "center" }}>{h}</span>
              ))}
            </div>

            {/* صفوف الفاتورة */}
            {selectedItems.map((it) => (
              <div key={it.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 40px", padding: "12px 0", borderBottom: "1px solid #f0f0f0", alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#111827", margin: 0 }}>{it.name}</p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>المورد: {it.supplier}</p>
                </div>
                <span style={{ textAlign: "center", fontSize: "13px" }}>{it.qty}</span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>{it.cost?.toFixed(2)}</span>
                <span style={{ textAlign: "center", fontSize: "13px" }}>{(it.cost * it.qty).toFixed(2)}</span>
                <button
                  onClick={() => removeFromInvoice(it.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#ba1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}

            {/* الإجمالي */}
            <div style={{ marginTop: "16px", backgroundColor: "#fff", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "#003178" }}>
                {total.toFixed(2)} <span style={{ fontSize: "13px" }}>ج.م</span>
              </span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>:الإجمالي الكلي</span>
            </div>
          </div>
        )}

        {/* ══ أزرار الحفظ والإلغاء ══ */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button" onClick={handleSave}
            style={{ background: "linear-gradient(to right, #0d47a1, #003178)", color: "#fff", border: "none", borderRadius: "12px", padding: "12px 28px", fontSize: "14px", fontFamily: "'Cairo', sans-serif", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Check size={16} /> حفظ الفاتورة
          </button>
          <button
            type="button" onClick={handleCancel}
            style={{ background: "none", border: "none", color: "#6b7280", fontSize: "14px", fontFamily: "'Cairo', sans-serif", fontWeight: "600", cursor: "pointer", padding: "12px 8px" }}
          >
            إلغاء
          </button>
        </div>

      </div>
    </>
  );
};

export default SaleFormModal;
