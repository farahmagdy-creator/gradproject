import React from "react";
import { Filter } from "lucide-react";

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
        style={{ color: "#475569", fontSize: "0.8rem" }}
        onClick={onFilter}
      >
        <Filter size={13} />
        تصفية
      </button>

    </div>
  );
};

export default FiltersBlade;
