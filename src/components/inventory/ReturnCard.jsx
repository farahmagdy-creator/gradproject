import React from "react";
import { Monitor, FileText, DollarSign, Calendar, User, ArrowLeft } from "lucide-react";

const STATUS_CONFIG = {
  send_back: {
    label: "إرجاع للمورد",
    style: { backgroundColor: "#BA1A1A", color: "#fff" }
  },
  in_progress: {
    label: "تحت الإرجاع",
    style: { backgroundColor: "#961F78", color: "#fff" }
  },
  before_return: {
    label: "المورد قبل الإرجاع",
    style: { backgroundColor: "#28A745", color: "#fff" }
  },
  rejected: {
    label: "المورد رفض الإرجاع",
    style: { backgroundColor: "#78716C", color: "#fff" }
  }
};

export default function ReturnCard({
  type = "tech",
  returnId,
  returnDate,
  itemName,
  partNumber,
  invoiceNumber,
  salePrice,
  saleDate,
  returnSource,
  reason,
  status = "send_back"
}) {
  const isCustomer = type === "customer";
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.send_back;

  const badgeWordStyle = {
    background: "#BA1A1A",
    color: "#FFFFFF",
    border: "1px solid #BA1A1A"
  };

  return (
    <div
      className="card mb-3 position-relative border-0 shadow-sm"
      style={{ borderRadius: 10, direction: "rtl", overflow: "hidden", backgroundColor: "#F8F9FB" }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "9px", backgroundColor: "#BA1A1A", zIndex: 5 }} />

      <div className="d-flex align-items-start justify-content-between p-4 gap-3" style={{ paddingRight: "24px" }}>

        <div className="d-flex align-items-start gap-3 flex-shrink-0">
          <div className="d-flex flex-column align-items-center text-center" style={{ minWidth: 120 }}>
            <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
              <div
                className="d-flex align-items-center justify-content-center rounded-1"
                style={{ width: "32px", height: "32px", backgroundColor: "#f8f9fa", border: "1px solid #e0e0e0", flexShrink: 0 }}
              >
                <ArrowLeft size={16} />
              </div>
              <span className="px-2 py-1 rounded fw-bold" style={{ ...badgeWordStyle, fontSize: 13, whiteSpace: "nowrap" }}>
                {isCustomer ? "مرتجع عميل" : "مرتجع فني"}
              </span>
            </div>
            <span className="fw-bold text-dark w-100" style={{ fontSize: 14 }}>{returnId || "----"}</span>
            <span className="text-secondary mt-1 w-100" style={{ fontSize: 10, fontWeight: 400 }}>{returnDate || "--/--/----"}</span>
          </div>
        </div>

        <div className="flex-fill px-4" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px 20px" }}>
          <DetailItem icon={<Monitor size={14} />} text={itemName} />
          <DetailItem icon={<FileText size={14} />} text={partNumber ? `رقم القطعة : ${partNumber}` : null} />
          <DetailItem icon={<FileText size={14} />} text={invoiceNumber ? `رقم الفاتورة : ${invoiceNumber}` : null} />
          <DetailItem icon={<Calendar size={14} />} text={saleDate ? `تاريخ البيع : ${saleDate}` : null} />
          <DetailItem icon={<DollarSign size={14} />} text={salePrice ? `سعر البيع : ${salePrice}` : null} />
          {(isCustomer || returnSource) && (
            <DetailItem
              icon={<User size={14} />}
              text={`مصدر المرتجع : ${returnSource || (isCustomer ? "عميل خارجي" : "")}`}
            />
          )}
        </div>

        <div className="flex-shrink-0" style={{ alignSelf: "center" }}>
          <button
            className="btn py-2 px-3 fw-bold"
            style={{ ...cfg.style, borderRadius: 6, fontSize: 12, border: "none", minWidth: 125 }}
          >
            {cfg.label}
          </button>
        </div>
      </div>

      <div className="px-4 pb-4" style={{ paddingRight: "24px" }}>
        <div
          className="text-center fw-bold w-100"
          style={{ border: "1px solid #333333", borderRadius: 4, padding: "10px", fontSize: 14, color: "#000000", backgroundColor: "#F8F9FB", minHeight: "40px" }}
        >
          {reason || "لا يوجد سبب مذكور"}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, text }) {
  if (!text) return null;
  return (
    <div className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
      <span style={{ color: "#a0a0a0" }} className="d-flex align-items-center flex-shrink-0">{icon}</span>
      <span className="text-dark fw-medium" style={{ textOverflow: "ellipsis", overflow: "hidden" }}>{text}</span>
    </div>
  );
}