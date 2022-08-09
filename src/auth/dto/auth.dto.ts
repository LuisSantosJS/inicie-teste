import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Inserir o token de acesso da api GoRest', nullable: false, name: 'goRestAccessToken', type: () => String },)
    goRestAccessToken: string;
}