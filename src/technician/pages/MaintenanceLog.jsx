import React, { useState, useMemo } from "react";
import DateRangeFilter from "../../components/shared/DateRangeFilter";
import StatCard from "../../components/shared/StatCard";
import MaintenanceTable from "../../components/MaintenanceTable";
import SearchBar from "../../components/shared/SearchBar";
import useMaintenanceData from "../../hooks/useMaintenanceData";

export default function MaintenanceLog() {
  const {
    stats, records, totalCount, loading, page,
    fromDate, toDate, PAGE_SIZE,
    setPage, setFromDate, setToDate, handleFilter,
  } = useMaintenanceData();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return records;
    return records.filter((r) =>
      r.receiptNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [records, searchQuery]);

  return (
    <div
      className="d-flex min-vh-100"
      style={{ background: "#F8F9FB", fontFamily: "'Cairo', sans-serif", direction: "rtl" }}
    >
      <div className="flex-grow-1 p-4 overflow-auto">

        {/* Header - العنوان والوصف فقط بدون الفلتر */}
        <div className="mb-4 text-end">
          <h5 className="fw-bold mb-2" style={{ color: "#191C1E", fontSize: "30px" }}>
            سجل عمليات الصيانة
          </h5>
          <p className="text-muted mb-0" style={{ color: "#191C1E", fontSize: "0.78rem" }}>
            مراجعة شاملة لجميع الأجهزة التي تم الانتهاء منها
          </p>
        </div>

        {/* Stat Cards */}
        <div className="row g-3 mb-5">
          <div className="col-12 col-sm-6 col-lg-3">
            <StatCard
              title="إجمالي العمليات"
              value={stats?.totalOperations}
              accentColor="#e63946"
              valueColor="#003178"
              style={{ backgroundColor: "#F2F4F6" }}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatCard
              title="الإيرادات المحققة"
              value={stats?.totalRevenue?.toLocaleString()}
              unit="ج.م"
              accentColor="#198754"
              valueColor="#191C1E"
              style={{ backgroundColor: "#F2F4F6" }}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatCard
              title="متوسط وقت الإصلاح"
              value={stats?.avgRepairDays}
              unit="يوم"
              accentColor="#0d6efd"
              valueColor="#191C1E"
              style={{ backgroundColor: "#F2F4F6" }}
            />
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <StatCard
              title="إجمالي الأرباح الخاصة بك"
              value={stats?.myProfit?.toLocaleString()}
              unit="ج.م"
              dark
            />
          </div>
        </div>

        {/* قسم البحث والفلترة السفلي - جنب بعض بانسيابية */}
        <div className="d-flex justify-content-between align-items-md-center align-items-stretch mb-3 gap-3 flex-wrap flex-md-nowrap">
          
          {/* شريط البحث المفرود */}
          <div className="flex-grow-1" style={{ maxWidth: "680px", minWidth: "280px" }}>
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              width="100%" 
            />
          </div>
          
          {/* فلتر التاريخ */}
          <div className="flex-shrink-0">
            <DateRangeFilter
              fromDate={fromDate}
              toDate={toDate}
              onFromChange={setFromDate}
              onToChange={setToDate}
              onFilter={handleFilter}
            />
          </div>

        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center text-muted py-5 bg-white rounded-3 border">
            <div className="spinner-border spinner-border-sm me-2" role="status" />
            جاري التحميل...
          </div>
        ) : (
          <MaintenanceTable
            records={filteredRecords}
            page={page}
            totalCount={searchQuery ? filteredRecords.length : totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}