import { useState, useEffect } from "react";

export const useInvoiceFilter = (invoices) => {
  const [activeFilter, setActiveFilter] = useState("الكل");
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  useEffect(() => {
    let result = [...invoices];

    if (activeFilter !== "الكل") {
      result = result.filter((inv) => inv.status === activeFilter);
    }

    if (showUrgentOnly) {
      result = result.filter((inv) => inv.urgent === true);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (inv) =>
          inv.id.toLowerCase().includes(query) ||
          inv.phone.includes(query) ||
          inv.customerName.includes(query)
      );
    }

    setFilteredInvoices(result);
  }, [activeFilter, showUrgentOnly, searchQuery, invoices]);

  return {
    activeFilter,
    setActiveFilter,
    showUrgentOnly,
    setShowUrgentOnly,
    searchQuery,
    setSearchQuery,
    filteredInvoices,
  };
};