import React from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:w-1/4">
            <div className="mb-4">
              <Logo size="large" linkTo="/" />
            </div>
            <p className="text-sm">
              Die Plattform für Getränkeprofis - Austausch, Netzwerk und
              Geschäftschancen.
            </p>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Über BevArena</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/unternehmen"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Unternehmen
                  </Link>
                </li>
                <li>
                  <Link
                    to="/impressum"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link
                    to="/datenschutz"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Datenschutz
                  </Link>
                </li>
                <li>
                  <Link to="/agb" className="text-gray-600 hover:text-blue-700">
                    AGB
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Kundenservice</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-blue-700">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kontakt"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hilfe"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Hilfe
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Business</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/newsroom"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Newsroom
                  </Link>
                </li>
                <li>
                  <Link
                    to="/karriere"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Karriere
                  </Link>
                </li>
                <li>
                  <Link
                    to="/werbung"
                    className="text-gray-600 hover:text-blue-700"
                  >
                    Werbung
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold mb-2">Folgen Sie uns</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm">© 2025 BevArena — All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
