import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin, Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "src/user/user.entity";
import { AdminDTO } from "./admin.dto";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(AdminEntity)
        private readonly adminRepository: Repository<AdminEntity>,
    ) {}

    async registerAdmin(adminDTO: AdminDTO): Promise<AdminEntity> {
        const { u_name, u_email, u_password, u_role, status, a_name, a_address, a_gender, a_dob, a_phone_number } = adminDTO;

        const user = new UserEntity();
        user.u_name = u_name;
        user.u_email = u_email;
        user.u_password = u_password;
        user.u_role = u_role ;
        user.status = status;

        const savedUser = await this.userRepository.save(user);

        const admin = new AdminEntity();
        admin.a_name = a_name;
        admin.a_address = a_address;
        admin.a_gender = a_gender;
        admin.a_dob = a_dob;
        admin.a_phoneNumber = a_phone_number;
        admin.user = savedUser;

        return this.adminRepository.save(admin);
    }

    async showAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
    }

    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepository.findOneBy({a_id : id});
    }

    async updateAdmin(id: number, updatedAdmin: AdminEntity): Promise<AdminEntity> {
        await this.adminRepository.update(id, updatedAdmin);
        return this.adminRepository.findOneBy({a_id:id});
    }
}