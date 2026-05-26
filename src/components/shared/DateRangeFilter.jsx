import { Filter } from "lucide-react";

/**
 * DateRangeFilter — فلتر التاريخ الموحد
 *
 * Props:
 *  - fromDate        : قيمة تاريخ البداية
 *  - toDate          : قيمة تاريخ النهاية
 *  - onFromChange    : callback تغيير تاريخ البداية
 *  - onToChange      : callback تغيير تاريخ النهاية
 *  - onFilter        : callback زر التصفية (بدون status) أو onChange الـ select (مع status)
 *  - statusOptions   : مصفوفة [{ value, label }] — لو موجودة يظهر dropdown بدل زر التصفية
 *  - selectedStatus  : القيمة المختارة في الـ dropdown
 *  - variant         : 'filled' (خلفية رمادية) | 'white' (خلفية بيضاء) — default 'filled'
 */
const DateRangeFilter = ({
  fromDate,
  toDate,
  onFromChange,
  onToChange,
  onFilter,
  statusOptions,
  selectedStatus,
  variant = "filled",
}) => {
  const bg     = variant === "white" ? "#FFFFFF"  : "#F2F4F6";
  const border = variant === "white" ? "1px solid #E2E8F0" : "1px solid #E2E8F0";

  const divider = (
    <div style={{ width: "1px", height: "18px", backgroundColor: "#CBD5E1" }} />
  );

  return (
    <div
      dir="rtl"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: bg,
        border,
        borderRadius: "10px",
        padding: "8px 16px",
      }}
    >
      {/* من */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>من</span>
        <input
          type="date"
          style={{ border: "none", outline: "none", fontSize: "0.8rem", color: "#334155", backgroundColor: "transparent", width: "120px", cursor: "pointer" }}
          value={fromDate || ""}
          onChange={(e) => onFromChange?.(e.target.value)}
        />
      </div>

      {divider}

      {/* إلى */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>إلى</span>
        <input
          type="date"
          style={{ border: "none", outline: "none", fontSize: "0.8rem", color: "#334155", backgroundColor: "transparent", width: "120px", cursor: "pointer" }}
          value={toDate || ""}
          onChange={(e) => onToChange?.(e.target.value)}
        />
      </div>

      {divider}

      {/* زر التصفية أو Dropdown */}
      {statusOptions ? (
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Filter size={13} color="#475569" />
          <select
            style={{ border: "none", outline: "none", backgroundColor: "transparent", fontSize: "0.8rem", fontWeight: 600, color: selectedStatus ? "#BA1A1A" : "#475569", cursor: "pointer", boxShadow: "none" }}
            value={selectedStatus || ""}
            onChange={(e) => onFilter?.(e.target.value)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      ) : (
        <button
          onClick={onFilter}
          style={{ border: "none", background: "none", padding: 0, display: "flex", alignItems: "center", gap: "4px", color: "#475569", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
        >
          <Filter size={13} />
          تصفية
        </button>
      )}
    </div>
  );
};

export default DateRangeFilter;
