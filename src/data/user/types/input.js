import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';
import fields from './fields.js';

export default new GraphQLInputObjectType({
  name: 'UserInput',
  fields: {
    ...fields('input')
  }
});
