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

// ─── بيانات الإيصالات ──────────────────────────────────────────────────────────
// Schema موحد: id, customerName, phone, device, issue, tech,
//              receiveDate, deliveryDue, status, tags, deliveredDate, urgent

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
    issue: 'كاميرا',
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
    customerName: 'أحمد خالد',
    phone: '+20 1122334455',
    device: 'Huawei P50',
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

// ─── داشبورد: آخر الإيصالات (مشتق من mockInvoices) ───────────────────────────
export const mockRecentReceipts = mockInvoices.slice(0, 5).map(inv => ({
  ...inv,
  due: inv.deliveryDue,
  tag: inv.tags[0] ?? null,
}));

// ─── داشبورد: تسليمات اليوم (الجاهزة والقيد الإصلاح) ─────────────────────────
export const mockTodayDeliveries = mockInvoices
  .filter(inv => inv.status === STATUS.READY || inv.status === STATUS.REPAIRING)
  .map(inv => ({
    ...inv,
    due: inv.deliveryDue,
    tag: inv.tags[0] ?? null,
  }));

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
