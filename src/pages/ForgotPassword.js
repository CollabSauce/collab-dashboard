import React from 'react';

import Auth from 'src/components/Auth';
import ForgotPasswordForm from 'src/components/forms/ForgotPasswordForm';

const ForgotPassword = () => (
  <Auth>
    <div className="text-center">
      <h5 className="mb-0"> Forgot your password?</h5>
      <small>Enter your email and we'll send you a reset link.</small>
      <ForgotPasswordForm />
    </div>
  </Auth>
);

export default ForgotPassword;
