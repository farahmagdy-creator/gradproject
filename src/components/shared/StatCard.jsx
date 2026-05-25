import React from "react";

const StatCard = ({ title, value, unit, accentColor = "#e63946", valueColor, dark, style, titleSize, valueSize }) => {
  if (dark) {
    return (
      <div
        className="rounded-3 p-3 h-100 d-flex flex-column justify-content-between"
        style={{ 
          background: "#003178", 
          minHeight: 90,
          ...style
        }}
        dir="rtl"
      >
        <p className="mb-0 text-white opacity-75" style={{ fontSize: titleSize ?? "0.78rem" }}>{title}</p>
        <div className="d-flex align-items-baseline gap-1 mt-2">
          <span className="text-white fw-bold" style={{ fontSize: valueSize ?? "2rem", lineHeight: 1 }}>{value ?? "—"}</span>
          {unit && <span className="text-white opacity-75" style={{ fontSize: titleSize ?? "0.78rem" }}>{unit}</span>}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-3 p-3 h-100 d-flex flex-column justify-content-between"
      style={{ 
        backgroundColor: "#ffffff",
        borderRight: `4px solid ${accentColor}`, 
        minHeight: 90, 
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        ...style
      }}
      dir="rtl"
    >
      <p className="mb-0 text-secondary" style={{ fontSize: titleSize ?? "0.78rem" }}>{title}</p>
      <div className="d-flex align-items-baseline gap-1 mt-2">
        <span className="fw-bold" style={{ fontSize: valueSize ?? "2rem", lineHeight: 1, color: valueColor ?? accentColor }}>
          {value ?? "—"}
        </span>
        {unit && <span className="text-secondary" style={{ fontSize: titleSize ?? "0.78rem" }}>{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;