import React from 'react';
import { Media, Form, Input, Button } from 'reactstrap';
import Avatar from 'src/components/Avatar';

import { useCurrentUser } from 'src/hooks/useCurrentUser';
import Flex from 'src/components/Flex';

const ModalCommentContent = ({ comments }) => {
  const { result: currentUser } = useCurrentUser();

  return (
    <>
      <Media>
        <Avatar name={`${currentUser.firstName} ${currentUser.lasName}`} className="mr-2" size="l" />
        <Media body className="fs--1">
          <div className="position-relative border rounded mb-3">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Input type="textarea" className="border-0 rounded-bottom-0 resize-none" rows={3} />
              <Flex justify="between" align="center" className="bg-light rounded-bottom p-2 mt-1">
                <Button size="sm" color="primary" type="submit">
                  Save
                </Button>
              </Flex>
            </Form>
          </div>
        </Media>
      </Media>
      {comments.map((comment) => (
        <Media className="mb-3" key={comment.id}>
          <Avatar name={`${comment.creator.firstName} ${comment.creator.lasName}`} size="l" />
          <Media body className="ml-2 fs--1">
            <p className="mb-1 bg-200 rounded-soft p-2">
              <div className="font-weight-semi-bold">{`${comment.creator.firstName} ${comment.creator.lasName}`}</div>{' '}
              {comment.text}
            </p>
          </Media>
        </Media>
      ))}
    </>
  );
};

export default ModalCommentContent;
