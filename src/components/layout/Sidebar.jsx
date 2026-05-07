import { useState } from "react";
import { LayoutDashboard, FileText, Settings, LogOut, ShoppingCart, Plus, Receipt } from "lucide-react";
import SparepartModal from "../SparePartModal";

function Sidebar({ activePage, setActivePage, setShowForm }) {
  const [showModal, setShowModal] = useState(false);

  const navItems = [
    { label: "لوحة التحكم", key: "dashboard",  icon: <LayoutDashboard size={18} /> },
    { label: "الطلبات",     key: "orders",     icon: <FileText size={18} />        },
    { label: "الإيصالات",   key: "receipts",   icon: <Receipt size={18} />         },
    { label: "الإعدادات",   key: "settings",   icon: <Settings size={18} />        },
  ];

  return (
    <>
      <aside
        className="bg-white d-flex flex-column justify-content-between py-4 position-fixed end-0"
        style={{
          width: "220px",
          top: "56px",
          bottom: 0,
          zIndex: 1040,
          borderLeft: "1px solid #e9ecef",
        }}
        dir="rtl"
      >
        <div>
          {/* معلومات المحل */}
          <div className="px-3 mb-4">
            <div className="bg-light rounded-3 p-3 text-center">
              <div
                className="bg-white rounded-3 shadow-sm d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{ width: "44px", height: "44px" }}
              >
                <FileText size={20} className="text-primary" />
              </div>
              <p className="mb-0 fw-bold small text-dark">عباد الرحمن لخدمات المحمول</p>
            </div>
          </div>

          {/* زرار إيصال جديد */}
          <div className="px-3 mb-3">
            <button
              className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-bold"
              style={{ borderRadius: "10px" }}
              onClick={() => { setShowForm(true); setActivePage("receipts"); }}
            >
              <Plus size={16} />
              <span>إيصال جديد</span>
            </button>
          </div>

          {/* القائمة */}
          <nav className="nav flex-column px-2">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="nav-link d-flex align-items-center gap-2 rounded-3 mb-1"
                style={{
                  cursor: "pointer",
                  backgroundColor: activePage === item.key ? "#eef2ff" : "transparent",
                  color: activePage === item.key ? "#0d6efd" : "#6c757d",
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
        </div>

        {/* الأزرار السفلية */}
        <div className="px-3">
          <button
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mb-3 py-2 small fw-bold"
            onClick={() => setShowModal(true)}
          >
            <ShoppingCart size={16} />
            <span>طلب قطعة غيار</span>
          </button>

          <button className="btn text-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 small fw-bold border-0">
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
