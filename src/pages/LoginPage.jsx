import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import fixflowLogo from "../../image/fixflow logo.jpg";

function LoginPage({ onNavigateRegister, onLoginSuccess }) {
  const { login, authError } = useAuth();
  const [form, setForm]         = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.email || !form.password) return;
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      setLoading(false);
      if (result.success) onLoginSuccess(result.role);
    }, 380);
  };

  const onKey = (e) => e.key === "Enter" && handleSubmit();

  const inputStyle = {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 14,
    textAlign: "right",
    outline: "none",
    background: "#fafafa",
    boxSizing: "border-box",
    color: "#374151",
    fontFamily: "inherit",
  };

  const iconStyle = (side) => ({
    position: "absolute",
    [side]: 13,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#9ca3af",
  });

  const isReady = form.email && form.password;

  return (
    <div
      dir="rtl"
      style={{ minHeight: "100vh", position: "relative", overflow: "hidden", background: "#f5f5f5" }}
    >
      {/* dot pattern */}
      <svg
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="12,5 21,12 12,19 3,12" fill="#ffffff" fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* amber glow top-right */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 55% 50% at 90% 8%, rgba(245,158,11,0.10) 0%, transparent 65%)",
        }}
      />

      {/* content */}
      <div
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          minHeight: "calc(100vh - 56px)",
          paddingTop: 52, paddingBottom: 20,
        }}
      >
        {/* Logo */}
        <div style={{ margin: "0 auto 14px", display: "flex", justifyContent: "center" }}>
          <img
            src={fixflowLogo}
            alt="FixFlow Logo"
            style={{ width: 100, height: 100, objectFit: "contain", borderRadius: 22, boxShadow: "0 6px 28px rgba(0,0,0,0.12)" }}
          />
        </div>

        <p style={{ color: "#6b7280", fontSize: 15, margin: "0 0 24px" }}>
          بوابة تسجيل الدخول
        </p>

        {/* Card */}
        <div
          style={{
            width: "100%", maxWidth: 340,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 36px rgba(0,0,0,0.10)",
            padding: "0 24px 24px",
            border: "1px solid #e5e5e5",
          }}
        >
          {/* top gradient bar */}
          <div
            style={{
              height: 5,
              background: "linear-gradient(90deg, #1e3a5f 55%, #f59e0b 100%)",
              borderRadius: "16px 16px 0 0",
              margin: "0 -24px 28px",
            }}
          />

          {/* Error */}
          {authError && (
            <div
              style={{
                background: "#fff1f2", border: "1px solid #fecaca", color: "#dc2626",
                borderRadius: 9, padding: "8px 14px", fontSize: 13, textAlign: "center", marginBottom: 18,
              }}
            >
              {authError}
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 7 }}>
              اسم المستخدم أو البريد الإلكتروني
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="email" name="email" value={form.email}
                onChange={handleChange} onKeyDown={onKey}
                placeholder="أدخل اسم المستخدم"
                style={{ ...inputStyle, padding: "11px 14px 11px 42px" }}
              />
              <span style={iconStyle("left")}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="#9ca3af" />
                </svg>
              </span>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", textAlign: "right", fontSize: 13, fontWeight: 700, color: "#1e3a5f", marginBottom: 7 }}>
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"} name="password" value={form.password}
                onChange={handleChange} onKeyDown={onKey}
                placeholder="••••••••"
                style={{ ...inputStyle, padding: "11px 42px", letterSpacing: showPass ? 0 : 3 }}
              />
              <span style={iconStyle("right")}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm-6 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3.1-9H8.9V6a3.1 3.1 0 0 1 6.2 0v2z" fill="#9ca3af" />
                </svg>
              </span>
              <button
                type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0, color: "#9ca3af", display: "flex" }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* نسيت كلمة المرور */}
          <div style={{ textAlign: "right", marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: "#f59e0b", cursor: "pointer", fontWeight: 600 }}>
              نسيت كلمة المرور؟
            </span>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading || !isReady}
            style={{
              width: "100%",
              background: isReady ? "#1e3a5f" : "#94a3b8",
              color: "#fff", border: "none", borderRadius: 10,
              padding: "11px 0", fontSize: 15, fontWeight: 700,
              cursor: isReady ? "pointer" : "not-allowed",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "background 0.2s",
              letterSpacing: 0.3,
            }}
          >
            {loading
              ? <span style={{ width: 18, height: 18, border: "2.5px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "ffSpin 0.7s linear infinite" }} />
              : <><span>تسجيل الدخول</span><span style={{ fontSize: 18 }}>→</span></>
            }
          </button>

          {/* Register link */}
          {onNavigateRegister && (
            <p style={{ textAlign: "center", marginTop: 20, marginBottom: 0, fontSize: 13, color: "#9ca3af" }}>
              ليس لديك حساب؟{" "}
              <span onClick={onNavigateRegister} style={{ color: "#1e3a5f", cursor: "pointer", fontWeight: 700 }}>
                سجّل شركتك الآن
              </span>
            </p>
          )}
        </div>
      </div>

      {/* wave */}
      <div style={{ position: "relative", zIndex: 1, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 70" style={{ width: "100%", display: "block" }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,0 1440,35 L1440,70 L0,70 Z" fill="rgba(200,196,190,0.45)" />
        </svg>
      </div>

      <p style={{ textAlign: "center", fontSize: 12, color: "#aaa", paddingBottom: 14, marginTop: -6, position: "relative", zIndex: 1 }}>
        FixFlow OS • الإصدار 1.0.0
      </p>

      <style>{`@keyframes ffSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoginPage;