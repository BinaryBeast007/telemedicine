import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async login(authDTO) {
        if (authDTO.email != null && authDTO.password != null) {
            const userData = await this.userRepository.findOneBy({ u_email: authDTO.email });
            if (!userData) {
                return { success: false, message: "Invalid credentials" };
            }

            const isMatch = await bcrypt.compare(authDTO.password, userData.u_password);
            if (isMatch) {
                return { success: true, message: "Login successful", user: userData };
            } else {
                return { success: false, message: "Invalid credentials" };
            }
        } else {
            return { success: false, message: "Email and password must be provided" };
        }
    }
}