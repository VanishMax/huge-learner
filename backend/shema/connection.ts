import mongodb from 'mongodb';
import dotenv from 'dotenv';
import type { AllowedCollectionNames } from '../types/db';
import { CustomContext } from '../types/context';

dotenv.config();

const { MongoClient } = mongodb;

async function connectDb (): Promise<mongodb.Db> {
  const url = process.env.MONGO_URI || '';
  const client = await MongoClient.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  return client.db('huge-learner');
}

async function getCollection<T> (ctx: CustomContext, name: AllowedCollectionNames): Promise<mongodb.Collection<T>> {
  if (ctx.collections[name]) return ctx.collections[name] as mongodb.Collection<T>;

  const collection = await ctx.db.collection<T>(name);
  ctx.collections[name] = collection;
  return collection;
}

export default {
  connect: connectDb,
  collection: getCollection,
};
