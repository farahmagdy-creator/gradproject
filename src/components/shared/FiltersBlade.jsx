import React from "react";

const FiltersBlade = ({ fromDate, toDate, onFromChange, onToChange, onFilter }) => {
  return (
    <div 
      className="d-inline-flex align-items-center gap-3 border rounded-3 px-3 py-2" 
      dir="rtl"
      style={{ 
        backgroundColor: "#F2F4F6", 
        borderColor: "#E2E8F0" 
      }}
    >
      <div className="d-flex align-items-center gap-1">
        <span className="text-secondary" style={{ fontSize: "0.8rem" }}>من:</span>
        <input
          type="date"
          className="border-0 bg-transparent"
          style={{ fontSize: "0.8rem", outline: "none", color: "#334155" }}
          value={fromDate}
          onChange={(e) => onFromChange(e.target.value)}
        />
      </div>

      <div style={{ width: "1px", height: "16px", backgroundColor: "#cbd5e1" }}></div>

      <div className="d-flex align-items-center gap-1">
        <span className="text-secondary" style={{ fontSize: "0.8rem" }}>إلى:</span>
        <input
          type="date"
          className="border-0 bg-transparent"
          style={{ fontSize: "0.8rem", outline: "none", color: "#334155" }}
          value={toDate}
          onChange={(e) => onToChange(e.target.value)}
        />
      </div>

      <div style={{ width: "1px", height: "16px", backgroundColor: "#cbd5e1" }}></div>

      <button
        className="btn btn-sm d-flex align-items-center gap-1 border-0 p-0 fw-semibold"
        style={{ 
          color: "#475569", 
          fontSize: "0.8rem"
        }}
        onClick={onFilter}
      >
        {/* أيقونة التصفية (Filter) كـ inline SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="13" 
          height="13" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        تصفية
      </button>

    </div>
  );
};

export default FiltersBlade;