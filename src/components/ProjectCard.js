import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';

import CollabCardHeader from 'src/components/CollabCardHeader';

const ProjectCard = ({ project, onInstallWidgetClick, index }) => {
  return (
    <Card className="mb-3 items-3-lg">
      <CollabCardHeader title={project.name} light={false} titleClass="fs-0" />
      <CardBody className="bg-light">
        <img
          className="mb-3"
          width="100%"
          src="https://i.insider.com/5ce6ee37f85e163ebd1f0894?width=1800&format=jpeg&auto=webp"
          alt="Latest Project Img"
        />
        <Button color="falcon-primary" block onClick={() => onInstallWidgetClick(project)}>
          Install Widget
        </Button>
        <Button tag={Link} color="primary" block to={`/projects/${project.id}`}>
          Go to Project
        </Button>
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
