import { AlertTriangle, CheckCircle2, Wrench } from "lucide-react";
import { useOwnerDashboard } from "../../hooks/useOwnerDashboard";
import DashboardReceiptsTable from "../../components/shared/DashboardReceiptsTable";
import WorkshopPerformanceCard from "../../components/shared/WorkshopPerformanceCard";

// ─── أيقونات بطاقات الإحصائيات ───────────────────────────────────────────────
const STAT_ICONS = {
  alert: <AlertTriangle size={22} />,
  check: <CheckCircle2 size={22} />,
  wrench: <Wrench size={22} />,
};

/**
 * OwnerDashboard — "لوحة التحكم" بتاعة المالك (نظرة عامة)
 * بتتفتح من الهيدر أو السايد بار لما يدوس المالك على "لوحة التحكم"
 */
function OwnerDashboard() {
  const { stats, recentUpdates, performance } = useOwnerDashboard();

  return (
    <div style={{ direction: "rtl", padding: "28px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>

      {/* عنوان الصفحة */}
      <div style={{ textAlign: "right", marginBottom: "24px" }}>
        <h4 style={{ fontWeight: "bold", color: "#1b1c1d", fontSize: "34px", marginBottom: "4px" }}>
          نظرة عامة
        </h4>
        <p style={{ color: "#434653", fontSize: "16px", margin: 0 }}>
          مرحباً بك . إليك الحالة الحالية لورشة الصيانة .
        </p>
      </div>

      {/* ─── بطاقات الإحصائيات ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRight: `4px solid ${s.accent}`,
              borderRadius: "16px",
              padding: "24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", color: s.badgeColor, background: s.badgeBg, padding: "4px 8px", borderRadius: "6px", fontWeight: "bold" }}>
                {s.badge}
              </span>
              <div style={{ width: 40, height: 40, background: s.accentBg, color: s.accent, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {STAT_ICONS[s.icon]}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold", fontSize: "36px", color: "#08060d", lineHeight: 1, marginBottom: "4px" }}>
                {s.value}
              </div>
              <div style={{ fontWeight: "600", fontSize: "14px", color: "#374151", marginBottom: "8px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "12px", color: s.subColor || "#9ca3af", fontWeight: "bold" }}>
                {s.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── جدول آخر التحديثات ─── */}
      <div style={{ marginBottom: "24px" }}>
        <DashboardReceiptsTable
          title="آخر التحديثات"
          titleColor="#1e3a8a"
          rows={recentUpdates}
        />
      </div>

      {/* ─── أداء الورشة ─── */}
      <WorkshopPerformanceCard data={performance} />

    </div>
  );
}

export default OwnerDashboard;
