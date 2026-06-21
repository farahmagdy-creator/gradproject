import { useState } from "react";
import { Toaster } from "react-hot-toast";

import { AuthProvider, useAuth } from "./context/AuthContext";

import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import AppLayout  from "./components/layout/AppLayout";
import Header     from "./components/layout/Header";
import Sidebar    from "./components/layout/Sidebar";

import Dashboard        from "./pages/Dashboard";
import InvoicesPage     from "./pages/InvoicesPage";
import ReceiptDetails   from "./pages/ReceiptDetails/index";
import CreateReceipt    from "./pages/CreateReceipt/index";
import ReceptionProfile from "./pages/ReceptionProfile";

import TechDashboardLayout from "./technician/layout/TechDashboardLayout";
import OwnerDashboardLayout from "./owner/layout/OwnerDashboardLayout";

// ─── صفحات الريسبشن ───────────────────────────────────────────────────────────

function ReceptionistApp() {
  const { logout } = useAuth();
  const [showForm, setShowForm]           = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [activePage, setActivePage]       = useState(
    () => sessionStorage.getItem("fixflow_activePage") || "dashboard"
  );

  const handleNavigate = (page) => {
    setActivePage(page);
    sessionStorage.setItem("fixflow_activePage", page);
  };

  const handleViewReceipt = (invoice) => {
    setSelectedReceipt(invoice);
    handleNavigate("receipt-details");
  };

  const renderPage = () => {
    if (showForm)                         return <CreateReceipt setShowForm={setShowForm} />;
    if (activePage === "receipts")        return <InvoicesPage onViewReceipt={handleViewReceipt} />;
    if (activePage === "receipt-details") return <ReceiptDetails receiptData={selectedReceipt || {}} />;
    if (activePage === "profile")         return <ReceptionProfile />;
    return <Dashboard />;
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={handleNavigate}
        setShowForm={setShowForm}
      />
      <Sidebar
        activePage={activePage}
        setActivePage={handleNavigate}
        setShowForm={setShowForm}
        logout={logout}
      />
      <AppLayout>
        {renderPage()}
      </AppLayout>
    </>
  );
}

// ─── الراوتر الرئيسي ──────────────────────────────────────────────────────────

function RootRouter() {
  const { user } = useAuth();
  const [authScreen, setAuthScreen] = useState("login");

  if (!user) {
    return authScreen === "register"
      ? <RegisterPage onNavigateLogin={() => setAuthScreen("login")} />
      : <LoginPage    onNavigateRegister={() => setAuthScreen("register")} />;
  }

  if (user.role === "technician")   return <TechDashboardLayout />;
  if (user.role === "owner")        return <OwnerDashboardLayout />;
  return <ReceptionistApp />;
}

// ─── الجذر ────────────────────────────────────────────────────────────────────

function App() {
  return (
    <AuthProvider>
      <RootRouter />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
