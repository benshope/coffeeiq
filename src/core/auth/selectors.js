import { createSelector } from "reselect";

export const isAuthenticated = createSelector(state => {
  return state.auth.authenticated;
}, x => x);
