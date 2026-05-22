import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const TECHNICIANS = ["الكل", "بلال جمال", "أحمد سامي", "محمد علي", "سارة خالد"];

const PartsSearchBar = ({ search, onSearch, techFilter, onTechFilter }) => {
  return (
    <div className="d-flex align-items-center gap-2 flex-wrap" dir="rtl">

      {/* السيرش — على اليمين */}
      <div className="position-relative">
        <Search
          size={14}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#aaa",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="ابحث برقم القطعة أو التاريخ..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            paddingRight: "32px",
            paddingLeft: "10px",
            fontSize: "13px",
            width: "240px",
            borderRadius: "8px",
            fontFamily: "'Cairo', sans-serif",
            backgroundColor: "#f8f9fa",
            border: "1px solid #dee2e6",
          }}
        />
      </div>

      {/* الفلتر — على شمال السيرش */}
      <div className="dropdown">
        <button
          className="btn btn-sm dropdown-toggle d-flex align-items-center gap-1"
          type="button"
          data-bs-toggle="dropdown"
          style={{
            fontSize: "13px",
            borderRadius: "8px",
            fontFamily: "'Cairo', sans-serif",
            border: "1px solid #dee2e6",
            backgroundColor: techFilter !== "الكل" ? "#fff0ee" : "#f8f9fa",
            color: techFilter !== "الكل" ? "#e63946" : "#555",
            fontWeight: techFilter !== "الكل" ? "600" : "400",
            padding: "6px 10px",
          }}
        >
          <SlidersHorizontal size={14} />
          <span>{techFilter}</span>
        </button>
        <ul
          className="dropdown-menu"
          style={{
            fontSize: "13px",
            fontFamily: "'Cairo', sans-serif",
            minWidth: "150px",
          }}
        >
          {TECHNICIANS.map((t) => (
            <li key={t}>
              <button
                className="dropdown-item text-end"
                onClick={() => onTechFilter(t)}
                style={{
                  fontWeight: techFilter === t ? "700" : "400",
                  color: techFilter === t ? "#e63946" : "#333",
                }}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default PartsSearchBar;