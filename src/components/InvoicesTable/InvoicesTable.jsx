import ReceiptTable from "../shared/ReceiptTable";

const INVOICES_COLUMNS = [
  { key: "id",            label: "رقم الإيصال",   width: "100px" },
  { key: "customer",      label: "العميل",          width: "160px" },
  { key: "device",        label: "الجهاز",          width: "140px" },
  { key: "issue",         label: "العطل",           width: "80px"  },
  { key: "tech",          label: "الفني",           width: "120px" },
  { key: "receiveDate",   label: "تاريخ الاستلام", width: "80px"  },
  { key: "deliveryDue",   label: "موعد التسليم",   width: "80px"  },
  { key: "status",        label: "الحالة",          width: "110px" },
  { key: "tags",          label: "الوسم",           width: "80px"  },
  { key: "deliveredDate", label: "تاريخ التسليم",  width: "80px"  },
  { key: "action",        label: "الإجراء",         width: "70px"  },
];

const InvoicesTable = ({ data, onView, countLabel, currentPage, totalPages, onPageChange }) => (
  <ReceiptTable
    rows={data}
    columns={INVOICES_COLUMNS}
    onView={onView}
    countLabel={countLabel}
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={onPageChange}
    emptyMessage="لا توجد إيصالات تطابق معايير البحث"
  />
);

export default InvoicesTable;
