import React, { useState, useMemo } from 'react';

import CreateOrgBlock from 'src/components/CreateOrgBlock';
import CreateOrgModal from 'src/components/modals/CreateOrgModal';
import CreateProjectBlock from 'src/components/CreateProjectBlock';
import CreateProjectModal from 'src/components/modals/CreateProjectModal';
import NoProjectsNoAdminBlock from 'src/components/NoProjectsNoAdminBlock';

import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const Home = () => {
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');
  const { result: currentUser } = useCurrentUser();

  const isAdminOfOrg = useMemo(() => {
    if (organizations.length) {
      const org = organizations[0];
      return org.memberships.find((m) => m.user === currentUser && m.isAdmin);
    }
    return false;
  }, [organizations, currentUser]);

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
        <CreateOrgBlock onClick={onClickStarter} />
        {showCreateOrgModal && <CreateOrgModal onClose={closeOrgModal} />}
      </>
    );
  }

  return (
    <>
      {isAdminOfOrg && (
        <>
          <CreateProjectBlock onClick={onClickCreateProject} />
          {showCreateProjectModal && <CreateProjectModal onClose={closeProjectModal} />}
        </>
      )}

      {organizations[0].projects.length ? (
        <>
          {organizations[0].projects.map((project) => {
            return <div>{project.name}</div>;
          })}
        </>
      ) : null}

      {!organizations[0].projects.length && !isAdminOfOrg && <NoProjectsNoAdminBlock />}
    </>
  );
};

export default Home;
