import React from 'react';
import { Media } from 'reactstrap';

import CollabLightBox from 'src/components/CollabLightBox';
import Background from 'src/components/Background';

const ModalAttachmentsContent = ({ attachments }) => {
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
                    <div className="text-decoration-none">
                      {index === 0 ? 'Element Screenshot' : 'Window Screenshot'}
                    </div>
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
