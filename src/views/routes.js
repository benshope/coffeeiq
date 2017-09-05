import { isAuthenticated } from "core/auth";
import App from "./app.container";
import HomePage from "./home-page/home-page.container";
import GroupsPage from "./groups-page/groups-page.container";
// import AboutPage from "./about-page/about-page.container";
import GroupPage from "./group-page/group-page.container";

export const paths = {
  ROOT: "/",
  HOME: "/",
  // ABOUT: "/about",
  GROUPS: "/groups",
  GROUP: "/group/:id"
};

const requireAuth = getState => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.HOME);
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
          component: HomePage,
          onEnter: requireUnauth(getState)
        }
      },
      {
        path: paths.GROUPS,
        component: GroupsPage,
        onEnter: requireAuth(getState)
      },
      // {
      //   path: paths.ABOUT,
      //   component: AboutPage
      // },
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
