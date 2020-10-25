import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import logo from 'src/assets/collab-logo.svg';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED, DEFAULT_ROUTE_WHEN_UNAUTHENTICATED } from 'src/constants';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Logo = ({ at, width, className, ...rest }) => {
  const { result: currentUser } = useCurrentUser();
  const isAuthenticated = !!currentUser;

  return (
    <Link
      to={isAuthenticated ? DEFAULT_ROUTE_WHEN_AUTHENTICATED : DEFAULT_ROUTE_WHEN_UNAUTHENTICATED}
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' },
        { 'd-flex flex-center': at === 'auth' }
      )}
      {...rest}
    >
      <img
        className={classNames({
          'align-items-center py-3': at === 'navbar-vertical',
          'mb-4': at === 'auth',
        })}
        src={logo}
        alt="Logo"
        width={width}
      />
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string,
};

Logo.defaultProps = { at: 'auth', width: 145 };

export default Logo;
