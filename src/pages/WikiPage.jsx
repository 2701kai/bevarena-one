import React, { useState } from "react";

const categories = [
  {
    name: "Werkzeugmaschine",
    count: 151,
    img: "/images/deaflephant_a_tiny_lone_spaceships_in_space_gloomy_dark_few_s_e5912243-2eb2-403c-ba06-a25560de9520_1.png",
    slug: "werkzeugmaschine",
  },
  {
    name: "Roboter und Automation",
    count: 16,
    img: "/images/deaflephant_sophisticated_spaceships_intricate_mechanical_det_9f9d7cc4-7ffa-46f1-92e7-48b447999e44_2.png",
    slug: "roboter-automation",
  },
  {
    name: "Additive Fertigung",
    count: 10,
    img: "/images/u9944856855_POV_of_a_commander_inside_a_minimalistic_and_futu_0fe5e36b-8862-4030-8c20-95564bdbdcd9_3.png",
    slug: "additive-fertigung",
  },
];

const featuredArticles = [
  {
    title: "Was ist CNC-Bearbeitung?",
    excerpt:
      "Computergestützte numerische Steuerung (CNC) ist ein Fertigungsverfahren, bei dem vorprogrammierte Computersoftware die Bewegung von Fabrikwerkzeugen und Maschinen steuert.",
    author: "Thomas Schmidt",
    date: "12.05.2025",
    views: 4328,
    img: "/images/Sapucaiu 1.jpg",
    category: "Werkzeugmaschine",
  },
  {
    title: "Einführung in kollaborative Robotik",
    excerpt:
      "Kollaborative Roboter (Cobots) sind speziell für die direkte Zusammenarbeit mit Menschen konzipiert und revolutionieren die moderne Fertigung.",
    author: "Maria Weber",
    date: "03.06.2025",
    views: 2159,
    img: "/images/NuovaSperanzaBeide_dark_10_opaque.jpg",
    category: "Roboter und Automation",
  },
  {
    title: "SLA vs. FDM 3D-Druck: Ein Vergleich",
    excerpt:
      "Stereolithografie (SLA) und Fused Deposition Modeling (FDM) sind zwei der beliebtesten 3D-Drucktechnologien. Welche eignet sich für welchen Anwendungsfall?",
    author: "Martin Bauer",
    date: "28.05.2025",
    views: 1876,
    img: "/images/astro.jpg",
    category: "Additive Fertigung",
  },
];

const recentArticles = [
  {
    title: "5-Achs-Bearbeitung: Vorteile und Anwendungen",
    excerpt:
      "Die 5-Achs-Bearbeitung bietet präzise Fertigungsmöglichkeiten für komplexe Geometrien in einem Arbeitsgang.",
    author: "Michael Schneider",
    date: "25.06.2025",
    views: 347,
    category: "Werkzeugmaschine",
  },
  {
    title: "Machine Learning in der Qualitätskontrolle",
    excerpt:
      "Wie künstliche Intelligenz und maschinelles Lernen die Fertigungsqualität verbessern können.",
    author: "Sandra Klein",
    date: "24.06.2025",
    views: 298,
    category: "Roboter und Automation",
  },
  {
    title: "Materialien für den industriellen 3D-Druck",
    excerpt:
      "Übersicht über neue Materialien und ihre spezifischen Eigenschaften für additive Fertigungsverfahren.",
    author: "Daniel Huber",
    date: "23.06.2025",
    views: 412,
    category: "Additive Fertigung",
  },
  {
    title: "Wartung von CNC-Maschinen",
    excerpt:
      "Bewährte Praktiken für die vorbeugende Wartung von CNC-Maschinen zur Maximierung der Betriebszeit.",
    author: "Stefan Müller",
    date: "22.06.2025",
    views: 531,
    category: "Werkzeugmaschine",
  },
  {
    title: "Industrieroboter programmieren: Grundlagen",
    excerpt:
      "Eine Einführung in die Programmierung von Industrierobotern für Einsteiger.",
    author: "Lisa Wagner",
    date: "21.06.2025",
    views: 378,
    category: "Roboter und Automation",
  },
];

export default function WikiPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter articles based on search term and selected category
  const filteredArticles = recentArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kottbusser_tor_kreuzberg_berlin.jpg"
            alt="Wiki Background"
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
              Willkommen im BevArena Wiki
            </h1>
          </div>
          <p className="text-blue-100 max-w-2xl">
            Die Enzyklopädie für die Fertigungsindustrie. Erklären, entdecken,
            mitmachen – von der Community für die Community.
          </p>
          <div className="mt-4 bg-white rounded-full overflow-hidden shadow flex">
            <input
              type="text"
              placeholder="Suche im Wiki..."
              className="w-full px-4 py-2 focus:outline-none text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 font-medium">
              Suchen
            </button>
          </div>
        </div>
      </div>

      {/* Stats & Create */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="text-gray-700 mb-4 md:mb-0">
            <span className="font-bold text-blue-700">768</span> Artikel wurden
            bereits erstellt! Wir laden auch Sie herzlich ein, mitzumachen.
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Artikel erstellen oder bearbeiten
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Sie möchten wissen, wie Sie neue Fachbegriffe hinzufügen oder
          bestehende Beiträge bearbeiten können? Kein Problem, wir haben alle
          wichtigen Informationen für Sie zusammengefasst.
        </p>
      </div>

      {/* Featured Articles */}
      <div>
        <h2 className="font-bold text-xl mb-4">Empfohlene Artikel</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredArticles.map((article, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <span className="text-xs font-semibold text-blue-700">
                  {article.category}
                </span>
                <h3 className="font-bold text-lg mt-1 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    {article.author} • {article.date}
                  </span>
                  <span>{article.views} Aufrufe</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter & Recent Articles */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold text-lg mb-3">Kategorien</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded ${selectedCategory === "" ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
                >
                  Alle Kategorien
                </button>
              </li>
              {categories.map((cat, i) => (
                <li key={i}>
                  <button
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 rounded flex justify-between items-center ${selectedCategory === cat.name ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-gray-200 rounded-full px-2 py-1">
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-lg">Neueste Artikel</h3>
              {searchTerm || selectedCategory ? (
                <div className="text-sm text-gray-600 mt-1">
                  {filteredArticles.length} Ergebnisse gefunden
                  {selectedCategory && <span> in {selectedCategory}</span>}
                  {searchTerm && <span> für "{searchTerm}"</span>}
                </div>
              ) : null}
            </div>

            {filteredArticles.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredArticles.map((article, i) => (
                  <div key={i} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-blue-700">
                        {article.title}
                      </h4>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {article.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {article.author} • {article.date}
                      </span>
                      <span>{article.views} Aufrufe</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-4 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <p className="text-lg font-semibold mb-1">
                  Keine Artikel gefunden
                </p>
                <p className="text-sm">
                  Versuchen Sie, Ihre Suchkriterien zu ändern oder einen neuen
                  Artikel zu erstellen.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Categories */}
      <div>
        <h2 className="font-bold text-lg mb-4">Top-Kategorien</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow border">
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-blue-700 text-lg mb-1">
                  {cat.name}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                  {cat.count} Artikel
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
