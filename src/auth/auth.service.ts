import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "src/user/user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { AuthDTO } from "./auth.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
      const user = await this.userRepository.findOne({ where: { u_email: email } });
      if (user && await bcrypt.compare(pass, user.u_password)) {
        const { u_password, ...result } = user;
        return result;
      }
      return null;
    }

    async login(authDTO: AuthDTO) {
      const user = await this.validateUser(authDTO.email, authDTO.password);
      if (!user) {
        throw new UnauthorizedException({ message: "Invalid credentials" });
      }
      const payload = { email: user.u_email, sub: user.u_id };
      return {
        message: "Login successful",
        access_token: this.jwtService.sign(payload),
        user,
      };
    }
}