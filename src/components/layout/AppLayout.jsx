/**
 * AppLayout — wrapper موحد للـ main content
 * بيحسب المسافات من الهيدر والسايدبار تلقائياً
 *
 * Props:
 *  - headerHeight  : ارتفاع الهيدر (default 56px)
 *  - sidebarWidth  : عرض السايدبار (default 220px)
 *  - children
 */
function AppLayout({ headerHeight = 56, sidebarWidth = 220, children }) {
  return (
    <main
      dir="rtl"
      style={{
        marginTop: headerHeight,
        marginRight: sidebarWidth,
        minHeight: `calc(100vh - ${headerHeight}px)`,
        backgroundColor: "#f5f6fa",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      {children}
    </main>
  );
}

export default AppLayout;
