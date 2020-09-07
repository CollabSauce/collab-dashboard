import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';

import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';

const ForgetPasswordForm = () => {
  // State
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setResetEmailSent(false);
    try {
      const emailValid = email.length && email.includes('@');
      if (emailValid) {
        setLoading(true);
        await jsdataStore.getMapper('user').resetPassword({ data: { email } });
        setResetEmailSent(true);
        setLoading(false);
      } else {
        toast.error('Please enter a valid email');
      }
    } catch (e) {
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  if (resetEmailSent) {
    return <p className="text-success">Please check your email for reset instructions.</p>;
  }

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          className="form-control"
          placeholder="Email address"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary" block disabled={!email}>
          {loading ? <Spinner color="light" /> : 'Send reset link'}
        </Button>
      </FormGroup>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {};

ForgetPasswordForm.defaultProps = {};

export default ForgetPasswordForm;
