import React, { useMemo } from 'react';
import uniqBy from 'lodash/uniqBy';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardBody, Badge, CardImg, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CollabCommentRenderer from 'src/components/CollabCommentRenderer';

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

  // NOTE NOTE NOTE: I Was using `useStoreState` for task comments, but for some reason, using
  // that for taskComments was causing infinite rerender loops. As a bandaid, I'm just using
  // the below line of code. It turns out that we dont even need `useStoreState` in this scenario anyways.
  // I.e, when adding a comment in the moda, the task card updates automatically anyways (probably because)
  // we are rerendering for some reason because the route changed.
  const taskComments = taskCard.taskComments;
  const uniqueCommentCreators = useMemo(() => {
    return uniqBy(taskComments, 'creatorId').map((comment) => ({
      fullName: comment.creatorFullName,
      id: comment.creatorId,
    }));
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
                    {taskCard.hasTextCopyChanges && (
                      <Badge className={`badge-soft-info d-inline-block py-1 mr-1 mb-0`}>Text Change</Badge>
                    )}
                  </div>
                  <Badge color="soft-dark">#{taskCard.taskNumber}</Badge>
                </div>
                {taskCard.assignedToFullName && (
                  <div className="d-flex align-items-center mb-3">
                    <Avatar name={`${taskCard.assignedToFullName}`} size="l" className="mr-2" />
                    <p className="mb-0 font-weight-bold">{taskCard.assignedToFullName}</p>
                  </div>
                )}
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
                    {uniqueCommentCreators.map((creator, index) => (
                      <div
                        className={index > 0 ? 'ml-n1 p-0' : 'p-0'}
                        key={index}
                        id={`creator-${creator.id}-${taskCard.id}`}
                      >
                        <Avatar name={creator.fullName} size="l" />
                        <UncontrolledTooltip target={`creator-${creator.id}-${taskCard.id}`}>
                          {creator.fullName}
                        </UncontrolledTooltip>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ml-2 mr-2 mt-1 mb-1">
                  Created by <i>{`${taskCard.creatorFullName}`}</i>
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
