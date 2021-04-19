import { Body, Controller, Post } from '@nestjs/common';
import { Public } from '../../utils/ispublic.decorator';
import { LoginUserDto } from '../user/loginUser.dto';
import { AuthService, LoginStatus } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Public()
    @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);
    }
    
}
