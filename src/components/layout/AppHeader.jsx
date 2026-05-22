import { Bell } from "lucide-react";

/**
 * AppHeader — هيدر موحد للريسبشن والتكنشن
 *
 * Props:
 *  - navLinks    : [{ label, key }]
 *  - activePage  : الصفحة الحالية
 *  - onNavigate  : callback لما يضغط على لينك
 *  - avatarSrc   : مسار صورة البروفايل
 *  - height      : ارتفاع الهيدر (default 56px)
 */
function AppHeader({ navLinks = [], activePage, onNavigate, avatarSrc = "image/tech nav photo.jpg", height = 56 }) {
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
      <div style={{ display: "flex", gap: "32px" }}>
        {navLinks.map((link) => (
          <span
            key={link.key}
            onClick={() => onNavigate(link.key)}
            style={{
              cursor: "pointer",
              color: activePage === link.key ? "#1d4ed8" : "#78716c",
              fontWeight: activePage === link.key ? "600" : "normal",
              fontSize: "14px",
              borderBottom: activePage === link.key ? "2px solid #1d4ed8" : "none",
              paddingBottom: "2px",
            }}
          >
            {link.label}
          </span>
        ))}
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
