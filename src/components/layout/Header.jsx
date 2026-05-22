import AppHeader from "./AppHeader";

const NAV_LINKS = [
  { label: "لوحة التحكم", key: "dashboard" },
  { label: "الإيصالات",   key: "receipts"  },
  { label: "الاعدادات",   key: "settings"  },
];

function Header({ activePage, setActivePage, setShowForm }) {
  const handleNavigate = (key) => {
    setActivePage(key);
    setShowForm?.(false);
  };

  return (
    <AppHeader
      navLinks={NAV_LINKS}
      activePage={activePage}
      onNavigate={handleNavigate}
      avatarSrc="image/tech nav photo.jpg"
    />
  );
}

export default Header;
