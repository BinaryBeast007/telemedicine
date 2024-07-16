import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsEnum, IsPhoneNumber, IsInt } from 'class-validator';
import { UserDTO } from 'src/user/user.dto';

enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export class AdminDTO extends UserDTO {
    a_id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters long.' })
    @MaxLength(50, { message: 'Name cannot be longer than 50 characters.' })
    a_name: string;

    @IsString()
    @IsNotEmpty({ message: 'Address is required.' })
    a_address: string;

    @IsEnum(Gender, { message: 'Gender must be Male, Female, or Other.' })
    @IsNotEmpty({ message: 'Gender is required.' })
    a_gender: Gender;

    a_dob: Date;

    // @IsPhoneNumber(null, { message: 'Invalid phone number.' })
    @IsNotEmpty({ message: 'Phone number is required.' })
    a_phone_number: string;
}