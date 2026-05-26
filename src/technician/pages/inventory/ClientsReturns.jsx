import React, { useState } from "react";
import { FilePlus } from "lucide-react";

import PageHeader from "../../../components/shared/PageHeader";
import ReturnCard from "../../../components/inventory/ReturnCard";
import SearchBar from "../../../components/shared/SearchBar";
import DateRangeFilter from "../../../components/shared/DateRangeFilter";
import useClientReturns from "../../../hooks/useClientReturns";
import ClientReturnItemModal from "../../../components/inventory/ClientReturnItemModal";

export default function ClientsReturns() {
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [btnHovered,      setBtnHovered]      = useState(false);

  const {
    search, setSearch,
    fromDate, setFromDate,
    toDate, setToDate,
    selectedStatus, setSelectedStatus,
    filtered,
    totalPrice,
    totalCount,
  } = useClientReturns();

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
      iconBg: "#FFE4E4",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#BA1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
        padding: "15px",
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
          actionIcon={<FilePlus size={16} />}
          onAction={() => setShowReturnModal(true)}
          onActionMouseEnter={() => setBtnHovered(true)}
          onActionMouseLeave={() => setBtnHovered(false)}
          actionHovered={btnHovered}
          actionBg="#BA1A1A"
          actionBgHover="#93000A"
          actionShadowColor="rgba(186,26,26,0.25)"
          stats={stats}
        />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #b8b9b9", margin: "0 0 24px 0" }} />

      {/* ─── شريط التصفية والبحث ─── */}
      <div className="d-flex justify-content-between align-items-center gap-3 mb-4 p-1">
        <div className="flex-grow-1" style={{ maxWidth: "75%" }}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="البحث برقم المرتجع أو القطعة..."
            width="100%"
          />
        </div>
        <div className="flex-shrink-0">
          <DateRangeFilter
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
            onFilter={setSelectedStatus}
            selectedStatus={selectedStatus}
            variant="white"
            statusOptions={[
              { value: "",               label: "تصفية (الكل)"       },
              { value: "customer_type",  label: "مرتجع عميل"         },
              { value: "tech_type",      label: "مرتجع فني"          },
              { value: "before_return",  label: "المورد قبل الإرجاع" },
              { value: "rejected",       label: "المورد رفض الإرجاع" },
              { value: "in_progress",    label: "تحت الإرجاع"        },
              { value: "send_back",      label: "إرجاع للمورد"       },
            ]}
          />
        </div>
      </div>

      {/* ─── منطقة عرض كروت المرتجعات ─── */}
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

      {/* ─── مودال اختيار القطعة المراد إرجاعها ─── */}
      <ClientReturnItemModal
        show={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        onSave={(data) => {
          console.log("تم حفظ أمر الإرجاع:", data);
          setShowReturnModal(false);
        }}
      />
    </div>
  );
}
