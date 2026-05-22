// src/pages/TechnicalDashboard.js
import React from 'react';
import { 
  TrendingUp, 
  Award, 
  ClipboardList, 
  Package, 
  CheckCircle 
} from 'lucide-react';
import CompletedTasksTable from '../../components/CompletedTasksTable';
import { useTechnicianData } from '../../hooks/useTechnicianData';
export default function TechnicalDashboard() {
  // استقبال البيانات كاملة بما فيها الـ performance من الـ Hook
  const { stats, completedTasks, alerts, upcomingTasks, performance, loading } = useTechnicianData();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" style={{ direction: 'rtl' }}>
        <div className="text-center fw-bold" style={{ color: '#003178' }}>
          <div className="spinner-border mb-2" role="status"></div>
          <div>جاري تحميل لوحة التحكم...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4" style={{ direction: 'rtl' }}>
      
      {/* 1. الكروت العلوية الثلاثة */}
      <div className="row g-4 mb-4">
        {/* كارت: المهام الموكلة */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-4 rounded-3 bg-white position-relative overflow-hidden" style={{ border: '1px solid #E2E8F0', borderRight: '5px solid #003178' }}>
            <div className="position-absolute bottom-0 start-0 opacity-25" style={{ color: '#003178', transform: 'translate(-40px, 40px)', pointerEvents: 'none' }}>
              <ClipboardList size={130} strokeWidth={0.8} />
            </div>
            <div className="position-relative" style={{ zIndex: 1 }}>
              <p className="fw-bold mb-2" style={{ color: '#64748B', fontSize: '1.1rem' }}>المهام الموكلة</p>
              <h1 className="fw-bold m-0" style={{ color: '#003178', fontSize: '2.8rem', fontFamily: 'sans-serif' }}>{stats.assigned.value}</h1>
              <div className="mt-3">
                <small className="text-muted fw-semibold" style={{ fontSize: '0.8rem' }}><TrendingUp size={14} className="me-1 text-primary d-inline-block align-middle" /> {stats.assigned.change}</small> 
              </div>
            </div>
          </div>
        </div>

        {/* كارت: قطع بانتظار التوريد */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-4 rounded-3 bg-white position-relative overflow-hidden" style={{ border: '1px solid #E2E8F0', borderRight: '5px solid #A16207' }}>
            <div className="position-absolute bottom-0 start-0 opacity-25" style={{ color: '#A16207', transform: 'translate(-40px, 40px)', pointerEvents: 'none' }}>
              <Package size={130} strokeWidth={0.8} />
            </div>
            <div className="position-relative" style={{ zIndex: 1 }}>
              <p className="fw-bold mb-2" style={{ color: '#64748B', fontSize: '1.1rem' }}>قطع بانتظار التوريد</p>
              <h1 className="fw-bold m-0" style={{ color: '#A16207', fontSize: '2.8rem', fontFamily: 'sans-serif' }}>{stats.pendingParts.value}</h1>
              <div className="mt-3">
                <small className="fw-bold" style={{ color: '#A16207', fontSize: '0.8rem' }}>{stats.pendingParts.text}</small>
              </div>
            </div>
          </div>
        </div>

        {/* كارت: تم إنجازه اليوم */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm p-4 rounded-3 bg-white position-relative overflow-hidden" style={{ border: '1px solid #E2E8F0', borderRight: '5px solid #16A34A' }}>
            <div className="position-absolute bottom-0 start-0 opacity-25" style={{ color: '#16A34A', transform: 'translate(-40px, 40px)', pointerEvents: 'none' }}>
              <CheckCircle size={130} strokeWidth={0.8} />
            </div>
            <div className="position-relative" style={{ zIndex: 1 }}>
              <p className="fw-bold mb-2" style={{ color: '#64748B', fontSize: '1.1rem' }}>تم إنجازه اليوم</p>
              <h1 className="fw-bold m-0" style={{ color: '#16A34A', fontSize: '2.8rem', fontFamily: 'sans-serif' }}>{stats.completedToday.value}</h1>
              <div className="mt-3">
                <small className="fw-semibold" style={{ fontSize: '0.8rem' ,color: '#16A34A' }}>{stats.completedToday.percentage}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. القسم السفلي (الجدول والسايد بار الداخلي) */}
      <div className="row g-4">
        {/* جدول المهام المكتملة */}
        <div className="col-lg-8 order-lg-1 order-2">
          <CompletedTasksTable tasks={completedTasks} />
        </div>

        {/* السايد بار الجانبي للكروت الصغيرة */}
        <div className="col-lg-4 d-flex flex-column gap-4 order-lg-2 order-1">
          
          {/* كارت تنبيهات هامة */}
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">               
            <h6 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <span className="text-danger fw-black fs-4 d-inline-flex align-items-center justify-content-center" style={{ fontFamily: 'sans-serif', lineHeight: 1, transform: 'translateY(-2px)' }}>
                !
              </span>
              <span>تنبيهات هامة</span>
            </h6>
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-light rounded-3 mb-2 small" style={{ borderRight: alert.type === 'warning' ? '4px solid #A16207' : '4px solid #003178' }}>
                <span className="fw-bold d-block mb-1" style={{ color: alert.type === 'warning' ? '#A16207' : '#003178' }}>{alert.title}</span>
                <span className="text-muted">{alert.message}</span>
              </div>
            ))}
          </div>

          {/* كارت المهام القادمة (Clean بدون خلفيات أو خطوط) */}
          <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
            <h6 className="fw-bold mb-2" style={{ color: '#003178' }}>المهام القادمة</h6>
            <div className="d-flex flex-column">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="d-flex align-items-center py-3 my-1">
                  {/* مربع الرقم الكبير الموحد */}
                  <div 
                    className="border rounded-3 d-flex align-items-center justify-content-center shadow-sm" 
                    style={{ 
                      width: '44px', 
                      height: '44px', 
                      minWidth: '44px',
                      backgroundColor: '#F8FAFC',
                      borderColor: '#E2E8F0'
                    }}
                  >
                    <span className="fw-bold fs-5" style={{ color: '#003178', fontFamily: 'sans-serif' }}>
                      {upcomingTasks.indexOf(task) + 1}
                    </span>
                  </div>
                  
                  {/* تفاصيل المهمة */}
                  <div className="me-3 text-start">
                    <span className="fw-bold d-block text-dark" style={{ fontSize: '0.9rem' }}>{task.device}</span>
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{task.fault}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* كارت الأداء الممتاز المحدث بالكامل (الزرار تحت على اليمين) */}
          <div 
            className="card border-0 shadow-sm text-white p-4 rounded-4 position-relative overflow-hidden" 
            style={{ 
              backgroundColor: '#003989', 
              minHeight: '200px', 
              display: 'flex', 
              flexDirection: 'column', 
              textAlign: 'right' 
            }}
          >
            {/* الأيقونة الخلفية في أسفل اليسار */}
            <div 
              className="position-absolute bottom-0 start-0" 
              style={{ pointerEvents: 'none', transform: 'translate(-10px, 20px)', opacity: '0.12', color: '#fff' }}
            >
              <Award size={130} strokeWidth={1} /> 
            </div>

            {/* النصوص العلوية القادمة من الباك */}
            <div className="position-relative" style={{ zIndex: 1 }}>
              <h4 className="fw-bold mb-2" style={{ fontSize: '1.4rem' }}>
                {performance.rating >= 90 ? 'أداؤك ممتاز!' : 'أداء جيد جداً!'}
              </h4>
              <p className="m-0 lh-base opacity-75" style={{ fontSize: '0.95rem', fontWeight: '400' }}>
                {performance.text}
              </p>
            </div>

            {/* بوكس الزرار المثبت أسفل اليمين في الـ RTL */}
            <div 
              className="position-relative d-flex justify-content-start" 
              style={{ zIndex: 1, marginTop: 'auto', paddingTop: '16px' }}
            >
              <button 
                className="btn fw-bold bg-white px-3 py-2 rounded-3 border-0 shadow-sm" 
                style={{ 
                  color: '#003989', 
                  fontSize: '0.85rem', 
                  minWidth: '110px'
                }}
              >
                شارك إنجازك
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}