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
  const { result: projects } = useStoreState(
    (store) =>
      store.getAll('project').filter((project) => {
        return organizations.length ? project.organizationId === organizations[0].id : false;
      }),
    [organizations],
    'project'
  );

  const isAdminOfOrg = useMemo(() => {
    if (organizations.length) {
      const org = organizations[0];
      return org.memberships.find((m) => m.user === currentUser && m.role === MemberRoleTypes.ADMIN);
    }
    return false;
    // eslint-disable-next-line
  }, [organizations, currentUser, loading]);

  const projectRows = useMemo(() => {
    const rows = []; // 3 per row
    projects.forEach((project, index) => {
      const projectRowIndex = Math.floor(index / 3);
      if (!rows[projectRowIndex]) {
        rows.push([]);
      }
      rows[projectRowIndex].push(project);
    });
    return rows;
  }, [projects]);

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

  return (
    <>
      {isAdminOfOrg && (
        <div className="mb-3">
          <CreateProjectBlock onClick={onClickCreateProject} />
          {showCreateProjectModal && <CreateProjectModal onClose={closeProjectModal} onCreate={onCreateProject} />}
        </div>
      )}

      {projectRows.map((row, rowIdx) => {
        return (
          <div className="d-none d-lg-flex justify-content-between" key={rowIdx}>
            {row.map((project, projectIdx) => (
              <ProjectCard
                key={project.id}
                project={project}
                onInstallWidgetClick={openWidgetInfoModel}
                className="mb-3 items-3"
              />
            ))}
            {row.length === 2 && <div className="mb-3 items-3" />}
          </div>
        );
      })}

      <div className="d-flex flex-wrap d-lg-none">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onInstallWidgetClick={openWidgetInfoModel}
            className="mb-3 w-100"
          />
        ))}
      </div>

      {!projects.length && !isAdminOfOrg && <NoProjectsNoAdminBlock />}

      {currentlyCreatedProject && <WidgetInfoModal project={currentlyCreatedProject} onClose={closeWidgetInfoModal} />}
    </>
  );
};

export default Home;
