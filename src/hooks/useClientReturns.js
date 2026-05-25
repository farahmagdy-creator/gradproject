import { useState, useMemo } from "react";

const MOCK_RETURNS = [
  {
    id: 1, type: "customer", returnId: "CRET-1002", returnDate: "19/3/2026",
    itemName: "شاشة ايفون 14pro oled", partNumber: "PRT-8010",
    invoiceNumber: "SRCE-2023-80", salePrice: "12000", saleDate: "19/3/2026",
    returnSource: "حازم علي", reason: "الشاشة بترعش اول ما تعلي الإضاءة عليها", status: "send_back",
  },
  {
    id: 2, type: "customer", returnId: "CRET-1003", returnDate: "20/3/2026",
    itemName: "بطارية سامسونج S23", partNumber: "PRT-4521",
    invoiceNumber: "SRCE-2023-91", salePrice: "3500", saleDate: "15/3/2026",
    returnSource: "أحمد سالم", reason: "البطارية مش بتشحن فوق 80%", status: "in_progress",
  },
  {
    id: 3, type: "tech", returnId: "TRET-0041", returnDate: "18/3/2026",
    itemName: "كاميرا آيفون 13 برو", partNumber: "PRT-7733",
    invoiceNumber: "SRCE-2023-65", salePrice: "8200", saleDate: "10/3/2026",
    returnSource: "", reason: "الكاميرا الأمامية مش شغالة خالص", status: "before_return",
  },
  {
    id: 4, type: "tech", returnId: "TRET-0042", returnDate: "17/3/2026",
    itemName: "سماعة آيربودز برو", partNumber: "PRT-1190",
    invoiceNumber: "SRCE-2023-44", salePrice: "5600", saleDate: "05/3/2026",
    returnSource: "", reason: "الصوت بيتقطع في الأذن اليسار", status: "rejected",
  },
  {
    id: 5, type: "customer", returnId: "CRET-1004", returnDate: "21/3/2026",
    itemName: "شاشة سامسونج A54", partNumber: "PRT-3312",
    invoiceNumber: "SRCE-2023-99", salePrice: "4100", saleDate: "20/3/2026",
    returnSource: "منى خالد", reason: "فيه خط أبيض في نص الشاشة", status: "send_back",
  },
];

const parseDate = (str) => {
  if (!str) return null;
  const [d, m, y] = str.split("/");
  return new Date(`${y}-${m}-${d}`);
};

export default function useClientReturns() {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // 1. تصفية أولية لجلب مرتجعات العملاء فقط (البيانات الأساسية القادمة من الباك)
  const customerReturnsOnly = useMemo(() => {
    return MOCK_RETURNS.filter((r) => r.type === "customer");
  }, []);

  // 2. حساب الإحصائيات الإجمالية للشهر من البيانات الكلية لتظل ثابتة ولا تتأثر بالبحث
  const totalStats = useMemo(() => {
    const price = customerReturnsOnly.reduce((sum, r) => sum + (parseFloat(r.salePrice) || 0), 0);
    return {
      totalPrice: price,
      totalCount: customerReturnsOnly.length
    };
  }, [customerReturnsOnly]);

  // 3. تطبيق فلاتر الفرونت-إند (البحث، التاريخ، وحالة الـ status المحددة)
  const filtered = useMemo(() => {
    return customerReturnsOnly.filter((r) => {
      // فلتر البحث بالرقم والقطعة
      const matchSearch =
        !search ||
        r.returnId.toLowerCase().includes(search.toLowerCase()) ||
        r.partNumber.toLowerCase().includes(search.toLowerCase());

      // إصلاح فلتر الحالة: يتأكد أولاً لو القيمة المبعوثة هي "customer_type" (عشان يمررها لأننا بالفعل مسجلين عملاء) 
      // أو لو القيمة مطابقة للـ status الحقيقي للقطعة (مثل: send_back أو in_progress)
      const matchStatus = 
        !selectedStatus || 
        selectedStatus === "customer_type" || 
        r.status === selectedStatus;

      // فلتر التاريخ
      const rDate = parseDate(r.returnDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      const matchFrom = !from || (rDate && rDate >= from);
      const matchTo = !to || (rDate && rDate <= to);

      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [customerReturnsOnly, search, fromDate, toDate, selectedStatus]);

  return {
    search, setSearch,
    fromDate, setFromDate,
    toDate, setToDate,
    selectedStatus, setSelectedStatus,
    filtered,
    totalPrice: totalStats.totalPrice,
    totalCount: totalStats.totalCount,
  };
}


