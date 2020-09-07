import React from 'react';

import InvitePeopleBlock from 'src/components/InvitePeopleBlock';
import { useStoreState } from 'src/hooks/useStoreState';

const Members = () => {
  // TODO: this assumes only 1 org
  const { result: members } = useStoreState((store) => store.getAll('organization')[0].memberships, [], 'organization');

  if (members && members.length === 1) {
    return <InvitePeopleBlock />;
  }

  return <div>hihihi</div>;
};

export default Members;
