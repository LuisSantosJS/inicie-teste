import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PostInputDTO, PostInputNullableDTO, PostOutputDTO } from '../dto/post.dto';
import { PostService } from '../service/post.service';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostController {
    constructor(private postService: PostService) { }

    @ApiOperation({ summary: 'Listar posts' })
    @ApiResponse({ status: 200, type: [PostOutputDTO], description: 'Retorna a lista de posts' })
    @Get('/all')
    async all(@Req() req) {
        return await this.postService.listPosts(req.user.goRestToken);
    }


    @ApiOperation({ summary: 'Listar posts por usuário' })
    @ApiResponse({ status: 200, type: [PostOutputDTO], description: 'Retorna a lista de posts' })
    @Get('/:userId')
    async listByUser(@Req() req, @Param('userId') userId: string) {
        return await this.postService.listPostsByUser(req.user.goRestToken, userId);
    }

    @ApiOperation({ summary: 'Listar post por id' })
    @ApiResponse({ status: 200, type: PostOutputDTO, description: 'Retorna o post' })
    @Get('/details/:id')
    async showPost(@Req() req, @Param('id') id: string) {
        return await this.postService.showPost(req.user.goRestToken, id);
    }

    @ApiOperation({ summary: 'Criar post' })
    @ApiResponse({ status: 200, type: PostOutputDTO, description: 'Retorna o post criado' })
    @Post('/')
    async createPost(@Req() req, @Body() data: PostInputDTO) {
        return await this.postService.createPost(req.user.goRestToken, data);
    }

    @ApiOperation({ summary: 'Alterar post' })
    @ApiResponse({ status: 200, type: PostOutputDTO, description: 'Retorna o post alterado' })
    @Patch('/:id')
    async updatePost(@Req() req, @Body() data: PostInputNullableDTO, @Param('id') id: string) {
        return await this.postService.updatePost(req.user.goRestToken, data, id);
    }

    @ApiOperation({ summary: 'Deletar post' })
    @ApiResponse({ status: 200, type: Boolean, description: 'Retorna true' })
    @Delete('/:id')
    async deletePost(@Req() req, @Param('id') id: string) {
        return await this.postService.deletePost(req.user.goRestToken, id);
    }
}
