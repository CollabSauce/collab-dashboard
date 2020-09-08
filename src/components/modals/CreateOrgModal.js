import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import TwoPaneModalLayout from 'src/layouts/TwoPaneModalLayout';
import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';

const CreateOrgModal = ({ onClose }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await jsdataStore.create('organization', { name: organizationName });
      await jsdataStore.findAll('organization', { include: ['memberships.user'] }); // reload the org with its memberships
      toast.success(
        <>
          Organization <span className="font-weight-semi-bold font-italic">{organizationName}</span> created.
        </>
      );
      onClose();
    } catch (e) {
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!organizationName);
  }, [organizationName]);

  return (
    <TwoPaneModalLayout
      onClose={onClose}
      leftSideHeader={'🎉'}
      leftSideBody="With the power of Collabsauce, you can focus on creating a high-quality product with less bugs and get into production at a faster pace."
      leftSideBody2="Create an organization so when you invite other members they know the invite is from you."
    >
      <h3>Name your Organization</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Organization Name</Label>
          <Input
            placeholder={''}
            value={organizationName}
            onChange={({ target }) => setOrganizationName(target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" block className="mt-3" disabled={isDisabled}>
            {loading ? <Spinner color="light" /> : 'Create Organization'}
          </Button>
        </FormGroup>
      </Form>
    </TwoPaneModalLayout>
  );
};

export default CreateOrgModal;
