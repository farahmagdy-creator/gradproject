import { useState, useMemo } from "react";
import {
  mockSalesRecords,
  mockSalesSummary,
  SALES_TECHNICIANS,
} from "../data/mockData";

const PAGE_SIZE = 8;

export function useSalesManagement() {
  const [search,     setSearch]     = useState("");
  const [techFilter, setTechFilter] = useState("جميع الفنيين");
  const [page,       setPage]       = useState(1);

  const filtered = useMemo(() => {
    return mockSalesRecords.filter((row) => {
      const matchSearch =
        search === "" ||
        row.partNo.toLowerCase().includes(search.toLowerCase()) ||
        row.technician.includes(search) ||
        row.partName.includes(search);
      const matchTech =
        techFilter === "جميع الفنيين" || row.technician === techFilter;
      return matchSearch && matchTech;
    });
  }, [search, techFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const records    = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const summary = { ...mockSalesSummary, totalRecords: filtered.length };

  return {
    records,
    summary,
    loading:       false,
    search,        setSearch:     (val) => { setSearch(val);     setPage(1); },
    techFilter,    setTechFilter: (val) => { setTechFilter(val); setPage(1); },
    techOptions:   SALES_TECHNICIANS,
    page,          setPage,
    PAGE_SIZE,
    totalPages,
  };
}

export default useSalesManagement;
