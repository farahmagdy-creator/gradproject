import { Smartphone, Palette, Wrench } from "lucide-react";

function DeviceForm({ register, errors }) {
  return (
    <div className="row mb-3">

      {/* Device type input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">النوع والموديل</label>

        <div className="input-icon">
          <Smartphone size={18} />

          <input
            className={`form-control py-2 ${errors.device?.type ? "is-invalid" : ""}`}
            placeholder="iPhone 14"
            {...register("device.type", {
              required: "Device type is required",
            })}
          />
        </div>

        {errors.device?.type && (
          <div className="invalid-feedback">
            {errors.device.type.message}
          </div>
        )}
      </div>

      {/* Device color input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">اللون</label>

        <div className="input-icon">
          <Palette size={18} />

          <input
            className="form-control py-2"
            placeholder="أسود"
            {...register("device.color")}
          />
        </div>
      </div>

      {/* Issue description input */}
      <div className="col-12">
        <label className="form-label fw-semibold">العطل</label>

        <div className="input-icon">
          <Wrench size={18} />

          <textarea
            className={`form-control py-2 ${errors.device?.issue ? "is-invalid" : ""}`}
            rows={3}
            placeholder="اشرح المشكلة..."
            {...register("device.issue", {
              required: "Issue description is required",
            })}
          />
        </div>

        {errors.device?.issue && (
          <div className="invalid-feedback">
            {errors.device.issue.message}
          </div>
        )}
      </div>

    </div>
  );
}

export default DeviceForm;