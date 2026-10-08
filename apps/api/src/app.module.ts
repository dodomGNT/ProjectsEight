import { resolve } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { DbModule } from './db/db.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // .env ada di root monorepo (apps/api/{src,dist} -> ../../..)
      envFilePath: resolve(import.meta.dirname, '../../../.env'),
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
