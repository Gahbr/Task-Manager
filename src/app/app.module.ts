import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from '../task/task.module';
import { DatabaseModule } from '../providers/Database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), TaskModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
