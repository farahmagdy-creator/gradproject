import AppHeader from "../../components/layout/AppHeader";

const NAV_LINKS = [
  { label: "لوحة التحكم", key: "dashboard" },
  { label: "الإيصالات",   key: "receipts"  },
  { label: "الإعدادات",   key: "settings"  },
];

function OwnerHeader({ activePage, setActivePage, setShowForm }) {
  const handleNavigate = (key) => {
    setShowForm?.(false);
    setActivePage(key);
  };

  return (
    <AppHeader
      navLinks={NAV_LINKS}
      activePage={activePage}
      onNavigate={handleNavigate}
      avatarSrc="image/photo.jpg"
      height={64}
    />
  );
}

export default OwnerHeader;
