import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogpostEntity } from './blogpost.entity';
import { BlogpostService } from './blogpost.service';
import { BlogpostController } from './blogpost.controller';
import { AdminEntity } from '../admin/admin.entity';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogpostEntity, AdminEntity]),
    AuditLogModule,
  ],
  controllers: [BlogpostController],
  providers: [BlogpostService],
})
export class BlogpostModule {}
