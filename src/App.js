import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reacstrap';

// import NavBar from 'src/components/Navbar';
import NavbarTop from 'src/components/navbar/NavbarTop';
import NavbarVertical from 'src/components/navbar/NavbarVertical';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';
import 'src/styles/theme.scss';

const App = () => {
  const [ready, setReady] = useState(false);
  const isKanban = false; // TODO: Update
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
    <div className={isKanban ? 'container-fluid' : 'container'}>
      <NavbarVertical isKanban={isKanban} navbarStyle="vibrant" />
      <div className="content">
        <NavbarTop />
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
  //
  //   return (
  //     <>
  //       <NavBar />
  //       <div className="container pt-30">
  //         <RenderRoutes routes={ROUTES} />
  //       </div>
  //     </>
  //   );
};

export default App;
