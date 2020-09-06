import React from 'react';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';

const CreateProjectBlock = ({ onClick }) => {
  return (
    <Card className="mt-3">
      <CardBody>
        <Row className="justify-content-between align-items-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">Create a new project</h5>
          </Col>
          <Col xs="auto">
            <Button color="falcon-primary" size="sm" onClick={onClick}>
              Create New
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default CreateProjectBlock;
