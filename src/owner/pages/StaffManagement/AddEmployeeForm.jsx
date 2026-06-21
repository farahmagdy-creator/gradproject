import { useState } from "react";
import { X, FileUp, Camera } from "lucide-react";

import PermissionsGrid from "../../../components/shared/PermissionsGrid";
import EmployeeDocumentUpload from "./EmployeeDocumentUpload";
import AddEmployeeSuccessModal from "./AddEmployeeSuccessModal";
import useAddEmployeeForm from "../../../hooks/useAddEmployeeForm";

/**
 * AddEmployeeForm — فورم "إضافة موظف جديد"
 *
 * Props:
 *  - onClose : callback بتتنفذ عند الإلغاء أو إغلاق رسالة النجاح (بترجع لصفحة الفهرس)
 */
function AddEmployeeForm({ onClose }) {
  const [createdEmail, setCreatedEmail] = useState(null);

  const {
    register, errors, handleSubmit, loading,
    idImage, setIdImage,
    avatarImage, setAvatarImage,
    permissions, togglePermission,
  } = useAddEmployeeForm((newEmployee, email) => setCreatedEmail(email));

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">
        <div className="bg-white rounded-4 shadow-sm p-4" style={{ border: "1px solid #eee" }}>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h3 className="fw-bold mb-1" style={{ color: "#003178" }}>إضافة موظف جديد</h3>
              <p className="text-muted mb-0">أدخل بيانات الموظف والصلاحيات المطلوبة بدقة.</p>
            </div>
            <button
              type="button"
              className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: "36px", height: "36px" }}
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            {/* ── البيانات الشخصية ──────────────────────────────────────── */}
            <h6 className="fw-bold mb-3" style={{ color: "#191C1E" }}>البيانات الشخصية</h6>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">الاسم الأول</label>
                <input
                  className={`form-control py-2 ${errors.firstName ? "is-invalid" : ""}`}
                  placeholder="مثال: أحمد"
                  {...register("firstName", { required: "الاسم الأول مطلوب" })}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">العائلة</label>
                <input
                  className={`form-control py-2 ${errors.lastName ? "is-invalid" : ""}`}
                  placeholder="مثال: محمد"
                  {...register("lastName", { required: "اسم العائلة مطلوب" })}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">البريد الإلكتروني</label>
                <input
                  type="email"
                  className={`form-control py-2 ${errors.email ? "is-invalid" : ""}`}
                  placeholder="employee@gmail.com"
                  {...register("email", {
                    required: "البريد الإلكتروني مطلوب",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "بريد إلكتروني غير صحيح" },
                  })}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">رقم الموبايل</label>
                <input
                  className={`form-control py-2 ${errors.mobile ? "is-invalid" : ""}`}
                  placeholder="+20 1 000 0000"
                  {...register("mobile", {
                    required: "رقم الموبايل مطلوب",
                    pattern: { value: /^01[0-9]{9}$/, message: "رقم موبايل غير صحيح" },
                  })}
                />
                {errors.mobile && <div className="invalid-feedback">{errors.mobile.message}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">رقم الهوية / الإقامة</label>
                <input
                  className={`form-control py-2 ${errors.nationalId ? "is-invalid" : ""}`}
                  {...register("nationalId", { required: "رقم الهوية مطلوب" })}
                />
                {errors.nationalId && <div className="invalid-feedback">{errors.nationalId.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">العمر</label>
                <input
                  type="number"
                  className={`form-control py-2 ${errors.age ? "is-invalid" : ""}`}
                  {...register("age", { required: "العمر مطلوب", min: { value: 16, message: "العمر غير صحيح" } })}
                />
                {errors.age && <div className="invalid-feedback">{errors.age.message}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">العنوان</label>
                <input
                  className={`form-control py-2 ${errors.address ? "is-invalid" : ""}`}
                  {...register("address", { required: "العنوان مطلوب" })}
                />
                {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">تاريخ التعيين</label>
                <input
                  type="date"
                  className={`form-control py-2 ${errors.hireDate ? "is-invalid" : ""}`}
                  {...register("hireDate", { required: "تاريخ التعيين مطلوب" })}
                />
                {errors.hireDate && <div className="invalid-feedback">{errors.hireDate.message}</div>}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <label className="form-label fw-semibold">المسمى الوظيفي</label>
                <input
                  className={`form-control py-2 ${errors.jobTitle ? "is-invalid" : ""}`}
                  {...register("jobTitle", { required: "المسمى الوظيفي مطلوب" })}
                />
                {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle.message}</div>}
              </div>
            </div>

            {/* ── المستندات والوسائط ────────────────────────────────────── */}
            <h6 className="fw-bold mb-3 mt-2" style={{ color: "#191C1E" }}>المستندات والوسائط</h6>
            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <EmployeeDocumentUpload
                  id="idImageInput"
                  icon={<FileUp size={22} />}
                  label="صورة الهوية"
                  hint="PDF, JPEG (5MB)"
                  accept=".pdf,.jpg,.jpeg,.png"
                  file={idImage}
                  onChange={setIdImage}
                />
              </div>
              <div className="col-md-6 mb-3">
                <EmployeeDocumentUpload
                  id="avatarImageInput"
                  icon={<Camera size={22} />}
                  label="الصورة الشخصية"
                  hint="JPEG, PNG (2MB)"
                  accept=".jpg,.jpeg,.png"
                  file={avatarImage}
                  onChange={setAvatarImage}
                />
              </div>
            </div>

            {/* ── الصلاحيات الممنوحة (مستدعاة من الكومبوننت المشترك) ─────── */}
            <h6 className="fw-bold mb-3" style={{ color: "#191C1E" }}>الصلاحيات الممنوحة</h6>
            <div className="mb-4">
              <PermissionsGrid selected={permissions} onToggle={togglePermission} />
            </div>

            {/* ── أزرار الإجراء ─────────────────────────────────────────── */}
            <div className="d-flex gap-3">
              <button
                type="button"
                className="btn px-4"
                style={{ background: "#e7e5e4" }}
                onClick={onClose}
              >
                إلغاء
              </button>

              <button
                type="submit"
                className="btn px-4 fw-semibold"
                disabled={loading}
                style={{ color: "#ffffff", background: "linear-gradient(to right, #094cb2, #3366cc)", border: "none" }}
              >
                {loading ? "جاري الحفظ..." : "حفظ البيانات"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {createdEmail && (
        <AddEmployeeSuccessModal
          email={createdEmail}
          onClose={() => {
            setCreatedEmail(null);
            onClose?.();
          }}
        />
      )}
    </div>
  );
}

export default AddEmployeeForm;
