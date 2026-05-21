import { useState, useEffect } from "react";

const STORAGE_KEYS = {
  filter: "fixflow_filter",
  urgent: "fixflow_urgent",
};

/**
 * useInvoiceFilter
 * يتحكم في فلترة الإيصالات (حالة + عاجل + بحث).
 * يحفظ اختيارات الفلتر في localStorage عشان تفضل بعد التنقل.
 *
 * @param {Array} invoices - مصفوفة الإيصالات الكاملة
 */
export const useInvoiceFilter = (invoices) => {
  const [activeFilter, setActiveFilterState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.filter) || "الكل"
  );
  const [showUrgentOnly, setShowUrgentOnlyState] = useState(
    () => localStorage.getItem(STORAGE_KEYS.urgent) === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  // ── setters مع localStorage sync ─────────────────────────────────────────
  const setActiveFilter = (val) => {
    setActiveFilterState(val);
    localStorage.setItem(STORAGE_KEYS.filter, val);
  };

  const setShowUrgentOnly = (val) => {
    setShowUrgentOnlyState(val);
    localStorage.setItem(STORAGE_KEYS.urgent, val);
  };

  // ── منطق الفلترة ──────────────────────────────────────────────────────────
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
