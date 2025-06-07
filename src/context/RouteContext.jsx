import PropTypes from "prop-types";
import React, { createContext, useContext, useMemo } from "react";

// Route context to centralize route definitions and state
const RouteContext = createContext();

// Define all application routes with metadata
const routes = {
  // Main sections
  home: { path: "/", label: "Home", protected: false },
  community: { path: "/", label: "COMMUNITY", protected: false },
  marketplace: {
    path: "#",
    label: "MARKTPLATZ",
    protected: false,
    comingSoon: false,
  },
  wiki: { path: "/wiki", label: "WIKI", protected: false },
  themenkanale: {
    path: "#",
    label: "THEMENKANÄLE",
    protected: false,
    comingSoon: true,
  },
  ordermatch: {
    path: "/ordermatch/welcome",
    label: "AUFTRAGSVERMITTLUNG",
    protected: true,
    requiresAuth: true,
  },
  pricing: { path: "/pricing", label: "FIRMA EINTRAGEN", protected: false },
  bevmaq: {
    path: "https://www.bevmaq.com/",
    label: "BEVMAQ",
    protected: false,
    isExternal: true,
    imagePath: "/images/bevmaglogo.png",
  },

  // Auth
  login: { path: "/login", label: "Anmelden", protected: false },
  register: { path: "/register", label: "Registrieren", protected: false },
  profile: { path: "/profile", label: "Mein Profil", protected: true },
  settings: { path: "/settings", label: "Einstellungen", protected: true },
  messages: { path: "/messages", label: "Nachrichten", protected: true },

  // Community subpages
  forumCategories: {
    path: "/forum/categories",
    label: "Kategorie-Übersicht",
    protected: false,
    comingSoon: true,
  },
  forumList: {
    path: "/forum/list",
    label: "Liste aller Diskussionsforen",
    protected: false,
    comingSoon: true,
  },
  forumRecent: {
    path: "/forum/recent",
    label: "Die 100 neuesten Beiträge",
    protected: false,
    comingSoon: true,
  },
  mediaVideos: {
    path: "/media/videos",
    label: "Neue und beliebte Video-Trends",
    protected: false,
  },
  mediaWebinars: {
    path: "/media/webinars",
    label: "Aktuelle Webinare und Aufzeichnungen",
    protected: false,
  },

  // Marketplace subpages
  supplierSearch: {
    path: "/marketplace/supplier",
    label: "Gezielt nach über 6.500 Firmen suchen",
    protected: true,
  },
  productSearch: {
    path: "/marketplace/supplier",
    label: "Die Produktrecherche für die Fertigung",
    protected: true,
  },
  socialmediaranking: {
    path: "/marketplace/socialmediaranking",
    label: "Statistiken zur Social-Media-Nutzung",
    protected: true,
  },
  socialmediaCompany: {
    path: "/marketplace/socialmediaranking",
    label: "Jetzt Ihre Firma eintragen",
    protected: true,
  },
  jobmarket: {
    path: "/marketplace/jobmarket",
    label: "In mehr als 30.000 Jobangeboten stöbern",
    protected: true,
  },
  jobmarketPost: {
    path: "/marketplace/jobmarket",
    label: "Stellenangebot aufgeben - Kombipakete",
    protected: true,
  },
  emagazines: {
    path: "/marketplace/emagazines",
    label: "Zur aktuellen eMagazine Ausgabe",
    protected: true,
  },
  emagazinesAds: {
    path: "/marketplace/emagazines",
    label: "Anzeigenservice - Buchen mit Mehrwert",
    protected: true,
  },

  // Themenkanäle subpages
  werkzeugmaschinen: {
    path: "/themenkanäle/werkzeugmaschinen",
    label: "Werkzeugmaschinen",
    protected: false,
    comingSoon: true,
  },
  robotik: {
    path: "/themenkanäle/robotik",
    label: "Robotik & Automation",
    protected: false,
    comingSoon: true,
  },
  messtechnik: {
    path: "/themenkanäle/messtechnik",
    label: "Messtechnik & QS",
    protected: false,
    comingSoon: true,
  },
  zerspanungswerkzeuge: {
    path: "/themenkanäle/zerspanungswerkzeuge",
    label: "Zerspanungswerkzeuge",
    protected: false,
    comingSoon: true,
  },
  spannmittel: {
    path: "/themenkanäle/spannmittel",
    label: "Spannmittel",
    protected: false,
    comingSoon: true,
  },
  cadCam: {
    path: "/themenkanäle/cad-cam",
    label: "CAD/CAM & Software",
    protected: false,
    comingSoon: true,
  },
  additiveFertigung: {
    path: "/themenkanäle/additive-fertigung",
    label: "Additive Fertigung",
    protected: false,
    comingSoon: true,
  },

  // Ordermatch subpages
  ordermatchMain: {
    path: "/ordermatch",
    label: "Kostenfrei Aufträge platzieren und finden",
    protected: true,
  },
  ordermatchInfo: {
    path: "/ordermatch/welcome",
    label: "Wissenswertes über ORDERMATCH",
    protected: true,
  },

  // Error and utility pages
  error: { path: "/error", label: "Fehler", protected: false },
  unauthorized: {
    path: "/unauthorized",
    label: "Nicht autorisiert",
    protected: false,
  },
};

export function RouteProvider({ children }) {
  // Create memoized values to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {
      routes,
      // Utility function to check if a route requires authentication
      isProtectedRoute: (path) => {
        // Look through all routes to find a match
        const route = Object.values(routes).find((r) => r.path === path);
        return route ? !!route.protected : false;
      },

      // Check if a route is "coming soon"
      isComingSoonRoute: (path) => {
        // First check direct match
        const route = Object.values(routes).find((r) => r.path === path);
        if (route && route.comingSoon) return true;

        // Then check path patterns
        return (
          path === "#" ||
          path.startsWith("/themenkanäle/") ||
          path.startsWith("/forum/")
        );
      },

      // Generate a "to" value that works with React Router or external links
      getToValue: (route) => {
        if (!route) return "/";
        return route.isExternal ? { pathname: route.path } : route.path;
      },

      // Store redirect path for after login
      storeRedirectPath: (path) => {
        if (path) sessionStorage.setItem("redirectAfterLogin", path);
      },

      // Get redirect path after login
      getRedirectPath: () => {
        const path = sessionStorage.getItem("redirectAfterLogin");
        sessionStorage.removeItem("redirectAfterLogin");
        return path || "/";
      },
    };
  }, []);

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}

RouteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useRoutes() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error("useRoutes must be used within a RouteProvider");
  }
  return context;
}
