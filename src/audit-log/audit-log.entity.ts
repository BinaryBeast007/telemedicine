import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { AdminEntity } from '../admin/admin.entity';

@Entity('audit_log')
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  audit_id: number;

  @Column()
  action: string;

  @Column()
  performed_by: string;

  @CreateDateColumn()
  performed_at: Date;

  @ManyToOne(() => AdminEntity, admin => admin.auditLogs)
  admin: AdminEntity;
}
