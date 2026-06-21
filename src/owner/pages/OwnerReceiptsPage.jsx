import { Plus } from "lucide-react";
import InvoicesPage from "../../pages/InvoicesPage";

/**
 * OwnerReceiptsPage
 * مجرد wrapper بيستدعي InvoicesPage الموجودة بالفعل (نفس صفحة الريسبشن)
 * وبيزود عليها زرار "إيصال جديد" اللي بيفتح صفحة CreateReceipt.
 *
 * Props:
 *  - onViewReceipt : callback(invoice) — بيفتح صفحة تفاصيل الإيصال
 *  - onCreateNew   : callback() — بيفتح صفحة إنشاء إيصال جديد
 */
function OwnerReceiptsPage({ onViewReceipt, onCreateNew }) {
  return (
    <div dir="rtl">
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 28px" }}>
        <button
          onClick={onCreateNew}
          style={{
            background: "linear-gradient(to right, #0d47a1, #003178)",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontSize: "14px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,49,120,0.25)",
          }}
        >
          <Plus size={16} />
          إيصال جديد
        </button>
      </div>

      <InvoicesPage onViewReceipt={onViewReceipt} />
    </div>
  );
}

export default OwnerReceiptsPage;
