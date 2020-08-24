import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Menu as MenuIcon, ExitToApp } from '@material-ui/icons';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ReactComponent as Logo } from '../logo.svg';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED, DEFAULT_ROUTE_WHEN_UNAUTHENTICATED } from 'src/constants';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { setAuthToken } from 'src/utils/auth';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: 75,
  },
  grow: {
    flexGrow: 1,
  },
  divider: {
    borderRight: '1px solid white',
    marginRight: 10,
    marginLeft: 18, // 10 + 8 = 18. 10 to match marginRght. 8 to match padding on logout button.
    height: 40,
  },
  sectionDesktop: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  mobileMenuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    // color: colors.gray2,
  },
  dot: {
    width: 10,
    height: 10,
  },
}));

const MobileMenu = ({ mobileMoreAnchorEl, handleMobileMenuClose, currentUser = {}, logout }) => {
  const classes = useStyles();
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={!!mobileMoreAnchorEl}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} className={classes.mobileMenuItem}>
        <Typography variant="body1" color="inherit">
          {currentUser.first_name} {currentUser.last_name}
        </Typography>
      </MenuItem>
      <MenuItem onClick={logout} className={classes.mobileMenuItem}>
        <Typography variant="body1" color="inherit">
          Log out
        </Typography>
        <ExitToApp />
      </MenuItem>
    </Menu>
  );
};

const LoginSignupButtons = () => (
  <>
    <Button color="inherit" component={Link} to="/signup">
      <Typography variant="body1" color="inherit">
        Signup
      </Typography>
    </Button>
    <Button color="inherit" component={Link} to="/login">
      <Typography variant="body1" color="inherit">
        Login
      </Typography>
    </Button>
  </>
);

const NavBar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const history = useHistory();

  const logout = () => {
    setMobileMoreAnchorEl(null);
    setAuthToken();
    history.push(DEFAULT_ROUTE_WHEN_UNAUTHENTICATED);
    dispatch.app.setCurrentUserId();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to={isAuthenticated ? DEFAULT_ROUTE_WHEN_AUTHENTICATED : DEFAULT_ROUTE_WHEN_UNAUTHENTICATED}>
            <Logo className={classes.logo} />
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <>
                <Typography variant="body1" color="inherit">
                  {currentUser.first_name} {currentUser.last_name}
                </Typography>
                <div className={classes.divider} />
                <Button color="inherit" onClick={logout}>
                  <Typography variant="body1" color="inherit">
                    Log out
                  </Typography>
                </Button>
              </>
            ) : (
              <LoginSignupButtons />
            )}
          </div>
          <div className={classes.sectionMobile}>
            {isAuthenticated ? (
              <>
                <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                  <MenuIcon />
                </IconButton>
              </>
            ) : (
              <LoginSignupButtons />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <MobileMenu
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleMobileMenuClose={handleMobileMenuClose}
        currentUser={currentUser}
        logout={logout}
      />
    </div>
  );
};

export default NavBar;
