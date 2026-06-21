import { useState } from "react";
import {
  LayoutDashboard,
  ReceiptText,
  Store,
  User,
  Wallet,
  Briefcase,
  Settings,
  ClipboardCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AppSidebar from "../../components/layout/AppSidebar";
import SparepartModal from "../../components/SparePartModal";

const NAV_ITEMS = [
  { label: "لوحة التحكم",      key: "dashboard",       icon: <LayoutDashboard size={18} /> },
  { label: "الإيصالات",        key: "receipts",        icon: <ReceiptText size={18} />     },
  { label: "المخزون",          key: "inv_warehouse",   icon: <Store size={18} />           },
  { label: "إدارة الموظفين",   key: "staff",           icon: <User size={18} />            },
  { label: "يومية الحساب",     key: "accounting",      icon: <Wallet size={18} />          },
  { label: "ملف الشركة",       key: "company_profile", icon: <Briefcase size={18} />       },
  { label: "الإعدادات",        key: "settings",        icon: <Settings size={18} />        },
];

function OwnerSidebar({ activePage, setActivePage, setShowForm }) {
  const { user, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleNavigate = (key) => {
    setShowForm?.(false);
    setActivePage(key);
  };

  return (
    <>
      <AppSidebar
        navItems={NAV_ITEMS}
        activePage={activePage}
        onNavigate={handleNavigate}
        userName={user?.shopName || "اسم الشركة"}
        userRole="المالك"
        avatarSrc="image/company logo.png"
        bottomActions={[
          {
            label: "طلب قطعة غيار",
            icon: <ClipboardCheck size={16} />,
            onClick: () => setShowModal(true),
            style: { background: "#0d47a1", color: "#ffffff" },
          },
        ]}
        onLogout={logout}
        width={240}
      />
      <SparepartModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}

export default OwnerSidebar;
