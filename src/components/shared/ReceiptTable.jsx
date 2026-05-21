import { ChevronLeft, ChevronRight } from "lucide-react";
import ReceiptTableRow from "./ReceiptTableRow";

/**
 * ReceiptTable — جدول إيصالات قابل للتخصيص
 *
 * Props:
 *  - title         : عنوان الجدول (اختياري)
 *  - titleColor    : لون العنوان
 *  - rows          : مصفوفة الإيصالات
 *  - columns       : مصفوفة [{ key, label, width }]
 *  - countLabel    : نص الـ footer
 *  - onView        : callback زر عرض
 *  - onPrev/onNext : pagination للداشبورد
 *  - currentPage / totalPages / onPageChange : pagination لصفحة الإيصالات
 */
const ReceiptTable = ({
  title,
  titleColor = "#1e3a8a",
  rows = [],
  columns = [],
  countLabel,
  onView,
  onPrev,
  onNext,
  currentPage,
  totalPages,
  onPageChange,
  emptyMessage = "لا توجد إيصالات",
}) => {
  const columnKeys = columns.map((c) => c.key);

  // الداشبورد بيستخدم onPrev/onNext — صفحة الإيصالات بتستخدم currentPage/totalPages/onPageChange
  const hasDashboardPagination = onPrev || onNext;
  const hasPagePagination = onPageChange != null;
  const showFooter = countLabel || hasDashboardPagination || hasPagePagination;

  return (
    <div style={{ borderRadius: "16px", background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

      {/* ─── Header (بس لو في عنوان) ─── */}
      {title && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid #e5e7eb", background: "#ffffff", borderRadius: "16px 16px 0 0" }}>
          <h6 style={{ fontWeight: "bold", color: titleColor, margin: 0, fontSize: "15px" }}>{title}</h6>
        </div>
      )}

      {/* ─── Table ─── */}
      {rows.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
          {emptyMessage}
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse", tableLayout: "auto", direction: "rtl" }}>
            <colgroup>
              {columns.map((col) => (
                <col key={col.key} style={{ width: col.width }} />
              ))}
            </colgroup>
            <thead>
              <tr style={{ background: "#f2f4f6" }}>
                {columns.map((col) => (
                  <th key={col.key} style={{ textAlign: "center", fontWeight: "600", padding: "12px", color: "#6b7280", whiteSpace: "normal", wordBreak: "break-word", lineHeight: "1.3", fontSize: "12px", borderBottom: "1px solid #e5e7eb" }}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <ReceiptTableRow
                  key={row.id}
                  invoice={row}
                  columns={columnKeys}
                  onView={onView}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── Footer ─── */}
      {showFooter && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderTop: "1px solid #e5e7eb", background: "#f2f4f6", borderRadius: "0 0 16px 16px" }}>
          <span style={{ fontSize: "13px", color: "#434652" }}>{countLabel}</span>

          {/* Pagination الداشبورد */}
          {hasDashboardPagination && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={onPrev} style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronRight size={14} />
              </button>
              <button onClick={onNext} style={{ background: "#fff", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronLeft size={14} />
              </button>
            </div>
          )}

          {/* Pagination صفحة الإيصالات */}
          {hasPagePagination && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ background: "#fff", border: "1px solid #e5e7eb", color: currentPage === 1 ? "#d1d5db" : "#374151", width: 32, height: 32, borderRadius: "6px", cursor: currentPage === 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ background: "#fff", border: "1px solid #e5e7eb", color: currentPage === totalPages ? "#d1d5db" : "#374151", width: 32, height: 32, borderRadius: "6px", cursor: currentPage === totalPages ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <ChevronLeft size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReceiptTable;
