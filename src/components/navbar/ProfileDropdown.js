import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Dropdown } from 'reactstrap';

import Avatar from 'src/components/Avatar';

const ProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown
      nav
      inNavbar
      isOpen={dropdownOpen}
      toggle={toggle}
      onMouseOver={() => {
        let windowWidth = window.innerWidth;
        windowWidth > 992 && setDropdownOpen(true);
      }}
      onMouseLeave={() => {
        let windowWidth = window.innerWidth;
        windowWidth > 992 && setDropdownOpen(false);
      }}
    >
      <DropdownToggle nav className="pr-0">
        <Avatar icon="user" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-card">
        <div className="bg-white rounded-soft py-2">
          <DropdownItem>First Name | Last Name</DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/authentication/basic/logout">
            Logout
          </DropdownItem>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
