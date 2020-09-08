import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import KanbanColumnHeader from 'src/components/kanban/KanbanColumnHeader';
import { Droppable } from 'react-beautiful-dnd';

import { useStoreState } from 'src/hooks/useStoreState';
import ButtonIcon from 'src/components/ButtonIcon';
import AddAnotherCard from 'src/components/kanban/AddAnotherCard';
import TaskCard from 'src/components/kanban/TaskCard';

const KanbanColumn = ({ kanbanColumnItem, index }) => {
  const [showForm, setShowForm] = useState(false);

  const { result: tasks } = useStoreState(
    (store) => {
      return store.getAll('task').filter((task) => task.taskColumnId === kanbanColumnItem.id);
    },
    [kanbanColumnItem.id],
    'task'
  );

  useEffect(() => {
    const kanbanContainer = document.getElementById(`container-${index}`);
    kanbanContainer.scrollTop = kanbanContainer.scrollHeight;
  }, [showForm, index]);

  return (
    <div className={classNames('kanban-column', { 'form-added': showForm })}>
      <KanbanColumnHeader
        kanbanColumnItem={kanbanColumnItem}
        numTasks={tasks.length}
        onAddCardClick={() => {
          setShowForm(true);
        }}
      />
      <Droppable droppableId={kanbanColumnItem.id}>
        {(provided, snapshot) => (
          <>
            <div
              className="kanban-items-container scrollbar"
              id={`container-${index}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((taskCard, taskCardIndex) => {
                const taskCardImage = taskCard.elementScreenshotUrl;

                return (
                  <TaskCard
                    members={[]}
                    taskCardImage={taskCardImage}
                    taskCard={taskCard}
                    key={taskCard.id}
                    taskCardIndex={taskCardIndex}
                    taskCardItemId={taskCard.id}
                  />
                );
              })}
              {showForm && <AddAnotherCard kanbanColumnItem={kanbanColumnItem} setShowForm={setShowForm} />}
              {provided.placeholder}
            </div>
            {!showForm && (
              <div className="kanban-column-footer">
                <ButtonIcon
                  className="btn-add-card text-600 text-decoration-none"
                  color="link"
                  block
                  icon="plus"
                  iconClassName="mr-1"
                  size="sm"
                  onClick={() => {
                    setShowForm(true);
                  }}
                >
                  Add another card
                </ButtonIcon>
              </div>
            )}
          </>
        )}
      </Droppable>
    </div>
  );
};
KanbanColumn.propTypes = {
  kanbanColumnItem: PropTypes.object.isRequired,
};
export default KanbanColumn;
