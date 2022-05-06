import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { MyTalksProvider } from "./components/common/MyTalksContext";
import ScrollToTop from "./components/ScrollToTop";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <MyTalksProvider>
      <App />
    </MyTalksProvider>
  </BrowserRouter>
);
