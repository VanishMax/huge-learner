import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'User',
    fields: {
      name: {
        type: GraphQLString,
        resolve() {
          return 'max';
        },
      },
    },
  }),
});

export default schema;
