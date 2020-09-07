import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';

import InvitePeopleBlock from 'src/components/InvitePeopleBlock';
import MembersTable from 'src/components/MembersTable';
import InvitesTable from 'src/components/InvitesTable';
import { jsdataStore } from 'src/store/jsdata';
import { InviteStates } from 'src/store/jsdata/models/Invite';
import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Members = () => {
  const [membersLoaded, setMembersLoaded] = useState(false);
  const [invitesLoaded, setInvitesLoaded] = useState(false);
  const { result: currentUser } = useCurrentUser();
  const organization = currentUser.memberships[0].organization; // TODO: assumes only one organization. update when multiple

  const fetchMembers = async () => {
    await jsdataStore.findAll('membership', {
      'filter{organization}': organization.id,
      include: ['user.', 'organization'],
    });
    setMembersLoaded(true);
  };

  const fetchInvites = async () => {
    await jsdataStore.findAll('invite', {
      'filter{organization}': organization.id,
      'filter{state}': InviteStates.CREATED,
      include: ['organization'],
    });
    setInvitesLoaded(true);
  };

  const { result: memberships } = useStoreState(
    (store) => {
      return store.getAll('membership').filter((m) => m.organization.id === organization.id);
    },
    [],
    'membership'
  );
  const { result: invites } = useStoreState(
    (store) => {
      return store
        .getAll('invite')
        .filter((i) => i.organization.id === organization.id && i.state === InviteStates.CREATED);
    },
    [],
    'invite'
  );

  useEffect(() => {
    fetchMembers();
    fetchInvites();
    // eslint-disable-next-line
  }, []);

  if (!membersLoaded || !invitesLoaded) {
    return <Spinner color="light" />;
  }

  if (invites.length === 0 && memberships.length === 1) {
    return <InvitePeopleBlock />;
  }

  return (
    <>
      <MembersTable members={memberships} />
      <InvitesTable invites={invites} />
    </>
  );
};

export default Members;
