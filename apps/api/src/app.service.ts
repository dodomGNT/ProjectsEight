import { Inject, Injectable } from '@nestjs/common';
import { DB, type Database } from './db/db.module.js';
import { users } from './db/schema.js';

@Injectable()
export class AppService {
  constructor(@Inject(DB) private readonly db: Database) {}

  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return this.db.select().from(users);
  }
}
