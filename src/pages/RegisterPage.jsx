import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import fixflowLogo from "../../image/fixflow logo.jpg";

/* ─── FixFlow Logo ───────────────────────────────────────────────────────── */
function FixFlowLogo() {
  return (
    <div style={{ margin: "0 auto 20px", display: "flex", justifyContent: "center" }}>
      <img
        src={fixflowLogo}
        alt="FixFlow Logo"
        style={{
          width: 100,
          height: 100,
          objectFit: "contain",
          borderRadius: 22,
          boxShadow: "0 6px 28px rgba(0,0,0,0.12)",
        }}
      />
    </div>
  );
}

/* ─── Small icon helpers ─────────────────────────────────────────────────── */
function BuildingIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="9 22 9 12 15 12 15 22" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.6 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />
      <polyline points="22,6 12,13 2,6" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9ca3af" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function UploadIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
      <polyline points="16 6 12 2 8 6" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="2" x2="12" y2="15" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ─── RegisterPage ───────────────────────────────────────────────────────── */
function RegisterPage({ onNavigateLogin }) {
  const { registerCompany } = useAuth();
  const [form, setForm] = useState({ companyName: "", phone: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) setLogoName(f.name);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setLogoName(f.name);
  };

  const isValid = form.companyName && form.phone && form.email && form.password && agreed;

  const handleSubmit = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      const result = registerCompany(form);
      setLoading(false);
    }, 450);
  };

  /* shared styles */
  const labelStyle = {
    display: "block", textAlign: "right",
    fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 7,
  };
  const inputStyle = {
    width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 10,
    padding: "10px 38px 10px 14px", fontSize: 13, textAlign: "right",
    outline: "none", background: "#fafafa", boxSizing: "border-box",
    color: "#374151", fontFamily: "inherit",
  };
  const iconRight = {
    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none",
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#f5f5f5",
      }}
    >
      <svg
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
 <polygon
  points="12,5 21,12 12,19 3,12"
  fill="#ffffffc9" fillOpacity="1"
/>
</pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Amber glow */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background:
            "radial-gradient(ellipse 55% 50% at 90% 8%, rgba(245,158,11,0.18) 0%, transparent 65%)," +
            "radial-gradient(ellipse 40% 35% at 5% 88%, rgba(255,255,255,0.35) 0%, transparent 60%)",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", paddingTop: 44, paddingBottom: 24,
        }}
      >
        <FixFlowLogo />

        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#1e3a5f", margin: "0 0 6px", textAlign: "center" }}>
          تسجيل شركة جديدة
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 28px", textAlign: "center" }}>
          انضم إلى شبكة FixFlow التقنية كشريك معتمد
        </p>

        {/* ── Card ── */}
        <div
          style={{
            width: "100%", maxWidth: 520,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 36px rgba(0,0,0,0.10)",
            padding: "0 30px 28px",
            border: "1px solid #e5e5e5",
          }}
        >
          {/* top bar */}
          <div
            style={{
              height: 5, background: "linear-gradient(90deg, #1e3a5f 55%, #f59e0b 100%)",
              borderRadius: "16px 16px 0 0", margin: "0 -30px 26px",
            }}
          />

          {/* Row: company + phone */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}>
            {/* اسم الشركة */}
            <div>
              <label style={labelStyle}>اسم الشركة</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text" name="companyName" value={form.companyName}
                  onChange={handleChange} placeholder="أدخل اسم الشركة"
                  style={inputStyle}
                />
                <span style={iconRight}><BuildingIcon /></span>
              </div>
            </div>
            {/* رقم الهاتف */}
            <div>
              <label style={labelStyle}>رقم الهاتف</label>
              <div style={{ position: "relative" }}>
                <input
                  type="tel" name="phone" value={form.phone}
                  onChange={handleChange} placeholder="+966 50 000 0000"
                  style={{ ...inputStyle, direction: "ltr", textAlign: "left", paddingLeft: "38px", paddingRight: "14px" }}
                />
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <PhoneIcon />
                </span>
              </div>
            </div>
          </div>

          {/* البريد الإلكتروني */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>البريد الإلكتروني</label>
            <div style={{ position: "relative" }}>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="contact@company.com"
                style={{ ...inputStyle, direction: "ltr", textAlign: "left", paddingLeft: "14px", paddingRight: "38px" }}
              />
              <span style={iconRight}><MailIcon /></span>
            </div>
          </div>

          {/* كلمة المرور */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>كلمة المرور</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"} name="password" value={form.password}
                onChange={handleChange} placeholder="••••••••"
                style={{ ...inputStyle, letterSpacing: showPass ? 0 : 3 }}
              />
              <span style={iconRight}><LockIcon /></span>
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af", display: "flex" }}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* شعار الشركة */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>شعار الشركة (اختياري)</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById("ff-logo-input").click()}
              style={{
                border: "2px dashed #d1d5db",
                borderRadius: 12,
                background: "#fafafa",
                padding: "22px 16px",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <UploadIcon />
              </div>
              {logoName ? (
                <p style={{ fontSize: 13, color: "#1e3a5f", fontWeight: 600, margin: 0 }}>{logoName}</p>
              ) : (
                <>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", margin: "0 0 3px" }}>اضغط لرفع الملف</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 2px" }}>أو قم بسحب وإفلات الملف هنا</p>
                  <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>PNG، JPG، GIF حتى 10MB</p>
                </>
              )}
              <input id="ff-logo-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
            </div>
          </div>

          {/* الشروط */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, flexDirection: "row-reverse" }}>
            <input
              type="checkbox" id="ff-terms" checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer", flexShrink: 0, accentColor: "#1e3a5f" }}
            />
            <label htmlFor="ff-terms" style={{ fontSize: 13, color: "#6b7280", cursor: "pointer" }}>
              أوافق على{" "}
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>شروط الخدمة</span>
              {" "}و{" "}
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>سياسة الخصوصية</span>
            </label>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isValid}
            style={{
              width: "100%",
              background: isValid ? "#1e3a5f" : "#94a3b8",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "13px 0", fontSize: 15, fontWeight: 700,
              cursor: isValid ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "background 0.2s",
            }}
          >
            {loading
              ? <span style={{ width: 18, height: 18, border: "2.5px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "ffSpin 0.7s linear infinite" }} />
              : <><span style={{ fontSize: 18 }}>←</span><span>إنشاء حساب الشركة</span></>
            }
          </button>

          {/* Login link */}
          <p style={{ textAlign: "center", marginTop: 18, marginBottom: 0, fontSize: 13, color: "#6b7280" }}>
            لديك حساب بالفعل؟{" "}
            <span onClick={onNavigateLogin} style={{ color: "#f59e0b", cursor: "pointer", fontWeight: 700 }}>
              تسجيل الدخول
            </span>
          </p>
        </div>
      </div>

      {/* wave */}
      <div style={{ position: "relative", zIndex: 1, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" fill="rgba(200,196,190,0.45)" />
        </svg>
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", paddingBottom: 14, marginTop: -6, position: "relative", zIndex: 1 }}>
        FixFlow OS • الإصدار 2.4.1
      </p>

      <style>{`@keyframes ffSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default RegisterPage;
