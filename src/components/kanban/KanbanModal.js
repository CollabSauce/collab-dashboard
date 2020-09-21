import React from 'react';
import { Link } from 'react-router-dom';
import { Button, ModalBody, Row, Col } from 'reactstrap';
import Background from 'src/components/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CollabCommentRenderer from 'src/components/CollabCommentRenderer';
import ModalMediaContent from 'src/components/kanban/ModalMediaContent';
import ModalAttachmentsContent from 'src/components/kanban/ModalAttachmentsContent';
import ModalDesignEditsContent from 'src/components/kanban/ModalDesignEditsContent';
import ModalMetadataContent from 'src/components/kanban/ModalMetadataContent';
import ModalCommentContent from 'src/components/kanban/ModalCommentContent';

const KanbanModal = ({ task, projectId }) => {
  const taskCard = task;
  const taskCardImage = task.elementScreenshotUrl;

  return (
    <ModalBody className="p-0">
      {taskCardImage && (
        <div className="position-relative overflow-hidden py-8">
          <Background image={taskCardImage} className="rounded-soft-top" />
        </div>
      )}
      <div className="bg-light rounded-soft-top px-4 py-3">
        <h4 className="mb-1">Task # {task.taskNumber}</h4>
        <p className="fs--2 mb-0">
          Added by <span className="text-600 font-weight-semi-bold">{taskCard.creatorFullName}</span>
        </p>
      </div>
      <div className="position-absolute t-0 r-0  z-index-1">
        <Link to={`/projects/${projectId}`}>
          <Button size="sm" className="close close-circle d-flex flex-center transition-base mt-3 mr-3">
            <FontAwesomeIcon icon="times" transform="shrink-6 right-0.3 down-0.3" />
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <Row>
          <Col lg="11">
            {/* //title */}
            <ModalMediaContent title="Description" icon="book-open">
              <div className="text-word-break fs--1">
                <CollabCommentRenderer content={taskCard.title} />
              </div>
            </ModalMediaContent>
            {/* //Attachment */}
            {(taskCard.elementScreenshotUrl || taskCard.windowScreenshotUrl) && (
              <ModalMediaContent title="Attachments" icon="paperclip" headingClass="d-flex justify-content-between">
                <ModalAttachmentsContent attachments={[taskCardImage, taskCard.windowScreenshotUrl]} />
              </ModalMediaContent>
            )}
            {/* //Design changes */}
            {taskCard.designEdits && (
              <ModalMediaContent title="Design Changes" icon="paint-brush" headingClass="mb-3">
                <ModalDesignEditsContent designEdits={task.designEdits} />
              </ModalMediaContent>
            )}
            {/* //Task metadata */}
            {taskCard.taskMetadata && (
              <ModalMediaContent title="Metadata" icon="info" headingClass="mb-3">
                <ModalMetadataContent metadata={task.taskMetadata} />
              </ModalMediaContent>
            )}
            {/* //Comment */}
            <ModalMediaContent title="Comments" icon={['far', 'comment']} headingClass="mb-3">
              <ModalCommentContent task={task} />
            </ModalMediaContent>
          </Col>
        </Row>
      </div>
    </ModalBody>
  );
};

export default KanbanModal;
