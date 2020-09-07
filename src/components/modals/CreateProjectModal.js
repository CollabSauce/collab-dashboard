import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';

import TwoPaneModalLayout from 'src/layouts/TwoPaneModalLayout';
import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';

const CreateProjectModal = ({ onClose }) => {
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = { name: projectName, url: projectUrl };
      await jsdataStore.create('project', data);
      toast.success(
        <>
          Project <span className="font-weight-semi-bold font-italic">{projectName}</span>created.
        </>
      );
      onClose();
    } catch (e) {
      toast.error(handleNetworkError(e));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!projectName);
  }, [projectName]);

  return (
    <TwoPaneModalLayout
      onClose={onClose}
      leftSideHeader={'🎉'}
      leftSideBody="With the power of Collabsauce, you can focus on creating a high-quality product with less bugs and get into production at a faster pace."
    >
      <h3>Create a New Project</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>New project name</Label>
          <Input
            placeholder={''}
            value={projectName}
            onChange={({ target }) => setProjectName(target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Label>URL (optional)</Label>
          <Input
            placeholder={''}
            value={projectUrl}
            onChange={({ target }) => setProjectUrl(target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Button color="primary" block className="mt-3" disabled={isDisabled}>
            {loading ? <Spinner color="light" /> : 'Create Project'}
          </Button>
        </FormGroup>
      </Form>
    </TwoPaneModalLayout>
  );
};

export default CreateProjectModal;
