import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

import CollabCardHeader from 'src/components/CollabCardHeader';
import sampleProjectImage from 'src/assets/sample-project-image.png';

const ProjectCard = ({ project, onInstallWidgetClick, addMarginLeft, className }) => {
  return (
    <Card className={classNames(className)}>
      <CollabCardHeader title={project.name} light={false} titleClass="fs-0" />
      <CardBody className="bg-light">
        <img className="mb-3" width="100%" src={sampleProjectImage} alt="CollabSauce project sample img" />
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
