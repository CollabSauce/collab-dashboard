import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

import NavBar from 'src/components/Navbar';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';
import 'src/styles/theme.scss';

const App = () => {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  // Initialize the app - this should only be run once (on mount)
  useEffect(() => {
    dispatch.app.initializeApp().finally(() => {
      setReady(true);
    });
  }, [dispatch.app]);

  if (!ready) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container pt-30">
        <RenderRoutes routes={ROUTES} />
      </div>
    </>
  );
};

export default App;
