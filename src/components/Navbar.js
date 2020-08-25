import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import classNames from 'classnames/bind';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { ReactComponent as Logo } from '../logo.svg';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED, DEFAULT_ROUTE_WHEN_UNAUTHENTICATED } from 'src/constants';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { setAuthToken } from 'src/utils/auth';

const NavBar = () => {
  const dispatch = useDispatch();
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;
  const history = useHistory();

  const [expanded, setExpanded] = useState(false);

  const logout = () => {
    setAuthToken();
    closeDropdown();
    history.push(DEFAULT_ROUTE_WHEN_UNAUTHENTICATED);
    dispatch.app.setCurrentUserId();
  };

  const toggleExpanded = () => setExpanded(!expanded);
  const closeDropdown = () => setExpanded(false);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand>
        <Link
          to={isAuthenticated ? DEFAULT_ROUTE_WHEN_AUTHENTICATED : DEFAULT_ROUTE_WHEN_UNAUTHENTICATED}
          onClick={closeDropdown}
        >
          <Logo className="navbar-logo" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpanded} />
      <Navbar.Collapse id="basic-navbar-nav">
        {currentUser && (
          <Nav className="mr-auto">
            <LinkContainer exact to="/" onClick={closeDropdown}>
              <Button className={classNames('nav-link', 'navbar-navlink')} variant="link">
                Home
              </Button>
            </LinkContainer>
            <LinkContainer to="/app" onClick={closeDropdown}>
              <Button className={classNames('nav-link', 'navbar-navlink')} variant="link">
                App
              </Button>
            </LinkContainer>
          </Nav>
        )}
        <Nav className="ml-auto">
          {currentUser ? (
            <>
              <Navbar.Text>
                {currentUser.firstName} {currentUser.lastName}
              </Navbar.Text>
              <div className={classNames('navbar-divider', 'd-none', 'd-lg-block')} />
              <Button variant="link" onClick={logout} className={classNames('nav-link', 'navbar-navlink')}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <LinkContainer to="/signup" onClick={closeDropdown}>
                <Button className={classNames('nav-link', 'navbar-navlink')} variant="link">
                  Signup
                </Button>
              </LinkContainer>
              <LinkContainer to="/login" onClick={closeDropdown}>
                <Button className={classNames('nav-link', 'navbar-navlink')} variant="link">
                  Login
                </Button>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
