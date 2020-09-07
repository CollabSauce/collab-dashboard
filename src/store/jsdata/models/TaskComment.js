import { Schema } from 'js-data';
import { SchemaBase } from './_base';

export const taskCommentSchema = new Schema({
  type: 'object',
  track: true,
  plural: 'task_comments', // custom property used for deserialization
  properties: {
    ...SchemaBase,
    id: { type: 'number' },
    text: { type: 'string' },
  },
});

export const taskCommentRelations = {
  belongsTo: {
    user: {
      foreignKey: 'creatorId',
      localField: 'creator',
    },
    task: {
      foreignKey: 'taskId',
      localField: 'task',
    },
  },
};