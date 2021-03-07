import mongodb from 'mongodb';
import dotenv from 'dotenv';

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

export type DbType = mongodb.Db;
export type AllowedCollectionNames = 'images';
export type MemoizedCollections = Record<AllowedCollectionNames, mongodb.Collection>;

async function getCollection<T> (ctx: {
  db: mongodb.Db,
  collections: MemoizedCollections,
}, name: AllowedCollectionNames): Promise<mongodb.Collection<T>> {
  if (ctx.collections[name]) return ctx.collections[name];

  const collection = await ctx.db.collection<T>(name);
  ctx.collections[name] = collection;
  return collection;
}

export default {
  connect: connectDb,
  collection: getCollection,
};
