import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Gerar Token de Acesso',description:"Inserir o token da api GoRest (https://gorest.co.in) como parametro" })
  @ApiResponse({ status: 200, type: String, description: 'Retorna o token de acesso para utilizar na api' })
  @Post('/login')
  async login(@Body() data: LoginDTO) {
    return this.authService.login(data.goRestAccessToken);
  }
}
