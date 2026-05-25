import React, { useState } from 'react';
import StatusIcon from './shared/StatusIcon'; 
import Tags from './shared/Tags'; 

export default function ReceiptsTable({ receipts, onViewDetails }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalItems = receipts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = receipts.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const thStyle = {
    backgroundColor: '#F2F4F6',
    color: '#434652',
    fontSize: '0.9rem',        // تصغير الحجم عشان يدي مظهر احترافي
    fontWeight: '500',         // خط أرفع (Medium) بدل الـ Bold التقيل
    letterSpacing: '0.3px',
    paddingTop: '15px',
    paddingBottom: '15px',
    border: 'none'
  };

  return (
    <div className="card border-0 shadow-sm mb-4 rounded-5 bg-white overflow-hidden">
      <div className="table-responsive">
        <table className="table table-borderless align-middle text-nowrap m-0 text-center" style={{ tableLayout: 'fixed', width: '100%' }}>
          <thead>
            <tr style={{ border: 'none' }}>
              <th style={{ ...thStyle, width: '11%' }}>رقم الإيصال</th>
              <th style={{ ...thStyle, width: '14%' }}>العميل</th>
              <th style={{ ...thStyle, width: '13%' }}>الجهاز</th>
              <th style={{ ...thStyle, width: '10%' }}>العطل</th>
              <th style={{ ...thStyle, width: '11%' }}>الفني</th>
              <th style={{ ...thStyle, width: '11%' }}>موعد التسليم</th>
              <th style={{ ...thStyle, width: '10%' }}>الحالة</th>
              <th style={{ ...thStyle, width: '11%' }}>الوسم</th>
              <th style={{ ...thStyle, width: '9%' }}>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted" style={{ border: 'none' }}>
                  لا توجد إيصالات مطابقة
                </td>
              </tr>
            ) : (
              currentItems.map((row) => (
                <tr key={row.id} style={{ border: 'none' }}>
                  <td className="fw-bold py-3" style={{ fontSize: '0.95rem' , color: '#003178', border: 'none' }}>
                    {row.receiptId}
                  </td>
                  
                  <td className="py-3" style={{ border: 'none' }}>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>{row.customer}</div>
                    <div className="text-muted small mt-1" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{row.phone}</div>
                  </td>
                  
                  <td className="fw-bold text-dark opacity-75 py-3" style={{ fontSize: '0.9rem', border: 'none' }}>
                    {row.device}
                  </td>
                  
                  {/* وصف العطل - تم إزالة البوردر والخلفية تماماً وبقت كلمة عادية بلون بني مميز ونظيف */}
                  <td className="fw-semibold py-3" style={{ fontSize: '0.9rem', color: '#602100', border: 'none' }}>
                    {row.fault}
                  </td>
                  
                  <td className="text-muted py-3" style={{ fontSize: '0.85rem' ,color :'#A8A29E', border: 'none' }}>
                    <span className="d-inline-flex align-items-center gap-2 opacity-50 fw-semibold">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      {row.technician}
                    </span>
                  </td>
                  
                  <td className="fw-bold py-3" style={{ color: '#602100', fontSize: '0.85rem', border: 'none' }}>
                    {row.deadline}
                  </td>
                  
                  <td className="py-3" style={{ border: 'none' }}>
                    <StatusIcon status={row.status} />
                  </td>
                  
                  <td className="py-3" style={{ border: 'none' }}>
                    <Tags name={row.tag} />
                  </td>
                  
                  <td className="py-3" style={{ border: 'none' }}>
                    <button 
                      onClick={() => onViewDetails(row.id)} 
                      className="btn btn-link text-primary fw-bold text-decoration-none small p-0 d-inline-flex align-items-center gap-1 border-0" 
                      style={{ fontSize: '0.85rem' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      عرض
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center px-4 py-3 small text-muted" style={{ backgroundColor: '#F2F4F6', border: 'none' }}>
        <span className="fw-semibold opacity-75">
          عرض {currentItems.length} من أصل {totalItems} إيصال
        </span>
        
        <div className="btn-group gap-2">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="btn btn-white border shadow-sm p-1 rounded-2 bg-white d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="btn btn-white border shadow-sm p-1 rounded-2 bg-white d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  );
}