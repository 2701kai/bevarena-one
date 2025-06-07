import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRoutes } from "../../context/RouteContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const { getRedirectPath } = useRoutes();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // First check for stored redirect in RouteContext
      const redirectPath = getRedirectPath();

      // If no stored redirect, check location state
      if (redirectPath === "/" && location.state?.from) {
        navigate(location.state.from.pathname, { replace: true });
      } else {
        // Use the stored redirect path
        navigate(redirectPath, { replace: true });
      }
    }
  }, [isAuthenticated, navigate, location, getRedirectPath]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(formData.username, formData.password);

    if (!result.success) {
      setError(
        result.error ||
          "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-700">
          Anmelden bei BevArena
        </h1>
        <p className="text-gray-600 mt-2">Geben Sie Ihre Anmeldedaten ein</p>
        <p className="text-gray-500 text-sm mt-1">
          Hinweis: Benutzer &quot;bevarena&quot; mit Passwort
          &quot;bevarena&quot; ist vorkonfiguriert
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Benutzername
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Passwort
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Angemeldet bleiben
            </label>
          </div>
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-800"
            >
              Passwort vergessen?
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Anmelden
          </button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Sie haben noch kein Konto?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </div>
  );
}
