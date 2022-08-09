import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostInputDTO {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'user_id', type: () => Number })
    user_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'title', type: () => String })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'body', type: () => String })
    body: string;
}

export class PostInputNullableDTO {


    @ApiProperty({ nullable: true, name: 'user_id', type: () => Number, required: false  })
    user_id?: number;


    @ApiProperty({ nullable: true, name: 'title', type: () => String, required: false  })
    title?: string;


    @ApiProperty({ nullable: true, name: 'body', type: () => String, required: false  })
    body?: string;
}

export class PostOutputDTO extends PostInputDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'id', type: () => Number })
    id: number;
}