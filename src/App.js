import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavbarTop from 'src/components/navbar/NavbarTop';
import NavbarVertical from 'src/components/navbar/NavbarVertical';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useStoreState } from 'src/hooks/useStoreState';

const App = () => {
  const [ready, setReady] = useState(false);
  const isKanban = false; // TODO: Update
  const dispatch = useDispatch();
  const location = useLocation();
  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  const on404Page = !location.key && location.pathname !== '/';

  const hideVerticalNav = !isAuthenticated || on404Page || organizations.length === 0;
  const showVerticalNav = !hideVerticalNav;

  // Initialize the app - this should only be run once (on mount)
  useEffect(() => {
    dispatch.app.initializeApp().finally(() => {
      setReady(true);
    });
  }, [dispatch.app]);

  if (!ready) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <div className={isKanban ? 'container-fluid' : 'container'}>
      {showVerticalNav && <NavbarVertical isKanban={isKanban} navbarStyle="transparent" />}
      <div className="content">
        {!on404Page && <NavbarTop />}
        <RenderRoutes routes={ROUTES} />
      </div>
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default App;
