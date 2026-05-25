import React from 'react';

function RD_Financials({ staffName, dept, priority, subtotal, deposit }) {

  const netAmount = (subtotal || 0) - (deposit || 0);

  return (
    <div className="mt-4 pt-3">
      {/*  المسؤولين */}
      <div className="row mb-3 text-center small text-muted"  
           style={{ 
             backgroundColor: '#f9f9f9', 
             width: '100%', 
             minHeight: '90px', 
             paddingTop: '18px',
             borderRadius: '8px',
             margin: '0 auto' 
           }}>
        
        <div className="col-4 border-start">
          <span className="d-block mb-1">الفنى المعين:</span>
          <span className="text-dark fw-bold" style={{ fontSize: '18px' }}>
            {staffName || "---"}
          </span>
        </div>

        <div className="col-4 border-start">
          <span className="d-block mb-1">مستلم النظام:</span>
          <span className="text-dark fw-bold" style={{ fontSize: '18px' }}>
            {dept || "---"}
          </span>
        </div>

        <div className="col-4">
          <span className="d-block mb-1">مستوى الصيانة:</span>
          <span className="text-dark fw-bold" style={{ fontSize: '18px' }}>
            {priority || "---"}
          </span>
        </div>
      </div>

      <hr />

      {/*  الحسابات */}
      <div className="d-flex justify-content-center pt-3" style={{transform:'translateX(170px)'}}>
        <div style={{ minWidth: '260px' }}>
          <div className="d-flex justify-content-between small mb-1">
            <span> اجمالى الصيانة:</span>
            <span>{subtotal || 0} ج.م</span>
          </div>

          <div className="d-flex justify-content-between small mb-3 text-muted">
            <span> المبلغ المدفوع:</span>
            <span>{deposit || 0} ج.م</span>
          </div>
            
          <div className="bg-primary text-white d-flex align-items-center justify-content-center gap-2 shadow p-2" 
               style={{ minHeight: '60px', width:'300px' }}>
            <small className="mb-0">صافي المبلغ المستحق:</small>
            <div className="h4 mb-0" style={{ fontSize: '20px' }}>
              {netAmount} ج.م
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 
}
export default RD_Financials;