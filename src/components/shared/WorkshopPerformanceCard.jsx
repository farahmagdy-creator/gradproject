import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * WorkshopPerformanceCard — كارت "أداء الورشة" (شارت أعمدة لآخر فترة)
 *
 * Props:
 *  - data    : [{ day, value }]
 *  - options : خيارات الفلتر العلوي (افتراضي: آخر 7 أيام)
 */
const WorkshopPerformanceCard = ({
  data = [],
  options = ["آخر 7 أيام", "آخر 14 يوم", "آخر 30 يوم"],
}) => {
  const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);

  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const peakDay = data.reduce(
    (max, d) => (d.value > max.value ? d : max),
    data[0] || { value: 0 }
  );

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        padding: "24px",
      }}
    >
      {/* ─── Header ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          position: "relative",
        }}
      >
        <h6 style={{ fontWeight: "bold", color: "#1b1c1d", margin: 0, fontSize: "18px" }}>
          أداء الورشة
        </h6>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "#f5f6fa",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "8px 14px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#434652",
              cursor: "pointer",
            }}
          >
            {selected}
            <ChevronDown size={14} />
          </button>

          {open && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                minWidth: "140px",
                zIndex: 5,
                overflow: "hidden",
              }}
            >
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setOpen(false);
                  }}
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: opt === selected ? "#0d47a1" : "#434652",
                    background: opt === selected ? "#eef2fb" : "#ffffff",
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Chart ─── */}
      {data.length === 0 ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#9ca3af" }}>
          لا توجد بيانات لعرضها
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "16px",
            height: "200px",
            direction: "rtl",
          }}
        >
          {data.map((item) => {
            const isPeak = item.day === peakDay.day;
            const heightPct = Math.max((item.value / maxValue) * 100, 6);
            return (
              <div
                key={item.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  height: "100%",
                  gap: "10px",
                }}
              >
                <div
                  title={`${item.value} إيصال`}
                  style={{
                    width: "100%",
                    maxWidth: "64px",
                    height: `${heightPct}%`,
                    borderRadius: "8px",
                    backgroundColor: isPeak ? "#0d47a1" : "#d6e0f5",
                    transition: "height 0.3s ease",
                  }}
                />
                <span style={{ fontSize: "13px", color: "#434652", fontWeight: 500 }}>
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkshopPerformanceCard;
