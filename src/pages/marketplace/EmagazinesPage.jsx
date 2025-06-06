import React from "react";

export default function EmagazinesPage() {
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/here_kitty_kitty_Fine_grain_photograph_of_two_blurred_figures_f672a016-34a2-4300-ab8b-c1a62b8b3f6c_2.png"
            alt="Emagazines Background"
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
            <h1 className="text-2xl md:text-3xl font-bold">
              IndustryArena eMagazine
            </h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Das Fachmagazin für Fertigungstechnik und Automatisierung.
            Hochwertige redaktionelle Inhalte, die Nachrichten und Informationen
            zum Erlebnis werden lassen.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={`/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_${i % 2 === 0 ? "15246666-8314-4b33-9201-23e58baa5dd8_0" : "7bbc6174-098b-4fdb-9575-9840832e018e_0"}.png`}
              alt={`Magazine ${i}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">
                Ausgabe {Math.floor(Math.random() * 20) + 1}/2025
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Technologie-Highlights für praktische Anwendungen in der
                Fertigungsindustrie.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 50) + 20} Seiten
                </span>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Zum eMagazine
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
