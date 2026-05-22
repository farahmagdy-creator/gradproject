import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatusIcon from "./StatusIcon";

const COLUMNS = [
  { key: "partNo",     label: "رقم القطعة",  color: "#191C1E", fontWeight: "400" },
  { key: "partName",   label: "اسم القطعة",  color: "#191C1E", fontWeight: "400" },
  { key: "receiptNo",  label: "رقم الإيصال", color: "#434652", fontWeight: "400" },
  { key: "cost",       label: "التكلفة",     color: "#003178", fontWeight: "700" },
  { key: "date",       label: "التاريخ",     color: "#191C1E",    fontWeight: "400" },
  { key: "time",       label: "الوقت",       color: "#434652",    fontWeight: "400" },
  { key: "technician", label: "اسم الفني",   color: "#191C1E", fontWeight: "500" },
  { key: "status",     label: "حالة الجهاز", color: null,      fontWeight: null  },
];

const PartsTable = ({ records = [], loading, page = 1, totalCount = 0, pageSize = 8, onPageChange }) => {

  const totalPages = Math.ceil(totalCount / pageSize);
  const from = Math.min((page - 1) * pageSize + 1, totalCount);
  const to   = Math.min(page * pageSize, totalCount);

  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3)              return [1, 2, 3, 4, 5];
    if (page >= totalPages - 2) return [totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages];
    return [page-2, page-1, page, page+1, page+2];
  };

  return (
    <div className="table-responsive">
      <table
        className="table table-hover align-middle mb-0"
        style={{ fontSize: "13px", fontFamily: "'Cairo', sans-serif" }}
        dir="rtl"
      >
        <thead style={{ backgroundColor: "#f8f9fa" }}>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="text-center fw-semibold "
                style={{
                  fontSize: "14px",
                  padding: "20px 14px",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #dee2e6",
                  color:"#434652"
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
              <td colSpan={8} className="text-center py-5 text-secondary">
                <div className="spinner-border spinner-border-sm ms-2" role="status" />
                جاري التحميل...
              </td>
            </tr>
          ) : records.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-5 text-secondary">
                لا توجد نتائج
              </td>
            </tr>
          ) : (
            records.map((row, idx) => (
              <tr key={row.id ?? idx}>
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className="text-center"
                    style={{ padding: "12px 14px" }}
                  >
                    {col.key === "status" ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <StatusIcon status={row[col.key]} />
                      </div>
                    ) : (
                      <span style={{
                        color: col.color ?? "inherit",
                        fontWeight: col.fontWeight ?? "400",
                      }}>
                        {col.key === "cost"
                          ? Number(row[col.key]).toLocaleString()
                          : row[col.key]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {!loading && records.length > 0 && (
        <div
          className="d-flex align-items-center justify-content-between px-3 py-2"
          style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #efeff0" }}
          dir="rtl"
        >
          <span className="text-secondary" style={{ fontSize: "12px" }}>
            عرض {from} إلى {to} من أصل {totalCount} نتيجة
          </span>

          <ul className="pagination pagination-sm mb-0 gap-1">

            {/* السابق — RTL سهم يمين */}
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button
                className="page-link rounded-2"
                onClick={() => onPageChange(page - 1)}
                style={{ border: "1px solid #dee2e6" }}
                disabled={page === 1}
              >
                <ChevronRight size={13} />
              </button>
            </li>

            {getPages().map((p) => (
              <li key={p} className={`page-item ${p === page ? "active" : ""}`}>
                <button
                  className="page-link rounded-2"
                  onClick={() => onPageChange(p)}
                  style={
                    p === page
                      ? { backgroundColor: "#003178", borderColor: "#003178" }
                      : { border: "1px solid #dee2e6" }
                  }
                >
                  {p}
                </button>
              </li>
            ))}

            {/* التالي — RTL سهم شمال */}
            <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link rounded-2"
                onClick={() => onPageChange(page + 1)}
                style={{ border: "1px solid #dee2e6" }}
                disabled={page === totalPages}
              >
                <ChevronLeft size={13} />
              </button>
            </li>

          </ul>
        </div>
      )}
    </div>
  );
};

export default PartsTable;