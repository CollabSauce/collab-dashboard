import React, { useEffect, useState } from 'react';

import InvitePeopleBlock from 'src/components/InvitePeopleBlock';
import { jsdataStore } from 'src/store/jsdata';
import { useStoreState } from 'src/hooks/useStoreState';

const Members = () => {
  const [members, setMembers] = useState([]);

  // TODO: this assumes only 1 org
  // const { result: members } = useStoreState((store) => store.getAll('organization')[0].memberships, [], 'organization');
  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');

  const fetchMembers = async () => {
    // TODO: this assumes only 1 org
    const membs = await jsdataStore.findAll('membership', {
      'filter{organization}': organizations[0].id,
      include: ['user.'],
    });
    setMembers(membs);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (members && members.length === 1) {
    return <InvitePeopleBlock />;
  }

  return <div>hihihi</div>;
};

export default Members;
