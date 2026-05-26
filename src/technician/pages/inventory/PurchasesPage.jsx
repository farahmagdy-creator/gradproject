import React, { useState, useMemo } from "react";
import { ReceiptText, Banknote, Archive } from "lucide-react";

import PurchaseOrderCard    from "../../../components/inventory/PurchaseOrderCard";
import InvoiceModal         from "../../../components/inventory/InvoiceModal";
import DateRangeFilter from "../../../components/shared/DateRangeFilter";
import SearchBar            from "../../../components/shared/SearchBar";
import PageHeader           from "../../../components/shared/PageHeader";

import { mockPurchaseOrders, mockPurchaseInvoice } from "../../../data/mockData";

const STATS = [
  { title: "إجمالي القطع المشتراه للشهر", value: "225",    icon: <Archive size={22} color="#6b7280" />, iconBg: "#d9e2ff" },
  { title: "إجمالي مشتريات الشهر",        value: "12,200", unit: "ج.م", icon: <Banknote size={22} color="#0d47a1" />, iconBg: "#cfe6f2" },
];

const parseDate = (str) => {
  if (!str) return null;
  const [d, m, y] = str.split("/");
  return new Date(Number(y), Number(m) - 1, Number(d));
};

const PurchasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate,    setFromDate]    = useState("");
  const [toDate,      setToDate]      = useState("");
  const [showModal,   setShowModal]   = useState(false);
  const [hovered,     setHovered]     = useState(false);

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
      const from = fromDate ? new Date(fromDate) : null;
      const to   = toDate   ? new Date(toDate)   : null;

      return matchesSearch &&
        (!from || (orderDate && orderDate >= from)) &&
        (!to   || (orderDate && orderDate <= to));
    });
  }, [searchQuery, fromDate, toDate]);

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">

        <PageHeader
          title="إدارة المشتريات"
          subtitle="مراقبة فواتير المشتريات و تحديث المخزون"
          actionLabel="تسجيل فاتورة شراء"
          actionIcon={<ReceiptText size={16} />}
          onAction={() => setShowModal(true)}
          actionHovered={hovered}
          onActionMouseEnter={() => setHovered(true)}
          onActionMouseLeave={() => setHovered(false)}
          stats={STATS}
        />

        <div className="mb-4 d-flex align-items-start gap-3 flex-wrap" dir="rtl">
          <div style={{ width: "500px", marginLeft: "250px" }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="البحث برقم الطلب أو اسم القطعة أو المصدر..." />
          </div>
          <div style={{ marginTop: "2px" }}>
            <DateRangeFilter fromDate={fromDate} toDate={toDate} onFromChange={setFromDate} onToChange={setToDate} onFilter={() => {}} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => <PurchaseOrderCard key={i} {...order} />)
          ) : (
            <div className="text-center text-muted py-5" style={{ fontSize: "15px", fontFamily: "'Cairo', sans-serif" }}>
              لا توجد نتائج مطابقة
            </div>
          )}
        </div>

      </div>

      <InvoiceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="فاتورة شراء قطع غيار"
        invoice={mockPurchaseInvoice}
      />
    </div>
  );
};

export default PurchasesPage;
