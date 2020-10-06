import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import ProfileDropdown from 'src/components/navbar/ProfileDropdown';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const TopNavRightSideNavItem = ({ onAuthPage }) => {
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      {isAuthenticated && !onAuthPage ? (
        <ProfileDropdown />
      ) : (
        <>
          <NavItem className="px-2">
            <NavLink tag={Link} to="/signup">
              Signup
            </NavLink>
          </NavItem>
          <NavItem className="px-2">
            <NavLink tag={Link} to="/login">
              Login
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
};

export default TopNavRightSideNavItem;
