import { createSelector } from "reselect";

export const isAuthenticated = createSelector(
  state => state.auth.authenticated,
  state => state.auth.loggingOut,
  (authenticated, loggingOut) => authenticated && !loggingOut
);
