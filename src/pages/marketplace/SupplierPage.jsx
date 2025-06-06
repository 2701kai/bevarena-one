import React from "react";
import { Link } from "react-router-dom";

const suppliers = [
  {
    id: 1,
    name: "ALZMETALL GmbH & Co. KG",
    showroom: "ALZMETALL",
    type: "Hersteller",
    followers: 287,
    address: "Harald-Friedrich-Straße 2-8",
    city: "83352 Altenmarkt",
    country: "DE",
    logo: "/images/deaflephant_sophisticated_spaceships_intricate_mechanical_det_9f9d7cc4-7ffa-46f1-92e7-48b447999e44_1.png",
    products: 10,
  },
  {
    id: 2,
    name: "BLM GROUP Deutschland GmbH",
    showroom: "BLM GROUP",
    type: "Hersteller, Händler, Dienstleister",
    followers: 230,
    address: "Alfred Nobel Str. 8A",
    city: "59423 Unna",
    country: "DE",
    logo: "/images/deaflephant_a_tiny_lone_spaceships_in_space_gloomy_dark_few_s_e5912243-2eb2-403c-ba06-a25560de9520_2.png",
    products: 19,
  },
  {
    id: 3,
    name: "Blum-Novotest GmbH",
    showroom: "Blum-Novotest",
    type: "Hersteller",
    followers: 96,
    address: "Kaufstraße 14",
    city: "88287 Grünkraut",
    country: "DE",
    logo: "/images/deaflephant_lone_metallic_spaceships_detailed_hull_texture_fl_d2b385a7-c133-4e16-a5aa-12123560e8b5_0.png",
    products: 42,
  },
  {
    id: 4,
    name: "CERATIZIT Deutschland GmbH",
    showroom: "CERATIZIT Deutschland",
    type: "Hersteller",
    followers: 386,
    address: "Zeppelinstraße 12",
    city: "87437 Kempten",
    country: "DE",
    logo: "/images/u9944856855_POV_of_a_commander_inside_a_minimalistic_and_futu_0fe5e36b-8862-4030-8c20-95564bdbdcd9_0.png",
    products: 101,
  },
];

export default function SupplierPage() {
  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/deaflephant_sleek_interstellar_spaceships_weathered_hull_emer_d61e0090-2a3f-49e1-a806-6a96d2f14854_1.png"
            alt="Supplier Background"
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
              Die Anbieterrecherche für die Fertigungsindustrie
            </h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Suchen Sie gezielt nach 6931 Firmen in 2184 Produktkategorien
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nach Branchenbereich filtern
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Alle Branchen</option>
              <option>Werkzeugmaschinen</option>
              <option>Robotik & Automation</option>
              <option>Additive Fertigung</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sortieren nach Mitgliedslevel
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Alle Level</option>
              <option>Premium Plus</option>
              <option>Premium</option>
              <option>Classic</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nach Firmenname filtern
            </label>
            <input
              type="text"
              placeholder="Firmenname eingeben..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {[
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
          ].map((letter) => (
            <Link
              key={letter}
              to={`/marketplace/supplier?letter=${letter}`}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-blue-50 hover:text-blue-700 hover:border-blue-500 transition"
            >
              {letter}
            </Link>
          ))}
        </div>

        <div className="text-right text-gray-600 mb-2">
          6930 Anbieter gefunden
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white rounded-lg shadow overflow-hidden border border-gray-200"
          >
            <div className="p-4 flex justify-between items-start">
              <div className="w-16 h-16 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                <img
                  src={supplier.logo}
                  alt={supplier.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="text-sm text-gray-500 flex items-center">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                {supplier.followers} Follower
              </span>
            </div>

            <div className="px-4 pb-4">
              <h3 className="font-bold text-blue-700">{supplier.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Showroom: {supplier.showroom}
              </p>
              <div className="bg-blue-50 text-xs text-blue-800 px-2 py-1 rounded inline-block mb-3">
                {supplier.type}
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 mt-0.5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {supplier.address}
                    <br />
                    {supplier.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-3 flex justify-between items-center bg-gray-50">
              <div>
                <span className="text-sm font-medium">
                  {supplier.products} Produkte
                </span>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-700 hover:text-blue-900 font-medium flex items-center">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Nachricht
                </button>
                <button className="text-sm text-blue-700 hover:text-blue-900 font-medium flex items-center">
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
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  Showroom
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
