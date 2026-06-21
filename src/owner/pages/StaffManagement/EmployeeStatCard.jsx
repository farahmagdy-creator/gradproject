import React from "react";

/**
 * EmployeeStatCard — كارت إحصائية بتصميم خاص لصفحة إدارة الموظفين
 *
 * Props:
 *  - badgeLabel  : النص داخل الوسم العلوي (مثلاً "عامل توصيل")
 *  - badgeColor  : لون نص الوسم
 *  - badgeBg     : لون خلفية الوسم
 *  - icon        : أيقونة الكارت (React element)
 *  - iconBg      : لون خلفية دائرة الأيقونة
 *  - accentColor : لون الشريط الجانبي
 *  - value       : الرقم الأساسي
 *  - label       : الوصف تحت الرقم
 *  - note        : ملاحظة صغيرة أسفل الكارت
 *  - noteColor   : لون الملاحظة
 */
const EmployeeStatCard = ({
  badgeLabel,
  badgeColor = "#434652",
  badgeBg = "#f2f2f2",
  icon,
  iconBg = "#e9ecef",
  accentColor = "#0d47a1",
  value,
  label,
  note,
  noteColor = "#6b7280",
}) => {
  return (
    <div
      className="d-flex flex-column"
      dir="rtl"
      style={{
        backgroundColor: "#ffffff",
        borderRight: `4px solid ${accentColor}`,
        borderRadius: "10px",
        padding: "18px 20px",
        minHeight: "150px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        flex: "1 1 0",
        minWidth: 0,
      }}
    >
      {/* الصف العلوي: الوسم + الأيقونة */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        {badgeLabel && (
          <span
            style={{
              backgroundColor: badgeBg,
              color: badgeColor,
              fontSize: "13px",
              fontWeight: "600",
              borderRadius: "20px",
              padding: "4px 14px",
              fontFamily: "'Cairo', sans-serif",
            }}
          >
            {badgeLabel}
          </span>
        )}
        {icon && (
          <div
            style={{
              backgroundColor: iconBg,
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* الرقم + التسمية */}
      <span style={{ fontSize: "2rem", fontWeight: "700", color: "#191C1E", lineHeight: 1 }}>
        {value}
      </span>
      <p className="mb-2 mt-1" style={{ fontSize: "14px", color: "#434652" }}>
        {label}
      </p>

      {/* ملاحظة سفلية */}
      {note && (
        <p className="mb-0 mt-auto" style={{ fontSize: "12px", color: noteColor, fontWeight: "600" }}>
          {note}
        </p>
      )}
    </div>
  );
};

export default EmployeeStatCard;
