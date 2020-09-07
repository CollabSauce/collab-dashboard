import React, { createRef, Fragment, useState } from 'react';
import {
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  InputGroup,
  Media,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import CollabCardHeader from 'src/components/CollabCardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Flex from '../common/Flex';
import Avatar from '../common/Avatar';
import { getPaginationArray } from '../../helpers/utils';

import customers from '../../data/e-commerce/customers';

const actionFormatter = (dataField, { id }: row) => (
  // Control your row with this id
  <UncontrolledDropdown>
    <DropdownToggle color="link" size="sm" className="text-600 btn-reveal mr-3">
      <FontAwesomeIcon icon="ellipsis-h" className="fs--1" />
    </DropdownToggle>
    <DropdownMenu right className="border py-2">
      <DropdownItem onClick={() => console.log('Edit: ', id)}>Edit</DropdownItem>
      <DropdownItem onClick={() => console.log('Delete: ', id)} className="text-danger">
        Delete
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const columns = [
  {
    dataField: 'name',
    headerClasses: 'border-0',
    text: 'Name',
    classes: 'border-0 py-2 align-middle',
    sort: true,
  },
  {
    dataField: 'email',
    headerClasses: 'border-0',
    text: 'Email',
    classes: 'border-0 py-2 align-middle',
    sort: true,
  },
  {
    dataField: 'role',
    headerClasses: 'border-0',
    text: 'Role',
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

const options = {
  custom: true,
  sizePerPage: 12,
  totalSize: customers.length,
};

const Members = () => {
  let table = createRef();

  return (
    <Card className="mb-3">
      <CollabCardHeader title="Members" light={false} />
      <CardBody className="p-0">
        <div className="table-responsive">
          <BootstrapTable
            ref={table}
            bootstrap4
            keyField="id"
            data={customers}
            columns={columns}
            bordered={false}
            classes="table-dashboard table-striped table-sm fs--1 border-bottom border-200 mb-0 table-dashboard-th-nowrap"
            rowClasses="btn-reveal-trigger border-top border-200"
            headerClasses="bg-200 text-900 border-y border-200"
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default Members;
