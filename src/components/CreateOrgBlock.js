import React from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import intro from 'src/assets/intro.png';

const CreateOrgBlock = ({ onClick }) => (
  <Card>
    <CardBody className="overflow-hidden p-lg-6">
      <Row className="align-items-center justify-content-between">
        <Col lg={6}>
          <img src={intro} className="img-fluid" alt="" />
        </Col>
        <Col lg={6} className="pl-lg-4 my-5 text-center text-lg-left">
          <h3>Welcome to Collab Sauce!</h3>
          <p className="lead">Create Your First Project</p>
          <Button color="falcon-primary" onClick={onClick}>
            Getting started
          </Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
);

export default CreateOrgBlock;
