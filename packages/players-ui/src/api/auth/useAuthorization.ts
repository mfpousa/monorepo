import { useEffect, useState } from "react";
import { useSubscription } from "hooks";
import { login, logout } from "globals/keycloak";

import useKeycloakReady from "./useKeycloakReady";
import isLoggedIn from "./isLoggedIn";

export default () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const update = useSubscription("login", setLoggedIn);
  const keycloakReady = useKeycloakReady();
  useEffect(
    function setLoggedInOnKeycloakReady() {
      if (keycloakReady) {
        setLoggedIn(isLoggedIn());
      }
    },
    [keycloakReady]
  );
  return {
    isLoggedIn: loggedIn,
    isKeycloakReady: keycloakReady,
    login: () => login().then(() => update(isLoggedIn())),
    register: () => login({ register: true }).then(() => update(isLoggedIn())),
    logout: () => logout().then(() => update(isLoggedIn())),
  };
};
