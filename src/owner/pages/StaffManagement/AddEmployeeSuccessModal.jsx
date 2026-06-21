import { PartyPopper } from "lucide-react";

// ─── AddEmployeeSuccessModal ──────────────────────────────────────────────
// بوب أب تأكيد نجاح إنشاء حساب الموظف

function AddEmployeeSuccessModal({ email, onClose }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ position: "fixed", inset: 0, background: "rgba(20,22,26,0.55)", zIndex: 2000 }}
      onClick={onClose}
    >
      <div
        dir="rtl"
        className="bg-white rounded-4 p-4 text-center shadow"
        style={{ width: "420px", maxWidth: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="d-flex align-items-center justify-content-center gap-2 fw-bold mb-3" style={{ fontSize: "18px", color: "#191C1E" }}>
          تم إنشاء حساب الموظف بنجاح
          <PartyPopper size={20} color="#f59e0b" />
        </div>

        <div className="rounded-3 p-3" style={{ background: "#f5f3f4" }}>
          <p className="mb-2" style={{ fontSize: "14px", color: "#434652" }}>
            لقد تم إرسال بريد إلكتروني إلى: <span className="fw-semibold" style={{ color: "#003178" }}>{email}</span>
          </p>
          <p className="mb-0" style={{ fontSize: "13px", color: "#6c757d" }}>
            برجاء اتباع الرابط المرفق وإعادة تعيين كلمة السر للدخول إلى النظام.
          </p>
        </div>

        <button
          type="button"
          className="btn w-100 mt-4 fw-semibold"
          style={{ background: "linear-gradient(to right, #0d47a1, #003178)", color: "#fff" }}
          onClick={onClose}
        >
          تمام
        </button>
      </div>
    </div>
  );
}

export default AddEmployeeSuccessModal;
