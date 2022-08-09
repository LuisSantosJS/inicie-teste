import { Injectable, NotFoundException } from '@nestjs/common';
import Axios from 'axios'
import { AuthService } from 'src/auth/service/auth.service';
import { UserInputDTO, UserInputNullableDTO, UserOutputDTO } from '../dto/user.dto';
@Injectable()
export class UserService {
    constructor(private authService: AuthService) { }
    public async listUsers(token: string): Promise<UserOutputDTO[]> {
        const response = await Axios.get('https://gorest.co.in/public/v2/users', this.authService.headers(token));
        return response?.data
    }

    public async listUserDetails(token: string, id: string): Promise<UserOutputDTO> {
        const response = await Axios.get('https://gorest.co.in/public/v2/users/' + id, this.authService.headers(token));
        return response?.data
    }


    public async createUser(token: string, data: UserInputDTO): Promise<UserOutputDTO> {
        const response = await Axios.post('https://gorest.co.in/public/v2/users', data, this.authService.headers(token));
        return response?.data
    }

    public async updateUser(token: string, data: UserInputNullableDTO, id: string): Promise<UserOutputDTO> {
        const user = await this.listUserDetails(token, id);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        const response = await Axios.patch('https://gorest.co.in/public/v2/users/' + id, { ...user, ...data }, this.authService.headers(token));
        return response?.data
    }

    public async deleteUser(token: string, id: string): Promise<Boolean> {
        const response = await Axios.delete('https://gorest.co.in/public/v2/users/' + id, this.authService.headers(token));
        return !!response
    }
}
