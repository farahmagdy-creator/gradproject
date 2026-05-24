import React from "react";
import {
  ShoppingCart,
  MapPin,
  DollarSign,
  Calendar,
  User,
  Hash,
  Phone,
} from "lucide-react";

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
    <span style={{ display: "flex", alignItems: "center", color: "#6B7280", flexShrink: 0 }}>
      {icon}
    </span>
    <span>{label}</span>
  </div>
);

const SaleInvoiceCard = ({
  id,
  date,
  partName,
  partsCount,
  totalInvoice,
  saleDate,
  saleSource,
  customer,
  customerPhone,
  location,
}) => {
  return (
    <div
      style={{
        background: "#F8F9FB",
        borderRadius: "14px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
        fontFamily: "'Cairo', sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "stretch" }}>

        {/* Accent bar */}
        <div style={{ width: "6px", background: "#28a745", flexShrink: 0 }} />

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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "0px",
              width: "100%",
            }}
          >
            {/* الجزء الأيمن — الأيقونة + رقم الفاتورة */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                width: "120px",
                flexShrink: 0,
                transform: "translateX(-100px)",
              }}
            >
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

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    background: "#d4edda",
                    color: "#402f61",
                    fontSize: "11px",
                    fontWeight: "700",
                    borderRadius: "5px",
                    padding: "4px 10px",
                    lineHeight: 1,
                  }}
                >
                  فاتورة بيع
                </span>

                <span style={{ fontSize: "15px", fontWeight: "700", color: "#111827" }}>
                  {id}
                </span>

                <span style={{ fontSize: "11px", color: "#6B7280" }}>
                  {date}
                </span>
              </div>
            </div>

            {/* البيانات — grid */}
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
              <DataItem icon={<Hash size={15} />}     label={`${partsCount} قطعة`} />
              <DataItem icon={<Calendar size={15} />}  label={`تاريخ البيع : ${saleDate}`} />
              <DataItem icon={<DollarSign size={15} />} label={`إجمالي الفاتورة : ${totalInvoice?.toLocaleString()}`} />
              <DataItem icon={<MapPin size={15} />}    label={location} />
              <DataItem icon={<User size={15} />}      label={`مصر البيع : ${saleSource}`} />
              <DataItem icon={<User size={15} />}      label={`المشتري : ${customer}`} />
              <DataItem icon={<Phone size={15} />}     label={`موبايل المشتري : ${customerPhone}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleInvoiceCard;
