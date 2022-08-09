import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CommentInputWithoutPostIdDTO {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'name', type: () => String })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'email', type: () => String })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'body', type: () => String })
    body: string;
}

export class CommentInputDTO extends CommentInputWithoutPostIdDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'post_id', type: () => Number })
    post_id: number;

}

export class CommentInputNullableDTO {

    @ApiProperty({ nullable: true, name: 'post_id', type: () => Number, required: false })
    post_id?: number;


    @ApiProperty({ nullable: true, name: 'name', type: () => String, required: false })
    name?: string;


    @ApiProperty({ nullable: true, name: 'email', type: () => String, required: false })
    email?: string;


    @ApiProperty({ nullable: true, name: 'body', type: () => String, required: false })
    body?: string;
}

export class CommentOutputDTO extends CommentInputDTO {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ nullable: false, name: 'id', type: () => Number })
    id: number;
}