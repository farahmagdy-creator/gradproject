import { Bell } from "lucide-react";

function Header({ activePage, setActivePage, setShowForm }) {
  const navLinks = [
    { label: "لوحة التحكم", key: "dashboard" },
    { label: "الطلبات",     key: "orders"    },
    { label: "الإيصالات",   key: "receipts"  },
    { label: "الإعدادات",   key: "settings"  },
  ];

  return (
    <div
      style={{
        height: "56px",
        backgroundColor: "#fff",
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
      <span className="fw-bold" style={{ color: "#0d6efd", fontSize: "18px" }}>
        FixFlow
      </span>

      <div className="d-flex gap-4">
        {navLinks.map((link) => (
          <span
            key={link.key}
            onClick={() => { setActivePage(link.key); setShowForm(false); }}
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

      <div className="d-flex align-items-center gap-3">
        <Bell size={20} color="#6c757d" style={{ cursor: "pointer" }} />
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: "#dee2e6",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default Header;
