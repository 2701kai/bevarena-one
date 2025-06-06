import React from "react";
import { Link } from "react-router-dom";

export default function WelcomePage() {
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-10 flex flex-col items-center justify-center min-h-[400px] text-white overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/deaflephant_sophisticated_spaceships_intricate_mechanical_det_9f9d7cc4-7ffa-46f1-92e7-48b447999e44_2.png"
            alt="OrderMatch Welcome Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-blue-700 opacity-90"></div>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/images/logo-icon-large.png"
              alt="BevArena Logo"
              className="h-16 mr-4"
            />
            <h1 className="text-4xl md:text-5xl font-bold">ORDERMATCH®</h1>
          </div>
          <p className="text-xl mb-8 text-blue-100">
            Willkommen im effizienten Auftragsmarktplatz für die
            Fertigungsindustrie. Verbinden Sie sich mit den richtigen Partnern,
            um Ihre Fertigungskapazitäten optimal auszulasten oder die perfekten
            Zulieferer für Ihre Projekte zu finden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ordermatch"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
            >
              Zum Auftragsmarktplatz
            </Link>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition border border-blue-400 shadow-lg">
              Jetzt registrieren
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-blue-600 relative">
            <img
              src="/images/liamwinston__A_post-apocalyptic_desert_landscape_inspired_by__edad6941-fdb2-45b6-ad75-48ae56a5b4c4_1.png"
              alt="Für Einkäufer"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Für Einkäufer</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Kostenfreie Anfragen:
                  </strong>{" "}
                  Stellen Sie unverbindlich Anfragen für Ihre
                  Fertigungsprojekte.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Direkter Kontakt zu Anbietern:
                  </strong>{" "}
                  Kommunizieren Sie ohne Umwege mit den Fertigungsunternehmen.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Intelligentes Matching:
                  </strong>{" "}
                  Algorithmischer Abgleich Ihrer Anforderungen mit den passenden
                  Anbietern.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Vergleichbare Angebote:
                  </strong>{" "}
                  Erhalten Sie mehrere qualifizierte Angebote für Ihre Projekte.
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/ordermatch"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Anfrage stellen
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 bg-blue-800 relative">
            <img
              src="/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_15246666-8314-4b33-9201-23e58baa5dd8_2.png"
              alt="Für Zulieferer"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Für Zulieferer</h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Neue Aufträge finden:
                  </strong>{" "}
                  Entdecken Sie täglich neue Anfragen, die zu Ihren
                  Fertigungsmöglichkeiten passen.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Kapazitäten auslasten:
                  </strong>{" "}
                  Optimieren Sie Ihre Produktionsauslastung mit zusätzlichen
                  Aufträgen.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Matching-Algorithmus:
                  </strong>{" "}
                  Automatische Benachrichtigung bei passenden Aufträgen für Ihre
                  Fertigung.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  <strong className="font-semibold">
                    Direkter Kundenkontakt:
                  </strong>{" "}
                  Kommunizieren Sie ohne Zwischenhändler direkt mit dem
                  Auftraggeber.
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                to="/ordermatch"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
              >
                Anbieter werden
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-8">
          So funktioniert ORDERMATCH®
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-bold text-lg mb-2">Anfrage stellen</h3>
            <p className="text-gray-600">
              Beschreiben Sie Ihren Bedarf mit allen relevanten technischen
              Details.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-bold text-lg mb-2">Angebote erhalten</h3>
            <p className="text-gray-600">
              Qualifizierte Zulieferer werden automatisch benachrichtigt und
              reichen Angebote ein.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-bold text-lg mb-2">Angebote vergleichen</h3>
            <p className="text-gray-600">
              Vergleichen Sie die eingegangenen Angebote nach Preis, Lieferzeit
              und Qualität.
            </p>
          </div>
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 className="font-bold text-lg mb-2">Auftrag vergeben</h3>
            <p className="text-gray-600">
              Wählen Sie den besten Anbieter aus und wickeln Sie den Auftrag
              direkt ab.
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/ordermatch"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md"
          >
            Jetzt starten
          </Link>
        </div>
      </div>
    </div>
  );
}
