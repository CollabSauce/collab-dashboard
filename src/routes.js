import React from 'react'; // todo: remove

import Home from 'src/pages/Home';
import Login from 'src/pages/Login';
import Signup from 'src/pages/Signup';
import ForgotPassword from 'src/pages/ForgotPassword';
import ResetPassword from 'src/pages/ResetPassword';
import Logout from 'src/pages/Logout';
import Projects from 'src/pages/Projects';
import Project from 'src/pages/Projects/Project';
import NoMatch from 'src/pages/NoMatch';

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
    path: '/logout',
    key: 'LOGOUT',
    exact: true,
    component: Logout,
  },
  {
    path: '/projects',
    key: 'PROJECTS',
    protected: true,
    icon: 'project-diagram',
    isSidebar: true,
    name: 'Projects',
    component: Projects,
    routes: [
      {
        path: '/projects/:id',
        key: 'PROJECT',
        exact: true,
        component: Project,
        protected: true,
      },
    ],
  },
  {
    path: '/members',
    key: 'MEMBERS',
    exact: true,
    protected: true,
    icon: 'users',
    isSidebar: true,
    name: 'Manage Members',
    component: () => <div>members</div>,
  },
  {
    path: '*',
    key: 'NOT_FOUND',
    component: NoMatch,
  },
];

export const SIDEBAR_ROUTES = ROUTES.filter((route) => route.isSidebar);

export default ROUTES;
