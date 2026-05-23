import React from "react";
import {
  ShoppingCart,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Truck,
  Package,
  Hash,
  Clock,
} from "lucide-react";

// ─── ألوان الـ Accent ─────────────────────────────────────────
const getAccentColor = (status, type) => {
  if (status === "تحت التسليم") return "#961f78";
  if (type === "فاتورة شراء") return "#28a745";
  return "#003178";
};

// ─── ألوان الـ Ribbon ─────────────────────────────────────────
const getRibbonColor = (status, type) => {
  if (status === "تحت التسليم") return "#961f78";
  if (type === "شراء") return "#003178";
  return null;
};

// ─── Badge النوع ─────────────────────────────────────────
const TYPE_BADGE = {
  شراء: { bg: "#cfe6f2", color: "#526772" },
  "فاتورة شراء": { bg: "#cfe6f2", color: "#526772" },
};

// ─── عنصر البيانات ─────────────────────────────────────────
const DataItem = ({ icon, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "4px",
      color: "#4B5563",
      fontSize: "13px",
      fontWeight: "500",
      whiteSpace: "nowrap",
    }}
  >
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#6B7280",
        flexShrink: 0,
      }}
    >
      {icon}
    </span>
    <span>{label}</span>
  </div>
);

const PurchaseOrderCard = ({
  id,
  date,
  type,
  status,
  partName,
  purchaseDate,
  purchasePrice,
  maxPrice,
  purchaseSource,
  deliveryWorker,
  recipient,
  invoiceRecipient,
  deliveryDate,
  partsCount,
  location,
  notes,
}) => {
  const accent = getAccentColor(status, type);
  const ribbonColor = getRibbonColor(status, type);
  const typeBadge = TYPE_BADGE[type] ?? TYPE_BADGE["شراء"];

  const isOrder = type === "شراء";
  const isInvoice = type === "فاتورة شراء";

  const showRibbon =
    status === "تحت التسليم" || (status === "منتهي" && type === "شراء");

  const showWaitingButton = status === "تحت التسليم";

  return (
    <div
      style={{
        background: "#F8F9FB",
        borderRadius: "14px",
        border: "1px solid #E5E7EB",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      {/* Ribbon */}
      {showRibbon && (
        <div
          style={{
            position: "absolute",
            top: "19px",
            right: "-30px",
            transform: "rotate(45deg)",
            background: ribbonColor,
            color: "#ffffff",
            padding: "5px 45px",
            fontSize: "14px",
            fontWeight: "bold",
            zIndex: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,.15)",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
        }}
      >
        {/* Accent */}
        <div
          style={{
            width: "6px",
            background: accent,
            flexShrink: 0,
          }}
        />

        {/* المحتوى */}
        <div
          dir="rtl"
          style={{
            flex: "1 1 auto",
            padding: "12px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* الصف العلوي */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0px",
              width: "100%",
            }}
          >
            {/* الجزء اليمين */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                width: "120px",
                flexShrink: 0,
                marginTop: showRibbon ? "22px" : "0",
                marginRight: "0px",
                transform: "translateX(-100px)",
              }}
            >
              {/* أيقونة */}
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  marginBottom: "45px",
                  borderRadius: "8px",
                  background: "#e6e8ea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShoppingCart size={17} color="#003178" />
              </div>

              {/* البيانات */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    background: typeBadge.bg,
                    color: typeBadge.color,
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "5px",
                    padding: "4px 10px",
                    lineHeight: 1,
                  }}
                >
                  {type}
                </span>

                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  {id}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    color: "#6B7280",
                  }}
                >
                  {date}
                </span>
              </div>
            </div>

            {/* البيانات */}
            <div
              style={{
                flex: "1 1 auto",
                display: "grid",
                gridTemplateColumns: "repeat(4, max-content)",
                rowGap: "10px",
                columnGap: "40px",
                alignItems: "center",
                justifyContent: "center",
                margin: "4px auto 0 auto",
              }}
            >
              <DataItem icon={<Package size={15} />} label={partName} />

              <DataItem
                icon={<Calendar size={15} />}
                label={`تاريخ الشراء : ${purchaseDate}`}
              />

              <DataItem
                icon={<DollarSign size={15} />}
                label={`سعر الشراء : ${purchasePrice?.toLocaleString()}`}
              />

              <DataItem icon={<MapPin size={15} />} label={location} />

              <DataItem
                icon={<User size={15} />}
                label={`مصدر طلب الشراء : ${purchaseSource}`}
              />

              <DataItem
                icon={<DollarSign size={15} />}
                label={`أقصى سعر : ${maxPrice?.toLocaleString()}`}
              />

              {isOrder && deliveryWorker && (
                <DataItem
                  icon={<Truck size={15} />}
                  label={`عامل التوصيل : ${deliveryWorker}`}
                />
              )}

              {isOrder && recipient && (
                <DataItem
                  icon={<User size={15} />}
                  label={`مستلم القطعة : ${recipient}`}
                />
              )}

              {isInvoice && invoiceRecipient && (
                <DataItem
                  icon={<User size={15} />}
                  label={`مستلم الفاتورة : ${invoiceRecipient}`}
                />
              )}

              {isInvoice && deliveryDate && (
                <DataItem
                  icon={<Calendar size={15} />}
                  label={`تاريخ التسليم : ${deliveryDate}`}
                />
              )}

              {isInvoice && partsCount != null && (
                <DataItem
                  icon={<Hash size={15} />}
                  label={`${partsCount} قطعة`}
                />
              )}
            </div>
          </div>

          {/* الملاحظات */}
          {notes && (
            <div
              style={{
                background: "transparent",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "13px",
                color: "#000000",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <span style={{ fontWeight: "700" }}>ملاحظات :</span>
              <span style={{ marginRight: "5px" }}>{notes}</span>
            </div>
          )}

          {/* الزر */}
          {showWaitingButton && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                type="button"
                style={{
                  background: status === "منتهي" ? "#003178" : "#Ba1a1a",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 18px",
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "'Cairo', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  minHeight: "36px",
                  cursor: "pointer",
                }}
              >
                <Clock size={15} />
                {status === "منتهي"
                  ? "منتهي"
                  : "في انتظار القرار الفني باستلام القطعة"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderCard;