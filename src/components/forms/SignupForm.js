import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { handleNetworkError } from 'src/utils/error';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const SignupForm = ({ hasLabel }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToPreviousRoute, setRedirectToPreviousRoute] = useState(false);

  const dispatch = useDispatch();

  const queryParams = useQueryParams();
  const next = queryParams.next || DEFAULT_ROUTE_WHEN_AUTHENTICATED;

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailValid = email.length && email.includes('@');
      if (emailValid) {
        setLoading(true);
        const credentials = { email, password1: password, password2: confirmPassword };
        const response = await jsdataStore.getMapper('user').signupUser({ data: credentials });
        setAuthToken(response.data.key);
        await dispatch.app.initializeApp();
        setLoading(false);
        setRedirectToPreviousRoute(true);
      } else {
        toast.error('Please enter a valid email');
      }
    } catch (e) {
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!email || !password || !confirmPassword);
  }, [email, password, confirmPassword]);

  if (redirectToPreviousRoute) {
    return <Redirect to={next} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Email address</Label>}
        <Input
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </FormGroup>
      <div className="form-row">
        <FormGroup className="col-6">
          {hasLabel && <Label>Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Password' : ''}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
          />
        </FormGroup>
        <FormGroup className="col-6">
          {hasLabel && <Label>Confirm Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
          />
        </FormGroup>
      </div>

      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          {loading ? <Spinner color="primary" /> : 'Register'}
        </Button>
      </FormGroup>
    </Form>
  );
};

SignupForm.propTypes = {
  hasLabel: PropTypes.bool,
};

SignupForm.defaultProps = {
  hasLabel: false,
};

export default SignupForm;
