import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeModule } from './notice/notice.module';
import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [AdminModule, NoticeModule, AuditLogModule, TypeOrmModule.forRoot(
    { 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'awt',
      autoLoadEntities: true,
      synchronize: true,
    } ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
