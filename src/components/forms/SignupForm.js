import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { handleNetworkError } from 'src/utils/error';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const SignupForm = ({ hasLabel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToPreviousRoute, setRedirectToPreviousRoute] = useState(false);
  const isAuthenticated = useSelector((state) => state.app.currentUserId);

  const dispatch = useDispatch();

  const queryParams = useQueryParams();
  const next = queryParams.next || DEFAULT_ROUTE_WHEN_AUTHENTICATED;
  const qpEmail = queryParams.email;
  const qpKey = queryParams.key; // used for accept_invite

  useEffect(() => {
    if (qpEmail) {
      setEmail(qpEmail);
    }
  }, [qpEmail]);

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const emailValid = email.length && email.includes('@');
      if (emailValid) {
        setLoading(true);
        const credentials = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password1: password,
          password2: confirmPassword,
        };
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
    setIsDisabled(!firstName || !lastName || !email || !password || !confirmPassword);
  }, [firstName, lastName, email, password, confirmPassword]);

  if (redirectToPreviousRoute) {
    if (next === '/accept_invite') {
      return <Redirect to={{ pathname: next, search: `?key=${qpKey}` }} />;
    } else {
      return <Redirect to={next} />;
    }
  }

  if (isAuthenticated) {
    return <Redirect to={'/'} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="form-row">
        <FormGroup className="col-6">
          {hasLabel && <Label>First Name</Label>}
          <Input
            placeholder={!hasLabel ? 'First Name' : ''}
            value={firstName}
            onChange={({ target }) => setFirstName(target.value)}
          />
        </FormGroup>
        <FormGroup className="col-6">
          {hasLabel && <Label>Last Name</Label>}
          <Input
            placeholder={!hasLabel ? 'Last Name' : ''}
            value={lastName}
            onChange={({ target }) => setLastName(target.value)}
          />
        </FormGroup>
      </div>
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
          {loading ? <Spinner color="light" /> : 'Register'}
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
