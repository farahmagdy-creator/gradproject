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
  const [showForm,   setShowForm]   = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    if (showForm)                   return <CreateReceipt setShowForm={setShowForm} />;
    if (activePage === "dashboard") return <Dashboard />;
    if (activePage === "orders")    return <InvoicesPage />;
    if (activePage === "receipts")  return <ReceiptDetails />;
    if (activePage === "profile")   return <ReceptionProfile />;
    return <Dashboard />;
  };

  return (
    <>
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        setShowForm={setShowForm}
      />
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
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

  /* حالة الـ auth screen: "login" | "register" */
  const [authScreen, setAuthScreen] = useState("login");

  /* لو مفيش يوزر → صفحات الـ auth */
  if (!user) {
    if (authScreen === "register") {
      return (
        <RegisterPage
          onNavigateLogin={() => setAuthScreen("login")}
          onLoginSuccess={() => {/* after register, user is set in context */}}
        />
      );
    }
    return (
      <LoginPage
        onNavigateRegister={() => setAuthScreen("register")}
        onLoginSuccess={() => {/* user is set in context, re-render happens */}}
      />
    );
  }

  /* لو يوزر موجود → حسب الـ role */
  if (user.role === "technician")  return <TechDashboardLayout />;
  if (user.role === "receptionist") return <ReceptionistApp />;

  /* fallback */
  return <ReceptionistApp />;
}

/* ═══════════════════════════════════════════════════════════════════════════
   App — wraps everything with AuthProvider
═══════════════════════════════════════════════════════════════════════════ */
function App() {
  return (
    <AuthProvider>
      <RootRouter />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default App;
