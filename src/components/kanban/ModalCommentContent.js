import React, { useState } from 'react';
import { Media, Form, Button } from 'reactstrap';

import { jsdataStore } from 'src/store/jsdata';
import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import CollabMentionInput from 'src/components/CollabMentionInput';
import CollabCommentRenderer from 'src/components/CollabCommentRenderer';
import Avatar from 'src/components/Avatar';
import Flex from 'src/components/Flex';

const ModalCommentContent = ({ task }) => {
  const [commentText, setCommentText] = useState('');
  const { result: currentUser } = useCurrentUser();
  const handleCreateTaskComment = async (event) => {
    event.preventDefault();
    const taskComment = {
      task: task.id,
      text: commentText,
    };

    await jsdataStore.getMapper('taskComment').createTaskComment({ data: taskComment });
    setCommentText('');
  };

  const { result: comments } = useStoreState(
    (store) => store.getAll('taskComment').filter((tc) => tc.task.id === task.id),
    [task],
    'taskComment'
  );

  return (
    <>
      {comments.map((comment) => (
        <Media className="mb-3" key={comment.id}>
          <Avatar name={`${comment.creator.firstName} ${comment.creator.lastName}`} size="l" />
          <Media body className="ml-2 fs--1">
            <div className="mb-1 bg-200 rounded-soft p-2">
              <div className="font-weight-semi-bold">{`${comment.creator.firstName} ${comment.creator.lastName}`}</div>{' '}
              <CollabCommentRenderer content={comment.text} />
            </div>
          </Media>
        </Media>
      ))}
      <Media>
        <Avatar name={`${currentUser.firstName} ${currentUser.lastName}`} className="mr-2" size="l" />
        <Media body className="fs--1">
          <div className="position-relative border rounded mb-3">
            <Form onSubmit={handleCreateTaskComment}>
              <CollabMentionInput value={commentText} onChange={({ target }) => setCommentText(target.value)} />
              <Flex justify="between" align="center" className="bg-light rounded-bottom p-2 mt-1">
                <Button size="sm" color="primary" type="submit" disabled={!commentText}>
                  Save
                </Button>
              </Flex>
            </Form>
          </div>
        </Media>
      </Media>
    </>
  );
};

export default ModalCommentContent;
