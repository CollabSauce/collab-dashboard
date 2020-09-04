import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import SignupForm from 'src/components/forms/SignupForm';

const Signup = () => (
  <BaseCardLayout>
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
  </BaseCardLayout>
);

export default Signup;
