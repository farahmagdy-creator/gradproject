import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import AppHeader from "../../components/layout/AppHeader";

// لينكات الهيدر الافتراضية  
const DEFAULT_NAV_LINKS = [
  { label: "لوحة التحكم",  key: "dashboard" },
  { label: "إيصالاتي",     key: "receipts"  },
  { label: "سجل الصيانة",  key: "history"   },
  { label: "الملف الشخصي", key: "profile"   },
  { label: "المخزون",      key: "inventory" },
];

// لينكات الهيدر لما يدوس على المخزون في السايدبار
const INVENTORY_NAV_LINKS = [
  { label: "المخزن",     key: "inv_warehouse" },
  { label: "المشتريات",  key: "inv_purchases"  },
  {
    label: "المبيعات",
    key: "inv_sales",
    hasDropdown: true,
    dropdownItems: [
      { label: "إدارة المبيعات للورشة ",    key: "workshop_sales"   },
      { label: "إدارة المبيعات الخارجية ",    key: "external_sales"   },

    ],
  },
   {
    label: "المرتجعات",
    key: "inv_returns",
    hasDropdown: true,
    dropdownItems: [
      { label: "المرتجعات",    key: "inv_sales_main"   },
    ],
  },
  { label: "التوالف",    key: "inv_damages"   },
];

function TechHeader({ activePage, setActivePage }) {
const isInventory =
    activePage === "inventory" ||
    activePage.startsWith("inv_") ||
    activePage === "workshop_sales" ||
    activePage === "external_sales";
  return (
    <AppHeader
      navLinks={isInventory ? INVENTORY_NAV_LINKS : DEFAULT_NAV_LINKS}
      activePage={activePage}
      onNavigate={setActivePage}
      avatarSrc="image/tech nav photo.jpg"
      height={64}
    />
  );
}

export default TechHeader;
