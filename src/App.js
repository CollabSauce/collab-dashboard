import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from 'src/components/Navbar';
import ROUTES from 'src/routes';
import RenderRoutes from 'src/components/Routes';

import './App.css';

const useStyles = makeStyles({
  appLoading: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appContainer: {
    paddingTop: 30,
  },
});

const App = () => {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  // Initialize the app
  useEffect(() => {
    // this should only be run once
    async function initialize() {
      try {
        await dispatch.app.initializeApp();
      } finally {
        setReady(true);
      }
    }
    initialize();
  }, [dispatch.app]);

  if (!ready) {
    return (
      <div className={classes.appLoading}>
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <NavBar />
      <Container className={classes.appContainer}>
        <RenderRoutes routes={ROUTES} />
      </Container>
    </>
  );
};

export default App;
