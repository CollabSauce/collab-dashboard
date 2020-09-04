import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Flex from 'src/components/Flex';

const NavbarVerticalMenuItem = ({ route }) => (
  <Flex align="center">
    {route.icon && (
      <span className="nav-link-icon">
        <FontAwesomeIcon icon={route.icon} />
      </span>
    )}
    <span className="nav-link-text">{route.name}</span>
    {!!route.badge && (
      <Badge color={route.badge.color || 'soft-success'} pill className="ml-2">
        {route.badge.text}
      </Badge>
    )}
  </Flex>
);

NavbarVerticalMenuItem.propTypes = {
  route: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default React.memo(NavbarVerticalMenuItem);
