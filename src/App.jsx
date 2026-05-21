import { useState } from "react";
import { Toaster } from "react-hot-toast";

/* ── Auth ── */
import { AuthProvider, useAuth } from "./context/AuthContext";

/* ── Auth pages ── */
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

/* ── Receptionist layout (existing) ── */
import Header  from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Dashboard     from "./pages/Dashboard";
import InvoicesPage  from "./pages/InvoicesPage";
import ReceiptDetails from "./pages/ReceiptDetails";
import CreateReceipt  from "./pages/CreateReceipt";
import ReceptionProfile  from "./pages/ReceptionProfile";

/* ── Technician layout ── */
import TechDashboardLayout from "./technician/layout/TechDashboardLayout";

function ReceptionistApp() {
  const { logout } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("fixflow_activePage") || "dashboard";
  });

  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleSetActivePage = (page) => {
    setActivePage(page);
    localStorage.setItem("fixflow_activePage", page);
  };

  const renderPage = () => {
    if (showForm)                          return <CreateReceipt setShowForm={setShowForm} />;
    if (activePage === "dashboard")        return <Dashboard />;
    if (activePage === "receipts")         return <InvoicesPage setActivePage={handleSetActivePage} setSelectedReceipt={setSelectedReceipt} />;
    if (activePage === "receipt-details")  return <ReceiptDetails receiptData={selectedReceipt || {}} />;
    if (activePage === "profile")          return <ReceptionProfile />;
    return <Dashboard />;
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={handleSetActivePage}
        setShowForm={setShowForm}
      />
      <Sidebar
        activePage={activePage}
        setActivePage={handleSetActivePage}
        setShowForm={setShowForm}
        logout={logout}
      />
      <main
        dir="rtl"
        style={{
          marginTop: "56px",
          marginRight: "220px",
          minHeight: "calc(100vh - 56px)",
          backgroundColor: "#f5f6fa",
          overflowY: "auto",
          padding: "24px",
        }}
      >
        {renderPage()}
      </main>
    </>
  );
}

function RootRouter() {
  const { user } = useAuth();
  const [authScreen, setAuthScreen] = useState("login");

  if (!user) {
    if (authScreen === "register") {
      return (
        <RegisterPage
          onNavigateLogin={() => setAuthScreen("login")}
          onLoginSuccess={() => {}}
        />
      );
    }
    return (
      <LoginPage
        onNavigateRegister={() => setAuthScreen("register")}
        onLoginSuccess={() => {}}
      />
    );
  }

  if (user.role === "technician")   return <TechDashboardLayout />;
  if (user.role === "receptionist") return <ReceptionistApp />;
  return <ReceptionistApp />;
}

function App() {
  return (
    <AuthProvider>
      <RootRouter />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
