import React from 'react';

import Auth from 'src/components/Auth';
import ResetPasswordForm from 'src/components/forms/ResetPasswordForm';

const ResetPassword = () => (
  <Auth>
    <div className="text-center">
      <h5>Reset new password</h5>
      <ResetPasswordForm />
    </div>
  </Auth>
);

export default ResetPassword;
