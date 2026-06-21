import { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerHeader from "./OwnerHeader";
import AppLayout from "../../components/layout/AppLayout";
import OwnerDashboard from "../pages/OwnerDashboard";
import OwnerReceiptsPage from "../pages/OwnerReceiptsPage";
import StaffManagementPage from "../pages/StaffManagement";
import ReceiptDetails from "../../pages/ReceiptDetails/index";
import CreateReceipt from "../../pages/CreateReceipt/index";

function ComingSoon({ label }) {
  return (
    <div dir="rtl" style={{ padding: "40px", fontWeight: 700 }}>
      {label} — قريباً
    </div>
  );
}

// تسميات الصفحات اللي لسه متبعتاهاش — هتستبدل بالصفحة الحقيقية لما تتحدد
const COMING_SOON_LABELS = {
  inv_warehouse:   "المخزون",
  accounting:      "يومية الحساب",
  company_profile: "ملف الشركة",
  settings:        "الإعدادات",
};

function OwnerDashboardLayout() {
  const [activePage, setActivePage] = useState(
    () => sessionStorage.getItem("fixflow_owner_activePage") || "dashboard"
  );
  const [showForm, setShowForm]           = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleNavigate = (page) => {
    setActivePage(page);
    sessionStorage.setItem("fixflow_owner_activePage", page);
  };

  const handleViewReceipt = (invoice) => {
    setSelectedReceipt(invoice);
    handleNavigate("receipt-details");
  };

  const renderPage = () => {
    if (showForm)                         return <CreateReceipt setShowForm={setShowForm} />;
    if (activePage === "receipts") {
      return (
        <OwnerReceiptsPage
          onViewReceipt={handleViewReceipt}
          onCreateNew={() => setShowForm(true)}
        />
      );
    }
    if (activePage === "receipt-details") return <ReceiptDetails receiptData={selectedReceipt || {}} />;
    if (activePage === "staff")           return <StaffManagementPage />;
    if (COMING_SOON_LABELS[activePage])   return <ComingSoon label={COMING_SOON_LABELS[activePage]} />;
    return <OwnerDashboard />;
  };

  return (
    <>
      <OwnerHeader
        activePage={activePage}
        setActivePage={handleNavigate}
        setShowForm={setShowForm}
      />
      <OwnerSidebar
        activePage={activePage}
        setActivePage={handleNavigate}
        setShowForm={setShowForm}
      />
      <AppLayout headerHeight={64} sidebarWidth={240}>
        {renderPage()}
      </AppLayout>
    </>
  );
}

export default OwnerDashboardLayout;
