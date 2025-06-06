import React, { useState } from "react";

const companies = [
  {
    id: 1,
    name: "Autodesk",
    rank: 1,
    logo: "/images/deaflephant_sleek_interstellar_spaceships_weathered_hull_emer_d61e0090-2a3f-49e1-a806-6a96d2f14854_2.png",
    index: 2,
    trend: "stable",
  },
  {
    id: 2,
    name: "Alfred Kärcher",
    rank: 2,
    logo: "/images/u9944856855_POV_of_a_commander_inside_a_minimalistic_and_futu_0fe5e36b-8862-4030-8c20-95564bdbdcd9_2.png",
    index: 2,
    trend: "stable",
  },
  {
    id: 3,
    name: "Robert Bosch",
    rank: 3,
    logo: "/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_15246666-8314-4b33-9201-23e58baa5dd8_3.png",
    index: 2,
    trend: "stable",
  },
  {
    id: 4,
    name: "DMG MORI",
    rank: 4,
    logo: "/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_7bbc6174-098b-4fdb-9575-9840832e018e_3.png",
    index: 1,
    trend: "stable",
  },
  {
    id: 5,
    name: "HEIDENHAIN",
    rank: 1,
    logo: "/images/deaflephant_advanced_spaceships_intricate_surface_details_sus_69094cf0-6501-4079-bc4d-dd5674ccdffb_3.png",
    index: 2,
    trend: "stable",
    channel: "industryarena",
  },
  {
    id: 6,
    name: "Siemens",
    rank: 2,
    logo: "/images/beamg_spaceships_open_the_door_and_welcome_major_tom_to_go_wi_67f4fbf4-19b2-4d7b-8d5e-97e0a973d4c4_0.png",
    index: 2,
    trend: "stable",
    channel: "industryarena",
  },
  {
    id: 7,
    name: "DMG MORI",
    rank: 3,
    logo: "/images/here_kitty_kitty_Fine_grain_photograph_of_a_a_tiny_lone_space_7bbc6174-098b-4fdb-9575-9840832e018e_3.png",
    index: 2,
    trend: "stable",
    channel: "industryarena",
  },
  {
    id: 8,
    name: "FANUC",
    rank: 4,
    logo: "/images/deaflephant_lone_metallic_spaceships_detailed_hull_texture_fl_d2b385a7-c133-4e16-a5aa-12123560e8b5_1.png",
    index: 1,
    trend: "stable",
    channel: "industryarena",
  },
];

export default function SocialMediaRankingPage() {
  const [activeChannel, setActiveChannel] = useState("all");

  const filteredCompanies =
    activeChannel === "all"
      ? companies.filter((c) => !c.channel)
      : companies.filter((c) => c.channel === activeChannel);

  return (
    <div className="space-y-8">
      <div className="relative rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/liamwinston__A_post-apocalyptic_desert_landscape_inspired_by__edad6941-fdb2-45b6-ad75-48ae56a5b4c4_1.png"
            alt="Social Media Ranking Background"
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
              Social-Media-Ranking
            </h1>
          </div>
          <p className="text-blue-100 max-w-xl">
            Das Social-Media-Ranking bietet Ihnen einen tagesaktuellen Überblick
            über die Unternehmensaktivitäten in den entscheidenden sozialen
            Netzwerken, wie Facebook, X, Google+, YouTube und IndustryArena.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategorie
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Alle Hauptkategorien</option>
              <option>Werkzeugmaschinen</option>
              <option>Robotik & Automation</option>
              <option>Additive Fertigung</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Region
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Anbieter weltweit</option>
              <option>Deutschland</option>
              <option>Europa</option>
              <option>International</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sortierung
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Sortiert nach Social Media Rank</option>
              <option>Sortiert nach Name</option>
              <option>Sortiert nach Trend</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveChannel("all")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Gesamt
          </button>
          <button
            onClick={() => setActiveChannel("industryarena")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "industryarena"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <img
              src="/images/logo-icon-small.png"
              alt="IndustryArena"
              className="h-5 w-5"
            />
            IndustryArena
          </button>
          <button
            onClick={() => setActiveChannel("facebook")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "facebook"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
            Facebook
          </button>
          <button
            onClick={() => setActiveChannel("instagram")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "instagram"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Instagram
          </button>
          <button
            onClick={() => setActiveChannel("x")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "x"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
            X
          </button>
          <button
            onClick={() => setActiveChannel("youtube")}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              activeChannel === "youtube"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            YouTube
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rang
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vortag
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Anbieter / Newsroom
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Index
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zuwachs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-blue-700 font-bold">
                    {company.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    =
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md overflow-hidden">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="h-10 w-10 object-contain"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {company.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {company.index}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    =
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
