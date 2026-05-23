import React, { useState, useMemo } from "react";
import { ReceiptText, Banknote, Archive } from "lucide-react";

import PurchaseOrderCard from "../../../components/inventory/PurchaseOrderCard";
import FiltersBlade from "../../../components/FiltersBlade";
import SearchBar from "../../../components/SearchBar";

import { mockPurchaseOrders } from "../../../data/mockData";

const STATS = [
  {
    title: "إجمالي القطع المشتراه للشهر",
    value: "225",
    icon: <Archive size={22} color="#6b7280" />,
    iconBg: "#d9e2ff",
    valueColor: "#1e191a",
  },
  {
    title: "إجمالي مشتريات الشهر",
    value: "12,200",
    icon: <Banknote size={22} color="#0d47a1" />,
    iconBg: "#cfe6f2",
    unit: "ج.م",
    valueColor: "#191C1E",
  },
];

// ─── تحويل التاريخ من "dd/mm/yyyy" إلى Date ──────────────────
const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts;
  return new Date(Number(y), Number(m) - 1, Number(d));
};

const PurchasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate]       = useState("");
  const [toDate, setToDate]           = useState("");

  // ─── الفلترة الفعلية ──────────────────────────────────────
  const filteredOrders = useMemo(() => {
    return mockPurchaseOrders.filter((order) => {
      const q = searchQuery.trim().toLowerCase();

      const matchesSearch =
        !q ||
        order.id?.toLowerCase().includes(q) ||
        order.partName?.toLowerCase().includes(q) ||
        order.purchaseSource?.toLowerCase().includes(q) ||
        order.deliveryWorker?.toLowerCase().includes(q);

      const orderDate = parseDate(order.date);
      const from      = fromDate ? new Date(fromDate) : null;
      const to        = toDate   ? new Date(toDate)   : null;

      const matchesFrom = !from || (orderDate && orderDate >= from);
      const matchesTo   = !to   || (orderDate && orderDate <= to);

      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [searchQuery, fromDate, toDate]);

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Cairo', sans-serif",
        backgroundColor: "#F8F9FB",
        minHeight: "100vh",
      }}
    >
      <div className="container-fluid p-4">

        {/* ══ Header ══ */}
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
          <div className="text-end">
            <h4 className="fw-bold mb-2" style={{ color: "#003178", fontSize: "30px" }}>
              إدارة المشتريات
            </h4>
            <p className="mb-0" style={{ color: "#434652", fontSize: "16px" }}>
              مراقبة فواتير المشتريات و تحديث المخزون
            </p>
          </div>

          <button
            type="button"
            style={{
              background: "linear-gradient(to right, #0d47a1, #003178)",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "14px",
              fontFamily: "'Cairo', sans-serif",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ReceiptText size={16} />
            تسجيل فاتورة شراء
          </button>
        </div>

        {/* ══ Stat Cards ══ */}
        <div className="row g-3 mb-4">
          {STATS.map((stat, i) => (
            <div key={i} className="col-12 col-md-4">
              <div
                style={{
                  backgroundColor: "#F2F4F6",
                  borderRadius: "8px",
                  padding: "20px",
                  minHeight: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "16px", fontWeight: "bold", color: "#6b7280", marginBottom: "4px" }}>
                    {stat.title}
                  </p>
                  <span style={{ fontSize: "1.8rem", fontWeight: "700", color: "#191C1E" }}>
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span style={{ fontSize: "14px", color: "#6b7280", marginRight: "4px" }}>
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    backgroundColor: stat.iconBg,
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "40px",
                  }}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══ Filters + Search ══ */}
        <div className="mb-4 d-flex align-items-start gap-3 flex-wrap" dir="rtl">

          <div style={{ width: "500px", marginLeft: "250px" }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="البحث برقم الطلب أو اسم القطعة أو المصدر..."
            />
          </div>

          <div style={{ marginTop: "2px" }}>
            <FiltersBlade
              fromDate={fromDate}
              toDate={toDate}
              onFromChange={setFromDate}
              onToChange={setToDate}
              onFilter={() => {}}
            />
          </div>
        </div>

        {/* ══ قائمة الفواتير ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <PurchaseOrderCard key={i} {...order} />
            ))
          ) : (
            <div
              className="text-center text-muted py-5"
              style={{ fontSize: "15px", fontFamily: "'Cairo', sans-serif" }}
            >
              لا توجد نتائج مطابقة
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PurchasesPage;