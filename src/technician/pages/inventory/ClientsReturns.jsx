import React from "react";

import PageHeader from "../../../components/shared/PageHeader";
import ReturnCard from "../../../components/inventory/ReturnCard";
import SearchBar from "../../../components/shared/SearchBar";
import FiltersDropdownBlade from "../../../components/shared/FiltersDropdownBlade";
import useClientReturns from "../../../hooks/useClientReturns";



export default function ClientsReturns() {
  const {
    search, setSearch,
    fromDate, setFromDate,
    toDate, setToDate,
    selectedStatus, setSelectedStatus,
    filtered,
    totalPrice,
    totalCount,
  } = useClientReturns();

  // مصفوفة الإحصائيات مجهزة بالفلكس لطرد الأيقونة لليسار داخل الـ PageHeader
  const stats = [
    {
      title: "إجمالي مرتجعات العملاء للشهر",
      value: totalPrice.toLocaleString("ar-EG"),
      unit: "ج.م",
      colSize: 6,
      iconBg: "#FFE4E4",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <line x1="2" y1="10" x2="22" y2="10"/>
        </svg>
      ),
    },
    {
      title: "إجمالي مرتجعات القطع للشهر",
      value: totalCount,
      colSize: 6,
      iconBg: "#E4EDFF",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#003178" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8"/>
          <rect x="1" y="3" width="22" height="5"/>
          <line x1="10" y1="12" x2="14" y2="12"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "15px ",
        minHeight: "100vh",
        fontFamily: "'Cairo', sans-serif",
      }}
      dir="rtl"
    >
      {/* الهيدر العلوي ومؤشرات الأداء */}
      <div className="mb-5">
        <PageHeader
            title={
             <span style={{ color: "#BA1A1A", fontWeight: "700" }}>
                  إدارة مرتجعات العملاء لك
                 </span>
                 }
          subtitle="مراقبة مرتجعات العملاء لك و ردود الموردين"
          actionLabel="تسجيل أمر إرجاع لعميل"
          actionIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          }
          onAction={() => {}}
          stats={stats}
        />
      </div>

        <hr style={{ border: "none", borderTop: "1px solid #b8b9b9", margin: "0 0 24px 0" }} />


      {/* ─── شريط التصفية والبحث (السيرش يمين والفلتر شمال) ─── */}
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 p-1">
        
        {/* السيرش مستقر في اليمين ويأخذ أكبر مساحة متاحة (بحد أقصى 75%) */}
        <div className="flex-grow-1" style={{ maxWidth: "75%" }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="البحث برقم المرتجع أو القطعة..."
            width="100%"
          />
        </div>

        {/* الفلتر مستقر تماماً في جهة اليسار */}
        <div className="flex-shrink-0">
          <FiltersDropdownBlade
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
            onFilter={setSelectedStatus}
            selectedStatus={selectedStatus}
          />
        </div>

      </div>

      {/* ─── منطقة عرض كروت المرتجعات (الرندرة المباشرة بدون تغليف مزدوج) ─── */}
      <div className="d-flex flex-column gap-1">
        {filtered.length === 0 ? (
          <div
            className="text-center py-5"
            style={{ 
              color: "#94a3b8", 
              fontSize: 16,
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px dashed #e2e8f0" 
            }}
          >
            لا توجد نتائج مطابقة للبحث حالياً
          </div>
        ) : (
          filtered.map((r) => (
            <ReturnCard key={r.id} {...r} />
          ))
        )}
      </div>
    <style>{`
  button[type="button"] {
    background: #BA1A1A !important;
    box-shadow: none !important;
  }
  button[type="button"]:hover {
    background: #93000a !important;
  }
    `}</style>
    </div>
 
        

);
}