import { AlertCircle, Phone } from "lucide-react";
import { TAG_STYLE } from "../../data/statusStyles";

/**
 * Tags — كومبوننت عرض الوسوم
 *
 * Props:
 *  - name       : اسم الوسم (مثلاً 'عاجل' أو 'إتصال أولاً')
 *  - width / height / padding / radius / fontSize / fontWeight — overrides اختيارية
 */

const ICON_MAP = {
  'عاجل':       AlertCircle,
  'إتصال أولاً': Phone,
};

// وسوم إضافية غير موجودة في TAG_STYLE (وسوم المرتجعات)
const EXTENDED_STYLE = {
  'وضع علامة عاجل': {
    color: '#DC3545', background: 'transparent', border: '1px solid #DC3545',
  },
  'وضع علامة الإتصال أولاً': {
    color: '#0D6EFD', background: 'transparent', border: '1px solid #0D6EFD',
  },
  'تحديث كمرتجع': {
    color: '#ffffff', background: 'linear-gradient(90deg, #A31D1D 0%, #4361EE 100%)',
  },
  'مرتجع': {
    color: '#ffffff', background: 'linear-gradient(90deg, #A31D1D 0%, #4361EE 100%)',
  },
};

const DEFAULT_STYLE = { color: '#ffffff', background: '#6C757D' };

const Tags = ({ name, width, height, padding, radius, fontSize, fontWeight }) => {
  const baseStyle = TAG_STYLE[name] ?? EXTENDED_STYLE[name] ?? DEFAULT_STYLE;
  const isGradient = baseStyle.background?.includes("linear-gradient");

  const IconComponent = ICON_MAP[name] ?? null;
  const fSize = fontSize ?? "0.75rem";
  const iconSize = fSize.includes("rem") ? 13 : (parseInt(fSize) || 13);

  return (
    <span
      className="d-inline-flex align-items-center justify-content-center text-nowrap"
      style={{
        background:      isGradient ? baseStyle.background : undefined,
        backgroundColor: !isGradient ? baseStyle.background : undefined,
        color:           baseStyle.color,
        border:          baseStyle.border ?? "none",
        gap: "6px",
        direction: "rtl",
        cursor: "pointer",
        userSelect: "none",
        lineHeight: "1",
        boxSizing: "border-box",
        width:        width   ?? "auto",
        minWidth:     "73px",
        height:       height  ?? "auto",
        padding:      padding ?? "6px 12px",
        borderRadius: radius  ?? "12px",
        fontSize:     fSize,
        fontWeight:   fontWeight ?? "500",
      }}
    >
      {IconComponent && <IconComponent size={iconSize} strokeWidth={2.5} />}
      <span style={{ lineHeight: "1", paddingTop: "1px" }}>{name}</span>
    </span>
  );
};

export default Tags;
