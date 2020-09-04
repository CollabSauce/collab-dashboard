import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Spinner from 'react-bootstrap/Spinner';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Logo from 'src/components/Logo';

import { jsdataStore } from 'src/store/jsdata';
import { setAuthToken } from 'src/utils/auth';
import { handleNetworkError } from 'src/utils/error';
import { DEFAULT_ROUTE_WHEN_AUTHENTICATED } from 'src/constants';
import { useQueryParams } from 'src/hooks/useQueryParams';

const Auth = ({ authType }) => {
  const isRegister = authType === 'signup';
  const isLogin = authType === 'login';
  const isForgotPassword = authType === 'forgot_password';
  const isResetPassword = authType === 'reset_password';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectToPreviousRoute, setRedirectToPreviousRoute] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [passwordIsReset, setPasswordIsReset] = useState(false);
  const dispatch = useDispatch();

  let isDisabled = false;
  if (isRegister) {
    isDisabled = !email || !password || !password2;
  } else if (isLogin) {
    isDisabled = !email || !password;
  } else if (isForgotPassword) {
    isDisabled = !email;
  } else {
    isDisabled = !password || !password2;
  }

  const queryParams = useQueryParams();
  const next = queryParams.next || DEFAULT_ROUTE_WHEN_AUTHENTICATED;

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setAuthError('');
    setResetEmailSent(false);
    try {
      const emailValid = isResetPassword ? true : email.length && email.includes('@'); // skip email check on resetPassword
      if (emailValid) {
        setLoading(true);

        if (isForgotPassword) {
          await jsdataStore.getMapper('user').resetPassword({ data: { email } });
          setResetEmailSent(true);
          setLoading(false);
        } else if (isResetPassword) {
          const credentials = {
            uid: queryParams.uid,
            token: queryParams.token,
            new_password1: password,
            new_password2: password2,
          };
          await jsdataStore.getMapper('user').resetPasswordConfirm({ data: credentials });
          setPasswordIsReset(true);
          setLoading(false);
        } else {
          const credentials = isRegister ? { email, password1: password, password2 } : { email, password };
          const method = isRegister ? 'signupUser' : 'loginUser';
          const response = await jsdataStore.getMapper('user')[method]({ data: credentials });
          setAuthToken(response.data.key); // DOES THIS WORK FOR SIGNUP?
          await dispatch.app.initializeApp();
          setLoading(false);
          setRedirectToPreviousRoute(true);
        }
      } else {
        setAuthError('Please enter a valid email');
      }
    } catch (e) {
      setAuthError(handleNetworkError(e));
      setLoading(false);
    }
  };

  if (redirectToPreviousRoute) {
    return <Redirect to={next} />;
  }

  return (
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
        <Logo />
        <Card>
          <CardBody className="fs--1 font-weight-normal p-5">{children}</CardBody>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div className="auth-page">
      <div className="auth-main">
        <Form noValidate onSubmit={onSubmitForm} className="auth-form">
          <p className="auth-title">
            CollabSauce{' '}
            {isRegister ? 'Signup' : isLogin ? 'Login' : isForgotPassword ? 'Forgot Password' : 'Reset Password'}
          </p>
          {isForgotPassword && !resetEmailSent && (
            <p className="text-secondary">Please enter your email address. Reset instructions will be sent to you.</p>
          )}

          {isResetPassword && !passwordIsReset && <p className="text-secondary">Please enter a new password.</p>}

          {resetEmailSent && <p className="text-success">Please check your email for reset instructions.</p>}

          {passwordIsReset && <p className="text-success">Password has been succesfully updated! Please login.</p>}

          {(isLogin || isRegister || isForgotPassword) && (
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                className="auth-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          )}

          {(isLogin || isRegister || isResetPassword) && (
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                className="auth-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          )}

          {(isRegister || isResetPassword) && (
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                className="auth-input"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
          )}

          {isLogin && (
            <LinkContainer to="/forgot-password">
              <Button variant="link">Forgot Password?</Button>
            </LinkContainer>
          )}

          <div className="auth-button-holder">
            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button variant="primary" type="submit" className="auth-button" disabled={isDisabled}>
                <span className="auth-button-text">
                  {isRegister ? 'Register' : isLogin ? 'Login' : isForgotPassword ? 'Send Email' : 'Set Password'}
                </span>
              </Button>
            )}
          </div>
          {authError && <p className="text-danger">{authError}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Auth;
