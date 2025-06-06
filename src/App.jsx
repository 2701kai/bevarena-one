// import {
//   ClerkProvider,
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
//   useUser,
// } from "@clerk/clerk-react";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import ErrorPage from "./pages/ErrorPage";

// const ProtectedRoute = ({ children }) => (
//   <>
//     <SignedIn>{children}</SignedIn>
//     <SignedOut>
//       <RedirectToSignIn />
//     </SignedOut>
//   </>
// );

// ProtectedRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

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
        element: <OrderMatchPage />,
      },
      {
        path: "ordermatch/welcome",
        element: <OrderMatchWelcomePage />,
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
        element: <EmagazinesPage />,
      },
      {
        path: "marketplace/supplier",
        element: <SupplierPage />,
      },
      {
        path: "marketplace/socialmediaranking",
        element: <SocialMediaRankingPage />,
      },
      {
        path: "marketplace/jobmarket",
        element: <JobMarketPage />,
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
  return <RouterProvider router={router} />;
}
