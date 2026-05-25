import { useState, useEffect } from "react";

export const useCenterReturns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [returnsList, setReturnsList] = useState([]);
  const [stats, setStats] = useState({
    acceptedCount: 0,
    rejectedCount: 0,
    acceptedValue: 0,
    rejectedValue: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const mockData = [
      {
        id: 1,
        cardType: "return_card",
        type: "tech",
        status: "send_back",
        returnId: "TRET-1002",
        returnDate: "2026-05-22",
        itemName: "شاشة ايفون 14pro oled",
        partNumber: "PRT-8010",
        invoiceNumber: "SRCE-2023-80",
        salePrice: "12000",
        saleDate: "2026-05-19",
        reason: "سبب الإرجاع : الشاشة بترعش اول ما تعلي الإضاءة علي اخرها",
      },
      {
        id: 2,
        cardType: "delivery_card",
        type: "tech",
        status: "in_progress",
        returnId: "TRET-1005",
        returnDate: "2026-05-19",
        itemName: "شاشة ايفون 14pro oled",
        purchaseDate: "2026-05-15",
        purchasePrice: "12000",
        locationName: "السيد البنا",
        orderSource: "محمد عادل",
        returnDateTech: "2026-05-24",
        deliveryWorker: "عبدالله",
        reason: "سبب الإرجاع : الشاشة بترعش اول ما تعلي الإضاءة علي اخرها بدلها بواحدة ثانية",
      },
      {
        id: 3,
        cardType: "return_card",
        type: "customer",
        status: "before_return",
        returnId: "CRET-4001",
        returnDate: "2026-05-20",
        itemName: "باك سكرين جالاكسي S23",
        partNumber: "PRT-3020",
        invoiceNumber: "INV-9920",
        salePrice: "1500",
        saleDate: "2026-05-10",
        returnSource: "عميل خارجي",
        reason: "سبب الإرجاع: وجود خدش بسيط في ظهر القطعة عند الاستلام",
      },
      {
        id: 4,
        cardType: "return_card",
        type: "tech",
        status: "rejected",
        returnId: "TRET-2009",
        returnDate: "2026-05-18",
        itemName: "فلاتة شحن إيربودز برو",
        partNumber: "PRT-5541",
        invoiceNumber: "SRCE-2026-11",
        salePrice: "850",
        saleDate: "2026-05-12",
        reason: "رفض المورد: بسبب سوء الاستخدام وقطع في الفلاتة من الفني",
      }
    ];

    const mockStats = {
      acceptedCount: 225,
      rejectedCount: 140,
      acceptedValue: 12200,
      rejectedValue: 8500
    };

    setReturnsList(mockData);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const filteredReturns = (returnsList || []).filter((item) => {
    if (!item) return false;

    const matchesSearch =
      !searchQuery ||
      (item.returnId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.itemName || "").toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter) {
      if (statusFilter === "customer_type") {
        matchesStatus = item.type === "customer";
      } else if (statusFilter === "tech_type") {
        matchesStatus = item.type === "tech";
      } else {
        matchesStatus = item.status === statusFilter;
      }
    }

    let matchesDate = true;
    if (fromDate && item.returnDate) {
      matchesDate = item.returnDate >= fromDate;
    }
    if (matchesDate && toDate && item.returnDate) {
      matchesDate = item.returnDate <= toDate;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return {
    searchQuery, setSearchQuery,
    fromDate, setFromDate,
    toDate, setToDate,
    statusFilter, setStatusFilter,
    stats, filteredReturns, loading
  };
};