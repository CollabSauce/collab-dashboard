import { Schema } from 'js-data/src/index.js';
import { SchemaBase } from './_base';

export const inviteSchema = new Schema({
  type: 'object',
  track: true,
  plural: 'invites', // custom property used for deserialization
  properties: {
    ...SchemaBase,
    id: { type: 'number' },
    name: { type: 'string' },
    email: { type: 'string' },
    state: { type: 'number' },
  },
});

export const inviteRelations = {
  belongsTo: {
    user: {
      foreignKey: 'inviterId',
      localField: 'inviter',
    },
    organization: {
      foreignKey: 'organizationId',
      localField: 'organization',
    },
  },
};
