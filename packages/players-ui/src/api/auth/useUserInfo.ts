import { useEffect, useState } from "react";
import { getUserProfile } from "globals/keycloak";

import isLoggedIn from "./isLoggedIn";
import useKeycloakReady from "./useKeycloakReady";

export default () => {
  const [info, setInfo]: [
    Keycloak.KeycloakProfile,
    (info: Keycloak.KeycloakProfile) => void
  ] = useState({});
  const [loading, setLoading] = useState(true);
  const keycloakReady = useKeycloakReady();

  useEffect(() => {
    if (isLoggedIn()) {
      getUserProfile().then((info) => {
        setInfo(info);
        setLoading(false);
      });
    } else {
      setInfo({});
      setLoading(false);
    }
  }, [isLoggedIn(), keycloakReady]);
  return { info, isLoading: loading };
};
