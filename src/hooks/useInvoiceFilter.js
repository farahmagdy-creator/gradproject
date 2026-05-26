import { useState, useMemo } from "react";

const STORAGE_KEYS = {
  filter: "fixflow_filter",
  urgent: "fixflow_urgent",
};

/**
 * useInvoiceFilter
 * يتحكم في فلترة الإيصالات (حالة + عاجل + بحث).
 * يحفظ اختيارات الفلتر في sessionStorage عشان تفضل بعد التنقل.
 *
 * @param {Array} invoices - مصفوفة الإيصالات الكاملة
 */
export const useInvoiceFilter = (invoices) => {
  const [activeFilter, setActiveFilterState] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.filter) || "الكل"
  );
  const [showUrgentOnly, setShowUrgentOnlyState] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.urgent) === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // ── setters مع sessionStorage sync ──────────────────────────────────────────
  const setActiveFilter = (val) => {
    setActiveFilterState(val);
    sessionStorage.setItem(STORAGE_KEYS.filter, val);
  };

  const setShowUrgentOnly = (val) => {
    setShowUrgentOnlyState(val);
    sessionStorage.setItem(STORAGE_KEYS.urgent, val);
  };

  // ── منطق الفلترة بـ useMemo بدل useEffect (أسرع، بدون render زيادة) ────────
  const filteredInvoices = useMemo(() => {
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

    return result;
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
