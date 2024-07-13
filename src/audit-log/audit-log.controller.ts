import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLogDTO } from './audit-log.dto';
import { AuditLogEntity } from './audit-log.entity';

@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  async createLog(@Body() auditLogDTO: AuditLogDTO): Promise<AuditLogEntity> {
    return this.auditLogService.createLog(auditLogDTO);
  }

  @Get()
  async getAllLogs(): Promise<AuditLogEntity[]> {
    return this.auditLogService.getAllLogs();
  }
}
