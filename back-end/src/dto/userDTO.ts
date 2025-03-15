import {IsString, IsEmail} from "class-validator";
export class UserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;   
}