import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Logo from "./Logo";

/**
 * Authentication buttons component
 * Displays login and register buttons with user profile icon
 * Uses Context7 best practices with React 19
 */
export default function AuthButtons() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If user is logged in, show profile button
  if (isAuthenticated) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-700 hidden md:block">
          Willkommen, {user?.name || user?.username || "Benutzer"}
        </span>
        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-haspopup="true"
          >
            <Logo size="small" variant="user" linkTo={null} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Mein Profil
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Einstellungen
              </Link>
              <Link
                to="/messages"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Nachrichten
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
              >
                Abmelden
              </button>
            </div>
          )}
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
