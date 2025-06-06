// import {
//   ClerkProvider,
//   RedirectToSignIn,
//   SignedIn,
//   SignedOut,
//   useUser,
// } from "@clerk/clerk-react";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import OrderMatchWelcomePage from "./pages/ordermatch/WelcomePage";

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

export default function App() {
  return (
    // <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/ordermatch" element={<OrderMatchPage />} />
          <Route
            path="/ordermatch/welcome"
            element={<OrderMatchWelcomePage />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/wiki" element={<WikiPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Marketplace routes */}
          <Route path="/marketplace/emagazines" element={<EmagazinesPage />} />
          <Route path="/marketplace/supplier" element={<SupplierPage />} />
          <Route
            path="/marketplace/socialmediaranking"
            element={<SocialMediaRankingPage />}
          />
          <Route path="/marketplace/jobmarket" element={<JobMarketPage />} />
        </Routes>
      </Layout>
    </Router>
    // </ClerkProvider>
  );
}
