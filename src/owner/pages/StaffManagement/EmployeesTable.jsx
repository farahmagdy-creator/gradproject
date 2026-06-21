import React from "react";
import { Eye } from "lucide-react";
import { EMPLOYEE_STATUS_STYLE, DEFAULT_STATUS_STYLE } from "../../../data/statusStyles";

const COLUMNS = [
  { key: "name",   label: "الاسم",             align: "right"  },
  { key: "role",   label: "الدور",             align: "center" },
  { key: "email",  label: "البريد الالكتروني", align: "center" },
  { key: "status", label: "الحالة",            align: "center" },
  { key: "action", label: "الإجراء",          align: "center" },
];

const PAGE_SIZE_DEFAULT = 7;

/**
 * EmployeesTable — جدول الموظفين
 *
 * Props:
 *  - records     : مصفوفة الموظفين
 *  - loading     : boolean
 *  - page        : الصفحة الحالية
 *  - totalCount  : إجمالي العناصر
 *  - pageSize    : عدد العناصر في الصفحة
 *  - onPageChange: دالة تغيير الصفحة
 *  - onView      : callback(employee) — بيفتح عرض تفاصيل الموظف
 */
const EmployeesTable = ({
  records     = [],
  loading     = false,
  page        = 1,
  totalCount  = 0,
  pageSize    = PAGE_SIZE_DEFAULT,
  onPageChange,
  onView,
}) => {
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
                  لا يوجد موظفون يطابقون معايير البحث
                </td>
              </tr>
            ) : (
              records.map((emp, i) => (
                <tr
                  key={`${emp.empId}-${i}`}
                  style={{ borderBottom: "1px solid #f9f9f9", transition: "background 0.15s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f2f4f6"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  {/* الاسم */}
                  <td style={{ padding: "16px", textAlign: "right" }}>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "#111827", margin: 0 }}>{emp.name}</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>ID: {emp.empId}</p>
                  </td>

                  {/* الدور */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "13px", color: "#374151", fontWeight: "500" }}>
                    {emp.role}
                  </td>

                  {/* البريد الالكتروني */}
                  <td style={{ padding: "16px", textAlign: "center", fontSize: "13px", color: "#374151" }}>
                    {emp.email}
                  </td>

                  {/* الحالة */}
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <span style={{
                      ...(EMPLOYEE_STATUS_STYLE[emp.status] ?? DEFAULT_STATUS_STYLE),
                      fontSize: "12px", fontWeight: "600",
                      borderRadius: "20px", padding: "4px 16px",
                      display: "inline-block",
                      fontFamily: "'Cairo', sans-serif",
                      whiteSpace: "nowrap",
                    }}>
                      {emp.status}
                    </span>
                  </td>

                  {/* الإجراء */}
                  <td style={{ padding: "16px", textAlign: "center" }}>
                    <button
                      onClick={() => onView?.(emp)}
                      style={{
                        background: "none", border: "none",
                        cursor: "pointer", color: "#0d47a1",
                        fontSize: "13px", fontWeight: "600",
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        fontFamily: "'Cairo', sans-serif",
                      }}
                    >
                      <Eye size={14} />
                      عرض
                    </button>
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
          عرض {Math.min(page * pageSize, totalCount)} من أصل {totalCount} موظف
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

export default EmployeesTable;
