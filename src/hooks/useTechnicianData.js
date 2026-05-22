// src/hooks/useTechnicianData.js
import { useState, useEffect } from 'react';
// import axios from 'axios'; // فكي التعليق عن هذا السطر عند ربط الباك إند الحقيقي

export function useTechnicianData() {
  // 1. تعريف الحالة الابتدائية لكل الكروت والبيانات
  const [stats, setStats] = useState({
    assigned: { value: 0, change: '' },
    pendingParts: { value: 0, text: '' },
    completedToday: { value: 0, percentage: '' }
  });
  const [completedTasks, setCompletedTasks] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  
  // الحالة الجديدة الخاصة بكارت الإنجاز والأداء
  const [performance, setPerformance] = useState({
    rating: 0,
    text: ''
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        /* -------------------------------------------------------------
           📌 الجزء الخاص بالربط الفعلي مع الباك إند (فكي التعليق عنه لاحقاً)
           ------------------------------------------------------------- */
        // const response = await axios.get('http://localhost:5000/api/technician/dashboard');
        // const { statsData, receiptsData, alertsData, upcomingData, performanceData } = response.data;
        // setStats(statsData);
        // setCompletedTasks(receiptsData);
        // setAlerts(alertsData);
        // setUpcomingTasks(upcomingData);
        // setPerformance(performanceData);

        /* -------------------------------------------------------------
           💡 جزء الـ Mock Data الحالي (شغال ومطابق للتصميم 100%)
           ------------------------------------------------------------- */
        // محاكاة تأخير السيرفر بنصف ثانية لجعل الـ Spinner يظهر بشكل طبيعي
        await new Promise((resolve) => setTimeout(resolve, 500));

        // أ) بيانات الكروت العلوية الثلاثة والنصوص الديناميكية بالأسفل
        setStats({
          assigned: { value: 12, change: '+2 منذ الأمس' },
          pendingParts: { value: 3, text: '● تتطلب إجراء سريع' },
          completedToday: { value: 5, percentage: '✓ 41% من الهدف اليومي' }
        });

        // ب) بيانات جدول الإيصالات المكتملة بالتنسيق الجديد (يوم ووقت منفصلين)
        const mockReceipts = [
          { id: 1, receiptId: '#1-774', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:27 Pm' }, status: 'جاهز للتسليم' },
          { id: 2, receiptId: '#1-775', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'جاهز للتسليم' },
          { id: 3, receiptId: '#1-776', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'جاهز للتسليم' },
          { id: 4, receiptId: '#1-777', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:27 Pm' }, status: 'تم التسليم' },
          { id: 5, receiptId: '#1-778', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم' },
          { id: 6, receiptId: '#1-779', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'تم التسليم' },
          { id: 7, receiptId: '#1-780', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'تم التسليم' },
          { id: 8, receiptId: '#1-781', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم' },
          { id: 9, receiptId: '#1-782', device: 'iPhone 14 Pro', fault: 'شاشة', dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم' },
          { id: 10, receiptId: '#1-783', device: 'iPhone 14 Pro', fault: 'سماعة', dateInfo: { day: '20-11-2023', time: '1:00 Pm' }, status: 'تم التسليم' },
          { id: 11, receiptId: '#1-784', device: 'Samsung S23', fault: 'باغة', dateInfo: { day: '20-11-2023', time: '2:15 Pm' }, status: 'جاهز للتسليم' },
          { id: 12, receiptId: '#1-785', device: 'Pixel 7 Pro', fault: 'سوكت شحن', dateInfo: { day: '20-11-2023', time: '3:30 Pm' }, status: 'تم التسليم' },
        ];
        setCompletedTasks(mockReceipts);

        // ج) بيانات كارت التنبيهات الهامة
        setAlerts([
          { id: 1, title: 'تأخر في التوريد', message: 'شاشة iPhone 15 Pro Max غير متوفرة في المخزن حالياً.', type: 'warning' },
          { id: 2, title: 'من خدمة العملاء', message: 'العميل صاحب الإيصال رقم #1-774 استعجل الاستلام اليوم.', type: 'info' }
        ]);

        // د) بيانات كارت المهام القادمة
        setUpcomingTasks([
          { id: 1, device: 'Xiaomi note 10 lite', fault: 'Cpu Reballing' },
          { id: 2, device: 'Samsung A30', fault: 'سوكت وشاشة' }
        ]);

        // هـ) بيانات كارت الأداء والإنجاز التفاعلي
        setPerformance({
          rating: 92,
          text: 'لقد حققت 92% من تقييم العملاء الإيجابي هذا الشهر.'
        });

      } catch (error) {
        console.error("حدث خطأ أثناء تحميل بيانات لوحة التحكم:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // إرجاع كافة الـ States بما فيها كائن الـ performance الجديد
  return { stats, completedTasks, alerts, upcomingTasks, performance, loading };
}