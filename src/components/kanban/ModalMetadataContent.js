import React from 'react';
import * as dayjs from 'dayjs';
import { ListGroup, ListGroupItem } from 'reactstrap';

const ModalMetadataContent = ({ metadata, task }) => {
  const {
    created,
    urlOrigin,
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
  const { targetId, targetDomPath } = task;

  const url = new URL(urlOrigin);
  const qpToAdd = targetId ? `collabsauce_target_id=${targetId}` : `collabsauce_target_selector=${targetDomPath}`;
  const qpSymbol = url.search.length ? '&' : '?';
  const urlLink = `${urlOrigin}${qpSymbol}${qpToAdd}`;

  const metadatas = [
    {
      key: 'Task Created At',
      value: dayjs(created).format('dddd, MMMM D, YYYY h:mm A'),
    },
    {
      key: 'Url',
      value: urlOrigin,
      href: urlLink,
      link: true,
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
      {metadatas.map(({ key, value, link }) => (
        <ListGroupItem key={key} className="text-sans-serif fs--1 p-2 background-color-inherit">
          <p className="mb-1 font-weight-semi-bold">{key}</p>
          {link ? (
            <a href={urlLink} target="_blank" rel="noopener noreferrer" className="color-inherit">
              {value}
            </a>
          ) : (
            <p className="mb-0">{value}</p>
          )}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default ModalMetadataContent;
