import { LogOut } from "lucide-react";

/**
 * AppSidebar — سايدبار موحد للريسبشن والتكنشن
 *
 * Props:
 *  - navItems      : [{ label, key, icon }]
 *  - activePage    : الصفحة الحالية
 *  - onNavigate    : callback للتنقل
 *  - userName      : اسم المستخدم
 *  - userRole      : الوظيفة
 *  - avatarSrc     : صورة البروفايل
 *  - topActions    : [{ label, icon, onClick, style }] — أزرار فوق الـ spacer
 *  - bottomActions : [{ label, icon, onClick, style }] — أزرار تحت الـ spacer
 *  - onLogout      : callback للخروج
 *  - width         : عرض السايدبار (default 220px)
 */
function AppSidebar({
  navItems = [],
  activePage,
  onNavigate,
  userName,
  userRole,
  avatarSrc,
  topActions = [],
  bottomActions = [],
  onLogout,
  width = 220,
}) {
  return (
    <aside
      style={{
        width,
        background: "#ffffff",
        borderLeft: "1px solid #e9ecef",
        position: "fixed",
        right: 0,
        top: "50px",
        bottom: 0,
        zIndex: 1040,
        display: "flex",
        flexDirection: "column",
        padding: "16px 0",
      }}
      dir="rtl"
    >
      {/* صورة واسم المستخدم */}
      {(avatarSrc || userName) && (
        <div style={{ textAlign: "center", marginBottom: "12px" }}>
          {avatarSrc && (
            <img
              src={avatarSrc}
              alt="profile"
              style={{
                width: 58, height: 58,
                borderRadius: "16px",
                objectFit: "cover",
                marginBottom: "10px",
                boxShadow: "0 10px 25px rgba(37,99,235,.12)",
              }}
            />
          )}
          {userName && (
            <h3 style={{ fontSize: "18px", margin: "0 0 4px", color: "#1e3a8a", fontWeight: 800 }}>
              {userName}
            </h3>
          )}
          {userRole && (
            <span style={{ color: "#434652", fontSize: "13px" }}>{userRole}</span>
          )}
        </div>
      )}

      {/* قائمة التنقل */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0 8px" }}>
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              border: "none",
              background: activePage === item.key ? "#dbeafe" : "transparent",
              color: activePage === item.key ? "#1e3a8a" : "#475569",
              fontWeight: activePage === item.key ? 700 : 500,
              fontSize: "14px",
              padding: "10px 12px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              textAlign: "right",
              width: "100%",
              transition: "all 0.2s",
            }}
          >
            <span style={{ flexShrink: 0 }}>{item.icon}</span>
            <span style={{ flex: 1, textAlign: "right" }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* أزرار إضافية فوق الـ spacer */}
      {topActions.length > 0 && (
        <div style={{ padding: "12px 8px 0" }}>
          {topActions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              style={{
                width: "100%",
                border: "none",
                borderRadius: "10px",
                padding: "10px 0",
                fontSize: "13px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                cursor: "pointer",
                marginBottom: "8px",
                ...action.style,
              }}
            >
              {action.icon}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* spacer */}
      <div style={{ flex: 1 }} />

      {/* أزرار سفلية */}
      <div style={{ padding: "0 8px", borderTop: "1px solid #eef2f7", paddingTop: "12px" }}>
        {bottomActions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              padding: "10px 12px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              marginBottom: "4px",
              fontSize: "13px",
              fontWeight: "bold",
              ...action.style,
            }}
          >
            {action.icon}
            <span style={{ flex: 1, textAlign: "right" }}>{action.label}</span>
          </button>
        ))}

        {/* زر الخروج دايماً في الآخر */}
        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              border: "none",
              background: "transparent",
              padding: "10px 12px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              color: "#ba1a1a",
              fontSize: "13px",
              fontWeight: "bold",
            }}
          >
            <LogOut size={16} />
            <span style={{ flex: 1, textAlign: "right" }}>خروج</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default AppSidebar;
