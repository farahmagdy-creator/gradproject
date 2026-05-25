import React, { useState } from "react";
import { ReceiptText, Banknote, Package, Archive } from "lucide-react";

import InventoryTable from "../../../components/inventory/InventoryTable";
import FiltersBlade   from "../../../components/shared/FiltersBlade";
import SearchBar      from "../../../components/shared/SearchBar";
import PageHeader     from "../../../components/shared/PageHeader";
import PurchaseFormModal from "../../../components/inventory/PurchaseFormModal";
import useWarehouse      from "../../../hooks/useWarehouse";

const WarehousePage = () => {
  const {
    records, summary, loading,
    search, setSearch,
    fromDate, setFromDate,
    toDate,   setToDate,
    page, setPage,
    PAGE_SIZE, totalCount,
  } = useWarehouse();

  const [showModal, setShowModal] = useState(false);
  const [hovered,   setHovered]   = useState(false);

  const STATS = [
    {
      title:  "إجمالي القطع",
      value:  summary?.totalParts?.toLocaleString() ?? "0",
      icon:   <Archive size={22} color="#6b7280" />,
      iconBg: "#d9e2ff",
    },
    {
      title:  "قيمة المخزون",
      value:  summary?.totalValue?.toLocaleString() ?? "0",
      unit:   "ج.م",
      icon:   <Banknote size={22} color="#0d47a1" />,
      iconBg: "#cfe6f2",
    },
  ];

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">

        <PageHeader
          title="إدارة المخزون"
          subtitle="مراقبة وتحديث قطع الغيار والأدوات"
          actionLabel="تسجيل فاتورة شراء"
          actionIcon={<ReceiptText size={16} />}
          onAction={() => setShowModal(true)}
          actionHovered={hovered}
          onActionMouseEnter={() => setHovered(true)}
          onActionMouseLeave={() => setHovered(false)}
          stats={STATS}
        />

        {/* ══ Search + Filters ══ */}
        <div className="mb-4 d-flex align-items-start gap-3 flex-wrap" dir="rtl">
          <div style={{ width: "500px", marginLeft: "250px" }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="البحث برقم القطعة أو اسم الفني..."
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

        {/* ══ Table ══ */}
        <div
          className="bg-white shadow-sm"
          style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #eee" }}
        >
          <InventoryTable
            records={records}
            loading={loading}
            page={page}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>

      </div>

      <PurchaseFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data) => console.log("saved:", data)}
      />
    </div>
  );
};

export default WarehousePage;
