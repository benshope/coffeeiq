import { isAuthenticated } from "core/auth";
import App from "./app.container";
import SignInPage from "./login-page/login-page.container";
import GroupsPage from "./groups-page/groups-page.container";
import AboutPage from "./about-page/about-page.container";
import GroupPage from "./group-page/group-page.container";

export const paths = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  ABOUT: "/about",
  GROUPS: "/",
  GROUP: "/group/:id"
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = getState => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.GROUPS);
    }
  };
};

export const getRoutes = getState => {
  return {
    path: paths.ROOT,
    component: App,
    childRoutes: [
      {
        indexRoute: {
          component: GroupsPage,
          onEnter: requireAuth(getState)
        }
      },
      {
        path: paths.SIGN_IN,
        component: SignInPage,
        onEnter: requireUnauth(getState)
      },
      {
        path: paths.ABOUT,
        component: AboutPage
      },
      {
        path: paths.GROUP,
        component: GroupPage
      }
      // {
      //   path: paths.PRICING,
      //   component: PricingPage,
      //   onEnter: requireUnauth(getState)
      // }
    ]
  };
};
