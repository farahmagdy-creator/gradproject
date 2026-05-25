/**
 * InventoryTable — جدول المخزون القابل لإعادة الاستخدام
 *
 * Props:
 *  - records     : مصفوفة العناصر
 *  - loading     : boolean
 *  - page        : الصفحة الحالية
 *  - totalCount  : إجمالي العناصر
 *  - pageSize    : عدد العناصر في الصفحة
 *  - onPageChange: دالة تغيير الصفحة
 *  - onAdd       : (اختياري) لو اتبعت بيظهر زرار + بدل ⋮ في عمود الإجراءات
 */

import React from "react";

const STATUS_STYLE = {
  "لم تستخدم": { background: "#2E63C9", color: "#f6f6f6" },
  "مستعملة":   { background: "#961F78", color: "#f6f6f6" },
};

const PAGE_SIZE_DEFAULT = 7;

/* ── عمود مستلم القطعة يظهر بس لو مفيش onAdd ── */
const getColumns = (hasAdd) => [
  { key: "name",      label: "القطعة",          align: "right"  },
  { key: "cost",      label: "التكلفة",          align: "center" },
  { key: "qty",       label: "الكمية المتوفرة",  align: "center" },
  { key: "status",    label: "الحالة",           align: "center" },
  { key: "date",      label: "تاريخ الشراء",     align: "center" },
  { key: "supplier",  label: "المورد",           align: "center" },
  ...(!hasAdd ? [{ key: "recipient", label: "مستلم القطعة", align: "center" }] : []),
  { key: "actions",   label: "إجراءات",          align: "center" },
];

/* ════════════════════════════════════════════════════════ */
const InventoryTable = ({
  records     = [],
  loading     = false,
  page        = 1,
  totalCount  = 0,
  pageSize    = PAGE_SIZE_DEFAULT,
  onPageChange,
  onAdd,                          // ← الجديد
}) => {
  const hasAdd    = typeof onAdd === "function";
  const COLUMNS   = getColumns(hasAdd);
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>

      {/* ══ Table ══ */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0", background: "#f2f4f6" }}>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  style={{
                    padding: "14px 16px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#6b7280",
                    textAlign: col.align,
                    whiteSpace: "nowrap",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "14px" }}>
                  جاري التحميل...
                </td>
              </tr>
            ) : records.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{ textAlign: "center", padding: "40px", color: "#9ca3af", fontSize: "14px" }}>
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              records.map((item, i) => (
                <tr
                  key={item.id ?? i}
                  style={{ borderBottom: "1px solid #f9f9f9", transition: "background 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f2f4f6"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* القطعة */}
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#111827", margin: 0 }}>{item.name}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>SKU:{item.sku}</p>
                  </td>

                  {/* التكلفة */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                    {item.cost?.toFixed(2)}
                  </td>

                  {/* الكمية */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "14px", color: "#374151" }}>
                    {item.qty}
                  </td>

                  {/* الحالة */}
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <span style={{
                      ...(STATUS_STYLE[item.status] ?? { background: "#e5e7eb", color: "#374151" }),
                      fontSize: "12px", fontWeight: "600",
                      borderRadius: "20px", padding: "4px 14px",
                      display: "inline-block",
                       fontFamily: "'Cairo', sans-serif",
                       whiteSpace: "nowrap",
                    }}>
                      {item.status}
                    </span>
                  </td>

                  {/* تاريخ الشراء */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
                    {item.date}
                  </td>

                  {/* المورد */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "13px", color: "#374151" }}>
                    {item.supplier}
                  </td>

                  {/* مستلم القطعة — بس في وضع المخزون */}
                  {!hasAdd && (
                    <td style={{ padding: "16px", textAlign: "center", fontSize: "13px", color: "#374151" }}>
                      {item.recipient}
                    </td>
                  )}

                  {/* إجراءات */}
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    {hasAdd ? (
                      /* زرار + في وضع الاختيار */
                      <button
                        onClick={() => onAdd(item)}
                        style={{
                          width: "28px", height: "28px", borderRadius: "8px",
                          border: "2px solid #003178", background: "none",
                          cursor: "pointer", color: "#003178",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          fontSize: "18px", fontWeight: "700", lineHeight: 1,
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#003178"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "none";    e.currentTarget.style.color = "#003178"; }}
                      >
                        +
                      </button>
                    ) : (
                      /* زرار ⋮ في وضع المخزون العادي */
                      <button
                        style={{
                          background: "none", border: "none",
                          cursor: "pointer", color: "#9ca3af",
                          fontSize: "20px", lineHeight: 1,
                          padding: "2px 8px", borderRadius: "6px",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >
                        ⋮
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ══ Pagination ══ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px", borderTop: "1px solid #f0f0f0",
        background: "#f2f4f6",
        flexWrap: "wrap", gap: "8px",
      }}>
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          عرض {Math.min((page - 1) * pageSize + 1, totalCount)} إلى {Math.min(page * pageSize, totalCount)} من {totalCount} عنصر
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              border: "none", background: "none",
              cursor: page === 1 ? "not-allowed" : "pointer",
              color: page === 1 ? "#d1d5db" : "#374151",
              fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >›</button>

          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span key={i} style={{ padding: "0 4px", color: "#9ca3af", fontSize: "13px" }}>...</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                style={{
                  width: "32px", height: "32px", borderRadius: "8px",
                  border: "none", cursor: "pointer",
                  fontSize: "13px", fontFamily: "'Cairo', sans-serif",
                  fontWeight: p === page ? "700" : "400",
                  background: p === page ? "#003178" : "none",
                  color: p === page ? "#fff" : "#374151",
                  transition: "background 0.15s",
                }}
              >{p}</button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              border: "none", background: "none",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              color: page === totalPages ? "#d1d5db" : "#374151",
              fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >‹</button>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
