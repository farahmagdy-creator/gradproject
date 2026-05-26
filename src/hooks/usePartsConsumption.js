import { useState, useMemo } from "react";
import {
  mockPartsConsumptionRecords,
  mockPartsDamages,
  mockPartsConsumptionSummary,
  PARTS_CONSUMPTION_TECHNICIANS,
} from "../data/mockData";

const PAGE_SIZE = 7;

export function usePartsConsumption() {
  const [search,     setSearch]     = useState("");
  const [techFilter, setTechFilter] = useState("الكل");
  const [page,       setPage]       = useState(1);

  const filtered = useMemo(() => {
    return mockPartsConsumptionRecords.filter((row) => {
      const matchSearch =
        search === "" ||
        row.partNo.toLowerCase().includes(search.toLowerCase()) ||
        row.date.includes(search);
      const matchTech =
        techFilter === "الكل" || row.technician === techFilter;
      return matchSearch && matchTech;
    });
  }, [search, techFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const records    = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const summary = { ...mockPartsConsumptionSummary, totalRecords: filtered.length };

  return {
    records,
    damages:       mockPartsDamages,
    summary,
    loading:       false,
    error:         null,
    search,        setSearch:     (val) => { setSearch(val);     setPage(1); },
    techFilter,    setTechFilter: (val) => { setTechFilter(val); setPage(1); },
    techOptions:   PARTS_CONSUMPTION_TECHNICIANS,
    page,          setPage,
    PAGE_SIZE,
    totalPages,
  };
}

export default usePartsConsumption;
