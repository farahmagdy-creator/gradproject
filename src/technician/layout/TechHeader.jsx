import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TechHeader({ activePage, setActivePage }) {
  const { user } = useAuth();

  const navLinks = [
    { label: "لوحة التحكم", key: "dashboard" },
    { label: "إيصالاتي",    key: "receipts"  },
    { label: "سجل الصيانة", key: "history"   },
    { label: "الملف الشخصي",key: "profile"   },
    { label: "المخزون",     key: "inventory" },
  ];

  return (
    <div
      style={{
        height: "64px",
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
        zIndex: 1050,
      }}
    >
        {/* Logo */}
        <span className="fw-bold" style={{ fontSize: "18px" }}>
  <span style={{ color: "#0d6efd" }}>Fix</span>
  <span style={{ color: "#F5A623" }}>Flow</span>
</span>

        {/* Nav links */}
        <div className="d-flex gap-4">
          {navLinks.map((link) => (
            <span
              key={link.key}
              onClick={() => setActivePage(link.key)}
              style={{
                cursor: "pointer",
                color: activePage === link.key ? "#0d6efd" : "#6c757d",
                fontWeight: activePage === link.key ? "600" : "normal",
                fontSize: "14px",
                borderBottom: activePage === link.key ? "2px solid #0d6efd" : "none",
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

export default TechHeader;
