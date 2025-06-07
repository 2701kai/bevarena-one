import PropTypes from "prop-types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthButtons from "../components/AuthButtons";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { useRoutes } from "../context/RouteContext";

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

// Lock icon for protected routes
const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="ml-1"
    aria-hidden="true"
  >
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
  </svg>
);

// Alert icon for Coming Soon routes
const AlertIcon = ({ onClick, isActive, id }) => (
  <button
    onClick={onClick}
    className="ml-1 p-0 bg-transparent border-0 cursor-pointer focus:outline-none"
    aria-expanded={isActive}
    aria-controls={id}
  >
    <span className="px-1 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
      !
    </span>
  </button>
);

AlertIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

// Navigation data with mega-menu structure - derived from routes
const buildNavData = (routes) => [
  {
    label: routes.community.label,
    path: routes.community.path,
    megaMenu: [
      {
        title: "Forum - Die Experten Community",
        items: [
          {
            label: routes.forumCategories.label,
            path: routes.forumCategories.path,
          },
          { label: routes.forumList.label, path: routes.forumList.path },
          { label: routes.forumRecent.label, path: routes.forumRecent.path },
        ],
      },
      {
        title: "IndustryArena.TV",
        items: [
          { label: routes.mediaVideos.label, path: routes.mediaVideos.path },
        ],
      },
      {
        title: "Webinare",
        items: [
          {
            label: routes.mediaWebinars.label,
            path: routes.mediaWebinars.path,
          },
        ],
      },
    ],
  },
  {
    label: routes.marketplace.label,
    path: routes.marketplace.path,
    megaMenu: [
      {
        title: "Anbieter- und Produktrecherche",
        items: [
          {
            label: routes.supplierSearch.label,
            path: routes.supplierSearch.path,
            protected: routes.supplierSearch.protected,
          },
          {
            label: routes.productSearch.label,
            path: routes.productSearch.path,
            protected: routes.productSearch.protected,
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
            label: routes.socialmediaranking.label,
            path: routes.socialmediaranking.path,
            protected: routes.socialmediaranking.protected,
          },
          {
            label: routes.socialmediaCompany.label,
            path: routes.socialmediaCompany.path,
            protected: routes.socialmediaCompany.protected,
          },
        ],
      },
      {
        title: "Fachkräfte-Stellenmarkt",
        items: [
          {
            label: routes.jobmarket.label,
            path: routes.jobmarket.path,
            protected: routes.jobmarket.protected,
          },
          {
            label: routes.jobmarketPost.label,
            path: routes.jobmarketPost.path,
            protected: routes.jobmarketPost.protected,
          },
        ],
      },
      {
        title: "IndustryArena eMagazine",
        items: [
          {
            label: routes.emagazines.label,
            path: routes.emagazines.path,
            protected: routes.emagazines.protected,
          },
          {
            label: routes.emagazinesAds.label,
            path: routes.emagazinesAds.path,
            protected: routes.emagazinesAds.protected,
          },
        ],
      },
    ],
  },
  {
    label: routes.wiki.label,
    path: routes.wiki.path,
    megaMenu: null,
  },
  {
    label: routes.themenkanale.label,
    path: routes.themenkanale.path,
    megaMenu: [
      {
        title: "Themenkanäle",
        items: [
          {
            label: routes.werkzeugmaschinen.label,
            path: routes.werkzeugmaschinen.path,
          },
          { label: routes.robotik.label, path: routes.robotik.path },
          { label: routes.messtechnik.label, path: routes.messtechnik.path },
          {
            label: routes.zerspanungswerkzeuge.label,
            path: routes.zerspanungswerkzeuge.path,
          },
          { label: routes.spannmittel.label, path: routes.spannmittel.path },
          { label: routes.cadCam.label, path: routes.cadCam.path },
          {
            label: routes.additiveFertigung.label,
            path: routes.additiveFertigung.path,
          },
        ],
      },
    ],
  },
  {
    label: routes.ordermatch.label,
    path: routes.ordermatch.path,
    protected: routes.ordermatch.protected,
    megaMenu: [
      {
        title: "ORDERMATCH® Auftragsvermittlung",
        items: [
          {
            label: routes.ordermatchMain.label,
            path: routes.ordermatchMain.path,
            protected: routes.ordermatchMain.protected,
          },
          {
            label: routes.ordermatchInfo.label,
            path: routes.ordermatchInfo.path,
            protected: routes.ordermatchInfo.protected,
          },
        ],
      },
    ],
  },
  {
    label: routes.pricing.label,
    path: routes.pricing.path,
    megaMenu: null,
  },
  {
    label: routes.bevmaq.label,
    type: "image",
    path: routes.bevmaq.imagePath,
    isExternal: routes.bevmaq.isExternal,
    externalUrl: routes.bevmaq.path,
    megaMenu: null,
  },
];

export default function NavBar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { routes, isComingSoonRoute, storeRedirectPath } = useRoutes();

  // Build navigation data from routes
  const navData = useMemo(() => buildNavData(routes), [routes]);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback((e, action) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  }, []);

  // Handle mouse enter for desktop mega menu
  const handleMouseEnter = useCallback((index) => {
    setActiveMenu(index);
  }, []);

  // Handle mouse leave for desktop mega menu
  const handleMouseLeave = useCallback(() => {
    setActiveMenu(null);
  }, []);

  // Handle external link clicks
  const handleExternalLink = useCallback((url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prevState) => {
      // Reset submenu when closing main menu
      if (prevState) {
        setMobileSubMenuOpen(null);
      }
      return !prevState;
    });
  }, []);

  // Toggle mobile submenu
  const toggleMobileSubmenu = useCallback((index) => {
    setMobileSubMenuOpen((prevState) => (prevState === index ? null : index));
  }, []);

  // Toggle tooltip visibility
  const toggleTooltip = useCallback((id) => {
    setActiveTooltip((prevState) => (prevState === id ? null : id));
  }, []);

  // Handle navigation item clicks, managing protected routes
  const handleNavItemClick = useCallback(
    (item, e) => {
      if (item.protected && !isAuthenticated) {
        e.preventDefault();
        // Store current path for redirect after login
        storeRedirectPath(item.path);
        // Navigate to login page
        navigate("/login");
        return false;
      }
      return true;
    },
    [isAuthenticated, navigate, storeRedirectPath]
  );

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveTooltip(null);
        if (window.innerWidth >= 768) {
          // Only on desktop
          setActiveMenu(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Top header bar */}
      <div className="bg-gray-100 py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="medium" linkTo="/" className="mr-2" />
          </div>
          <AuthButtons />
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-blue-700 text-white" aria-label="Main Navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center">
              <Logo variant="circle" linkTo="/" withText={true} />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navData.map((item, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.type === "image" ? (
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-4 hover:bg-blue-600 flex items-center relative group"
                        aria-label="BEVMAQ - New"
                      >
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#fc8e43" }}
                        >
                          NEW!
                        </span>
                        <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 p-1 bg-white rounded shadow-lg">
                          <img
                            src="/images/bevmaglogo.png"
                            alt="BEVMAQ Logo"
                            className="h-10 w-auto"
                            loading="lazy"
                          />
                        </div>
                      </a>
                    ) : (
                      <Link
                        to={item.path}
                        className={`px-4 py-4 hover:bg-blue-600 flex items-center text-sm font-medium ${activeMenu === index ? "bg-blue-800" : ""}`}
                        onClick={(e) => handleNavItemClick(item, e)}
                        aria-expanded={activeMenu === index}
                        aria-haspopup={item.megaMenu ? "true" : "false"}
                      >
                        {item.label}
                        {item.megaMenu && <ChevronDownIcon className="ml-1" />}
                        {item.protected && <LockIcon />}
                        {isComingSoonRoute(item.path) && (
                          <div className="relative">
                            <AlertIcon
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleTooltip(`desktop-${index}`);
                              }}
                              isActive={activeTooltip === `desktop-${index}`}
                              id={`tooltip-desktop-${index}`}
                            />
                            {activeTooltip === `desktop-${index}` && (
                              <div
                                id={`tooltip-desktop-${index}`}
                                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20"
                                role="tooltip"
                              >
                                Coming Soon!
                              </div>
                            )}
                          </div>
                        )}
                      </Link>
                    )}

                    {/* Mega menu dropdown */}
                    {item.megaMenu && activeMenu === index && (
                      <div
                        className="absolute left-0 z-10 mt-0 w-screen bg-white shadow-lg text-gray-800"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <div className="container mx-auto p-4">
                          <div className="grid grid-cols-3 gap-8">
                            {item.megaMenu.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <h3 className="text-blue-700 font-semibold mb-2">
                                  {section.title}
                                </h3>
                                <ul className="space-y-1" role="menu">
                                  {section.items.map((subItem, subIndex) => (
                                    <li key={subIndex} role="menuitem">
                                      {subItem.isExternal ? (
                                        <button
                                          onClick={() =>
                                            handleExternalLink(
                                              subItem.externalUrl
                                            )
                                          }
                                          className="block hover:text-blue-600 text-sm py-1 text-left w-full"
                                          onKeyDown={(e) =>
                                            handleKeyDown(e, () =>
                                              handleExternalLink(
                                                subItem.externalUrl
                                              )
                                            )
                                          }
                                        >
                                          ▶ {subItem.label}
                                        </button>
                                      ) : (
                                        <div className="flex items-center">
                                          <Link
                                            to={subItem.path}
                                            className="block hover:text-blue-600 text-sm py-1"
                                            onClick={(e) =>
                                              handleNavItemClick(subItem, e)
                                            }
                                          >
                                            ▶ {subItem.label}
                                            {subItem.protected && <LockIcon />}
                                          </Link>
                                          {isComingSoonRoute(subItem.path) && (
                                            <div className="relative ml-2">
                                              <AlertIcon
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  toggleTooltip(
                                                    `desktop-sub-${index}-${sectionIndex}-${subIndex}`
                                                  );
                                                }}
                                                isActive={
                                                  activeTooltip ===
                                                  `desktop-sub-${index}-${sectionIndex}-${subIndex}`
                                                }
                                                id={`tooltip-desktop-sub-${index}-${sectionIndex}-${subIndex}`}
                                              />
                                              {activeTooltip ===
                                                `desktop-sub-${index}-${sectionIndex}-${subIndex}` && (
                                                <div
                                                  id={`tooltip-desktop-sub-${index}-${sectionIndex}-${subIndex}`}
                                                  className="absolute right-full top-0 mr-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20"
                                                  role="tooltip"
                                                >
                                                  Coming Soon!
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-md hover:bg-blue-800 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
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

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-700" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navData.map((item, index) => (
                <div key={index} className="w-full">
                  {item.type === "image" ? (
                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-white font-medium hover:bg-blue-600 border-b border-blue-600 pb-2 mb-2 relative group"
                      aria-label="BEVMAQ - New"
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#fc8e43" }}
                      >
                        NEW! {item.label}
                      </span>
                      <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 p-1 bg-white rounded shadow-lg">
                        <img
                          src="/images/bevmaglogo.png"
                          alt="BEVMAQ Logo"
                          className="h-10 w-auto"
                          loading="lazy"
                        />
                      </div>
                    </a>
                  ) : item.megaMenu ? (
                    <div className="border-b border-blue-600 pb-2 mb-2">
                      <button
                        onClick={() => toggleMobileSubmenu(index)}
                        className="w-full text-left px-3 py-2 text-white font-medium hover:bg-blue-600 rounded flex justify-between items-center"
                        aria-expanded={mobileSubMenuOpen === index}
                        aria-controls={`mobile-submenu-${index}`}
                      >
                        <span className="flex items-center">
                          {item.label} {item.protected && <LockIcon />}
                          {isComingSoonRoute(item.path) && (
                            <div className="relative ml-2">
                              <AlertIcon
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleTooltip(`mobile-${index}`);
                                }}
                                isActive={activeTooltip === `mobile-${index}`}
                                id={`tooltip-mobile-${index}`}
                              />
                              {activeTooltip === `mobile-${index}` && (
                                <div
                                  id={`tooltip-mobile-${index}`}
                                  className="absolute top-full left-0 mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20"
                                  role="tooltip"
                                >
                                  Coming Soon!
                                </div>
                              )}
                            </div>
                          )}
                        </span>
                        <span
                          className={`transition-transform duration-200 ${mobileSubMenuOpen === index ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <ChevronDownIcon />
                        </span>
                      </button>

                      {mobileSubMenuOpen === index && (
                        <div
                          className="pl-4 mt-1 mb-2 space-y-2 bg-blue-800 rounded"
                          id={`mobile-submenu-${index}`}
                          role="menu"
                        >
                          {item.megaMenu.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="py-2 px-3">
                              <h3 className="text-white font-semibold text-sm border-b border-blue-700 pb-1 mb-2">
                                {section.title}
                              </h3>
                              <ul className="space-y-1" role="menu">
                                {section.items.map((subItem, subIndex) => (
                                  <li key={subIndex} role="menuitem">
                                    {subItem.isExternal ? (
                                      <button
                                        onClick={() => {
                                          handleExternalLink(
                                            subItem.externalUrl
                                          );
                                          setMobileMenuOpen(false);
                                        }}
                                        className="text-gray-200 hover:text-white text-sm py-1 pl-2 text-left w-full"
                                        onKeyDown={(e) =>
                                          handleKeyDown(e, () => {
                                            handleExternalLink(
                                              subItem.externalUrl
                                            );
                                            setMobileMenuOpen(false);
                                          })
                                        }
                                      >
                                        ▶ {subItem.label}
                                      </button>
                                    ) : (
                                      <div className="flex items-center">
                                        <Link
                                          to={subItem.path}
                                          className="text-gray-200 hover:text-white text-sm py-1 pl-2 block"
                                          onClick={(e) => {
                                            if (
                                              handleNavItemClick(subItem, e)
                                            ) {
                                              setMobileMenuOpen(false);
                                            }
                                          }}
                                        >
                                          ▶ {subItem.label}
                                          {subItem.protected && <LockIcon />}
                                        </Link>
                                        {isComingSoonRoute(subItem.path) && (
                                          <div className="relative ml-2">
                                            <AlertIcon
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTooltip(
                                                  `mobile-sub-${index}-${sectionIndex}-${subIndex}`
                                                );
                                              }}
                                              isActive={
                                                activeTooltip ===
                                                `mobile-sub-${index}-${sectionIndex}-${subIndex}`
                                              }
                                              id={`tooltip-mobile-sub-${index}-${sectionIndex}-${subIndex}`}
                                            />
                                            {activeTooltip ===
                                              `mobile-sub-${index}-${sectionIndex}-${subIndex}` && (
                                              <div
                                                id={`tooltip-mobile-sub-${index}-${sectionIndex}-${subIndex}`}
                                                className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20"
                                                role="tooltip"
                                              >
                                                Coming Soon!
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Link
                        to={item.path}
                        className="block px-3 py-2 text-white font-medium hover:bg-blue-600 border-b border-blue-600 pb-2 mb-2"
                        onClick={(e) => {
                          if (handleNavItemClick(item, e)) {
                            setMobileMenuOpen(false);
                          }
                        }}
                      >
                        {item.label} {item.protected && <LockIcon />}
                      </Link>
                      {isComingSoonRoute(item.path) && (
                        <div className="relative ml-2 mb-2">
                          <AlertIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTooltip(`mobile-simple-${index}`);
                            }}
                            isActive={
                              activeTooltip === `mobile-simple-${index}`
                            }
                            id={`tooltip-mobile-simple-${index}`}
                          />
                          {activeTooltip === `mobile-simple-${index}` && (
                            <div
                              id={`tooltip-mobile-simple-${index}`}
                              className="absolute left-full top-0 ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20"
                              role="tooltip"
                            >
                              Coming Soon!
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
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
