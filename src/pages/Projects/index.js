import React from 'react';

import RenderRoutes from 'src/components/Routes';

const Projects = (props) => {
  return (
    <div>
      <h1>hey</h1>
      {props.routes && <RenderRoutes routes={props.routes} />}
    </div>
  );
};

export default Projects;
