import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import rocket from 'src/assets/rocket.png';
import { DEFAULT_ROUTE_WHEN_UNAUTHENTICATED } from 'src/constants';
import { setAuthToken } from 'src/utils/auth';

const LogoutContent = ({ layout, titleTag: TitleTag }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // upon entering this page, log the user out
  useEffect(() => {
    setAuthToken();
    history.push(DEFAULT_ROUTE_WHEN_UNAUTHENTICATED);
    dispatch.app.setCurrentUserId();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <img className="d-block mx-auto mb-4" src={rocket} alt="shield" width={70} />
      <TitleTag>See you again!</TitleTag>
      <p>
        Thanks for using Falcon. You are <br className="d-none d-sm-block" />
        now successfully signed out.
      </p>
      <Button tag={Link} color="primary" size="sm" className="mt-3" to={`/login`}>
        <FontAwesomeIcon icon="chevron-left" transform="shrink-4 down-1" className="mr-1" />
        Return to Login
      </Button>
    </>
  );
};

LogoutContent.propTypes = {
  layout: PropTypes.string,
  titleTag: PropTypes.string,
};

LogoutContent.defaultProps = {
  layout: 'basic',
  titleTag: 'h4',
};

export default LogoutContent;
