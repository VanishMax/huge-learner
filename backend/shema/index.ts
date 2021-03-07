import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';
import {
  Image, ImageGraphqlType, UpdateImageInputType, SearchImageInputType,
} from '../types/images';
import ImageModel from './models/image';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'queries',
    fields: {
      images: {
        type: GraphQLList(ImageGraphqlType),
        args: SearchImageInputType,
        resolve: async (source, args, ctx) => {
          const model = await ImageModel(ctx);
          return model.read(args);
        },
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
        resolve: async (source, args, ctx) => {
          const model = await ImageModel(ctx);
          return model.create(args as Image);
        },
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
        resolve: async (source, args, ctx) => {
          const model = await ImageModel(ctx);
          return model.update(args._id, args.upd as Partial<Image>);
        },
      },
      delete_image: {
        type: ImageGraphqlType,
        args: {
          _id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (source, args, ctx) => {
          const model = await ImageModel(ctx);
          return model.delete(args._id);
        },
      },
    },
  }),
});

export default schema;
