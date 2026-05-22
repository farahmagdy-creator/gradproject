import { useState } from "react";
import { LayoutDashboard, Receipt, User, Plus, ShoppingCart } from "lucide-react";
import AppSidebar from "./AppSidebar";
import SparepartModal from "../SparePartModal";

const NAV_ITEMS = [
  { label: "لوحة التحكم",          key: "dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "الإيصالات",            key: "receipts",  icon: <Receipt size={18} />         },
  { label: "الملف الشخصي و الأداء",key: "profile",   icon: <User size={18} />            },
];

function Sidebar({ activePage, setActivePage, setShowForm, logout }) {
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = (key) => {
    setActivePage(key);
    setShowForm?.(false);
  };

  return (
    <>
      <AppSidebar
        navItems={NAV_ITEMS}
        activePage={activePage}
        onNavigate={handleNavigate}
        userName="إسراء أحمد"
        userRole="موظفة استقبال"
        avatarSrc="/image/reception.png"
        topActions={[
          {
            label: "إيصال جديد",
            icon: <Plus size={16} />,
            onClick: () => { setShowForm?.(true); setActivePage("receipts"); },
            style: {
              background: "linear-gradient(to right, #0d47a1, #003178)",
              color: "#ffffff",
            },
          },
        ]}
        bottomActions={[
          {
            label: "طلب قطعة غيار",
            icon: <ShoppingCart size={16} />,
            onClick: () => setShowModal(true),
            style: { background: "#0d47a1", color: "#ffffff" },
          },
        ]}
        onLogout={logout}
      />
      <SparepartModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default Sidebar;
