import { Injectable, NotFoundException } from '@nestjs/common';
import Axios from 'axios';
import { AuthService } from 'src/auth/service/auth.service';
import { PostInputDTO, PostInputNullableDTO, PostOutputDTO } from '../dto/post.dto';

@Injectable()
export class PostService {
    constructor(private authService: AuthService) { }
    public async listPosts(token: string): Promise<PostOutputDTO[]> {
        const response = await Axios.get('https://gorest.co.in/public/v2/posts', this.authService.headers(token));
        return response?.data
    }
    public async showPost(token: string, postId: string): Promise<PostOutputDTO> {
        const response = await Axios.get('https://gorest.co.in/public/v2/posts/' + postId, this.authService.headers(token));
        return response?.data
    }
    public async listPostsByUser(token: string, userId: string): Promise<PostOutputDTO[]> {
        const response = await Axios.get(`https://gorest.co.in/public/v2/users/${userId}/posts`, this.authService.headers(token));
        return response?.data
    }
    public async createPost(token: string, data: PostInputDTO): Promise<PostOutputDTO> {
        const response = await Axios.post(`https://gorest.co.in/public/v2/users/${data.user_id}/posts`, data, this.authService.headers(token));
        return response?.data
    }
    public async updatePost(token: string, data: PostInputNullableDTO, postId: string): Promise<PostOutputDTO> {
        const post = await this.showPost(token, postId);
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        const response = await Axios.patch(`https://gorest.co.in/public/v2/posts/` + postId, { ...post, ...data }, this.authService.headers(token));
        return response?.data
    }
    public async deletePost(token: string, id: string): Promise<Boolean> {
        const response = await Axios.delete('https://gorest.co.in/public/v2/posts/' + id, this.authService.headers(token));
        return !!response
    }
}
