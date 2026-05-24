import React, { useState, useMemo } from "react";
import { ReceiptText, Banknote, Archive } from "lucide-react";

import SaleInvoiceCard from "../../../components/inventory/SaleInvoiceCard";
import FiltersBlade    from "../../../components/FiltersBlade";
import SearchBar       from "../../../components/SearchBar";
import PageHeader      from "../../../components/shared/PageHeader";

import { mockExternalSales } from "../../../data/mockData";

const STATS = [
  {
    title:  "إجمالي القطع المباعة للشهر",
    value:  "225",
    icon:   <Archive size={22} color="#6b7280" />,
    iconBg: "#d9e2ff",
  },
  {
    title:  "إجمالي مبيعات الشهر",
    value:  "12,200",
    unit:   "ج.م",
    icon:   <Banknote size={22} color="#0d47a1" />,
    iconBg: "#cfe6f2",
  },
];

const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [d, m, y] = parts;
  return new Date(Number(y), Number(m) - 1, Number(d));
};

const ExternalSalesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate,    setFromDate]    = useState("");
  const [toDate,      setToDate]      = useState("");

  const filteredSales = useMemo(() => {
    return mockExternalSales.filter((sale) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        sale.id?.toLowerCase().includes(q) ||
        sale.customer?.toLowerCase().includes(q) ||
        sale.saleSource?.toLowerCase().includes(q);

      const saleDate = parseDate(sale.date);
      const from     = fromDate ? new Date(fromDate) : null;
      const to       = toDate   ? new Date(toDate)   : null;

      const matchesFrom = !from || (saleDate && saleDate >= from);
      const matchesTo   = !to   || (saleDate && saleDate <= to);

      return matchesSearch && matchesFrom && matchesTo;
    });
  }, [searchQuery, fromDate, toDate]);

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">

        <PageHeader
          title="إدارة المبيعات الخارجية"
          subtitle="مراقبة فواتير المبيعات و استهلاك الورشة للمخزون"
          actionLabel="تسجيل فاتورة بيع"
          actionIcon={<ReceiptText size={16} />}
          onAction={() => {}}
          stats={STATS}
        />

        {/* ══ Search + Filters ══ */}
        <div className="mb-4 d-flex align-items-start gap-3 flex-wrap" dir="rtl">
          <div style={{ width: "500px", marginLeft: "250px" }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="البحث برقم الفاتورة أو اسم المشتري..."
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
          {filteredSales.length > 0 ? (
            filteredSales.map((sale, i) => (
              <SaleInvoiceCard key={i} {...sale} />
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

export default ExternalSalesPage;
