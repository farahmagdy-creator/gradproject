import React, { useState } from 'react';

const ReceiptInfo = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="device-image-section w-100" style={{transform:'translateY(-20px)'}}>
      <h6 className="fw-bold mb-3 text-end" style={{ color: '#4a4a6a', fontSize: '14px' }}>
        صورة لحالة الجهاز عند التسليم
      </h6>
      
      <div 
        className="upload-area d-flex flex-column align-items-center justify-content-center py-4 px-5"
        style={{
          border: '2px dashed #d1d5db',
          borderRadius: '12px',
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          width: '1060px',
          minHeight: '150px',  
       marginRight:'75px'
        }}
        onClick={() => document.getElementById('fileInput').click()}
      >
        <input 
          type="file" 
          id="fileInput" 
          hidden 
          accept="image/*" 
          onChange={handleFileChange} 
        />

        {image ? (
          <img src={image} alt="Device" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
        ) : (
          <>
            <div className="mb-2 text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round"
                 d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <p className="mb-1 fw-medium" style={{ color: '#6b7280', fontSize: '13px' }}>
              اسحب الصورة هنا أو اضغط للرفع
            </p>
            <span className="text-uppercase small text-muted" style={{ fontSize: '11px' }}>
              JPG, PNG UP TO 10MB
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default ReceiptInfo;