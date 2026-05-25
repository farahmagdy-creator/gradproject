import { useState } from 'react';

export function useReceiptsData(searchTerm, activeFilter) {
  const [receipts] = useState([
    { id: 1,  receiptId: '#1-774', customer: 'محمد أحمد',   phone: '+20 1012345678',    device: 'Iphone 15 Pro Max',  fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 1 يوم',    status: 'قيد الإصلاح',    tag: 'إتصال أولاً' },
    { id: 2,  receiptId: '#1-775', customer: 'ليلى حسن',    phone: '+20 11 9876 5432',  device: 'Xiaomi 12T Pro',     fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 18 ساعة',  status: 'قيد الإصلاح',    tag: 'إتصال أولاً' },
    { id: 3,  receiptId: '#1-776', customer: 'ياسين فوزي',  phone: '+20 15 5555 1234',  device: 'Ipad Air 5',         fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 7 يوم',    status: 'قيد الإصلاح',    tag: 'عاجل'        },
    { id: 4,  receiptId: '#1-777', customer: 'خالد كريم',   phone: '+20 12 3333 4444',  device: 'Samsung S23 Ultra',  fault: 'باغة',    technician: 'غير معين', deadline: 'بعد 3 أيام',   status: 'في الانتظار',    tag: 'عاجل'        },
    { id: 5,  receiptId: '#1-778', customer: 'أحمد محمود',  phone: '+20 10 2222 5555',  device: 'Iphone 14',          fault: 'بطارية',  technician: 'غير معين', deadline: 'بعد 5 ساعات',  status: 'قيد الإصلاح',    tag: 'إتصال أولاً' },
    { id: 6,  receiptId: '#1-779', customer: 'منى علي',     phone: '+20 11 4444 6666',  device: 'Oppo Reno 10',       fault: 'سوفتوير', technician: 'غير معين', deadline: 'بعد 2 يوم',    status: 'جاهز للتسليم',   tag: 'إتصال أولاً' },
    { id: 7,  receiptId: '#1-780', customer: 'سارة فريد',   phone: '+20 15 7777 8888',  device: 'MacBook Air',        fault: 'كيبورد',  technician: 'غير معين', deadline: 'بعد 4 أيام',   status: 'في الانتظار',    tag: 'عاجل'        },
    { id: 8,  receiptId: '#1-781', customer: 'كريم شريف',   phone: '+20 12 8888 9999',  device: 'Realme 11 Pro',      fault: 'شاشة',    technician: 'غير معين', deadline: 'بعد 1 يوم',    status: 'قيد الإصلاح',    tag: 'إتصال أولاً' },
    { id: 9,  receiptId: '#1-782', customer: 'حسين عمر',    phone: '+20 10 9999 0000',  device: 'Huawei P60',         fault: 'كاميرا',  technician: 'غير معين', deadline: 'بعد 6 أيام',   status: 'جاهز للتسليم',   tag: 'إتصال أولاً' },
    { id: 10, receiptId: '#1-783', customer: 'رنا يوسف',    phone: '+20 11 1111 2222',  device: 'Iphone 13',          fault: 'باغة',    technician: 'غير معين', deadline: 'بعد 12 ساعة',  status: 'قيد الإصلاح',    tag: 'عاجل'        },
    { id: 11, receiptId: '#1-784', customer: 'مينا سمير',   phone: '+20 15 2222 3333',  device: 'Pixel 7 Pro',        fault: 'شحن',     technician: 'غير معين', deadline: 'بعد 3 ساعات',  status: 'في الانتظار',    tag: 'إتصال أولاً' },
    { id: 12, receiptId: '#1-785', customer: 'هدى سلطان',   phone: '+20 12 4444 5555',  device: 'Galaxy Buds 2',      fault: 'سماعة',   technician: 'غير معين', deadline: 'بعد 1 يوم',    status: 'جاهز للتسليم',   tag: 'إتصال أولاً' },
  ]);

  const filteredReceipts = receipts.filter((receipt) => {
    const searchString = searchTerm ? String(searchTerm).toLowerCase().trim() : '';
    const matchesSearch =
      receipt.receiptId.toLowerCase().includes(searchString) ||
      receipt.phone.includes(searchString) ||
      receipt.customer.toLowerCase().includes(searchString);

    if (!matchesSearch) return false;
    if (activeFilter === 'الكل') return true;
    if (activeFilter === 'عاجل') return receipt.tag === 'عاجل';
    return receipt.status === activeFilter;
  });

  return { filteredReceipts };
}