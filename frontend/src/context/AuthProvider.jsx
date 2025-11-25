import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  function setAuth({ token: newToken, user: newUser }) {
    // Atualiza token
    if (typeof newToken !== "undefined") {
      if (newToken) {
        setToken(newToken);
        localStorage.setItem("token", newToken);
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }
    }

    // Atualiza usuário
    if (typeof newUser !== "undefined") {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }
    }
  }

  function logout() {
    setAuth({ token: null, user: null });
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
