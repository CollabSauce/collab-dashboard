import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Error404 = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch.app.setOn404Page(true);
    return () => dispatch.app.setOn404Page(false);
  }, [dispatch.app]);

  return (
    <>
      <div className="display-1 text-200 fs-error">404</div>
      <p className="lead mt-4 text-800 text-sans-serif font-weight-semi-bold">
        The page you're looking for is not found.
      </p>
      <hr />
      <p>
        Make sure the address is correct and that the page hasn't moved. If you think this is a mistake,
        <a href="mailto:info@collabsauce.com" className="ml-1">
          contact us
        </a>
        .
      </p>
      <Link className="btn btn-primary btn-sm mt-3" to="/">
        <FontAwesomeIcon icon="home" className="mr-2" />
        Take me home
      </Link>
    </>
  );
};

export default Error404;
