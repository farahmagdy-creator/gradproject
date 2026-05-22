// ─── مصدر موحد لألوان الحالات والوسوم ────────────────────────────────────────
// استخدم دايماً من هنا بدل ما تكرر الألوان في كل كومبوننت

import { TAG } from './mockData';

export const STATUS_STYLE = {
  'تم التسليم':   { color: '#f6f6f6',  background: '#28A745' },
  'قيد الانتظار': { color: '#940fc9',  background: 'transparent', border: '1.5px solid #940fc9' },
  'قيد الإصلاح':  { color: '#211b00',  background: '#F9E37A' },
  'جاهز للتسليم': { color: '#ffffff',  background: '#007bff' },
  'مرفوض':        { color: '#ffffff',  background: '#dc3545' },
};

export const TAG_STYLE = {
  [TAG.URGENT]:     { color: '#ffffff', background: '#ba1a1a' },
  [TAG.CALL_FIRST]: { color: '#ffffff', background: '#2E63C9' },
};

export const DEFAULT_STATUS_STYLE = { color: '#333', background: '#e9ecef' };
