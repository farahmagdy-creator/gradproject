import { useState } from "react";
import { LayoutDashboard, FileText, LogOut, ShoppingCart, Plus, Receipt, User } from "lucide-react";
import SparepartModal from "../SparePartModal";

function Sidebar({ activePage, setActivePage, setShowForm, logout }) {
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { label: "لوحة التحكم", key: "dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "الإيصالات",   key: "receipts",  icon: <Receipt size={18} />         },
    { label: "الملف الشخصي و الأداء", key: "profile", icon: <User size={18} /> },
  ];

  return (
    <>
      <aside
        className="bg-white d-flex flex-column py-4 position-fixed end-0"
        style={{
          width: "220px",
          top: "50px",
          bottom: 0,
          zIndex: 1040,
          borderLeft: "1px solid #e9ecef",
        }}
        dir="rtl"
      >
        {/* الصورة والاسم */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <img
            src="/image/reception.png"
            alt="receptionist"
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
            إسراء أحمد
          </h3>
          <span style={{ color: "#434652", fontSize: "13px" }}>موظفة استقبال</span>
        </div>

        {/* القائمة */}
        <nav className="nav flex-column px-2">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="nav-link d-flex align-items-center gap-2 rounded-3 mb-1"
              style={{
                cursor: "pointer",
                backgroundColor: activePage === item.key ? "#f8fafc" : "transparent",
                color: activePage === item.key ? "#1e3a8a" : "#475569",
                fontWeight: activePage === item.key ? "600" : "normal",
                fontSize: "14px",
                padding: "8px 12px",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setActivePage(item.key);
                setShowForm(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        {/* زرار إيصال جديد */}
        <div className="px-3 mt-3">
          <button
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-bold"
            style={{
              borderRadius: "10px",
              background: "linear-gradient(to right, #0d47a1, #003178)",
              color: "#ffffff",
            }}
            onClick={() => { setShowForm(true); setActivePage("receipts"); }}
          >
            <Plus size={16} />
            <span>إيصال جديد</span>
          </button>
        </div>

        {/* spacer */}
        <div style={{ flex: 1 }} />

        {/* الأزرار السفلية */}
        <div className="px-3">
          <button
            className="btn w-100 d-flex align-items-center justify-content-center gap-2 mb-3 py-2 small fw-bold"
            style={{ background: "#0d47a1", color: "#ffffff" }}
            onClick={() => setShowModal(true)}
          >
            <ShoppingCart size={16} />
            <span>طلب قطعة غيار</span>
          </button>

          <button className="btn text-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-bold border-0"
          onClick={logout} 
          >
            <LogOut size={16} />
            <span>خروج</span>
          </button>
        </div>
      </aside>

      <SparepartModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default Sidebar;