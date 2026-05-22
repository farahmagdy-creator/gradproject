import React, { useState } from "react";
import StatCard from "../../components/StatCard";
import PartsTable from "../../components/PartsTable";
import DamageCard from "../../components/DamageCard";
import usePartsConsumption from "../../hooks/usePartsConsumption";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const PartsConsumptionPage = () => {
  const {
    records, damages, summary, loading,
    search, setSearch,
    techFilter, setTechFilter,
    techOptions,
    page, setPage,
    PAGE_SIZE,
  } = usePartsConsumption();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState("الكل");

  const handleApplyFilter = () => {
    setTechFilter(selectedTech);
    setIsOpen(false);
  };

  return (
  <div dir="rtl" style={{ fontFamily: "'Cairo', sans-serif", backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
    <div className="container-fluid p-4">

      {/* ══ 1. Header ══ */}
      <div className="mb-4 text-end">
        <h4 className="fw-bold mb-2" style={{ color: "#003178", fontSize: "30px" }}>
          سجل التلفيات و استهلاك القطع
        </h4>
        <p className="mb-0" style={{ color: "#434652", fontSize: "16px" }}>
          مراقبة استهلاكك للقطع من المخزون
        </p>
      </div>

      {/* ══ 2. Stat Cards ══ */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <StatCard
            title="إجمالي القطع المستهلكة للشهر"
            value={summary?.totalParts?.toLocaleString() ?? "0"}
            accentColor="#D9E2FF"
            valueColor="#191C1E"
            style={{ minHeight: "110px", fontWeight: "600", backgroundColor: "#F2F4F6" }}
            titleSize="16px"
            valueSize="1.8rem"
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            title="إجمالي استهلاك الشهر"
            value={summary?.totalConsumption?.toLocaleString() ?? "0"}
            unit="ج.م"
            accentColor="#CFE6F2"
            valueColor="#191C1E"
            style={{ minHeight: "110px", fontWeight: "600", backgroundColor: "#F2F4F6" }}
            titleSize="16px"
            valueSize="1.8rem"
          />
        </div>
        <div className="col-12 col-md-4">
          <StatCard
            title="إجمالي تلفيات الشهر"
            value={summary?.totalWaste?.toLocaleString() ?? "0"}
            unit="ج.م"
            accentColor="#BA1A1A"
            valueColor="#191C1E"
            style={{ minHeight: "110px", fontWeight: "600", backgroundColor: "#F2F4F6" }}
            titleSize="16px"
            valueSize="1.8rem"
          />
        </div>
      </div>

      {/* ══ 3. عنوان القسم ══ */}
      <div className="text-end mb-3">
        <span className="fw-bold" style={{ fontSize: "18px", color: "#1E3A8A" }}>
          القطع المستهلكة
        </span>
      </div>

      {/* ══ 4. السيرش + الفلتر ══ */}
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">

        <div className="position-relative flex-grow-1">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="ابحث برقم القطعة أو التاريخ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              paddingRight: "10px", paddingLeft: "32px", fontSize: "13px",
              borderRadius: "8px", fontFamily: "'Cairo', sans-serif",
              backgroundColor: "#fff", border: "1px solid #dee2e6",
              width: "100%", height: "44px",
            }}
          />
          <Search size={14} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#bbb", pointerEvents: "none" }} />
        </div>

        <div className="d-flex align-items-center gap-2 flex-shrink-0">
          <div style={{ position: "relative", width: "192px" }}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                fontSize: "14px", borderRadius: "12px", fontFamily: "'Cairo', sans-serif",
                border: "1px solid #E0E3E5", backgroundColor: "#B9B9B9", color: "#212529",
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
              display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s",
            }}
          >
            <SlidersHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* ══ 5. الجدول ══ */}
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

      {/* ══ 6. فاصل ══ */}
      <hr style={{ margin: "35px 0 15px 0", borderColor: "#555553" }} />

      {/* ══ 7. التلفيات المسببة ══ */}
      <div className="text-end mb-3">
        <span className="fw-bold" style={{ fontSize: "18px", color: "#1E3A8A" }}>
          التلفيات المسببة
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {damages.map((damage) => (
          <DamageCard key={damage.id} {...damage} />
        ))}
      </div>

    </div>
  </div>
);
  
};

export default PartsConsumptionPage;