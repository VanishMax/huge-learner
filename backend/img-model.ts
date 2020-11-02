import mongodb from 'mongodb';
import {
  GraphQLError, GraphQLFieldConfigArgumentMap, GraphQLInputObjectType,
  GraphQLInt, GraphQLObjectType, GraphQLString,
} from 'graphql';
import db from './connection';

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

const {ObjectID} = mongodb;
ObjectID.prototype.valueOf = function () {
  return this.toString();
};

let Images: mongodb.Collection<Image>;
db.getInstance((p_db) => {
  Images = p_db.collection('images');
});

export type Image = {
  _id: mongodb.ObjectId,
  title: string,
};

const model = {
  create: async (args: Image) => {
    try {
      if (!args.title) return Promise.reject(new GraphQLError('title argument is required'));
      const res = await Images.insertOne(args);
      return res.ops;
    } catch (e) {
      console.error(e);
      return Promise.reject(new GraphQLError('Something wrong happened'));
    }
  },

  read: async (args: Partial<SearchImageInputArgs> = {}): Promise<Image[]> => {
    try {
      let filter = {};
      if (args._id) filter = {...filter, _id: new ObjectID(args._id)};
      if (args.search) filter = {...filter, title: new RegExp(args.search, 'i')};

      const imgs = await Images.find(filter);
      if (args.limit) imgs.limit(args.limit);
      if (args.offset) imgs.skip(args.offset);

      return await imgs.toArray();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  update: async (_id: string, data: Partial<Image>) => {
    try {
      const img = await Images.findOne({_id: new ObjectID(_id)});

      if (img) {
        const updateQuery: Partial<Image> = {};
        (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
          if (Object.keys(img).includes(key) && img[key] !== data[key]) {
            // @ts-ignore
            updateQuery[key] = data[key];
          }
        });
        const query = Object.keys(updateQuery).length ? {$set: updateQuery} : null;

        if (query) {
          await Images.updateOne({_id: new ObjectID(_id)}, query);
          return await Images.findOne({_id: new ObjectID(_id)});
        }

        return img;
      }

      return Promise.reject(new GraphQLError('Image with such _id does not exist'));
    } catch (e) {
      console.error(e);
      return Promise.reject(new GraphQLError('Something wrong happened'));
    }
  },

  delete: async (_id: string) => {
    try {
      if (_id) {
        const img = await Images.findOne({_id: new ObjectID(_id)}) || [];
        await Images.deleteOne({_id: new ObjectID(_id)});
        return img;
      }
      return Promise.reject(new GraphQLError('_id argument is required'));
    } catch (e) {
      console.error(e);
      return Promise.reject(new GraphQLError('Something wrong happened'));
    }
  },
};

export default model;
