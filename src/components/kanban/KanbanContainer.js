import React, { useRef, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import { usDispatch, useSelector } from 'react-redux';
import is from 'is_js';
import { useParams } from 'react-router-dom';

import { jsdataStore } from 'src/store/jsdata';
import { useStoreState } from 'src/hooks/useStoreState';
import { isIterableArray } from 'src/utils/helpers';
import KanbanColumn from 'src/components/kanban/KanbanColumn';
import KanbanModal from 'src/components/kanban/KanbanModal';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (list, newTaskId, endIndex) => {
  const result = Array.from(list);
  result.splice(endIndex, 0, [newTaskId]);

  return result;
};

const KanbanContainer = () => {
  const { id: projectId } = useParams();

  useEffect(() => {
    jsdataStore.findAll('taskColumn', {
      'filter{project}': projectId,
      include: ['tasks.task_metadata.', 'tasks.task_comments.creator.', 'tasks.creator.'],
    });
  }, [projectId]);

  const { result: kanbanColumns } = useStoreState(
    (store) => {
      return store.getAll('taskColumn').filter((column) => column.projectId === projectId);
    },
    [projectId],
    'taskColumn'
  );

  const modal = useSelector((state) => state.kanban.modal);
  const modalContent = useSelector((state) => state.kanban.modalContent);
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  // Detect device
  useEffect(() => {
    if (is.ipad()) {
      containerRef.current.classList.add('ipad');
    }
    if (is.mobile()) {
      containerRef.current.classList.add('mobile');
      if (is.safari()) {
        containerRef.current.classList.add('safari');
      }
      if (is.chrome()) {
        containerRef.current.classList.add('chrome');
      }
    }
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // `source.droppableId` is the columnId of the original taskColumn of the moved task
    // `source.index` is where the task was placed inside the original taskColumn
    // `destination.droppableId` is the columnId of the new taskColumn of the moved task
    // `destination.index` is where it's placed in the new taskColumn
    // `draggableId` is the task-id of the moved task

    let reorderedTaskIds, reordered;
    const column = kanbanColumns.find((col) => col.id === destination.droppableId);
    const currentSortedTaskIds = column.tasks.sort((a, b) => a.order - b.order).map((task) => task.id);

    if (source.droppableId === destination.droppableId) {
      // reorder current column
      reorderedTaskIds = reorder(currentSortedTaskIds, source.index, destination.index);
      reordered = reorderedTaskIds.map((id, idx) => ({ id, order: idx }));
    } else {
      // move task to different column and reorder new column.
      reorderedTaskIds = move(currentSortedTaskIds, result.draggableId, destination.index);
      reordered = reorderedTaskIds.map((id, idx) => {
        const data = { id, order: idx }; // update the new order of the task
        if (id === result.draggableId) {
          data.taskColumn = destination.droppableId; // we also need to update the taskColumn of the moved task
        }
        return data;
      });
    }

    jsdataStore.updateMany('task', reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container scrollbar" ref={containerRef}>
        {isIterableArray(kanbanColumns) &&
          kanbanColumns.map((kanbanColumnItem, index) => {
            return <KanbanColumn kanbanColumnItem={kanbanColumnItem} key={index} index={index} />;
          })}
        <KanbanModal modal={modal} setModal={dispatch.kanban.setModal} modalContent={modalContent} />
      </div>
    </DragDropContext>
  );
};

export default KanbanContainer;
