import { Controller, Post, Get, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';
import { AuditLogDTO } from './audit-log.dto';
import { AuditLogEntity } from './audit-log.entity';

@Controller('audit-log')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createLog(@Body() auditLogDTO: AuditLogDTO): Promise<AuditLogEntity> {
    return this.auditLogService.createLog(auditLogDTO);
  }

  @Get('alllogs')
  async getAllLogs(): Promise<AuditLogEntity[]> {
    return this.auditLogService.getAllLogs();
  }
}
