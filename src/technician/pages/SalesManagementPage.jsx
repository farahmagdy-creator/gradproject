import React, { useState } from "react";
import { FileText, Package, Banknote, Archive } from "lucide-react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

import PartsTable from "../../components/PartsTable";
import PageHeader from "../../components/shared/PageHeader";
import SearchBar from "../../components/SearchBar";
import useSalesManagement from "../../hooks/useSalesManagement";

const SalesManagementPage = () => {
  const {
    records, summary, loading,
    search, setSearch,
    techFilter, setTechFilter,
    techOptions,
    page, setPage,
    PAGE_SIZE,
  } = useSalesManagement();

  const [isOpen,       setIsOpen]       = useState(false);
  const [selectedTech, setSelectedTech] = useState("جميع الفنيين");

  const handleApplyFilter = () => {
    setTechFilter(selectedTech);
    setIsOpen(false);
  };

  const STATS = [
    {
      title:  "إجمالي القطع المستهلكة للشهر",
      value:  summary?.totalParts?.toLocaleString() ?? "0",
      icon:   <Archive size={22} color="#6b7280" />,
      iconBg: "#d9e2ff",
    },
    {
      title:  "إجمالي استهلاك الورشة للشهر",
      value:  summary?.totalRevenue?.toLocaleString() ?? "0",
      unit:   "ج.م",
      icon:   <Banknote size={22} color="#0d47a1" />,
      iconBg: "#cfe6f2",
    },
  ];

  return (
    <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
      <div className="container-fluid p-4">

        <PageHeader
          title="إدارة المبيعات للورشة"
          subtitle="مراقبة فواتير المبيعات و استهلاك الورشة للمخزون"
          actionLabel="تسجيل فاتورة بيع"
          actionIcon={<FileText size={16} />}
          onAction={() => {}}
          stats={STATS}
        />

        {/* ══ Search + Filter ══ */}
        <div className="d-flex align-items-center justify-content-between gap-3 mb-4">

          <div className="flex-grow-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="ابحث برقم القطعة أو اسم الفني.."
            />
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <div style={{ position: "relative", width: "192px" }}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  fontSize: "14px", borderRadius: "12px", fontFamily: "'Cairo', sans-serif",
                  border: "1px solid #E0E3E5", backgroundColor: "#ffffff", color: "#212529",
                  fontWeight: "500", width: "100%", height: "44px", padding: "5px 14px",
                  display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                }}
              >
                <span>{selectedTech}</span>
                <ChevronDown size={13} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>

              {isOpen && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 1040 }} onClick={() => setIsOpen(false)} />
                  <ul style={{
                    position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 1050,
                    backgroundColor: "#fff", border: "1px solid #e9ecef", borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)", listStyle: "none",
                    padding: "6px", margin: 0, width: "100%",
                    fontFamily: "'Cairo', sans-serif", fontSize: "13px",
                  }}>
                    {techOptions.map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          onClick={() => setSelectedTech(t)}
                          style={{
                            width: "100%", display: "flex", alignItems: "center",
                            justifyContent: "space-between", padding: "8px 12px",
                            borderRadius: "7px", border: "none", cursor: "pointer",
                            fontFamily: "'Cairo', sans-serif", fontSize: "13px",
                            fontWeight: selectedTech === t ? "600" : "400",
                            color: selectedTech === t ? "#1a1a1a" : "#555",
                            backgroundColor: selectedTech === t ? "#f1f3f5" : "transparent",
                            textAlign: "right",
                          }}
                          onMouseEnter={(e) => { if (selectedTech !== t) e.currentTarget.style.backgroundColor = "#f8f9fa"; }}
                          onMouseLeave={(e) => { if (selectedTech !== t) e.currentTarget.style.backgroundColor = "transparent"; }}
                        >
                          <span>{t}</span>
                          {selectedTech === t && (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M2 7L5.5 10.5L12 3.5" stroke="#434652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleApplyFilter}
              style={{
                backgroundColor: "#FFFFFF", borderRadius: "12px", width: "44px", height: "44px",
                color: "#434652", cursor: "pointer", flexShrink: 0, border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* ══ Table ══ */}
        <div className="bg-white shadow-sm" style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #eee" }}>
          <PartsTable
            records={records}
            loading={loading}
            page={page}
            totalCount={summary?.totalRecords ?? 0}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>

      </div>
    </div>
  );
};

export default SalesManagementPage;
