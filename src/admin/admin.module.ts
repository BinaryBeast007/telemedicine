import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "src/user/user.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([UserEntity, AdminEntity]),],
    controllers: [AdminController],
    providers: [AdminService],
}) 

export class AdminModule {}