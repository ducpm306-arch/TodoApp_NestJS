import { IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Username không được để trống' })
    username: string;

    @MinLength(6, { message: 'Password tối thiểu 6 ký tự' })
    password: string;
}

export class LoginDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}