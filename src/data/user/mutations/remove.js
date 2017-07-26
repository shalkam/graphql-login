import { GraphQLNonNull, GraphQLID } from 'graphql';
import type from '../types/index.js';
import model from '../model';

export default {
  type: type,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve(root, params, options, ast) {
    return model.remove(...arguments);
  }
};
