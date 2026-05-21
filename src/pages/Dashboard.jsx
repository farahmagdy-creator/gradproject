import {
  Wrench,
  Clock,
  AlertTriangle,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Phone,
} from "lucide-react";

// ─── البيانات ─────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "بانتظار الاستلام",
    value: "08",
    icon: <Wrench size={22} />,
    badge: "جاهز",
    badgeColor: "#ffffff",
    badgeBg: "#1d4ed8",
    accent: "#1d4ed8",
    accentBg: "#1d4fd838",
    sub: "من التزامات اليوم",
  },
  {
    label: "يسلم اليوم",
    value: "14",
    icon: <AlertTriangle size={22} />,
    badge: "هام",
    badgeColor: "#ba1a1a",
    badgeBg: "#ffdad6",
    accent: "#ba1a1a",
    accentBg: "#ffdad6",
    sub: "تأكد من انتهاء الصيانة قبل موعد التسليم اليوم",
    subColor: "#ba1a1a",
    urgent: true,
  },
  {
    label: "--------------------------------",
    value: "-------------------",
    icon: <Clock size={22} />,
    badge: "ملاحظات",
    badgeColor: "#6d5e00",
    badgeBg: "#f9e37a",
    accent: "#6d5e00",
    accentBg: "#f9e37a",
    sub: "أضف ملاحظاتك للتذكير",
  },
];

const receipts = [
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "بعد 1 يوم", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "بعد 1 يوم", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "بعد 1 يوم", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "بعد 1 يوم", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "بعد 1 يوم", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
];

const todayDeliveries = [
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "جاهز للتسليم", statusColor: "#ffffff", statusBg: "#007bff", due: "بعد 1 ساعة", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "جاهز للتسليم", statusColor: "#ffffff", statusBg: "#007bff", due: "10م", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "جاهز للتسليم", statusColor: "#ffffff", statusBg: "#007bff", due: "12م", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "1ص", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#211b00", statusBg: "#f9e37a", due: "2ص", dueColor: "#602100", season: "إتصال أولاً", seasonColor: "#ffffff", seasonBg: "#2e63c9" },
];

const tableColumns = [
  { label: "رقم الإيصال", width: "110px" },
  { label: "العميل", width: "160px" },
  { label: "الجهاز", width: "160px" },
  { label: "العطل", width: "80px" },
  { label: "الفني", width: "110px" },
  { label: "الحالة", width: "110px" },
  { label: "موعد التسليم", width: "120px" },
  { label: "الوسم", width: "120px" },
  { label: "الإجراء", width: "75px" },
];

// ─── مكون صف الجدول ───────────────────────────────────────────────────────────

const TableRow = ({ r, i }) => (
  <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
    <td style={{ textAlign: "right", padding: "12px", fontWeight: "bold", color: "#003178", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
      {r.id}
    </td>
    <td style={{ textAlign: "right", padding: "12px", overflow: "hidden" }}>
      <div style={{ fontWeight: "bold", color: "#191c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.customer}</div>
      <div style={{ color: "#9ca3af", fontSize: "11px" }}>{r.phone}</div>
    </td>
    <td style={{ textAlign: "right", padding: "12px", fontWeight: "bold", color: "#191c1e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
      {r.device}
    </td>
    <td style={{ textAlign: "right", padding: "12px", fontWeight: "bold", color: "#602100" }}>
      {r.problem}
    </td>
    <td style={{ textAlign: "right", padding: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "4px" }}>
        <UserCircle size={18} color="#d1d5db" />
        <span style={{ color: "#a8a29e", fontSize: "13px" }}>غير معين</span>
      </div>
    </td>
    <td style={{ textAlign: "right", padding: "12px" }}>
      <span style={{ fontSize: "11px", color: r.statusColor, background: r.statusBg, padding: "4px 8px", borderRadius: "6px", fontWeight: "600", whiteSpace: "nowrap" }}>
        {r.status}
      </span>
    </td>
    <td style={{ textAlign: "right", padding: "12px", fontWeight: "bold", color: r.dueColor || "#374151", whiteSpace: "nowrap" }}>
      {r.due}
    </td>
    <td style={{ textAlign: "right", padding: "12px" }}>
  <span style={{ fontSize: "11px", color: r.seasonColor, background: r.seasonBg, padding: "4px 10px", borderRadius: "6px", fontWeight: "600", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "6px" }}>
    <Phone size={12} />
    {r.season}
  </span>
</td>
    <td style={{ textAlign: "right", padding: "12px" }}>
      <button style={{ fontSize: "12px", fontWeight: "bold", color: "#003178", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", marginLeft: "30px" }}>
        <Eye size={13} />
        عرض
      </button>
    </td>
  </tr>
);

// ─── مكون بطاقة الجدول ────────────────────────────────────────────────────────

const TableCard = ({ title, titleColor = "#1e3a8a", rows, countLabel }) => (
  <div style={{ borderRadius: "16px", background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid #e5e7eb" }}>
      <h6 style={{ fontWeight: "bold", color: titleColor, margin: 0, fontSize: "15px" }}>{title}</h6>
    </div>
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <colgroup>
          {tableColumns.map((col, i) => (
            <col key={i} style={{ width: col.width }} />
          ))}
        </colgroup>
        <thead>
          <tr style={{ background: "#f2f4f6" }}>
            {tableColumns.map((col, i) => (
              <th key={i} style={{ textAlign: "right", fontWeight: "600", padding: "12px", color: "#6b7280", whiteSpace: "nowrap", fontSize: "12px", border: "none", borderBottom: "1px solid #e5e7eb" }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <TableRow key={i} r={r} i={i} />
          ))}
        </tbody>
      </table>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px", borderTop: "1px solid #e5e7eb", background: "#f2f4f6" }}>
      <span style={{ fontSize: "13px", color: "#434652" }}>{countLabel}</span>
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={{ background: "#f5f6fa", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, padding: 0, borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronRight size={14} />
        </button>
        <button style={{ background: "#f5f6fa", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, padding: 0, borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ChevronLeft size={14} />
        </button>
      </div>
    </div>
  </div>
);

// ─── الصفحة الرئيسية ──────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div style={{ direction: "rtl", padding: "28px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>

      {/* عنوان الصفحة */}
      <div style={{ textAlign: "right", marginBottom: "24px" }}>
        <h4 style={{ fontWeight: "bold", color: "#1b1c1d", fontSize: "34px", marginBottom: "4px" }}>نظرة عامة</h4>
        <p style={{ color: "#434653", fontSize: "16px", margin: 0 }}>مرحبا بك . إليك ملخص اليوم .</p>
      </div>

      {/* بطاقات الإحصائيات */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
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
                {s.icon}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold", fontSize: "36px", color: "#08060d", lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
              <div style={{ fontWeight: "600", fontSize: "14px", color: "#374151", marginBottom: "8px" }}>{s.label}</div>
              <div style={{ fontSize: "12px", color: s.subColor || "#9ca3af" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* جدول آخر التسليمات */}
      <div style={{ marginBottom: "24px" }}>
        <TableCard
          title="اخر التسليمات"
          titleColor="#1e3a8a"
          rows={receipts}
          countLabel="عرض 10 من أصل 10 إيصال"
        />
      </div>

      {/* جدول أجهزة تسلم اليوم */}
      <TableCard
        title="أجهزة تسلم اليوم"
        titleColor="#ba1a1a"
        rows={todayDeliveries}
        countLabel="عرض 10 من أصل 10 إيصال"
      />

    </div>
  );
}

export default Dashboard;