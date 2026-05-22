import { useState, useEffect, useCallback } from "react";

// ============================================================
// 🔌 API FUNCTIONS — غيري الحاجات دي بس لما الباك يبقى جاهز
// ============================================================

const API_BASE_URL = "https://your-api.com"; // ← غيري اللينك ده

async function apiFetchStats() {
  // ✅ لما الباك يجهز:
  // const res = await fetch(`${API_BASE_URL}/stats`, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  // });
  // return await res.json();

  // 🔶 مؤقتاً — Mock Data
  return {
    totalOperations: 128,
    totalRevenue: 14250,
    avgRepairDays: 1.5,
    myProfit: 7125,
    technicianName: "شروق",
    role: "فني صيانة",
    avatarUrl: null,
  };
}

async function apiFetchRecords({ fromDate, toDate, page, pageSize }) {
  // ✅ لما الباك يجهز:
  // const params = new URLSearchParams({ fromDate, toDate, page, pageSize });
  // const res = await fetch(`${API_BASE_URL}/records?${params}`, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  // });
  // const data = await res.json();
  // return { records: data.records, total: data.total };

  // 🔶 مؤقتاً — Mock Data
  const MOCK = Array.from({ length: 20 }, (_, i) => {
    const statuses   = ["تم التسليم", "جاهز للتسليم", "مرفوض", "قيد الإصلاح"];
    const devices    = ["iPhone 14 Pro", "Samsung S23", "MacBook Air", "iPad Pro"];
    const issues     = ["تغيير شاشة", "بطارية", "كاميرا خلفية", "سماعة داخلية"];
    const clientPaid = [1200, 2000, 4500, 800][i % 4];
    const cost       = [400, 800, 2500, 300][i % 4];
    const net        = clientPaid - cost;
    const techShare  = Math.round(net * 0.25);
    return {
      id: i + 1,
      receiptNo: `774-${100 + i}`,
      device: devices[i % devices.length],
      issue: issues[i % issues.length],
      clientPaid, cost, net, techShare,
      receivedDate: `2026-05-${String((i % 14) + 1).padStart(2, "0")}`,
      readyDate: `2026-05-${String((i % 14) + 2).padStart(2, "0")}`,
      deliveryDate: i % 2 === 0 ? `2026-05-${String((i % 14) + 3).padStart(2, "0")}` : "—",
      status: statuses[i % statuses.length],
    };
  });

  let filtered = [...MOCK];
  if (fromDate) filtered = filtered.filter((r) => new Date(r.receivedDate) >= new Date(fromDate));
  if (toDate)   filtered = filtered.filter((r) => new Date(r.receivedDate) <= new Date(toDate));
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  return { records: filtered.slice(start, start + pageSize), total };
}

async function apiUpdateStatus(id, newStatus, deliveryDate) {
  // ✅ لما الباك يجهز:
  // await fetch(`${API_BASE_URL}/records/${id}/status`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`
  //   },
  //   body: JSON.stringify({ status: newStatus, deliveryDate })
  // });

  // 🔶 مؤقتاً — بنعمل حاجة زي console log
  console.log("Update status:", { id, newStatus, deliveryDate });
}

// ============================================================
// 🧠 HOOK — متلمسيش الكود ده خالص
// ============================================================

export default function useMaintenanceData() {
  const today      = new Date().toISOString().slice(0, 10);
  const monthStart = today.slice(0, 8) + "01";

  const [stats,      setStats]      = useState(null);
  const [records,    setRecords]    = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [page,       setPage]       = useState(1);
  const [fromDate,   setFromDate]   = useState(monthStart);
  const [toDate,     setToDate]     = useState(today);
  const PAGE_SIZE = 8;

  // جلب الكاردات
  useEffect(() => {
    apiFetchStats()
      .then(setStats)
      .catch((err) => setError(err.message));
  }, []);

  // جلب الجدول
  const loadRecords = useCallback(async (pg, from, to) => {
    setLoading(true);
    setError(null);
    try {
      const { records, total } = await apiFetchRecords({
        fromDate: from,
        toDate: to,
        page: pg,
        pageSize: PAGE_SIZE,
      });
      setRecords(records);
      setTotalCount(total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords(page, fromDate, toDate);
  }, [page, loadRecords]);

  // تصفية
  const handleFilter = () => {
    setPage(1);
    loadRecords(1, fromDate, toDate);
  };

  // تحديث الحالة
  const updateRecordStatus = async (id, newStatus) => {
    const deliveryDate = newStatus === "تم التسليم" ? today : null;
    try {
      await apiUpdateStatus(id, newStatus, deliveryDate);
      // تحديث الـ UI بدون ما نعمل refetch كامل
      setRecords((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: newStatus, deliveryDate: deliveryDate ?? r.deliveryDate }
            : r
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    stats,
    records,
    totalCount,
    loading,
    error,
    page,
    fromDate,
    toDate,
    PAGE_SIZE,
    setPage,
    setFromDate,
    setToDate,
    handleFilter,
    updateRecordStatus,
  };
}