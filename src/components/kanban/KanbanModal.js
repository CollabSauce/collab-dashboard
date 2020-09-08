import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import Background from 'src/components/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalMediaContent from 'src/components/kanban/ModalMediaContent';

import { useStoreState } from 'src/hooks/useStoreState';
import ModalAttachmentsContent from 'src/components/ModalAttachmentsContent';
import ModalCommentContent from 'src/components/kanban/ModalCommentContent';

const KanbanModal = ({ modal, setModal, className, modalContent }) => {
  const { taskCardImage, taskCard } = modalContent;
  const { result: taskComments } = useStoreState(
    (store) => {
      return store.getAll('taskComment').filter((c) => c.taskId === taskCard.id);
    },
    [taskCard.id],
    'taskComment'
  );

  const toggle = () => setModal(!modal);

  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      className={`mt-6 ${className ? className : ''}`}
      contentClassName="border-0"
      modalClassName="theme-modal"
      size="lg"
    >
      <ModalBody className="p-0">
        {taskCardImage && (
          <div className="position-relative overflow-hidden py-8">
            <Background image={taskCardImage} className="rounded-soft-top" />
          </div>
        )}
        <div className="bg-light rounded-soft-top px-4 py-3">
          <h4 className="mb-1">{taskCard.title}</h4>
          <p className="fs--2 mb-0">
            Added by{' '}
            <span className="text-600 font-weight-semi-bold">
              {taskCard.creator.firstName} {taskCard.creator.lastName}
            </span>
          </p>
        </div>
        <div className="position-absolute t-0 r-0  z-index-1">
          <Button
            size="sm"
            className="close close-circle d-flex flex-center transition-base mt-3 mr-3"
            onClick={toggle}
          >
            <FontAwesomeIcon icon="times" transform="shrink-6 right-0.3 down-0.3" />
          </Button>
        </div>
        <div className="p-4">
          <Row>
            <Col lg="9">
              {/* //description */}
              <ModalMediaContent title="Description" icon="paperclip">
                <p className="text-word-break fs--1">{taskCard.description}</p>
              </ModalMediaContent>
              {/* //Attachment */}
              <ModalMediaContent title="Attachments" icon="paperclip" headingClass="d-flex justify-content-between">
                <ModalAttachmentsContent attachments={[taskCardImage, taskCard.windowScreenshotUrl]} />
              </ModalMediaContent>
              {/* //Comment */}
              <ModalMediaContent title="Comments" icon={['far', 'comment']} headingClass="mb-3">
                <ModalCommentContent comments={taskComments} />
              </ModalMediaContent>
            </Col>
          </Row>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default KanbanModal;
