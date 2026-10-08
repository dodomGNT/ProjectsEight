import { Global, Module } from '@nestjs/common';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema.js';

export const DB = 'DB';
export type Database = NodePgDatabase<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: DB,
      useFactory: (): Database =>
        drizzle({ connection: process.env.DATABASE_URL!, schema }),
    },
  ],
  exports: [DB],
})
export class DbModule {}
