import { useState, useMemo } from "react";
import { mockInventoryItems } from "../data/mockData";

const PAGE_SIZE = 7;

export function useWarehouse() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate,   setToDate]   = useState("");
  const [page,     setPage]     = useState(1);

  const filtered = useMemo(() => {
    return mockInventoryItems.filter((item) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.sku?.toLowerCase().includes(q)  ||
        item.supplier?.toLowerCase().includes(q);

      return matchSearch;
    });
  }, [search]);

  const records = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  const summary = {
    totalParts: 1248,
    totalValue: 45200,
  };

  return {
    records,
    summary,
    loading: false,
    search,  setSearch:  (v) => { setSearch(v);  setPage(1); },
    fromDate, setFromDate,
    toDate,   setToDate,
    page,    setPage,
    PAGE_SIZE,
    totalCount: filtered.length,
  };
}

export default useWarehouse;
