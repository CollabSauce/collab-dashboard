import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'reactstrap';

import { useStoreState } from 'src/hooks/useStoreState';

import RenderRoutes from 'src/components/Routes';

const SamplePageTopLevel = (props) => (
  <>
    <h1>SamplePageTopLevel</h1>
    {props.routes && <RenderRoutes subrouteProps={{ param1: 'hello' }} routes={props.routes} />}
    <h1>Bye BYe</h1>
  </>
);

export const SamplePageMain = (props) => (
  <>
    <h1>SamplePagePrimary</h1>
    <p>{props.param1}</p>
    <Link to="/app/page">Go to secondary page</Link>
  </>
);

export const SamplePageSecondary = (props) => {
  const { result: posts } = useStoreState((store) => store.getAll('post'), [], 'post');
  const updatePost = (post) => {
    post.title = 'new title here';
    post.save({ changesOnly: true });
  };

  return (
    <>
      <h1>SamplePageSecondary</h1>
      <p>{props.param1}</p>
      <Link to="/app">Go to primary page</Link>
      {posts.map((post) => (
        <div>
          <p>{post.title}</p>
          <Button variant="success" onClick={() => updatePost(post)}>
            Success
          </Button>
        </div>
      ))}
    </>
  );
};

export default SamplePageTopLevel;
