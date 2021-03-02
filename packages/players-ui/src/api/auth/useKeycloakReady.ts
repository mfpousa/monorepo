import { useEffect, useState } from "react";
import { isKeycloakReady, onKeycloakReady } from "globals/keycloak";

export default () => {
  const [keycloakReady, setKeycloakReady] = useState(isKeycloakReady());
  useEffect(() => onKeycloakReady(() => setKeycloakReady(true)), []);
  return keycloakReady;
};
