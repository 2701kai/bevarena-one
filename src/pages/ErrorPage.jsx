import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function ErrorPage() {
  // In React 19, we can use these hooks for error handling
  const location = useLocation();
  const navigate = useNavigate();

  // Get error from state if available (passed during navigation)
  const error = location.state?.error;
  const is404 = location.pathname.includes("404") || error?.status === 404;

  // For handling back navigation
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-700 p-4 text-white">
          <div className="flex items-center">
            <Logo
              size="medium"
              variant="primary"
              withText={true}
              linkTo="/"
              className="text-white"
            />
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {is404
              ? "404 - Seite nicht gefunden"
              : "Ein Fehler ist aufgetreten"}
          </h2>

          <p className="text-gray-600 mb-6">
            {is404
              ? "Die von Ihnen gesuchte Seite existiert nicht oder wurde verschoben."
              : "Entschuldigung, es ist ein unerwarteter Fehler aufgetreten."}
          </p>

          <div className="mb-6 p-4 bg-gray-100 rounded-md border border-gray-200">
            <p className="text-sm text-gray-800">
              <span className="font-semibold block">
                Technische Informationen:
              </span>
              <span className="text-gray-600">
                {error?.statusText || error?.message || location.pathname}
              </span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={goBack}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
            >
              Zurück
            </button>
            <Link
              to="/"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
            >
              Zur Startseite
            </Link>
            <Link
              to="/kontakt"
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-center font-medium hover:bg-gray-50 transition-colors"
            >
              Support
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Die Plattform für Getränkeprofis - Austausch, Netzwerk und
            Geschäftschancen.
          </p>
        </div>
      </div>
    </div>
  );
}
