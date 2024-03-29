import React from 'react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import LogoutContent from 'src/components/LogoutContent';

const Logout = () => (
  <BaseCardLayout>
    <div className="text-center">
      <LogoutContent />
    </div>
  </BaseCardLayout>
);

export default Logout;
