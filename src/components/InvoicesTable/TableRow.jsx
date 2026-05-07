import React from "react";
import { Eye, User } from "lucide-react";

const statusStyle = {
  "تم التسليم": { backgroundColor: "#28A745", color: "#fff" },
  "قيد الانتظار": { backgroundColor: "#fef9c3", color: "#854d0e" },
  "قيد الإصلاح": { backgroundColor: "#F9E37A", color: "#924" },
  جاهز: { backgroundColor: "#dbeafe", color: "#1e40af" },
  مرفوض: { backgroundColor: "#ffe4e6", color: "#9f1239" },
};

const tagStyle = {
  عاجل: { backgroundColor: "#dc3545", color: "#fff" },
  "إتصال أولا": { backgroundColor: "#2E63C9", color: "#fff" },
};

const TableRow = ({ invoice }) => {
  const sStyle = statusStyle[invoice.status] || { backgroundColor: "#e9ecef", color: "#333" };

  return (
    <tr style={{ fontSize: "13px" }}>
      <td className="fw-bold text-primary">{invoice.id}</td>

      <td>
        <div className="fw-semibold">{invoice.customerName}</div>
        <small className="text-muted">{invoice.phone}</small>
      </td>

      <td>{invoice.device}</td>

      <td>{invoice.issue}</td>

      <td className="text-muted">
        <div className="d-flex align-items-center justify-content-center gap-1">
          <User size={13} />
          <span>{invoice.tech}</span>
        </div>
      </td>

      <td className="text-muted">{invoice.receiveDate}</td>

      <td className="text-muted">{invoice.deliveryDue}</td>

      <td>
        <span
          style={{
            ...sStyle,
            borderRadius: "20px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: "500",
            whiteSpace: "nowrap",
          }}
        >
          {invoice.status}
        </span>
      </td>

      <td>
        <div className="d-flex flex-column gap-1 align-items-center">
          {invoice.tags.map((tag) => (
            <span
              key={tag}
              style={{
                ...tagStyle[tag],
                borderRadius: "6px",
                padding: "2px 8px",
                fontSize: "11px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {tag === "عاجل" ? "! عاجل" : tag}
            </span>
          ))}
        </div>
      </td>

      <td className="text-muted">
        {invoice.deliveredDate ? invoice.deliveredDate : "—"}
      </td>

      <td>
        <button
          className="btn btn-sm d-flex align-items-center gap-1 mx-auto"
          style={{
            color: "#0d6efd",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          <Eye size={15} />
          عرض
        </button>
      </td>
    </tr>
  );
};

export default TableRow;