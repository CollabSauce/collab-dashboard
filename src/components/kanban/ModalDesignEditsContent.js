import React from 'react';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button } from 'reactstrap';

import CodeHighlight from 'src/components/CodeHighlight';

const ModalDesignEditsContent = ({ designEdits }) => {
  const onCopyToClipboard = () => toast.info('Copied to clipboard!');

  return (
    <div className="position-relative max-w-440">
      <CodeHighlight code={designEdits} language="css" dark />
      <CopyToClipboard text={designEdits} onCopy={onCopyToClipboard}>
        <Button color="primary" className="position-absolute top-right">
          Copy Code
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default ModalDesignEditsContent;
