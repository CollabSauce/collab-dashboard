import React from 'react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import Error404 from 'src/components/Error404';

const Logout = () => (
  <BaseCardLayout>
    <div className="text-center">
      <Error404 />
    </div>
  </BaseCardLayout>
);

export default Logout;
