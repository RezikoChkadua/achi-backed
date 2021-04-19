import { IsNotEmpty } from "class-validator";
import { User } from "../../models/user.entity";

export class LoginUserDto {  
    @IsNotEmpty() 
    username: string;
    @IsNotEmpty()
    password: string;


  public static from(dto: Partial<LoginUserDto>) {
    const it = new LoginUserDto();
    it.username = dto.username;
    it.password = dto.password;
    return it;
  }

  public static fromEntity(entity: User) {
    return this.from({
      username: entity.username,
      password: entity.password,
    });
  }

  public static toEntity(dto: LoginUserDto) {
    const it = new LoginUserDto();
    it.username = dto.username;
    it.password = dto.password;
    return it;
  }

}

