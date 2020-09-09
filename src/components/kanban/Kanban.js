import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import KanbanHeader from 'src/components/kanban/KanbanHeader';
import KanbanContainer from 'src/components/kanban/KanbanContainer';

const Kanban = ({ project }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementsByTagName('body')[0].classList.add('overflow-hidden');
    dispatch.app.setIsNavbarVerticalCollapsed(true);
    return () => {
      document.getElementsByTagName('body')[0].classList.remove('overflow-hidden');
    };
  }, [dispatch.app]);

  return (
    <>
      <KanbanHeader project={project} />
      <KanbanContainer />
    </>
  );
};

export default Kanban;
