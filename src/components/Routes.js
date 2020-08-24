import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import NoMatch from 'src/pages/NoMatch';

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
const RouteWithSubRoutes = (route) => {
  const isAuthenticated = useSelector((state) => state.app.currentUserId);

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        if (route.protected && !isAuthenticated) {
          const pathname = '/login';
          const nextPath = props.location.pathname;
          const search = nextPath === DEFAULT_ROUTE_WHEN_AUTHENTICATED ? '' : `?next=${nextPath}`;
          return <Redirect to={{ pathname, search }} />;
        } else {
          // pass the sub-routes down to keep nesting
          return <route.component {...props} routes={route.routes} {...route.subrouteProps} />;
        }
      }}
    />
  );
};

const RenderRoutes = ({ routes, subrouteProps }) => {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes {...route} subrouteProps={subrouteProps} />;
      })}
      <Route component={NoMatch} />
    </Switch>
  );
};

export default RenderRoutes;
