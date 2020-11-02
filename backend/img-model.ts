import mongodb from 'mongodb';
import {GraphQLObjectType, GraphQLString, GraphQLError} from 'graphql';
import db from './connection';

export const ImageGraphqlType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
  }),
});

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

  read: async ({id = '', search = ''} = {}): Promise<Image[]> => {
    try {
      if (id) return await Images.findOne({_id: new ObjectID(id)}) || [];

      let filter = {};
      if (search) filter = {$or: [{title: new RegExp(search, 'i')}, {author: new RegExp(search, 'i')}]};

      const imgs = await Images.find(filter);
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
          const updated = await Images.findOne({_id: new ObjectID(_id)});

          return {status: 200, data: updated};
        }
        return {status: 400, data: {error: 'No Image data provided'}};
      }
      return {status: 400, data: {error: 'No Image data provided'}};
    } catch (e) {
      console.error(e);
      return {status: 500};
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
