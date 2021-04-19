import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/loginUser.dto';
import { UserDto } from '../user/user.dto';
import { UsersService } from '../user/users.service';
import { CreateUserDto } from './createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.strategy';

export interface LoginStatus {
    success: true,   
    message: 'user has logged in',
};

export interface RegistrationStatus {  
    success: boolean;  
    message: string;
}

@Injectable()   
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}
    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
        success: true,
        message: 'user registered',
    };  
    try {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDto.password, saltOrRounds);

        await this.usersService.create({...userDto, password: hash});
    } catch (err) {
        status = { success: false, message: err };    
    }
    return status;  
}

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        // find user in db    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        // generate and sign token    
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }
    
    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user);    
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload);    
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    
        return user;  
    }
    
    
}

