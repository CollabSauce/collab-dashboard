import React from 'react';
import { Button, Input, Label } from 'reactstrap';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import sampleProjectCursor from 'src/assets/sample-project-with-cursor.png';
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

  const mailToSubject = 'Widget code for Collab Sauce';
  const mailToBody = `
You've been invited as a developer to add the Collab Sauce widget JavaScript code to your website:

Follow these steps:

1. Copy this line of code:
  <script type="text/javascript" async src="https://${BASE}.collabsauce.com?projectKey=${project.key}"></script>

2. Paste the code right before the closing </body> tag of every page where you want the Collab Sauce widget to appear.
https://collabsauce.tawk.help/article/how-to-install-the-widget

3. Enjoy Collab-Saucing!


https://collabsauce.tawk.help/article/how-to-install-the-widget
  `;

  return (
    <TwoPaneModalLayout
      onClose={onClose}
      className="modal-md-wide"
      leftSideHeader={
        <img className="create-project-modal-img" src={sampleProjectCursor} alt="sampleProjectCursor" width={250} />
      }
      leftSideBody="With the power of Collab Sauce, you can focus on creating a high-quality product with less bugs and get into production at a faster pace."
      leftSideFooter={
        <a
          href={`mailto:?cc=info@collabsauce.com&subject=${encodeURIComponent(mailToSubject)}&body=${encodeURIComponent(
            mailToBody
          )}`}
        >
          <Button className="mt-70" color="light">
            Send Instructions to Developer
          </Button>
        </a>
      }
    >
      <h3>Install Collab Sauce</h3>
      <p className="fs--1">
        Copy and past this code snippet before the <code>{'<body>'}</code> tag on every page you want Collab Sauce to
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
