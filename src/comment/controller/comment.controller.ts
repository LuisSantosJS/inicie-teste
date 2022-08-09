import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CommentInputDTO, CommentInputNullableDTO, CommentInputWithoutPostIdDTO, CommentOutputDTO } from '../dto/comment.dto';
import { CommentService } from '../service/comment.service';

@Controller('comment')
@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CommentController {
    constructor(private commentService: CommentService) { }

    @ApiOperation({ summary: 'Listar comentários' })
    @ApiResponse({ status: 200, type: [CommentOutputDTO], description: 'Retorna a lista de comentários' })
    @Get('/all')
    async all(@Req() req) {
        return await this.commentService.listComments(req.user.goRestToken);
    }

    @ApiOperation({ summary: 'Listar comentários por id do post' })
    @ApiResponse({ status: 200, type: [CommentOutputDTO], description: 'Retorna a lista de comentários' })
    @Get('/:postId')
    async listByPostId(@Req() req, @Param('postId') postId: string) {
        return await this.commentService.listCommentsByPost(req.user.goRestToken, postId);
    }

    
    @ApiOperation({ summary: 'Exibir comentário por id' })
    @ApiResponse({ status: 200, type: CommentOutputDTO, description: 'Retorna um comentário' })
    @Get('/details/:id')
    async show(@Req() req, @Param('id') id: string) {
        return await this.commentService.listCommentById(req.user.goRestToken, id);
    }


    @ApiOperation({ summary: 'Criar comentário por id do post' })
    @ApiResponse({ status: 200, type: CommentOutputDTO, description: 'Retorna o comentário' })
    @Post('')
    async createComment(@Req() req, @Body() data: CommentInputDTO) {
        return await this.commentService.createComment(req.user.goRestToken, data);
    }


    @ApiOperation({ summary: 'Criar comentário para o primeiro post da lista pública' })
    @ApiResponse({ status: 200, type: CommentOutputDTO, description: 'Retorna o comentário' })
    @Post('/first-post')
    async createCommentFirstPost(@Req() req, @Body() data: CommentInputWithoutPostIdDTO) {
        return await this.commentService.createCommentFirstPost(req.user.goRestToken, data);
    }

    @ApiOperation({ summary: 'Alterar comentário' })
    @ApiResponse({ status: 200, type: CommentOutputDTO, description: 'Retorna o comentário' })
    @Patch('/:id')
    async updateComment(@Req() req, @Body() data: CommentInputNullableDTO, @Param('id') id: string) {
        return await this.commentService.updateComment(req.user.goRestToken, data, id);
    }


    @ApiOperation({ summary: 'Deletar comentário' })
    @ApiResponse({ status: 200, type: Boolean, description: 'Retorna true' })
    @Delete('/:id')
    async delete(@Req() req, @Param('id') id: string) {
        return await this.commentService.deleteComment(req.user.goRestToken, id);
    }

}
