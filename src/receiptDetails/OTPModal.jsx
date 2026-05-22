import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, Check, Lock } from 'lucide-react';

// ملاحظة: في الـ production المفروض checkCode تتعمل على الـ backend مش هنا
const OTPModal = ({ onClose }) => {
  const [step, setStep]   = useState('input'); // 'input' | 'success' | 'error'
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  const handleChange = (val, idx) => {
    const next = [...digits];
    next[idx] = val.replace(/\D/, '').slice(-1);
    setDigits(next);
  };

  const handleReset = () => {
    setDigits(['', '', '', '', '', '']);
    setStep('input');
  };

  const checkCode = () => {
    const code = digits.join('');
    if (code === '123456') setStep('success');
    else setStep('error');
  };

  const overlayStyle = {
    position: 'fixed', inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(5px)',
  };

  if (step === 'success') return (
    <div style={{ ...overlayStyle, backdropFilter: 'blur(8px)', zIndex: 10000 }}>
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
          <p className="text-muted mb-4 small">تم تأكيد الرمز وتسليم الجهاز للعميل بنجاح. تم تحديث حالة الإيصال إلى تم التسليم.</p>
          <button onClick={onClose} className="btn btn-primary w-100 py-3 fw-bold shadow-sm" style={{ borderRadius: '18px', backgroundColor: '#3b66d6' }}>إغلاق</button>
        </div>
        <div className="py-4 border-top" style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}>SECURE DELIVERY PROTOCOL V2.4 <Lock size={14} /></div>
      </div>
    </div>
  );

  if (step === 'error') return (
    <div style={{ ...overlayStyle, zIndex: 10000 }}>
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
            <button onClick={handleReset} className="btn btn-primary py-3 fw-bold shadow-sm" style={{ borderRadius: '18px', backgroundColor: '#3b66d6' }}>إعادة المحاولة</button>
            <button onClick={onClose} className="btn btn-light py-3 fw-bold text-muted" style={{ borderRadius: '18px', backgroundColor: '#e5e7eb' }}>إلغاء</button>
          </div>
        </div>
        <div className="py-4 border-top" style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}>SECURE DELIVERY PROTOCOL V2.4 <Lock size={14} /></div>
      </div>
    </div>
  );

  return (
    <div style={overlayStyle}>
      <div className="bg-white rounded-5 shadow-lg text-center p-4" style={{ width: '480px' }}>
        <p className="text-primary fw-bold mb-4">عباد الرحمن لخدمات المحمول</p>
        <div className="mb-4">
          <div style={{ backgroundColor: '#eef2ff', display: 'inline-block', padding: '20px', borderRadius: '20px' }}>
            <ShieldCheck size={50} color="#1d5ed2" />
          </div>
        </div>
        <h3 className="fw-bold mb-2">تسليم الجهاز (فقدان الإيصال)</h3>
        <p className="text-muted mb-4 small">تم إرسال رمز التحقق (OTP) إلى رقم هاتف العميل المسجل. يرجى إدخال الرمز لإتمام عملية التسليم.</p>

        <div className="d-flex gap-2 justify-content-center mb-4" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              className="form-control text-center fw-bold border-0 shadow-sm"
              style={{ width: '55px', height: '65px', fontSize: '24px', backgroundColor: '#f3f4f6', borderRadius: '12px' }}
              value={d}
              onChange={(e) => {
                handleChange(e.target.value, i);
                if (e.target.value && i < 5) document.getElementById(`otp-${i + 1}`)?.focus();
              }}
            />
          ))}
        </div>

        <div className="d-grid gap-2 px-3">
          <button className="btn btn-primary py-3 fw-bold shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#2563eb' }} onClick={checkCode}>تأكيد التسليم</button>
          <button className="btn btn-light py-3 fw-bold text-muted border-0" onClick={onClose} style={{ borderRadius: '15px', backgroundColor: '#e5e7eb' }}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
