import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';
import { AuditLogEntity } from './audit-log.entity';
import { AdminEntity } from '../admin/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogEntity, AdminEntity])],
  controllers: [AuditLogController],
  providers: [AuditLogService],
  exports: [AuditLogService],
})
export class AuditLogModule {}
