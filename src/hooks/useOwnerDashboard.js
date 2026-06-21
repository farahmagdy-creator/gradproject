import { useMemo } from "react";
import { ownerDashboardStats, ownerRecentUpdates, workshopPerformance } from "../data/mockData";

/**
 * useOwnerDashboard
 * يجمع بيانات صفحة "لوحة التحكم" بتاعة المالك في مكان واحد.
 * لما يكون في API حقيقي، بس غيّر الـ mock imports بـ useQuery/fetch
 * من غير ما تلمس صفحة OwnerDashboard.
 */
export const useOwnerDashboard = () => {
  const stats       = useMemo(() => ownerDashboardStats, []);
  const recentUpdates = useMemo(() => ownerRecentUpdates, []);
  const performance  = useMemo(() => workshopPerformance, []);

  return { stats, recentUpdates, performance };
};
