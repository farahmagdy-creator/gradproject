import { useState, useEffect, useCallback } from "react";
import { mockMaintenanceStats, mockMaintenanceRecords } from "../data/mockData";

// ============================================================
// 🔌 API FUNCTIONS — غيّر الحاجات دي بس لما الباك يبقى جاهز
// ============================================================

const API_BASE_URL = "https://your-api.com"; // ← غيّر اللينك ده

async function apiFetchStats() {
  // ✅ لما الباك يجهز، احذف السطرين دول وفك التعليق عن الكود تحت:
  // const res = await fetch(`${API_BASE_URL}/stats`, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  // });
  // return await res.json();

  return mockMaintenanceStats; // 🔶 مؤقتاً
}

async function apiFetchRecords({ fromDate, toDate, page, pageSize }) {
  // ✅ لما الباك يجهز، احذف السطرين دول وفك التعليق عن الكود تحت:
  // const params = new URLSearchParams({ fromDate, toDate, page, pageSize });
  // const res = await fetch(`${API_BASE_URL}/records?${params}`, {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  // });
  // const data = await res.json();
  // return { records: data.records, total: data.total };

  // 🔶 مؤقتاً — Mock Data
  let filtered = [...mockMaintenanceRecords];
  if (fromDate) filtered = filtered.filter((r) => new Date(r.receivedDate) >= new Date(fromDate));
  if (toDate)   filtered = filtered.filter((r) => new Date(r.receivedDate) <= new Date(toDate));
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  return { records: filtered.slice(start, start + pageSize), total };
}

async function apiUpdateStatus(id, newStatus, deliveryDate) {
  // ✅ لما الباك يجهز، فك التعليق:
  // await fetch(`${API_BASE_URL}/records/${id}/status`, {
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   },
  //   body: JSON.stringify({ status: newStatus, deliveryDate }),
  // });

  console.log("Update status:", { id, newStatus, deliveryDate }); // 🔶 مؤقتاً
}

// ============================================================
// 🧠 HOOK — متلمسش الكود ده خالص
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
        toDate:   to,
        page:     pg,
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

  const handleFilter = () => {
    setPage(1);
    loadRecords(1, fromDate, toDate);
  };

  const updateRecordStatus = async (id, newStatus) => {
    const deliveryDate = newStatus === "تم التسليم" ? today : null;
    try {
      await apiUpdateStatus(id, newStatus, deliveryDate);
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
