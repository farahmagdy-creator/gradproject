import {
  Wrench,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Search,
  Eye,
  Phone,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";

const stats = [
  {
    label: "قيد التنفيذ",
    value: 14,
    icon: <Wrench size={22} />,
    badge: "نشط",
    badgeColor: "#22c55e",
    badgeBg: "#dcfce7",
    accent: "#2563eb",
    accentBg: "#eff6ff",
    sub: "متوسط وقت الإنجاز: 24 يوم",
  },
  {
    label: "بانتظار الاستلام",
    value: "08",
    icon: <Clock size={22} />,
    badge: "جاهز",
    badgeColor: "#d97706",
    badgeBg: "#fef9c3",
    accent: "#d97706",
    accentBg: "#fffbeb",
    sub: "إخطار العملاء المقرر موعدهم اليوم",
  },
  {
    label: "إصلاحات متأخرة",
    value: "03",
    icon: <AlertTriangle size={22} />,
    badge: "خرج",
    badgeColor: "#ef4444",
    badgeBg: "#fee2e2",
    accent: "#ef4444",
    accentBg: "#fff1f2",
    sub: "يتطلب اهتماماً فورياً",
    subColor: "#ef4444",
    urgent: true,
  },
];

const receipts = [
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#d97706", statusBg: "#fef9c3", due: "بعد 1 يوم", season: "إتصال أولاً", seasonColor: "#2563eb", seasonBg: "#eff6ff" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#d97706", statusBg: "#fef9c3", due: "بعد 1 يوم", season: "إتصال أولاً", seasonColor: "#2563eb", seasonBg: "#eff6ff" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#d97706", statusBg: "#fef9c3", due: "بعد 1 يوم", season: "إتصال أولاً", seasonColor: "#2563eb", seasonBg: "#eff6ff" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#d97706", statusBg: "#fef9c3", due: "بعد 1 يوم", season: "إتصال أولاً", seasonColor: "#2563eb", seasonBg: "#eff6ff" },
  { id: "#1-774", customer: "محمد أحمد", phone: "+20 1012345678", device: "Iphone 15 Pro Max", problem: "شاشة", tech: null, status: "قيد الإصلاح", statusColor: "#d97706", statusBg: "#fef9c3", due: "بعد 1 يوم", season: "إتصال أولاً", seasonColor: "#2563eb", seasonBg: "#eff6ff" },
];

const columns = ["رقم الإيصال", "العميل", "الجهاز", "العطل", "الفني", "الحالة", "موعد التسليم", "الوسم", "الإجراء"];

function Dashboard() {
  return (
    <div style={{ direction: "rtl", padding: "28px", backgroundColor: "#f5f6fa", minHeight: "100vh" }}>

      {/* Page title */}
      <div className="text-end mb-4">
        <h4 className="fw-bold mb-1" style={{ color: "#08060d", fontSize: "22px" }}>نظرة عامة</h4>
        <p className="text-muted mb-0" style={{ fontSize: "14px" }}>مرحبا بك . إليك الحالة الحالية لورشة الصيانة.</p>
      </div>

      {/* Stats cards */}
      <div className="row g-3 mb-4">
        {stats.map((s, i) => (
          <div className="col-md-4" key={i}>
            <div
              className="p-4 rounded-4 h-100"
              style={{
                background: "#fff",
                border: `1px solid #e5e7eb`,
                borderRight: `4px solid ${s.accent}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-3">
                <span
                  className="px-2 py-1 rounded-2 fw-bold"
                  style={{ fontSize: "11px", color: s.badgeColor, background: s.badgeBg }}
                >
                  {s.badge}
                </span>
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40, background: s.accentBg, color: s.accent }}
                >
                  {s.icon}
                </div>
              </div>

              <div className="text-end">
                <div className="fw-bold mb-1" style={{ fontSize: "36px", color: "#08060d", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="fw-semibold mb-2" style={{ fontSize: "14px", color: "#374151" }}>{s.label}</div>
                <div style={{ fontSize: "12px", color: s.subColor || "#9ca3af" }}>{s.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-4 bg-white" style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

        {/* Table header */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <div
            className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
            style={{ background: "#f5f6fa", border: "1px solid #e5e7eb", cursor: "pointer" }}
          >
            <Search size={15} color="#9ca3af" />
            <span style={{ fontSize: "13px", color: "#9ca3af" }}>بحث...</span>
          </div>
          <h6 className="fw-bold mb-0" style={{ color: "#08060d" }}>اخر التحديثات</h6>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="table mb-0" style={{ fontSize: "13px", direction: "rtl" }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="text-end fw-semibold border-0 py-3 px-3"
                    style={{ color: "#6b7280", whiteSpace: "nowrap", fontSize: "12px" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {receipts.map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td className="text-end py-3 px-3 fw-bold" style={{ color: "#2563eb" }}>{r.id}</td>
                  <td className="text-end py-3 px-3">
                    <div className="fw-semibold" style={{ color: "#08060d" }}>{r.customer}</div>
                    <div style={{ color: "#9ca3af", fontSize: "11px" }}>{r.phone}</div>
                  </td>
                  <td className="text-end py-3 px-3" style={{ color: "#374151" }}>{r.device}</td>
                  <td className="text-end py-3 px-3" style={{ color: "#374151" }}>{r.problem}</td>
                  <td className="text-end py-3 px-3">
                    <div className="d-flex align-items-center justify-content-end gap-1">
                      <span style={{ color: "#9ca3af", fontSize: "12px" }}>غير معين</span>
                      <UserCircle size={18} color="#d1d5db" />
                    </div>
                  </td>
                  <td className="text-end py-3 px-3">
                    <span
                      className="px-2 py-1 rounded-2 fw-semibold"
                      style={{ fontSize: "11px", color: r.statusColor, background: r.statusBg, whiteSpace: "nowrap" }}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="text-end py-3 px-3" style={{ color: "#374151" }}>{r.due}</td>
                  <td className="text-end py-3 px-3">
                    <span
                      className="px-2 py-1 rounded-2 fw-semibold"
                      style={{ fontSize: "11px", color: r.seasonColor, background: r.seasonBg, whiteSpace: "nowrap" }}
                    >
                      {r.season}
                    </span>
                  </td>
                  <td className="text-end py-3 px-3">
                    <button
                      className="btn btn-sm d-flex align-items-center gap-1 ms-auto"
                      style={{ fontSize: "12px", color: "#2563eb", background: "#eff6ff", border: "none", borderRadius: "8px", padding: "4px 10px" }}
                    >
                      <Eye size={13} />
                      عرض
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-top">
          <span style={{ fontSize: "13px", color: "#6b7280" }}>عرض 10 من أصل 10 إيصال</span>
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm rounded-2"
              style={{ background: "#f5f6fa", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, padding: 0 }}
            >
              <ChevronRight size={14} />
            </button>
            <button
              className="btn btn-sm rounded-2"
              style={{ background: "#f5f6fa", border: "1px solid #e5e7eb", color: "#374151", width: 32, height: 32, padding: 0 }}
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
