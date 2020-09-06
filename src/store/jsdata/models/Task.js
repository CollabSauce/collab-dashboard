import { Schema } from 'js-data';
import { SchemaBase } from './_base';

export const taskSchema = new Schema({
  type: 'object',
  track: true,
  plural: 'tasks', // custom property used for deserialization
  properties: {
    ...SchemaBase,
    id: { type: 'number' },
    description: { type: 'string' },
    designEdits: { type: 'string' },
    screenshotUrl: { type: 'string' },
    taskNumber: { type: 'number' },
    isResolved: { type: 'boolean' },
    targetId: { type: 'string' },
    targetDomPath: { type: 'string' },
  },
});

export const taskRelations = {
  hasOne: {
    taskMetaData: {
      foreignKey: 'taskMetadata',
      localField: 'taskMetadata',
    },
  },
  belongsTo: {
    user: {
      foreignKey: 'creatorId',
      localField: 'creator',
    },
    project: {
      foreignKey: 'projectId',
      localField: 'project',
    },
    taskColumn: {
      foreignKey: 'taskColumnId',
      localField: 'taskColumn',
    },
  },
  hasMany: {
    taskComment: {
      foreignKey: 'taskId', // this needs to match the foreignKey field on the taskComment model (ie taskComment.taskId)
      localField: 'taskComments',
    },
  },
};
