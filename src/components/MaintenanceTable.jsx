import React from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import StatusIcon from "./StatusIcon";

const COLUMNS = [
  "رقم الإيصال", "الجهاز", "العطل", "ما دفعه العميل",
  "التكلفة", "صافي", "نسبة الفني", "تاريخ الاستلام",
  "تاريخ التجهيز", "الحالة", "تاريخ التسليم", "الإجراء",
];

const MaintenanceTable = ({ records = [], page = 1, totalCount = 0, pageSize = 8, onPageChange, onView }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="rounded-5 border overflow-hidden bg-white shadow-sm" dir="rtl" style={{ borderColor: "#e2e8f0" }}>
      <div className="table-responsive">
        <table className="table  table-hover align-middle mb-0" style={{ fontSize: "0.85rem" }}>
          <thead>
            <tr className="border-bottom">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="text-center fw-semibold border-0 py-3"
                  style={{ fontSize: "0.8rem", whiteSpace: "nowrap", backgroundColor: "#F2F4F6", color: "#64748b" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center text-muted py-5 bg-white">
                  لا توجد بيانات
                </td>
              </tr>
            ) : (
              records.map((r) => (
                <tr key={r.id} className="border-bottom border-light bg-white">

                  {/* رقم الإيصال */}
                  <td
                    className="text-center py-3"
                    style={{ whiteSpace: "nowrap", color: "#003178", fontSize: "15px", fontWeight: "400" }}
                  >
                    #{r.receiptNo}
                  </td>

                  {/* الجهاز */}
                  <td
                    className="text-center"
                    style={{ color: "#003178", whiteSpace: "nowrap", fontSize: "15px", fontWeight: "500" }}
                  >
                    {r.device}
                  </td>

                  {/* العطل */}
                  <td
                    className="text-center"
                    style={{ color: "#191C1E", fontSize: "16px", fontWeight: "400" }}
                  >
                    {r.issue}
                  </td>

                  {/* ما دفعه العميل */}
                  <td
                    className="text-center"
                    style={{ color: "#003178", fontWeight: "900", fontSize: "15px" }}
                  >
                    {r.clientPaid?.toLocaleString()}
                  </td>

                  {/* التكلفة */}
                  <td
                    className="text-center"
                    style={{ color: "#A8A8A8", fontWeight: "900", fontSize: "16px" }}
                  >
                    {r.cost?.toLocaleString()}
                  </td>

                  {/* صافي */}
                  <td
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "900", color: "#C30A0D" }}
                  >
                    {r.net?.toLocaleString()}
                  </td>

                  {/* نسبة الفني */}
                  <td
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "700", color: "#28A745" }}
                  >
                    {r.techShare?.toLocaleString()}
                  </td>

                  {/* تاريخ الاستلام */}
                  <td
                    className="text-center"
                    style={{ color: "#748397", fontSize: "12px", fontWeight: "300", whiteSpace: "nowrap" }}
                  >
                    {r.receivedDate}
                  </td>

                  {/* تاريخ التجهيز */}
                  <td
                    className="text-center"
                    style={{ color: "#748397", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}
                  >
                    {r.readyDate}
                  </td>

                  {/* الحالة */}
                  <td className="text-center">
                    <StatusIcon status={r.status} />
                  </td>

                  {/* تاريخ التسليم */}
                  <td
                    className="text-center"
                    style={{ color: "#748397", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}
                  >
                    {r.deliveryDate}
                  </td>

                  {/* الإجراء */}
                  <td className="text-center">
                    <button
                      className="btn btn-link p-0  d-inline-flex align-items-center gap-1 text-decoration-none"
                      style={{ fontSize: "12px" , color:"#003178" , fontWeight:"700" }}
                      onClick={() => onView && onView(r)}
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

      {/* Pagination */}
      <div
        className="d-flex justify-content-between align-items-center px-4 py-3 border-top"
        dir="rtl"
        style={{ backgroundColor: "#F2F4F6" }}
      >
        <span className="text-secondary" style={{ fontSize: "0.82rem" }}>
          عرض {records.length} من أصل {totalCount} إيصال
        </span>
        <div className="d-flex gap-2">
          <button
            className="btn p-0 d-flex align-items-center justify-content-center"
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              border: "1px solid #cbd5e1", background: "#ffffff",
              color: page <= 1 ? "#cbd5e1" : "#64748b",
            }}
            onClick={() => onPageChange && onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronRight size={16} />
          </button>
          <button
            className="btn p-0 d-flex align-items-center justify-content-center"
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              border: "1px solid #cbd5e1", background: "#ffffff",
              color: page >= totalPages ? "#cbd5e1" : "#64748b",
            }}
            onClick={() => onPageChange && onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronLeft size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceTable;