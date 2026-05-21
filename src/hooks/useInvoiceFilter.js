import { useState, useEffect } from "react";

export const useInvoiceFilter = (invoices) => {
  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem("fixflow_filter") || "الكل";
  });
  const [showUrgentOnly, setShowUrgentOnly] = useState(() => {
    return localStorage.getItem("fixflow_urgent") === "true";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  const handleSetActiveFilter = (val) => {
    setActiveFilter(val);
    localStorage.setItem("fixflow_filter", val);
  };

  const handleSetShowUrgentOnly = (val) => {
    setShowUrgentOnly(val);
    localStorage.setItem("fixflow_urgent", val);
  };

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
    setActiveFilter: handleSetActiveFilter,
    showUrgentOnly,
    setShowUrgentOnly: handleSetShowUrgentOnly,
    searchQuery,
    setSearchQuery,
    filteredInvoices,
  };
};
