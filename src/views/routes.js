import { isAuthenticated } from 'core/auth';
import App from './app';
import SignInPage from './pages/sign-in';
import GroupsPage from './pages/groups';
import AboutPage from './pages/about';


export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  ABOUT: '/about',
  GROUPS: '/'
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
      }
      // {
      //   path: paths.PRICING,
      //   component: PricingPage,
      //   onEnter: requireUnauth(getState)
      // }
    ]
  };
};
