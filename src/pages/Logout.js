import React from 'react';

import Auth from 'src/components/Auth';
import LogoutContent from 'src/components/forms/LogoutContent';

const Logout = () => (
  <Auth>
    <div className="text-center">
      <LogoutContent />
    </div>
  </Auth>
);

export default Logout;
