import React from 'react';
import * as dayjs from 'dayjs';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ModalMetadataContent = ({ metadata }) => {
  const {
    created,
    browserName,
    browserVersion,
    osName,
    osVersion,
    osVersionName,
    screenWidth,
    screenHeight,
    devicePixelRatio,
    browserWindowWidth,
    browserWindowHeight,
    colorDepth,
  } = metadata;

  const metadatas = [
    {
      key: 'Task Created At',
      value: dayjs(created).format('dddd, MMMM D, YYYY h:mm A'),
    },
    {
      key: 'Browser',
      value: `${browserName} ${browserVersion}`,
    },
    {
      key: 'Operating System',
      value: `${osName} ${osVersion} ${osVersionName}`,
    },
    {
      key: 'Screen Resolution',
      value: `${screenWidth * devicePixelRatio} x ${screenHeight * devicePixelRatio} px`,
    },
    {
      key: 'Browser Window',
      value: `${browserWindowWidth} x ${browserWindowHeight} px`,
    },
    {
      key: 'Color Depth',
      value: `${colorDepth}`,
    },
  ];

  return (
    <ListGroup flush>
      {metadatas.map(({ key, value }) => (
        <ListGroupItem key={key} className="text-sans-serif fs--1 p-2 background-color-inherit">
          <p className="mb-1 font-weight-semi-bold">{key}</p>
          <p className="mb-0">{value}</p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default ModalMetadataContent;
