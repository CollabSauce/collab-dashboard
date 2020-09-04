import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import ProfileDropdown from 'src/components/navbar/ProfileDropdown';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const TopNavRightSideNavItem = () => {
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      {isAuthenticated ? (
        <ProfileDropdown />
      ) : (
        <>
          <NavItem>
            <NavLink tag={Link} to="/signup">
              Signup
            </NavLink>
          </NavItem>
          <NavItem>
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
