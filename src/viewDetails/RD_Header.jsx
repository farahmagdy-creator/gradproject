import React from 'react';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';

function RD_Header({ brandName, ticketId }) {
  const trackLink = `https://your-domain.com/track/${ticketId}`;

  return (
    <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3"
     style={{ direction: 'rtl' }}>
      
      {/* 1. الجزء اليمين - بيانات الإيصال */}
      <div className="text-start">
        <p className="mb-2" style={{fontSize:'33px', fontWeight:'bold', color: '#2563eb' }}>
          ايصال الخدمة
        </p>
        <h4 className="text-muted small mb-0" style={{ color: '#2563eb' }}>
          {brandName || "مركز الصيانة"}
        </h4>
        <div className="text-dark d-flex flex-column py-4">
          <span style={{ fontSize: '12px', color: '#6c757d', marginBottom: '4px', transform:'translateX(120px)' }}>رقم الإيصال</span>
          <span style={{ fontSize: '20px', fontWeight: 'bold', transform:'translateX(102px)' }}>{ticketId}</span>
        </div>
      </div>

{/*  باركود الى فالنص */}
<div className="align-self-center d-flex justify-content-center bg-white p-2" style={{ transform:'translateY(-35px)' }}>
  <Barcode 
    value={ticketId || "---"} 
    format="CODE128"
    width={2}   
    height={80}     
    displayValue={false} 
    margin={0}
    background="#ffffff"
    lineColor="#000000"
  />
</div>

      {/* 3. الجزء الشمال - الـ QR كود (بالستايل الجديد) */}
      <div className="text-center">
        <div className="p-2" style={{ backgroundColor: '#fff' }}>
          <QRCodeSVG 
            value={trackLink} 
            size={100} 
            fgColor="#2563eb" 
            level="H" // أعلى جودة  عشان التفاصيل
            includeMargin={false}
            imageSettings={{
           
            }}
          />
        </div>
        <small className="text-muted d-block" style={{ fontSize: '10px', marginTop: '5px' }}>
          امسح لتتبع حالة الطلب
        </small>
      </div>
    </div>
  );
}

export default RD_Header;