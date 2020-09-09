import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { jsdataStore } from 'src/store/jsdata';
import { Button, Form, Input, Row, Col } from 'reactstrap';

const AddAnotherCard = ({ kanbanColumnItem, setShowForm, onTaskCreated }) => {
  const [cardHeaderTitle, setCardHeaderTitle] = useState('');
  const { id: projectId } = useParams();

  const handleAddCard = async (value) => {
    const task = {
      title: value,
      target_dom_path: 'NONE',
      project: parseInt(projectId),
      task_column: parseInt(kanbanColumnItem.id),
    };

    const response = await jsdataStore.getMapper('task').createTask({ data: task });
    onTaskCreated(response.data.task);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCard(cardHeaderTitle);
    setShowForm(false);
    setCardHeaderTitle('');
  };
  return (
    <div className="p-3 border bg-white rounded-soft transition-none mt-3">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="textarea"
          placeholder="Enter a title for this card..."
          className="mb-2 add-card"
          value={cardHeaderTitle}
          autoFocus
          onChange={({ target }) => {
            setCardHeaderTitle(target.value);
          }}
        />
        <Row form className="mt-2">
          <Col>
            <Button color="primary" size="sm" block type="submit">
              Add
            </Button>
          </Col>
          <Col>
            <Button
              color="outline-secondary"
              size="sm"
              block
              className="border-400"
              onClick={() => {
                setShowForm(false);
                setCardHeaderTitle('');
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddAnotherCard;
