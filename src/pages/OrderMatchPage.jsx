import React, { useState } from "react";

const jobOrders = [
  {
    id: "OM-82914",
    title: "CNC-Frästeile nach Zeichnung",
    description:
      "Fertigung von Präzisionsteilen aus Aluminium nach Kundenzeichnung. Toleranzen nach ISO 2768-mK.",
    material: "Aluminium 6082",
    quantity: "500 Stück",
    deadline: "30.07.2025",
    location: "Raum Stuttgart",
    status: "Offen",
    date: "24.06.2025",
    bids: 3,
  },
  {
    id: "OM-82799",
    title: "Drehen von Wellen aus 1.4301",
    description:
      "Drehteile nach Zeichnung aus Edelstahl, Ø 18mm, Länge 120mm, inkl. Gewinde M12.",
    material: "Edelstahl 1.4301",
    quantity: "200 Stück",
    deadline: "15.08.2025",
    location: "Köln",
    status: "Offen",
    date: "22.06.2025",
    bids: 5,
  },
  {
    id: "OM-82655",
    title: "Laserschneiden von Blechteilen",
    description:
      "Laserschneiden von Blechteilen nach DXF-Datei, 2mm Blechstärke.",
    material: "Stahlblech DC01",
    quantity: "1000 Stück",
    deadline: "10.07.2025",
    location: "Berlin",
    status: "Offen",
    date: "20.06.2025",
    bids: 7,
  },
];

const featuresForBuyers = [
  {
    title: "Kostenfreie Auftragsvergabe",
    description:
      "Platzieren Sie Ihre Anfragen ohne Kosten und erhalten Sie schnell qualifizierte Angebote.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6v12m-8-6h16"
        />
      </svg>
    ),
  },
  {
    title: "Qualifizierte Anbieter",
    description:
      "Alle Anbieter im Netzwerk sind verifiziert und nach Kompetenzen kategorisiert.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Anonyme Anfragen",
    description:
      "Stellen Sie Ihre Anfragen optional anonym, um Marktpreise unvoreingenommen zu erhalten.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
];

const featuresForSuppliers = [
  {
    title: "Neue Aufträge finden",
    description:
      "Durchsuchen Sie täglich neue Aufträge passend zu Ihren Fertigungsmöglichkeiten.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    title: "Direkter Kundenkontakt",
    description:
      "Kommunizieren Sie direkt mit den Auftraggebern ohne Vermittlungsgebühren.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Kapazitäten auslasten",
    description:
      "Füllen Sie freie Produktionskapazitäten mit passenden Aufträgen aus dem Netzwerk.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-10 h-10"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
        />
      </svg>
    ),
  },
];

export default function OrderMatchPage() {
  const [activeTab, setActiveTab] = useState("buyer");

  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/here_kitty_kitty_Fine_grain_photograph_of_two_blurred_figures_f672a016-34a2-4300-ab8b-c1a62b8b3f6c_2.png"
            alt="OrderMatch Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-blue-700 opacity-80"></div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <img
              src="/images/logo-icon-medium.png"
              alt="BevArena Logo"
              className="h-10 mr-3"
            />
            <h1 className="text-3xl font-bold">ORDERMATCH®</h1>
          </div>
          <p className="mb-4 max-w-2xl text-center">
            Netzwerke bilden und Aufträge generieren. Finden oder platzieren Sie
            unverbindlich Aufträge und nutzen Sie den automatischen Abgleich der
            Fertigungsprozesse für effizientes Auftragsmanagement.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-blue-700 font-semibold px-6 py-2 rounded shadow hover:bg-blue-100 transition">
              Auftrag platzieren
            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition">
              Aufträge suchen
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          className={`py-3 px-6 font-semibold border-b-2 ${
            activeTab === "buyer"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("buyer")}
        >
          Für Einkäufer
        </button>
        <button
          className={`py-3 px-6 font-semibold border-b-2 ${
            activeTab === "supplier"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("supplier")}
        >
          Für Zulieferer
        </button>
        <button
          className={`py-3 px-6 font-semibold border-b-2 ${
            activeTab === "how"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("how")}
        >
          So funktioniert&apos;s
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "buyer" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {featuresForBuyers.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">Neuste Aufträge</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  Alle anzeigen →
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {jobOrders.map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-bold text-blue-700">{job.title}</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {job.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500 mb-2">
                      <div>
                        <span className="font-semibold block">Material:</span>
                        {job.material}
                      </div>
                      <div>
                        <span className="font-semibold block">Menge:</span>
                        {job.quantity}
                      </div>
                      <div>
                        <span className="font-semibold block">
                          Lieferfrist:
                        </span>
                        {job.deadline}
                      </div>
                      <div>
                        <span className="font-semibold block">Standort:</span>
                        {job.location}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">
                        Eingestellt am {job.date}
                      </span>
                      <span className="text-blue-700">{job.bids} Angebote</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "supplier" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              {featuresForSuppliers.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="font-bold text-lg mb-2">
                Ihre Fertigungsmöglichkeiten registrieren
              </h2>
              <p className="text-gray-700 mb-4">
                Hinterlegen Sie Ihre Fertigungsmöglichkeiten in Ihrem Profil und
                erhalten Sie automatisch passende Auftragsvorschläge. Unser
                intelligenter Algorithmus gleicht Ihre Kapazitäten mit den
                Anforderungen der Auftraggeber ab.
              </p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded shadow hover:bg-blue-800 transition">
                Fertigungsprofil anlegen
              </button>
            </div>
          </div>
        )}

        {activeTab === "how" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold text-lg mb-4">
                So funktioniert ORDERMATCH®
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="font-bold mb-2">Auftrag platzieren</h3>
                  <p className="text-gray-600 text-sm">
                    Beschreiben Sie Ihren Auftrag mit allen relevanten Details
                    wie Material, Menge, Lieferfrist und technischen
                    Anforderungen.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="font-bold mb-2">Angebote erhalten</h3>
                  <p className="text-gray-600 text-sm">
                    Qualifizierte Zulieferer erhalten automatisch eine
                    Benachrichtigung und können direkt Angebote einreichen.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="font-bold mb-2">Auftrag vergeben</h3>
                  <p className="text-gray-600 text-sm">
                    Vergleichen Sie die Angebote, kommunizieren Sie direkt mit
                    den Anbietern und vergeben Sie den Auftrag an den besten
                    Anbieter.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-2">
                Häufig gestellte Fragen
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <h4 className="font-semibold text-blue-700">
                    Welche Kosten entstehen bei der Nutzung?
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Die Grundfunktionen von ORDERMATCH® sind kostenfrei.
                    Premium-Funktionen stehen Mitgliedern mit
                    Business-Abonnement zur Verfügung.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700">
                    Wie wird die Qualität der Anbieter sichergestellt?
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Alle Anbieter durchlaufen einen Verifizierungsprozess. Zudem
                    können Auftraggeber Bewertungen und Feedback hinterlassen.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700">
                    Wie funktioniert der Matching-Algorithmus?
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Der Algorithmus berücksichtigt die technischen Anforderungen
                    des Auftrags und gleicht diese mit den
                    Fertigungsmöglichkeiten der Anbieter ab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
