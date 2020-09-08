import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const KanbanColumnHeder = ({ kanbanColumnItem, numTasks, onAddCardClick }) => {
  return (
    <div className="kanban-column-header">
      <h5 className="text-serif fs-0 mb-0">
        {kanbanColumnItem.name} <span className="text-500">({numTasks})</span>
      </h5>
      <UncontrolledDropdown className="text-sans-serif btn-reveal-trigger">
        <DropdownToggle color="reveal" size="sm" className="py-0 px-2">
          <FontAwesomeIcon icon="ellipsis-h" />
        </DropdownToggle>
        <DropdownMenu right className="py-0">
          <DropdownItem onClick={onAddCardClick}>Add Card</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default KanbanColumnHeder;
