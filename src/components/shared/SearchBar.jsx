
import React from "react";
import { Search } from "lucide-react";

// ضفنا الـ placeholder والـ width كـ Props عشان نتحكم فيهم من بره
const SearchBar = ({ value, onChange, placeholder = "ابحث برقم الإيصال...", width = "100%" }) => {
  return (
    <div
      className="d-inline-flex align-items-center gap-2 border rounded-3 px-3 py-2"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E8F0",
        // بياخد الـ width المبعوت، ولو مش مبعوت بياخد 100% عشان يناسب المكان المحطوط فيه
        width: width, 
        boxSizing: "border-box",
      }}
    >
      <Search size={14} color="#94a3b8" />
      <input
        type="text"
        className="border-0 bg-transparent w-100"
        placeholder={placeholder} // متغير بناءً على المكان
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          outline: "none",
          fontSize: "0.8rem",
          color: "#334155",
          direction: "rtl",
        }}
      />
    </div>
  );
};

export default SearchBar;