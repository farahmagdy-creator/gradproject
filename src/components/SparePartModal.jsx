import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

const SparepartModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    partName: "",
    supplier: "",
    price: "0.00",
    confirmed: false,
  });

  const handleSubmit = () => {
    console.log("تم إرسال الطلب:", formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 2000 }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 p-4"
        style={{ width: "460px", maxWidth: "95vw" }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-2">
            <ShoppingCart size={20} style={{color: "#0f4391"}} />
            <h6 className="mb-0 fw-bold">طلب قطعة غيار</h6>
          </div>
          <button className="btn btn-sm btn-light rounded-circle" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* القطعة المطلوبة */}
        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">القطعة المطلوبة</label>
          <input
            type="text"
            className="form-control"
            placeholder="مثال: شاشة أيفون 13 برو"
            value={formData.partName}
            onChange={(e) => setFormData({ ...formData, partName: e.target.value })}
          />
        </div>

        {/* المورد */}
        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">المورد</label>
          <input
            type="text"
            className="form-control"
            placeholder="اسم الشركة أو المورد"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
          />
        </div>

        {/* الحد الأقصى للسعر */}
        <div className="mb-3">
          <label className="form-label small fw-semibold text-secondary">الحد الأقصى للسعر</label>
          <div className="input-group">
            <span className="input-group-text">ج.م</span>
            <input
              type="number"
              className="form-control text-end"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        {/* تأكيد توفر القطعة */}
        <div className="mb-4 p-3 rounded-3 d-flex align-items-center justify-content-between"
        style={{ background: "#f2f4f6" }}
        >
          <div>
            <p className="mb-0 small fw-semibold">هل تأكدت من توفر القطعة لدى المورد؟</p>
            <p className="mb-0 text-muted" style={{ fontSize: "11px" }}>
              تأكد قبل الإرسال لضمان سرعة التنفيذ
            </p>
          </div>
          <div className="form-check form-switch mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              checked={formData.confirmed}
              onChange={(e) => setFormData({ ...formData, confirmed: e.target.checked })}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button className="btn flex-grow-1 fw-bold" onClick={handleSubmit}
          style={{background: "#003178", color: "#ffffff" }}
          >
            <ShoppingCart size={15} className="me-1" />
            إرسال الطلب
          </button>
          <button className="btn flex-grow-1" onClick={onClose}
          style={{background: "#e7e5e4"}}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default SparepartModal;
