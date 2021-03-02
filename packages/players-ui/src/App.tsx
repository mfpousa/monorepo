import React, { Suspense, useState, useEffect } from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

import "./App.scss";
import { Loading, ScrollToTop } from "components/atoms";
import { useViewport, useCustomModal } from "hooks";
import { CONTEXT } from "globals/context";
import FilterContextProvider from "globals/FilterContext";
import { useKeycloakReady } from "api/auth";
import { Button, Other } from "@ibookweplay/lib";

const Home = React.lazy(() =>
  import("components/views/Home").then(({ Home }) => ({ default: Home }))
);
const VenuesListing = React.lazy(() =>
  import("components/views/VenuesListing").then(({ VenuesListing }) => ({
    default: VenuesListing,
  }))
);
const Games = React.lazy(() =>
  import("components/views/Games").then(({ Games }) => ({ default: Games }))
);

const PrivacyPolicy = React.lazy(() =>
  import("components/views/PrivacyPolicy").then(({ PrivacyPolicy }) => ({
    default: PrivacyPolicy,
  }))
);

const TermsAndConditions = React.lazy(() =>
  import("components/views/TermsAndConditions").then(
    ({ TermsAndConditions }) => ({
      default: TermsAndConditions,
    })
  )
);

const NotFound = React.lazy(() =>
  import("components/views/NotFound").then(({ NotFound }) => ({
    default: NotFound,
  }))
);

// Setup i18n for internationalization support
i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next)
  .init({
    lng: navigator.language,
    fallbackLng: localStorage.getItem("i18nextLng") || "en-US",
    ns: [
      "atoms",
      "establishmentType",
      "facilities",
      "footer",
      "header",
      "home",
      "reference",
      "translation",
      "venue-card",
      "venues",
      "games",
      "resourceType",
      "genderType",
      "gameVisibilityType",
      "termsAndConditions",
      "privacyPolicy",
    ],
    interpolation: {
      escapeValue: false,
    },
  });

// Create virtual browser history for react-router
const history = createBrowserHistory();

function App() {
  const [viewport] = useViewport();
  const { isModalOpen, setIsModalOpen } = useCustomModal();
  const [hideFrame, setHideFrame] = useState<boolean>(false);
  const [hideSidemenu, setHideSidemenu] = useState<boolean>(false);
  const [language, setLanguage] = useState("");

  const isKeycloakReady = useKeycloakReady();

  const WaitForKeycloakReady = React.lazy(() =>
    new Promise((resolve) => isKeycloakReady && resolve(null)).then(() => ({
      default: () => null,
    }))
  );

  useEffect(() => {
    navigator.language === "en-US"
      ? setLanguage("en-US")
      : setLanguage("es-ES");
  }, []);

  return (
    <div className={`App ${viewport}`}>
      <CONTEXT.Provider
        value={{
          setHideFrame,
          hideFrame,
          setHideSidemenu,
          hideSidemenu,
          setIsModalOpen,
          isModalOpen,
          setLanguage,
          language,
        }}
      >
        <FilterContextProvider>
          <Suspense fallback={<Loading />}>
            <WaitForKeycloakReady />
            <Button>Some button</Button>
            <Other foo="lol" />
            <Router history={history}>
              <ScrollToTop />
              <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/venues" component={VenuesListing} />
                <Route path="/games" component={Games} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route
                  path="/terms-and-conditions"
                  component={TermsAndConditions}
                />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </Suspense>
        </FilterContextProvider>
      </CONTEXT.Provider>
    </div>
  );
}

export default App;
