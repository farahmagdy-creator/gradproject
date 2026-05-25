import React from "react";
import { AlertCircle, Phone } from "lucide-react";

const TAGS_CONFIG = {
  "وضع علامة عاجل": { 
    bg: "transparent", text: "#DC3545", border: "1px solid #DC3545", 
    icon: AlertCircle, width: "fit-content", height: "32px", padding: "0px 12px", 
    radius: "80px", fontSize: "14px", fontWeight: "500" 
  },
  "وضع علامة الإتصال أولاً": { 
    bg: "transparent", text: "#0D6EFD", border: "1px solid #0D6EFD", 
    icon: Phone, width: "fit-content", height: "36px", padding: "0px 16px", 
    radius: "50px", fontSize: "14px", fontWeight: "500" 
  },
  "تحديث كمرتجع": { 
    bg: "linear-gradient(90deg, #A31D1D 0%, #4361EE 100%)", text: "#ffffff", border: "none", 
    icon: null, width: "fit-content", height: "38px", padding: "0px 14px", 
    radius: "12px", fontSize: "14px", fontWeight: "600" 
  },
  "مرتجع": { 
    bg: "linear-gradient(90deg, #A31D1D 0%, #4361EE 100%)", text: "#ffffff", border: "none", 
    icon: null, width: "fit-content", height: "32px", padding: "0px 12px", 
    radius: "12px", fontSize: "14px", fontWeight: "600" 
  },

  "عاجل": { 
    bg: "#BA1A1A", text: "#ffffff", border: "none", 
    icon: AlertCircle, width: "auto", minWidth: "73px", height: "auto", padding: "6px 12px", 
    radius: "12px", fontSize: "0.75rem", fontWeight: "500" 
  },
  "إتصال أولاً": { 
    bg: "#0D6EFD", text: "#ffffff", border: "none", 
    icon: Phone, width: "auto", minWidth: "73px", height: "auto", padding: "6px 12px", 
    radius: "12px", fontSize: "0.75rem", fontWeight: "500" 
  },
};

const Tags = ({ name, width, height, padding, radius, fontSize, fontWeight }) => {
  const config = TAGS_CONFIG[name] ?? {
    bg: "#6C757D", text: "#ffffff", border: "none", icon: null,
    width: "fit-content", height: "32px", padding: "0px 12px",
    radius: "4px", fontSize: "14px", fontWeight: "600",
  };

  const IconComponent = config.icon;
  const isGradient = config.bg.includes("linear-gradient");
  
  const currentFontSize = fontSize ?? config.fontSize;
  const iconSize = currentFontSize.includes("rem") ? 13 : (parseInt(currentFontSize) || 14);

  return (
    <span
      className="d-inline-flex align-items-center justify-content-center text-nowrap"
      style={{
        background: isGradient ? config.bg : undefined,
        backgroundColor: !isGradient ? config.bg : undefined,
        color: config.text,
        border: config.border,
        gap: "6px",
        direction: "rtl",
        cursor: "pointer",
        userSelect: "none",
        lineHeight: "1",
        boxSizing: "border-box",
        width: width ?? config.width,
        minWidth: config.minWidth ?? "transparent",
        height: height ?? config.height,
        padding: padding ?? config.padding,
        borderRadius: radius ?? config.radius,
        fontSize: currentFontSize,
        fontWeight: fontWeight ?? config.fontWeight,
      }}
    >
      {IconComponent && <IconComponent size={iconSize} strokeWidth={2.5} />}
      <span style={{ lineHeight: "1", paddingTop: "1px" }}>{name}</span>
    </span>
  );
};

export default Tags;