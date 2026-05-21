import { Eye, UserCircle, Phone } from "lucide-react";
import { TAG } from "../../data/mockData";


const STATUS_STYLE = {
 "تم التسليم":  { color: "#f6f6f6", background: "#28A745" },
 "قيد الانتظار":{ color: "#940fc9", background: "transparent", border: "1.5px solid #940fc9" },
 "قيد الإصلاح": { color: "#211b00", background: "#F9E37A" },
 "جاهز":        { color: "#1e40af", background: "#dbeafe" },
 "مرفوض":       { color: "#ffffff", background: "#dc3545" },
};

const TAG_STYLE = {
 [TAG.URGENT]:     { color: "#ffffff", background: "#ba1a1a" },
 [TAG.CALL_FIRST]: { color: "#ffffff", background: "#2E63C9" },
};

const DEFAULT_STATUS_STYLE = { color: "#333", background: "#e9ecef" };

const ReceiptTableRow = ({ invoice, columns, onView }) => {
 const sStyle = STATUS_STYLE[invoice.status] ?? DEFAULT_STATUS_STYLE;

 const cellMap = {
   id: (
     <td key="id" style={{ padding: "12px", fontWeight: "bold", color: "#003178", whiteSpace: "nowrap" }}>
       {invoice.id}
     </td>
   ),

   customer: (
     <td key="customer" style={{ padding: "12px" }}>
       <div style={{ fontWeight: "600", color: "#191c1e" }}>{invoice.customerName}</div>
       <small style={{ color: "#9ca3af", fontSize: "11px" }}>{invoice.phone}</small>
     </td>
   ),

   device: (
     <td key="device" style={{ padding: "12px", fontWeight: "600", color: "#191c1e", whiteSpace: "nowrap" }}>
       {invoice.device}
     </td>
   ),

   issue: (
     <td key="issue" style={{ padding: "12px", color: "#602100" }}>
       {invoice.issue}
     </td>
   ),

   tech: (
     <td key="tech" style={{ padding: "12px" }}>
       <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#a8a29e" }}>
         <UserCircle size={16} color="#d1d5db" />
         <span style={{ fontSize: "13px" }}>{invoice.tech ?? "غير معين"}</span>
       </div>
     </td>
   ),

   receiveDate: (
     <td key="receiveDate" style={{ padding: "12px", color: "#6b7280", fontSize: "13px" }}>
       {invoice.receiveDate}
     </td>
   ),

   deliveryDue: (
     <td key="deliveryDue" style={{ padding: "12px", fontWeight: "600", color: "#602100", whiteSpace: "nowrap" }}>
       {invoice.deliveryDue ?? invoice.due}
     </td>
   ),

   status: (
     <td key="status" style={{ padding: "12px" }}>
       <span style={{ ...sStyle, padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap", border: sStyle.border ?? "none" }}>
         {invoice.status}
       </span>
     </td>
   ),

   tags: (
     <td key="tags" style={{ padding: "12px" }}>
       <div style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-start" }}>
         {(invoice.tags ?? (invoice.tag ? [invoice.tag] : [])).map((tag) => {
           const tStyle = TAG_STYLE[tag] ?? {};
           return (
             <span key={tag} style={{ ...tStyle, padding: "2px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "4px" }}>
               {tag === TAG.CALL_FIRST && <Phone size={11} />}
               {tag === TAG.URGENT ? "! عاجل" : tag}
             </span>
           );
         })}
       </div>
     </td>
   ),

   deliveredDate: (
     <td key="deliveredDate" style={{ padding: "12px", color: "#6b7280", fontSize: "13px" }}>
       {invoice.deliveredDate ?? "—"}
     </td>
   ),

   action: (
     <td key="action" style={{ padding: "12px" }}>
       <button
         onClick={() => onView?.(invoice)}
         style={{ background: "none", border: "none", cursor: "pointer", color: "#003178", fontWeight: "bold", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}
       >
         <Eye size={14} />
         عرض
       </button>
     </td>
   ),
 };

 return (
   <tr style={{ borderTop: "1px solid #f3f4f6", fontSize: "13px" }}>
     {columns.map((col) => cellMap[col])}
   </tr>
 );
};

export default ReceiptTableRow;