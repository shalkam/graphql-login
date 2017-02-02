import { GraphQLString, GraphQLObjectType, GraphQLNonNull } from 'graphql';
import model from '../model/index.js';

export default {
  type: new GraphQLObjectType({
    name: 'login',
    fields: { username: { type: GraphQLString }, message: { type: GraphQLString } }
  }),
  args: {
    username: { name: 'username', type: GraphQLString },
    password: { name: 'password', type: GraphQLString }
  },
  resolve(root, params, context, ast) {
    const res = model.login(...arguments);
    return res;
  }
}
