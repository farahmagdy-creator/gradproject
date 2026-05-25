import { LayoutDashboard, ReceiptText, ClipboardList, ShelvingUnit, User, Package, Settings } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AppSidebar from "../../components/layout/AppSidebar";

const NAV_ITEMS = [
  { label: "لوحة التحكم",                  key: "dashboard",    icon: <LayoutDashboard size={18} /> },
  { label: "إيصالاتي",                      key: "receipts",     icon: <ReceiptText size={18} />     },
  { label: "سجل الصيانة",                   key: "history",      icon: <ClipboardList size={18} />   },
  { label: "استهلاك المخزون و التلفيات",    key: "depreciation", icon: <ShelvingUnit size={18} />    },
  { label: "المخزون",                        key: "inv_warehouse", icon: <Package size={18} />         },
  { label: "الملف الشخصي و الأداء",         key: "profile",      icon: <User size={18} />            },
];

function TechSidebar({ activePage, setActivePage }) {
  const { user, logout } = useAuth();

  return (
    <AppSidebar
      navItems={NAV_ITEMS}
      activePage={activePage}
      onNavigate={setActivePage}
      userName={user?.name || "فني صيانة"}
      userRole={user?.specialty || "فني"}
      avatarSrc="image/Techprofile.jpg"
      bottomActions={[
        {
          label: "إعدادات",
          icon: <Settings size={18} />,
          onClick: () => setActivePage("settings"),
          style: { color: "#4b5563" },
        },
      ]}
      onLogout={logout}
      width={240}
    />
  );
}

export default TechSidebar;
