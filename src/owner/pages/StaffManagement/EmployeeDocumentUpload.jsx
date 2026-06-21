// ─── EmployeeDocumentUpload ───────────────────────────────────────────────
// مربع رفع ملف واحد (تستخدم مرتين في فورم إضافة الموظف: صورة الهوية + الصورة الشخصية)

function EmployeeDocumentUpload({ id, icon, label, hint, accept, file, onChange }) {
  return (
    <div
      className="rounded-4 p-4 text-center"
      style={{ background: "#f8f9fa", cursor: "pointer" }}
      onClick={() => document.getElementById(id).click()}
    >
      <div className="d-flex justify-content-center mb-2" style={{ color: "#434652" }}>
        {icon}
      </div>
      <div className="fw-semibold" style={{ color: "#191C1E", fontSize: "14px" }}>
        {file ? file.name : label}
      </div>
      <small className="text-muted">{hint}</small>

      <input
        id={id}
        type="file"
        hidden
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

export default EmployeeDocumentUpload;
