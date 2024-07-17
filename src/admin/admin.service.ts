import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "src/user/user.entity";
import { AdminDTO } from "./admin.dto";
import * as bcrypt from 'bcrypt';

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

    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }

    async showAllAdmins(): Promise<AdminEntity[]> {
        return this.adminRepository.find();
    }

    async getAdminById(id: number): Promise<AdminEntity> {
        return this.adminRepository.findOneBy({a_id : id});
    }

    async updateAdmin(id: number, updatedAdmin: AdminDTO): Promise<AdminEntity> {
        const admin = await this.adminRepository.findOne({ where: { a_id: id }, relations: ['user'] });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        admin.user.u_name = updatedAdmin.u_name;
        admin.user.u_email = updatedAdmin.u_email;
        admin.user.u_password = updatedAdmin.u_password;
        admin.user.u_role = updatedAdmin.u_role;
        admin.user.status = updatedAdmin.status;

        await this.userRepository.save(admin.user);

        admin.a_name = updatedAdmin.a_name;
        admin.a_address = updatedAdmin.a_address;
        admin.a_gender = updatedAdmin.a_gender;
        admin.a_dob = updatedAdmin.a_dob;
        admin.a_phoneNumber = updatedAdmin.a_phone_number;

        return this.adminRepository.save(admin);
    }

    async patchAdmin(id: number, partialAdmin: Partial<AdminDTO>): Promise<AdminEntity> {
        const admin = await this.adminRepository.findOne({ where: { a_id: id }, relations: ['user'] });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }

        if (partialAdmin.u_name) admin.user.u_name = partialAdmin.u_name;
        if (partialAdmin.u_email) admin.user.u_email = partialAdmin.u_email;
        if (partialAdmin.u_password) admin.user.u_password = partialAdmin.u_password;
        if (partialAdmin.u_role) admin.user.u_role = partialAdmin.u_role;
        if (partialAdmin.status) admin.user.status = partialAdmin.status;

        await this.userRepository.save(admin.user);

        if (partialAdmin.a_name) admin.a_name = partialAdmin.a_name;
        if (partialAdmin.a_address) admin.a_address = partialAdmin.a_address;
        if (partialAdmin.a_gender) admin.a_gender = partialAdmin.a_gender;
        if (partialAdmin.a_dob) admin.a_dob = partialAdmin.a_dob;
        if (partialAdmin.a_phone_number) admin.a_phoneNumber = partialAdmin.a_phone_number;

        return this.adminRepository.save(admin);
    }

    async deleteAdmin(id: number): Promise<void> {
        const admin = await this.adminRepository.findOne({ where: { a_id: id }, relations: ['user'] });
        if (!admin) {
            throw new NotFoundException(`Admin with ID ${id} not found`);
        }
        
        await this.adminRepository.remove(admin);
        await this.userRepository.remove(admin.user);
    }
}