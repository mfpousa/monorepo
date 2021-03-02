import React from "react";
import ReactDom from "react-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import App from "./App";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

ReactDom.render(
  <ParallaxProvider>
    <App />
  </ParallaxProvider>,
  document.getElementById("app")
);

module.hot.accept();
