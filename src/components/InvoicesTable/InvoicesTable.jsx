import React from "react";
import TableRow from "./TableRow";

const headers = [
  "رقم الإيصال",
  "العميل",
  "الجهاز",
  "العطل",
  "الفني",
  "تاريخ الاستلام",
  "موعد التسليم",
  "الحالة",
  "الوسم",
  "تاريخ التسليم",
  "الإجراء",
];

const InvoicesTable = ({ data }) => {
  if (!data.length) {
    return (
      <div
        className="text-center py-5 bg-white rounded-3 shadow-sm"
        style={{ border: "1px solid #e9ecef" }}
      >
        <p className="text-muted mb-0">لا توجد إيصالات تطابق معايير البحث</p>
      </div>
    );
  }

  return (
    <div
      className="table-responsive bg-white rounded-4 shadow-sm"
      style={{ border: "1px solid #e9ecef" }}
    >
      <table className="table table-hover align-middle text-center mb-0">
        <thead style={{ backgroundColor: "#F2F4F6 " }}>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="py-3 fw-normal text-secondary"
                style={{ fontSize: "13px", whiteSpace: "nowrap" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <TableRow key={item.id} invoice={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;