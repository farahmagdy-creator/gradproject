import { useState } from 'react';
import SearchBar    from '../../components/shared/SearchBar';
import FilterTabs   from '../../components/shared/FilterTabs';
import ReceiptTable  from '../../components/shared/ReceiptTable';
import { useReceiptsData } from '../../hooks/useReceiptsData';

const TECH_RECEIPTS_COLUMNS = [
  { key: 'id',         label: 'رقم الإيصال',   width: '100px' },
  { key: 'customer',   label: 'العميل',          width: '160px' },
  { key: 'device',     label: 'الجهاز',          width: '140px' },
  { key: 'issue',      label: 'العطل',           width: '80px'  },
  { key: 'deliveryDue',label: 'موعد التسليم',    width: '100px' },
  { key: 'status',     label: 'الحالة',          width: '110px' },
  { key: 'tags',       label: 'الوسم',           width: '90px'  },
];

export default function AssignedReceipts({ onViewDetails }) {
  const [searchTerm, setSearchTerm]     = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');

  const { filteredReceipts } = useReceiptsData(searchTerm, activeFilter);

  // تحويل بيانات الفني لصيغة ReceiptTable الموحدة
  const rows = filteredReceipts.map((r) => ({
    id:          r.receiptId,
    customerName: r.customer,
    phone:       r.phone,
    device:      r.device,
    issue:       r.fault,
    deliveryDue: r.deadline,
    status:      r.status,
    tags:        r.tag ? [r.tag] : [],
  }));

  const urgentReceipt = filteredReceipts.find(
    (r) => r.tag === 'عاجل' || r.status === 'عاجل'
  );

  return (
    <div style={{ direction: 'rtl', padding: '24px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>

      {/* ─── العنوان ─── */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#191C1E', marginBottom: '4px' }}>
          إيصالاتي الموكلة
        </h3>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
          إدارة ومتابعة طلبات الصيانة النشطة والجديدة
        </p>
      </div>

      {/* ─── شريط البحث والفلتر ─── */}
      <div style={{ backgroundColor: '#F2F4F6', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="ابحث برقم الموبايل أو رقم الإيصال..."
            width="300px"
          />
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </div>

      {/* ─── الجدول ─── */}
      <ReceiptTable
        rows={rows}
        columns={TECH_RECEIPTS_COLUMNS}
        onView={onViewDetails}
        countLabel={`${rows.length} إيصال`}
        emptyMessage="لا توجد إيصالات مطابقة"
      />

      {/* ─── بطاقات المعلومات ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>

        {/* بطاقة العاجل */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', border: 'none', borderTop: '4px solid #602100', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {urgentReceipt ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ backgroundColor: '#BA1A1A', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>
                  ! عاجل
                </span>
                <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'bold' }}>
                  {urgentReceipt.receiptId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#191C1E', margin: '0 0 4px' }}>
                    {urgentReceipt.device}
                  </h4>
                  <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>{urgentReceipt.fault}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'right' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#E1E2EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003178', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#191C1E', display: 'block' }}>
                      {urgentReceipt.customer}
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '11px' }}>
                      الموعد: {urgentReceipt.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h5 style={{ fontWeight: 'bold', color: '#191C1E', fontSize: '1.1rem', margin: '0 0 4px' }}>الوضع مستقر</h5>
              <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>لا توجد إيصالات عاجلة تتطلب إجراءً فورياً.</p>
            </div>
          )}
        </div>

        {/* بطاقة عدد المهام */}
        <div style={{ background: '#0043A4', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.15 }}>
            <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" style={{ transform: 'translate(-10px, 15px)' }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <circle cx="19" cy="11" r="2"/><path d="M19 8v1"/><path d="M19 13v1"/>
              <path d="M22 11h-1"/><path d="M17 11h-1"/>
            </svg>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>
              المهام النشطة
            </span>
            <h1 style={{ color: '#fff', fontSize: '3.5rem', fontWeight: 'bold', margin: 0 }}>
              {rows.length}
            </h1>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', margin: 0, textAlign: 'right' }}>
            محدث تلقائياً بناءً على التصفية
          </p>
        </div>

      </div>
    </div>
  );
}
