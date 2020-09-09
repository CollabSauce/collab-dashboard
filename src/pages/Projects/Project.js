import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useStoreState } from 'src/hooks/useStoreState';
import { jsdataStore } from 'src/store/jsdata';
import Kanban from 'src/components/kanban/Kanban';

const Project = () => {
  const [loading, setLoading] = useState(true);
  const { id: projectId } = useParams();
  const { result: project } = useStoreState((store) => store.get('project', projectId), [projectId, loading]);

  const loadProject = async () => {
    await jsdataStore.find('project', projectId, { force: true });
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line
  }, []);

  if (!project) {
    return null;
  }

  return <Kanban project={project} />;
};

export default Project;
