import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import Auth from 'src/components/Auth';
import SignupForm from 'src/components/forms/SignupForm';

const Signup = () => (
  <Auth>
    <>
      <Row className="text-left">
        <Col>
          <h5 id="modalLabel">Register</h5>
        </Col>
        <Col xs="auto">
          <p className="fs--1 text-600">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
      <SignupForm />
    </>
  </Auth>
);

export default Signup;
