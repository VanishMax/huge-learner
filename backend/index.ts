import dotenv from 'dotenv';
import Koa from 'koa';
import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import Schema from './shema';
import db from './shema/connection';
import type { DbType, MemoizedCollections } from './shema/connection';

dotenv.config();

interface ContextExtension {
  db: DbType,
  collections: Partial<MemoizedCollections>,
}

const app = new Koa<{}, ContextExtension>();
const router = new Router<any, ContextExtension>();

app.use(async (ctx, next) => {
  ctx.db = await db.connect();
  ctx.collections = {};
  await next();
});

router.all('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('The app is running on port:', PORT);
});
