import React from 'react';
import { Button, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import TwoPaneModalLayout from 'src/layouts/TwoPaneModalLayout';
import CodeHighlight from 'src/components/CodeHighlight';

const BASE = process.env.REACT_APP_ENV === 'staging' ? 'widget.staging' : 'widget';

const WidgetInfoModal = ({ project, onClose }) => {
  const onCopyToClipboard = () => toast.info('Copied to clipboard!');
  const codeSnippetForClipboard = `<script type="text/javascript" async src="https://${BASE}.collabsauce.com?projectKey=${project.key}"></script>`;
  const codeSnippetForHighlight = `<script
    type="text/javascript"
    async
    src="https://${BASE}.collabsauce
        .com?projectKey=
        ${project.key}"
  ></script>`;

  return (
    <TwoPaneModalLayout
      onClose={onClose}
      className="modal-md-wide"
      leftSideHeader={'👩‍💻💻'}
      leftSideBody="With the power of Collabsauce, you can focus on creating a high-quality product with less bugs and get into production at a faster pace."
    >
      <h3>Install Collabsauce</h3>
      <p className="fs--1">
        Copy and past this code snippet before the <code>{'<body>'}</code> tag on every page you want collabsauce to
        appear.
      </p>
      <div className="position-relative">
        <CodeHighlight code={codeSnippetForHighlight} language="html" dark />
        <CopyToClipboard text={codeSnippetForClipboard} onCopy={onCopyToClipboard}>
          <Button color="primary" className="position-absolute top-right">
            Copy Code
          </Button>
        </CopyToClipboard>
      </div>
      <Label className="mt-4 mb-2">Project API Key</Label>
      <Input type="text" aria-label={project.key} value={project.key} disabled className="bg-white mb-4" />
      <Button color="primary" block onClick={onClose}>
        Complete
      </Button>
    </TwoPaneModalLayout>
  );
};

export default WidgetInfoModal;
