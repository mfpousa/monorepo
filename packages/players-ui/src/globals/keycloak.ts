import Keycloak from "keycloak-js";
import { KEYCLOAK_HOST, KEYCLOAK_REALM, KEYCLOAK_CLIENT } from "ENV";

const keycloak = Keycloak({
  url: `${KEYCLOAK_HOST}/auth`,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT,
});
let keycloakReady = false;

const onReadyCallbacks = [];
function callOnReady() {
  keycloakReady = true;
  onReadyCallbacks.forEach((c) => c());
}

const initKeycloak = () => {
  console.debug("[KEYCLOAK] Initializing...");
  keycloak
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    })
    .then((authenticated) => {
      if (authenticated) {
        console.debug("[KEYCLOAK]: Authorized");
      } else {
        console.debug("[KEYCLOAK]: Unauthorized");
      }
    })
    .catch(() => console.debug("[KEYCLOAK]: Failed to initialize"))
    .finally(() => callOnReady());
};
setTimeout(initKeycloak, 1000);

export function isKeycloakReady() {
  return keycloakReady;
}

export function getUserProfile() {
  console.debug({ keycloak });
  return keycloak?.loadUserProfile();
}

export async function login({ register } = { register: false }) {
  console.debug("[KEYCLOAK] Logging in...");
  try {
    const authenticated: any = await keycloak.login({
      action: register ? "register" : undefined,
    });
    if (authenticated) {
      console.debug("[KEYCLOAK]: Authorized");
    } else {
      console.debug("[KEYCLOAK]: Unauthorized");
    }
  } catch (e) {
    return console.debug("[KEYCLOAK]: Failed to initialize");
  }
}

export function logout() {
  console.debug("[KEYCLOAK] Logging out...");
  return keycloak
    .logout({ redirectUri: location.origin })
    .then(() => {
      console.debug("[KEYCLOAK]: Logged out");
    })
    .catch(() => console.debug("[KEYCLOAK]: Failed to logout"));
}

export function onKeycloakReady(callback) {
  onReadyCallbacks.push(callback);
}

export default keycloak;
