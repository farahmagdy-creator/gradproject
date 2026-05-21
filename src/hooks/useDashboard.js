import { useMemo } from "react";
import { mockRecentReceipts, mockTodayDeliveries, dashboardStats } from "../data/mockData";

/**
 * useDashboard
 * يجمع كل بيانات صفحة الداشبورد في مكان واحد.
 * لما يكون في API حقيقي، بس غيّر الـ mock imports بـ useQuery/fetch
 * من غير ما تلمس الـ Dashboard component.
 */
export const useDashboard = () => {
  // useMemo عشان الـ reference متتغيرش في كل render
  const stats           = useMemo(() => dashboardStats,       []);
  const recentReceipts  = useMemo(() => mockRecentReceipts,   []);
  const todayDeliveries = useMemo(() => mockTodayDeliveries,  []);

  return { stats, recentReceipts, todayDeliveries };
};
