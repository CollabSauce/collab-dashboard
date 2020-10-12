import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';

import sampleProject from 'src/assets/sample-project.png';
import TwoPaneModalLayout from 'src/layouts/TwoPaneModalLayout';
import { jsdataStore } from 'src/store/jsdata';
import { handleNetworkError } from 'src/utils/error';

const CreateProjectModal = ({ onClose, onCreate }) => {
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
      const project = await jsdataStore.create('project', data);
      toast.success(
        <>
          Project <span className="font-weight-semi-bold font-italic">{projectName}</span> created.
        </>
      );
      onCreate(project);
    } catch (err) {
      Sentry.captureException(err);
      toast.error(handleNetworkError(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsDisabled(!projectName);
  }, [projectName]);

  return (
    <TwoPaneModalLayout
      onClose={onClose}
      leftSideHeader={<img className="create-project-modal-img" src={sampleProject} alt="sampleProject" width={250} />}
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
