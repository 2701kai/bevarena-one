import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../organisms/Footer";
import NavBar from "../organisms/NavBar";

/**
 * Main application layout that serves as the root layout for the entire app
 * Contains the page structure, navigation, and footer
 * Also includes the DeveloperPanel in development mode only
 */

// In development mode, we'll dynamically import the DeveloperPanel
// This approach avoids issues with React.lazy

// No need for propTypes since we're using Outlet instead of children
