import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, FormGroup, Input, Spinner } from 'reactstrap';
import Label from 'reactstrap/es/Label';

import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';
import { useQueryParams } from 'src/hooks/useQueryParams';

const ResetPasswordForm = ({ hasLabel }) => {
  // State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const queryParams = useQueryParams();

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const credentials = {
        uid: queryParams.uid,
        token: queryParams.token,
        new_password1: password,
        new_password2: confirmPassword,
      };
      await jsdataStore.getMapper('user').resetPasswordConfirm({ data: credentials });
      setLoading(false);
      toast.success('Password has been succesfully updated! Please login.');
      history.push('/login');
    } catch (e) {
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!password || !confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Form className={classNames('mt-3', { 'text-left': hasLabel })} onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>New Password</Label>}
        <Input
          placeholder={!hasLabel ? 'New Password' : ''}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Confirm Password</Label>}
        <Input
          placeholder={!hasLabel ? 'Confirm Password' : ''}
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          type="password"
        />
      </FormGroup>
      <Button color="primary" block className="mt-3" disabled={isDisabled}>
        {loading ? <Spinner color="light" /> : 'Set password'}
      </Button>
    </Form>
  );
};

ResetPasswordForm.propTypes = { hasLabel: PropTypes.bool };

ResetPasswordForm.defaultProps = { hasLabel: false };

export default ResetPasswordForm;
