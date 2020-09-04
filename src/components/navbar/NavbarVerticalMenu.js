import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { NavLink, useLocation } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap';
import NavbarVerticalMenuItem from './NavbarVerticalMenuItem';

const NavbarVerticalMenu = ({ routes }) => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    let openedDropdown = null;
    routes.forEach((route, index) => {
      if (location.pathname.indexOf(route.path) === 0) {
        openedDropdown = index;
      }
    });

    setOpenedIndex(openedDropdown);
    // eslint-disable-next-line
  }, [location.pathname]);

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpenedIndex(openedIndex === index ? null : index);
  };

  return routes.map((route, index) => {
    if (!route.routes) {
      return (
        <NavItem key={index}>
          <NavLink className="nav-link" {...route} onClick={() => dispatch.app.setShowBurgerMenu(false)}>
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </NavItem>
      );
    }

    let childRoutes = route.routes;
    if (route.key === 'PROJECTS') {
      // dynamically build child-routes for the veritcal bar
      // TODO: Build child project routes based off data from backend.
      childRoutes = [
        {
          path: '/projects/1',
          exact: true,
          component: () => <h1>1</h1>,
          protected: true,
        },
      ];
    }

    return (
      <NavItem key={index}>
        <BootstrapNavLink
          onClick={(e) => toggleOpened(e, index)}
          className="dropdown-indicator cursor-pointer"
          aria-expanded={openedIndex === index}
        >
          <NavbarVerticalMenuItem route={route} />
        </BootstrapNavLink>
        <Collapse isOpen={openedIndex === index}>
          <Nav>
            <NavbarVerticalMenu routes={childRoutes} location={location} />
          </Nav>
        </Collapse>
      </NavItem>
    );
  });
};

NavbarVerticalMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default NavbarVerticalMenu;
