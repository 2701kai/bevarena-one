// import {
//   ClerkProvider,
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
//   useUser,
// } from "@clerk/clerk-react";
import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
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

// Geschützte Route-Komponente
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center">Lade...</div>;
  }

  if (!isAuthenticated) {
    // Speichere den aktuellen Pfad, damit der Benutzer nach dem Login zurückgeleitet werden kann
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
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
      {
        path: "media",
        element: <MediaPage />,
      },
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
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
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
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
