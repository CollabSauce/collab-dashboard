import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import NavbarTop from 'src/components/navbar/NavbarTop';
import NavbarVertical from 'src/components/navbar/NavbarVertical';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const App = () => {
  const [ready, setReady] = useState(false);
  const isKanban = false; // TODO: Update
  const dispatch = useDispatch();
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

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
      {isAuthenticated && <NavbarVertical isKanban={isKanban} navbarStyle="vibrant" />}
      <div className="content">
        <NavbarTop />
        <RenderRoutes routes={ROUTES} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
