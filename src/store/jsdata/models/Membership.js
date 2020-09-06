import { Schema } from 'js-data/src/index.js';
import { SchemaBase } from './_base';

export const membershipSchema = new Schema({
  type: 'object',
  track: true,
  plural: 'memberships', // custom property used for deserialization
  properties: {
    ...SchemaBase,
    id: { type: 'number' },
    isAdmin: { type: 'boolean' },
  },
});

export const membershipRelations = {
  belongsTo: {
    user: {
      foreignKey: 'userId',
      localField: 'user',
    },
    organization: {
      foreignKey: 'organizationId',
      localField: 'organization',
    },
  },
};
