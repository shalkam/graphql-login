import { GraphQLString } from 'graphql';

export default input => {
  let fields = {
    _id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString }
  };
  return fields;
};
