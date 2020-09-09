import React from 'react';
import { Row, Col } from 'reactstrap';

const KanbanHeader = ({ project }) => {
  return (
    <Row noGutters className="bg-100 rounded-soft px-card py-2 mt-2 mb-3 ">
      <Col className="d-flex align-items-center">
        <h5 className="mb-0">{project.name}</h5>
      </Col>
    </Row>
  );
};

export default KanbanHeader;
