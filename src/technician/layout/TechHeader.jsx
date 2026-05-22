import AppHeader from "../../components/layout/AppHeader";

const NAV_LINKS = [
  { label: "لوحة التحكم",  key: "dashboard" },
  { label: "إيصالاتي",     key: "receipts"  },
  { label: "سجل الصيانة",  key: "history"   },
  { label: "الملف الشخصي", key: "profile"   },
  { label: "المخزون",      key: "inventory" },
];

function TechHeader({ activePage, setActivePage }) {
  return (
    <AppHeader
      navLinks={NAV_LINKS}
      activePage={activePage}
      onNavigate={setActivePage}
      avatarSrc="image/tech nav photo.jpg"
      height={64}
    />
  );
}

export default TechHeader;
