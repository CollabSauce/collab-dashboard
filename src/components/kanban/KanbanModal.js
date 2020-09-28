import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ModalBody, Row, Col } from 'reactstrap';
import Background from 'src/components/Background';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { jsdataStore } from 'src/store/jsdata';
import CollabCommentRenderer from 'src/components/CollabCommentRenderer';
import ModalMediaContent from 'src/components/kanban/ModalMediaContent';
import ModalAttachmentsContent from 'src/components/kanban/ModalAttachmentsContent';
import ModalDesignEditsContent from 'src/components/kanban/ModalDesignEditsContent';
import ModalMetadataContent from 'src/components/kanban/ModalMetadataContent';
import ModalCommentContent from 'src/components/kanban/ModalCommentContent';
import AssignSelect from 'src/components/AssignSelect';

const KanbanModal = ({ task, projectId }) => {
  const taskCard = task;
  const taskCardImage = task.elementScreenshotUrl;
  const [rerender, setRerender] = useState(false);

  const onAssigneeChange = async (option) => {
    let userId = null;
    if (option) {
      userId = option.value;
    }
    try {
      // const user = userId ? jsdataStore.get('user', userId) : null;
      const data = { assigned_to_id: userId, task_id: task.id };
      await jsdataStore.getMapper('task').updateAssignee({ data });
      const message = userId ? `Task assigned to ${option.label}` : 'Task successfully unassigned';
      toast.success(message);
      setRerender(!rerender); // HACKY but useStoreState isn't working correctly for individual items.
      // TODO: look into the above fix of useStoreState to get rid of above hack.
    } catch (e) {
      console.log(e);
      toast.error('Changing of assignee failed');
    }
  };

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
            {/* //assignee */}
            <ModalMediaContent title="Assigned To (optional)" icon="user-tag">
              <AssignSelect
                value={task.assignedToId ? { value: task.assignedToId, label: task.assignedToFullName } : null}
                onChange={onAssigneeChange}
                className="mt-2"
              />
            </ModalMediaContent>
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
