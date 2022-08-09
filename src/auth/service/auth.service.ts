import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async validateUser(token: string): Promise<string> {
        return await this.login(token);
    }

    public async login(token: string): Promise<string> {
        const payload = { goRestToken: token };
        const access_token = this.jwtService.sign(payload);
        return access_token;
    }

    public headers(token: string) {
        return {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
                'Authorization': 'Bearer ' + token
            }
        }
    }
}