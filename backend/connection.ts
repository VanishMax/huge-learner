import mongodb from 'mongodb';

const {MongoClient} = mongodb;

function MongoPool() {}

let database: mongodb.Db;

function initPool(cb: ((arg0: mongodb.Db) => void) | null = null) {
  const url = process.env.MONGO_URI || '';
  MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
    if (err) throw err;

    database = db.db('huge-learner');
    if (cb) cb(database);
  });
  return MongoPool;
}

MongoPool.initPool = initPool;

function getInstance(cb: { (arg0: any): void; (arg0: mongodb.Db): void }) {
  if (!database) initPool(cb);
  else if (cb && typeof (cb) === 'function') cb(database);
}
MongoPool.getInstance = getInstance;

export default MongoPool;
