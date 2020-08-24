import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import NoMatch from 'src/pages/NoMatch';
import SamplePageTopLevel, { SamplePageMain, SamplePageSecondary } from 'src/pages/SamplePage';

const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: Home,
    protected: true,
  },
  {
    path: '/login',
    key: 'LOGIN',
    exact: true,
    component: Login,
  },
  {
    path: '/app',
    key: 'APP',
    component: SamplePageTopLevel,
    protected: true,
    routes: [
      {
        path: '/app',
        key: 'APP_ROOT',
        exact: true,
        component: SamplePageMain,
        protected: true,
      },
      {
        path: '/app/page',
        key: 'APP_PAGE',
        exact: true,
        component: SamplePageSecondary,
        protected: true,
      },
    ],
  },
  {
    path: '*',
    key: 'NOT_FOUND',
    component: NoMatch,
  },
];

export default ROUTES;
