// ─── ثوابت الحالات والوسوم ─────────────────────────────────────────────────────

export const STATUS = {
  WAITING:   'قيد الانتظار',
  REPAIRING: 'قيد الإصلاح',
  READY:     'جاهز للتسليم',
  DELIVERED: 'تم التسليم',
  REJECTED:  'مرفوض',
};

export const TAG = {
  URGENT:     'عاجل',
  CALL_FIRST: 'إتصال أولا',
};

export const statusesList = ['الكل', ...Object.values(STATUS)];

// ─── أدوار وحالات الموظفين ──────────────────────────────────────────────────────
export const EMPLOYEE_ROLE = {
  SOFTWARE_TECH: 'فني سوفتوير',
  HARDWARE_TECH: 'فني هاردوير',
  RECEPTION:     'موظفة استقبال',
  DELIVERY:      'عامل توصيل',
};

export const EMPLOYEE_STATUS = {
  ACTIVE:    'نشط',
  SUSPENDED: 'موقوف',
};

export const employeeRolesList = ['جميع الأدوار', ...Object.values(EMPLOYEE_ROLE)];

// ─── بيانات الإيصالات ──────────────────────────────────────────────────────────
export const mockInvoices = [
  {
    id: '#1-774',
    customerName: 'محمد أحمد',
    phone: '+20 1012345678',
    device: 'iPhone 14 Pro',
    issue: 'شاشة',
    tech: 'محمد عادل',
    receiveDate: '19-11-2023',
    deliveryDue: '20-11-2023',
    status: STATUS.DELIVERED,
    tags: [TAG.URGENT, TAG.CALL_FIRST],
    deliveredDate: '28-11-2023',
    urgent: true,
  },
  {
    id: '#1-775',
    customerName: 'محمود أحمد',
    phone: '+20 1012345678',
    device: 'Samsung S22',
    issue: 'بطارية',
    tech: 'علي حسن',
    receiveDate: '19-11-2023',
    deliveryDue: '21-11-2023',
    status: STATUS.WAITING,
    tags: [],
    deliveredDate: null,
    urgent: false,
  },
  {
    id: '#1-776',
    customerName: 'ياسين إبراهيم',
    phone: '+20 1234567890',
    device: 'iPad Air',
    issue: 'سوكت شحن',
    tech: 'محمد عادل',
    receiveDate: '21-11-2023',
    deliveryDue: '23-11-2023',
    status: STATUS.REPAIRING,
    tags: [TAG.URGENT],
    deliveredDate: null,
    urgent: true,
  },
  {
    id: '#1-777',
    customerName: 'سارة محمود',
    phone: '+20 1098765432',
    device: 'iPhone 13',
    issue: 'بطارية',
    tech: 'علي حسن',
    receiveDate: '22-11-2023',
    deliveryDue: '24-11-2023',
    status: STATUS.READY,
    tags: [TAG.CALL_FIRST],
    deliveredDate: null,
    urgent: false,
  },
  {
    id: '#1-778',
    customerName: 'خالد عبدالله',
    phone: '+20 1122334455',
    device: 'Huawei P40',
    issue: 'شاشة',
    tech: 'محمد عادل',
    receiveDate: '22-11-2023',
    deliveryDue: '25-11-2023',
    status: STATUS.REJECTED,
    tags: [TAG.CALL_FIRST],
    deliveredDate: '28-11-2023',
    urgent: false,
  },
  {
    id: '#1-779',
    customerName: 'منى سعيد',
    phone: '+20 1555666777',
    device: 'Samsung A53',
    issue: 'ميكروفون',
    tech: 'علي حسن',
    receiveDate: '23-11-2023',
    deliveryDue: '26-11-2023',
    status: STATUS.DELIVERED,
    tags: [TAG.URGENT, TAG.CALL_FIRST],
    deliveredDate: '28-11-2023',
    urgent: true,
  },
  {
    id: '#1-780',
    customerName: 'عمر فاروق',
    phone: '+20 1777888999',
    device: 'iPhone 12',
    issue: 'بطارية',
    tech: 'محمد عادل',
    receiveDate: '23-11-2023',
    deliveryDue: '26-11-2023',
    status: STATUS.REPAIRING,
    tags: [TAG.URGENT],
    deliveredDate: null,
    urgent: true,
  },
  {
    id: '#1-781',
    customerName: 'نورا حسام',
    phone: '+20 1000111222',
    device: 'Xiaomi 12',
    issue: 'شاشة',
    tech: 'علي حسن',
    receiveDate: '24-11-2023',
    deliveryDue: '27-11-2023',
    status: STATUS.WAITING,
    tags: [],
    deliveredDate: null,
    urgent: false,
  },
];

// ─── داشبورد: آخر الإيصالات ───────────────────────────────────────────────────
export const mockRecentReceipts = mockInvoices.slice(0, 5).map(inv => ({
  ...inv,
  due: inv.deliveryDue,
  tag: inv.tags[0] ?? null,
}));

// ─── داشبورد: تسليمات اليوم ───────────────────────────────────────────────────
export const mockTodayDeliveries = mockInvoices
  .filter(inv => inv.status === STATUS.READY || inv.status === STATUS.REPAIRING)
  .map(inv => ({
    ...inv,
    due: inv.deliveryDue,
    tag: inv.tags[0] ?? null,
  }));

// ─── بطاقات إحصائيات لوحة تحكم المالك ─────────────────────────────────────────
export const ownerDashboardStats = [
  {
    label:      'إصلاحات متأخرة',
    value:      String(mockInvoices.filter(i => i.urgent && i.status !== STATUS.DELIVERED).length).padStart(2, '0'),
    badge:      'حرج',
    badgeColor: '#ba1a1a',
    badgeBg:    '#ffdad6',
    accent:     '#ba1a1a',
    accentBg:   '#ffdad6',
    sub:        'يتطلب اهتماماً فورياً',
    subColor:   '#ba1a1a',
    icon:       'alert',
  },
  {
    label:      'بانتظار الاستلام',
    value:      String(mockInvoices.filter(i => i.status === STATUS.READY).length).padStart(2, '0'),
    badge:      'جاهز',
    badgeColor: '#7a5b00',
    badgeBg:    '#fff3cd',
    accent:     '#c79100',
    accentBg:   '#fff3cd',
    sub:        'إخطار العملاء بموعدهم اليوم',
    icon:       'check',
  },
  {
    label:      'قيد التنفيذ',
    value:      String(mockInvoices.filter(i => i.status === STATUS.WAITING || i.status === STATUS.REPAIRING).length).padStart(2, '0'),
    badge:      'نشط',
    badgeColor: '#094CB2',
    badgeBg:    '#D9E2FF',
    accent:     '#094CB2',
    accentBg:   '#d9e2ff',
    sub:        'متوسط وقت الإنجاز: 2.4 يوم',
    icon:       'wrench',
  },
];

// ─── جدول آخر التحديثات (لوحة تحكم المالك) ────────────────────────────────────
export const ownerRecentUpdates = mockInvoices.map(inv => ({
  ...inv,
  due: inv.deliveryDue,
  tag: inv.tags[0] ?? null,
}));

// ─── أداء الورشة (آخر 7 أيام) ──────────────────────────────────────────────────
export const workshopPerformance = [
  { day: 'الأحد',     value: 4  },
  { day: 'السبت',     value: 6  },
  { day: 'الجمعة',    value: 11 },
  { day: 'الخميس',    value: 7  },
  { day: 'الأربعاء',  value: 9  },
  { day: 'الثلاثاء',  value: 8  },
  { day: 'الاثنين',   value: 5  },
];

// ─── بطاقات إحصائيات الداشبورد ────────────────────────────────────────────────
export const dashboardStats = [
  {
    label:    'بانتظار الاستلام',
    value:    String(mockInvoices.filter(i => i.status === STATUS.READY).length).padStart(2, '0'),
    badge:    'جاهز',
    badgeColor: '#ffffff',
    badgeBg:    '#1d4ed8',
    accent:     '#1d4ed8',
    accentBg:   '#1d4fd838',
    sub:      'من التزامات اليوم',
  },
  {
    label:    'يسلم اليوم',
    value:    String(mockTodayDeliveries.length).padStart(2, '0'),
    badge:    'هام',
    badgeColor: '#ba1a1a',
    badgeBg:    '#ffdad6',
    accent:     '#ba1a1a',
    accentBg:   '#ffdad6',
    sub:      'تأكد من انتهاء الصيانة قبل موعد التسليم اليوم',
    subColor: '#ba1a1a',
    urgent:   true,
  },
  {
    label:    'ملاحظات اليوم',
    value:    '---',
    badge:    'ملاحظات',
    badgeColor: '#6d5e00',
    badgeBg:    '#f9e37a',
    accent:     '#6d5e00',
    accentBg:   '#f9e37a',
    sub:      'أضف ملاحظاتك للتذكير',
  },
];

// ─── بيانات فواتير المشتريات ──────────────────────────────────────────────────
export const mockExternalSales = Array.from({ length: 4 }, (_, i) => ({
  id:            `SREC-${1001 + i}`,
  date:          "22/3/2026",
  partName:      "شاشة ايفون 14pro oled",
  partsCount:    15,
  totalInvoice:  11300,
  saleDate:      "22/3/2026",
  saleSource:    "حازم علي",
  customer:      "عبدالله السيد",
  customerPhone: "01228596224",
  location:      "القاهرة",
}));

export const mockPurchaseInvoice = {
  id:   "INV-2024-001",
  meta: [
    { label: "تاريخ الفاتورة", value: "١٥ أكتوبر ٢٠٢٤" },
    { label: "المورد",          value: "السيد البنا"     },
    { label: "مشتري الفاتورة", value: "حازم علي"        },
    { label: "مستلم الفاتورة", value: "محمد عادل"       },
  ],
  items: [
    { name: "شاشة iPhone 13 Pro Max",   supplier: "بيشوي", qty: 2, unitPrice: 450 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
  ],
};

export const mockSaleInvoice = {
  id:   "SREC-2024-001",
  meta: [
    { label: "تاريخ الفاتورة",  value: "١٥ أكتوبر ٢٠٢٤" },
    { label: "المشتري",          value: "عبدالله السيد"   },
    { label: "موبايل المشتري",  value: "01289683584"      },
    { label: "مصدر الفاتورة",   value: "حازم علي"         },
  ],
  items: [
    { name: "شاشة iPhone 13 Pro Max",   supplier: "بيشوي", qty: 2, unitPrice: 450 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
    { name: "بطارية Samsung S22 Ultra", supplier: "بيشوي", qty: 1, unitPrice: 120 },
  ],
};

export const mockPurchaseOrders = [
  {
    id: 'TSK-1002',
    date: '19/3/2026',
    type: 'شراء',
    status: 'تحت التسليم',
    partName: 'شاشة ايفون 14pro oled',
    purchaseDate: '22/3/2026',
    purchasePrice: 11300,
    maxPrice: 12000,
    purchaseSource: 'حازم علي',
    deliveryWorker: 'عبدالله',
    location: 'الكابتن 45',
    notes: 'جرب شحن و انت هناك علشان الشاشة ماسكة الشحن كمان',
  },
  {
    id: 'REC-1002',
    date: '22/3/2026',
    type: 'فاتورة شراء',
    status: 'منتهي',
    partName: 'شاشة ايفون 14pro oled',
    purchaseDate: '22/3/2026',
    purchasePrice: 11300,
    maxPrice: 12000,
    purchaseSource: 'حازم علي',
    recipient: 'حازم علي',
    invoiceRecipient: 'حازم علي',
    deliveryDate: '22/3/2026',
    totalInvoice: 11300,
    location: 'الموردة الكابتن 45',
    notes: null,
  },
  {
    id: 'TSK-1003',
    date: '19/3/2026',
    type: 'شراء',
    status: 'منتهي',
    partName: 'شاشة ايفون 14pro oled',
    purchaseDate: '22/3/2026',
    purchasePrice: 11300,
    maxPrice: 12000,
    purchaseSource: 'حازم علي',
    deliveryWorker: 'عبدالله',
    recipient: 'حازم علي',
    location: 'الكابتن 45',
    notes: 'جرب شحن و انت هناك علشان الشاشة ماسكة الشحن كمان',
  },
  {
    id: 'TSK-1003',
    date: '19/3/2026',
    type: 'شراء',
    status: 'منتهي',
    partName: 'شاشة ايفون 14pro oled',
    purchaseDate: '22/3/2026',
    purchasePrice: 11300,
    maxPrice: 12000,
    purchaseSource: 'حازم علي',
    deliveryWorker: 'عبدالله',
    recipient: 'حازم علي',
    location: 'الكابتن 45',
    notes: 'جرب شحن و انت هناك علشان الشاشة ماسكة الشحن كمان',
  },
];
export const mockInventoryItems = Array.from({ length: 48 }, (_, i) => {
  const parts = [
    { name: "شاشة iPhone 13 Pro Max", sku: "IP13PM-SCR-OLED", cost: 450.00, supplier: "البنا",    recipient: "محمد عادل", qty: 24, status: "لم تستخدم" },
    { name: "بطارية Samsung S22 Ultra", sku: "SAM-S22U-BAT",  cost: 120.00, supplier: "الكابتن",  recipient: "حازم علي",  qty: 3,  status: "مستعملة"  },
    { name: "آيسي شحن iPhone 11",      sku: "IC-CHG-IP11",   cost: 35.00,  supplier: "شهاب - 45", recipient: "بلال جمال", qty: 50, status: "لم تستخدم" },
    { name: "شاشة Samsung A54",        sku: "SAM-A54-SCR",   cost: 280.00, supplier: "البنا",     recipient: "محمد عادل", qty: 10, status: "مستعملة"  },
  ];
  const p = parts[i % parts.length];
  return {
    id:        i + 1,
    name:      p.name,
    sku:       p.sku,
    cost:      p.cost,
    supplier:  p.supplier,
    recipient: p.recipient,
    qty:       p.qty,
    status:    i % 3 === 1 ? "مستعملة" : "لم تستخدم",
    date:      "19-11-2023",
  };
});

// ─── Mock Data: استهلاك القطع (usePartsConsumption) ──────────────────────────
export const mockPartsConsumptionRecords = Array.from({ length: 45 }, (_, i) => {
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

export const mockPartsDamages = [
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

export const mockPartsConsumptionSummary = {
  totalParts:       225,
  totalConsumption: 12200,
  totalWaste:       240,
};

export const PARTS_CONSUMPTION_TECHNICIANS = ["الكل", "بلال جمال", "أحمد سامي", "محمد علي", "سارة خالد"];

// ─── Mock Data: إدارة المبيعات (useSalesManagement) ──────────────────────────
export const mockSalesRecords = Array.from({ length: 45 }, (_, i) => {
  const parts = [
    { partNo: "PT-8842", partName: "شاشة iPhone 13 Pro", receiptNo: "RC-2023" },
    { partNo: "PT-1123", partName: "بطارية Samsung S22",  receiptNo: "RC-2024" },
    { partNo: "PT-5567", partName: "كاميرا Xiaomi 12",    receiptNo: "RC-2025" },
    { partNo: "PT-3301", partName: "شاشة Huawei P50",     receiptNo: "RC-2026" },
  ];
  const techs    = ["أحمد محمود", "بلال جمال", "محمد علي", "سارة خالد"];
  const statuses = ["تم التسليم", "قيد الإصلاح", "جاهز للتسليم"];
  const costs    = [1200, 2500, 3200, 4500, 890];
  const part     = parts[i % parts.length];
  return {
    id:         i + 1,
    partNo:     part.partNo,
    partName:   part.partName,
    receiptNo:  part.receiptNo,
    cost:       costs[i % costs.length],
    date:       "15/10/2025",
    time:       "10:30 صباحاً",
    technician: techs[i % techs.length],
    status:     statuses[i % statuses.length],
  };
});

export const mockSalesSummary = {
  totalParts:   225,
  totalRevenue: 12200,
};

export const SALES_TECHNICIANS = ["جميع الفنيين", "أحمد محمود", "بلال جمال", "محمد علي", "سارة خالد"];

// ─── Mock Data: داشبورد الفني (useTechnicianData) ────────────────────────────
export const mockTechDashboardStats = {
  assigned:       { value: 12, change: '+2 منذ الأمس' },
  pendingParts:   { value: 3,  text:   '● تتطلب إجراء سريع' },
  completedToday: { value: 5,  percentage: '✓ 41% من الهدف اليومي' },
};

export const mockTechCompletedTasks = [
  { id: 1,  receiptId: '#1-774', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:27 Pm' }, status: 'جاهز للتسليم' },
  { id: 2,  receiptId: '#1-775', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'جاهز للتسليم' },
  { id: 3,  receiptId: '#1-776', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'جاهز للتسليم' },
  { id: 4,  receiptId: '#1-777', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:27 Pm' }, status: 'تم التسليم'   },
  { id: 5,  receiptId: '#1-778', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم'   },
  { id: 6,  receiptId: '#1-779', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'تم التسليم'   },
  { id: 7,  receiptId: '#1-780', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '5:24 Pm' }, status: 'تم التسليم'   },
  { id: 8,  receiptId: '#1-781', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم'   },
  { id: 9,  receiptId: '#1-782', device: 'iPhone 14 Pro', fault: 'شاشة',     dateInfo: { day: '19-11-2023', time: '6:24 Pm' }, status: 'تم التسليم'   },
  { id: 10, receiptId: '#1-783', device: 'iPhone 14 Pro', fault: 'سماعة',    dateInfo: { day: '20-11-2023', time: '1:00 Pm' }, status: 'تم التسليم'   },
  { id: 11, receiptId: '#1-784', device: 'Samsung S23',   fault: 'باغة',     dateInfo: { day: '20-11-2023', time: '2:15 Pm' }, status: 'جاهز للتسليم' },
  { id: 12, receiptId: '#1-785', device: 'Pixel 7 Pro',   fault: 'سوكت شحن', dateInfo: { day: '20-11-2023', time: '3:30 Pm' }, status: 'تم التسليم'   },
];

export const mockTechAlerts = [
  { id: 1, title: 'تأخر في التوريد',    message: 'شاشة iPhone 15 Pro Max غير متوفرة في المخزن حالياً.', type: 'warning' },
  { id: 2, title: 'من خدمة العملاء', message: 'العميل صاحب الإيصال رقم #1-774 استعجل الاستلام اليوم.',   type: 'info'    },
];

export const mockTechUpcomingTasks = [
  { id: 1, device: 'Xiaomi note 10 lite', fault: 'Cpu Reballing' },
  { id: 2, device: 'Samsung A30',         fault: 'سوكت وشاشة'   },
];

export const mockTechPerformance = {
  rating: 92,
  text:   'لقد حققت 92% من تقييم العملاء الإيجابي هذا الشهر.',
};

// ─── Mock Data: سجل الصيانة (useMaintenanceData) ─────────────────────────────
export const mockMaintenanceStats = {
  totalOperations: 128,
  totalRevenue:    14250,
  avgRepairDays:   1.5,
  myProfit:        7125,
  technicianName:  "شروق",
  role:            "فني صيانة",
  avatarUrl:       null,
};

export const mockMaintenanceRecords = Array.from({ length: 20 }, (_, i) => {
  const statuses   = ["تم التسليم", "جاهز للتسليم", "مرفوض", "قيد الإصلاح"];
  const devices    = ["iPhone 14 Pro", "Samsung S23", "MacBook Air", "iPad Pro"];
  const issues     = ["تغيير شاشة", "بطارية", "كاميرا خلفية", "سماعة داخلية"];
  const clientPaid = [1200, 2000, 4500, 800][i % 4];
  const cost       = [400, 800, 2500, 300][i % 4];
  const net        = clientPaid - cost;
  const techShare  = Math.round(net * 0.25);
  return {
    id:           i + 1,
    receiptNo:    `774-${100 + i}`,
    device:       devices[i % devices.length],
    issue:        issues[i % issues.length],
    clientPaid, cost, net, techShare,
    receivedDate: `2026-05-${String((i % 14) + 1).padStart(2, "0")}`,
    readyDate:    `2026-05-${String((i % 14) + 2).padStart(2, "0")}`,
    deliveryDate: i % 2 === 0 ? `2026-05-${String((i % 14) + 3).padStart(2, "0")}` : "—",
    status:       statuses[i % statuses.length],
  };
});


// ─── إيصالات الفني (الموكلة) ──────────────────────────────────────────────────
export const mockTechReceipts = [
  { id: 1,  receiptId: '#1-774', customer: 'محمد أحمد',   phone: '+20 1012345678',    device: 'Iphone 15 Pro Max',  fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 1 يوم',    status: 'قيد الإصلاح',  tag: 'إتصال أولاً' },
  { id: 2,  receiptId: '#1-775', customer: 'ليلى حسن',    phone: '+20 11 9876 5432',  device: 'Xiaomi 12T Pro',     fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 18 ساعة', status: 'قيد الإصلاح',  tag: 'إتصال أولاً' },
  { id: 3,  receiptId: '#1-776', customer: 'ياسين فوزي',  phone: '+20 15 5555 1234',  device: 'Ipad Air 5',         fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 7 يوم',   status: 'قيد الإصلاح',  tag: 'عاجل'        },
  { id: 4,  receiptId: '#1-777', customer: 'خالد كريم',   phone: '+20 12 3333 4444',  device: 'Samsung S23 Ultra',  fault: 'باغة',    technician: 'غير معين', deadline: 'بعد 3 أيام',  status: 'في الانتظار',  tag: 'عاجل'        },
  { id: 5,  receiptId: '#1-778', customer: 'أحمد محمود',  phone: '+20 10 2222 5555',  device: 'Iphone 14',          fault: 'بطارية',  technician: 'غير معين', deadline: 'بعد 5 ساعات', status: 'قيد الإصلاح',  tag: 'إتصال أولاً' },
  { id: 6,  receiptId: '#1-779', customer: 'منى علي',     phone: '+20 11 4444 6666',  device: 'Oppo Reno 10',       fault: 'سوفتوير', technician: 'غير معين', deadline: 'بعد 2 يوم',   status: 'جاهز للتسليم', tag: 'إتصال أولاً' },
  { id: 7,  receiptId: '#1-780', customer: 'سارة فريد',   phone: '+20 15 7777 8888',  device: 'MacBook Air',        fault: 'كيبورد',  technician: 'غير معين', deadline: 'بعد 4 أيام',  status: 'في الانتظار',  tag: 'عاجل'        },
  { id: 8,  receiptId: '#1-781', customer: 'كريم شريف',   phone: '+20 12 8888 9999',  device: 'Realme 11 Pro',      fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 1 يوم',   status: 'قيد الإصلاح',  tag: 'إتصال أولاً' },
  { id: 9,  receiptId: '#1-782', customer: 'حسين عمر',    phone: '+20 10 9999 0000',  device: 'Huawei P60',         fault: 'كاميرا',  technician: 'غير معين', deadline: 'بعد 6 أيام',  status: 'جاهز للتسليم', tag: 'إتصال أولاً' },
  { id: 10, receiptId: '#1-783', customer: 'رنا يوسف',    phone: '+20 11 1111 2222',  device: 'Iphone 13',          fault: 'باغة',    technician: 'غير معين', deadline: 'بعد 12 ساعة', status: 'قيد الإصلاح',  tag: 'عاجل'        },
  { id: 11, receiptId: '#1-784', customer: 'مينا سمير',   phone: '+20 15 2222 3333',  device: 'Pixel 7 Pro',        fault: 'شحن',     technician: 'غير معين', deadline: 'بعد 3 ساعات', status: 'في الانتظار',  tag: 'إتصال أولاً' },
  { id: 12, receiptId: '#1-785', customer: 'هدى سلطان',   phone: '+20 12 4444 5555',  device: 'Galaxy Buds 2',      fault: 'سماعة',   technician: 'غير معين', deadline: 'بعد 1 يوم',   status: 'جاهز للتسليم', tag: 'إتصال أولاً' },
];

// ─── موظفو المالك ──────────────────────────────────────────────────────────────
export const mockEmployees = [
  { id: 1,  empId: 'EMP-001', name: 'بلال جمال',  role: EMPLOYEE_ROLE.SOFTWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 2,  empId: 'EMP-002', name: 'محمد عادل',  role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 3,  empId: 'EMP-003', name: 'حازم علي',   role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 4,  empId: 'EMP-004', name: 'مينا مسعد',  role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.SUSPENDED },
  { id: 5,  empId: 'EMP-005', name: 'الاء احمد',  role: EMPLOYEE_ROLE.RECEPTION,     email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 6,  empId: 'EMP-001', name: 'بلال جمال',  role: EMPLOYEE_ROLE.SOFTWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 7,  empId: 'EMP-002', name: 'محمد عادل',  role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 8,  empId: 'EMP-003', name: 'حازم علي',   role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
  { id: 9,  empId: 'EMP-004', name: 'مينا مسعد',  role: EMPLOYEE_ROLE.HARDWARE_TECH, email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.SUSPENDED },
  { id: 10, empId: 'EMP-005', name: 'الاء احمد',  role: EMPLOYEE_ROLE.RECEPTION,     email: 'thisisanemail@gmail.com', status: EMPLOYEE_STATUS.ACTIVE    },
];

export const mockEmployeesSummary = {
  deliveryCount: mockEmployees.filter(e => e.role === EMPLOYEE_ROLE.DELIVERY).length,
  techCount:     mockEmployees.filter(e => e.role === EMPLOYEE_ROLE.HARDWARE_TECH || e.role === EMPLOYEE_ROLE.SOFTWARE_TECH).length,
  activeAccounts: mockEmployees.length,
};

// إضافة موظف جديد لمصدر البيانات الوهمي + تحديث ملخص الإحصائيات
export function addMockEmployee(employee) {
  const nextEmpId = `EMP-${String(mockEmployees.length + 1).padStart(3, "0")}`;
  const newEmployee = {
    id: mockEmployees.length + 1,
    empId: nextEmpId,
    status: EMPLOYEE_STATUS.ACTIVE,
    ...employee,
  };

  mockEmployees.push(newEmployee);

  mockEmployeesSummary.activeAccounts = mockEmployees.length;
  mockEmployeesSummary.techCount = mockEmployees.filter(
    e => e.role === EMPLOYEE_ROLE.HARDWARE_TECH || e.role === EMPLOYEE_ROLE.SOFTWARE_TECH
  ).length;
  mockEmployeesSummary.deliveryCount = mockEmployees.filter(e => e.role === EMPLOYEE_ROLE.DELIVERY).length;

  return newEmployee;
}
