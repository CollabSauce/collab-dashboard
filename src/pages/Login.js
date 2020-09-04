import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import Auth from 'src/components/Auth';
import LoginForm from 'src/components/forms/LoginForm';

const Login = () => (
  <Auth authType="login">
    <>
      <Row className="text-left justify-content-between">
        <Col xs="auto">
          <h5>Log in</h5>
        </Col>
        <Col xs="auto">
          <p className="fs--1 text-600">
            or <Link to="/signup">create an account</Link>
          </p>
        </Col>
      </Row>
      <LoginForm />
    </>
  </Auth>
);

export default Login;
