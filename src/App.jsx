import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import ReceiptDetails from "./pages/ReceiptDetails";
import CreateReceipt from "./pages/CreateReceipt";
import Dashboard from "./pages/Dashboard";
import InvoicesPage from "./pages/InvoicesPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [showForm, setShowForm]     = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    if (showForm)                    return <CreateReceipt setShowForm={setShowForm} />;
    if (activePage === "dashboard")  return <Dashboard />;
    if (activePage === "orders")     return <InvoicesPage />;
    if (activePage === "receipts")   return <ReceiptDetails />;
    return <Dashboard />;
  };

  return (
    <Router>
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        setShowForm={setShowForm}
      />
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        setShowForm={setShowForm}
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
        <Switch>
          <Route exact path="/">
            {renderPage()}
          </Route>
        </Switch>
      </main>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
