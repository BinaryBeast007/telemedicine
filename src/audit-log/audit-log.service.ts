import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';
import { AuditLogEntity } from './audit-log.entity';
import { AuditLogDTO } from './audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly auditLogRepository: Repository<AuditLogEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async createLog(auditLogDTO: AuditLogDTO): Promise<AuditLogEntity> {
    const { action, performed_by, adminId } = auditLogDTO;
    const admin = await this.adminRepository.findOne({ where: { a_id: adminId } });

    const auditLog = new AuditLogEntity();
    auditLog.action = action;
    auditLog.performed_by = performed_by;
    auditLog.performed_at = new Date();
    auditLog.admin = admin;

    return this.auditLogRepository.save(auditLog);
  }

  async getAllLogs(): Promise<AuditLogEntity[]> {
    return this.auditLogRepository.find({ relations: ['admin'] });
  }
}
