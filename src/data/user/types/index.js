import {
  GraphQLObjectType
} from 'graphql';
import fields from './fields.js';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    ...fields()
  }
});
