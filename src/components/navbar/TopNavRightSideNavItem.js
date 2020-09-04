import React, { useContext } from 'react';

import { Nav } from 'reactstrap';

import ProfileDropdown from 'src/components/navbar/ProfileDropdown';

const TopNavRightSideNavItem = () => {
  return (
    <Nav navbar className="navbar-nav-icons ml-auto flex-row align-items-center">
      <ProfileDropdown />
    </Nav>
  );
};

export default TopNavRightSideNavItem;
