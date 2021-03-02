import keycloak from "globals/keycloak";

export default () => `Bearer ${keycloak?.token}`;
