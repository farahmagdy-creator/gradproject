import React, { useRef } from 'react'; 
import { PlusSquare } from 'lucide-react';


const InternalNotes = ({ notes = [], onAddNote }) => {
  const inputRef = useRef(null);

  const handleAddClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="bg-white p-4 border-0" 
    style={{ backgroundColor: '#fff', width: '560px', direction: 'rtl', marginRight: '100px' }}>
      
      {/* ا العنوان وزر الإضافة */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h6 className="fw-bold text-secondary mb-0">ملاحظات داخلية</h6>
        <button 
          onClick={handleAddClick} 
          className="btn btn-link text-primary text-decoration-none d-flex align-items-center gap-2 fw-bold p-0"
            style={{color: '#0e56c2'}}
        >
          <PlusSquare size={20} />
          إضافة ملاحظة
        </button>
      </div>

      {/* عرض الملاحظات ديناميكياً */}
      <div className="notes-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <div key={index} className="p-3 mb-3 rounded-3 position-relative" 
                 style={{ backgroundColor: '#f8f9fa', borderRight: '5px solid #1261d7' }}>
              <p className="fw-bold mb-3 mt-1" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                "{note.text}"
              </p>
              <div className="d-flex justify-content-between align-items-center text-muted small">
                <span className="fw-medium">{note.authorRole}: {note.authorName}</span>
                <span>{note.timestamp}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center my-4">لا توجد ملاحظات حالياً.</p>
        )}
      </div>

      {/* حقل الكتابة */}
      <div className="mt-2">
        <input 
          ref={inputRef}
          type="text" 
          className="form-control py-3 px-4 rounded-3 shadow-sm" 
          placeholder="اكتب تعليقاً داخليا" 
          style={{ 
            backgroundColor: '#fff', 
            fontSize: '0.95rem',
            border: '1px solid #eee'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value.trim()) {
              onAddNote(e.target.value); // نرسل القيمة للدالة المسؤولة عن الحفظ
              e.target.value = ''; // مسح الحقل
            }
          }}
        />
      </div>
    </div>
  );
};

export default InternalNotes;