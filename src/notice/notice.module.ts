import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeEntity } from './notice.entity';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { AdminEntity } from '../admin/admin.entity';
import { AuditLogModule } from 'src/audit-log/audit-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoticeEntity, AdminEntity]),
    AuditLogModule,
  ],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
