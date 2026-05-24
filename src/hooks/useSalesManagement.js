import { useState, useMemo } from "react";

const MOCK_SALES_RECORDS = Array.from({ length: 45 }, (_, i) => {
  const parts = [
    { partNo: "PT-8842", partName: "شاشة iPhone 13 Pro", receiptNo: "RC-2023" },
    { partNo: "PT-1123", partName: "بطارية Samsung S22",  receiptNo: "RC-2024" },
    { partNo: "PT-5567", partName: "كاميرا Xiaomi 12",    receiptNo: "RC-2025" },
    { partNo: "PT-3301", partName: "شاشة Huawei P50",     receiptNo: "RC-2026" },
  ];
  const techs    = ["أحمد محمود", "بلال جمال", "محمد علي", "سارة خالد"];
  const statuses = ["تم التسليم", "قيد الإصلاح", "جاهز للتسليم"];
  const costs    = [1200, 2500, 3200, 4500, 890];
  const part     = parts[i % parts.length];

  return {
    id:         i + 1,
    partNo:     part.partNo,
    partName:   part.partName,
    receiptNo:  part.receiptNo,
    cost:       costs[i % costs.length],
    date:       `15/10/2025`,
    time:       `10:30 صباحاً`,
    technician: techs[i % techs.length],
    status:     statuses[i % statuses.length],
  };
});

const MOCK_SUMMARY = {
  totalParts:   225,
  totalRevenue: 12200,
};

const PAGE_SIZE   = 8;
const TECHNICIANS = ["جميع الفنيين", "أحمد محمود", "بلال جمال", "محمد علي", "سارة خالد"];

export function useSalesManagement() {
  const [search,     setSearch]     = useState("");
  const [techFilter, setTechFilter] = useState("جميع الفنيين");
  const [page,       setPage]       = useState(1);

  const filtered = useMemo(() => {
    return MOCK_SALES_RECORDS.filter((row) => {
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

  const summary = { ...MOCK_SUMMARY, totalRecords: filtered.length };

  return {
    records,
    summary,
    loading:       false,
    search,        setSearch:     (val) => { setSearch(val);     setPage(1); },
    techFilter,    setTechFilter: (val) => { setTechFilter(val); setPage(1); },
    techOptions:   TECHNICIANS,
    page,          setPage,
    PAGE_SIZE,
    totalPages,
  };
}

export default useSalesManagement;
