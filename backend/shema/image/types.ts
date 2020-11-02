import {
  GraphQLFieldConfigArgumentMap,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import mongodb from 'mongodb';

export type Image = {
  _id: mongodb.ObjectId,
  title: string,
};

export const ImageGraphqlType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
  }),
});

export const UpdateImageInputType = new GraphQLInputObjectType({
  name: 'UpdateImageInput',
  fields: () => ({
    title: {
      type: GraphQLString,
    },
  }),
});

export const SearchImageInputType: GraphQLFieldConfigArgumentMap = {
  _id: {type: GraphQLString},
  limit: {type: GraphQLInt},
  offset: {type: GraphQLInt},
  search: {type: GraphQLString},
};

export type SearchImageInputArgs = {
  _id: string,
  limit: number,
  offset: number,
  search: string,
};
