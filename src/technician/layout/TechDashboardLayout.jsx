import { useState } from "react";
import TechSidebar from "./TechSidebar";
import TechHeader  from "./TechHeader";
import AppLayout   from "../../components/layout/AppLayout";
import TechProfile from "../pages/TechProfile";
import TechnicalDashboard from "../pages/TechnicalDashboard";
import PartsConsumptionPage from "../pages/PartsConsumptionPage";
import MaintenanceLog from "../pages/MaintenanceLog";
import PurchasesPage from "../pages/inventory/PurchasesPage";
import SalesManagementPage from "../pages/SalesManagementPage";
import ExternalSalesPage from "../pages/inventory/ExternalSalesPage";
import WarehousePage from "../pages/inventory/WarehousePage";
import DamagedPartsPage from "../pages/inventory/DamagedPartsPage";
import CenterReturns from "../pages/inventory/CenterReturnsPage";
import ClientsReturns from "../pages/inventory/ClientsReturns";
import AssignedReceipts from "../pages/AssignedReceipts";

function ComingSoon({ label }) {
  return (
    <div dir="rtl" style={{ padding: "40px", fontWeight: 700 }}>
      {label} — قريباً
    </div>
  );
}

const PAGES = {
  profile:       <TechProfile />,
  dashboard:     <TechnicalDashboard />,
  receipts:      <AssignedReceipts />,
  history:       <MaintenanceLog />,
  depreciation:  <PartsConsumptionPage />,
  settings:      <ComingSoon label="الإعدادات" />,
  // ── صفحات المخزون ──
  inv_purchases: <PurchasesPage />,
  inv_warehouse: <WarehousePage />,
  inv_sales:     <ComingSoon label="المبيعات" />,
  inv_returns:   <ComingSoon label="المرتجعات" />,
  inv_damages:   <DamagedPartsPage />,
  workshop_sales: <SalesManagementPage />,
  external_sales: <ExternalSalesPage />,
  // صفحات المرتجعات الجديدة
  inv_supplier_returns: <CenterReturns />,
  inv_customer_returns: <ClientsReturns />,
};

function TechDashboardLayout() {
  const [activePage, setActivePage] = useState(
    () => sessionStorage.getItem("fixflow_tech_activePage") || "dashboard"
  );

  const handleNavigate = (page) => {
    setActivePage(page);
    sessionStorage.setItem("fixflow_tech_activePage", page);
  };

  return (
    <>
      <TechHeader activePage={activePage} setActivePage={handleNavigate} />
      <TechSidebar activePage={activePage} setActivePage={handleNavigate} />
      <AppLayout headerHeight={64} sidebarWidth={240}>
        {PAGES[activePage] ?? PAGES.dashboard}
      </AppLayout>
    </>
  );
}

export default TechDashboardLayout;
