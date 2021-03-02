import React from "react";

export const ROLES = Object.freeze({});

export const ROUTES = [
  {
    path: "/home",
    component: React.lazy(() => import("components/views/Home")),
    exact: false,
    requireLogin: true,
  },
];
