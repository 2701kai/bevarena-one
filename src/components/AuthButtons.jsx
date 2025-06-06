import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import Logo from "./Logo";

/**
 * Authentication buttons component
 * Displays login and register buttons with user profile icon
 * Uses Context7 best practices with React 19
 */
export default function AuthButtons() {
  // We could add authentication state here in a real app
  const isAuthenticated = false;
  const userName = null;

  // If user is logged in, show profile button
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-700 hidden md:block">
          Willkommen, {userName || "Benutzer"}
        </span>
        <div className="relative group">
          <Logo size="small" variant="user" linkTo={null} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Mein Profil
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Einstellungen
            </Link>
            <Link
              to="/messages"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Nachrichten
            </Link>
            <button
              onClick={() => console.log("Logout clicked")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Abmelden
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show login/register buttons
  return (
    <div className="flex items-center space-x-2">
      <Button variant="accent" size="medium" to="/register">
        NEUES KONTO ERSTELLEN
      </Button>
      <Button variant="secondary" size="medium" to="/login">
        EINLOGGEN
      </Button>
      <div className="ml-2">
        <Logo size="small" variant="user" linkTo={null} />
      </div>
    </div>
  );
}
