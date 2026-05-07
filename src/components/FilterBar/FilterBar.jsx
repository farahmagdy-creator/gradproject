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
        <h4 className="fw-bold mb-1">إدارة الإيصالات</h4>
        <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
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
                    ? "#0d6efd"
                    : "#f1f3f5",
                color:
                  activeFilter === status && !showUrgentOnly ? "#fff" : "#333",
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
              backgroundColor: showUrgentOnly ? "#dc3545" : "#fff",
              color: showUrgentOnly ? "#fff" : "#dc3545",
              border: "1.5px solid #dc3545",
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