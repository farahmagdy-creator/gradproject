import { Wrench, Clock, AlertTriangle } from "lucide-react";
import { useDashboard } from "../hooks/useDashboard";
import ReceiptTable from "../components/shared/ReceiptTable";

// ─── أعمدة جدول الداشبورد ─────────────────────────────────────────────────────

const DASHBOARD_COLUMNS = [
  { key: "id",          label: "رقم الإيصال",   width: "110px" },
  { key: "customer",    label: "العميل",          width: "160px" },
  { key: "device",      label: "الجهاز",          width: "160px" },
  { key: "issue",       label: "العطل",           width: "80px"  },
  { key: "tech",        label: "الفني",           width: "110px" },
  { key: "status",      label: "الحالة",          width: "110px" },
  { key: "deliveryDue", label: "موعد التسليم",   width: "120px" },
  { key: "tags",        label: "الوسم",           width: "120px" },
  { key: "action",      label: "الإجراء",         width: "75px"  },
];

// ─── أيقونات بطاقات الإحصائيات ───────────────────────────────────────────────

const STAT_ICONS = [
  <Wrench size={22} />,
  <AlertTriangle size={22} />,
  <Clock size={22} />,
];

// ─── المكون ───────────────────────────────────────────────────────────────────

function Dashboard() {
  const { stats, recentReceipts, todayDeliveries } = useDashboard();

  return (
    <div style={{ direction: "rtl", padding: "28px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>

      {/* عنوان الصفحة */}
      <div style={{ textAlign: "right", marginBottom: "24px" }}>
        <h4 style={{ fontWeight: "bold", color: "#1b1c1d", fontSize: "34px", marginBottom: "4px" }}>
          نظرة عامة
        </h4>
        <p style={{ color: "#434653", fontSize: "16px", margin: 0 }}>
          مرحبا بك . إليك ملخص اليوم .
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
                {STAT_ICONS[i]}
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

      {/* ─── جدول آخر التسليمات ─── */}
      <div style={{ marginBottom: "24px" }}>
        <ReceiptTable
          title="آخر التسليمات"
          titleColor="#1e3a8a"
          rows={recentReceipts}
          columns={DASHBOARD_COLUMNS}
          countLabel={`عرض ${recentReceipts.length} من أصل ${recentReceipts.length} إيصال`}
          onPrev={ () => {}}
          onNext={ () => {}}
        />
      </div>

      {/* ─── جدول أجهزة تسلم اليوم ─── */}
      <ReceiptTable
        title="أجهزة تسلم اليوم"
        titleColor="#ba1a1a"
        rows={todayDeliveries}
        columns={DASHBOARD_COLUMNS}
        countLabel={`عرض ${todayDeliveries.length} من أصل ${todayDeliveries.length} إيصال`}
        onPrev={ () => {}}
        onNext={ () => {}}
      />

    </div>
  );
}

export default Dashboard;
