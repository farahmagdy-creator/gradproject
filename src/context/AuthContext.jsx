import { createContext, useContext, useState } from "react";

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
  {
    id: 3,
    email: "owner@fixflow.com",
    password: "123456",
    role: "owner",
    name: "عباد الرحمن",
    shopName: "عباد الرحمن لخدمات المحمول",
  },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem("fixflow_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authError, setAuthError] = useState("");

  const login = (email, password) => {
    setAuthError("");
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      sessionStorage.setItem("fixflow_user", JSON.stringify(found));
      return { success: true, role: found.role };
    }
    setAuthError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    return { success: false };
  };

  const registerCompany = (data) => {
    setAuthError("");
    const newUser = {
      id: Date.now(),
      email: data.email,
      password: data.password,
      role: "receptionist",
      name: data.companyName,
      shopName: data.companyName,
    };
    setUser(newUser);
    sessionStorage.setItem("fixflow_user", JSON.stringify(newUser));
    return { success: true, role: "receptionist" };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    setAuthError("");
  };

  return (
    <AuthContext.Provider value={{ user, authError, login, registerCompany, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
