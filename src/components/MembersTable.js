import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { formatRole } from 'src/store/jsdata/models/Membership';
import CollabTable from 'src/components/tables/CollabTable';
import { useCurrentUser } from 'src/hooks/useCurrentUser';

const actionFormatter = (dataField, member, currentUser) => {
  const removeMember = async () => {
    const memberEmail = member.user.email;
    await member.destroy();
    toast.info(`${memberEmail} removed.`);
  };

  if (member.user === currentUser) {
    return <div />;
  }

  return (
    // Control your row with this id
    <UncontrolledDropdown>
      <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
        <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
      </DropdownToggle>
      <DropdownMenu right className="border py-2">
        <DropdownItem onClick={removeMember} className="text-danger">
          Remove
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

const columns = [
  {
    dataField: '',
    headerClasses: 'border-0',
    text: 'Name',
    classes: 'border-0 py-2 align-middle',
    sort: true,
    formatter: (dataField, { user }) => `${user.firstName} ${user.lastName}`,
  },
  {
    dataField: 'user.email',
    headerClasses: 'border-0',
    text: 'Email',
    classes: 'border-0 py-2 align-middle',
    sort: true,
  },
  {
    dataField: '',
    headerClasses: 'border-0',
    text: 'Role',
    classes: 'border-0 py-2 align-middle',
    sort: true,
    formatter: (dataField, { role }) => formatRole(role),
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

const MembersTable = ({ members }) => {
  const { result: currentUser } = useCurrentUser();
  // add currentUser to the formatter
  columns[columns.length - 1].formatter = (dataField, member) => actionFormatter(dataField, member, currentUser);

  return <CollabTable data={members} columns={columns} title="Members" />;
};

export default MembersTable;
