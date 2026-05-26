import { useMemo } from 'react';
import { mockTechReceipts } from '../data/mockData';

/**
 * useReceiptsData
 * فلترة إيصالات الفني بالبحث والحالة.
 *
 * @param {string} searchTerm   - نص البحث (اسم العميل / رقم الهاتف / رقم الإيصال)
 * @param {string} activeFilter - الحالة المختارة أو 'الكل'
 */
export function useReceiptsData(searchTerm, activeFilter) {
  const filteredReceipts = useMemo(() => {
    const query = searchTerm ? String(searchTerm).toLowerCase().trim() : '';

    return mockTechReceipts.filter((receipt) => {
      const matchesSearch =
        !query ||
        receipt.receiptId.toLowerCase().includes(query) ||
        receipt.phone.includes(query) ||
        receipt.customer.toLowerCase().includes(query);

      if (!matchesSearch) return false;
      if (activeFilter === 'الكل') return true;
      if (activeFilter === 'عاجل') return receipt.tag === 'عاجل';
      return receipt.status === activeFilter;
    });
  }, [searchTerm, activeFilter]);

  return { filteredReceipts };
}
