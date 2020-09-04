import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import is from 'is_js';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Collapse, Nav, Navbar } from 'reactstrap';

import Logo from 'src/components/Logo';
import NavbarVerticalMenu from 'src/components/navbar/NavbarVerticalMenu';
import ToggleButton from 'src/components/navbar/ToggleButton';
import Flex from 'src/components/Flex';
import { SIDEBAR_ROUTES } from 'src/routes';
import { navbarBreakPoint } from 'src/constants';

import bgNavbarImg from 'src/assets/bg-navbar.png';

const NavbarVertical = ({ navbarStyle }) => {
  const navBarRef = useRef(null);
  const dispatch = useDispatch();

  const isNavbarVerticalCollapsed = useSelector((state) => state.app.isNavbarVerticalCollapsed);
  const showBurgerMenu = useSelector((state) => state.app.showBurgerMenu);

  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  //Control Component did mount and unmounted of hover effect
  if (isNavbarVerticalCollapsed) {
    HTMLClassList.add('navbar-vertical-collapsed');
  }

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    return () => {
      HTMLClassList.remove('navbar-vertical-collapsed-hover');
    };
  }, [isNavbarVerticalCollapsed, HTMLClassList]);

  //Control mouseEnter event
  let time = null;
  const handleMouseEnter = () => {
    if (isNavbarVerticalCollapsed) {
      time = setTimeout(() => {
        HTMLClassList.add('navbar-vertical-collapsed-hover');
      }, 100);
    }
  };

  return (
    <Navbar
      expand={navbarBreakPoint}
      className={classNames('navbar-vertical navbar-glass', {
        [`navbar-${navbarStyle}`]: navbarStyle !== 'transparent',
      })}
      light
    >
      <Flex align="center">
        <ToggleButton
          isNavbarVerticalCollapsed={isNavbarVerticalCollapsed}
          setIsNavbarVerticalCollapsed={dispatch.app.setIsNavbarVerticalCollapsed}
        />
        <Logo at="navbar-vertical" width={17} />
      </Flex>

      <Collapse
        navbar
        isOpen={showBurgerMenu}
        className="scrollbar"
        innerRef={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => {
          clearTimeout(time);
          HTMLClassList.remove('navbar-vertical-collapsed-hover');
        }}
        style={
          navbarStyle === 'vibrant' && {
            backgroundImage: `linear-gradient(-45deg, rgba(0, 160, 255, 0.86), #0048a2),url(${bgNavbarImg})`,
          }
        }
      >
        <Nav navbar vertical>
          <NavbarVerticalMenu routes={SIDEBAR_ROUTES} />
        </Nav>
        <div className="navbar-vertical-divider">
          <hr className="navbar-vertical-hr my-2" />
        </div>
      </Collapse>
    </Navbar>
  );
};

NavbarVertical.protoTypes = {
  navbarStyle: PropTypes.string,
};

NavbarVertical.defaultProps = {
  navbarStyle: 'transparent',
};

export default NavbarVertical;
