import { User, FileText } from "lucide-react";

function TechnicianSection({ register, errors }) {
  return (
    <div className="row">

      {/* Receiver name input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <User size={16} />
          اسم مستلم الجهاز
        </label>

        <div className="input-icon">
          <User size={18} />

          <input
            className={`form-control py-2 ${errors.receiver ? "is-invalid" : ""}`}
            placeholder="اكتب اسم المستلم"
            {...register("receiver", {
              required: "Receiver name is required",
            })}
          />
        </div>

        {errors.receiver && (
          <div className="invalid-feedback">
            {errors.receiver.message}
          </div>
        )}
      </div>

      {/* Technician selection */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <User size={16} />
          اسم الفني
        </label>

        <select
          className={`form-select py-2 ${errors.technician ? "is-invalid" : ""}`}
          {...register("technician", {
            required: "Technician is required",
          })}
        >
          <option value="">اختر الفني</option>
          <option value="ahmed">م. أحمد</option>
          <option value="mohamed">م. محمد</option>
        </select>

        {errors.technician && (
          <div className="invalid-feedback">
            {errors.technician.message}
          </div>
        )}
      </div>

      {/* Notes input */}
      <div className="col-12 mb-3">
        <label className="form-label fw-semibold d-flex align-items-center gap-2">
          <FileText size={16} />
          ملاحظات
        </label>

        <textarea
          className="form-control py-2"
          rows={3}
          placeholder="اكتب ملاحظات..."
          {...register("notes")}
        />
      </div>

    </div>
  );
}

export default TechnicianSection;