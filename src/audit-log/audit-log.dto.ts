import { IsString, IsNotEmpty } from 'class-validator';

export class AuditLogDTO {
  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  performed_by: string;

  performed_at: Date;

  adminId: number;
}
