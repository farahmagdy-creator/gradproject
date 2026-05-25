import React, { useState } from "react"; // 1. ضفنا useState هنا
import { useDamagedParts } from "../../../hooks/useDamagedParts";
import { PlusCircle } from "lucide-react";

import DamageCard from "../../../components/DamageCard";
import SearchBar from "../../../components/shared/SearchBar";
import FiltersBlade from "../../../components/shared/FiltersBlade";

const DamagedPartsPage = () => {
  const {
    parts,
    stats,
    searchTerm,
    setSearchTerm,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleApplyFilter,
    loading
  } = useDamagedParts();

  return (
    <div className="container-fluid py-3" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="fw-bold mb-1" style={{ color: "#F5A623", fontSize: "1.8rem" }}>متابعة تلفيات المركز</h2>
          <p className="text-muted small mb-0">متابعة القطع التالفة وأسباب التلف</p>
        </div>
        <button 
          className="btn d-flex align-items-center gap-2 text-white px-3 py-2 fw-semibold border-0" 
          style={{ backgroundColor: "#F5A623", borderRadius: "8px", fontSize: "14px" }}
        >
          <PlusCircle size={16} />
          <span>تسجيل قطعة تالفة</span>
        </button>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-lg-7 col-xl-7">
          <div className="row g-3">
            
            <div className="col-12 col-sm-6">
              <div className="card border-0 shadow-sm p-4 " style={{background:'#F2F4F6' , borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="text-end d-flex flex-column gap-3 w-100">
                    <span className="text-muted small fw-semibold pt-1">إجمالي القطع التالفة للشهر</span>
                    <h2 className="fw-bold mb-0" style={{ color: "#1E293B", fontSize: "1.75rem" }}>
                      {stats.totalCount} 
                    </h2>
                  </div>
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{ width: "40px", height: "40px", backgroundColor: "#F5A6231A", color: "#E5A93C" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="card border-0 shadow-sm p-4 " style={{background:'#F2F4F6', borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="text-end d-flex flex-column gap-3 w-100">
                    <span className="text-muted small fw-semibold pt-1">إجمالي تلفيات المركز للشهر</span>
                    <h2 className="fw-bold mb-0" style={{ color: "#1E293B", fontSize: "1.75rem" }}>
                      {stats.totalCost.toLocaleString()} <span className="fs-6 fw-normal text-secondary">ج.م</span> {/* ديناميكي من الباك */}
                    </h2>
                  </div>
                  <div 
                    className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{ width: "40px", height: "40px", backgroundColor: "#F5A6231A", color: "#E5A93C" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <hr className="my-4 mt-5" style={{ borderColor: "#CBD5E1", opacity: 0.5, borderWidth: "1px" }} />


      <div className="d-flex flex-column flex-md-row gap-3 align-items-stretch align-items-md-center  justify-content-between mb-4">
        <div className="flex-grow-1">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="البحث برقم القطعة..."
            width="100%"
          />
        </div>
        <div className="flex-shrink-0 ms-md-auto">
          <FiltersBlade 
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
            onFilter={handleApplyFilter}
          />
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {loading ? (
          <div className="text-center py-5 text-secondary">جاري تحميل البيانات...</div>
        ) : parts.length > 0 ? (
          parts.map((part) => (
            <DamageCard 
              key={part.id}
              id={part.id}
              date={part.date}
              partName={part.partName}
              partNo={part.partNo}
              buyPrice={part.buyPrice}
              sellPrice={part.sellPrice}
              recorder={part.recorder}
              damageDate={part.damageDate}
              reason={part.reason}
            />
          ))
        ) : (
          <div className="text-center py-5 text-muted border rounded-3 bg-white">
            لا توجد قطع تالفة تطابق خيارات البحث الحالية.
          </div>
        )}
      </div>

    </div>
  );
};

export default DamagedPartsPage;