import React, { useRef, useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import is from 'is_js';

import { jsdataStore } from 'src/store/jsdata';
import { isIterableArray } from 'src/utils/helpers';
import KanbanColumn from 'src/components/kanban/KanbanColumn';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSourceIndex, droppableDestinationIndex) => {
  const sourceTasks = Array.from(source);
  const destTasks = Array.from(destination);
  const [removed] = sourceTasks.splice(droppableSourceIndex, 1);

  destTasks.splice(droppableDestinationIndex, 0, removed);

  return [sourceTasks, destTasks];
};

// NOTE: need to manually store columns and tasks so the kanboard doesn't flicker.
// I.e. just updating jsdata is too slow.
const KanbanContainer = () => {
  const { projectId } = useParams();
  const [columns, setColumns] = useState([]);

  const fetchKanbanData = async () => {
    const taskColumns = await jsdataStore.findAll(
      'taskColumn',
      {
        'filter{project}': projectId,
        include: ['project', 'tasks.task_metadata.', 'tasks.task_comments.creator.', 'tasks.creator.'],
      },
      { force: true }
    );
    const cols = taskColumns.map((tc) => ({
      taskColumn: tc,
      tasks: tc.tasks.sort((a, b) => a.order - b.order),
    }));
    setColumns(cols);
  };

  useEffect(() => {
    fetchKanbanData();
    // eslint-disable-next-line
  }, [projectId]);

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
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // `source.droppableId` is the columnId of the original taskColumn of the moved task
    // `source.index` is where the task was placed inside the original taskColumn
    // `destination.droppableId` is the columnId of the new taskColumn of the moved task
    // `destination.index` is where it's placed in the new taskColumn

    if (source.droppableId === destination.droppableId) {
      // reorder current column
      const destinationColumn = columns.find((col) => col.taskColumn.id === parseInt(destination.droppableId));
      const reorderedTasks = reorder(destinationColumn.tasks, source.index, destination.index);

      // update the local data structure
      const newColumns = columns.map((column) => {
        if (column === destinationColumn) {
          return { ...destinationColumn, tasks: reorderedTasks };
        } else {
          return column;
        }
      });
      setColumns(newColumns);

      // update the server, which will return a response that will update the jsdata-tasks locally
      const reordered = reorderedTasks.map((task, idx) => ({
        id: parseInt(task.id),
        order: idx,
        task_column: parseInt(destination.droppableId),
        project: parseInt(projectId),
      }));
      jsdataStore.getMapper('task').reorderTasks({ data: reordered });
    } else {
      // move task to different column and reorder new column.
      const sourceColumn = columns.find((col) => col.taskColumn.id === parseInt(source.droppableId));
      const destinationColumn = columns.find((col) => col.taskColumn.id === parseInt(destination.droppableId));
      const [reorderedSourceTasks, reorderedDestTasks] = move(
        sourceColumn.tasks,
        destinationColumn.tasks,
        source.index,
        destination.index
      );

      // update the local data structure
      const newColumns = columns.map((column) => {
        if (column === sourceColumn) {
          return { ...sourceColumn, tasks: reorderedSourceTasks };
        } else if (column === destinationColumn) {
          return { ...destinationColumn, tasks: reorderedDestTasks };
        } else {
          return column;
        }
      });
      setColumns(newColumns);

      // update the server, which will return a response that will update the jsdata-tasks locally
      const reorderedSource = reorderedSourceTasks.map((task, idx) => ({
        id: parseInt(task.id),
        order: idx,
        task_column: parseInt(source.droppableId),
        project: parseInt(projectId),
      }));
      const reorderedDest = reorderedDestTasks.map((task, idx) => ({
        id: parseInt(task.id),
        order: idx,
        task_column: parseInt(destination.droppableId),
        project: parseInt(projectId),
      }));
      jsdataStore.getMapper('task').reorderTasks({ data: [...reorderedSource, ...reorderedDest] });
    }
  };

  const addTaskToColumn = (task, destinationColumn) => {
    const updatedCols = columns.map((column) => {
      if (column === destinationColumn) {
        return {
          ...destinationColumn,
          tasks: [...destinationColumn.tasks, task],
        };
      } else {
        return column;
      }
    });
    setColumns(updatedCols);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-container scrollbar" ref={containerRef}>
        {isIterableArray(columns) &&
          columns.map((kanbanColumnItem, index) => {
            return (
              <KanbanColumn
                kanbanColumnItem={kanbanColumnItem.taskColumn}
                tasks={kanbanColumnItem.tasks}
                onTaskCreated={(task) => {
                  addTaskToColumn(task, kanbanColumnItem);
                }}
                key={index}
                index={index}
              />
            );
          })}
      </div>
    </DragDropContext>
  );
};

export default KanbanContainer;
