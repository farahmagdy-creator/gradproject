import { useState } from "react";
import TechSidebar from "./TechSidebar";
import TechHeader  from "./TechHeader";
import AppLayout   from "../../components/layout/AppLayout";
import TechProfile from "../pages/TechProfile";

function ComingSoon({ label }) {
  return (
    <div dir="rtl" style={{ padding: "40px", fontWeight: 700 }}>
      {label} — قريباً
    </div>
  );
}

const PAGES = {
  profile:      <TechProfile />,
  dashboard:    <ComingSoon label="لوحة التحكم" />,
  receipts:     <ComingSoon label="إيصالاتي" />,
  history:      <ComingSoon label="سجل الصيانة" />,
  inventory:    <ComingSoon label="المخزون" />,
  depreciation: <ComingSoon label="استهلاك المخزون" />,
  settings:     <ComingSoon label="الإعدادات" />,
};

function TechDashboardLayout() {
  const [activePage, setActivePage] = useState("profile");

  return (
    <>
      <TechHeader activePage={activePage} setActivePage={setActivePage} />
      <TechSidebar activePage={activePage} setActivePage={setActivePage} />
      <AppLayout headerHeight={64} sidebarWidth={240}>
        {PAGES[activePage] ?? PAGES.dashboard}
      </AppLayout>
    </>
  );
}

export default TechDashboardLayout;
