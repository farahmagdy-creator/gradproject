// src/components/CompletedTasksTable.js
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import StatusIcon from './StatusIcon'; 

export default function CompletedTasksTable({ tasks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(tasks.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tasks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card border-0 shadow-sm p-4 h-auto rounded-4 bg-white overflow-hidden">
      <h5 className="fw-bold mb-4" style={{ color: '#1E3A8A' }}>المهام المكتملة لليوم</h5>
      
      <div className="table-responsive">
        <table className="table table-borderless align-middle m-0">
          <thead>
            <tr className="border-bottom small text-center">
              <th className="pb-3" style={{ color: '#94A3B8' }}>رقم الإيصال</th>
              <th className="pb-3" style={{ color: '#94A3B8' }}>الجهاز</th>
              <th className="pb-3" style={{ color: '#94A3B8' }}>العطل</th>
              <th className="pb-3" style={{ color: '#94A3B8' }}>التاريخ</th>
              <th className="pb-3" style={{ color: '#94A3B8' }}>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((task) => (
              <tr key={task.id} className="text-center">
                <td className="fw-bold py-3" style={{ color: '#003178' }}>{task.receiptId}</td>
                <td className="fw-bold  py-3" style={{ color: '#003178' }}>{task.device}</td>
                <td className="text-dark fw-semibold py-3">{task.fault}</td>
                
                <td className="py-3">
                  <div className="d-flex flex-column align-items-center justify-content-center lh-sm">
                    <span className="fw-semibold text-dark small">{task.dateInfo?.day}</span>
                    <span style={{ color: '#94A3B8', fontSize: '0.75rem', fontWeight: '500' }}>{task.dateInfo?.time}</span>
                  </div>
                </td>

                <td className="py-3">
                  <StatusIcon status={task.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🛠️ شريط الـ Pagination الممتد بالكامل ليلتصق بالحواف تماماً */}
      <div 
        className="d-flex justify-content-between align-items-center p-3" 
        style={{ 
          backgroundColor: '#F2F4F6', 
          margin: '24px -24px -24px -24px', // سحب الشريط بالكامل ليلغي فراغات البادينج العلوية والسفلية والجانبية
          borderTop: '1px solid #E2E8F0',    // خط علوي يفصله عن الجدول بأناقة
          borderRadius: '0 0 16px 16px'       // يلف مع نفس دوران الكارد السفلي بالظبط
        }}
      >
        {/* النص باللون الجري مع ترحيل بسيط عن الحافة */}
        <span className="fw-medium px-2" style={{ color: '#64748B', fontSize: '0.85rem' }}>
          عرض {currentItems.length} من أصل {tasks.length} إيصال
        </span>
        
        {/* أزرار الأسهم الجري الموحدة */}
        <div className="d-flex gap-2 px-2">
          {/* زر السهم الأيمن (السابق) */}
          <button 
            className="btn btn-sm d-flex align-items-center justify-content-center rounded-2 border-0"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ 
              width: '32px', 
              height: '32px',
              backgroundColor: '#E2E8F0', 
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => currentPage !== 1 && (e.currentTarget.style.backgroundColor = '#CBD5E1')}
            onMouseOut={(e) => currentPage !== 1 && (e.currentTarget.style.backgroundColor = '#E2E8F0')}
          >
            <ChevronRight size={18} style={{ color: '#475569' }} />
          </button>

          {/* زر السهم الأيسر (التالي) */}
          <button 
            className="btn btn-sm d-flex align-items-center justify-content-center rounded-2 border-0"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ 
              width: '32px', 
              height: '32px',
              backgroundColor: '#E2E8F0', 
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => currentPage !== totalPages && (e.currentTarget.style.backgroundColor = '#CBD5E1')}
            onMouseOut={(e) => currentPage !== totalPages && (e.currentTarget.style.backgroundColor = '#E2E8F0')}
          >
            <ChevronLeft size={18} style={{ color: '#475569' }} />
          </button>
        </div>
      </div>

    </div>
  );
}