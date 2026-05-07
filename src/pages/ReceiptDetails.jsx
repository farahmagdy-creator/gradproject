import React from "react";
import ReceiptHeader from "../receiptDetails/ReceiptHeader.jsx";
import ReceiptInfo from "../receiptDetails/ReceiptInfo.jsx";
import CustomerDetails from "../receiptDetails/CustomerDetails.jsx";
import DeviceDetails from "../receiptDetails/DeviceDetails.jsx";
import PaymentDetails from "../receiptDetails/PaymentDetails.jsx";
import InternalNotes from "../receiptDetails/InternalNotes.jsx";
import DeviceImage from "../receiptDetails/DeviceImage.jsx";
import ReceiptTimeline from "../receiptDetails/ReceiptTimeline.jsx";
import StatusSection from "../receiptDetails/StatusSection.jsx";
import Footer from "../receiptDetails/Footer.jsx";
function ReceiptDetails({ receiptData = {} }) {
  
  return (
    <div className="receipt-details-container"
     style={{ direction: 'rtl', padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' ,overflowX: 'hidden'}}>
      
      {/* 1. الهيدر */}
      <ReceiptHeader receiptData={receiptData} /> 

      <div className="row g-4 mt-2">
        <div className="col-md-8">
          <div className="flex-column d-flex gap-4">
            
            {/* 2. بيانات العميل - كلها من receiptData */}
            <CustomerDetails 
               name={receiptData.customerName} 
               phone={receiptData.customerPhone} 
               otp={receiptData.otpCode}
            />

            {/* 3. تفاصيل الجهاز - النوع واللون والشكوى ديناميك */}
            <DeviceDetails 
               deviceName={receiptData.deviceName} 
               color={receiptData.deviceColor}
               problem={receiptData.problem} 
            />

            {/* 4. ملاحظات داخلية */}
            <InternalNotes notes={receiptData.internalNotes} />

            {/* 5. مبالغ الصيانة */}
            <PaymentDetails 
               totalAmount={receiptData.totalAmount} 
               remainingAmount={receiptData.remainingAmount} 
               depositPaid={receiptData.depositPaid}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="flex-column d-flex gap-4">
            
            {/* 6. صور الجهاز */}
            <DeviceImage 
               imageUrl={receiptData.mainImage} 
               date={receiptData.receivedDate}
            />

            {/* 7. سجل التدقيق */}
            <ReceiptTimeline 
               receivedDate={receiptData.receivedDate}
               technicianName={receiptData.technicianName}
               repairTime={receiptData.repairTime}
               auditLogs={receiptData.auditLogs || []}
            />

            {/* 8. التقرير الفني */}
            <StatusSection 
               reportId={receiptData.receiptNumber}
               technicianName={receiptData.technicianName}
               images={receiptData.images || []}
               diagnosisText={receiptData.technicianReport}
            />
          </div>
        </div>

        <div className="col-12 mt-4">
          <ReceiptInfo data={receiptData} />
        </div>
        
      </div>
      <div className="mt-5">
        <Footer referenceNumber={receiptData.receiptNumber} />
      </div>
    </div>
    
  );
}

export default ReceiptDetails;