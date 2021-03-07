import koa from 'koa';
import type { DbType, MemoizedCollections } from './db';

export interface ContextExtension {
  db: DbType,
  collections: Partial<MemoizedCollections>,
}

export type CustomContext = koa.ParameterizedContext<{}, ContextExtension, any>;
