import { DollarSign } from "lucide-react";
import { useWatch } from "react-hook-form";

function CostSection({ register, errors, control }) {

  // Watch cost inputs
  const initial = useWatch({
    control,
    name: "cost.initial",
  });

  const paid = useWatch({
    control,
    name: "cost.paid",
  });

  // Calculate remaining amount
  const i = parseFloat(initial) || 0;
  const p = parseFloat(paid) || 0;
  const remaining = i - p;

  // Determine payment status
  const isPaid = remaining === 0;
  const isPartial = p > 0 && remaining > 0;
  const isUnpaid = p === 0;

  // Status config
  let statusText = "متبقي";
  let statusColor = "#dc2626";
  let statusBg = "#fee2e2";

  if (isPaid) {
    statusText = "تم السداد";
    statusColor = "#16a34a";
    statusBg = "#dcfce7";
  } else if (isPartial) {
    statusText = "مدفوع جزئي";
    statusColor = "#ca8a04";
    statusBg = "#fef9c3";
  }

  return (
    <div className="row mb-3">

      {/* Initial cost input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">التكلفة</label>

        <div className="input-icon">
          <DollarSign size={18} />
          <input
            type="number"
            className={`form-control py-2 ${errors.cost?.initial ? "is-invalid" : ""}`}
            {...register("cost.initial", {
              required: "التكلفة مطلوبة",
            })}
          />
        </div>

        {errors.cost?.initial && (
          <div className="invalid-feedback">
            {errors.cost.initial.message}
          </div>
        )}
      </div>

      {/* Paid amount input */}
      <div className="col-md-6 mb-3">
        <label className="form-label fw-semibold">المدفوع</label>

        <div className="input-icon">
          <DollarSign size={18} />
          <input
            type="number"
            className={`form-control py-2 ${errors.cost?.paid ? "is-invalid" : ""}`}
            {...register("cost.paid", {
              required: "المبلغ المدفوع مطلوب",
              validate: (value, formValues) => {
                const initial = parseFloat(formValues.cost?.initial) || 0;
                const paid = parseFloat(value) || 0;

                if (paid > initial) {
                  return "Paid amount cannot exceed total cost";
                }

                return true;
              },
            })}
          />
        </div>

        {errors.cost?.paid && (
          <div className="invalid-feedback">
            {errors.cost.paid.message}
          </div>
        )}
      </div>

      {/* Remaining amount and status */}
      <div className="col-12">
        <label className="form-label fw-semibold">المتبقي</label>

        <div className="input-icon d-flex align-items-center gap-2">
          <DollarSign size={18} />

          <input
            type="number"
            className="form-control py-2"
            readOnly
            value={remaining}
            style={{
              background: "#f3f4f6",
              cursor: "not-allowed",
              fontWeight: "bold",
              color: statusColor,
            }}
          />

          {/* Payment status badge */}
          <span
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "bold",
              background: statusBg,
              color: statusColor,
              whiteSpace: "nowrap",
            }}
          >
            {statusText}
          </span>
        </div>
      </div>

    </div>
  );
}

export default CostSection;