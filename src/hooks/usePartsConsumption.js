import { useState, useMemo } from "react";

const MOCK_RECORDS = Array.from({ length: 45 }, (_, i) => {
  const parts = [
    { partNo: "PT-8842", partName: "شاشة iPhone 13 Pro",  receiptNo: "RC-2023" },
    { partNo: "PT-1123", partName: "بطارية Samsung S22",   receiptNo: "RC-2024" },
    { partNo: "PT-5567", partName: "كاميرا Xiaomi 12",     receiptNo: "RC-2025" },
    { partNo: "PT-3301", partName: "شاشة Huawei P50",      receiptNo: "RC-2026" },
  ];
  const techs    = ["بلال جمال", "أحمد سامي", "محمد علي", "سارة خالد"];
  const statuses = ["تم التسليم", "قيد الإصلاح", "جاهز للتسليم"];
  const costs    = [1200, 2500, 3200, 4500, 890];
  const part     = parts[i % parts.length];

  return {
    id:         i + 1,
    partNo:     part.partNo,
    partName:   part.partName,
    receiptNo:  part.receiptNo,
    cost:       costs[i % costs.length],
    date:       `${String((i % 28) + 1).padStart(2, "0")}/10/2025`,
    time:       `${9 + (i % 8)}:00 صباحاً`,
    technician: techs[i % techs.length],
    status:     statuses[i % statuses.length],
  };
});

// ✅ Mock data للتلفيات المسببة
const MOCK_DAMAGES = [
  {
    id:         "DAP-1002",
    date:       "22/3/2026",
    partName:   "شاشة ايفون 14pro oled",
    partNo:     "PRT-8010",
    buyPrice:   11300,
    sellPrice:  12400,
    recorder:   "حازم علي",
    damageDate: "22/3/2026",
    reason:     "اتكسرت من حازم و هو بيرفع التاتش بعد ما اتكسر من بلال",
  },
  {
    id:         "DAP-1003",
    date:       "20/3/2026",
    partName:   "بطارية Samsung S22",
    partNo:     "PRT-1123",
    buyPrice:   800,
    sellPrice:  1100,
    recorder:   "حازم علي",
    damageDate: "20/3/2026",
    reason:     "انتفخت البطارية أثناء عملية الاستبدال",
  },
  {
    id:         "DAP-1004",
    date:       "18/3/2026",
    partName:   "كاميرا Xiaomi 12",
    partNo:     "PRT-5567",
    buyPrice:   1500,
    sellPrice:  1900,
    recorder:   "محمد علي",
    damageDate: "18/3/2026",
    reason:     "سقطت القطعة أثناء التركيب وتكسر العدسة",
  },
];

const MOCK_SUMMARY = {
  totalParts:       225,
  totalConsumption: 12200,
  totalWaste:       240,
};

const PAGE_SIZE   = 7;
const TECHNICIANS = ["الكل", "بلال جمال", "أحمد سامي", "محمد علي", "سارة خالد"];

export function usePartsConsumption() {
  const [search,     setSearch]     = useState("");
  const [techFilter, setTechFilter] = useState("الكل");
  const [page,       setPage]       = useState(1);

  const filtered = useMemo(() => {
    return MOCK_RECORDS.filter((row) => {
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

  const summary = { ...MOCK_SUMMARY, totalRecords: filtered.length };

  return {
    records,
    damages: MOCK_DAMAGES, // ✅ التلفيات
    summary,
    loading:       false,
    error:         null,
    search,        setSearch:     (val) => { setSearch(val);     setPage(1); },
    techFilter,    setTechFilter: (val) => { setTechFilter(val); setPage(1); },
    techOptions:   TECHNICIANS,
    page,          setPage,
    PAGE_SIZE,
    totalPages,
  };
}

export default usePartsConsumption;