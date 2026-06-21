import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import SearchBar from "../../../components/shared/SearchBar";

/**
 * EmployeesFilterBar
 * Props:
 *  - roleFilter    : الدور المختار حالياً
 *  - setRoleFilter : تغيير الدور
 *  - roleOptions   : قائمة الأدوار المتاحة
 *  - search        : نص البحث
 *  - setSearch     : تغيير نص البحث
 *  - actionLabel   : نص زرار الإجراء (اختياري، مثلاً "إضافة موظف جديد")
 *  - actionIcon    : أيقونة الزرار (اختياري)
 *  - onAction      : دالة onClick للزرار (اختياري)
 */
const EmployeesFilterBar = ({
  roleFilter, setRoleFilter, roleOptions,
  search, setSearch,
  actionLabel, actionIcon, onAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="d-flex align-items-center justify-content-between gap-3 mb-4 flex-wrap" dir="rtl">
      {/* السيرش */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="ابحث بإسم الموظف"
        width="320px"
      />

      {/* فلتر الأدوار */}
      <div style={{ position: "relative", width: "180px" }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            fontSize: "14px", borderRadius: "10px", fontFamily: "'Cairo', sans-serif",
            border: "1px solid #E0E3E5", backgroundColor: "#ffffff", color: "#212529",
            fontWeight: "500", width: "100%", height: "42px", padding: "5px 14px", marginRight: "240px",
            display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
          }}
        >
          <span>{roleFilter}</span>
          <ChevronDown size={13} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
        </button>

        {isOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 1040 }} onClick={() => setIsOpen(false)} />
            <ul style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 1050,
              backgroundColor: "#fff", border: "1px solid #e9ecef", borderRadius: "10px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)", listStyle: "none",
              padding: "6px", margin: 0, width: "100%",
              fontFamily: "'Cairo', sans-serif", fontSize: "13px",
            }}>
              {roleOptions.map((role) => (
                <li key={role}>
                  <button
                    type="button"
                    onClick={() => { setRoleFilter(role); setIsOpen(false); }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      justifyContent: "space-between", padding: "8px 12px",
                      borderRadius: "7px", border: "none", cursor: "pointer",
                      fontFamily: "'Cairo', sans-serif", fontSize: "13px",
                      fontWeight: roleFilter === role ? "600" : "400",
                      color: roleFilter === role ? "#1a1a1a" : "#555",
                      backgroundColor: roleFilter === role ? "#f1f3f5" : "transparent",
                      textAlign: "right",
                    }}
                    onMouseEnter={(e) => { if (roleFilter !== role) e.currentTarget.style.backgroundColor = "#f8f9fa"; }}
                    onMouseLeave={(e) => { if (roleFilter !== role) e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <span>{role}</span>
                    {roleFilter === role && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7L5.5 10.5L12 3.5" stroke="#434652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* زرار الإجراء */}
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          style={{
            background: "linear-gradient(to right, #0d47a1, #003178)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "'Cairo', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,49,120,0.25)",
          }}
        >
          {actionIcon}
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmployeesFilterBar;
