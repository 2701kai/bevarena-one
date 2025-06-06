import React, { useState } from "react";

const mediaCategories = [
  { id: "all", name: "Alle Medien" },
  { id: "videos", name: "Videos" },
  { id: "webinars", name: "Webinare" },
  { id: "ebooks", name: "eBooks & Guides" },
  { id: "press", name: "Pressemitteilungen" },
];

const mediaItems = [
  {
    id: 1,
    title: "Industrie 4.0: Die Zukunft der Fertigung",
    type: "video",
    thumbnail: "/images/Sapucaiu 1.jpg",
    duration: "18:24",
    views: 4526,
    date: "12.06.2025",
    description:
      "Ein umfassender Überblick über die neuesten Trends und Technologien in der Industrie 4.0 und wie sie die Fertigungslandschaft verändern.",
    featured: true,
  },
  {
    id: 2,
    title: "Optimierung von Zerspanungsprozessen",
    type: "webinar",
    thumbnail: "/images/astro.jpg",
    duration: "47:12",
    views: 2187,
    date: "05.06.2025",
    description:
      "Experten diskutieren fortschrittliche Techniken zur Optimierung von Zerspanungsprozessen für höhere Effizienz und Qualität.",
    featured: true,
  },
  {
    id: 3,
    title: "KI in der Qualitätssicherung",
    type: "video",
    thumbnail: "/images/kottbusser_tor_kreuzberg_berlin.jpg",
    duration: "12:47",
    views: 3251,
    date: "28.05.2025",
    description:
      "Wie künstliche Intelligenz und maschinelles Lernen die Qualitätssicherung in der Fertigung revolutionieren.",
    featured: false,
  },
  {
    id: 4,
    title: "Additive Fertigung: Leitfaden 2025",
    type: "ebook",
    thumbnail: "/images/NuovaSperanzaBeide_dark_10_opaque.jpg",
    pages: 78,
    downloads: 1245,
    date: "15.05.2025",
    description:
      "Umfassender Leitfaden zu additiven Fertigungstechnologien, Materialien und Anwendungsfällen für 2025.",
    featured: true,
  },
  {
    id: 5,
    title: "BevArena kooperiert mit führenden Technologieanbietern",
    type: "press",
    date: "02.06.2025",
    description:
      "BevArena gibt strategische Partnerschaften mit führenden Technologieanbietern bekannt, um das Angebot für die Fertigungsindustrie zu erweitern.",
    featured: false,
  },
  {
    id: 6,
    title: "CNC-Programmierung für Einsteiger",
    type: "webinar",
    thumbnail:
      "/images/liamwinston__A_post-apocalyptic_desert_landscape_inspired_by__59409d79-00f2-4c11-8999-8fc9e40330c2_0.png",
    duration: "64:32",
    views: 1872,
    date: "22.05.2025",
    description:
      "Ein einführendes Webinar in die grundlegenden Konzepte und Techniken der CNC-Programmierung für Anfänger.",
    featured: false,
  },
  {
    id: 7,
    title: "Nachhaltige Fertigung: Strategien und Praktiken",
    type: "video",
    thumbnail:
      "/images/deaflephant_sophisticated_spaceships_intricate_mechanical_det_9f9d7cc4-7ffa-46f1-92e7-48b447999e44_1.png",
    duration: "21:15",
    views: 1953,
    date: "18.05.2025",
    description:
      "Erfahren Sie, wie Unternehmen ihre Fertigungsprozesse nachhaltiger gestalten können, um Umweltauswirkungen zu reduzieren und Effizienz zu steigern.",
    featured: false,
  },
  {
    id: 8,
    title: "Industrie-Robotik: Best Practices Guide",
    type: "ebook",
    thumbnail:
      "/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_15246666-8314-4b33-9201-23e58baa5dd8_0.png",
    pages: 124,
    downloads: 978,
    date: "10.05.2025",
    description:
      "Umfassender Leitfaden zu Best Practices in der Industrierobotik, einschließlich Integration, Programmierung und Wartung.",
    featured: false,
  },
];

const downloadDocs = [
  {
    id: 1,
    title: "BevArena Mediadaten 2025",
    type: "pdf",
    size: "2,6 MB",
    pages: 32,
    thumbnail:
      "/images/u9944856855_POV_of_a_commander_inside_a_minimalistic_and_futu_0fe5e36b-8862-4030-8c20-95564bdbdcd9_0.png",
    featured: true,
  },
  {
    id: 2,
    title: "Technische Spezifikationen",
    type: "pdf",
    size: "4,1 MB",
    pages: 48,
    thumbnail:
      "/images/deaflephant_a_tiny_lone_spaceships_in_space_gloomy_dark_few_s_e5912243-2eb2-403c-ba06-a25560de9520_0.png",
    featured: false,
  },
  {
    id: 3,
    title: "Whitepaper: Digitale Transformation",
    type: "pdf",
    size: "1,8 MB",
    pages: 24,
    thumbnail:
      "/images/beamg_spaceships_open_the_door_and_welcome_major_tom_to_go_wi_67f4fbf4-19b2-4d7b-8d5e-97e0a973d4c4_0.png",
    featured: false,
  },
];

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter media items based on active category and search term
  const filteredMedia = mediaItems.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.type === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured media items
  const featuredMedia = mediaItems.filter((item) => item.featured);

  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/NuovaSperanzaBeide_dark_10_opaque.jpg"
            alt="Media Center Background"
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
              BevArena Media Center
            </h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Entdecken Sie unsere umfangreiche Sammlung an Videos, Webinaren,
            eBooks und mehr. Alle Inhalte sind für unsere Community optimiert
            und bieten wertvolle Einblicke in die Fertigungsindustrie.
          </p>
        </div>
        <img
          src="/images/logo-icon-large.png"
          alt="Media Center"
          className="relative z-10 h-24 w-24"
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Suchen Sie nach Videos, Webinaren, eBooks..."
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {mediaCategories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Media */}
      {featuredMedia.length > 0 && (
        <div>
          <h2 className="font-bold text-xl mb-4">Empfohlene Medien</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {item.thumbnail && (
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    {item.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </span>
                    )}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-blue-600/80 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        item.type === "video"
                          ? "bg-red-100 text-red-800"
                          : item.type === "webinar"
                            ? "bg-purple-100 text-purple-800"
                            : item.type === "ebook"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "video"
                        ? "Video"
                        : item.type === "webinar"
                          ? "Webinar"
                          : item.type === "ebook"
                            ? "eBook"
                            : item.type === "press"
                              ? "Pressemitteilung"
                              : item.type}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    {item.views && (
                      <span>{item.views.toLocaleString()} Aufrufe</span>
                    )}
                    {item.downloads && (
                      <span>{item.downloads.toLocaleString()} Downloads</span>
                    )}
                    {item.pages && <span>{item.pages} Seiten</span>}
                    {!item.views && !item.downloads && !item.pages && (
                      <span>&nbsp;</span>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      {item.type === "ebook" ? "Herunterladen" : "Ansehen"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Library */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl">Medienbibliothek</h2>
          {filteredMedia.length > 0 && searchTerm && (
            <p className="text-sm text-gray-600">
              {filteredMedia.length} Ergebnisse für &quot;{searchTerm}&quot;
            </p>
          )}
        </div>

        {filteredMedia.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {item.thumbnail && (
                  <div className="relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    {item.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {item.duration}
                      </span>
                    )}
                    {(item.type === "video" || item.type === "webinar") && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-blue-600/80 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${
                        item.type === "video"
                          ? "bg-red-100 text-red-800"
                          : item.type === "webinar"
                            ? "bg-purple-100 text-purple-800"
                            : item.type === "ebook"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {item.type === "video"
                        ? "Video"
                        : item.type === "webinar"
                          ? "Webinar"
                          : item.type === "ebook"
                            ? "eBook"
                            : item.type === "press"
                              ? "Pressemitteilung"
                              : item.type}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    {item.views && (
                      <span>{item.views.toLocaleString()} Aufrufe</span>
                    )}
                    {item.downloads && (
                      <span>{item.downloads.toLocaleString()} Downloads</span>
                    )}
                    {item.pages && <span>{item.pages} Seiten</span>}
                    {!item.views && !item.downloads && !item.pages && (
                      <span>&nbsp;</span>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      {item.type === "ebook" || item.type === "press"
                        ? "Herunterladen"
                        : "Ansehen"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            <h3 className="font-bold text-lg mb-2">Keine Medien gefunden</h3>
            <p className="text-gray-600">
              Bitte passen Sie Ihre Suchkriterien an oder wählen Sie eine andere
              Kategorie.
            </p>
          </div>
        )}
      </div>

      {/* Downloads Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold text-xl mb-4">Downloads</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {downloadDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg"
            >
              <img
                src={doc.thumbnail}
                alt={doc.title}
                className="w-20 h-28 object-cover rounded shadow"
              />
              <div>
                <h3 className="font-bold mb-1">{doc.title}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{doc.pages} Seiten</p>
                  <p>{doc.size}</p>
                </div>
                <button className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
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
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
