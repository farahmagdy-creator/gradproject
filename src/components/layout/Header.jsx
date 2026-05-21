import { Bell } from "lucide-react";

function Header({ activePage, setActivePage, setShowForm }) {
  const navLinks = [
    { label: "لوحة التحكم", key: "dashboard" },
    { label: "الإيصالات",   key: "receipts"  },
    { label: "الاعدادات",     key: "settings"  },
  ];

  return (
    <div
      style={{
        height: "56px",
        backgroundColor: "#fafaf9",
        borderBottom: "1px solid #e9ecef",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "24px",
        paddingRight: "24px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 10,
        zIndex: 1050,
      }}
    >
      <span className="fw-bold" style={{ fontSize: "18px" }}>
  <span style={{ color: "#0a2f5c" }}>Fix</span>
  <span style={{ color: "#f5a623" }}>Flow</span>
</span>

      <div className="d-flex gap-4">
        {navLinks.map((link) => (
          <span
            key={link.key}
            onClick={() => { setActivePage(link.key); setShowForm(false); }}
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

     {/* Right: bell + avatar */}
        <div className="d-flex align-items-center gap-3">
          <Bell size={20} color="#6c757d" style={{ cursor: "pointer" }} />
          <img
            src="image/tech nav photo.jpg"
            alt="avatar"
            style={{
              width: 34,
              height: 34,
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

export default Header;
