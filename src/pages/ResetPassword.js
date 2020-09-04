import React from 'react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import ResetPasswordForm from 'src/components/forms/ResetPasswordForm';

const ResetPassword = () => (
  <BaseCardLayout>
    <div className="text-center">
      <h5>Reset new password</h5>
      <ResetPasswordForm />
    </div>
  </BaseCardLayout>
);

export default ResetPassword;
