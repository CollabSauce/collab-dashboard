import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Col, FormGroup, Input, Label, Spinner } from 'reactstrap';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { handleNetworkError } from 'src/utils/error';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const LoginForm = ({ hasLabel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        const credentials = { email, password };
        const response = await jsdataStore.getMapper('user').loginUser({ data: credentials });
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
    setIsDisabled(!email || !password);
  }, [email, password]);

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
      <FormGroup>
        {hasLabel && <Label>Password</Label>}
        <Input
          placeholder={!hasLabel ? 'Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto"></Col>
        <Col xs="auto">
          <Link className="fs--1" to={`/forgot-password`}>
            Forget Password?
          </Link>
        </Col>
      </Row>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          {loading ? <Spinner color="light" /> : 'Log in'}
        </Button>
      </FormGroup>
    </Form>
  );
};

LoginForm.propTypes = {
  hasLabel: PropTypes.bool,
};

LoginForm.defaultProps = {
  hasLabel: false,
};

export default LoginForm;
