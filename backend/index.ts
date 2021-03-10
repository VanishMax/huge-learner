import dotenv from 'dotenv';
import Koa from 'koa';
import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import Schema from './shema';
import db from './shema/connection';
import type { ContextExtension } from './types/context';

dotenv.config();

const app = new Koa<{}, ContextExtension>();
const router = new Router<any, ContextExtension>();

db.connect().then((res) => {
  app.context.db = res;
  app.context.collections = {};
}).catch((e) => {
  console.error('Database connection failed with error:', e);
});

router.all('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('The app is running on port:', PORT);
});
