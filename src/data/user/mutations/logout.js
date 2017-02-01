import { GraphQLObjectType, GraphQLBoolean } from 'graphql';
import model from '../model/index.js';

export default {
  type: new GraphQLObjectType({ name: 'logout', fields: { result: { type: GraphQLBoolean } } }),
  resolve(root, params, context, ast) {
    const res = model.logout(...arguments);
    return res;
  }
}
