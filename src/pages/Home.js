import React, { useState } from 'react';

import { jsdataStore } from 'src/store/jsdata';
import Starter from 'src/components/Starter';
import CreateOrgModal from 'src/components/CreateOrgModal';
import CreateProjectBlock from 'src/components/CreateProjectBlock';
import CreateProjectModal from 'src/components/CreateProjectModal';

import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Home = () => {
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const { result: organizations } = useStoreState((store) => store.getAll('organizations'), [], 'organization');
  const { result: organizations } = useStoreState((store) => store.getAll('organizations'), [], 'organization');
  const { result: currentUser } = useCurrentUser();

  const isAdminOfOrg = useMemo(() => {
    if (organizations.length) {
      const org = organizations[0];
      return org.memberships.find((m) => m.user === currentUser && m.isAdmin);
    }
    return false;
  }, [organizations.length, currentUser]);

  const onClickStarter = () => {
    setShowCreateOrgModal(true);
  };

  const closeOrgModal = () => {
    setShowCreateOrgModal(false);
  };

  const onClickCreateProject = () => {
    setShowCreateProjectModal(true);
  };

  const closeProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  // if user does not belong to any orgs, allow them to create an org
  if (!organizations.length) {
    return (
      <>
        <Starter onClick={onClickStarter} />
        {showCreateOrgModal && <CreateOrgModal onClose={closeOrgModal} />}
      </>
    );
  }

  // if the user is an admin of the org, show the "create project" component
  if (isAdminOfOrg) {
    <>
      <CreateProjectBlock onClick={onClickCreateProject} />
      {showCreateProjectModal && <CreateProjectModal onClose={closeProjectModal} />}
    </>;
  }

  // show any projects
  if (organizations[0].projects.length) {
  } else if (!isAdminOfOrg) {
    // if the are no projects, and the user is not an admin of the organization, show this to the user
  }
};

export default Home;
