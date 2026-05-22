import ReceiptHeader    from "../components/receiptDetails/ReceiptHeader.jsx";
import ReceiptInfo      from "../components/receiptDetails/ReceiptInfo.jsx";
import CustomerDetails  from "../components/receiptDetails/CustomerDetails.jsx";
import DeviceDetails    from "../components/receiptDetails/DeviceDetails.jsx";
import PaymentDetails   from "../components/receiptDetails/PaymentDetails.jsx";
import InternalNotes    from "../components/receiptDetails/InternalNotes.jsx";
import DeviceImage      from "../components/receiptDetails/DeviceImage.jsx";
import ReceiptTimeline  from "../components/receiptDetails/ReceiptTimeline.jsx";
import StatusSection    from "../components/receiptDetails/StatusSection.jsx";
import Footer           from "../components/receiptDetails/Footer.jsx";

function ReceiptDetails({ receiptData = {} }) {
  return (
    <div
      style={{
        direction: "rtl",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <ReceiptHeader receiptData={receiptData} />

      <div className="row g-4 mt-2">
        <div className="col-md-8">
          <div className="flex-column d-flex gap-4">
            <CustomerDetails
              name={receiptData.customerName}
              phone={receiptData.customerPhone}
              otp={receiptData.otpCode}
            />
            <DeviceDetails
              deviceName={receiptData.deviceName}
              color={receiptData.deviceColor}
              problem={receiptData.problem}
            />
            <InternalNotes notes={receiptData.internalNotes} />
            <PaymentDetails
              totalAmount={receiptData.totalAmount}
              remainingAmount={receiptData.remainingAmount}
              depositPaid={receiptData.depositPaid}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="flex-column d-flex gap-4">
            <DeviceImage
              imageUrl={receiptData.mainImage || "/image/iPhone.jpg"}
              date={receiptData.receivedDate}
            />
            <ReceiptTimeline
              receivedDate={receiptData.receivedDate}
              technicianName={receiptData.technicianName}
              repairTime={receiptData.repairTime}
              auditLogs={receiptData.auditLogs || []}
            />
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
