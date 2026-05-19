import { useState } from "react";
import TechSidebar from "./TechSidebar";
import TechHeader from "./TechHeader"; 
import TechProfile from "../pages/TechProfile";

function ComingSoon({ label }) {
  return (
    <div dir="rtl" style={{ padding: "40px", fontWeight: 700 }}>
      {label}
    </div>
  );
}

function TechDashboardLayout() {
  const [activePage, setActivePage] = useState("profile");

  const renderPage = () => {
    switch (activePage) {
      case "profile":   return <TechProfile />;
      case "dashboard": return <ComingSoon label="لوحة التحكم" />;
      case "receipts":  return <ComingSoon label="إيصالاتي" />;
      case "history":   return <ComingSoon label="سجل الصيانة" />;
      case "inventory": return <ComingSoon label="المخزون" />;
      default:          return <ComingSoon label="الإعدادات" />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
        paddingRight: "240px",
        paddingTop: "64px",
      }}
    >
      <TechHeader activePage={activePage} setActivePage={setActivePage} />
      
      <TechSidebar activePage={activePage} setActivePage={setActivePage} />
      
      {/* المحتوى الرئيسي */}
      <main>{renderPage()}</main>
    </div>
  );
}

export default TechDashboardLayout;