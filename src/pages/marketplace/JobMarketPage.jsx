import React from "react";

const jobs = [
  {
    id: 1,
    title: "Ausbildung zum Mechatroniker (m/w/d) ab September 2026",
    company: "MAPAL Dr. Kress KG Fabrik für Präzisionswerkzeuge",
    location: "73431 Aalen",
    date: "01.05.2025",
  },
  {
    id: 2,
    title: "Ausbildung Mechatroniker (m/w/d)",
    company: "SWE Energie GmbH",
    location: "99084 Erfurt",
    date: "06.06.2025",
  },
  {
    id: 3,
    title: "CNC-Programmierer / Zerspanungsmechaniker (m/w/d)",
    company: "ALROKO GmbH & Co. KG",
    location: "58644 Iserlohn",
    date: "30.05.2025",
  },
  {
    id: 4,
    title: "Fachkraft für Lagerlogistik (m/w/d)",
    company: "August Steinmeyer GmbH & Co. KG",
    location: "78713 Schramberg",
    date: "28.05.2025",
  },
  {
    id: 5,
    title: "Produktionsplaner (m/w/d) für den Bereich Drehen",
    company: "Schwäbische Werkzeugmaschinen GmbH",
    location: "78713 Schramberg",
    date: "24.05.2025",
  },
  {
    id: 6,
    title: "Technischer Einkäufer (m/w/d)",
    company: "CHIRON Group SE",
    location: "78532 Tuttlingen",
    date: "20.05.2025",
  },
];

export default function JobMarketPage() {
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/creative-thinking.jpg"
            alt="Job Market Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-700 opacity-80"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <img
              src="/images/logo-icon-medium.png"
              alt="BevArena Logo"
              className="h-8 mr-3"
            />
            <h1 className="text-2xl md:text-3xl font-bold">4278 Jobangebote</h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Der Stellenmarkt für Fachkräfte und Führungskräfte der
            Fertigungsindustrie
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="font-bold text-lg mb-4">Jobsuche</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Titel / Beruf / Firma"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="PLZ oder Ort"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>25 km</option>
                  <option>50 km</option>
                  <option>100 km</option>
                  <option>Alle</option>
                </select>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex-1">
                  Suchen
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Aktuelle Stellenangebote</h3>
              <button className="text-blue-600 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50">
                Stellenanzeige schalten
              </button>
            </div>
            <div className="divide-y divide-gray-100">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 hover:bg-gray-50">
                  <a href="#" className="block">
                    <h4 className="font-semibold text-blue-700 hover:underline mb-1">
                      {job.title}
                    </h4>
                    <p className="text-gray-700 mb-2">{job.company}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.location}
                      </div>
                      <span>{job.date}</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                Alle Stellenangebote anzeigen
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <h3 className="font-bold text-lg text-blue-800 mb-2">
                Kombi-Angebot zum Top-Preis!
              </h3>
              <p className="text-blue-700 font-semibold mb-2">
                Bis zu 50% Rabatt
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <img
                  src="/images/here_kitty_kitty_Fine_grain_photograph_of_two_blurred_figures_f672a016-34a2-4300-ab8b-c1a62b8b3f6c_1.png"
                  alt="Partner 1"
                  className="w-full h-12 object-contain bg-white p-1 rounded"
                />
                <img
                  src="/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_7bbc6174-098b-4fdb-9575-9840832e018e_3.png"
                  alt="Partner 2"
                  className="w-full h-12 object-contain bg-white p-1 rounded"
                />
                <img
                  src="/images/deaflephant_lone_metallic_spaceships_detailed_hull_texture_fl_d2b385a7-c133-4e16-a5aa-12123560e8b5_0.png"
                  alt="Partner 3"
                  className="w-full h-12 object-contain bg-white p-1 rounded"
                />
                <img
                  src="/images/logo-icon-extra-large.png"
                  alt="Partner 4"
                  className="w-full h-12 object-contain bg-white p-1 rounded"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
                Jetzt informieren
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-3">Finden Sie Jobs nach</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Berufsbild</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      CNC-Fachkraft (124)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Mechatroniker (86)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Industriemechaniker (74)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Konstrukteur (58)
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Region</h4>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Baden-Württemberg (853)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Bayern (742)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Nordrhein-Westfalen (681)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Hessen (389)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
