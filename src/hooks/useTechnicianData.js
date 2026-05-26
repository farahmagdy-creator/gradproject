import { useState, useEffect } from "react";
import {
  mockTechDashboardStats,
  mockTechCompletedTasks,
  mockTechAlerts,
  mockTechUpcomingTasks,
  mockTechPerformance,
} from "../data/mockData";

// ============================================================
// 🔌 لما الباك يجهز، استبدل الـ mock imports بـ axios calls:
// import axios from 'axios';
// ============================================================

export function useTechnicianData() {
  const [stats,          setStats]          = useState({ assigned: { value: 0, change: '' }, pendingParts: { value: 0, text: '' }, completedToday: { value: 0, percentage: '' } });
  const [completedTasks, setCompletedTasks] = useState([]);
  const [alerts,         setAlerts]         = useState([]);
  const [upcomingTasks,  setUpcomingTasks]  = useState([]);
  const [performance,    setPerformance]    = useState({ rating: 0, text: '' });
  const [loading,        setLoading]        = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ لما الباك يجهز، احذف الـ mock وفك التعليق:
        // const response = await axios.get('http://localhost:5000/api/technician/dashboard');
        // const { statsData, receiptsData, alertsData, upcomingData, performanceData } = response.data;
        // setStats(statsData);
        // setCompletedTasks(receiptsData);
        // setAlerts(alertsData);
        // setUpcomingTasks(upcomingData);
        // setPerformance(performanceData);

        // 🔶 مؤقتاً — محاكاة تأخير السيرفر
        await new Promise((resolve) => setTimeout(resolve, 500));

        setStats(mockTechDashboardStats);
        setCompletedTasks(mockTechCompletedTasks);
        setAlerts(mockTechAlerts);
        setUpcomingTasks(mockTechUpcomingTasks);
        setPerformance(mockTechPerformance);
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل بيانات لوحة التحكم:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, completedTasks, alerts, upcomingTasks, performance, loading };
}
