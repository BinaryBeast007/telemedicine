import { Body, Controller, Post, Req, Res, Session, UnauthorizedException, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Session() session, @Body() authDTO: AuthDTO) {
        const res = await this.authService.login(authDTO);
        if (res.access_token) {
            session.email = authDTO.email;
            return { message: res.message, access_token: res.access_token, email: session.email };
        } else {
            throw new UnauthorizedException({ message: "Invalid credentials" });
        }
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            } else {
                res.clearCookie('connect.sid', { path: '/' });
                return res.status(200).json({ message: 'Logout successful' });
            }
        });
    }
}
