import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "src/user/user.entity";
import { NoticeEntity } from "src/notice/notice.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([UserEntity, AdminEntity, NoticeEntity]),],
    controllers: [AdminController],
    providers: [AdminService],
}) 

export class AdminModule {}