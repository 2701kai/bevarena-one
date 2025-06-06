import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/NavBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/bevarena-logo.png"
              alt="BevArena Logo"
              className="h-10"
            />
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:block text-right text-xs">
              <div className="text-blue-700">602.605 aktive Mitglieder*</div>
              <div className="text-gray-600">4.372 Besucher online*</div>
            </div>
            <div className="flex gap-2 items-center">
              <button className="bg-blue-100 text-blue-700 text-sm px-3 py-1 border border-blue-200 rounded">
                NEUES KONTO ERSTELLEN
              </button>
              <button className="bg-white text-blue-700 text-sm px-3 py-1 border border-blue-200 rounded">
                EINLOGGEN
              </button>
              <div className="ml-2 relative group">
                <img
                  src="/images/masterkein_707_A_creative_young_professional_in_Disney_Pixar_3D_3baaec47-907e-4e36-8dd9-8faeb4a3afc8.png"
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 cursor-pointer"
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Mein Profil
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Einstellungen
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Nachrichten
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    Abmelden
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <NavBar />

      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <div className="w-2/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Suchbegriff eingeben ..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
