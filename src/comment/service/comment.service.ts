import { Injectable, NotFoundException } from '@nestjs/common';
import Axios from 'axios';
import { AuthService } from 'src/auth/service/auth.service';
import { PostService } from 'src/post/service/post.service';
import { CommentInputDTO, CommentInputNullableDTO, CommentInputWithoutPostIdDTO, CommentOutputDTO } from '../dto/comment.dto';

@Injectable()
export class CommentService {
    constructor(private authService: AuthService, private postService: PostService) { }

    public async listComments(token: string): Promise<CommentOutputDTO[]> {
        const response = await Axios.get(`https://gorest.co.in/public/v2/comments`, this.authService.headers(token));
        return response?.data
    }

    public async listCommentById(token: string, commentId: string): Promise<CommentOutputDTO> {
        const response = await Axios.get(`https://gorest.co.in/public/v2/comments/${commentId}`, this.authService.headers(token));
        return response?.data
    }

    public async deleteComment(token: string, commentId: string): Promise<Boolean> {
        const response = await Axios.delete(`https://gorest.co.in/public/v2/comments/${commentId}`, this.authService.headers(token));
        return !!response
    }

    public async listCommentsByPost(token: string, postId: string): Promise<CommentOutputDTO[]> {
        const response = await Axios.get(`https://gorest.co.in/public/v2/posts/${postId}/comments`, this.authService.headers(token));
        return response?.data
    }

    public async createComment(token: string, data: CommentInputDTO): Promise<CommentOutputDTO> {
        const response = await Axios.post(`https://gorest.co.in/public/v2/posts/${data.post_id}/comments`, data, this.authService.headers(token));
        return response?.data
    }

    public async createCommentFirstPost(token: string, data: CommentInputWithoutPostIdDTO): Promise<CommentOutputDTO> {
        const posts = await this.postService.listPosts(token);
        const response = await Axios.post(`https://gorest.co.in/public/v2/posts/${posts[0].id}/comments`, {...data, post_id: posts[0].id}, this.authService.headers(token));
        return response?.data
    }

    public async updateComment(token: string, data: CommentInputNullableDTO, id: string): Promise<CommentOutputDTO> {
        const comment = await this.listCommentById(token, id);
        if (!comment) {
            throw new NotFoundException("Comment not found")
        }
        const response = await Axios.patch(`https://gorest.co.in/public/v2/comments/${id}`, { ...comment, ...data }, this.authService.headers(token));
        return response?.data
    }
}
