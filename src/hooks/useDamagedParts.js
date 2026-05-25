import { useState, useEffect } from 'react';

export const useDamagedParts = () => {
  const [parts, setParts] = useState([]);
  
  const [stats, setStats] = useState({
    totalCount: 0,
    totalCost: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('2023-10-01');
  const [toDate, setToDate] = useState('2023-10-31');

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        setLoading(true);

        const responseMock = {
          success: true,
          stats: {
            totalCount: 225,        
            totalCost: 12200       
          },
          data: [
            {
              id: 'DAP-1002',
              date: '22/3/2026',
              partName: 'شاشة ايفون 14pro oled',
              partNo: 'PRT-8010',
              buyPrice: 11300,
              sellPrice: 12400,
              recorder: 'حازم علي',
              damageDate: '22/3/2026',
              reason: 'اتكسرت من حازم و هو بيرفع التاتش بعد ما اتكسر من بلال',
            },
            {
              id: 'DAP-1003',
              date: '24/3/2026',
              partName: 'بطارية ايفون 13 دبل',
              partNo: 'PRT-9055',
              buyPrice: 900,
              sellPrice: 1500,
              recorder: 'أحمد السعيد',
              damageDate: '23/3/2026',
              reason: 'انتفخت أثناء الفحص الحراري للمجفف',
            }
          ]
        };

        setParts(responseMock.data);
        setStats(responseMock.stats); 
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setLoading(false);
      }
    };

    fetchDataFromBackend();
  }, []);

  const filteredParts = parts.filter(part => {
    const term = searchTerm.toLowerCase();
    return (
      part.id.toLowerCase().includes(term) || 
      part.partNo.toLowerCase().includes(term) ||
      part.partName.toLowerCase().includes(term)
    );
  });

  const handleApplyFilter = () => {
    console.log("سيتم إرسال التواريخ للباك إند ليعيد حساب الإحصائيات والقطع بناءً عليها");
  };

  return {
    parts: filteredParts,
    stats,
    searchTerm,
    setSearchTerm,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    handleApplyFilter,
    loading
  };
};