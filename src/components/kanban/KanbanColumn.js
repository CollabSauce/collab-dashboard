import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import KanbanColumnHeader from 'src/components/kanban/KanbanColumnHeader';
import { Droppable } from 'react-beautiful-dnd';

import ButtonIcon from 'src/components/ButtonIcon';
import AddAnotherCard from 'src/components/kanban/AddAnotherCard';
import TaskCard from 'src/components/kanban/TaskCard';

const KanbanColumn = ({ kanbanColumnItem, tasks, onTaskCreated, index }) => {
  const [showForm, setShowForm] = useState(false);

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
      <Droppable droppableId={`${kanbanColumnItem.id}`}>
        {(provided, snapshot) => (
          <>
            <div
              className="kanban-items-container scrollbar"
              id={`container-${index}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.map((taskCard, idx) => (
                <TaskCard taskCard={taskCard} key={taskCard.id} taskCardIndex={idx} />
              ))}
              {showForm && (
                <AddAnotherCard
                  kanbanColumnItem={kanbanColumnItem}
                  setShowForm={setShowForm}
                  onTaskCreated={onTaskCreated}
                />
              )}
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
