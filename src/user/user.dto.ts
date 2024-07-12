import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsEnum, IsPhoneNumber, IsInt } from 'class-validator';

enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export class UserDTO {
    u_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters long.' })
    @MaxLength(50, { message: 'Name cannot be longer than 50 characters.' })
    u_name: string;

    @IsEmail({}, { message: 'Invalid email address.' })
    @IsNotEmpty({ message: 'Email is required.' })
    u_email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long.' })
    u_password: string;

    u_role?: string;

    created_at: Date;

    updated_at: Date;

    status?: string;
}