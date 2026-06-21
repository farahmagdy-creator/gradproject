import { useState, useMemo } from "react";
import { mockEmployees, mockEmployeesSummary, employeeRolesList } from "../data/mockData";

const PAGE_SIZE = 7;

export function useEmployees() {
  const [search,     setSearch]     = useState("");
  const [roleFilter, setRoleFilter] = useState("جميع الأدوار");
  const [page,        setPage]      = useState(1);

  const filtered = useMemo(() => {
    return mockEmployees.filter((emp) => {
      const q = search.trim().toLowerCase();
      const matchSearch = !q || emp.name?.toLowerCase().includes(q);
      const matchRole    = roleFilter === "جميع الأدوار" || emp.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const records = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page]
  );

  return {
    records,
    summary: mockEmployeesSummary,
    loading: false,
    search,      setSearch:     (v) => { setSearch(v);     setPage(1); },
    roleFilter,  setRoleFilter: (v) => { setRoleFilter(v); setPage(1); },
    roleOptions: employeeRolesList,
    page, setPage,
    PAGE_SIZE,
    totalCount: filtered.length,
  };
}

export default useEmployees;
