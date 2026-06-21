import { TAG } from './mockData';

// ─── مصدر موحد لألوان الحالات والوسوم ────────────────────────────────────────

export const STATUS_STYLE = {
  'تم التسليم':    { color: '#f6f6f6', background: '#28A745' },
  'قيد الانتظار':  { color: '#940fc9', background: 'transparent', border: '1.5px solid #940fc9' },
  'قيد الإصلاح':   { color: '#211b00', background: '#F9E37A' },
  'جاهز للتسليم':  { color: '#ffffff', background: '#007bff' },
  'مرفوض':         { color: '#ffffff', background: '#dc3545' },
};

export const TAG_STYLE = {
  [TAG.URGENT]:     { color: '#ffffff', background: '#BA1A1A' },
  [TAG.CALL_FIRST]: { color: '#ffffff', background: '#2E63C9' },
};

export const DEFAULT_STATUS_STYLE = { color: '#333', background: '#e9ecef' };

// ─── حالات الموظفين ──────────────────────────────────────────────────────────
export const EMPLOYEE_STATUS_STYLE = {
  'نشط':   { color: '#ffffff', background: '#28a745' },
  'موقوف': { color: '#ffffff', background: '#979D98' },
};
