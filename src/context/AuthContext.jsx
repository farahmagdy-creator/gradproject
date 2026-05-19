import { createContext, useContext, useState } from "react";

// ─── بيانات المستخدمين (Mock) ──────────────────────────────────────────────
// في الإنتاج: هيتم استبدالها بـ API calls حقيقية
const MOCK_USERS = [
  {
    id: 1,
    email: "receptionist@fixflow.com",
    password: "123456",
    role: "receptionist",
    name: "عباد الرحمن",
    shopName: "عباد الرحمن لخدمات المحمول",
  },
  {
    id: 2,
    email: "tech@fixflow.com",
    password: "123456",
    role: "technician",
    name: "عباد الرحمن",
    techId: "TECH-49201",
    specialty: "فني سوفتوير و هاردوير للايفون",
    joinDate: "1/5/2021",
  },
];

// ─── Context ───────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

  // تسجيل الدخول
  const login = (email, password) => {
    setAuthError("");
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return { success: true, role: found.role };
    }
    setAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    return { success: false };
  };

  // تسجيل شركة جديدة (Receptionist)
  const registerCompany = (data) => {
    setAuthError("");
    // Mock: نقبل أي تسجيل جديد
    const newUser = {
      id: Date.now(),
      email: data.email,
      password: data.password,
      role: "receptionist",
      name: data.companyName,
      shopName: data.companyName,
    };
    setUser(newUser);
    return { success: true, role: "receptionist" };
  };

  // تسجيل الخروج
  const logout = () => {
    setUser(null);
    setAuthError("");
  };

  return (
    <AuthContext.Provider
      value={{ user, authError, login, registerCompany, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook مساعد
export function useAuth() {
  return useContext(AuthContext);
}
