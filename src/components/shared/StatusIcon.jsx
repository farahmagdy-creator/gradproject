import { STATUS_STYLE, DEFAULT_STATUS_STYLE } from "../../data/statusStyles";

const StatusIcon = ({ status }) => {
  const style = STATUS_STYLE[status] ?? DEFAULT_STATUS_STYLE;

  return (
    <span
      className="badge d-inline-block text-center"
      style={{
        backgroundColor: style.background,
        color: style.color,
        border: style.border ?? "none",
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
