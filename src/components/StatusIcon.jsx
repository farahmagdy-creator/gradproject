import React from "react";

export const STATUS_CONFIG = {
  "تم التسليم": {
    bg: "#28A745",
    text: "#ffffff",
  },
  "جاهز للتسليم": {
    bg: "#007BFF",
    text: "#ffffff",
  },
  "مرفوض": {
    bg: "#DC3545",
    text: "#ffffff",
  },
  "قيد الإصلاح": {
    bg: "#F9E37A",
    text: "#000000",
  },
  "في الانتظار": {
    bg: "#940FC9",
    text: "#ffffff",
  },
};

const StatusIcon = ({ status }) => {
  const config = STATUS_CONFIG[status] ?? {
    bg: "#6c757d",
    text: "#ffffff",
  };

  return (
    <span
      className="badge d-inline-block text-center"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        fontSize: "0.75rem",
        fontWeight: "500",
        padding: "6px 12px",
        borderRadius: "12px",
        minWidth: "73px",
      }}
    >
      {status}
    </span>
  );
};

export default StatusIcon;