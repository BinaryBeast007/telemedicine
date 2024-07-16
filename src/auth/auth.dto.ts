import { IsNotEmpty, IsString } from "class-validator";

export class AuthDTO {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}