import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import 'react-image-lightbox/style.css';

import NavbarTop from 'src/components/navbar/NavbarTop';
import NavbarVertical from 'src/components/navbar/NavbarVertical';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useStoreState } from 'src/hooks/useStoreState';

const App = () => {
  const [ready, setReady] = useState(false);
  const isKanban = useSelector((state) => state.app.isKanban);
  const on404Page = useSelector((state) => state.app.on404Page);
  const dispatch = useDispatch();
  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

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
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner className="spinner-large" color="primary" />
      </div>
    );
  }

  return (
    <div className={isKanban ? 'container-fluid vh-100' : 'container vh-100'}>
      {showVerticalNav && <NavbarVertical isKanban={isKanban} navbarStyle="transparent" />}
      <div className="content h-100">
        <Helmet>
          {process.env.REACT_APP_ENV === 'staging' && (
            <script
              type="text/javascript"
              async
              src={`https://widget.staging.collabsauce.com?projectKey=${process.env.REACT_APP_COLLAB_PROJECT_KEY}`}
            ></script>
          )}
        </Helmet>
        {!on404Page && <NavbarTop />}
        <RenderRoutes routes={ROUTES} isTopLevel />
      </div>
      <ToastContainer autoClose={10000} />
    </div>
  );
};

export default App;
