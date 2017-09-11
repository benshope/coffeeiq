import { createSelector } from "reselect";

export const isAuthenticated = createSelector(
  state => state.auth,
  auth => auth.authenticated && !auth.loggingOut
);
