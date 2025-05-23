import React from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./PrivateRouter/AuthPrivate";
import { RouterProvider } from "react-router";
import Router from "./Router/Router";
import { ThemeProvider } from "./Component/Theme";
import './index.css'
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
<HelmetProvider>
  <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={Router}></RouterProvider>
    </AuthProvider>
  </ThemeProvider>
</HelmetProvider>

);
