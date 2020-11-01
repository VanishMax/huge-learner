import dotenv from 'dotenv';
import Koa from 'koa';
import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import Schema from './schema';
import db from './connection';

dotenv.config();

db.initPool();

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('The app is running on port:', PORT);
});
