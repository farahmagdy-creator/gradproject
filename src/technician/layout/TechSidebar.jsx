import {
  LayoutDashboard,
  ReceiptText,
  ClipboardList,
  ShelvingUnit,
  User,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NAV_ITEMS = [
  { label: "لوحة التحكم", key: "dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "إيصالاتي",    key: "receipts",  icon: <ReceiptText size={18} /> },
  { label: "سجل الصيانة", key: "history",   icon: <ClipboardList size={18} /> },
  { label: "استهلاك المخزون و التلفيات", key: "depreciation",   icon: <ShelvingUnit size={18} /> },
  { label: "المخزون",     key: "inventory", icon: <Package size={18} /> },
  { label: "الملف الشخصي و الأداء",key: "profile",   icon: <User size={18} /> },
];

function TechSidebar({ activePage, setActivePage }) {
  const { user, logout } = useAuth();

  return (
    <aside
      dir="rtl"
      style={{
        width: "240px",
        background: "#ffffff",
        borderLeft: "1px solid #eef2f7",
        position: "fixed",
        right: 0,
        top: "50px",
        bottom: 0,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "20px 0px",
      }}
    >
      <div>
        {/* User info */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <img
            src="image/Techprofile.jpg"
            alt="tech"
            style={{
              width: "58px",
              height: "58px",
              borderRadius: "16px",
              objectFit: "cover",
              marginBottom: "10px",
              boxShadow: "0 10px 25px rgba(37,99,235,.12)",
            }}
          />
          <h3 style={{ fontSize: "18px", margin: "0 0 4px", color: "#1e3a8a", fontWeight: 800 }}>
            فني صيانة
          </h3>
          <span style={{ color: "#434652", fontSize: "13px" }}>
            {user?.name || "عباد الرحمن"}
          </span>
        </div>

        {/* Nav items — icon RIGHT, label LEFT (RTL: icon is at the start/right) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => setActivePage(item.key)}
              style={{
                border: "none",
                background: activePage === item.key ? "#dbeafe" : "transparent",
                color: activePage === item.key ? "#1e3a8a" : "#475569",
                padding: "13px 14px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                /* In RTL, flex-start = right side, so icon goes right, label left */
                flexDirection: "row",
                gap: "10px",
                cursor: "pointer",
                fontWeight: activePage === item.key ? 700 : 500,
                transition: ".2s",
                textAlign: "right",
                width: "100%",
              }}
            >
              {/* icon first (appears on RIGHT in RTL) */}
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span style={{ flex: 1, textAlign: "right" }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ borderTop: "1px solid #eef2f7", paddingTop: "18px" }}>
        <button
          onClick={() => setActivePage("settings")}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            padding: "12px 10px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
            color: "#4b5563",
            marginBottom: "6px",
            cursor: "pointer",
          }}
        >
          <Settings size={18} />
          <span style={{ flex: 1, textAlign: "right" }}>إعدادات</span>
        </button>

        <button
          onClick={logout}
          style={{
            width: "100%",
            border: "none",
            background: "transparent",
            padding: "12px 10px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
            color: "#b91c1c",
            cursor: "pointer",
          }}
        >
          <LogOut size={18} />
          <span style={{ flex: 1, textAlign: "right" }}>خروج</span>
        </button>
      </div>
    </aside>
  );
}

export default TechSidebar;
