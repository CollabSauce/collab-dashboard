import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { jsdataStore } from 'src/store/jsdata';
import CollabTable from 'src/components/tables/CollabTable';

const actionFormatter = (dataField, { id }) => {
  const cancelInvite = async () => {
    const data = { invite: id };
    await jsdataStore.getMapper('invite').cancelInvite({ data });
    toast.info('Invite Canceled');
  };

  return (
    // Control your row with this id
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
    dataField: '',
    headerClasses: 'border-0',
    text: '',
    classes: 'border-0 py-2 align-middle',
    formatter: actionFormatter,
    align: 'right',
  },
];

const InvitesTable = ({ invites }) => {
  return <CollabTable data={invites} columns={columns} title="Invites" />;
};

export default InvitesTable;
