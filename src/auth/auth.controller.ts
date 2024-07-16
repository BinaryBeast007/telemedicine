import { Body, Controller, Post, Session, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Session() session, @Body() authDTO: AuthDTO) {
        const res = await this.authService.login(authDTO);
        if (res.success) {
            session.email = authDTO.email;
            return { message: res.message, email: session.email };
        } else {
            throw new UnauthorizedException({ message: res.message });
        }
    }
}