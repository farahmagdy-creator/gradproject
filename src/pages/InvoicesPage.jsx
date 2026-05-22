import { useState } from "react";
import FilterBar    from "../components/FilterBar/FilterBar";
import InvoicesTable from "../components/InvoicesTable/InvoicesTable";
import { useInvoiceFilter } from "../hooks/useInvoiceFilter";
import { mockInvoices } from "../data/mockData";

const ITEMS_PER_PAGE = 10;

/**
 * InvoicesPage
 * Props:
 *  - onViewReceipt : callback(invoice) — بيفتح صفحة التفاصيل
 */
const InvoicesPage = ({ onViewReceipt }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    activeFilter, setActiveFilter,
    showUrgentOnly, setShowUrgentOnly,
    searchQuery, setSearchQuery,
    filteredInvoices,
  } = useInvoiceFilter(mockInvoices);

  const resetPage = (fn) => (val) => { fn(val); setCurrentPage(1); };

  const totalPages  = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
  const paginated   = filteredInvoices.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const countLabel  = `عرض ${Math.min(currentPage * ITEMS_PER_PAGE, filteredInvoices.length)} من أصل ${filteredInvoices.length} إيصال`;

  return (
    <div style={{ direction: "rtl", backgroundColor: "#f5f6fa", minHeight: "100vh", padding: "28px" }}>
      <FilterBar
        activeFilter={activeFilter}       setActiveFilter={resetPage(setActiveFilter)}
        showUrgentOnly={showUrgentOnly}   setShowUrgentOnly={resetPage(setShowUrgentOnly)}
        searchQuery={searchQuery}         setSearchQuery={resetPage(setSearchQuery)}
      />
      <InvoicesTable
        data={paginated}
        onView={onViewReceipt}
        countLabel={countLabel}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InvoicesPage;
