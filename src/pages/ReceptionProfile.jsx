import {
  Info,
  Star,
  Wrench,
  Zap,
  UserCog,
  IdCard,
} from "lucide-react";

const receptionist = {
  name: "إسراء أحمد",
  role: "موظفة استقبال",
  receptionId: "EMP-002",
  phone: "1284167715 20+",
  nationalId: "30308200403786",
  email: "esraaahmed1541@gmail.com",
  address: "221 شارع 45 - العصافرة",
  age: "23",
  hireDate: "1 May 2021",
};

const COLORS = {
  primary: "#003178",
  brown: "#602100",
  slate: "#4c616c",
  danger: "#ba1a1a",
  green: "#28a745",
};

const PERMISSIONS = [
  "استلام جهاز",    "تسليم جهاز",      "طلب قطعة غيار",   "تغيير حالة الإيصال",
  "تعيين أجهزة للفني", "عرض المخزون",   "إضافة للمخزون",   "استخدام المخزون",
  "إنشاء فاتورة شراء", "إنشاء فاتورة بيع", "تسجيل تلف قطعة", "إرجاع قطعة للمورد",
  "إرجاع قطعة لعميل", "صيانة الأجهزة",  "تعيين مهام للتوصيل", "صيانة الأجهزة",
  "استلام طلبات الغير", "عرض يومية الحساب", "إدارة الموظفين", "إرسال تنبيهات",
  "عرض سجل النشاطات",
];

function StatCard({ title, value, sub, color, icon }) {
  return (
    <div
      className="p-3 rounded-4 shadow-sm"
      style={{
        width: "555px",
        height: "180px",
        background: "#e0e3e5",
        borderRight: `5px solid ${color}`,
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span style={{ color }}>{icon}</span>
        <span className="text-secondary" style={{ fontSize: "13px" }}>
          {sub}
        </span>
      </div>
      <div className="text-end">
        <h2 className="fw-bold mb-1" style={{ fontSize: "42px", color }}>
          {value}
        </h2>
        <span className="fw-semibold text-secondary">{title}</span>
      </div>
    </div>
  );
}

function ReceptionProfile() {
  return (
    <div dir="rtl" className="p-4">

      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center rounded-4 px-4 py-4 mb-4"
        style={{ background: "#f2f4f6", minHeight: "180px" }}
      >
        <div className="text-end" style={{ direction: "rtl" }}>
          <h1
            className="fw-bold mb-2"
            style={{ color: COLORS.primary, fontSize: "42px", lineHeight: "1" }}
          >
            {receptionist.name}
          </h1>
          <p className="mb-0 text-secondary" style={{ fontSize: "20px" }}>
            {receptionist.role}
          </p>
        </div>

        <div className="d-flex align-items-center gap-4" style={{ direction: "ltr" }}>
          <div
            className="rounded-4 p-0"
            style={{ background: "#dfe3e7", transform: "translate(-20px, -20px)" }}
          >
            <img
              src="image/reception.png"
              alt="avatar"
              className="rounded-4"
              style={{
                width: "140px",
                height: "140px",
                objectFit: "cover",
                transform: "translate(30px, 30px)",
              }}
            />
          </div>

          <div className="d-flex align-items-center gap-3" style={{ marginTop: "75px" }}>
            <div
              className="rounded-3 px-4 py-2 fw-semibold text-secondary d-flex align-items-center gap-2"
              style={{ fontSize: "18px", width: "fit-content", backgroundColor: "#dadada" }}
            >
              {receptionist.receptionId}
              <IdCard size={18} style={{color: "#094cb2"}}/>
            </div>
           
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <StatCard
          title="إجمالي عمليات الإصلاح"
          value="788"
          sub="+12% this month"
          color={COLORS.primary}
          icon={<Wrench size={22} />}
        />
        <StatCard
          title="معدل دقة بيانات الاستلام"
          value="95%"
          sub="788 reviews"
          color={COLORS.green}
          icon={<Star size={22} />}
        />
      </div>

      {/* Bottom Panels */}
      <div className="row g-4">

        {/* المعلومات الشخصية */}
        <div className="col-6">
          <div className="d-flex align-items-center gap-2 mb-3">
            <Info size={18} color={COLORS.primary} />
            <h3
              className="mb-0 fw-bold"
              style={{ color: COLORS.primary, fontSize: "20px" }}
            >
              المعلومات الشخصية
            </h3>
          </div>
          <div className="rounded-4 px-3 py-1" style={{ background: "#eceef0" }}>
            {[
              { label: "رقم الهاتف",       value: receptionist.phone },
              { label: "البريد الإلكتروني", value: receptionist.email },
              { label: "العنوان",          value: receptionist.address },
              { label: "الرقم القومي",     value: receptionist.nationalId },
              { label: "العمر",          value: receptionist.age },
              { label: "تاريخ الانضمام",   value: "1 May 2021" },
            ].map(({ label, value }, i, arr) => (
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

        {/* البطاقة + بيانات إضافية */}
        <div className="col-6">
          <div className="d-flex gap-3">

            {/* صورة البطاقة */}
            <div style={{ flexShrink: 0, marginTop: "50px", marginRight:"55px"}}>
              <img
                src="image/id.jpg"
                alt="بطاقة الهوية"
                className="rounded-4 shadow-sm"
                style={{
                  width: "450px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* البيانات */}
           

          </div>
        </div>

        {/* الصلاحيات الممنوحة */}
        <div className="col-12 mt-2">

          <div className="d-flex align-items-center gap-2 mb-3 mt-3">
            <UserCog size={18} color={COLORS.primary} />
            <h3
              className="mb-0 fw-bold"
              style={{ color: COLORS.primary, fontSize: "20px" }}
            >
              الصلاحيات الممنوحة
            </h3>
          </div>


           <p style={{color: "#094cb2"}}>الصلاحيات الممنوحة</p>

          <div
            className="rounded-4 p-3"
            style={{ background: "#f5f3f4" }}
          >
            
            <div className="row row-cols-4 g-2">
              {PERMISSIONS.map((perm) => (
                <div key={perm} className="col d-flex align-items-center justify-content-end gap-2" style={{direction: "ltr"}}>
                  <span style={{ fontSize: "14px" }}>{perm}</span>
                  <input
                    type="checkbox"
                    className="form-check-input mt-0"
                    style={{
                      width: "18px",
                      height: "18px",
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ReceptionProfile;