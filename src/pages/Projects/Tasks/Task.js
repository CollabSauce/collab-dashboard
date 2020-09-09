import React, { useState, useEffect } from 'react';
import { Modal, Spinner } from 'reactstrap';
import { useParams, useHistory } from 'react-router-dom';

import { jsdataStore } from 'src/store/jsdata';
import KanbanModal from 'src/components/kanban/KanbanModal';

const Task = () => {
  const [task, setTask] = useState(null);
  const { projectId, taskId } = useParams();
  const history = useHistory();

  const loadTask = async () => {
    const loadedTask = await jsdataStore.find('task', taskId, {
      params: { include: ['task_metadata.', 'task_comments.creator.', 'creator.', 'project'] },
      force: true,
    });
    setTask(loadedTask);
  };

  useEffect(() => {
    loadTask();
    // eslint-disable-next-line
  }, [taskId]);

  const toggle = () => {
    history.push(`/projects/${projectId}`);
  };

  return (
    <Modal
      isOpen={true}
      toggle={toggle}
      className={`mt-6`}
      contentClassName="border-0"
      modalClassName="theme-modal"
      size="lg"
    >
      {task ? <KanbanModal projectId={projectId} task={task} /> : <Spinner color="primary" />}
    </Modal>
  );
};

export default Task;
