import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';
import * as Sentry from '@sentry/react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';
import { useQueryParams } from 'src/hooks/useQueryParams';

const AcceptInvite = ({ hasLabel }) => {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const queryParams = useQueryParams();
  const key = queryParams.key;

  const acceptInvite = async () => {
    const data = { key };
    try {
      await jsdataStore.getMapper('invite').acceptInvite({ data });
      await jsdataStore.getMapper('user').fetchCurrentUser(); // fetch currentUser again
      toast.success('Invite Accepted!');
      setRedirectToHome(true);
    } catch (err) {
      Sentry.captureException(err);
      toast.error(handleNetworkError(err));
    }
  };

  useEffect(() => {
    acceptInvite();
    // eslint-disable-next-line
  }, []);

  if (redirectToHome) {
    return <Redirect to={'/'} />;
  }

  return (
    <BaseCardLayout>
      <Spinner color="primary" />
    </BaseCardLayout>
  );
};

export default AcceptInvite;
