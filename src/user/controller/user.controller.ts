import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserInputDTO, UserInputNullableDTO, UserOutputDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Listar usuários' })
    @ApiResponse({ status: 200, type: [UserOutputDTO], description: 'Retorna a lista de usuários' })
    @Get('/all')
    async all(@Req() req) {
        return await this.userService.listUsers(req.user.goRestToken);
    }

    @ApiOperation({ summary: 'Exibir detalhes de um usuário' })
    @ApiResponse({ status: 200, type: UserOutputDTO, description: 'Retorna detalhes de um usuário' })
    @Get('/:id')
    async show(@Req() req, @Param('id') id: string) {
        return await this.userService.listUserDetails(req.user.goRestToken, id);
    }

    @ApiOperation({ summary: 'Criar usuário' })
    @ApiResponse({ status: 200, type: UserOutputDTO, description: 'Retorna o usuário' })
    @Post('/')
    async create(@Req() req, @Body() data: UserInputDTO) {
        return await this.userService.createUser(req.user.goRestToken, data);
    }

    @ApiOperation({ summary: 'Alterar usuário' })
    @ApiResponse({ status: 200, type: UserOutputDTO, description: 'Retorna o usuário' })
    @Patch('/:id')
    async update(@Req() req, @Body() data: UserInputNullableDTO, @Param('id') id: string) {
        return await this.userService.updateUser(req.user.goRestToken, data, id);
    }

    @ApiOperation({ summary: 'Deletar usuário' })
    @ApiResponse({ status: 200, type: Boolean, description: 'Retorna true' })
    @Delete('/:id')
    async delete(@Req() req, @Param('id') id: string) {
        return await this.userService.deleteUser(req.user.goRestToken, id);
    }
}

