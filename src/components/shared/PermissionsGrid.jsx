// ─── PermissionsGrid (مشترك) ──────────────────────────────────────────────
// كومبوننت شبكة الصلاحيات، مستخدم في صفحة البروفايل (عرض فقط) وفي فورم
// إضافة/تعديل الموظف (تحديد فعّال). أي تعديل على قائمة الصلاحيات نفسها
// أو شكل الشبكة يتم هنا فقط.

// الصلاحيات المتاحة في النظام
export const ALL_PERMISSIONS = [
  "استلام جهاز",         "تسليم جهاز",           "طلب قطعة غيار",        "تغيير حالة الإيصال",
  "تعيين أجهزة للفني",   "عرض المخزون",           "إضافة للمخزون",         "استخدام المخزون",
  "إنشاء فاتورة شراء",   "إنشاء فاتورة بيع",      "تسجيل تلف قطعة",       "إرجاع قطعة للمورد",
  "إرجاع قطعة لعميل",    "صيانة الأجهزة",         "تعيين مهام للتوصيل",    "استلام طلبات الغير",
  "عرض يومية الحساب",    "إدارة الموظفين",         "إرسال تنبيهات",         "عرض سجل النشاطات",
];

/**
 * PermissionsGrid
 *
 * @param {string[]}  selected   - مصفوفة أسماء الصلاحيات المختارة حالياً
 * @param {Function}  onToggle   - callback(permission) — بيتنادى لما اليوزر يدوس على صلاحية. لو مش متبعتة، الشبكة بتبقى read-only
 * @param {boolean}   readOnly   - يفرض وضع العرض فقط حتى لو onToggle موجودة
 */
function PermissionsGrid({ selected = [], onToggle, readOnly = false }) {
  const isInteractive = !readOnly && typeof onToggle === "function";

  return (
    <div className="rounded-4 p-3" style={{ background: "#f5f3f4" }}>
      <div className="row row-cols-4 g-2">
        {ALL_PERMISSIONS.map((perm) => {
          const checked = selected.includes(perm);
          return (
            <div
              key={perm}
              className="col d-flex align-items-center justify-content-end gap-2"
              style={{ direction: "ltr", cursor: isInteractive ? "pointer" : "default" }}
              onClick={isInteractive ? () => onToggle(perm) : undefined}
            >
              <span style={{ fontSize: "14px" }}>{perm}</span>
              <input
                type="checkbox"
                className="form-check-input mt-0"
                style={{ width: "18px", height: "18px", flexShrink: 0, cursor: isInteractive ? "pointer" : "default" }}
                checked={checked}
                readOnly={!isInteractive}
                onClick={(e) => e.stopPropagation()}
                onChange={isInteractive ? () => onToggle(perm) : undefined}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PermissionsGrid;
