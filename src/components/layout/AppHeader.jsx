import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown } from "lucide-react";

/**
 * AppHeader — هيدر موحد للريسبشن والتكنشن
 *
 * Props:
 *  - navLinks    : [{ label, key, hasDropdown?, dropdownItems? }]
 *  - activePage  : الصفحة الحالية
 *  - onNavigate  : callback لما يضغط على لينك
 *  - avatarSrc   : مسار صورة البروفايل
 *  - height      : ارتفاع الهيدر (default 56px)
 */
function AppHeader({ navLinks = [], activePage, onNavigate, avatarSrc = "image/tech nav photo.jpg", height = 56 }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // إغلاق الـ dropdown لو ضغط برا
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (link) => {
    if (link.hasDropdown) {
      setOpenDropdown(openDropdown === link.key ? null : link.key);
    } else {
      setOpenDropdown(null);
      onNavigate(link.key);
    }
  };

  const handleDropdownItem = (itemKey) => {
    setOpenDropdown(null);
    onNavigate(itemKey);
  };

  // هل الـ link أو أي من أبناءه active؟
  const isLinkActive = (link) => {
    if (link.hasDropdown && link.dropdownItems) {
      return link.dropdownItems.some((item) => item.key === activePage) || activePage === link.key;
    }
    return activePage === link.key;
  };

  return (
    <div
      style={{
        height,
        backgroundColor: "#fafaf9",
        borderBottom: "1px solid #e9ecef",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "24px",
        paddingRight: "24px",
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1050,
      }}
    >
      {/* Logo */}
      <span style={{ fontSize: "18px", fontWeight: "bold" }}>
        <span style={{ color: "#0a2f5c" }}>Fix</span>
        <span style={{ color: "#f5a623" }}>Flow</span>
      </span>

      {/* Nav Links */}
      <div ref={dropdownRef} style={{ display: "flex", gap: "32px", alignItems: "center", position: "relative" }}>
        {navLinks.map((link) => {
          const active = isLinkActive(link);
          return (
            <div key={link.key} style={{ position: "relative" }}>
              {/* اللينك نفسه */}
              <span
                onClick={() => handleLinkClick(link)}
                style={{
                  cursor: "pointer",
                  color: active ? "#1d4ed8" : "#78716c",
                  fontWeight: active ? "600" : "normal",
                  fontSize: "14px",
                  borderBottom: active ? "2px solid #1d4ed8" : "none",
                  paddingBottom: "2px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  userSelect: "none",
                }}
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown
                    size={14}
                    style={{
                      transition: "transform 0.2s",
                      transform: openDropdown === link.key ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                )}
              </span>

              {/* Dropdown Menu */}
              {link.hasDropdown && openDropdown === link.key && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "#fff",
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                    minWidth: "130px",
                    zIndex: 2000,
                    overflow: "hidden",
                  }}
                >
                  {link.dropdownItems.map((item) => (
                    <div
                      key={item.key}
                      onClick={() => handleDropdownItem(item.key)}
                      style={{
                        padding: "10px 20px",
                        fontSize: "14px",
                        cursor: "pointer",
                        color: activePage === item.key ? "#1d4ed8" : "#374151",
                        fontWeight: activePage === item.key ? "600" : "normal",
                        backgroundColor: activePage === item.key ? "#eff6ff" : "transparent",
                        transition: "background-color 0.15s",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (activePage !== item.key) e.currentTarget.style.backgroundColor = "#f9fafb";
                      }}
                      onMouseLeave={(e) => {
                        if (activePage !== item.key) e.currentTarget.style.backgroundColor = "transparent";
                        else e.currentTarget.style.backgroundColor = "#eff6ff";
                      }}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bell + Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Bell size={20} color="#6c757d" style={{ cursor: "pointer" }} />
        <img
          src={avatarSrc}
          alt="avatar"
          style={{
            width: 34, height: 34,
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(37,99,235,.2)",
          }}
        />
      </div>
    </div>
  );
}

export default AppHeader;
