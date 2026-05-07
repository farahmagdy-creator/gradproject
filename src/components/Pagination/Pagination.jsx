import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-3 d-flex justify-content-between align-items-center">
      <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
        عرض {end} من أصل {totalItems} إيصال
      </p>
      <div className="d-flex gap-2">
        <button
          className="btn btn-sm bg-white shadow-sm"
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronRight size={16} />
        </button>
        <button
          className="btn btn-sm bg-white shadow-sm"
          style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;