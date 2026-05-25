/**
 * PageHeader — كومبوننت مشترك للهيدر + الستات كاردز
 *
 * Props:
 *  - title              : عنوان الصفحة (required)
 *  - subtitle           : النص التوضيحي تحت العنوان
 *  - actionLabel        : نص الزرار
 *  - actionIcon         : أيقونة الزرار (React element)
 *  - onAction           : دالة onClick للزرار
 *  - onActionMouseEnter : hover enter
 *  - onActionMouseLeave : hover leave
 *  - actionHovered      : boolean للـ hover state
 *  - stats              : [{ title, value, unit?, icon?, iconBg?, colSize? }, ...]
 */

import React from "react";

const PageHeader = ({
  title, subtitle,
  actionLabel, actionIcon, onAction,
  onActionMouseEnter, onActionMouseLeave, actionHovered,
  stats = [],
}) => {
  return (
    <>
      {/* ══ Header row ══ */}
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}
        dir="rtl"
      >
        <div style={{ textAlign: "right" }}>
          <h4 className="fw-bold mb-1" style={{ color: "#003178", fontSize: "30px", fontFamily: "'Cairo', sans-serif" }}>
            {title}
          </h4>
          {subtitle && (
            <p className="mb-0" style={{ color: "#434652", fontSize: "16px", fontFamily: "'Cairo', sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>

        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            onMouseEnter={onActionMouseEnter}
            onMouseLeave={onActionMouseLeave}
            style={{
              background: actionHovered
                ? "linear-gradient(to right, #1565c0, #0a2a6e)"
                : "linear-gradient(to right, #0d47a1, #003178)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              transform: actionHovered ? "translateY(-1px)" : "none",
              boxShadow: actionHovered ? "0 6px 20px rgba(0,49,120,0.35)" : "none",
              transition: "all 0.2s ease",
            }}
          >
            {actionIcon}
            {actionLabel}
          </button>
        )}
      </div>

      {/* ══ Stat Cards ══ */}
      {stats.length > 0 && (
        <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }} dir="rtl">
          {stats.map((stat, i) => {
            const cols    = stat.colSize ?? Math.floor(12 / stats.length);
            const widthPc = (cols / 20) * 100;
            return (
              <div key={i} style={{ flex: `0 0 calc(${widthPc}% - 16px)`, minWidth: 0 }}>
                <div
                  style={{
                    backgroundColor: "#F2F4F6",
                    borderRadius: "8px",
                    padding: "20px",
                    minHeight: "110px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontFamily: "'Cairo', sans-serif",
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "15px", fontWeight: "600", color: "#6b7280", marginBottom: "6px" }}>
                      {stat.title}
                    </p>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "1.8rem", fontWeight: "700", color: "#191C1E", lineHeight: 1 }}>
                        {stat.value}
                      </span>
                      {stat.unit && (
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>{stat.unit}</span>
                      )}
                    </div>
                  </div>

                  {stat.icon && (
                    <div
                      style={{
                        backgroundColor: stat.iconBg ?? "#e9ecef",
                        borderRadius: "8px",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "flex-start",
                      }}
                    >
                      {stat.icon}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default PageHeader;
