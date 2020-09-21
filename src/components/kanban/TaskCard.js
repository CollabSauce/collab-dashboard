import React, { useMemo } from 'react';
import uniq from 'lodash/uniq';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardBody, Badge, CardImg, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CollabCommentRenderer from 'src/components/CollabCommentRenderer';

import { useStoreState } from 'src/hooks/useStoreState';
import Avatar from 'src/components/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getItemStyle = (isDragging) => ({
  // change background color if dragging
  cursor: isDragging ? 'grabbing' : 'pointer',
  transform: isDragging ? 'rotate(-3deg)' : '',
  transition: 'all 0.3s ease-out',

  // styles we need to apply on draggables
});

const TaskCard = ({ taskCard, taskCardIndex }) => {
  const location = useLocation();
  const taskCardImage = taskCard.elementScreenshotUrl;

  const { result: taskComments } = useStoreState(
    (store) => store.getAll('taskComment').filter((tc) => tc.task.id === taskCard.id),
    [taskCard],
    'taskComment'
  );
  const uniqueMembers = useMemo(() => {
    const members = taskComments.map((comment) => comment.creator);
    return uniq(members);
  }, [taskComments]);

  return (
    <Draggable draggableId={`${taskCard.id}`} index={taskCardIndex}>
      {(provided, snapshot) => (
        <div
          className="kanban-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          <Link to={`${location.pathname}/tasks/${taskCard.id}`} className="text-decoration-none">
            <Card className="kanban-item-card hover-actions-trigger" style={getItemStyle(snapshot.isDragging)}>
              {taskCardImage && (
                <CardImg
                  top
                  width="100%"
                  src={taskCardImage}
                  className="overflow-hidden position-relative"
                  alt="Card image cap"
                />
              )}

              <CardBody>
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    {taskCard.designEdits && (
                      <Badge className={`badge-soft-success d-inline-block py-1 mr-1 mb-0`}>Design Change</Badge>
                    )}
                  </div>
                  <Badge color="soft-dark">#{taskCard.taskNumber}</Badge>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <Avatar
                    name={`${taskCard.creator.firstName} ${taskCard.creator.lastName}`}
                    size="l"
                    className="mr-2"
                  />
                  <p className="mb-0 font-weight-bold">
                    {taskCard.creator.firstName} {taskCard.creator.lastName}
                  </p>
                </div>
                <CollabCommentRenderer className="mb-0 font-weight-medium text-sans-serif" content={taskCard.title} />
                <div className="kanban-item-footer">
                  <div className="text-500">
                    {taskComments.length > 0 && (
                      <span id={`comments-${taskCard.id}`} className="mr-2">
                        <FontAwesomeIcon icon={['far', 'comment-alt']} className="mr-1" />
                        <span>{taskComments.length}</span>
                        <UncontrolledTooltip target={`comments-${taskCard.id}`}>
                          {taskComments.length} Comments
                        </UncontrolledTooltip>
                      </span>
                    )}
                  </div>
                  <div className="d-flex">
                    {uniqueMembers &&
                      uniqueMembers.map((member, index) => (
                        <div
                          className={index > 0 ? 'ml-n1 p-0' : 'p-0'}
                          key={index}
                          id={`member-${member.id}-${taskCard.id}`}
                        >
                          <Avatar name={`${member.firstName} ${member.lastName}`} size="l" />
                          <UncontrolledTooltip target={`member-${member.id}-${taskCard.id}`}>
                            {`${member.firstName} ${member.lastName}`}
                          </UncontrolledTooltip>
                        </div>
                      ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
