import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Navbar } from 'reactstrap';

import Logo from 'src/components/Logo';
import TopNavRightSideNavItem from 'src/components/navbar/TopNavRightSideNavItem';
import { navbarBreakPoint } from 'src/constants';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const AuthPathnames = ['/login', '/signup'];

const NavbarTop = () => {
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;
  const showBurgerMenu = useSelector((state) => state.app.showBurgerMenu);
  const dispatch = useDispatch();
  const location = useLocation();
  const onAuthPage = AuthPathnames.includes(location.pathname);

  return (
    <Navbar
      light
      className="navbar-glass fs--1 font-weight-semi-bold row navbar-top sticky-kit"
      expand={navbarBreakPoint}
    >
      {isAuthenticated && !onAuthPage && (
        <div className={`toggle-icon-wrapper mr-md-3 mr-2 d-${navbarBreakPoint}-none`}>
          <button
            className="navbar-toggler-humburger-icon btn btn-link d-flex align-item-center justify-content-center "
            onClick={() => dispatch.app.setShowBurgerMenu(!showBurgerMenu)}
            id="burgerMenu"
          >
            <span className="navbar-toggle-icon">
              <span className="toggle-line" />
            </span>
          </button>
        </div>
      )}
      <Logo at="navbar-top" width={140} id="topLogo" />
      <TopNavRightSideNavItem onAuthPage={onAuthPage} />
    </Navbar>
  );
};

export default NavbarTop;
