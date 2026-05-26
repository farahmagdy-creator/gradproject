import React from 'react';

export default function FilterTabs({ activeFilter, onFilterChange }) {
  const filters = [
    { name: 'الكل', key: 'الكل' },
    { name: 'قيد الانتظار', key: 'قيد الانتظار' },
    { name: 'قيد الإصلاح', key: 'قيد الإصلاح' },
    { name: 'جاهز', key: 'جاهز' },
    { name: '! عاجل', key: 'عاجل' }
  ];

  const getFilterStyle = (filterKey) => {
    const isActive = activeFilter === filterKey;

    // الستايل الأساسي المشترك لكل الأزرار للحفاظ على الأبعاد والخطوط
    const baseStyle = {
      padding: '0.5rem 1.1rem', // نفس مقاس btn-sm المتناسق عندك
      fontSize: '0.875rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    };

    // 1. زرار "عاجل" الخاص
    if (filterKey === 'عاجل') {
      if (isActive) {
        return {
          ...baseStyle,
          backgroundColor: '#BA1A1A', // باك جراوند حمراء خفيفة عند الضغط
          border: '1px solid #BA1A1A',
          color: '#ffff'
        };
      } else {
        return {
          ...baseStyle,
          backgroundColor: 'transparent', // ترانسبارينت في العادي
          border: '1px solid #dc3545', // البوردر الأحمر الصريح من كودك original
          color: '#dc3545'
        };
      }
    }

    // 2. باقي الأزرار العادية (الكل، قيد الانتظار، إلخ)
    if (isActive) {
      return {
        ...baseStyle,
        backgroundColor: '#094CB2', // اللون الأزرق المعتمد في كودك الأساسي
        border: '1px solid #094CB2',
        color: '#ffffff'
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#E9E8E9', // ترانسبارينت في العادي بناءً على طلبك
        border: '1px solid #E9E8E9', // بوردر خفيف عشان تظهر حدود الكلمة
        color: '#6c757d' // اللون الرمادي النصي من كودك الأساسي
      };
    }
  };

  return (
    <div className="col-12 col-lg-auto d-flex flex-wrap gap-2 order-lg-2 order-2">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          style={getFilterStyle(f.key)}
          // الحفاظ على كلاسات الهيكل المستدير لـ Bootstrap
          className={`btn btn-sm rounded-3 fw-semibold`}
          // منع الـ Hover الأسود الافتراضي وتطبيق تأثير ناعم
          onMouseEnter={(e) => {
            if (activeFilter !== f.key) {
              if (f.key === 'عاجل') {
                e.target.style.backgroundColor = '#FEF2F2';
              } else {
                e.target.style.backgroundColor = '#F8F9FA'; // رمادي خفيف جداً ناعم
                e.target.style.borderColor = '#ADB5BD';
                e.target.style.color = '#495057';
              }
            }
          }}
          onMouseLeave={(e) => {
            const currentStyle = getFilterStyle(f.key);
            e.target.style.backgroundColor = currentStyle.backgroundColor;
            e.target.style.borderColor = currentStyle.border ? currentStyle.border.split(' ')[2] : 'transparent';
            e.target.style.color = currentStyle.color;
          }}
        >
          {f.name}
        </button>
      ))}
    </div>
  );
}