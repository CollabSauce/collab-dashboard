import React from 'react';

import BaseCardLayout from 'src/layouts/BaseCardLayout';
import ForgotPasswordForm from 'src/components/forms/ForgotPasswordForm';

const ForgotPassword = () => (
  <BaseCardLayout>
    <div className="text-center">
      <h5 className="mb-0"> Forgot your password?</h5>
      <small>Enter your email and we'll send you a reset link.</small>
      <ForgotPasswordForm />
    </div>
  </BaseCardLayout>
);

export default ForgotPassword;
