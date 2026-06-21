import { Info, UserCog, IdCard } from "lucide-react";
import COLORS from "../../constants/theme";
import PermissionsGrid, { ALL_PERMISSIONS } from "./PermissionsGrid";

// إعادة تصديرها عشان أي حد كان مستورد ALL_PERMISSIONS من هنا قبل كدا يفضل شغال
export { ALL_PERMISSIONS };

// ─── ProfileStatCard (مشترك) ──────────────────────────────────────────────────

function ProfileStatCard({ title, value, sub, color, icon, cardWidth = "380px" }) {
  return (
    <div
      className="p-3 rounded-4 shadow-sm"
      style={{
        width:       cardWidth,
        height:      "180px",
        background:  "#e0e3e5",
        borderRight: `5px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ color }}>{icon}</span>
        <span className="text-secondary" style={{ fontSize: "13px" }}>{sub}</span>
      </div>
      <div className="text-end">
        <h2 className="fw-bold mb-1" style={{ fontSize: "42px", color }}>{value}</h2>
        <span className="fw-semibold text-secondary">{title}</span>
      </div>
    </div>
  );
}

// ─── ProfilePage (الكومبوننت الرئيسي) ────────────────────────────────────────
/**
 * @param {object}   user           - بيانات المستخدم { name, role, employeeId, phone, email, address, nationalId, age, hireDate }
 * @param {string}   avatarSrc      - مسار صورة البروفايل
 * @param {string}   hireDateLabel  - تسمية خانة التاريخ: "تاريخ التعيين" أو "تاريخ الانضمام"
 * @param {Array}    stats          - مصفوفة كاردات الإحصائيات [{ title, value, sub, color, icon, cardWidth? }]
 */
function ProfilePage({ user, avatarSrc, hireDateLabel = "تاريخ التعيين", stats = [] }) {
  const infoRows = [
    { label: "رقم الهاتف",        value: user.phone },
    { label: "البريد الإلكتروني",  value: user.email },
    { label: "العنوان",           value: user.address },
    { label: "الرقم القومي",      value: user.nationalId },
    { label: "العمر",             value: user.age },
    { label: hireDateLabel,       value: user.hireDate },
  ];

  return (
    <div dir="rtl" className="p-4">

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div
        className="d-flex justify-content-between align-items-center rounded-4 px-4 py-4 mb-4"
        style={{ background: "#f2f4f6", minHeight: "180px" }}
      >
        <div className="text-end" style={{ direction: "rtl" }}>
          <h1 className="fw-bold mb-2" style={{ color: COLORS.primary, fontSize: "42px", lineHeight: "1" }}>
            {user.name}
          </h1>
          <p className="mb-0 text-secondary" style={{ fontSize: "20px" }}>
            {user.role}
          </p>
        </div>

        <div className="d-flex align-items-center gap-4" style={{ direction: "ltr" }}>
          <div
            className="rounded-4 p-0"
            style={{ background: "#dfe3e7", transform: "translate(-20px, -20px)" }}
          >
            <img
              src={avatarSrc}
              alt="avatar"
              className="rounded-4"
              style={{ width: "140px", height: "140px", objectFit: "cover", transform: "translate(30px, 30px)" }}
            />
          </div>

          <div className="d-flex align-items-center gap-3" style={{ marginTop: "75px" }}>
            <div
              className="rounded-3 px-4 py-2 fw-semibold text-secondary d-flex align-items-center gap-2"
              style={{ fontSize: "18px", width: "fit-content", backgroundColor: "#dadada" }}
            >
              {user.employeeId}
              <IdCard size={18} style={{ color: "#094cb2" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      {stats.length > 0 && (
        <div className="d-flex justify-content-center gap-3 mb-5">
          {stats.map((s, i) => (
            <ProfileStatCard key={i} {...s} />
          ))}
        </div>
      )}

      {/* ── Bottom Panels ─────────────────────────────────────────────────── */}
      <div className="row g-4">

        {/* المعلومات الشخصية */}
        <div className="col-6">
          <div className="d-flex align-items-center gap-2 mb-3">
            <Info size={18} color={COLORS.primary} />
            <h3 className="mb-0 fw-bold" style={{ color: COLORS.primary, fontSize: "20px" }}>
              المعلومات الشخصية
            </h3>
          </div>
          <div className="rounded-4 px-3 py-1" style={{ background: "#eceef0" }}>
            {infoRows.map(({ label, value }, i, arr) => (
              <div
                key={label}
                className="d-flex justify-content-between align-items-center py-3"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #d8dce0" : "none" }}
              >
                <span className="text-secondary">{label}</span>
                <span className="fw-semibold text-dark">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* صورة البطاقة */}
        <div className="col-6">
          <div className="d-flex gap-3">
            <div style={{ flexShrink: 0, marginTop: "50px", marginRight: "55px" }}>
              <img
                src="image/id.jpg"
                alt="بطاقة الهوية"
                className="rounded-4 shadow-sm"
                style={{ width: "450px", height: "auto", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* الصلاحيات الممنوحة */}
        <div className="col-12 mt-2">
          <div className="d-flex align-items-center gap-2 mb-3 mt-3">
            <UserCog size={18} color={COLORS.primary} />
            <h3 className="mb-0 fw-bold" style={{ color: COLORS.primary, fontSize: "20px" }}>
              الصلاحيات الممنوحة
            </h3>
          </div>
          <p style={{ color: "#094cb2" }}>الصلاحيات الممنوحة</p>
          <PermissionsGrid selected={user.permissions ?? []} readOnly />
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;
