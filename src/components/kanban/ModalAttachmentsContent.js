import React, { useState } from 'react';
import { Modal, ModalBody, Media } from 'reactstrap';
import { Link } from 'react-router-dom';

import CollabLightBox from 'src/components/CollabLightBox';
import Background from 'src/components/Background';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalAttachmentsContent = ({ attachments }) => {
  const [nestedModal, setNestedModal] = useState(false);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
  };
  const externalCloseBtn = (
    <button
      className="close text-secondary p-3"
      style={{ position: 'absolute', top: '15px', right: '15px' }}
      onClick={toggleNested}
    >
      <FontAwesomeIcon icon="times" transform="right-0.3 down-0.3" />
    </button>
  );

  return (
    <>
      {attachments
        .filter((a) => a)
        .map((item, index) => {
          return (
            <Media key={index} className={index !== item.length - 1 && 'mb-3'}>
              <div className="bg-attachment mr-3">
                <CollabLightBox imgSrc={item}>
                  <Background image={item} className="rounded" />
                </CollabLightBox>
              </div>

              <Media body className="fs--2">
                <h6 className="mb-1 text-primary">
                  <CollabLightBox imgSrc={item}>
                    <Link to="#!" className="text-decoration-none">
                      {index === 0 ? 'Element Screenshot' : 'Window Screenshot'}
                    </Link>
                  </CollabLightBox>
                </h6>
              </Media>
            </Media>
          );
        })}
    </>
  );
};

export default ModalAttachmentsContent;
