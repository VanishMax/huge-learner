import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import ImageModel, {
  Image, ImageGraphqlType, UpdateImageInputType, SearchImageInputType,
} from './img-model';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'queries',
    fields: {
      images: {
        type: GraphQLList(ImageGraphqlType),
        args: SearchImageInputType,
        resolve: (source, args) => ImageModel.read(args),
      },
    },
  }),

  mutation: new GraphQLObjectType({
    name: 'mutations',
    fields: {
      create_image: {
        type: GraphQLList(ImageGraphqlType),
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (source, args) => ImageModel.create(args as Image),
      },
      update_image: {
        type: ImageGraphqlType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLString) },
          upd: {
            type: UpdateImageInputType,
            defaultValue: {},
          },
        },
        resolve: (source, args) => ImageModel.update(args._id, args.upd as Partial<Image>),
      },
      delete_image: {
        type: ImageGraphqlType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (source, args) => ImageModel.delete(args._id),
      },
    },
  }),
});

export default schema;
