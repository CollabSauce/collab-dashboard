import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';
import NoMatch from 'src/pages/NoMatch';

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
const RouteWithSubRoutes = (route) => {
  const isAuthenticated = useSelector((state) => state.app.currentUserId);
  const queryParams = useQueryParams();

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => {
        if (route.protected && !isAuthenticated) {
          const pathname = route.path === '/accept_invite' ? 'signup' : '/login'; // weird edgecase for accepting invite
          const nextPath = props.location.pathname;
          const updateQps =
            nextPath === DEFAULT_ROUTE_WHEN_AUTHENTICATED ? queryParams : { next: nextPath, ...queryParams };
          const search = queryString.stringify(updateQps);
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
