import {
  GraphQLBoolean
} from 'graphql';

import model from '../model.js';

export default {
  type: GraphQLBoolean,
  resolve (root, params, options) {
    return model
      .remove({})
      .exec();
  }
};
