import React from "react";
import { Search } from "lucide-react";
import { statusesList } from "../../data/mockData";

const FilterBar = ({
  activeFilter,
  setActiveFilter,
  showUrgentOnly,
  setShowUrgentOnly,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="mb-4">
      <div className="text-end mb-3">
        <h4 className="fw-bold mb-1" style={{fontSize: '36px', color: "#1b1c1d"}}>إدارة الإيصالات</h4>
        <p className="text-muted mb-0" style={{ fontSize: "16px", color: "#434653" }}>
          مراقبة وإدارة سجلات الإيصالات
        </p>
      </div>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
        
        {/* السيرش */}
        <div className="position-relative" style={{ minWidth: "300px" }}>
          <input
            type="text"
            className="form-control border-0 bg-white py-2 shadow-sm"
            placeholder="ابحث برقم الموبايل أو رقم الإيصال"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              borderRadius: "10px",
              fontSize: "13px",
              paddingRight: "35px",   
              paddingLeft: "12px",     
              textAlign: "right",       
              direction: "rtl",        
            }}
          />
          <span
            className="position-absolute top-50 translate-middle-y"
            style={{
              right: "12px",              
              pointerEvents: "none",      
            }}
          >
            <Search size={16} color="#aaa" />
          </span>
        </div>

        {/* الفلاتر */}
        <div className="d-flex gap-2 flex-wrap">
          {statusesList.map((status) => (
            <button
              key={status}
              onClick={() => {
                setActiveFilter(status);
                setShowUrgentOnly(false);
              }}
              className="btn btn-sm px-3 fw-medium"
              style={{
                borderRadius: "8px",
                backgroundColor:
                  activeFilter === status && !showUrgentOnly
                    ? "#094cb2"
                    : "#e9e8e9",
                color:
                  activeFilter === status && !showUrgentOnly ? "#ffffff" : "#434653",
                border: "none",
                fontSize: "13px",
              }}
            >
              {status}
            </button>
          ))}

          <button
            onClick={() => {
              setShowUrgentOnly(!showUrgentOnly);
              setActiveFilter("الكل");
            }}
            className="btn btn-sm px-3 fw-bold"
            style={{
              borderRadius: "8px",
              backgroundColor: showUrgentOnly ? "#ba1a1a" : "#ffffff",
              color: showUrgentOnly ? "#ffffff" : "#ba1a1a",
              border: "1.5px solid #ba1a1a",
              fontSize: "13px",
            }}
          >
            ! عاجل
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterBar;