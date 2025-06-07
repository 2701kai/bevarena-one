// import {
//   ClerkProvider,
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
//   useUser,
// } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { RouteProvider, useRoutes } from "./context/RouteContext";
import HomePage from "./pages/HomePage";
import MediaPage from "./pages/MediaPage";
import OrderMatchPage from "./pages/OrderMatchPage";
import PricingPage from "./pages/PricingPage";
// import UnauthorizedPage from "./pages/UnauthorizedPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import WikiPage from "./pages/WikiPage";
import Layout from "./templates/Layout";
// Marketplace routes
import EmagazinesPage from "./pages/marketplace/EmagazinesPage";
import JobMarketPage from "./pages/marketplace/JobMarketPage";
import SocialMediaRankingPage from "./pages/marketplace/SocialMediaRankingPage";
import SupplierPage from "./pages/marketplace/SupplierPage";
// OrderMatch routes
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OrderMatchWelcomePage from "./pages/ordermatch/WelcomePage";
// Error handling
import PropTypes from "prop-types";
import ErrorPage from "./pages/ErrorPage";

// Protected Route component with improved redirect handling
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { storeRedirectPath } = useRoutes();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect when not loading and not authenticated
    if (!loading && !isAuthenticated) {
      // Store current path for redirect after login
      storeRedirectPath(location.pathname);
      // Navigate to login
      navigate("/login", { replace: true });
    }
  }, [
    isAuthenticated,
    loading,
    location.pathname,
    navigate,
    storeRedirectPath,
  ]);

  if (loading) {
    return <div className="p-8 text-center">Lade...</div>;
  }

  // If authenticated, render children
  return isAuthenticated ? children : null;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// const RoleProtected = ({ role, children }) => {
//   const { user } = useUser();
//   const roles = Array.isArray(user?.publicMetadata?.roles)
//     ? user.publicMetadata.roles
//     : [];

//   if (roles.includes(role)) {
//     return children;
//   }

//   console.warn("Unauthorized access attempt:", user);
//   return <UnauthorizedPage />;
// };

// RoleProtected.propTypes = {
//   role: PropTypes.string.isRequired,
//   children: PropTypes.node.isRequired,
// };

// Coming Soon placeholder for routes not yet implemented
const ComingSoonRoute = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="bg-yellow-500 text-white text-xl font-bold w-16 h-16 rounded-full flex items-center justify-center mb-4">
          !
        </div>
        <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-gray-600 mb-6 max-w-md">
          Diese Funktion steht bald zur Verfügung. Wir arbeiten derzeit daran,
          sie für Sie bereitzustellen.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Media routes
      {
        path: "media",
        element: <MediaPage />,
      },
      {
        path: "media/videos",
        element: <MediaPage />,
      },
      {
        path: "media/webinars",
        element: <MediaPage />,
      },
      // Ordermatch routes
      {
        path: "ordermatch",
        element: (
          <ProtectedRoute>
            <OrderMatchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "ordermatch/welcome",
        element: (
          <ProtectedRoute>
            <OrderMatchWelcomePage />
          </ProtectedRoute>
        ),
      },
      // Static pages
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "wiki",
        element: <WikiPage />,
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      // Marketplace routes
      {
        path: "marketplace/emagazines",
        element: (
          <ProtectedRoute>
            <EmagazinesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "marketplace/supplier",
        element: (
          <ProtectedRoute>
            <SupplierPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "marketplace/socialmediaranking",
        element: (
          <ProtectedRoute>
            <SocialMediaRankingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "marketplace/jobmarket",
        element: (
          <ProtectedRoute>
            <JobMarketPage />
          </ProtectedRoute>
        ),
      },
      // User profile routes
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Mein Profil</h1>
              <p>Hier sind deine Profil-Informationen.</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Einstellungen</h1>
              <p>Hier kannst du deine Einstellungen ändern.</p>
            </div>
          </ProtectedRoute>
        ),
      },
      {
        path: "messages",
        element: (
          <ProtectedRoute>
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Nachrichten</h1>
              <p>Hier findest du deine Nachrichten.</p>
            </div>
          </ProtectedRoute>
        ),
      },
      // Auth routes
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      // Coming Soon routes
      {
        path: "forum/*",
        element: <ComingSoonRoute />,
      },
      {
        path: "themenkanäle/*",
        element: <ComingSoonRoute />,
      },
      // 404 route - must be last
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouteProvider>
        <RouterProvider router={router} />
      </RouteProvider>
    </AuthProvider>
  );
}
