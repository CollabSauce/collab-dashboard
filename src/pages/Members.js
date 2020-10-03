import React, { useEffect, useState, useMemo } from 'react';
import { Spinner } from 'reactstrap';

import InvitePeopleBlock from 'src/components/InvitePeopleBlock';
import MembersTable from 'src/components/MembersTable';
import InvitesTable from 'src/components/InvitesTable';
import { jsdataStore } from 'src/store/jsdata';
import { InviteStates } from 'src/store/jsdata/models/Invite';
import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { MemberRoleTypes } from 'src/store/jsdata/models/Membership';

const Members = () => {
  const [membersLoaded, setMembersLoaded] = useState(false);
  const [invitesLoaded, setInvitesLoaded] = useState(false);

  const fetchMembers = async () => {
    await jsdataStore.findAll(
      'membership',
      {
        include: ['user.'],
      },
      { force: true }
    );
    setMembersLoaded(true);
  };

  const fetchInvites = async () => {
    await jsdataStore.findAll('invite', {
      'filter{state}': InviteStates.CREATED,
      include: ['organization'],
    });
    setInvitesLoaded(true);
  };

  const { result: memberships } = useStoreState((store) => store.getAll('membership'), [], 'membership');
  const { result: invites } = useStoreState(
    (store) => {
      return store.getAll('invite').filter((i) => i.state === InviteStates.CREATED);
    },
    [],
    'invite'
  );

  useEffect(() => {
    fetchMembers();
    fetchInvites();
    // eslint-disable-next-line
  }, []);

  const { result: currentUser } = useCurrentUser();
  const isAdminOfOrg = useMemo(() => {
    return memberships.find((m) => m.user === currentUser && m.role === MemberRoleTypes.ADMIN);
    // eslint-disable-next-line
  }, [memberships, currentUser, membersLoaded]);

  if (!membersLoaded || !invitesLoaded) {
    return <Spinner color="light" />;
  }

  if (invites.length === 0 && memberships.length === 1) {
    return <InvitePeopleBlock />;
  }

  return (
    <>
      <MembersTable members={memberships} currentUser={currentUser} isAdminOfOrg={isAdminOfOrg} />
      <InvitesTable invites={invites} isAdminOfOrg={isAdminOfOrg} />
    </>
  );
};

export default Members;
