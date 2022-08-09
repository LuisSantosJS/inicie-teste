import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


enum status {
    active = 'active',
    inactive = 'inactive'
}

enum gender {
    male = 'male',
    female = 'female'
}





export class UserInputDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'name', type: () => String })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'email', type: () => String })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'gender', enum: gender, type: () => String })
    gender: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'status', enum: status, type: () => String })
    status: string;
}

export class UserInputNullableDTO {

    @ApiProperty({ nullable: true, name: 'name', type: () => String, required: false })
    name?: string;


    @ApiProperty({ nullable: true, name: 'email', type: () => String, required: false })
    email?: string;


    @ApiProperty({ nullable: true, name: 'gender', enum: gender, type: () => String, required: false })
    gender?: string;


    @ApiProperty({ nullable: true, name: 'status', enum: status, type: () => String, required: false })
    status?: string;
}



export class UserOutputDTO extends UserInputDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'id', type: () => Number })
    id: number;

}