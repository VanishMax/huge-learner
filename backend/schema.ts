import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import ImageModel, {Image, ImageGraphqlType} from './img-model';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'queries',
    fields: {
      images: {
        type: GraphQLList(ImageGraphqlType),
        resolve: () => ImageModel.read(),
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutations',
    fields: {
      create_image: {
        type: GraphQLList(ImageGraphqlType),
        args: {
          title: { type: GraphQLString },
        },
        resolve: (source, args) => ImageModel.create(args as Image),
      },
      delete_image: {
        type: ImageGraphqlType,
        args: {
          _id: { type: GraphQLString },
        },
        resolve: (source, args) => ImageModel.delete(args._id),
      },
    },
  }),
});

export default schema;
