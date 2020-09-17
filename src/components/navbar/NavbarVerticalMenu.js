import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Collapse, Nav, NavItem, NavLink as BootstrapNavLink } from 'reactstrap';

import NavbarVerticalMenuItem from 'src/components/navbar/NavbarVerticalMenuItem';
import { useStoreState } from 'src/hooks/useStoreState';

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

  const { result: projects } = useStoreState((store) => store.getAll('project'), [], 'project');

  const toggleOpened = (e, index) => {
    e.preventDefault();
    return setOpenedIndex(openedIndex === index ? null : index);
  };

  return routes.map((route, index) => {
    if (!route.routes) {
      return (
        <NavItem key={index}>
          <NavLink className="nav-link" to={route.path} onClick={() => dispatch.app.setShowBurgerMenu(false)}>
            <NavbarVerticalMenuItem route={route} />
          </NavLink>
        </NavItem>
      );
    }

    let childRoutes = route.routes;
    if (route.key === 'PROJECTS' && projects.length) {
      // dynamically build child-routes for the vertical bar
      childRoutes = projects.map((project) => {
        return {
          path: `/projects/${project.id}`,
          name: project.name,
          exact: true,
          protected: true,
        };
      });
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
