import React, { useState } from 'react';
import { Printer, UserPlus, Edit3, PackageCheck, Smartphone, ShieldCheck, Lock, AlertTriangle, Check } from 'lucide-react';

const ReceiptHeader = () => {
  // حالات فتح وإغلاق الشاشات (المودالز)
  const [showInputModal, setShowInputModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // حالات الأرقام الستة (n1, n2, n3, n4, n5, n6)
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [n3, setN3] = useState("");
  const [n4, setN4] = useState("");
  const [n5, setN5] = useState("");
  const [n6, setN6] = useState("");

  // الدالة دي وظيفتها تصفير الأرقام وفتح المودال عشان متلاقيش أرقام قديمة متثبتة
  const handleOpenOTP = () => {
    setN1(""); setN2(""); setN3(""); setN4(""); setN5(""); setN6("");
    setShowInputModal(true);
  };

  // دالة التأكد من الكود (اللوجيك بتاعك زي ما هو)
  const checkCode = () => {
    const finalCode = n1 + n2 + n3 + n4 + n5 + n6;
    if (finalCode === "123456") {
      setShowInputModal(false); //بيقفل الشاشة اللي فيها المربعات (لأن خلاص مش محتاجينها).
      setShowSuccess(true); //بيفتح شاشة "تمت العملية بنجاح" اللي فيها علامة الصح الخضراء.
      setShowError(false); // بيتأكد إن شاشة الغلط مقفولة.
    } else {
      setShowInputModal(false);
      setShowError(true);
    }
  };

  const tryAgain = () => {
    setN1(""); setN2(""); setN3(""); setN4(""); setN5(""); setN6("");
    setShowError(false);
    setShowInputModal(true);
  };

  return (
    <div className="container" style={{ direction: 'rtl' }}>
      
  
      <div className="row align-items-center">
        <div className="col-md-7">
          <p className="text-muted small mb-1">الإيصالات › أرشيف-2024</p>
          <div className="d-flex align-items-center gap-2">
            <h2 className="fw-bold mb-0">ALX-77492-B</h2>
            <span className="badge bg-light text-primary border rounded-pill px-3">في الانتظار</span>
            <button className="btn btn-outline-danger btn-sm rounded-pill px-3"><AlertTriangle size={12} /> وضع علامة عاجل</button>
          </div>
        </div>
        <div className="col-md-5 d-flex gap-2 justify-content-end">
          <button className="btn btn-light border btn-sm px-3 py-2"><Printer size={16} /> طباعة الإيصال</button>
          <button className="btn btn-light border btn-sm px-3 py-2"><UserPlus size={16} /> تعيين</button>
          <button className="btn btn-light border btn-sm px-3 py-2"><Edit3 size={16} /> تعديل الإيصال</button>
        </div>
      </div>

   
      <div className="d-flex gap-3 mt-4" style={{ transform: 'translateX(-65px)'}}>
        <button className="btn btn-primary fw-bold py-2 shadow-sm" style={{ backgroundColor: '#1f66e1', borderRadius: '10px' }}>
          <PackageCheck size={20} /> تسليم الجهاز (بالإيصال)
        </button>
        {/* بننادي handleOpenOTP هنا عشان يصفر الأرقام ويفتح */}
        <button onClick={handleOpenOTP} className="btn btn-outline-primary py-2 fw-bold shadow-sm" style={{ borderRadius: '10px', borderWidth: '2px' }}>
          <Smartphone size={20} /> تسليم (فقدان الإيصال - OTP)
        </button>
      </div>

      {/* 1. مودال إدخال الرمز (OTP) */}
      {showInputModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(5px)' }}>
          <div className="bg-white rounded-5 shadow-lg text-center p-4" style={{ width: '480px' }}>
            <p className="text-primary fw-bold mb-4">عباد الرحمن لخدمات المحمول</p>
            <div className="mb-4">
              <div style={{ backgroundColor: '#eef2ff', display: 'inline-block', padding: '20px', borderRadius: '20px' }}>
                <ShieldCheck size={50} color="#1d5ed2" />
              </div>
            </div>
            <h3 className="fw-bold mb-2">تسليم الجهاز (فقدان الإيصال)</h3>
            <p className="text-muted mb-4 small"> تم ارسال رمز التححقق(OTP) الى رقم هاتف العميل المسجل. يرجى ادخل الرمزلاتمام عملية التسليم </p>
            
            <div className="d-flex gap-2 justify-content-center mb-4" dir="ltr">
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n1} onChange={(e) => setN1(e.target.value)} />
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n2} onChange={(e) => setN2(e.target.value)} />
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n3} onChange={(e) => setN3(e.target.value)} />
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n4} onChange={(e) => setN4(e.target.value)} />
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n5} onChange={(e) => setN5(e.target.value)} />
              <input type="text" maxLength="1" className="form-control text-center fw-bold border-0 shadow-sm" style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }} value={n6} onChange={(e) => setN6(e.target.value)} />
            </div>

            <div className="d-grid gap-2 px-3">
              <button className="btn btn-primary py-3 fw-bold shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#2563eb' }} onClick={checkCode}>تأكيد التسليم</button>
              <button className="btn btn-light py-3 fw-bold text-muted border-0" onClick={() => setShowInputModal(false)} style={{ borderRadius: '15px', backgroundColor: '#e5e7eb' }}>إلغاء</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. مودال الخطأ (بدون تغيير) */}
      {showError && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div className="bg-white text-center w-50" style={{ maxWidth: '550px' }}>
            <div className="p-5">
              <div className="mb-4 d-flex justify-content-center">
                <div style={{ backgroundColor: '#fee2e2', padding: '15px', borderRadius: '20px' }}>
                    <AlertTriangle size={45} color="#dc2626" />
                </div>
              </div>
              <h1 className="fw-bold mb-3">خطأ في الرمز</h1>
              <p className="text-muted mb-5">الرمز غير صحيح، حاول مرة أخرى.</p>
              <div className="d-grid gap-3">
                <button onClick={tryAgain} className="btn btn-primary py-3 fw-bold shadow-sm" style={{ borderRadius: '18px', backgroundColor: '#3b66d6' }}>إعادة المحاولة</button>
                <button onClick={() => setShowError(false)} className="btn btn-light py-3 fw-bold text-muted" style={{ borderRadius: '18px', backgroundColor: '#e5e7eb' }}>إلغاء</button>
              </div>
            </div>
            <div className="py-4 border-top" style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}>SECURE DELIVERY PROTOCOL V2.4 <Lock size={14} /></div>
          </div>
        </div>
      )}

      {/* 3. مودال النجاح (بدون تغيير) */}
      {showSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(8px)' }}>
          <div className="bg-white rounded-5 shadow-lg overflow-hidden text-center w-50" style={{ maxWidth: '550px' }}>
            <div className="p-5">
              <div className="mb-4 d-flex justify-content-center">
                <div style={{ backgroundColor: '#e6f6f2', width: '100px', height: '100px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ backgroundColor: '#00a884', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={35} color="#fff" strokeWidth={3} />
                  </div>
                </div>
              </div>
              <h1 className="fw-bold mb-3">تمت العملية بنجاح</h1>
              <p className="text-muted mb-4 small">تم تاكيد الرمز وتسليم الجهاز للعميل بنجاح.تم تحديث حالة الايصال الى تم التسليم</p>
              <button onClick={() => setShowSuccess(false)} className="btn btn-primary w-100 py-3 fw-bold shadow-sm" style={{ borderRadius: '18px', backgroundColor: '#3b66d6' }}>إغلاق</button>
            </div>
            <div className="py-4 border-top" style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}>SECURE DELIVERY PROTOCOL V2.4 <Lock size={14} /></div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReceiptHeader;