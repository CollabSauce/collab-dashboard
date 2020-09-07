import React from 'react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';

const NoProjectsNoAdminBlock = () => (
  <BaseCardLayout noLogo>
    <div className="text-center">
      <h4>No Projects Available</h4>
      <p>
        Please ask the admin of this organization <br className="d-none d-sm-block" />
        to create a project.
      </p>
    </div>
  </BaseCardLayout>
);

export default NoProjectsNoAdminBlock;
