import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql';

import getProjection from '../../../../get-projection';
import type from '../types/index.js';
import model from '../model.js';

export default {
  type: type,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve (root, params, options, ast) {
    const projection = getProjection(ast.operation.selectionSet.selections[0]);
    const removed = await model
      .findByIdAndRemove(params._id, {
        select: projection
      })
      .exec();

    if (!removed) {
      throw new Error('Error removing blog post');
    }

    return removed;
  }
};
