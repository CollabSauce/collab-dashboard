import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Signup from 'src/pages/Signup';
import ForgotPassword from 'src/pages/ForgotPassword';
import ResetPassword from 'src/pages/ResetPassword';
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
    path: '/signup',
    key: 'SIGNUP',
    exact: true,
    component: Signup,
  },
  {
    path: '/forgot-password',
    key: 'FORGOT_PASSWORD',
    exact: true,
    component: ForgotPassword,
  },
  {
    path: '/reset',
    key: 'RESET_PASSWORD',
    exact: true,
    component: ResetPassword,
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
