import React from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';
import Logo from 'src/components/Logo';

const BaseCardLayout = ({ children, noLogo }) => (
  <Row className="flex-center py-6">
    <Col sm={11} md={10} lg={8} xl={6} className="col-xxl-5">
      {noLogo ? null : <Logo />}
      <Card>
        <CardBody className="fs--1 font-weight-normal p-5">{children}</CardBody>
      </Card>
    </Col>
  </Row>
);

export default BaseCardLayout;
