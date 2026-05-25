import React from "react";

export default function FiltersDropdownBlade({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onFilter,
  selectedStatus
}) {
  return (
    <div
      dir="rtl"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "10px",
        padding: "10px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>من</span>
        <input
          type="date"
          style={{
            border: "none",
            outline: "none",
            fontSize: "0.8rem",
            color: "#334155",
            backgroundColor: "transparent",
            width: "120px",
            cursor: "pointer",
          }}
          value={fromDate || ""}
          onChange={(e) => onFromChange && onFromChange(e.target.value)}
        />
      </div>

      <div style={{ width: "1px", height: "18px", backgroundColor: "#E2E8F0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>إلى</span>
        <input
          type="date"
          style={{
            border: "none",
            outline: "none",
            fontSize: "0.8rem",
            color: "#334155",
            backgroundColor: "transparent",
            width: "120px",
            cursor: "pointer",
          }}
          value={toDate || ""}
          onChange={(e) => onToChange && onToChange(e.target.value)}
        />
      </div>

      <div style={{ width: "1px", height: "18px", backgroundColor: "#E2E8F0" }} />

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        <select
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: selectedStatus ? "#BA1A1A" : "#475569",
            cursor: "pointer",
            boxShadow: "none",
          }}
          value={selectedStatus || ""}
          onChange={(e) => onFilter && onFilter(e.target.value)}
        >
          <option value="">تصفية (الكل)</option>
          <option value="customer_type">مرتجع عميل</option>
          <option value="tech_type">مرتجع فني</option>
          <option value="before_return">المورد قبل الإرجاع</option>
          <option value="rejected">المورد رفض الإرجاع</option>
          <option value="in_progress">تحت الإرجاع</option>
          <option value="send_back">إرجاع للمورد</option>
        </select>
      </div>
    </div>
  );
}