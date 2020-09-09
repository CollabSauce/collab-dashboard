import React, { useState, useEffect, useMemo } from 'react';

import CreateOrgBlock from 'src/components/CreateOrgBlock';
import CreateOrgModal from 'src/components/modals/CreateOrgModal';
import CreateProjectBlock from 'src/components/CreateProjectBlock';
import CreateProjectModal from 'src/components/modals/CreateProjectModal';
import WidgetInfoModal from 'src/components/modals/WidgetInfoModal';
import NoProjectsNoAdminBlock from 'src/components/NoProjectsNoAdminBlock';
import ProjectCard from 'src/components/ProjectCard';

import { jsdataStore } from 'src/store/jsdata';
import { useStoreState } from 'src/hooks/useStoreState';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { MemberRoleTypes } from 'src/store/jsdata/models/Membership';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showCreateOrgModal, setShowCreateOrgModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [currentlyCreatedProject, setCurrentlyCreatedProject] = useState(null);

  const loadData = async () => {
    await jsdataStore.findAll(
      'membership',
      {
        include: ['user.', 'organization.projects.'],
      },
      {
        force: true,
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const { result: currentUser } = useCurrentUser();
  const { result: organizations } = useStoreState((store) => store.getAll('organization'), [], 'organization');

  const isAdminOfOrg = useMemo(() => {
    if (organizations.length) {
      const org = organizations[0];
      return org.memberships.find((m) => m.user === currentUser && m.role === MemberRoleTypes.ADMIN);
    }
    return false;
    // eslint-disable-next-line
  }, [organizations, currentUser, loading]);

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

  const onCreateProject = (project) => {
    closeProjectModal();
    setCurrentlyCreatedProject(project);
  };

  const openWidgetInfoModel = (project) => {
    setCurrentlyCreatedProject(project);
  };

  const closeWidgetInfoModal = () => {
    setCurrentlyCreatedProject(null);
  };

  if (loading) {
    return null;
  }

  // if user does not belong to any orgs, allow them to create an org
  if (!organizations.length) {
    return (
      <>
        <CreateOrgBlock onClick={onClickStarter} />
        {showCreateOrgModal && <CreateOrgModal onClose={closeOrgModal} />}
      </>
    );
  }

  const projects = organizations[0].projects;

  return (
    <>
      {isAdminOfOrg && (
        <div className="mb-3">
          <CreateProjectBlock onClick={onClickCreateProject} />
          {showCreateProjectModal && <CreateProjectModal onClose={closeProjectModal} onCreate={onCreateProject} />}
        </div>
      )}

      {projects.length ? (
        <div className="d-flex flex-wrap justify-content-between">
          {organizations[0].projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} onInstallWidgetClick={openWidgetInfoModel} index={index} />
          ))}
        </div>
      ) : null}

      {!projects.length && !isAdminOfOrg && <NoProjectsNoAdminBlock />}

      {currentlyCreatedProject && <WidgetInfoModal project={currentlyCreatedProject} onClose={closeWidgetInfoModal} />}
    </>
  );
};

export default Home;
