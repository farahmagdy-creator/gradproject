import { User, Phone } from "lucide-react";

function CustomerForm({ register, errors }) {
  return (
    <div className="row mb-3">

      {/* Customer name input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">اسم العميل</label>

        <div className="input-icon">
          <User size={18} />

          <input
            className={`form-control py-2 ${errors.customer?.name ? "is-invalid" : ""}`}
            placeholder="ادخل الاسم الرباعي"
            {...register("customer.name", {
              required: "Customer name is required",
              minLength: {
                value: 3,
                message: "Name is too short",
              },
            })}
          />
        </div>

        {errors.customer?.name && (
          <div className="invalid-feedback">
            {errors.customer.name.message}
          </div>
        )}
      </div>

      {/* Phone number input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">رقم الموبايل</label>

        <div className="input-icon">
          <Phone size={18} />

          <input
            className={`form-control py-2 ${errors.customer?.phone ? "is-invalid" : ""}`}
            placeholder="01012345678"
            {...register("customer.phone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Invalid phone number",
              },
            })}
          />
        </div>

        {errors.customer?.phone && (
          <div className="invalid-feedback">
            {errors.customer.phone.message}
          </div>
        )}
      </div>

    </div>
  );
}

export default CustomerForm;