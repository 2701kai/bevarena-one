import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icon components
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

// Navigation data with mega-menu structure
const navData = [
  {
    label: "COMMUNITY",
    path: "/",
    megaMenu: [
      {
        title: "Forum - Die Experten Community",
        items: [
          { label: "Kategorie-Übersicht", path: "/forum/categories" },
          { label: "Liste aller Diskussionsforen", path: "/forum/list" },
          { label: "Die 100 neuesten Beiträge", path: "/forum/recent" },
        ],
      },
      {
        title: "IndustryArena.TV",
        items: [
          { label: "Neue und beliebte Video-Trends", path: "/media/videos" },
        ],
      },
      {
        title: "Webinare",
        items: [
          {
            label: "Aktuelle Webinare und Aufzeichnungen",
            path: "/media/webinars",
          },
        ],
      },
    ],
  },
  {
    label: "MARKTPLATZ",
    path: "#",
    megaMenu: [
      {
        title: "Anbieter- und Produktrecherche",
        items: [
          {
            label: "Gezielt nach über 6.500 Firmen suchen",
            path: "/marketplace/supplier",
          },
          {
            label: "Die Produktrecherche für die Fertigung",
            path: "/marketplace/supplier",
          },
        ],
      },
      {
        title: "Neu- und Gebrauchtmaschinenmarkt",
        items: [
          {
            label: "Mehr als 20.000 Maschinenangebote",
            path: "#",
            isExternal: true,
            externalUrl:
              "https://www.bevmaq.com/buy/?page=1&order_by=created&order=desc",
          },
          {
            label: "Inserieren mit Bestpreis-Garantie",
            path: "#",
            isExternal: true,
            externalUrl:
              "https://www.bevmaq.com/buy/?page=1&order_by=created&order=desc",
          },
        ],
      },
      {
        title: "Social Media Ranking",
        items: [
          {
            label: "Statistiken zur Social-Media-Nutzung",
            path: "/marketplace/socialmediaranking",
          },
          {
            label: "Jetzt Ihre Firma eintragen",
            path: "/marketplace/socialmediaranking",
          },
        ],
      },
      {
        title: "Fachkräfte-Stellenmarkt",
        items: [
          {
            label: "In mehr als 30.000 Jobangeboten stöbern",
            path: "/marketplace/jobmarket",
          },
          {
            label: "Stellenangebot aufgeben - Kombipakete",
            path: "/marketplace/jobmarket",
          },
        ],
      },
      {
        title: "IndustryArena eMagazine",
        items: [
          {
            label: "Zur aktuellen eMagazine Ausgabe",
            path: "/marketplace/emagazines",
          },
          {
            label: "Anzeigenservice - Buchen mit Mehrwert",
            path: "/marketplace/emagazines",
          },
        ],
      },
    ],
  },
  {
    label: "WIKI",
    path: "/wiki",
    megaMenu: null,
  },
  {
    label: "THEMENKANÄLE",
    path: "#",
    megaMenu: [
      {
        title: "Themenkanäle",
        items: [
          {
            label: "Werkzeugmaschinen",
            path: "/themenkanäle/werkzeugmaschinen",
          },
          { label: "Robotik & Automation", path: "/themenkanäle/robotik" },
          { label: "Messtechnik & QS", path: "/themenkanäle/messtechnik" },
          {
            label: "Zerspanungswerkzeuge",
            path: "/themenkanäle/zerspanungswerkzeuge",
          },
          { label: "Spannmittel", path: "/themenkanäle/spannmittel" },
          { label: "CAD/CAM & Software", path: "/themenkanäle/cad-cam" },
          {
            label: "Additive Fertigung",
            path: "/themenkanäle/additive-fertigung",
          },
        ],
      },
    ],
  },
  {
    label: "AUFTRAGSVERMITTLUNG",
    path: "/ordermatch/welcome",
    megaMenu: [
      {
        title: "ORDERMATCH® Auftragsvermittlung",
        items: [
          {
            label: "Kostenfrei Aufträge platzieren und finden",
            path: "/ordermatch",
          },
          {
            label: "Wissenswertes über ORDERMATCH",
            path: "/ordermatch/welcome",
          },
        ],
      },
    ],
  },
  {
    label: "FIRMA EINTRAGEN",
    path: "/pricing",
    megaMenu: null,
  },
];

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="relative">
      <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl flex items-center">
                <img
                  src="/images/logo-icon-small.png"
                  alt="BevArena"
                  className="h-8 mr-2"
                />
                <span>BevArena</span>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navData.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={item.path}
                      className={`px-4 py-5 hover:bg-blue-600 flex items-center text-sm font-medium ${activeMenu === index ? "bg-blue-800" : ""}`}
                    >
                      {item.label}
                      {item.megaMenu && <ChevronDownIcon />}
                    </Link>

                    {/* Mega menu dropdown */}
                    {item.megaMenu && activeMenu === index && (
                      <div className="absolute left-0 z-10 mt-0 w-screen bg-white shadow-lg text-gray-800">
                        <div className="container mx-auto p-4">
                          <div className="grid grid-cols-3 gap-8">
                            {item.megaMenu.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <h3 className="text-blue-700 font-semibold mb-2">
                                  {section.title}
                                </h3>
                                <ul className="space-y-1">
                                  {section.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      {subItem.isExternal ? (
                                        <button
                                          onClick={() =>
                                            handleExternalLink(
                                              subItem.externalUrl
                                            )
                                          }
                                          className="block hover:text-blue-600 text-sm py-1 text-left w-full"
                                        >
                                          ▶ {subItem.label}
                                        </button>
                                      ) : (
                                        <Link
                                          to={subItem.path}
                                          className="block hover:text-blue-600 text-sm py-1"
                                        >
                                          ▶ {subItem.label}
                                        </Link>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button className="p-2 rounded-md hover:bg-blue-800 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

NavBar.defaultProps = {
  menuItems: [
    { path: "/", label: "COMMUNITY" },
    { path: "#", label: "MARKTPLATZ" },
    { path: "/wiki", label: "WIKI" },
    { path: "#", label: "THEMENKANÄLE" },
    { path: "/ordermatch/welcome", label: "AUFTRAGSVERMITTLUNG" },
    { path: "/pricing", label: "FIRMA EINTRAGEN" },
  ],
};
