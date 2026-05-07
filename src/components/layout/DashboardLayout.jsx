import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

function DashboardLayout({ children }) {
  // Controls form visibility state
  const [showForm, setShowForm] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-light)",
      }}
    >
      {/* Main header */}
      <Header />

      {/* Layout container */}
      <div
        className="d-flex"
        style={{
          height: "calc(100vh - 70px)",
          direction: "ltr",
        }}
      >
        {/* Scrollable main content */}
        <div
          className="flex-grow-1 p-4"
          style={{
            overflowY: "auto",
            direction: "rtl",
          }}
        >
          {children({ showForm, setShowForm })}
        </div>

        {/* Fixed sidebar */}
        <div
          style={{
            width: "250px",
            height: "100%",
            position: "sticky",
            top: 0,
            direction: "rtl",
            borderLeft: "1px solid var(--border-color)",
            background: "#fff",
          }}
        >
          <Sidebar setShowForm={setShowForm} />
        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;