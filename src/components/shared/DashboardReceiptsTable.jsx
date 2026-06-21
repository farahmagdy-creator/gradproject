import ReceiptTable from "./ReceiptTable";

// ─── أعمدة جدول الإيصالات الموحّدة لكل الداشبوردات ────────────────────────────
const DASHBOARD_COLUMNS = [
  { key: "id",          label: "رقم الإيصال",   width: "110px" },
  { key: "customer",    label: "العميل",          width: "160px" },
  { key: "device",      label: "الجهاز",          width: "160px" },
  { key: "issue",       label: "العطل",           width: "80px"  },
  { key: "tech",        label: "الفني",           width: "110px" },
  { key: "status",      label: "الحالة",          width: "110px" },
  { key: "deliveryDue", label: "موعد التسليم",   width: "120px" },
  { key: "tags",        label: "الوسم",           width: "120px" },
  { key: "action",      label: "الإجراء",         width: "75px"  },
];

/**
 * DashboardReceiptsTable
 * نسخة موحّدة من جدول الإيصالات المستخدم في صفحات الداشبورد المختلفة
 * (آخر التسليمات / أجهزة تسلم اليوم / آخر التحديثات عند المالك... إلخ)
 *
 * بيغلّف ReceiptTable + DASHBOARD_COLUMNS عشان منكررهم في كل صفحة.
 *
 * Props:
 *  - title       : عنوان الجدول
 *  - titleColor  : لون العنوان (افتراضي: #1e3a8a)
 *  - rows        : مصفوفة الإيصالات
 *  - onView      : callback زر عرض
 *  - emptyMessage
 *  - countLabel  : لو مش متبعت، بيتحسب أوتوماتيك من rows.length
 *  - onPrev/onNext : pagination الداشبورد (اختياري)
 */
const DashboardReceiptsTable = ({
  title,
  titleColor = "#1e3a8a",
  rows = [],
  onView,
  emptyMessage,
  countLabel,
  onPrev,
  onNext,
}) => {
  const resolvedCountLabel =
    countLabel ?? `عرض ${rows.length} من أصل ${rows.length} إيصال`;

  return (
    <ReceiptTable
      title={title}
      titleColor={titleColor}
      rows={rows}
      columns={DASHBOARD_COLUMNS}
      countLabel={resolvedCountLabel}
      onView={onView}
      emptyMessage={emptyMessage}
      onPrev={onPrev ?? (() => {})}
      onNext={onNext ?? (() => {})}
    />
  );
};

export default DashboardReceiptsTable;
