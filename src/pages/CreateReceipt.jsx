import { useReceiptForm } from "../hooks/useReceiptForm";
import CustomerForm from "../components/receipt/CustomerForm";
import DeviceForm from "../components/receipt/DeviceForm";
import CostSection from "../components/receipt/CostSection";
import ImageUploader from "../components/receipt/ImageUploader";
import TechnicianSection from "../components/receipt/TechnicianSection";

import { useState } from "react";
import { Receipt, Info } from "lucide-react";
import toast from "react-hot-toast";

function CreateReceipt({ setShowForm }) {
  const form = useReceiptForm();

  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors, isValid },
  } = form;

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log(data);
      toast.success("تم إنشاء الإيصال بنجاح");
      reset();
      setShowForm(false);
    } catch (err) {
      toast.error("حدث خطأ ما");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <div className="mb-4">
        <h3 className="fw-bold d-flex align-items-center gap-2">
          <Receipt size={26} />
          إنشاء إيصال صيانة جديد
        </h3>
        <p className="text-muted mb-0">
          قم بتوثيق تفاصيل الجهاز وحالة العميل لضمان خدمة دقيقة واحترافية.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-custom p-4 mb-4">
          <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2 ms-auto" style={{ width: "fit-content" }}>
            <div className="circle-number">1</div>
            <h5 className="fw-bold mb-0">بيانات العميل والجهاز</h5>
          </div>
          <CustomerForm register={register} errors={errors} />
          <DeviceForm register={register} errors={errors} />
          <ImageUploader setValue={setValue} />
        </div>

        <div className="section-yellow p-4 mb-4">
          <div className="d-flex align-items-center gap-2 mb-3 border-bottom pb-2 ms-auto" style={{ width: "fit-content" }}>
            <div className="circle-number">2</div>
            <h5 className="fw-bold mb-0">التكاليف والتكلفة</h5>
          </div>
          <CostSection register={register} errors={errors} control={control} />
          <TechnicianSection register={register} errors={errors} />
        </div>

        <div className="d-flex justify-content-between align-items-start mb-4">
          <div className="text-muted d-flex align-items-start gap-2">
            <Info size={18} />
            <span>بمجرد إنشاء الإيصال سيتم إرسال نسخة رقمية إلى رقم موبايل العميل عبر الرسائل القصيره.</span>
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn px-4"
              onClick={() => {
                reset();
                setShowForm(false);
              }}
              style={{background: "#e7e5e4"}}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="btn px-4 d-flex align-items-center gap-2"
              style={{ cursor: "pointer",color: "#ffffff", background: "linear-gradient(to right, #094cb2, #3366cc)", border: "none" }}
            >
              {loading ? "جاري التنفيذ..." : "إصدار الإيصال"}
            </button>
          </div>
        </div>

        <div className="card-custom p-3 mb-4">
          <div className="fw-bold mb-2">تعليمات الضمان:</div>
          <ul className="mb-0" style={{ paddingRight: "18px" }}>
            <li>سياسة المحل تتطلب توضيح أي خدوش حالية للجهاز قبل الاستلام.</li>
            <li>يجب الاحتفاظ بالإيصال لإثبات الضمان.</li>
            <li>الضمان لا يشمل الكسر أو سوء الاستخدام.</li>
            <li>مدة الضمان تختلف حسب نوع الصيانة.</li>
          </ul>
        </div>
      </form>
    </div>
  );
}

export default CreateReceipt;
