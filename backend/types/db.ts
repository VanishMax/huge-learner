import mongodb from 'mongodb';

export type DbType = mongodb.Db;
export type AllowedCollectionNames = 'images';
export type MemoizedCollections = Record<AllowedCollectionNames, mongodb.Collection>;
