import React from 'react';
import { Card, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import CollabCardHeader from 'src/components/CollabCardHeader';

const CollabTable = ({ data, columns, title, RightHeader }) => {
  return (
    <Card className="mb-3">
      <CollabCardHeader title={title} light={false}>
        {RightHeader}
      </CollabCardHeader>
      <CardBody className="p-0">
        <div className="table-responsive">
          <BootstrapTable
            bootstrap4
            keyField="id"
            data={data}
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

export default CollabTable;
