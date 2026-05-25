import React, { useState } from 'react';
import SearchBar from '../../components/shared/SearchBar'; 
import FilterButtons from '../../components/shared/FilterTabs';
import ReceiptsTable from '../../components/ReceiptsTable';
import { useReceiptsData } from '../../hooks/useReceiptsData';

export default function AssignedReceipts({ onViewDetails }) {
  const [searchTerm, setSearchTerm]     = useState('');
  const [activeFilter, setActiveFilter] = useState('الكل');

  const { filteredReceipts } = useReceiptsData(searchTerm, activeFilter);

  const urgentReceipt = filteredReceipts.find(
    (receipt) => receipt.status === 'عاجل' || receipt.tag === 'عاجل'
  );

  return (
    <div className="bg-light min-vh-100 p-4" style={{ direction: 'rtl' }}>

      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontSize: '1.8rem', color: '#191C1E' }}>
          إيصالاتي الموكلة
        </h3>
        <p className="text-muted small m-0">إدارة ومتابعة طلبات الصيانة النشطة والجديدة</p>
      </div>

      <div className="card border-0 shadow-sm p-4 mb-4 rounded-4" style={{ backgroundColor: '#F2F4F6' }}>
        <div className="row g-3 align-items-center justify-content-between">
          <div className="col-12 col-lg-4 order-lg-1 order-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="ابحث برقم الموبايل أو رقم الإيصال..."
              width="100%"
            />
          </div>
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </div>

      <ReceiptsTable receipts={filteredReceipts} onViewDetails={onViewDetails} />

      <div className="row g-4 mt-4">

        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-3 h-100 rounded-4 bg-white"
            style={{ border: 'none', borderTop: '4px solid #602100' }}>
            {urgentReceipt ? (
              <div className="d-flex flex-column h-100">
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <span className="badge text-white px-3 py-1 rounded-3 fw-bold"
                    style={{ fontSize: '0.8rem', backgroundColor: '#BA1A1A' }}>
                    ! عاجل
                  </span>
                  <span className="text-muted small fw-bold" style={{ fontSize: '0.8rem' }}>
                    {urgentReceipt.receiptId}
                  </span>
                </div>
                <div className="mt-auto w-100 d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="fw-bold text-dark mb-1" style={{ fontSize: '1.4rem' }}>
                      {urgentReceipt.device}
                    </h4>
                    <p className="text-muted small m-0 fw-semibold" style={{ fontSize: '0.85rem' }}>
                      {urgentReceipt.fault}
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-end">
                    <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: '38px', height: '38px', backgroundColor: '#E1E2EC', color: '#003178' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div>
                      <span className="fw-bold d-block text-dark small" style={{ fontSize: '0.85rem' }}>
                        {urgentReceipt.customer}
                      </span>
                      <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>
                        الموعد: {urgentReceipt.deadline}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center h-100 py-4 text-center">
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                  style={{ width: '50px', height: '50px', backgroundColor: '#F0FDF4', color: '#16A34A' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h5 className="fw-bold text-dark mb-1" style={{ fontSize: '1.1rem' }}>الوضع مستقر</h5>
                <p className="text-muted small m-0">لا توجد إيصالات عاجلة تتطلب إجراءً فورياً حالياً.</p>
              </div>
            )}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card text-white p-4 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden border-0"
            style={{ background: '#0043A4', borderRadius: '16px' }}>
            <div className="position-absolute bottom-0 start-0 m-2 opacity-25">
              <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                style={{ transform: 'translate(-10px, 15px)' }}>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <circle cx="19" cy="11" r="2"></circle>
                <path d="M19 8v1"></path><path d="M19 13v1"></path>
                <path d="M22 11h-1"></path><path d="M17 11h-1"></path>
              </svg>
            </div>
            <div className="text-end">
              <span className="text-white-50 small fw-bold d-block mb-1" style={{ fontSize: '0.85rem' }}>
                المهام النشطة
              </span>
              <h1 className="fw-bold m-0" style={{ fontSize: '3.5rem', fontFamily: 'sans-serif' }}>
                {filteredReceipts.length}
              </h1>
            </div>
            <div className="text-end mt-4">
              <p className="text-white-50 m-0" style={{ fontSize: '0.75rem' }}>
                محدث تلقائياً بناءً على التصفية
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}