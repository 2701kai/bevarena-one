import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Beim ersten Laden, prüfe, ob es einen Benutzer im localStorage gibt
  useEffect(() => {
    const storedUser = localStorage.getItem("bevarena_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("bevarena_user");
      }
    }
    setLoading(false);
  }, []);

  // Login-Funktion
  const login = (username, password) => {
    // Einfache Validierung für den Test-Benutzer
    if (username === "bevarena" && password === "bevarena") {
      const userData = {
        username: "bevarena",
        name: "BevArena Admin",
        role: "admin",
      };

      setUser(userData);
      localStorage.setItem("bevarena_user", JSON.stringify(userData));
      return { success: true };
    }

    return {
      success: false,
      error:
        "Ungültiger Benutzername oder Passwort. Hinweis: Benutzer 'bevarena' mit Passwort 'bevarena' ist vorkonfiguriert.",
    };
  };

  // Logout-Funktion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("bevarena_user");
  };

  // Register-Funktion (vereinfacht)
  const register = (userData) => {
    // In einer echten App würde hier die Registrierung über eine API erfolgen
    // Für unsere Demo-App erlauben wir jeden Benutzer
    const newUser = {
      ...userData,
      role: "user",
    };

    setUser(newUser);
    localStorage.setItem("bevarena_user", JSON.stringify(newUser));
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
