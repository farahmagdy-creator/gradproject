import { useState } from "react";
import FilterBar from "../components/FilterBar/FilterBar";
import InvoicesTable from "../components/InvoicesTable/InvoicesTable";
import Pagination from "../components/Pagination/Pagination";
import { useInvoiceFilter } from "../hooks/useInvoiceFilter";
import { mockInvoices } from "../data/mockData";

const ITEMS_PER_PAGE = 10;

const InvoicesPage = ({ setActivePage, setSelectedReceipt }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    activeFilter,
    setActiveFilter,
    showUrgentOnly,
    setShowUrgentOnly,
    searchQuery,
    setSearchQuery,
    filteredInvoices,
  } = useInvoiceFilter(mockInvoices);

  const handleFilterChange = (status) => { setActiveFilter(status);  setCurrentPage(1); };
  const handleUrgentToggle = (val)    => { setShowUrgentOnly(val);   setCurrentPage(1); };
  const handleSearch       = (query)  => { setSearchQuery(query);    setCurrentPage(1); };

  const handleView = (invoice) => {
    setSelectedReceipt?.(invoice);
    setActivePage?.("receipt-details");
  };

  const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

  const paginated = filteredInvoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const countLabel = `عرض ${Math.min(currentPage * ITEMS_PER_PAGE, filteredInvoices.length)} من أصل ${filteredInvoices.length} إيصال`;

  return (
    <div style={{ direction: "rtl", backgroundColor: "#f5f6fa", minHeight: "100vh", padding: "28px" }}>
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
        showUrgentOnly={showUrgentOnly}
        setShowUrgentOnly={handleUrgentToggle}
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
      />
      <InvoicesTable
        data={paginated}
        onView={handleView}
        countLabel={countLabel}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default InvoicesPage;
