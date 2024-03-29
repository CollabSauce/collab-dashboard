import React, { useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { jsdataStore } from 'src/store/jsdata';
import ButtonIcon from 'src/components/ButtonIcon';
import InvitePeopleBlock from 'src/components/InvitePeopleBlock';
import CollabTable from 'src/components/tables/CollabTable';

const actionFormatter = (dataField, invite, isAdminOfOrg) => {
  const cancelInvite = async () => {
    const data = { invite: invite.id };
    await jsdataStore.getMapper('invite').cancelInvite({ data });
    toast.info('Invite Canceled');
  };

  if (!isAdminOfOrg) {
    return <div />;
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={cancelInvite} className="text-danger">
          Cancel Invite
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const columns = [
  {
    dataField: 'email',
    headerClasses: 'border-0',
    text: 'Email',
    classes: 'border-0 py-2 align-middle',
    sort: true,
  },
  {
    dataField: 'ellipsis',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: actionFormatter,
    align: 'right',
  },
];

const InvitesTable = ({ invites, isAdminOfOrg }) => {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const openInviteModal = () => setShowInviteModal(true);
  const closeInviteModal = () => setShowInviteModal(false);

  // add isAdminOfOrg to the formatter
  columns[columns.length - 1].formatter = (dataField, invite) => actionFormatter(dataField, invite, isAdminOfOrg);

  return (
    <>
      <CollabTable
        data={invites}
        columns={columns}
        title="Invites"
        RightHeader={
          isAdminOfOrg ? (
            <ButtonIcon
              icon="plus"
              transform="shrink-3 down-2"
              color="falcon-default"
              size="sm"
              onClick={openInviteModal}
            >
              New
            </ButtonIcon>
          ) : (
            <div />
          )
        }
      />
      {showInviteModal && (
        <Modal size="xl" centered isOpen={true} toggle={closeInviteModal} onClosed={closeInviteModal}>
          <ModalHeader toggle={closeInviteModal} className="pb-0 border-0" />
          <InvitePeopleBlock inModal onInvite={closeInviteModal} className="box-shadow-inherit" />
        </Modal>
      )}
    </>
  );
};

export default InvitesTable;
